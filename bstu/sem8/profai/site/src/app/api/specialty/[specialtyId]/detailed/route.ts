import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    specialtyId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { specialtyId } = await params
  if (!specialtyId) {
    return ResponseTemplate(400, "invalid specialtyId")
  }
  try {
    const specialty = await prisma.specialty.findUnique({
      where: { id: specialtyId },
      include: { extraInfo: true, test: true },
    })
    if (!specialty) {
      return ResponseTemplate(400, "no specialty with such id")
    }
    return ResponseTemplate(200, `detailed data for specialty with id ${specialtyId}`, specialty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get detailed specialty: ${(error as unknown as Error).message}`)
  }
}
