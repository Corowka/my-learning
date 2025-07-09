import { ExtraFacultyInfoType, ExtraSpecialtyInfoType, ExtraUniversityInfoType } from "@/types"
import { Typography } from "@mui/material"

import styles from "./ExtraInfoPreview.module.css"

interface ExtraInfoPreviewProps {
  extraInfo: ExtraUniversityInfoType[] | ExtraFacultyInfoType[] | ExtraSpecialtyInfoType[]
}

export const ExtraInfoPreview = ({ extraInfo }: ExtraInfoPreviewProps) => {
  return (
    <div className={styles.container}>
      {extraInfo.map((ei, i) => (
        <div className={styles.row} key={i}>
          <Typography color='primary' variant='body1'>
            {ei.name}
          </Typography>
          <Typography color='textPrimary' variant='body1'>
            {ei.value}
          </Typography>
        </div>
      ))}
    </div>
  )
}
