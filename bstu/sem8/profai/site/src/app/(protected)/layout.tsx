"use client"

import { Header } from "@/modules/common/Header/Header"

import styles from "./layout.module.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className={styles.container}>{children}</div>
    </>
  )
}
