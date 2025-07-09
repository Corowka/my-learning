"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

import { TestForm } from "@/modules/test/TestForm/TestForm"

export default function Test() {
  const { status } = useSession()

  if (status === "authenticated") {
    return <TestForm />
  }

  return <Link href='/api/auth/signin'>Sign in</Link>
}
