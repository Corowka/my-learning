import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid extraUniversityInfo data")
  }
  try {
    const extraUniversityInfo = await prisma.extraUniversityInfo.create({
      data: {
        id: data.id,
        university: {
          connect: {
            id: data.universityId,
          },
        },
      },
    })
    if (!extraUniversityInfo) {
      return ResponseTemplate(400, "while creating extraUniversityInfo")
    }
    return ResponseTemplate(200, "extraUniversityInfo was created", extraUniversityInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create extraUniversityInfo: ${(error as unknown as Error).message}`)
  }
}
