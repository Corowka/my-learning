import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    extraFacultyInfoId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { extraFacultyInfoId } = await params
  if (!extraFacultyInfoId) {
    return ResponseTemplate(400, "invalid extraFacultyInfoId")
  }
  try {
    const extraFacultyInfo = await prisma.extraFacultyInfo.findUnique({ where: { id: extraFacultyInfoId } })
    if (!extraFacultyInfo) {
      return ResponseTemplate(400, "No extraFacultyInfo with such id")
    }
    return ResponseTemplate(200, `data for extraFacultyInfo with id: ${extraFacultyInfoId}`, extraFacultyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get extraFacultyInfo: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { extraFacultyInfoId } = await params
  if (!extraFacultyInfoId) {
    return ResponseTemplate(400, "invalid extraFacultyInfoId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid extraFacultyInfo data")
  }
  try {
    const extraFacultyInfo = await prisma.extraFacultyInfo.update({ where: { id: extraFacultyInfoId }, data })
    if (!extraFacultyInfo) {
      return ResponseTemplate(400, "No extraFacultyInfo with such id")
    }
    return ResponseTemplate(200, `data was updated for extraFacultyInfo with id: ${extraFacultyInfoId}`, extraFacultyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update extraFacultyInfo: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { extraFacultyInfoId } = await params
  if (!extraFacultyInfoId) {
    return ResponseTemplate(400, "invalid extraFacultyInfoId")
  }
  try {
    const extraFacultyInfo = await prisma.extraFacultyInfo.delete({ where: { id: extraFacultyInfoId } })
    if (!extraFacultyInfo) {
      return ResponseTemplate(400, "No extraFacultyInfo with such id")
    }
    return ResponseTemplate(200, `data was deleted for extraFacultyInfo with id: ${extraFacultyInfoId}`, extraFacultyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete extraFacultyInfo: ${(error as unknown as Error).message}`)
  }
}
