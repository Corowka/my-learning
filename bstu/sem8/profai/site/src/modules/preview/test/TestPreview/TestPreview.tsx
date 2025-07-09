"use client"

import { useEffect, useState } from "react"

import { SpecialtyPreviewCard } from "@/modules/search/SpecialtyPreviewCard/SpecialtyPreviewCard"
import { SuggestedSpecialties } from "@/modules/search/SuggestedSpecialties/SuggestedSpecialties"
import { BENEFITS, QUESTIONS, SKILLS } from "@/modules/test/TestForm/data"
import { UserService } from "@/services/UserService"
import { FacultyType, SpecialtyType, TestDetailedType, UniversityType } from "@/types"
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts/LineChart"

import styles from "./TestPreview.module.css"

const getTopEmoji = (place: number) => {
  const emojis = ["🏆", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"]
  return emojis[place]
}

const getBottomEmoji = (place: number) => {
  const emojis = ["🤔", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"]
  return emojis[place]
}

interface TestPreviewProps {
  testId: string
}

export const TestPreview = ({ testId }: TestPreviewProps) => {
  const [test, setTest] = useState<TestDetailedType | null>(null)
  const [faculty, setFaculty] = useState<FacultyType | null>(null)
  const [university, setUniversity] = useState<UniversityType | null>(null)

  useEffect(() => {
    const fetchTest = async () => {
      const newTest = await UserService.getDetailedTest(testId)
      if (!newTest) return
      setTest(newTest)
    }
    fetchTest()
  }, [testId])

  useEffect(() => {
    const fetchFaculty = async () => {
      if (!test || !test.specialty?.facultyId) return
      const newFaculty = await UserService.getFaculty(test.specialty.facultyId)
      if (!newFaculty) return
      setFaculty(newFaculty)
    }
    fetchFaculty()
  }, [test])

  useEffect(() => {
    const fetchUniversity = async () => {
      if (!faculty || !faculty.universityId) return
      const newUniversity = await UserService.getUniversity(faculty.universityId)
      if (!newUniversity) return
      setUniversity(newUniversity)
    }
    fetchUniversity()
  }, [faculty])

  if (!test) return null

  const SKILL_ROWS = SKILLS.map((s, i) => ({
    name: s.name,
    test: test.skills[i],
    ai: test.llmSkills[i],
    avg: (test.skills[i] + test.llmSkills[i]) / 2,
  }))
  const TOP_BENEFIT_ROWS = BENEFITS.map((_, i) => BENEFITS[test.benefits[i]])
    .slice(0, 6)
    .map((b, i) => ({ name: b.name, icon: getTopEmoji(i) }))
  const BOTTOM_BENEFIT_ROWS = BENEFITS.map((_, i) => BENEFITS[test.benefits[i]])
    .reverse()
    .slice(0, 6)
    .map((b, i) => ({ name: b.name, icon: getBottomEmoji(i) }))

  return (
    <div className={styles.container}>
      {university && faculty && test.specialty && (
        <SpecialtyPreviewCard university={university} faculty={faculty} specialty={test.specialty as SpecialtyType} />
      )}
      <Card>
        <LineChart
          series={[
            { id: "llmSkills", data: test.llmSkills, label: "AI", area: true },
            { id: "skills", data: test.skills, label: "Тестирование", area: true },
          ]}
          xAxis={[{ data: SKILLS.map((_, index) => index), scaleType: "band", id: "skills-axis" }]}
          height={300}
        />
      </Card>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Навык</TableCell>
              <TableCell align='right'>Тестирование</TableCell>
              <TableCell align='right'>AI</TableCell>
              <TableCell align='right'>Среднее</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SKILL_ROWS.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.test}</TableCell>
                <TableCell align='right'>{row.ai}</TableCell>
                <TableCell align='right'>{row.avg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.tablesContainer}>
        <TableContainer component={Card} className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Предпочтительные критерии</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TOP_BENEFIT_ROWS.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.icon}</TableCell>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Card} className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Менее интересные критерии</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BOTTOM_BENEFIT_ROWS.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.icon}</TableCell>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Card className={styles.questions}>
        {QUESTIONS.map((q, i) => (
          <div className={styles.question} key={i}>
            <Typography variant='body1' color='primary'>
              {q}
            </Typography>
            <Typography variant='body1'>{test.questions[i]}</Typography>
          </div>
        ))}
      </Card>
      <SuggestedSpecialties testId={testId} />
    </div>
  )
}
