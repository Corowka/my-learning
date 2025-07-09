import { useState } from "react"

import CloseIcon from "@mui/icons-material/Close"
import { Alert, Button, Chip, Paper, TextField, Typography } from "@mui/material"

import styles from "./TagInteractiveList.module.css"

interface TagInteractiveListProps {
  maxTags?: number
  title?: string
  label?: string
  tags: string[]
  setTags: (newTags: string[]) => void
}

export const TagInteractiveList = ({ maxTags = 10, title = "Теги", label = "Новый тег", tags, setTags }: TagInteractiveListProps) => {
  const [newTag, setNewTag] = useState("")

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault()
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"))
    if (draggedIndex === targetIndex) return
    const newTags = [...tags]
    const [draggedItem] = newTags.splice(draggedIndex, 1)
    newTags.splice(targetIndex, 0, draggedItem)
    setTags(newTags)
  }

  return (
    <div className={styles.container}>
      <Typography color='primary' variant='h6'>
        {title}
      </Typography>
      <Paper variant='outlined' className={styles.paper}>
        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <Chip
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, i)}
              key={i}
              variant='filled'
              color='primary'
              label={tag}
              deleteIcon={<CloseIcon style={{ fill: "#fff" }} />}
              onDelete={() => setTags(tags.filter((t, j) => i !== j))}
            />
          ))}
        </div>
      </Paper>
      {tags.length === maxTags ? (
        <Alert severity='info'>{`Максимальное количество элементов достигнуто (${maxTags}).`}</Alert>
      ) : (
        <div className={styles.row}>
          <TextField value={newTag} onChange={(e) => setNewTag(e.target.value)} label={label} fullWidth variant='standard' />
          <Button
            variant='contained'
            color='primary'
            type='button'
            onClick={() => {
              if (!newTag.length) return
              setTags([...tags, newTag])
              setNewTag("")
            }}
          >
            Добавить
          </Button>
        </div>
      )}
    </div>
  )
}
