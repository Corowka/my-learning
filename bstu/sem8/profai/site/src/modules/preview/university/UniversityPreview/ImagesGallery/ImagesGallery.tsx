"use client"

import { Image as ImageAntd } from "antd"
import Image from "next/image"
import { useState } from "react"

import VisibilityIcon from "@mui/icons-material/Visibility"
import { IconButton } from "@mui/material"

import styles from "./ImagesGallery.module.css"

interface ImagesGalleryProps {
  images: string[]
}

export const ImagesGallery = ({ images }: ImagesGalleryProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  return (
    <>
      <div className={[styles.imageList, styles[`total-${images.length}`]].join(" ")}>
        {images.map((src, i) => (
          <div key={i} className={[styles.imageWrap, styles[`total-${images.length}-pos-${i}`]].join(" ")}>
            <Image className={styles.image} width={100} height={100} src={src} alt={"university image " + i} />
            <div className={styles.previewHover}>
              <IconButton
                color='primary'
                className={styles.previewButton}
                onClick={() => {
                  setPreviewImage(src)
                  setIsPreviewOpen(true)
                }}
              >
                <VisibilityIcon style={{ fill: "#fff" }} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
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
    </>
  )
}
