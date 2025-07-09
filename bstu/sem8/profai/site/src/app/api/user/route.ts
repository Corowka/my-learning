import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid user data")
  }
  try {
    const user = await prisma.user.create({ ...(data.id ? { id: data.id } : {}), data })
    if (!user) {
      return ResponseTemplate(400, "while creating user")
    }
    return ResponseTemplate(200, "user was created", user)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create user: ${(error as unknown as Error).message}`)
  }
}
