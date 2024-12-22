"use server"

import { NextRequest, NextResponse } from "next/server"

import connect from "@/lib/mongo/connect"
import { User } from "@/lib/mongo/models/user-model"

export async function GET(req: NextRequest) {
  await connect()

  const users = await User.find()

  return NextResponse.json({ status: 200, users: users })
}
