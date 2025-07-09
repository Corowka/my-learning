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
    const faculty = await prisma.faculty.findUnique({
      where: { id: facultyId },
      include: {
        extraInfo: true,
        specialties: { include: { extraInfo: true } },
      },
    })
    if (!faculty) {
      return ResponseTemplate(400, "no faculty with such id")
    }
    return ResponseTemplate(200, `detailed data for faculty with id ${facultyId}`, faculty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get detailed faculty: ${(error as unknown as Error).message}`)
  }
}
