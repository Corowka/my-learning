import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid specialty data")
  }
  try {
    const specialty = await prisma.specialty.create({
      data: {
        id: data.id,
        faculty: {
          connect: {
            id: data.facultyId,
          },
        },
      },
    })
    if (!specialty) {
      return ResponseTemplate(400, "while creating specialty")
    }
    return ResponseTemplate(200, "specialty was created", specialty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create specialty: ${(error as unknown as Error).message}`)
  }
}
