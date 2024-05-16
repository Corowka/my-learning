import styles from "./manual-modal.module.css"
import { useState } from "react"
import { Step } from "./manual-step"
import Image from "next/image"

interface ManualModalProps {
  setShow: (isShow: boolean) => void
  stage: number
}

export const ManualModal = ({ setShow, stage }: ManualModalProps) => {
  const [step, setStep] = useState(stage);

  return (
    <div className={styles.shadow} onClick={() => setShow(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>
            {step === 0 && "Как мне загрузить файл"}
            {step === 1 && "Как мне сделать план выкладки кабеля"}
          </h1>
          <button className={styles.close} onClick={() => setShow(false)}>
            <Image src={"/close.svg"} width={36} height={36} alt={"close"} />
          </button>
        </div>
        <div className={styles.content}>
          <Step step={step} />
        </div>
        <div className={styles.footer}>
          <div className={styles.stepItem} onClick={() => setStep(0)}>
            <div className={`
              ${styles.block}
              ${0 === step ? styles.current : ""}
            `} />
          </div>
          <div className={styles.stepItem} onClick={() => setStep(1)}>
            <div className={`
              ${styles.block}
              ${1 === step ? styles.current : ""}
            `} />
          </div>
        </div>
      </div>
    </div>
  )
}