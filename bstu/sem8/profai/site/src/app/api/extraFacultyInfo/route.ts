import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid extraFacultyInfo data")
  }
  try {
    const extraFacultyInfo = await prisma.extraFacultyInfo.create({
      data: {
        id: data.id,
        faculty: {
          connect: {
            id: data.facultyId,
          },
        },
      },
    })
    if (!extraFacultyInfo) {
      return ResponseTemplate(400, "while creating extraFacultyInfo")
    }
    return ResponseTemplate(200, "extraFacultyInfo was created", extraFacultyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create extraFacultyInfo: ${(error as unknown as Error).message}`)
  }
}
