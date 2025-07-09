"use client"

import Image from "next/image"
import { useMemo } from "react"

import { FacultyType, SpecialtyType, UniversityType } from "@/types"
import { Card, Chip, Typography, useMediaQuery } from "@mui/material"

import styles from "./SpecialtyPreviewCard.module.css"

interface SpecialtyPreviewCardProps {
  university: UniversityType
  faculty: FacultyType
  specialty: SpecialtyType
  benefits?: number
  skills?: number
  llmSkills?: number
}

export const SpecialtyPreviewCard = ({ university, faculty, specialty, benefits, skills, llmSkills }: SpecialtyPreviewCardProps) => {
  const previewLink = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/university/${university.id}/faculty/${faculty.id}/specialty/${specialty.id}`

  const SCORES = useMemo(
    () =>
      [
        { name: "Критерии", score: benefits, color: "#003eb3" },
        { name: "Тестирование", score: skills, color: "#4096ff" },
        { name: "AI", score: llmSkills, color: "#722ed1" },
      ].filter((s) => s.score !== undefined),
    [benefits, skills, llmSkills],
  )

  const isMobile = useMediaQuery("(max-width: 768px)")
  const titleTypographyLevel = isMobile ? "h6" : "h4"
  const titleTextAlign = isMobile ? "center" : undefined
  const universityTypographyLevel = isMobile ? "body1" : "h6"

  return (
    <Card>
      <a href={previewLink} target='_blank' className={styles.link}>
        <div className={styles.container}>
          <Typography variant={titleTypographyLevel} color='primary' textAlign={titleTextAlign}>
            {specialty.name}
          </Typography>
          <div className={styles.row}>
            <div className={styles.text}>
              <Typography variant='body1'>{specialty.description}</Typography>
              <Typography variant='body2' color='primary'>
                {faculty.areasOfKnowledge.join(", ")}
              </Typography>
            </div>
            <Image className={styles.image} src={university.images[0]} width={200} height={200} alt='University image' />
          </div>
          <Typography variant={universityTypographyLevel} color='primary'>
            {`${university.name} / ${faculty.name}`}
          </Typography>
          <div className={styles.scores}>
            {SCORES.map((value, i) => (
              <Chip label={`${value.name} ${Math.round((1 - value.score!) * 1000) / 10}%`} key={i} />
            ))}
          </div>
        </div>
      </a>
    </Card>
  )
}
