import styles from "./label.module.css"

interface LabelProps {
  text: string
  style?: {}
}

export const Label = ({ text, style }: LabelProps) => {
  return (
    <p className={styles.label} style={style}>
      {text}
    </p>
  )
}