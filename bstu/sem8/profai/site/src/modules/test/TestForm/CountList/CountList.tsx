import { List } from "antd"
import { ReactNode, useState } from "react"

import { Alert, ListItem, ListItemIcon, ListItemText, Slider, useMediaQuery } from "@mui/material"

import styles from "./CountList.module.css"

interface CountListProps {
  items: { icon?: ReactNode; name: string }[]
  balance: number
  maxCount?: number
  count: number[]
  setCount: (newCount: number[]) => void
}

export const CountList = ({ items, balance, maxCount = 10, count, setCount }: CountListProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [current, setCurrent] = useState(balance - count.reduce((s, n) => n + s, 0))
  return (
    <List className={styles.container}>
      {current === 0 ? (
        <Alert severity='info'>{`Вы распределили все очки (${balance}/${balance}).`}</Alert>
      ) : (
        <Alert severity='warning'>{`Распределите все очки (${current}/${balance})`}</Alert>
      )}
      {items.map((item, i) => (
        <ListItem key={i} className={styles.item}>
          <div className={styles.leftSide}>
            {!isMobile && item?.icon && <ListItemIcon>{item?.icon}</ListItemIcon>}
            <ListItemText primary={`${i + 1}. ${item.name}`} />
          </div>
          <Slider
            className={styles.slider}
            value={count[i]}
            max={maxCount}
            onChange={(_: Event, value: number | number[]) => {
              const newCount = [...count]
              newCount[i] = value as number
              let newCurrent = balance - newCount.reduce((s, n) => n + s, 0)
              if (newCurrent < 0) {
                newCount[i] += newCurrent
                newCurrent = 0
              }
              setCount(newCount)
              setCurrent(newCurrent)
            }}
            valueLabelDisplay='auto'
          />
        </ListItem>
      ))}
    </List>
  )
}
