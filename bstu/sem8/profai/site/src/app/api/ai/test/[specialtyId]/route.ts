import { NextRequest } from "next/server"
import { v4 as uuidv4 } from "uuid"

import { ResponseTemplate, withRetry } from "@/app/api/utils"
import { prisma } from "@/config/prisma"
import { BENEFITS, getBenefitsSort, QUESTIONS, SKILLS } from "@/modules/test/TestForm/data"
import { Faculty, Specialty, University } from "@prisma/client"

const timeout = 1000000

const controller = new AbortController()
const id = setTimeout(() => controller.abort(), timeout)

interface ParamsProps {
  params: Promise<{
    specialtyId: string
  }>
}

const originalGET = async (req: NextRequest, context: ParamsProps) => {
  const { params } = context
  try {
    const { specialtyId } = await params
    if (!specialtyId) {
      return ResponseTemplate(400, "invalid ai test data")
    }
    const specialty = await prisma.specialty.findUnique({ where: { id: specialtyId } })
    if (!specialty) {
      return ResponseTemplate(400, "No specialty with such id")
    }
    const faculty = await prisma.faculty.findUnique({ where: { id: specialty.facultyId } })
    if (!faculty) {
      return ResponseTemplate(400, "No faculty with such id")
    }
    const university = await prisma.university.findUnique({ where: { id: faculty.universityId } })
    if (!university) {
      return ResponseTemplate(400, "No university with such id")
    }
    const text = getTestPrompt({ university, faculty, specialty })
    const payload = {
      model: "r1-1776",
      messages: [{ role: "user", content: text }],
      max_tokens: 2000,
    }
    const headers = {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_TOKEN}`,
      "Content-Type": "application/json",
    }
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })
    clearTimeout(id)
    if (!response.ok) {
      return ResponseTemplate(400, `ai test llm request failed`)
    }
    const result = await response.json()
    const resultJson = extractJSON(result.choices[0].message.content)
    if (!resultJson) {
      return ResponseTemplate(400, "ai test llm response invalid data")
    }
    const test = await prisma.test.create({
      data: {
        id: uuidv4(),
        passDate: new Date().toISOString(),
        benefits: getBenefitsSort(resultJson.benefits.map((b) => ({ name: b }))),
        skills: resultJson.skills,
        questions: resultJson.questions,
        llmSkills: resultJson.skills,
        student: {
          connect: {
            id: "ai-student",
          },
        },
        specialty: {
          connect: {
            id: specialty.id,
          },
        },
      },
    })
    if (!test) {
      return ResponseTemplate(400, "ai test while creating test")
    }
    return ResponseTemplate(200, "ai test success", test)
  } catch (error) {
    return ResponseTemplate(500, `internal server: ${(error as Error).message}`)
  }
}

export const GET = withRetry(originalGET, 5, 1000)

interface GetTestPromptProps {
  university: University
  faculty: Faculty
  specialty: Specialty
}

const getTestPrompt = ({ university, faculty, specialty }: GetTestPromptProps) => {
  const universityText = `Название университета: ${university.name}; Описание университета: ${university.description}; Ссылка на сайт университета: ${university.siteLink}; Количество студентов в университете: ${university.numberOfStudents}.`
  const facultyText = `Название факультета: ${faculty.name}; Описание факультета: ${faculty.description}; Области знаний факультета: ${faculty.areasOfKnowledge.join(", ")}.`
  const specialtyText = `Название специальности: ${specialty.name}; Описание специальности: ${specialty.description}; Трудоустройство после окончания специальности: ${specialty.employment}.`
  const toJsonText = `Твоя задача — отвечать только в формате JSON. Не используй текстовое описание или другие форматы. Все ответы должны быть корректными с точки зрения синтаксиса JSON. Если запрос не может быть выполнен в этом формате, верни { "error": "Невозможно предоставить ответ в JSON" }.`
  const toStudent = `Ты — студент, обучающийся в данном университете на данной специальности данного факультета, пиши ответы от своего лица используя всё настройки указанные в этом описании. Вот описание твоего университета: ${universityText}, твоей специальности: ${specialtyText}, твоего факультета: ${facultyText}.`
  const benefitsText = `Напиши в поле "benefits" ответ в формате массива строк, ответ должен представлять собой критерии будущей работы в порядке от самого важного до менее важного, которые ты мог бы иметь будучи студентов данного факультета. Вот критерии, которые нужно отсортировать: ${BENEFITS.map((b) => b.name).join(", ")}.`
  const skillsText = `Напиши в поле "skills" ответ в формате массива чисел, ответ должен представлять собой уровень навыков СТРОГО ОТ 0 ДО 10 включительно тебя как будущего специалиста данного профиля. Вот навыки, по которым ты должен себя оценить: ${SKILLS.map((s) => s.name).join(", ")}.`
  const questionsText = `Напиши в поле "questions" ответ в формате массива строк, где каждый элемент должен представлять ответ тебя как студента данной специальности на следующие вопросы: ${QUESTIONS.map((q, i) => `Вопрос номер ${i} - "${q}"`).join(", ")}.`
  const promptText = `Твоя роль:\n${toStudent}\nФормат вывода:\n${toJsonText}\nПоля JSON ответа:\n${benefitsText}\n${skillsText}\n${questionsText}`
  return promptText
}

const extractJSON = (text: string): { benefits: string[]; skills: number[]; questions: string[] } | null => {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
  if (jsonMatch) {
    try {
      const cleanedJson = jsonMatch[1]
        .trim()
        .replace(/\/\/.*$/gm, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/,\s*]/g, "]")
      return JSON.parse(cleanedJson)
    } catch (error) {
      console.error("Ошибка при парсинге JSON:", error)
      return null
    }
  }
  return null
}
