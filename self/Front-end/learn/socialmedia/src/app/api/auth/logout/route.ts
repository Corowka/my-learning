"use server"

import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import connect from "@/lib/mongo/connect"
import { Token } from "@/lib/mongo/models/token-model"

export async function POST(req: NextRequest) {
  const refreshToken = cookies().get("refreshToken")?.value

  if (!refreshToken) {
    return NextResponse.json({ message: "Refresh token doesn't exist" }, { status: 400 })
  }

  await connect()
  await Token.deleteOne({ refreshToken })

  cookies().delete("refreshToken")

  return NextResponse.json({ message: "Success" })
}
