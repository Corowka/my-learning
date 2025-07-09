import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid test data")
  }
  try {
    const test = await prisma.test.create({
      data: {
        id: data.id,
        passDate: data.passDate,
        benefits: data.benefits,
        skills: data.skills,
        questions: data.questions,
        llmSkills: data.llmSkills,
        student: {
          connect: {
            id: data.studentId,
          },
        },
        ...(data?.specialtyId?.trim()
          ? {
              specialty: {
                connect: {
                  id: data?.specialtyId,
                },
              },
            }
          : {}),
      },
    })
    if (!test) {
      return ResponseTemplate(400, "while creating test")
    }
    return ResponseTemplate(200, "test was created", test)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create test: ${(error as unknown as Error).message}`)
  }
}
