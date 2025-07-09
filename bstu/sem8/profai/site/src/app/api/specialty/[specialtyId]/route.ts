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
    const specialty = await prisma.specialty.findUnique({ where: { id: specialtyId } })
    if (!specialty) {
      return ResponseTemplate(400, "No specialty with such id")
    }
    return ResponseTemplate(200, `data for specialty with id: ${specialtyId}`, specialty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get specialty: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { specialtyId } = await params
  if (!specialtyId) {
    return ResponseTemplate(400, "invalid specialtyId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid specialty data")
  }
  try {
    const specialty = await prisma.specialty.update({ where: { id: specialtyId }, data })
    if (!specialty) {
      return ResponseTemplate(400, "No specialty with such id")
    }
    return ResponseTemplate(200, `data was updated for specialty with id: ${specialtyId}`, specialty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update specialty: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { specialtyId } = await params
  if (!specialtyId) {
    return ResponseTemplate(400, "invalid specialtyId")
  }
  try {
    const specialty = await prisma.specialty.delete({ where: { id: specialtyId } })
    if (!specialty) {
      return ResponseTemplate(400, "No specialty with such id")
    }
    return ResponseTemplate(200, `data was deleted for specialty with id: ${specialtyId}`, specialty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete specialty: ${(error as unknown as Error).message}`)
  }
}
