import { Image } from "antd"
import { useEffect, useRef, useState, forwardRef } from "react"

import { DeleteOutlined } from "@ant-design/icons"

import { IconButton } from "../icon-button/icon-button"
import { Title } from "../title/title"
import styles from "./image-input.module.css"

interface ImageInputProps {
  value: string
  onChange: (value: string) => void
  width?: number | string
}

export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ value, onChange, width }, ref) => {
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)

    const deleteImage = () => {
      setFile(null)
      onChange("")
    }

    useEffect(() => {
      if (!file) {
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          onChange(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }, [file, onChange])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files[0]) {
        setFile(files[0])
      }
    }

    return (
      <div
        className={styles.container}
        style={{ width }}
      >
        {!value.length ? (
          <div
            className={styles.load}
            onClick={() => {
              inputFileRef.current && inputFileRef.current.click()
            }}
          >
            <input
              ref={inputFileRef}
              onChange={handleFileChange}
              className={styles.inputFile}
              type="file"
              accept="image/*"
            />
            <Title
              type="h1"
              text="Upload Image"
            />
          </div>
        ) : (
          <div className={styles.preview}>
            <IconButton
              className={styles.close}
              size="medium"
              icon={DeleteOutlined}
              onClick={deleteImage}
            />
            <Image
              width="100%"
              className={styles.preview}
              src={value}
            />
          </div>
        )}
      </div>
    )
  },
)
