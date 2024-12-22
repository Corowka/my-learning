"use server"

import bcrypt from "bcrypt"
import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { v4 } from "uuid"

import connect from "@/lib/mongo/connect"
import { Token } from "@/lib/mongo/models/token-model"
import { User } from "@/lib/mongo/models/user-model"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const refreshTokenCookie = cookies().get("refreshToken")?.value

  if (refreshTokenCookie) {
    return NextResponse.json({ message: "User already login" }, { status: 400 })
  }

  await connect()

  const candidate = await User.findOne({ email })

  if (!candidate) {
    return NextResponse.json({ message: "User with this email doesn't exist" }, { status: 400 })
  }

  const isValidPassword = await bcrypt.compare(password, candidate.password)

  if (!isValidPassword) {
    return NextResponse.json({ message: "Invalid password" }, { status: 400 })
  }

  const candidateDto = {
    id: candidate._id,
    username: candidate.username,
    email: candidate.email,
    isActivated: candidate.isActivated,
  }

  const encoder = new TextEncoder()

  const jwtAccessKey = encoder.encode(process.env.JWT_ACCESS)
  const jwtRefreshKey = encoder.encode(process.env.JWT_REFRESH)

  if (!jwtAccessKey || !jwtRefreshKey) {
    return NextResponse.json({ status: 500 })
  }

  const accessToken = await new SignJWT(candidateDto)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(jwtAccessKey)
  const refreshToken = await new SignJWT(candidateDto)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("60d")
    .sign(jwtRefreshKey)

  let refreshTokenData = await Token.findOne({ id: candidate._id })
  if (refreshTokenData) {
    refreshTokenData.refreshToken = refreshToken
    await refreshTokenData.save()
  } else {
    await Token.create({ user: candidate, refreshToken })
  }

  cookies().set("refreshToken", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

  return NextResponse.json({ accessToken, refreshToken, user: candidateDto })
}
