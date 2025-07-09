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
    const student = await prisma.student.findUnique({ where: { id: studentId } })
    if (!student) {
      return ResponseTemplate(400, "No student with such id")
    }
    return ResponseTemplate(200, `data for student with id: ${studentId}`, student)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get student: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { studentId } = await params
  if (!studentId) {
    return ResponseTemplate(400, "invalid studentId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid student data")
  }
  try {
    const student = await prisma.student.update({ where: { id: studentId }, data })
    if (!student) {
      return ResponseTemplate(400, "No student with such id")
    }
    return ResponseTemplate(200, `data was updated for student with id: ${studentId}`, student)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update student: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { studentId } = await params
  if (!studentId) {
    return ResponseTemplate(400, "invalid studentId")
  }
  try {
    const student = await prisma.student.delete({ where: { id: studentId } })
    if (!student) {
      return ResponseTemplate(400, "No student with such id")
    }
    return ResponseTemplate(200, `data was deleted for student with id: ${studentId}`, student)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete student: ${(error as unknown as Error).message}`)
  }
}
