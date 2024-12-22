"use server"

import { jwtVerify } from "jose"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import { checkLoginMiddleware } from "./lib/middlewares/check-login-middleware"

export async function middleware(req: NextRequest) {
  const response = await checkLoginMiddleware(req)

  if (!String(response?.status).startsWith("4")) {
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
