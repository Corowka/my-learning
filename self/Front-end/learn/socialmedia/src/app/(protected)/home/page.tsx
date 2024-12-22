"use server"

import { Title } from "@/UI/title/title"
import styles from "./page.module.css"

const Page = () => {
  return (
    <main className={styles.container}>
      <Title
        type="h1"
        text="Home page"
      />
    </main>
  )
}

export default Page
