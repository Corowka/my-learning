"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

import { useBackdropLoading } from "@/components/loading-provider/loading-provider"
import { CountList } from "@/modules/test/TestForm/CountList/CountList"
import { InteractiveList } from "@/modules/test/TestForm/InteractiveList/InteractiveList"
import { UserService } from "@/services/UserService"
import { StudentDetailedType, TestType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Card, TextField, Typography, useMediaQuery } from "@mui/material"

import { BENEFITS, getBenefitsSort, QUESTIONS, SKILLS } from "./data"
import { SpecialtySelect } from "./SpecialtySelect/SpecialtySelect"
import styles from "./TestForm.module.css"

const TEST_FORM_DATA_KEY = "TEST_FORM_DATA"

type FormDataStorageType = {
  specialtyId: string
  skills: number[]
  questions: string[]
  benefits: number[]
}

type FormData = {
  leftSkills: number
  questions: string[]
}

const schema = z.object({
  leftSkills: z.number().max(0, "Остаток навыков должен быть равен 0"),
  questions: z.array(z.string().min(1, "Описание обязательно для заполнения")),
})

export const TestForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      leftSkills: 0,
      questions: QUESTIONS.map(() => ""),
    },
  })

  const { data: session } = useSession()
  const { push } = useRouter()
  const { startLoading, endLoading } = useBackdropLoading()

  const [student, setStudent] = useState<StudentDetailedType | null>(null)

  const [benefits, setBenefits] = useState([...BENEFITS])
  const [skills, setSkills] = useState(SKILLS.map(() => 5))
  const [specialtyId, setSpecialtyId] = useState("")

  useEffect(() => {
    const fetchStudent = async () => {
      if (!session?.user.id) return
      const user = await UserService.getDetailedUser(session?.user.id)
      if (!user) return
      if (!user?.student) push("/")
      setStudent(user.student!)
    }
    if (session?.user.id) fetchStudent()
  }, [session?.user?.id, push])

  const onSubmit = async (data: FormData) => {
    if (!student) return
    startLoading()
    try {
      const text = data.questions.reduce((text, answer, i) => {
        let preparedAnswer = answer[0].toUpperCase() + answer.slice(1, answer.length - 1)
        preparedAnswer = preparedAnswer[preparedAnswer.length - 1] !== "." ? preparedAnswer + "." : preparedAnswer
        return text + QUESTIONS[i] + " " + preparedAnswer
      }, "")
      const aiEvaluation = await UserService.getAiEvaluate(text)
      // const aiEvaluation = Array.from({ length: 12 }, () => 5)
      if (!aiEvaluation) return
      const newTest: TestType = {
        id: uuidv4(),
        benefits: getBenefitsSort(benefits),
        skills: skills,
        questions: data.questions,
        llmSkills: aiEvaluation,
        passDate: new Date().toISOString(),
        studentId: student.id,
        specialtyId: specialtyId || undefined,
      }
      const test = await UserService.createTest(newTest)
      if (!test) return
      push(`/preview/test/${test.id}`)
    } catch (e) {
      console.error((e as unknown as Error).message)
    } finally {
      endLoading()
    }
  }

  const onLocalStorageSave = useCallback(() => {
    const data: FormDataStorageType = {
      specialtyId,
      questions: watch("questions"),
      benefits: getBenefitsSort(benefits),
      skills,
    }
    localStorage.setItem(TEST_FORM_DATA_KEY, JSON.stringify(data))
  }, [benefits, skills, watch, specialtyId])

  useLayoutEffect(() => {
    const formDataJson = localStorage.getItem(TEST_FORM_DATA_KEY)
    if (!formDataJson) return
    const formData = JSON.parse(formDataJson) as FormDataStorageType
    setSpecialtyId(formData.specialtyId)
    setBenefits(formData.benefits.map((index: number) => BENEFITS[index]))
    setSkills(formData.skills)
    setValue("leftSkills", 60 - formData.skills.reduce((sum, v) => v + sum, 0))
    setValue("questions", formData.questions)
  }, [setValue])

  useEffect(() => {
    setTimeout(() => onLocalStorageSave(), 0)
  }, [onLocalStorageSave, benefits, skills, specialtyId])

  const isMobile = useMediaQuery("(max-width: 768px)")
  const typographyLevel = isMobile ? "h6" : "h4"

  if (!student) return null

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Card className={styles.autocomplete}>
        <SpecialtySelect specialtyId={specialtyId} setSpecialtyId={setSpecialtyId} />
        <Alert severity='warning'>
          Если вы уже являетесь студентом, пожалуйста, укажите вашу специальность выше, это очень поможет нам в улучшении сервиса😋.
        </Alert>
      </Card>
      <Card className={styles.title}>
        <Typography color='primary' variant={typographyLevel} sx={{ margin: "16px 0 0 16px" }}>
          Преимущества профессии
        </Typography>
        <Typography color='textPrimary' variant='subtitle1' sx={{ margin: "8px 0 0 16px" }}>
          Расположите характеристики будущей профессии в порядке важности по убыванию.
        </Typography>
      </Card>
      <Card>
        <InteractiveList items={benefits} setItems={setBenefits} />
      </Card>
      <Card className={styles.title}>
        <Typography color='primary' variant={typographyLevel} sx={{ margin: "16px 0 0 16px" }}>
          Навыки
        </Typography>
        <Typography color='textPrimary' variant='subtitle1' sx={{ margin: "8px 0 0 16px" }}>
          Распределите очки навыков так, чтобы они максимально соответствовали вам.
        </Typography>
      </Card>
      <Card sx={{ width: "100%" }}>
        <CountList items={SKILLS} count={skills} setCount={setSkills} balance={60} maxCount={10} />
      </Card>
      <Card className={styles.title}>
        <Typography color='primary' variant={typographyLevel} sx={{ margin: "16px 0 0 16px" }}>
          Расскажите о себе
        </Typography>
        <Typography color='textPrimary' variant='subtitle1' sx={{ margin: "8px 0 0 16px" }}>
          Максимально развернуто ответьте на следующие вопросы.
        </Typography>
      </Card>
      <Card sx={{ width: "100%" }} className={styles.questions}>
        {QUESTIONS.map((text, i) => (
          <div key={i}>
            <TextField fullWidth label={text} variant='standard' multiline {...register(`questions.${i}`)} onBlur={() => onLocalStorageSave()} />
            {errors.questions?.[i] && (
              <Typography color='error' variant='subtitle2'>
                {errors.questions[i]?.message}
              </Typography>
            )}
          </div>
        ))}
      </Card>
      <Button fullWidth variant='contained' color='primary' size='large' type='submit' className={styles.button}>
        Отправить
      </Button>
    </form>
  )
}
