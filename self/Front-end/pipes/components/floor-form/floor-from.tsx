import { useEffect, useState } from "react"
import { Plan, Point } from "@/utils/types";
import styles from "./floor-form.module.css"
import Image from "next/image";
import { Range } from "../UI/range/range";

interface FloorFormProps {
  file: Plan | null
  padding: string
  setPadding: (padding: string) => void
  space: string
  setSpace: (space: string) => void
  floorType: string
  setFloorType: (floorType: string) => void
  validated: boolean[]
  setValidated: (validated: boolean[]) => void
  plan: null | (Point[])[]
  comebackHandler: () => void
}

export const FloorForm = ({
  file, padding, setPadding, space, setSpace, floorType,
  setFloorType, validated, setValidated, plan, comebackHandler
}: FloorFormProps) => {

  const validateForm = () => {
    const flags = []
    flags.push(floorType !== "");
    setValidated(flags)
  }

  useEffect(() => {
    validateForm();
  }, [padding, space, floorType]);

  const handleSubmit = () => {
    if (validated.some(f => f === false)) {
      return;
    }
    console.log("cool");
  }

  const isValid = !validated.some(f => f === false);

  return (
    <div className={styles.content}>
      <div className={styles.inputs}>
        <div className={styles.formItem}>
          <div className={styles.label}>Отступы</div>
          <Range min={5} max={30} value={padding} onChangeValue={setPadding} />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Промежуток</div>
          <Range min={5} max={30} value={space} onChangeValue={setSpace} />
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>Тип покрытия</div>
          <label className={styles.checkboxLabel}>
            Плитка
            {floorType === "Плитка" && <Image src={"/check.svg"} width={20} height={20} alt={"close"} />}
            <input
              className={styles.radio}
              type="radio"
              name="floorType"
              value="Плитка"
              checked={floorType === "Плитка"}
              onChange={e => setFloorType(e.target.value)}
            />
          </label>
          <label className={styles.checkboxLabel}>
            Паркет
            {floorType === "Паркетное" && <Image src={"/check.svg"} width={20} height={20} alt={"close"} />}
            <input
              className={styles.radio}
              type="radio"
              name="floorType"
              value="Паркетное"
              checked={floorType === "Паркетное"}
              onChange={e => setFloorType(e.target.value)}
            />
          </label>
          {!validated[2] && <div className={styles.feedback}>
            {floorType === "" && "Выберете покрытие"}
          </div>}
        </div>
      </div>
      <div>
        <button className={!isValid ? styles.disabledButton : styles.button} onClick={handleSubmit}>Рассчитать</button>
        <button className={!plan ? styles.disabledButton : styles.button}>Сохранить</button>
        <button className={styles.button} onClick={comebackHandler}>Загрузить другой план</button>
      </div>
    </div >
  )
}