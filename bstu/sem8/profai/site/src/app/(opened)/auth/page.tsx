import { AuthForm } from "@/modules/auth/AuthForm/AuthForm"

import styles from "./page.module.css"

const Auth = () => {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  )
}

export default Auth
