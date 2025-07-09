"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBackdropLoading } from "@/components/loading-provider/loading-provider"
import {
    ExtraInfoInteractiveList
} from "@/modules/profile/university/ExtraInfoInteractiveList/ExtraInfoInteractiveList"
import {
    ImagesInteractiveList
} from "@/modules/profile/university/UniversityForm/ImagesInteractiveList/ImagesInteractiveList"
import { UserService } from "@/services/UserService"
import {
    ExtraUniversityInfoType, FacultyDetailedType, SpecialtyDetailedType, UniversityDetailedType
} from "@/types"
import { getInitialUser } from "@/utils/getInitialUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, TextField, Typography } from "@mui/material"

import { FacultyForm } from "../FacultyForm/FacultyForm"
import { SpecialtyForm } from "../SpecialtyForm/SpecialtyForm"
import styles from "./UniversityForm.module.css"

type FormData = {
  name: string
  description: string
  siteLink: string
  numberOfStudents: number
}

const numberRegex = /\D+/g

const schema = z.object({
  name: z.string().min(1, "Наименование обязательно для заполнения"),
  description: z.string().min(1, "Описание обязательно для заполнения"),
  siteLink: z.string().optional(),
  numberOfStudents: z.string(),
  // .min(0, "Количество учащихся должно быть больше одного")
  // .max(10000000, "Слишком большое число"),
})

export const UniversityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { startLoading, endLoading } = useBackdropLoading()
  const { data: session } = useSession()
  const [selectedFaculty, setSelectedFaculty] = useState(0)
  const [selectedSpecialty, setSelectedSpecialty] = useState(0)
  const [university, setUniversity] = useState<UniversityDetailedType | null>(null)
  const { push } = useRouter()

  useEffect(() => {
    const fetchUniversity = async () => {
      if (!session?.user.id) return
      const user = await UserService.getDetailedUser(session?.user.id)
      if (!user) return
      const initUser = getInitialUser(user)
      if (!initUser.university) {
        push("/profile/student")
        return
      }
      setUniversity(initUser.university!)
    }
    if (session?.user.id) fetchUniversity()
  }, [session?.user?.id, push])

  if (!university) return null

  const onSubmit = async () => {
    startLoading()
    if (!session?.user.id) return
    const user = await UserService.getUser(session?.user.id)
    if (!user) return
    const newUser = { ...user, university }
    await UserService.updateDetailedUser(newUser)
    endLoading()
  }

  const setImages = (newImages: string[]) => {
    setUniversity({
      ...university,
      images: newImages,
    })
  }

  const setExtraInfo = (newExtraInfo: ExtraUniversityInfoType[]) => {
    setUniversity({ ...university, extraInfo: newExtraInfo })
  }

  const setFaculties = (newFaculties: FacultyDetailedType[]) => {
    setUniversity({ ...university, faculties: newFaculties })
  }

  const setSpecialties = (newSpecialties: SpecialtyDetailedType[]) => {
    setUniversity({
      ...university,
      faculties: university.faculties.map((f, i) => ({
        ...f,
        specialties: selectedFaculty === i ? newSpecialties : f.specialties,
      })),
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <Typography color='primary' variant='h4' sx={{ margin: "16px 0 0 16px" }}>
          Учебное учреждение
        </Typography>
        <Card className={styles.universityWrap}>
          <ImagesInteractiveList images={university.images} setImages={setImages} />
          <div className={styles.fields}>
            <div className={styles.filed}>
              <TextField
                fullWidth
                label='Наименование'
                variant='standard'
                {...register("name")}
                value={university.name}
                onChange={(e) => setUniversity({ ...university, name: e.target.value })}
              />
              {errors.name && (
                <Typography color='error' variant='subtitle2'>
                  {errors.name.message}
                </Typography>
              )}
            </div>
            <div className={styles.filed}>
              <TextField
                fullWidth
                label='Описание'
                variant='standard'
                multiline
                {...register("description")}
                value={university.description}
                onChange={(e) => setUniversity({ ...university, description: e.target.value })}
              />
              {errors.description && (
                <Typography color='error' variant='subtitle2'>
                  {errors.description.message}
                </Typography>
              )}
            </div>
            <div className={styles.row}>
              <div className={styles.filed}>
                <TextField
                  fullWidth
                  label='Официальный сайт'
                  variant='standard'
                  {...register("siteLink")}
                  value={university.siteLink}
                  onChange={(e) => setUniversity({ ...university, siteLink: e.target.value })}
                />
                {errors.siteLink && (
                  <Typography color='error' variant='subtitle2'>
                    {errors.siteLink.message}
                  </Typography>
                )}
              </div>
              <div className={styles.filed}>
                <TextField
                  fullWidth
                  label='Количество учащихся'
                  variant='standard'
                  {...register("numberOfStudents")}
                  value={university.numberOfStudents}
                  onChange={(e) => setUniversity({ ...university, numberOfStudents: Number(e.target.value.replace(numberRegex, "")) })}
                />
                {errors.numberOfStudents && (
                  <Typography color='error' variant='subtitle2'>
                    {errors.numberOfStudents.message}
                  </Typography>
                )}
              </div>
            </div>
            <ExtraInfoInteractiveList
              extraInfo={university.extraInfo}
              setExtraInfo={(newExtraInfo) => setExtraInfo(newExtraInfo as ExtraUniversityInfoType[])}
              parent={{ name: "universityId", value: university.id }}
            />
          </div>
        </Card>
        <Typography color='primary' variant='h4' sx={{ margin: "16px 0 0 16px" }}>
          Подразделения
        </Typography>
        <Card sx={{ width: "100%" }}>
          <FacultyForm
            university={university}
            faculties={university.faculties}
            setFaculties={setFaculties}
            selectedFaculty={selectedFaculty}
            setSelectedFaculty={(newSelectedFaculty) => {
              setSelectedFaculty(newSelectedFaculty)
              setSelectedSpecialty(Math.min(university.faculties[newSelectedFaculty].specialties.length - 1, selectedSpecialty))
            }}
          />
        </Card>
        <Typography color='primary' variant='h4' sx={{ margin: "16px 0 0 16px" }}>
          Специальность
        </Typography>
        <Card sx={{ width: "100%" }}>
          <SpecialtyForm
            faculty={university.faculties[selectedFaculty]}
            specialties={university.faculties[selectedFaculty].specialties}
            setSpecialties={setSpecialties}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
          />
        </Card>
      </div>
      <Button variant='contained' color='primary' size='large' type='submit' sx={{ position: "fixed", bottom: "32px", marginRight: "16px" }}>
        Сохранить
      </Button>
    </form>
  )
}
