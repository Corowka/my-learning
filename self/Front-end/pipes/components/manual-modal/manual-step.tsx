import styles from "./manual-modal.module.css"

interface StepProps {
  step: number
}

export const Step = ({ step }: StepProps) => {

  if (step === 0) {
    return (
      <div className={styles.stepContent}>
        <p>
          Перейдите на
          <a
            className={styles.stepLink}
            target="_blank" href="https://remplanner.ru/planner"
          > сайт </a>
          для создания теплого пола.
        </p>
        <p>
          Используя инструмент
          <span className={styles.stepBoldText}>
            &nbsp;Кабельный тёплый&nbsp;
          </span>
          пол в разделе
          <span className={styles.stepBoldText}>
            &nbsp;Теплые полы
          </span>
          , разметьте область вашего теплого пола.
        </p>
        <p>
          Экспортируйте файл в формате
          <span className={styles.stepBoldText}>
            &nbsp;.plan
          </span>
          , нажав на кнопку в меню инструментов.
        </p>
        <p>
          Далее
          <span className={styles.stepBoldText}>
            &nbsp;загрузите&nbsp;
          </span>
          ваш план теплого пола на наш сайт для перехода на следующий этап.
        </p>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className={styles.stepContent}>
        <p>
          Заполните форму с параметрами вашего теплого пола. Введите
          <span className={styles.stepBoldText}>
            &nbsp;Отступ от стен (см)
          </span>
          ,
          <span className={styles.stepBoldText}>
            &nbsp;Промежуток между кабелями (см)&nbsp;
          </span>
          и выберите
          <span className={styles.stepBoldText}>
            &nbsp;Тип покрытия пола
          </span>
          .
        </p>
        <p>
          Нажмите кнопку
          <span className={styles.stepBoldText}>
            &nbsp;Рассчитать
          </span>
          , перед вами появится раскладка кабеля.
        </p>
        <p>
          Далее вы можете нажать кнопку
          <span className={styles.stepBoldText}>
            &nbsp;Сохранить&nbsp;
          </span>
          для того, чтобы скачать получившийся план.
        </p>
      </div >
    )
  }
}