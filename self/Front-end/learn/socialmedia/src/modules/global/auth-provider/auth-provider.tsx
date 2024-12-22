"use client"

import { HOST, PORT } from "@/lib/config"
import { AuthService } from "@/lib/services/auth-service"
import { UsersService } from "@/lib/services/user-service"
import { selectAuth, setAuthState, setUser } from "@/store/reducers/auth-reducer"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const authenticateUser = async () => {
      const refreshRes = await AuthService.refresh()
      if (!refreshRes.data) {
        return
      }
      dispatch(setAuthState(refreshRes.data))
    }

    authenticateUser()
  }, [pathname, dispatch, router])

  return children
}
