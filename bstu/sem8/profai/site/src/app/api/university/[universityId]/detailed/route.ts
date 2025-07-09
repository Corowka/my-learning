import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    universityId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { universityId } = await params
  if (!universityId) {
    return ResponseTemplate(400, "invalid universityId")
  }
  try {
    const university = await prisma.university.findUnique({
      where: { id: universityId },
      include: {
        faculties: {
          include: {
            extraInfo: true,
            specialties: { include: { extraInfo: true } },
          },
        },
        extraInfo: true,
      },
    })
    if (!university) {
      return ResponseTemplate(400, "no university with such id")
    }
    return ResponseTemplate(200, `detailed data for university with id ${universityId}`, university)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get detailed university: ${(error as unknown as Error).message}`)
  }
}
