import { useEffect, useState } from "react"
import styles from "./range.module.css"

interface RangeProps {
  min: number
  max: number
  value: string
  onChangeValue: (value: string) => void
}

export const Range = ({ min, max, value, onChangeValue }: RangeProps) => {
  const [bs, setBs] = useState("");

  useEffect(() => {
    setBs((Number(value) - min) * 100 / (max - min) + '% 100%')
  }, [value])

  return (
    <div className={styles.rangeBox}>
      <input
        className={styles.range}
        style={{ backgroundSize: bs }}
        value={value}
        type="range"
        onChange={e => onChangeValue(e.target.value)}
        min={5}
        max={30}
      />
      <div className={styles.rangeValue}>{value}</div>
    </div >
  )
} 