import dayjs from "dayjs"
import Link from "next/link"
import { useEffect, useState } from "react"

import { SuggestedSpecialties } from "@/modules/search/SuggestedSpecialties/SuggestedSpecialties"
import { BENEFITS, SKILLS } from "@/modules/test/TestForm/data"
import { UserService } from "@/services/UserService"
import { TestDetailedType } from "@/types"
import { Card, Chip, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts"

import styles from "./TestList.module.css"

interface TestListProps {
  studentId: string
}

export const TestList = ({ studentId }: TestListProps) => {
  const [tests, setTests] = useState<TestDetailedType[]>([])

  useEffect(() => {
    const fetchTests = async () => {
      const newTests = await UserService.getDetailedTestsWithStudentId(studentId)
      setTests(newTests.sort((a, b) => new Date(b.passDate).getTime() - new Date(a.passDate).getTime()))
    }
    fetchTests()
  }, [studentId])

  if (!tests.length) return null

  return (
    <>
      <SuggestedSpecialties testId={tests[0].id} />
      <div className={styles.container}>
        {tests.map((test, i) => (
          <Link key={i} href={`${process.env.NEXT_PUBLIC_BASE_URL}/preview/test/${test.id}`} target='_blank' className={styles.link}>
            <Card className={styles.test}>
              <div className={styles.header}>
                <Typography variant='h6' color='primary'>
                  {test.specialty?.name || "Абитуриент"}
                </Typography>
                <Typography variant='body1' color='primary'>
                  {dayjs(test.passDate).format("HH:mm DD.MM.YYYY")}
                </Typography>
              </div>
              <LineChart
                series={[
                  { id: "llmSkills", data: test.llmSkills, label: "AI", area: true },
                  { id: "skills", data: test.skills, label: "Тестирование", area: true },
                ]}
                xAxis={[{ data: SKILLS.map((_, i) => i), scaleType: "band", id: "skills-axis" }]}
                height={180}
              />
              <div className={styles.benefits}>
                {test.benefits.slice(0, 3).map((v) => (
                  <Chip key={v} label={BENEFITS[v].name} color='primary' variant='outlined' />
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
