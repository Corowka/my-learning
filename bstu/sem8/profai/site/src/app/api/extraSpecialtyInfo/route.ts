import { NextRequest } from "next/server"

import { ResponseTemplate } from "@/app/api/utils"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid extraSpecialtyInfo data")
  }
  try {
    const extraSpecialtyInfo = await prisma.extraSpecialtyInfo.create({
      data: {
        id: data.id,
        specialty: {
          connect: {
            id: data.specialtyId,
          },
        },
      },
    })
    if (!extraSpecialtyInfo) {
      return ResponseTemplate(400, "while creating extraSpecialtyInfo")
    }
    return ResponseTemplate(200, "extraSpecialtyInfo was created", extraSpecialtyInfo)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `create extraSpecialtyInfo: ${(error as unknown as Error).message}`)
  }
}
