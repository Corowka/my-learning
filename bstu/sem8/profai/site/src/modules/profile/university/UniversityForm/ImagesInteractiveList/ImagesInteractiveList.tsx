"use client"

import { Image as ImageAntd, message } from "antd"
import Image from "next/image"
import { MouseEvent, useRef, useState } from "react"

import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Alert, Chip, IconButton } from "@mui/material"

import styles from "./ImagesInteractiveList.module.css"

interface ImagesInteractiveListProps {
  maxImages?: number
  maxSize?: number
  columns?: number
  gap?: number
  images: string[]
  setImages: (images: string[]) => void
}

export const ImagesInteractiveList = ({ maxImages = 8, maxSize = 1056768, images, setImages, columns = 4, gap = 4 }: ImagesInteractiveListProps) => {
  const [messageApi, contextHolder] = message.useMessage()

  const inputRef = useRef<HTMLInputElement>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const readFileAsBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      const newImages: string[] = []
      for (const file of Array.from(files)) {
        if (file.size > maxSize) {
          messageApi.open({
            type: "error",
            content: `Максимальный размер файла ${(maxSize / 1056768).toFixed(2)} Мб`,
          })
          continue
        }
        const base64Image = await readFileAsBase64(file)
        newImages.push(base64Image)
        if (images.length + newImages.length > maxImages) {
          messageApi.open({
            type: "error",
            content: `Максимальное количество фотографий ${maxImages}`,
          })
          break
        }
      }
      setImages([...images, ...newImages].slice(0, maxImages))
    }
  }

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
    const newImages = [...images]
    const [draggedItem] = newImages.splice(draggedIndex, 1)
    newImages.splice(targetIndex, 0, draggedItem)
    setImages(newImages)
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `auto`,
          gap: gap + "px",
          width: "100%",
        }}
      >
        {contextHolder}
        {images.map((src, i) => (
          <div
            key={i}
            className={styles.imageWrap}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, i)}
          >
            <Image className={styles.image} width={100} height={100} src={src} alt={"university image " + i} />
            {i === 0 && <Chip className={styles.chip} label='Главное фото' color='primary' />}
            <div className={styles.previewHover}>
              <IconButton
                color='primary'
                className={styles.previewButton}
                onClick={() => {
                  setIsPreviewOpen(true)
                  setPreviewImage(src)
                }}
              >
                <VisibilityIcon style={{ fill: "#fff" }} />
              </IconButton>
              <IconButton
                color='primary'
                className={styles.deleteButton}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault()
                  setImages(images.filter((img, j) => j !== i))
                }}
              >
                <DeleteIcon style={{ fill: "#fff" }} />
              </IconButton>
            </div>
          </div>
        ))}
        {images.length !== maxImages && (
          <button type='button' className={styles.add} onClick={() => inputRef.current?.click()}>
            <AddIcon />
          </button>
        )}
        <input ref={inputRef} className={styles.input} type='file' accept='image/*' multiple onChange={handleFileChange} />
        {previewImage && (
          <ImageAntd
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: isPreviewOpen,
              onVisibleChange: (visible) => setIsPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
            alt='preview'
          />
        )}
      </div>
      {images.length === maxImages && <Alert severity='info'>{`Максимальное количество изображений достигнуто (${maxImages}).`}</Alert>}
    </div>
  )
}
