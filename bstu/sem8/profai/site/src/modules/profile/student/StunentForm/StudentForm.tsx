import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBackdropLoading } from "@/components/loading-provider/loading-provider"
import { UserService } from "@/services/UserService"
import { UserDetailedType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, Skeleton, TextField, Typography } from "@mui/material"

import styles from "./StudentForm.module.css"
import { TestList } from "./TestList/TestList"

type FormData = {
  firstName: string
  secondName: string
  thirdName: string
  yearOfBirth: string
}

const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/

const schema = z.object({
  firstName: z.string().min(1, "Имя обязательно для заполнения").regex(nameRegex, "Имя не должно содержать цифр или специальных символов"),
  secondName: z.string().min(1, "Фамилия обязательна для заполнения").regex(nameRegex, "Фамилия не должна содержать цифр или специальных символов"),
  thirdName: z.string().regex(nameRegex, "Отчество не должно содержать цифр или специальных символов").optional(),
  yearOfBirth: z.string(),
})

export const StudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { startLoading, endLoading } = useBackdropLoading()
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserDetailedType | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) return
      const newUser = await UserService.getDetailedUser(session.user.id)
      if (!newUser) return
      setUser(newUser)
    }
    fetchUser()
  }, [status, session?.user?.id])

  const onSubmit = async () => {
    startLoading()
    if (!user) return
    await UserService.updateDetailedUser(user)
    endLoading()
  }

  if (!user?.student) {
    return (
      <form className={styles.form}>
        <Card className={styles.wrap}>
          <div className={styles.fields}>
            <Skeleton animation='wave' variant='rectangular' sx={{ height: "48px" }} />
            <Skeleton animation='wave' variant='rectangular' sx={{ height: "48px" }} />
            <Skeleton animation='wave' variant='rectangular' sx={{ height: "48px" }} />
            <Skeleton animation='wave' variant='rectangular' sx={{ height: "48px" }} />
          </div>
          <Skeleton animation='wave' variant='rectangular' sx={{ height: "42px", width: "135px" }} />
        </Card>
      </form>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Card className={styles.wrap}>
        <div className={styles.fields}>
          <div className={styles.field}>
            <TextField
              label='Фамилия'
              variant='standard'
              {...register("secondName")}
              value={user.student?.secondName || ""}
              onChange={(e) => {
                if (!user.student) return
                setUser({
                  ...user,
                  student: {
                    ...user.student,
                    secondName: e.target.value,
                  },
                })
              }}
            />
            {errors.secondName && (
              <Typography color='error' variant='subtitle2'>
                {errors.secondName.message}
              </Typography>
            )}
          </div>
          <div className={styles.field}>
            <TextField
              label='Имя'
              variant='standard'
              {...register("firstName")}
              value={user.student.firstName || ""}
              onChange={(e) => {
                if (!user.student) return
                setUser({
                  ...user,
                  student: {
                    ...user.student,
                    firstName: e.target.value,
                  },
                })
              }}
            />
            {errors.firstName && (
              <Typography color='error' variant='subtitle2'>
                {errors.firstName.message}
              </Typography>
            )}
          </div>
          <div className={styles.field}>
            <TextField
              label='Отчество'
              variant='standard'
              {...register("thirdName")}
              value={user.student.thirdName || ""}
              onChange={(e) => {
                if (!user.student) return
                setUser({
                  ...user,
                  student: {
                    ...user.student,
                    thirdName: e.target.value,
                  },
                })
              }}
            />
            {errors.thirdName && (
              <Typography color='error' variant='subtitle2'>
                {errors.thirdName.message}
              </Typography>
            )}
          </div>
          <div className={styles.field}>
            <TextField
              label='Год рождения'
              variant='standard'
              {...register("yearOfBirth")}
              value={user.student?.yearOfBirth || ""}
              onChange={(e) => {
                if (!user.student) return
                setUser({
                  ...user,
                  student: {
                    ...user.student,
                    yearOfBirth: Number(e.target.value.replace(/[^0-9]/g, "")),
                  },
                })
              }}
            />
            {errors.yearOfBirth && (
              <Typography color='error' variant='subtitle2'>
                {errors.yearOfBirth.message}
              </Typography>
            )}
          </div>
        </div>
        <Button size='large' type='submit' variant='contained'>
          Сохранить
        </Button>
      </Card>
      <TestList studentId={user.student?.id} />
    </form>
  )
}
