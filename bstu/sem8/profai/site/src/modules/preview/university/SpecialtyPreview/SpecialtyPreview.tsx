"use client"

import { useEffect, useState } from "react"

import { UserService } from "@/services/UserService"
import { SpecialtyDetailedType } from "@/types"
import { Card, Typography, useMediaQuery } from "@mui/material"

import { ExtraInfoPreview } from "../ExtraInfoPreview/ExtraInfoPreview"
import styles from "./SpecialtyPreview.module.css"

interface SpecialtyPreviewProps {
  specialtyId: string
}

export const SpecialtyPreview = ({ specialtyId }: SpecialtyPreviewProps) => {
  const [specialty, setSpecialty] = useState<SpecialtyDetailedType | null>(null)

  useEffect(() => {
    const fetchSpecialty = async () => {
      const newSpecialty = await UserService.getDetailedSpecialty(specialtyId)
      if (!newSpecialty) return
      setSpecialty(newSpecialty)
    }
    fetchSpecialty()
  }, [specialtyId])

  const isMobile = useMediaQuery("(max-width: 768px)")
  const typographyLevel = isMobile ? "h6" : "h4"

  if (!specialty) return null

  return (
    <Card className={styles.container}>
      <Typography color='primary' variant={typographyLevel} sx={{ mt: "16px" }}>
        {specialty.name}
      </Typography>
      <Typography color='textPrimary' variant='body1' align='justify' sx={{ mt: "8px" }}>
        {specialty.description}
      </Typography>
      <Typography color='textPrimary' variant='body1' align='justify' sx={{ mt: "8px" }}>
        {specialty.employment}
      </Typography>
      <ExtraInfoPreview extraInfo={specialty.extraInfo} />
    </Card>
  )
}
