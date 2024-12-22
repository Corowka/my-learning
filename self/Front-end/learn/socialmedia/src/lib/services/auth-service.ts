import { HOST, PORT } from "../config"

type AuthData = {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    username: string
    email: string
    isActivated: boolean
  }
}

export class AuthService {
  static async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<{
    status: number
    message?: string
    data?: AuthData
  }> {
    const res = await fetch(`http://${HOST}:${PORT}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { status: res.status, message: data?.message }
    }
    return { status: res.status, data }
  }

  static async loginUser(
    email: string,
    password: string,
  ): Promise<{
    status: number
    message?: string
    data?: AuthData
  }> {
    const res = await fetch(`http://${HOST}:${PORT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { status: res.status, message: data?.message }
    }
    return { status: res.status, data }
  }

  static async logoutUser(): Promise<{
    status: number
    message?: string
  }> {
    const res = await fetch(`http://${HOST}:${PORT}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    if (!res.ok) {
      return { status: res.status, message: data?.message }
    }
    return { status: res.status }
  }
  static async refresh(): Promise<{
    status: number
    message?: string
    data?: AuthData
  }> {
    const res = await fetch(`http://${HOST}:${PORT}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    if (!res.ok) {
      return { status: res.status, message: data?.message }
    }
    return { status: res.status, data }
  }
}
