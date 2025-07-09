"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { push } = useRouter()

  useEffect(() => {
    push("/search")
  }, [push])

  return null
}
