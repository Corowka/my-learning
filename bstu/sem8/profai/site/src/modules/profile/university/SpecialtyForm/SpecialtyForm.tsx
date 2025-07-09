import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { ConfirmDialog } from "@/modules/common/ConfirmDialog/ConfirmDialog"
import {
    ExtraInfoInteractiveList
} from "@/modules/profile/university/ExtraInfoInteractiveList/ExtraInfoInteractiveList"
import { ExtraSpecialtyInfoType, FacultyDetailedType, SpecialtyDetailedType } from "@/types"
import AddIcon from "@mui/icons-material/Add"
import { Button, IconButton, Tab, Tabs, TextField } from "@mui/material"

import styles from "./SpecialtyForm.module.css"

interface SpecialtyFormProps {
  faculty: FacultyDetailedType
  specialties: SpecialtyDetailedType[]
  setSpecialties: (newSpecialties: SpecialtyDetailedType[]) => void
  selectedSpecialty: number
  setSelectedSpecialty: (selectedSpecialty: number) => void
}

export const SpecialtyForm = ({ faculty, specialties, setSpecialties, selectedSpecialty, setSelectedSpecialty }: SpecialtyFormProps) => {
  const [isDeleteSpecialtyDialogShow, setIsDeleteSpecialtyDialogShow] = useState(false)

  const setExtraInfo = useCallback(
    (newExtraInfo: ExtraSpecialtyInfoType[]) => {
      const newSpecialties = [...specialties]
      newSpecialties[selectedSpecialty] = {
        ...newSpecialties[selectedSpecialty],
        extraInfo: newExtraInfo,
      }
      setSpecialties(newSpecialties)
    },
    [selectedSpecialty, specialties, setSpecialties],
  )

  return (
    <div className={styles.form}>
      <div className={styles.tabs}>
        <Tabs variant='scrollable' scrollButtons value={selectedSpecialty} onChange={(_, value) => setSelectedSpecialty(value)}>
          {specialties.map((s, i) => (
            <Tab defaultValue={selectedSpecialty} key={i} label={s.name || "Новая специальность"} onClick={() => setSelectedSpecialty(i)} />
          ))}
        </Tabs>
        <IconButton
          sx={{ width: "48px" }}
          onClick={() => {
            if (!faculty.id) {
              console.error("faculty.id is undefined")
              return
            }
            const newSpecialtyId = uuidv4()
            setSpecialties([
              ...specialties,
              {
                id: newSpecialtyId,
                name: "",
                description: "",
                employment: "",
                facultyId: faculty.id,
                extraInfo: [] as ExtraSpecialtyInfoType[],
                test: [],
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
            value={specialties[selectedSpecialty].name ?? ""}
            variant='standard'
            // {...register("name")}
            onChange={(e) => {
              const newSpecialties = [...specialties]
              newSpecialties[selectedSpecialty].name = e.target.value
              setSpecialties(newSpecialties)
            }}
          />
          {/* {errors.name && (
            <Typography color="error" variant="subtitle2">
              {errors.name.message}
            </Typography>
          )} */}
        </div>
        <div className={styles.filed}>
          <TextField
            fullWidth
            label='Описание'
            multiline
            value={specialties[selectedSpecialty].description ?? ""}
            variant='standard'
            // {...register("description")}
            onChange={(e) => {
              const newSpecialties = [...specialties]
              newSpecialties[selectedSpecialty].description = e.target.value
              setSpecialties(newSpecialties)
            }}
          />
          {/* {errors.description && (
            <Typography color="error" variant="subtitle2">
              {errors.description.message}
            </Typography>
          )} */}
        </div>
        <div className={styles.filed}>
          <TextField
            fullWidth
            label='Трудоустройство'
            multiline
            value={specialties[selectedSpecialty].employment ?? ""}
            variant='standard'
            // {...register("employment")}
            onChange={(e) => {
              const newSpecialties = [...specialties]
              newSpecialties[selectedSpecialty].employment = e.target.value
              setSpecialties(newSpecialties)
            }}
          />
          {/* {errors.employment && (
            <Typography color="error" variant="subtitle2">
              {errors.employment.message}
            </Typography>
          )} */}
        </div>
        <ExtraInfoInteractiveList
          extraInfo={specialties[selectedSpecialty].extraInfo}
          setExtraInfo={(newExtraInfo) => setExtraInfo(newExtraInfo as ExtraSpecialtyInfoType[])}
          parent={{ name: "specialtyId", value: specialties[selectedSpecialty].id }}
        />
        <ConfirmDialog
          isOpen={isDeleteSpecialtyDialogShow}
          title={`Хотите удалить подразделение "${specialties[selectedSpecialty].name || "Новое подразделение"}"?`}
          text='При подтверждении информация об данном подразделении будет безвозвратно утеряна.'
          onCancel={() => setIsDeleteSpecialtyDialogShow(false)}
          onOk={() => {
            const oldSelectedFaculty = selectedSpecialty
            if (oldSelectedFaculty > specialties.length - 2) {
              setSelectedSpecialty(specialties.length - 2)
            }
            setSpecialties(specialties.filter((_, i) => i !== oldSelectedFaculty))
            setIsDeleteSpecialtyDialogShow(false)
          }}
        />
      </div>
      <Button
        size='medium'
        sx={{ marginTop: "32px" }}
        disabled={specialties.length === 1}
        variant='contained'
        color='error'
        onClick={() => setIsDeleteSpecialtyDialogShow(true)}
      >
        Удалить
      </Button>
    </div>
  )
}
