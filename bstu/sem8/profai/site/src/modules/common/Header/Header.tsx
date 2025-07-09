"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

import LogoutIcon from "@mui/icons-material/Logout"
import { Avatar, Button, IconButton, Typography, useMediaQuery } from "@mui/material"

import styles from "./Header.module.css"

export const Header = () => {
  const { data: session, status } = useSession()
  const isMobile = useMediaQuery("(max-width: 768px)")
  return (
    <div className={styles.container}>
      <Link href='/' className={styles.link}>
        <Typography fontWeight={600} variant={`h4`} component='span' color='#232323'>
          Prof
          <Typography fontWeight={600} variant={`h4`} component='span' color='#e6f4ff'>
            AI
          </Typography>
        </Typography>
      </Link>
      {status === "authenticated" ? (
        <div className={styles.row}>
          {session?.user.role === "student" && (
            <Link href='/test' className={styles.link}>
              <Button variant='contained'>{isMobile ? "Тест" : "Пройти тест"}</Button>
            </Link>
          )}
          <Link href={session.user.role === "student" ? "/profile/student" : "/profile/university"}>
            <Button>
              <div className={styles.row}>
                {!isMobile && (
                  <Typography variant={`body1`} component='span' color='#e6f4ff'>
                    {session.user.email}
                  </Typography>
                )}
                <Avatar alt={session.user.name as string} src={session.user.image as string} />
              </div>
            </Button>
          </Link>
          <IconButton aria-label='quit account' onClick={() => signOut({ callbackUrl: "/auth" })}>
            <LogoutIcon />
          </IconButton>
        </div>
      ) : (
        <Link href='/auth'>
          <Button variant='contained'>Войти</Button>
        </Link>
      )}
    </div>
  )
}
