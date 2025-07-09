import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid student data")
  }
  try {
    const student = await prisma.student.create({
      data: {
        id: data.id,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })
    if (!student) {
      return ResponseTemplate(400, "while creating student")
    }
    return ResponseTemplate(200, "student was created", student)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create student: ${(error as unknown as Error).message}`)
  }
}
