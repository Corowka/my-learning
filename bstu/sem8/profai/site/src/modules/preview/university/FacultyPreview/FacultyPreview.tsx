"use client"

import { useEffect, useState } from "react"

import { UserService } from "@/services/UserService"
import { FacultyDetailedType } from "@/types"
import { Card, Chip, Typography, useMediaQuery } from "@mui/material"

import { ExtraInfoPreview } from "../ExtraInfoPreview/ExtraInfoPreview"
import styles from "./FacultyPreview.module.css"

interface FacultyPreviewProps {
  facultyId: string
}

export const FacultyPreview = ({ facultyId }: FacultyPreviewProps) => {
  const [faculty, setFaculty] = useState<FacultyDetailedType | null>(null)

  useEffect(() => {
    const fetchFaculty = async () => {
      const newFaculty = await UserService.getDetailedFaculty(facultyId)
      if (!newFaculty) return
      setFaculty(newFaculty)
    }
    fetchFaculty()
  }, [facultyId])

  const isMobile = useMediaQuery("(max-width: 768px)")
  const typographyLevel = isMobile ? "h6" : "h4"

  if (!faculty) return null

  return (
    <Card className={styles.container}>
      <Typography color='primary' variant={typographyLevel} sx={{ mt: "16px" }}>
        {faculty.name}
      </Typography>
      <Typography color='textPrimary' variant='body1' align='justify' sx={{ mt: "8px" }}>
        {faculty.description}
      </Typography>
      <div className={styles.row}>
        {faculty.areasOfKnowledge.map((area, i) => (
          <Chip color='info' label={area} key={i} variant='outlined' />
        ))}
      </div>
      <ExtraInfoPreview extraInfo={faculty.extraInfo} />
    </Card>
  )
}
