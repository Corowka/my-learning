import { useState } from "react"
import styles from "./input.module.css"

interface InputProps {
  value: string
  setValue: (value: string) => void
  isValid?: boolean
  helpMessage?: string
  placeholder?: string
  style?: {}
}

export const Input = ({
  value,
  setValue,
  isValid = true,
  helpMessage = "",
  placeholder = "",
  style = {}
}: InputProps) => {

  const [validationParams, setValidationParams] = useState({ message: "", isValid: true });

  return (
    <div className={styles.content}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
        placeholder={placeholder}
        style={style}
      >
      </input>
      <div className={isValid ? styles.validMessage : styles.invalidMessage}>
        {helpMessage}
      </div>
    </div>
  )
}