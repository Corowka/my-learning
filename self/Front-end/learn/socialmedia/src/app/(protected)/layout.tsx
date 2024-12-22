"use server"

import styles from "./layout.module.css"

import { Navigation } from "@/modules/shared/navigation/navigation"

const ProtectedPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <Navigation />
        </div>
        <div className={styles.rightSide}>{children}</div>
      </div>
    </div>
  )
}

export default ProtectedPagesLayout
