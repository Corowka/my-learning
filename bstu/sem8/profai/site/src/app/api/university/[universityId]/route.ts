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
    const university = await prisma.university.findUnique({ where: { id: universityId } })
    if (!university) {
      return ResponseTemplate(400, "No university with such id")
    }
    return ResponseTemplate(200, `data for university with id: ${universityId}`, university)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get university: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { universityId } = await params
  if (!universityId) {
    return ResponseTemplate(400, "invalid universityId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid university data")
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, ...newData } = data
  try {
    const university = await prisma.university.update({ where: { id: universityId }, data: newData })
    if (!university) {
      return ResponseTemplate(400, "No university with such id")
    }
    return ResponseTemplate(200, `data was updated for university with id: ${universityId}`, university)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update university: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { universityId } = await params
  if (!universityId) {
    return ResponseTemplate(400, "invalid universityId")
  }
  try {
    const university = await prisma.university.delete({ where: { id: universityId } })
    if (!university) {
      return ResponseTemplate(400, "No university with such id")
    }
    return ResponseTemplate(200, `data was deleted for university with id: ${universityId}`, university)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete university: ${(error as unknown as Error).message}`)
  }
}
