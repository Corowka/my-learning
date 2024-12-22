"use server"

import { type NextRequest, NextResponse } from "next/server"

import connect from "@/lib/mongo/connect"
import { User } from "@/lib/mongo/models/user-model"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connect()

  const { id } = params

  if (!id) {
    return NextResponse.json({ status: 400, message: "User ID is required" })
  }

  const user = await User.findById({ _id: id })
  if (!user) {
    return NextResponse.json({ status: 404, message: "User not found" })
  }

  return NextResponse.json({ status: 200, user })
}
