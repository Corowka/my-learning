import { List } from "antd"
import { ReactNode } from "react"

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { IconButton, ListItem, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material"

import styles from "./InteractiveList.module.css"

interface InteractiveListProps {
  items: { icon?: ReactNode; name: string }[]
  setItems: (newItems: { icon?: ReactNode; name: string }[]) => void
}

export const InteractiveList = ({ items, setItems }: InteractiveListProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return (
    <List className={styles.container}>
      {items.map((item, i) => (
        <ListItem
          className={styles.item}
          key={i}
          secondaryAction={
            <div className={styles.row}>
              <IconButton
                disabled={i === 0}
                onClick={() => {
                  const newItems = [...items]
                  const temp = { ...newItems[i] }
                  newItems[i] = { ...newItems[i - 1] }
                  newItems[i - 1] = temp
                  setItems(newItems)
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton
                disabled={i === items.length - 1}
                onClick={() => {
                  const newItems = [...items]
                  const temp = { ...newItems[i] }
                  newItems[i] = { ...newItems[i + 1] }
                  newItems[i + 1] = temp
                  setItems(newItems)
                }}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </div>
          }
        >
          {!isMobile && item?.icon && <ListItemIcon>{item?.icon}</ListItemIcon>}
          <ListItemText className={styles.text} primary={`${i + 1}. ${item.name}`} />
        </ListItem>
      ))}
    </List>
  )
}
