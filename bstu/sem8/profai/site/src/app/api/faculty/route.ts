import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid faculty data")
  }
  try {
    const faculty = await prisma.faculty.create({
      data: {
        id: data.id,
        university: {
          connect: {
            id: data.universityId,
          },
        },
      },
    })
    if (!faculty) {
      return ResponseTemplate(400, "while creating faculty")
    }
    return ResponseTemplate(200, "faculty was created", faculty)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create faculty: ${(error as unknown as Error).message}`)
  }
}
