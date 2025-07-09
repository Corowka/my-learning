import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

interface ParamsProps {
  params: Promise<{
    userId: string
  }>
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { userId } = await params
  if (!userId) {
    return ResponseTemplate(400, "invalid userId")
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return ResponseTemplate(400, "No user with such id")
    }
    return ResponseTemplate(200, `data for user with id: ${userId}`, user)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get user: ${(error as unknown as Error).message}`)
  }
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { userId } = await params
  if (!userId) {
    return ResponseTemplate(400, "invalid userId")
  }
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid user data")
  }
  try {
    const user = await prisma.user.update({ where: { id: userId }, data })
    if (!user) {
      return ResponseTemplate(400, "No user with such id")
    }
    return ResponseTemplate(200, `data was updated for user with id: ${userId}`, user)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `update user: ${(error as unknown as Error).message}`)
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const { userId } = await params
  if (!userId) {
    return ResponseTemplate(400, "invalid userId")
  }
  try {
    const user = await prisma.user.delete({ where: { id: userId } })
    if (!user) {
      return ResponseTemplate(400, "No user with such id")
    }
    return ResponseTemplate(200, `data was deleted for user with id: ${userId}`, user)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `delete user: ${(error as unknown as Error).message}`)
  }
}
