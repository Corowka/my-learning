import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"
import { SuggestionType } from "@/types"
import { compressSuggestions } from "@/utils/compress"
import { Faculty, Specialty, Test, University } from "@prisma/client"

interface ParamsProps {
  params: Promise<{
    testId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { testId } = await params
  if (!testId) {
    return ResponseTemplate(400, "invalid testId")
  }
  try {
    const tests = await prisma.test.findMany({ where: { id: { not: testId }, specialtyId: { not: null } } })
    const targetTest = await prisma.test.findUnique({ where: { id: testId } })
    if (!targetTest) {
      return ResponseTemplate(400, `no test with such id: ${testId}`)
    }
    const scores = compareTests(targetTest, tests).slice(0, 5)
    const suggestions = await getScoresWithDetails(scores)
    const compressedResult = compressSuggestions({ suggestions: suggestions as SuggestionType[] })
    return ResponseTemplate(200, `get suggestions`, compressedResult)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get suggestions: ${(error as unknown as Error).message}`)
  }
}

const BENEFITS_LENGTH = 12
const MAX_BENEFITS_DIFF =
  Array.from({ length: BENEFITS_LENGTH / 2 }, (_, i) => Math.trunc(BENEFITS_LENGTH - 1 - i * 2)).reduce((t, n) => t + n, 0) * 2

const MAX_SKILLS_DIFF = 120

const compareBenefits = (benefitsTarget: number[], benefitsComparable: number[], max: number) => {
  return benefitsTarget.reduce((score, value, i) => score + Math.abs(benefitsComparable.indexOf(value) - i), 0) / max
}

const compareSkills = (skillsTarget: number[], skillsComparable: number[], max: number) => {
  return skillsTarget.reduce((score, value, i) => score + Math.abs(value - skillsComparable[i]), 0) / max
}

const compareTests = (targetTest: Test, tests: Test[]) => {
  type ScoreType = { benefits: number; skills: number; llmSkills: number; specialtyId: string }
  const scores = tests.reduce((scores, test) => {
    if (test.specialtyId === null) return scores
    const benefitsScore = compareBenefits(targetTest.benefits, test.benefits, MAX_BENEFITS_DIFF)
    const skillsScore = compareSkills(targetTest.skills, test.skills, MAX_SKILLS_DIFF)
    const llmSkillsScore = compareSkills(targetTest.llmSkills, test.llmSkills, MAX_SKILLS_DIFF)
    scores.push({ benefits: benefitsScore, skills: skillsScore, llmSkills: llmSkillsScore, specialtyId: test.specialtyId })
    return scores
  }, [] as ScoreType[])
  const scoreMap = new Map<string, { benefitsSum: number; skillsSum: number; llmSkillsSum: number; count: number }>()
  scores.forEach(({ benefits, skills, llmSkills, specialtyId }) => {
    const current = scoreMap.get(specialtyId) || { benefitsSum: 0, skillsSum: 0, llmSkillsSum: 0, count: 0 }
    scoreMap.set(specialtyId, {
      benefitsSum: current.benefitsSum + benefits,
      skillsSum: current.skillsSum + skills,
      llmSkillsSum: current.llmSkillsSum + llmSkills,
      count: current.count + 1,
    })
  })
  const specialtiesScores = Array.from(scoreMap.entries())
    .map(([specialtyId, sums]) => ({
      specialtyId,
      benefits: sums.benefitsSum / sums.count,
      skills: sums.skillsSum / sums.count,
      llmSkills: sums.llmSkillsSum / sums.count,
    }))
    .sort((a, b) => a.benefits + a.skills + a.llmSkills - (b.benefits + b.skills + b.llmSkills))
  return specialtiesScores
}

const getScoresWithDetails = async (
  scores: {
    specialtyId: string
    benefits: number
    skills: number
    llmSkills: number
  }[],
): Promise<
  {
    benefits: number
    skills: number
    llmSkills: number
    specialty: Specialty
    faculty: Faculty
    university: University
  }[]
> => {
  const specialtyCache: Record<string, Specialty> = {}
  const facultyCache: Record<string, Faculty> = {}
  const universityCache: Record<string, University> = {}
  const fetchWithCache = async <T>(id: string, cache: Record<string, T>, fetchFn: () => Promise<T>): Promise<T> => {
    if (cache[id]) return cache[id]
    const data = await fetchFn()
    cache[id] = data
    return data
  }
  const result = await Promise.all(
    scores.map(async ({ specialtyId, benefits, skills, llmSkills }) => {
      const specialty = await fetchWithCache(specialtyId, specialtyCache, async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specialty/${specialtyId}`)
        if (!res.ok) throw new Error("Failed to fetch specialty")
        const data = await res.json()
        if (!data.data) throw new Error("Specialty data is null")
        return data.data
      })
      const faculty = await fetchWithCache(specialty.facultyId, facultyCache, async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faculty/${specialty.facultyId}`)
        if (!res.ok) throw new Error("Failed to fetch faculty")
        const data = await res.json()
        if (!data.data) throw new Error("Faculty data is null")
        return data.data
      })
      const university = await fetchWithCache(faculty.universityId, universityCache, async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/university/${faculty.universityId}`)
        if (!res.ok) throw new Error("Failed to fetch university")
        const data = await res.json()
        if (!data.data) throw new Error("University data is null")
        return data.data
      })
      return { benefits, skills, llmSkills, specialty, faculty, university }
    }),
  )

  return result
}
