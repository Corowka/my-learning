import { cn } from "@/utils/cn"
import { AntdIconType } from "../types"
import styles from "./icon-button.module.css"

interface IconButtonProps {
  size?: "small" | "medium" | "large"
  className?: string
  style?: React.CSSProperties
  icon: AntdIconType
  onClick: () => void
}

export const IconButton = ({
  size,
  icon: IconComponent,
  onClick,
  className,
  style,
}: IconButtonProps) => {
  let sizeStyle = ""
  switch (size) {
    case "medium":
      sizeStyle = styles.medium
      break
    case "large":
      sizeStyle = styles.large
      break
    default:
      sizeStyle = ""
  }

  return (
    <button
      style={style}
      className={cn(styles.button, className, sizeStyle)}
      onClick={onClick}
    >
      <IconComponent />
    </button>
  )
}
