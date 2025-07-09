import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    studentId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { studentId } = await params
  if (!studentId) {
    return ResponseTemplate(400, "invalid studentId")
  }
  try {
    const tests = await prisma.test.findMany({
      where: { studentId },
      include: {
        student: true,
        specialty: true,
      },
    })
    if (!tests) {
      return ResponseTemplate(400, "while getting tests with studentId")
    }
    return ResponseTemplate(200, "tests with studentId were received", tests)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get tests with studentId: ${(error as unknown as Error).message}`)
  }
}
