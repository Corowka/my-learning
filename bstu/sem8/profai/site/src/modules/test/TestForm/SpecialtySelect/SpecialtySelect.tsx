"use client"

import { useEffect, useState } from "react"

import { UserService } from "@/services/UserService"
import { FacultyDetailedType, SpecialtyDetailedType, UniversityDetailedType } from "@/types"
import { Autocomplete, TextField } from "@mui/material"

type Autocomplete = { label: string; value: string }[]

const getAutocompleteSpecialties = async () => {
  const newAllDetailedUniversities = await UserService.getAllDetailedUniversities()
  if (!newAllDetailedUniversities || !newAllDetailedUniversities.length) return []
  const autocompleteSpecialties = newAllDetailedUniversities.flatMap((university: UniversityDetailedType) =>
    university.faculties.flatMap((faculty: FacultyDetailedType) =>
      faculty.specialties.map((specialty: SpecialtyDetailedType) => ({
        label: `${university.name} - ${faculty.name} - ${specialty.name}`,
        value: specialty.id,
      })),
    ),
  )
  const defaultValue = { label: "Я абитуриент", value: "" }
  return [defaultValue, ...autocompleteSpecialties]
}

interface SpecialtySelectProps {
  specialtyId: string
  setSpecialtyId: (specialtyId: string) => void
}

export const SpecialtySelect = ({ specialtyId, setSpecialtyId }: SpecialtySelectProps) => {
  const [allSpecialties, setAllSpecialties] = useState<Autocomplete>([])

  useEffect(() => {
    const fetchAllSpecialties = async () => {
      const newAllSpecialties = await getAutocompleteSpecialties()
      setAllSpecialties(newAllSpecialties)
    }
    fetchAllSpecialties()
  }, [])

  return (
    <Autocomplete
      disablePortal
      options={allSpecialties}
      fullWidth
      value={allSpecialties.find((option) => option.value === specialtyId) || null}
      onChange={(_, newValue) => setSpecialtyId(newValue?.value || "")}
      renderInput={(params) => <TextField {...params} label='Специальность' />}
    />
  )
}
