"use server"

import { Auth } from "@/modules/auth/auth"

import styles from "./page.module.css"

const Page = () => {
  return (
    <main className={styles.container}>
      <Auth />
    </main>
  )
}

export default Page
