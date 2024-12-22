import { cn } from "@/utils/cn"

import styles from "./text.module.css"

interface TextProps {
  margin?: number | string
  className?: string
  style?: React.CSSProperties
  textAlign?: "center" | "left" | "right"
  type: "main" | "extra" | "error"
  text: string
}

export const Text = ({ className, style, textAlign, type, text, margin }: TextProps) => {
  let typeStyle
  switch (type) {
    case "main":
      typeStyle = styles.mainContainer
      break
    case "extra":
      typeStyle = styles.extraContainer
      break
    case "error":
      typeStyle = styles.errorContainer
      break
    default:
      typeStyle = ""
  }

  return (
    <p
      style={{ ...style, textAlign, margin }}
      className={cn(styles.container, typeStyle, className)}
    >
      {text}
    </p>
  )
}
