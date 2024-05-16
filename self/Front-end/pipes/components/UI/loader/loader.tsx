import styles from "./loader.module.css"

export const Loader = () => {

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        Загрузка...
      </div>
    </div>
  )
}