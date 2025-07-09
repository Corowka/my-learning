import { v4 as uuidv4 } from "uuid"

import { ExtraFacultyInfoType, ExtraSpecialtyInfoType, ExtraUniversityInfoType } from "@/types"
import DeleteIcon from "@mui/icons-material/Delete"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { Alert, Button, IconButton, TextField } from "@mui/material"

import styles from "./ExtraInfoInteractiveList.module.css"

interface ExtraInfoInteractiveListProps {
  parent: { name: "universityId" | "facultyId" | "specialtyId"; value: string }
  title?: string
  max?: number
  extraInfo: (ExtraUniversityInfoType | ExtraFacultyInfoType | ExtraSpecialtyInfoType)[]
  setExtraInfo: (newExtraInfo: (ExtraUniversityInfoType | ExtraFacultyInfoType | ExtraSpecialtyInfoType)[]) => void
}

export const ExtraInfoInteractiveList = ({ parent, max = 3, extraInfo, setExtraInfo }: ExtraInfoInteractiveListProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault()
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"))
    if (draggedIndex === targetIndex) return
    const newExtraInfo = [...extraInfo]
    const [draggedItem] = newExtraInfo.splice(draggedIndex, 1)
    newExtraInfo.splice(targetIndex, 0, draggedItem)
    setExtraInfo(newExtraInfo)
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {extraInfo.map((info, i) => (
          <div key={i} className={styles.row} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, i)}>
            <TextField
              sx={{ width: "45%" }}
              label='Название'
              variant='standard'
              value={info.name}
              onChange={(e) => {
                const newExtraInfo = [...extraInfo]
                newExtraInfo[i] = { ...info, name: e.target.value }
                setExtraInfo(newExtraInfo)
              }}
            />
            <TextField
              fullWidth
              label='Значение'
              variant='standard'
              value={info.value}
              onChange={(e) => {
                const newExtraInfo = [...extraInfo]
                newExtraInfo[i] = { ...info, value: e.target.value }
                setExtraInfo(newExtraInfo)
              }}
            />
            <IconButton
              color='primary'
              onClick={() => {
                setExtraInfo(extraInfo.filter((_, j) => i !== j))
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton color='primary' draggable onDragStart={(e) => handleDragStart(e, i)}>
              <DragHandleIcon />
            </IconButton>
          </div>
        ))}
      </div>
      {extraInfo.length === max ? (
        <Alert severity='info'>{`Максимальное количество элементов достигнуто (${max}).`}</Alert>
      ) : (
        <Button
          variant='outlined'
          color='primary'
          type='button'
          onClick={() => {
            if (extraInfo.length !== 0 && extraInfo[extraInfo.length - 1].name === "" && extraInfo[extraInfo.length - 1].value === "") return
            const newExtraInfoId = uuidv4()
            setExtraInfo([...extraInfo, { id: newExtraInfoId, name: "", value: "", [parent.name]: parent.value }] as (
              | ExtraUniversityInfoType
              | ExtraFacultyInfoType
              | ExtraSpecialtyInfoType
            )[])
          }}
        >
          Добавить
        </Button>
      )}
    </div>
  )
}
