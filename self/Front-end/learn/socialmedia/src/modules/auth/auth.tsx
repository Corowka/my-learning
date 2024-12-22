"use client"

import { useState } from "react"

import styles from "./auth.module.css"
import { SingInForm } from "./sing-in-form/sing-in-form"
import { SingUpForm } from "./sing-up-form/sing-up-form"
import { SwitchAuth } from "./switch-auth/switch-auth"

export const Auth = () => {
  const [isSingIn, setIsSingIn] = useState(true)

  return (
    <div className={styles.container}>
      {isSingIn ? <SingInForm /> : <SingUpForm />}
      <SwitchAuth
        isSingIn={isSingIn}
        setIsSingIn={setIsSingIn}
      />
    </div>
  )
}
