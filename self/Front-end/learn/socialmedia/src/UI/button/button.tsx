import Link from "next/link"

import { cn } from "@/utils/cn"

import styles from "./button.module.css"

interface ButtonProps {
  href?: string
  type: "white" | "green"
  text?: string
  btnType?: "button" | "submit" | "reset"
  onClick?: () => void
  width?: string | number
}

export const Button = ({ href, type, text, onClick, btnType = "button", width }: ButtonProps) => {
  let typeStyle
  switch (type) {
    case "white":
      typeStyle = styles.whiteType
      break
    case "green":
      typeStyle = styles.greenType
      break
    default:
      typeStyle = styles.whiteType
      break
  }

  const ButtonComponent = (
    <button
      className={cn(styles.container, typeStyle)}
      style={{ width }}
      type={btnType}
      onClick={onClick}
    >
      {text}
    </button>
  )

  if (href && onClick) {
    return <Link href={href}>{ButtonComponent}</Link>
  }

  if (href && !onClick) {
    return <Link href={href} />
  }

  return ButtonComponent
}
