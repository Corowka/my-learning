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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: { include: { tests: true } },
        university: {
          include: {
            faculties: {
              include: {
                extraInfo: true,
                specialties: { include: { extraInfo: true } },
              },
            },
            extraInfo: true,
          },
        },
      },
    })
    if (!user) {
      return ResponseTemplate(400, "no user with such id")
    }
    return ResponseTemplate(200, `detailed data for user with id ${userId}`, user)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get detailed user: ${(error as unknown as Error).message}`)
  }
}
