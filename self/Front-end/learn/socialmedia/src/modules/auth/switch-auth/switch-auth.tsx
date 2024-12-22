import { Button } from "@/UI/button/button"
import { Content } from "@/UI/content/content"
import { Text } from "@/UI/text/text"

import styles from "./switch-auth.module.css"

interface SwitchAuthProps {
  isSingIn: boolean
  setIsSingIn: (newIsSingIn: boolean) => void
}

export const SwitchAuth = ({ isSingIn, setIsSingIn }: SwitchAuthProps) => {
  return (
    <Content
      padding="24px"
      maxWidth="320px"
      width="100%"
    >
      <div className={styles.container}>
        <Button
          width="100%"
          type="green"
          text={isSingIn ? "Sing Up" : "Sing In"}
          onClick={() => setIsSingIn(!isSingIn)}
        />
        <Text
          textAlign="center"
          text={`After signing ${isSingIn ? "in" : "up"}, you'll get access to all features`}
          type="extra"
        />
      </div>
    </Content>
  )
}
