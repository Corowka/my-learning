import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    extraSpecialtyInfoId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { extraSpecialtyInfoId } = await params
  if (!extraSpecialtyInfoId) {
    return ResponseTemplate(400, "invalid extraSpecialtyInfoId")
  }
  try {
    const extraSpecialtyInfo = await prisma.extraSpecialtyInfo.findUnique({ where: { id: extraSpecialtyInfoId } })
    if (!extraSpecialtyInfo) {
      return ResponseTemplate(400, "No extraSpecialtyInfo with such id")
    }
    return ResponseTemplate(200, `data for extraSpecialtyInfo with id: ${extraSpecialtyInfoId}`, extraSpecialtyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get extraSpecialtyInfo: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { extraSpecialtyInfoId } = await params
  if (!extraSpecialtyInfoId) {
    return ResponseTemplate(400, "invalid extraSpecialtyInfoId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid extraSpecialtyInfo data")
  }
  try {
    const extraSpecialtyInfo = await prisma.extraSpecialtyInfo.update({ where: { id: extraSpecialtyInfoId }, data })
    if (!extraSpecialtyInfo) {
      return ResponseTemplate(400, "No extraSpecialtyInfo with such id")
    }
    return ResponseTemplate(200, `data was updated for extraSpecialtyInfo with id: ${extraSpecialtyInfoId}`, extraSpecialtyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update extraSpecialtyInfo: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { extraSpecialtyInfoId } = await params
  if (!extraSpecialtyInfoId) {
    return ResponseTemplate(400, "invalid extraSpecialtyInfoId")
  }
  try {
    const extraSpecialtyInfo = await prisma.extraSpecialtyInfo.delete({ where: { id: extraSpecialtyInfoId } })
    if (!extraSpecialtyInfo) {
      return ResponseTemplate(400, "No extraSpecialtyInfo with such id")
    }
    return ResponseTemplate(200, `data was deleted for extraSpecialtyInfo with id: ${extraSpecialtyInfoId}`, extraSpecialtyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete extraSpecialtyInfo: ${(error as unknown as Error).message}`)
  }
}
