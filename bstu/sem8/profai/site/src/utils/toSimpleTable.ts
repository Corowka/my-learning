import {
    FacultyDetailedType, FacultyType, SpecialtyDetailedType, SpecialtyType, StudentDetailedType,
    StudentType, UniversityDetailedType, UniversityType, UserDetailedType, UserType
} from "@/types"

export const toSimpleUser = (user: UserDetailedType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { student, university, ...simpleUser } = user
  return simpleUser
}

export const toSimpleStudent = (student: StudentDetailedType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tests, ...simpleUser } = student
  return simpleUser
}

export const toSimpleUniversity = (university: UniversityDetailedType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { faculties, extraInfo, ...simpleUniversity } = university
  return simpleUniversity
}

export const toSimpleFaculty = (faculty: FacultyDetailedType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { specialties, extraInfo, ...simpleFaculty } = faculty
  return simpleFaculty
}

export const toSimpleSpecialty = (specialty: SpecialtyDetailedType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { test, extraInfo, ...simpleSpecialty } = specialty
  return simpleSpecialty
}

type DetailedTableType = UserDetailedType | UniversityDetailedType | StudentDetailedType | FacultyDetailedType | SpecialtyDetailedType
type SimpleTableType = UserType | UniversityType | StudentType | FacultyType | SpecialtyType

export const toSimpleTable = (table: DetailedTableType) => {
  if (isUserType(table)) {
    return toSimpleUser(table)
  }
  if (isStudentType(table)) {
    return toSimpleStudent(table)
  }
  if (isUniversityType(table)) {
    return toSimpleUniversity(table)
  }
  if (isFacultyType(table)) {
    return toSimpleFaculty(table)
  }
  return toSimpleSpecialty(table)
}

export const isUserType = (table: DetailedTableType | SimpleTableType): table is UserType => {
  return (
    typeof table === "object" &&
    table !== null &&
    "email" in table &&
    "role" in table &&
    typeof table.email === "string" &&
    (typeof table.role === "string" || table.role === undefined)
  )
}

export const isStudentType = (table: DetailedTableType | SimpleTableType): table is StudentType => {
  return (
    typeof table === "object" &&
    table !== null &&
    "firstName" in table &&
    "secondName" in table &&
    "thirdName" in table &&
    "yearOfBirth" in table &&
    (typeof table.firstName === "string" || table.firstName === undefined) &&
    (typeof table.secondName === "string" || table.secondName === undefined) &&
    (typeof table.thirdName === "string" || table.thirdName === undefined) &&
    (typeof table.yearOfBirth === "number" || table.yearOfBirth === undefined)
  )
}

export const isUniversityType = (table: DetailedTableType | SimpleTableType): table is UniversityType => {
  return (
    typeof table === "object" &&
    table !== null &&
    "latitude" in table &&
    "longitude" in table &&
    "siteLink" in table &&
    "images" in table &&
    "numberOfStudents" in table &&
    "name" in table &&
    "description" in table &&
    typeof table.latitude === "number" &&
    typeof table.longitude === "number" &&
    typeof table.siteLink === "string" &&
    Array.isArray(table.images) &&
    typeof table.numberOfStudents === "number" &&
    typeof table.name === "string" &&
    typeof table.description === "string"
  )
}

export const isFacultyType = (table: DetailedTableType | SimpleTableType): table is FacultyType => {
  return (
    typeof table === "object" &&
    table !== null &&
    "name" in table &&
    "areasOfKnowledge" in table &&
    "description" in table &&
    typeof table.name === "string" &&
    Array.isArray(table.areasOfKnowledge) &&
    typeof table.description === "string"
  )
}

export const isSpecialtyType = (table: DetailedTableType | SimpleTableType): table is SpecialtyType => {
  return (
    typeof table === "object" &&
    table !== null &&
    "name" in table &&
    "description" in table &&
    "employment" in table &&
    typeof table.name === "string" &&
    typeof table.description === "string" &&
    typeof table.employment === "string"
  )
}
