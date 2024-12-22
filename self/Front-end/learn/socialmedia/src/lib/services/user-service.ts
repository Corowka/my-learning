import { HOST, PORT } from "../config"

export type User = {
  id: string
  username: string
  email: string
  isActivated: boolean
}

export class UsersService {
  static async get(id: string): Promise<{
    status: number
    message?: string
    data?: User
  }> {
    const accessToken = localStorage.getItem("accessToken") || null
    if (!accessToken) {
      return { status: 400, message: "User isn't login" }
    }
    const res = await fetch(`http://${HOST}:${PORT}/api/users/get/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${accessToken}`,
      },
    })
    const data = await res.json()
    if (!res.ok) {
      return { status: res.status, message: data?.message }
    }
    return { status: res.status, data }
  }
}
