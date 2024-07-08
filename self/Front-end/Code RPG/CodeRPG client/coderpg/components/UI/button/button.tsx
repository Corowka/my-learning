import styles from "./button.module.css"

interface ButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
  style?: {}
}

export const Button = ({
  title,
  onClick,
  disabled = false,
  style = {},
}: ButtonProps) => {

  return (
    <button
      className={[styles.button, (disabled) ? styles.disabled : {}].join(" ")}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}