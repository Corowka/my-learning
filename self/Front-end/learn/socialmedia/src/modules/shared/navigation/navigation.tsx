"use client"

import Link from "next/link"

import { Text } from "@/UI/text/text"
import {
  CommentOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  CloseOutlined,
  CalendarOutlined,
  MailOutlined,
} from "@ant-design/icons"

import styles from "./navigation.module.css"
import { AuthService } from "@/lib/services/auth-service"
import { showErrorNotification } from "@/lib/notifications/show-error-notification"
import { useDispatch } from "react-redux"
import { clearAuthState } from "@/store/reducers/auth-reducer"
import { showSuccessNotification } from "@/lib/notifications/show-success-notification"
import { useRouter } from "next/navigation"
import { AntdIconType } from "@/UI/types"

type PageLink = {
  icon: AntdIconType
  name: string
  href: string
}

const pageLinks: PageLink[] = [
  { icon: HomeOutlined, name: "Home", href: "/home" },
  { icon: MailOutlined, name: "Chats", href: "/chats" },
  // { icon: CalendarOutlined, name: "Notes", href: "/notes" },
  // { icon: CustomerServiceOutlined, name: "Music", href: "/audio" },
  { icon: CommentOutlined, name: "Eva", href: "/eva" },
]

export const Navigation = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const onLogout = async () => {
    const res = await AuthService.logoutUser()
    if (res.status !== 200) {
      showErrorNotification(res.message)
      return
    }
    dispatch(clearAuthState())
    localStorage.removeItem("accessToken")
    router.push("/auth")
    showSuccessNotification("See You Later!")
  }

  return (
    <div className={styles.container}>
      {pageLinks.map((pageLink) => (
        <Link
          key={pageLink.name}
          href={pageLink.href}
          className={styles.link}
        >
          <pageLink.icon className={styles.icon} />
          <Text
            className={styles.name}
            type="main"
            text={pageLink.name}
          />
        </Link>
      ))}
      <hr className={styles.line} />
      <button
        onClick={onLogout}
        className={styles.link}
      >
        <CloseOutlined className={styles.icon} />
        <Text
          className={styles.name}
          type="main"
          text={"Log Out"}
        />
      </button>
    </div>
  )
}
