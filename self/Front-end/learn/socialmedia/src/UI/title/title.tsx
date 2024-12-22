import { cn } from "@/utils/cn"

import styles from "./title.module.css"

interface TitleProps {
  className?: string
  style?: React.CSSProperties
  textAlign?: "center" | "left" | "right"
  margin?: string
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  text: string
}

export const Title = ({ className, style, type, text, textAlign, margin }: TitleProps) => {
  const styleObj = { ...style, textAlign, margin }

  switch (type) {
    case "h1":
      return (
        <h1
          style={styleObj}
          className={cn(styles.container, className)}
        >
          {text}
        </h1>
      )
    case "h2":
      return (
        <h2
          style={styleObj}
          className={cn(styles.container, className)}
        >
          {text}
        </h2>
      )
    case "h3":
      return (
        <h3
          style={styleObj}
          className={cn(styles.container, className)}
        >
          {text}
        </h3>
      )
    case "h4":
      return (
        <h4
          style={styleObj}
          className={cn(styles.container, className)}
        >
          {text}
        </h4>
      )
    case "h5":
      return (
        <h5
          style={styleObj}
          className={cn(styles.container, className)}
        >
          {text}
        </h5>
      )
    case "h6":
      return (
        <h6
          style={styleObj}
          className={cn(styles.h6Container, className)}
        >
          {text}
        </h6>
      )
    default:
      return null
  }
}
