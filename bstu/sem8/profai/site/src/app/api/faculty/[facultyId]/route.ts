import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    facultyId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { facultyId } = await params
  if (!facultyId) {
    return ResponseTemplate(400, "invalid facultyId")
  }
  try {
    const faculty = await prisma.faculty.findUnique({ where: { id: facultyId } })
    if (!faculty) {
      return ResponseTemplate(400, "No faculty with such id")
    }
    return ResponseTemplate(200, `data for faculty with id: ${facultyId}`, faculty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get faculty: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { facultyId } = await params
  if (!facultyId) {
    return ResponseTemplate(400, "invalid facultyId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid faculty data")
  }
  try {
    const faculty = await prisma.faculty.update({ where: { id: facultyId }, data })
    if (!faculty) {
      return ResponseTemplate(400, "No faculty with such id")
    }
    return ResponseTemplate(200, `data was updated for faculty with id: ${facultyId}`, faculty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update faculty: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { facultyId } = await params
  if (!facultyId) {
    return ResponseTemplate(400, "invalid facultyId")
  }
  try {
    const faculty = await prisma.faculty.delete({ where: { id: facultyId } })
    if (!faculty) {
      return ResponseTemplate(400, "No faculty with such id")
    }
    return ResponseTemplate(200, `data was deleted for faculty with id: ${facultyId}`, faculty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete faculty: ${(error as unknown as Error).message}`)
  }
}
