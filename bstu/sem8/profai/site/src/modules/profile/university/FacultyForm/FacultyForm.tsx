import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { ConfirmDialog } from "@/modules/common/ConfirmDialog/ConfirmDialog"
import { TagInteractiveList } from "@/modules/common/TagInteractiveList/TagInteractiveList"
import {
    ExtraInfoInteractiveList
} from "@/modules/profile/university/ExtraInfoInteractiveList/ExtraInfoInteractiveList"
import {
    ExtraFacultyInfoType, ExtraSpecialtyInfoType, FacultyDetailedType, UniversityDetailedType
} from "@/types"
import AddIcon from "@mui/icons-material/Add"
import { Button, IconButton, Tab, Tabs, TextField } from "@mui/material"

import styles from "./FacultyForm.module.css"

interface FacultyFormProps {
  university: UniversityDetailedType
  faculties: FacultyDetailedType[]
  setFaculties: (faculties: FacultyDetailedType[]) => void
  selectedFaculty: number
  setSelectedFaculty: (selectedFaculty: number) => void
}

export const FacultyForm = ({ university, faculties, setFaculties, selectedFaculty, setSelectedFaculty }: FacultyFormProps) => {
  const [isDeleteFacultyDialogShow, setIsDeleteFacultyDialogShow] = useState(false)

  const setTags = (newTags: string[]) => {
    const newFaculties = [...faculties]
    newFaculties[selectedFaculty] = {
      ...newFaculties[selectedFaculty],
      areasOfKnowledge: newTags,
    }
    setFaculties(newFaculties)
  }

  const setExtraInfo = useCallback(
    (newExtraInfo: ExtraFacultyInfoType[]) => {
      const newFaculties = [...faculties]
      newFaculties[selectedFaculty] = {
        ...newFaculties[selectedFaculty],
        extraInfo: newExtraInfo,
      }
      setFaculties(newFaculties)
    },
    [selectedFaculty, faculties, setFaculties],
  )

  return (
    <div className={styles.form}>
      <div className={styles.tabs}>
        <Tabs variant='scrollable' scrollButtons value={selectedFaculty} onChange={(_, value) => setSelectedFaculty(value)}>
          {faculties.map((f, i) => (
            <Tab defaultValue={selectedFaculty} key={i} label={f.name || "Новое подразделение"} onClick={() => setSelectedFaculty(i)} />
          ))}
        </Tabs>
        <IconButton
          sx={{ width: "48px" }}
          onClick={() => {
            if (!university.id) {
              console.error("university.id is undefined")
            }
            const newSpecialtyId = uuidv4()
            const newFacultyId = uuidv4()
            setFaculties([
              ...faculties,
              {
                id: newFacultyId,
                name: "",
                description: "",
                areasOfKnowledge: [] as string[],
                extraInfo: [] as ExtraFacultyInfoType[],
                universityId: university.id,
                specialties: [
                  {
                    id: newSpecialtyId,
                    name: "",
                    description: "",
                    employment: "",
                    facultyId: newFacultyId,
                    extraInfo: [] as ExtraSpecialtyInfoType[],
                    test: [],
                  },
                ],
              },
            ])
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div className={styles.fields}>
        <div className={styles.filed}>
          <TextField
            fullWidth
            label='Наименование'
            value={faculties[selectedFaculty].name ?? ""}
            variant='standard'
            // {...register("name")}
            onChange={(e) => {
              const newFaculties = [...faculties]
              newFaculties[selectedFaculty].name = e.target.value
              setFaculties(newFaculties)
            }}
          />
          {/* {errors.name && (
            <Typography color='error' variant='subtitle2'>
              {errors.name.message}
            </Typography>
          )} */}
        </div>
        <div className={styles.filed}>
          <TextField
            fullWidth
            label='Описание'
            multiline
            value={faculties[selectedFaculty].description ?? ""}
            variant='standard'
            // {...register("description")}
            onChange={(e) => {
              const newFaculties = [...faculties]
              newFaculties[selectedFaculty].description = e.target.value
              setFaculties(newFaculties)
            }}
          />
          {/* {errors.description && (
            <Typography color='error' variant='subtitle2'>
              {errors.description.message}
            </Typography>
          )} */}
        </div>
        <TagInteractiveList title='Области знания' label={"Новая область"} tags={faculties[selectedFaculty].areasOfKnowledge} setTags={setTags} />
        <ExtraInfoInteractiveList
          extraInfo={faculties[selectedFaculty].extraInfo}
          setExtraInfo={(newExtraInfo) => setExtraInfo(newExtraInfo as ExtraFacultyInfoType[])}
          parent={{ name: "facultyId", value: faculties[selectedFaculty].id }}
        />
        <ConfirmDialog
          isOpen={isDeleteFacultyDialogShow}
          title={`Хотите удалить подразделение "${faculties[selectedFaculty].name || "Новое подразделение"}"?`}
          text='При подтверждении информация об данном подразделении будет безвозвратно утеряна.'
          onCancel={() => setIsDeleteFacultyDialogShow(false)}
          onOk={() => {
            const oldSelectedFaculty = selectedFaculty
            if (oldSelectedFaculty > faculties.length - 2) {
              setSelectedFaculty(faculties.length - 2)
            }
            setFaculties(faculties.filter((_, i) => i !== oldSelectedFaculty))
            setIsDeleteFacultyDialogShow(false)
          }}
        />
      </div>
      <Button
        size='medium'
        sx={{ marginTop: "32px" }}
        disabled={faculties.length === 1}
        variant='contained'
        color='error'
        onClick={() => setIsDeleteFacultyDialogShow(true)}
      >
        Удалить
      </Button>
    </div>
  )
}
