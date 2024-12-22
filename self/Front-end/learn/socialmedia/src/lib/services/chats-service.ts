import { HOST, PORT } from "../config"

export type Chat = {
  id: string
  users: string[]
  creationDate: number
  name: string
  type: "local" | "public"
}

export class ChatsService {
  static async getUserSaved(
    userId: string,
    name: string,
    passkeyHash: string,
  ): Promise<{
    status: number
    message?: string
    data?: Chat[]
  }> {
    const accessToken = localStorage.getItem("accessToken") || null
    if (!accessToken) {
      return { status: 400, message: "User isn't login" }
    }
    const res = await fetch(`http://${HOST}:${PORT}/api/chats/${userId}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        passkeyHash,
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { status: res.status, message: data?.message }
    }
    return { status: res.status, data }
  }
}
