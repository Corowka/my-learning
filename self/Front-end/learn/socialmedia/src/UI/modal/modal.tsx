import { CloseOutlined } from "@ant-design/icons"
import { IconButton } from "../icon-button/icon-button"
import styles from "./modal.module.css"

interface ModalProps {
  isOpen: boolean
  setClose: () => void
  children: React.ReactNode
}

export const Modal = ({ children, isOpen, setClose }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.side} />
      <div className={styles.modal}>{children}</div>
      <div className={styles.side}>
        <IconButton
          size="large"
          className={styles.close}
          icon={CloseOutlined}
          onClick={setClose}
        />
      </div>
    </div>
  )
}
