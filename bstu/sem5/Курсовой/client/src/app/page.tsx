"use client"

import styles from './page.module.css'
import ListWrapper from '../components/list/ListWrapper'

export default function Home() {
  return (
    <main className={styles.main}>
      <ListWrapper/>
    </main>
  )
}
