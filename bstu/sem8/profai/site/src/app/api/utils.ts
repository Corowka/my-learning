import { NextRequest, NextResponse } from "next/server"

export const ResponseTemplate = (status: number, message: string, data?: unknown) => {
  message = `${status === 200 ? "Success" : "Error"}: ` + message
  return NextResponse.json({ message, data }, { status })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler<C extends object = any> = (req: NextRequest, context: C) => Promise<Response>

export function withRetry(
  handler: Handler,
  retries: number = 3,
  delay: number = 1000,
  shouldRetry: (res: Response) => boolean = (res) => res.status !== 200,
): Handler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: NextRequest, context: any): Promise<Response> => {
    let attempt = 0
    let lastResponse: Response | null = null
    while (attempt < retries) {
      const response = await handler(req, context)
      if (!shouldRetry(response)) return response
      lastResponse = response
      attempt++
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    return lastResponse ?? new Response("Unknown error", { status: 500 })
  }
}
