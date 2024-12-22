import { HOST, PORT } from "@/lib/config"
import connect from "@/lib/mongo/connect"
import { Chat } from "@/lib/mongo/models/chat-model"
import { jwtVerify } from "jose"
import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params

  const accessToken = headers().get("Authentication")?.split(" ")[1]

  if (!accessToken) {
    return NextResponse.redirect(new URL(`http://${HOST}:${PORT}/auth`))
  }

  const jwtInfo = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_ACCESS!))

  if (jwtInfo.payload.id !== userId) {
    return NextResponse.json({ message: "Incorrect user" }, { status: 400 })
  }

  const { passkeyHash, name } = await req.json()

  await connect()

  const newChat = await Chat.create({
    passkeyHash,
    name,
    creationDate: Date.now(),
    creator: userId,
    users: [],
  })

  if (!newChat) {
    return NextResponse.json({ message: "Error while creating new chat" }, { status: 500 })
  }

  return NextResponse.json({ data: newChat })
}
