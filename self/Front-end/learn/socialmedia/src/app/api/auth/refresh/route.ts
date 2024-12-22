"use server"

import bcrypt from "bcrypt"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { v4 } from "uuid"

import connect from "@/lib/mongo/connect"
import { Token } from "@/lib/mongo/models/token-model"
import { User } from "@/lib/mongo/models/user-model"

export async function POST(req: NextRequest) {
  const refreshTokenCookie = cookies().get("refreshToken")?.value

  if (!refreshTokenCookie) {
    return NextResponse.json({ status: 400, message: "Refresh token doesn't exist in cookies" })
  }

  await connect()

  let refreshTokenData = await Token.findOne({ refreshToken: refreshTokenCookie })

  if (!refreshTokenData) {
    return NextResponse.json({
      status: 400,
      message: "Refresh token doesn't exist in database",
    })
  }

  const isValidRefreshToken = await jwtVerify(
    refreshTokenData.refreshToken,
    new TextEncoder().encode(process.env.JWT_REFRESH!),
  )

  if (!isValidRefreshToken) {
    return NextResponse.json({
      status: 400,
      message: `Invalid refresh token`,
    })
  }

  const user = await User.findOne({ _id: refreshTokenData.user })

  if (!user) {
    return NextResponse.json({
      status: 400,
      message: `User with _id: ${refreshTokenData.userId} doesn't exist`,
    })
  }

  const userDto = {
    id: user._id,
    username: user.username,
    email: user.email,
    isActivated: user.isActivated,
  }

  const encoder = new TextEncoder()

  const jwtAccessKey = encoder.encode(process.env.JWT_ACCESS)
  const jwtRefreshKey = encoder.encode(process.env.JWT_REFRESH)

  if (!jwtAccessKey || !jwtRefreshKey) {
    return NextResponse.json({ status: 500 })
  }

  const accessToken = await new SignJWT(userDto)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(jwtAccessKey)
  const refreshToken = await new SignJWT(userDto)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("60d")
    .sign(jwtRefreshKey)

  if (refreshTokenData) {
    refreshTokenData.refreshToken = refreshToken
    await refreshTokenData.save()
  } else {
    await Token.create({ userId: user._id, refreshToken })
  }

  cookies().set("refreshToken", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

  return NextResponse.json({ accessToken, refreshToken, user: userDto })
}
