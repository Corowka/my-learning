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
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { tests: true },
    })
    if (!student) {
      return ResponseTemplate(400, "no student with such id")
    }
    return ResponseTemplate(200, `detailed data for student with id ${studentId}`, student)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create student: ${(error as unknown as Error).message}`)
  }
}
