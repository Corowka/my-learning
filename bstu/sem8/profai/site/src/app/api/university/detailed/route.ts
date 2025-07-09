import { prisma } from "@/config/prisma"

import { ResponseTemplate } from "../../utils"

export async function GET() {
  try {
    const universities = await prisma.university.findMany({
      include: {
        faculties: {
          include: {
            extraInfo: true,
            specialties: { include: { extraInfo: true, test: true } },
          },
        },
        extraInfo: true,
      },
    })
    if (!universities) {
      return ResponseTemplate(400, "while getting all universities")
    }
    return ResponseTemplate(200, "universities were received", universities)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get universities: ${(error as unknown as Error).message}`)
  }
}
