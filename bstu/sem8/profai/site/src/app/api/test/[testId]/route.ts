import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    testId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { testId } = await params
  if (!testId) {
    return ResponseTemplate(400, "invalid testId")
  }
  try {
    const test = await prisma.test.findUnique({ where: { id: testId } })
    if (!test) {
      return ResponseTemplate(400, "No test with such id")
    }
    return ResponseTemplate(200, `data for test with id: ${testId}`, test)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get test: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { testId } = await params
  if (!testId) {
    return ResponseTemplate(400, "invalid testId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid test data")
  }
  try {
    const test = await prisma.test.update({ where: { id: testId }, data })
    if (!test) {
      return ResponseTemplate(400, "No test with such id")
    }
    return ResponseTemplate(200, `data was updated for test with id: ${testId}`, test)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update test: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { testId } = await params
  if (!testId) {
    return ResponseTemplate(400, "invalid testId")
  }
  try {
    const test = await prisma.test.delete({ where: { id: testId } })
    if (!test) {
      return ResponseTemplate(400, "No test with such id")
    }
    return ResponseTemplate(200, `data was deleted for test with id: ${testId}`, test)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete test: ${(error as unknown as Error).message}`)
  }
}
