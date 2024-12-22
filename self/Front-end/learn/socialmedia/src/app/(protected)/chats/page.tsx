"use server"

import { Chats } from "@/modules/chats/chats"

import styles from "./page.module.css"

const Page = () => {
  return (
    <main className={styles.container}>
      <Chats />
    </main>
  )
}

export default Page
