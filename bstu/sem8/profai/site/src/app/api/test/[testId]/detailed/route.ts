import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

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
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        student: true,
        specialty: true,
      },
    })
    if (!test) {
      return ResponseTemplate(400, "no test with such id")
    }
    return ResponseTemplate(200, `detailed data for test with id ${testId}`, test)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get detailed test: ${(error as unknown as Error).message}`)
  }
}
