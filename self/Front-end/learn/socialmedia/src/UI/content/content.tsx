import React, { Children } from "react"

import { cn } from "@/utils/cn"

import styles from "./content.module.css"

interface ContentProps {
  padding?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const Content = ({
  padding,
  maxWidth,
  maxHeight,
  width,
  height,
  className,
  style,
  children,
}: ContentProps) => {
  return (
    <div
      style={{ ...style, padding, maxWidth, maxHeight, width, height }}
      className={cn(styles.container, className)}
    >
      {children}
    </div>
  )
}
