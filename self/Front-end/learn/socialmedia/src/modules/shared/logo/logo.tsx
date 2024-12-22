import styles from "./logo.module.css"

export const Logo = () => {
  return (
    <p className={styles.container}>
      <span className={styles.image}>🐶</span>
      <span className={styles.name}>pesogram</span>
    </p>
  )
}
