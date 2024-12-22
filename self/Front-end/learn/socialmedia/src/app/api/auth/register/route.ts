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
  const { username, email, password } = await req.json()

  const refreshTokenCookie = cookies().get("refreshToken")?.value

  if (refreshTokenCookie) {
    return NextResponse.json({ message: "User already login" }, { status: 400 })
  }

  await connect()

  const candidate = await User.findOne({ email })

  if (candidate) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 })
  }

  const hashPassword = await bcrypt.hash(password, 3)
  const activationLink = v4()
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    activationLink,
  })

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

  let refreshTokenData = await Token.findOne({ id: user._id })
  if (refreshTokenData) {
    refreshTokenData.refreshToken = refreshToken
    await refreshTokenData.save()
  } else {
    await Token.create({ user, refreshToken })
  }

  cookies().set("refreshToken", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

  return NextResponse.json({ accessToken, refreshToken, user: userDto })
}
