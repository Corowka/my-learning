"use server"

import { jwtVerify } from "jose"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { HOST, PORT } from "../config"
import { AuthService } from "../services/auth-service"

const protectedRoutes = ["/api/users", "/api/audios"]

const protectedPages = ["/home", "/audio", "/eva"]

export const checkLoginMiddleware = async (req: NextRequest) => {
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const accessToken = headers().get("Authentication")?.split(" ")[1]

    if (!accessToken) {
      return NextResponse.redirect(new URL(`http://${HOST}:${PORT}/auth`))
    }

    const isValidAccessToken = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_ACCESS!),
    )

    if (!isValidAccessToken) {
      const res = await AuthService.refresh()
      if (!res.data || !res.data.accessToken) {
        return NextResponse.redirect(new URL(`http://${HOST}:${PORT}/auth`))
      }

      headers().set("Authentication", `Bearer ${accessToken}`)
    }
  }
}
