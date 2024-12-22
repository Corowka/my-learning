import { forwardRef } from "react"

import { cn } from "@/utils/cn"

import styles from "./input.module.css"

interface InputProps {
  width?: number | string
  style?: React.CSSProperties
  className?: string
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, style, value, onChange, placeholder, width }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(styles.content, className)}
        style={{ ...style, width }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    )
  },
)
