import {
  ExtraFacultyInfoType,
  ExtraSpecialtyInfoType,
  ExtraUniversityInfoType,
  FacultyType,
  SpecialtyDetailedType,
  SpecialtyType,
  StudentType,
  UniversityType,
  UserDetailedType,
  UserType,
} from "@/types"

import { toSimpleFaculty, toSimpleSpecialty, toSimpleStudent, toSimpleUniversity, toSimpleUser } from "./toSimpleTable"

interface GetUserChangesProps {
  oldUser: UserDetailedType
  newUser: UserDetailedType
}

interface GetUserChangesReturn {
  user: {
    toUpdate: UserType | null
  }
  university: {
    toUpdate: UniversityType | null
  }
  student: {
    toUpdate: StudentType | null
  }
  extraUniversityInfo: {
    toCreate: ExtraUniversityInfoType[]
    toUpdate: ExtraUniversityInfoType[]
    toDelete: string[]
  }
  faculties: {
    toCreate: FacultyType[]
    toUpdate: FacultyType[]
    toDelete: string[]
  }
  extraFacultyInfo: {
    toCreate: ExtraFacultyInfoType[]
    toUpdate: ExtraFacultyInfoType[]
    toDelete: string[]
  }
  specialties: {
    toCreate: SpecialtyType[]
    toUpdate: SpecialtyType[]
    toDelete: string[]
  }
  extraSpecialtyInfo: {
    toCreate: ExtraSpecialtyInfoType[]
    toUpdate: ExtraSpecialtyInfoType[]
    toDelete: string[]
  }
}

export const getUserChanges = ({ oldUser, newUser }: GetUserChangesProps): GetUserChangesReturn => {
  const userToUpdate = isTableUpdated({ oldTable: toSimpleUser(oldUser), newTable: toSimpleUser(newUser) }) ? toSimpleUser(newUser) : null

  let universityToUpdate = null
  let studentToUpdate = null

  let extraUniversityInfoToCreate: ExtraUniversityInfoType[] = []
  let extraUniversityInfoToUpdate: ExtraUniversityInfoType[] = []
  let extraUniversityInfoToDelete: string[] = []

  let facultiesToCreate: FacultyType[] = []
  let facultiesToUpdate: FacultyType[] = []
  let facultiesToDelete: string[] = []

  let extraFacultyInfoToCreate: ExtraFacultyInfoType[] = []
  let extraFacultyInfoToUpdate: ExtraFacultyInfoType[] = []
  let extraFacultyInfoToDelete: string[] = []

  let specialtiesToCreate: SpecialtyType[] = []
  let specialtiesToUpdate: SpecialtyType[] = []
  let specialtiesToDelete: string[] = []

  let extraSpecialtyInfoToCreate: ExtraSpecialtyInfoType[] = []
  let extraSpecialtyInfoToUpdate: ExtraSpecialtyInfoType[] = []
  let extraSpecialtyInfoToDelete: string[] = []

  const oldUniversity = oldUser.university
  const newUniversity = newUser.university
  if (oldUniversity && newUniversity) {
    if (isTableUpdated({ oldTable: toSimpleUniversity(oldUniversity), newTable: toSimpleUniversity(newUniversity) })) {
      universityToUpdate = toSimpleUniversity(newUniversity)
    }
    extraUniversityInfoToCreate = getTablesToCreate({
      oldTables: oldUniversity.extraInfo,
      newTables: newUniversity.extraInfo,
    }) as ExtraUniversityInfoType[]
    extraUniversityInfoToUpdate = getTablesToUpdate({
      oldTables: oldUniversity.extraInfo,
      newTables: newUniversity.extraInfo,
    }) as ExtraUniversityInfoType[]
    extraUniversityInfoToDelete = getTablesToDelete({ oldTables: oldUniversity.extraInfo, newTables: newUniversity.extraInfo })

    facultiesToCreate = getTablesToCreate({
      oldTables: oldUniversity.faculties.map((f) => toSimpleFaculty(f)),
      newTables: newUniversity.faculties.map((f) => toSimpleFaculty(f)),
    }) as FacultyType[]
    facultiesToUpdate = getTablesToUpdate({
      oldTables: oldUniversity.faculties.map((f) => toSimpleFaculty(f)),
      newTables: newUniversity.faculties.map((f) => toSimpleFaculty(f)),
    }) as FacultyType[]
    facultiesToDelete = getTablesToDelete({
      oldTables: oldUniversity.faculties.map((f) => toSimpleFaculty(f)),
      newTables: newUniversity.faculties.map((f) => toSimpleFaculty(f)),
    })

    const facultiesToCreateIds = facultiesToCreate.map((f) => f.id)
    const notDeletedFaculties = newUniversity.faculties.filter((f) => ![...facultiesToDelete, ...facultiesToCreateIds].includes(f.id))
    for (const newFaculty of notDeletedFaculties) {
      const oldFaculty = oldUniversity.faculties.filter((f) => f.id === newFaculty.id)[0]
      extraFacultyInfoToCreate = [
        ...extraFacultyInfoToCreate,
        ...(getTablesToCreate({ oldTables: oldFaculty.extraInfo, newTables: newFaculty.extraInfo }) as ExtraFacultyInfoType[]),
      ]
      extraFacultyInfoToUpdate = [
        ...extraFacultyInfoToUpdate,
        ...(getTablesToUpdate({ oldTables: oldFaculty.extraInfo, newTables: newFaculty.extraInfo }) as ExtraFacultyInfoType[]),
      ]
      extraFacultyInfoToDelete = [
        ...extraFacultyInfoToDelete,
        ...getTablesToDelete({ oldTables: oldFaculty.extraInfo, newTables: newFaculty.extraInfo }),
      ]

      specialtiesToCreate = [
        ...specialtiesToCreate,
        ...(getTablesToCreate({
          oldTables: oldFaculty.specialties.map((s) => toSimpleSpecialty(s)),
          newTables: newFaculty.specialties.map((s) => toSimpleSpecialty(s)),
        }) as SpecialtyType[]),
      ]
      specialtiesToUpdate = [
        ...specialtiesToUpdate,
        ...(getTablesToUpdate({
          oldTables: oldFaculty.specialties.map((s) => toSimpleSpecialty(s)),
          newTables: newFaculty.specialties.map((s) => toSimpleSpecialty(s)),
        }) as SpecialtyType[]),
      ]
      specialtiesToDelete = [
        ...specialtiesToDelete,
        ...getTablesToDelete({
          oldTables: oldFaculty.specialties.map((s) => toSimpleSpecialty(s)),
          newTables: newFaculty.specialties.map((s) => toSimpleSpecialty(s)),
        }),
      ]

      const specialtiesToCreateIds = specialtiesToCreate.map((f) => f.id)
      const notDeletedSpecialties = newFaculty.specialties.filter((s) => ![...specialtiesToDelete, ...specialtiesToCreateIds].includes(s.id))
      for (const newSpecialty of notDeletedSpecialties) {
        const oldSpecialty = oldUniversity.faculties
          .reduce((ss, f) => [...ss, ...f.specialties], [] as SpecialtyDetailedType[])
          .filter((s) => s.id === newSpecialty.id)[0]
        extraSpecialtyInfoToCreate = [
          ...extraSpecialtyInfoToCreate,
          ...(getTablesToCreate({ oldTables: oldSpecialty.extraInfo, newTables: newSpecialty.extraInfo }) as ExtraSpecialtyInfoType[]),
        ]
        extraSpecialtyInfoToUpdate = [
          ...extraSpecialtyInfoToUpdate,
          ...(getTablesToUpdate({ oldTables: oldSpecialty.extraInfo, newTables: newSpecialty.extraInfo }) as ExtraSpecialtyInfoType[]),
        ]
        extraSpecialtyInfoToDelete = [
          ...extraSpecialtyInfoToDelete,
          ...getTablesToDelete({ oldTables: oldSpecialty.extraInfo, newTables: newSpecialty.extraInfo }),
        ]
      }
    }
  }

  if (
    oldUser.student &&
    newUser.student &&
    isTableUpdated({ oldTable: toSimpleStudent(oldUser.student), newTable: toSimpleStudent(newUser.student) })
  ) {
    studentToUpdate = toSimpleStudent(newUser.student)
  }

  return {
    user: { toUpdate: userToUpdate },
    university: { toUpdate: universityToUpdate },
    student: { toUpdate: studentToUpdate },
    extraUniversityInfo: {
      toCreate: extraUniversityInfoToCreate,
      toUpdate: extraUniversityInfoToUpdate,
      toDelete: extraUniversityInfoToDelete,
    },
    faculties: {
      toCreate: facultiesToCreate,
      toUpdate: facultiesToUpdate,
      toDelete: facultiesToDelete,
    },
    extraFacultyInfo: {
      toCreate: extraFacultyInfoToCreate,
      toUpdate: extraFacultyInfoToUpdate,
      toDelete: extraFacultyInfoToDelete,
    },
    specialties: {
      toCreate: specialtiesToCreate,
      toUpdate: specialtiesToUpdate,
      toDelete: specialtiesToDelete,
    },
    extraSpecialtyInfo: {
      toCreate: extraSpecialtyInfoToCreate,
      toUpdate: extraSpecialtyInfoToUpdate,
      toDelete: extraSpecialtyInfoToDelete,
    },
  }
}

type TableType =
  | UserType
  | UniversityType
  | StudentType
  | FacultyType
  | SpecialtyType
  | ExtraUniversityInfoType
  | ExtraFacultyInfoType
  | ExtraSpecialtyInfoType
type TableKeyType = keyof TableType

interface IsTableUpdatedProps {
  oldTable: TableType
  newTable: TableType
}

export const isTableUpdated = ({ oldTable, newTable }: IsTableUpdatedProps): boolean => {
  if (!newTable.id) {
    return false
  }
  for (const key of Object.keys(oldTable) as TableKeyType[]) {
    if (JSON.stringify(oldTable[key]) !== JSON.stringify(newTable[key])) {
      return true
    }
  }
  return false
}

interface GetTablesToCreateProps {
  oldTables: TableType[]
  newTables: TableType[]
}

export const getTablesToCreate = ({ oldTables, newTables }: GetTablesToCreateProps): TableType[] => {
  const oldTableIds = oldTables.map((table) => table.id)
  const tablesToCreate = newTables.filter((newTable) => !oldTableIds.includes(newTable.id))
  return tablesToCreate
}

interface GetTablesToUpdateProps {
  oldTables: TableType[]
  newTables: TableType[]
}

export const getTablesToUpdate = ({ oldTables, newTables }: GetTablesToUpdateProps): TableType[] => {
  const tablesToUpdate = []
  const oldTableIds = oldTables.map((table) => table.id)
  const tableCanUpdate = newTables
    .map((table) => table.id)
    .filter((id) => oldTableIds.includes(id))
    .map((id) => newTables.filter((table) => table.id === id)[0])
  for (const newTable of tableCanUpdate) {
    const oldTable = oldTables.filter((table) => table.id === newTable.id)[0]
    if (isTableUpdated({ oldTable, newTable })) {
      tablesToUpdate.push(newTable)
    }
  }
  return tablesToUpdate
}

interface GetTablesToDeleteProps {
  oldTables: TableType[]
  newTables: TableType[]
}

export const getTablesToDelete = ({ oldTables, newTables }: GetTablesToDeleteProps): string[] => {
  const tablesToDelete = []
  for (const oldTable of oldTables) {
    if (oldTable.id && !newTables.some((table) => table.id === oldTable.id)) {
      tablesToDelete.push(oldTable.id)
    }
  }
  return tablesToDelete
}
