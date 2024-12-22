"use server"

import Link from "next/link"
import styles from "./header.module.css"
import { Logo } from "@/modules/shared/logo/logo"

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/home" className={styles.homeLink}>
          <Logo />
        </Link>
      </div>
    </div>
  )
}
