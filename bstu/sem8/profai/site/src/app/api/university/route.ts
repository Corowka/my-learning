import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid university data")
  }
  try {
    const university = await prisma.university.create({
      data: {
        id: data.id,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })
    if (!university) {
      return ResponseTemplate(400, "while creating university")
    }
    return ResponseTemplate(200, "university was created", university)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create university: ${(error as unknown as Error).message}`)
  }
}
