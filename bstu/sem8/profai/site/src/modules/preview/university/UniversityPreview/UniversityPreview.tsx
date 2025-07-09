"use client"

import { useEffect, useState } from "react"

import { UserService } from "@/services/UserService"
import { UniversityDetailedType } from "@/types"
import { Card, Link, Typography, useMediaQuery } from "@mui/material"

import { ExtraInfoPreview } from "../ExtraInfoPreview/ExtraInfoPreview"
import { ImagesGallery } from "./ImagesGallery/ImagesGallery"
import styles from "./UniversityPreview.module.css"

interface UniversityPreviewProps {
  universityId: string
}

export const UniversityPreview = ({ universityId }: UniversityPreviewProps) => {
  const [university, setUniversity] = useState<UniversityDetailedType | null>(null)

  useEffect(() => {
    const fetchUniversity = async () => {
      const newUniversity = await UserService.getDetailedUniversity(universityId)
      if (!newUniversity) return
      setUniversity(newUniversity)
    }
    fetchUniversity()
  }, [universityId])

  const isMobile = useMediaQuery("(max-width: 768px)")
  const typographyLevel = isMobile ? "h6" : "h4"

  if (!university) return null

  return (
    <Card className={styles.container}>
      <ImagesGallery images={university.images} />
      <Typography color='primary' variant={typographyLevel} sx={{ mt: "16px" }}>
        {university.name}
      </Typography>
      <Typography color='textPrimary' variant='body1' align='justify' sx={{ mt: "8px" }}>
        {university.description}
      </Typography>
      <div className={styles.row}>
        <Link href={university.siteLink} underline='none' variant='body1' color='info' target='_blank'>
          Официальный сайт учебного заведения
        </Link>
        <Typography color='textPrimary' variant='body1'>
          {`${university.numberOfStudents} человек`}
        </Typography>
      </div>
      <ExtraInfoPreview extraInfo={university.extraInfo} />
    </Card>
  )
}
