import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    extraUniversityInfoId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { extraUniversityInfoId } = await params
  if (!extraUniversityInfoId) {
    return ResponseTemplate(400, "invalid extraUniversityInfoId")
  }
  try {
    const extraUniversityInfo = await prisma.extraUniversityInfo.findUnique({ where: { id: extraUniversityInfoId } })
    if (!extraUniversityInfo) {
      return ResponseTemplate(400, "No extraUniversityInfo with such id")
    }
    return ResponseTemplate(200, `data for extraUniversityInfo with id: ${extraUniversityInfoId}`, extraUniversityInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get extraUniversityInfo: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { extraUniversityInfoId } = await params
  if (!extraUniversityInfoId) {
    return ResponseTemplate(400, "invalid extraUniversityInfoId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid extraUniversityInfo data")
  }
  try {
    const extraUniversityInfo = await prisma.extraUniversityInfo.update({ where: { id: extraUniversityInfoId }, data })
    if (!extraUniversityInfo) {
      return ResponseTemplate(400, "No extraUniversityInfo with such id")
    }
    return ResponseTemplate(200, `data was updated for extraUniversityInfo with id: ${extraUniversityInfoId}`, extraUniversityInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update extraUniversityInfo: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { extraUniversityInfoId } = await params
  if (!extraUniversityInfoId) {
    return ResponseTemplate(400, "invalid extraUniversityInfoId")
  }
  try {
    const extraUniversityInfo = await prisma.extraUniversityInfo.delete({ where: { id: extraUniversityInfoId } })
    if (!extraUniversityInfo) {
      return ResponseTemplate(400, "No extraUniversityInfo with such id")
    }
    return ResponseTemplate(200, `data was deleted for extraUniversityInfo with id: ${extraUniversityInfoId}`, extraUniversityInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete extraUniversityInfo: ${(error as unknown as Error).message}`)
  }
}
