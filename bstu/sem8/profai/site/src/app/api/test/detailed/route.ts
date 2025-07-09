import { prisma } from "@/config/prisma"

import { ResponseTemplate } from "../../utils"

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      include: {
        student: true,
        specialty: true,
      },
    })
    if (!tests) {
      return ResponseTemplate(400, "while getting all tests")
    }
    return ResponseTemplate(200, "tests were received", tests)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `get tests: ${(error as unknown as Error).message}`)
  }
}
