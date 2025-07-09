export type ExtraUniversityInfoType = {
  id: string
  name: string
  value: string
  universityId: string
}

export type ExtraFacultyInfoType = {
  id: string
  name: string
  value: string
  facultyId: string
}

export type ExtraSpecialtyInfoType = {
  id: string
  name: string
  value: string
  specialtyId: string
}

export type SpecialtyDetailedType = {
  id: string
  name: string
  description: string
  employment: string
  facultyId: string
  extraInfo: ExtraSpecialtyInfoType[]
  test: TestType[]
}

export type SpecialtyType = {
  id: string
  name: string
  description: string
  employment: string
  facultyId: string
}

export type FacultyDetailedType = {
  id: string
  name: string
  areasOfKnowledge: string[]
  description: string
  universityId: string
  extraInfo: ExtraFacultyInfoType[]
  specialties: SpecialtyDetailedType[]
}

export type FacultyType = {
  id: string
  name: string
  areasOfKnowledge: string[]
  description: string
  universityId: string
}

export type TestType = {
  id: string
  benefits: number[]
  skills: number[]
  questions: string[]
  llmSkills: number[]
  passDate: string
  studentId: string
  specialtyId?: string | null
}

export type TestDetailedType = {
  id: string
  benefits: number[]
  skills: number[]
  questions: string[]
  llmSkills: number[]
  passDate: string
  student: StudentDetailedType
  specialty?: SpecialtyDetailedType
}

export type UniversityDetailedType = {
  id: string
  latitude: number
  longitude: number
  siteLink: string
  images: string[]
  numberOfStudents: number
  approved: string | null
  name: string
  description: string
  userId: string
  extraInfo: ExtraUniversityInfoType[]
  faculties: FacultyDetailedType[]
}

export type UniversityType = {
  id: string
  latitude: number
  longitude: number
  siteLink: string
  images: string[]
  numberOfStudents: number
  approved: string | null
  name: string
  description: string
  userId: string
}

export type StudentDetailedType = {
  id: string
  firstName?: string
  secondName?: string
  thirdName?: string
  yearOfBirth?: number
  tests: TestType[]
  userId: string
}

export type StudentType = {
  id: string
  firstName?: string
  secondName?: string
  thirdName?: string
  yearOfBirth?: number
  userId: string
}

export type UserDetailedType = {
  id: string
  name?: string
  email: string
  emailVerified?: string
  image?: string
  password?: string
  role?: string
  student?: StudentDetailedType
  university?: UniversityDetailedType
}

export type UserType = {
  id: string
  name?: string
  email: string
  emailVerified?: string
  image?: string
  password?: string
  role?: string
}

export type SuggestionType = {
  university: UniversityType
  faculty: FacultyType
  specialty: SpecialtyType
  benefits?: number
  skills?: number
  llmSkills?: number
}

export type CompressedSuggestionType = {
  university: {
    id: string
    name: string
    images: string[]
    userId: string
    faculties: {
      id: string
      name: string
      areasOfKnowledge: string[]
      universityId: string
      specialties: {
        id: string
        name: string
        description: string
        facultyId: string
        benefits?: number
        skills?: number
        llmSkills?: number
      }[]
    }[]
  }
}

export type ExtendedSearchFormType = {
  university: {
    name: string
    description: string
  }
  faculty: {
    name: string
    description: string
    areasOfKnowledge: string
  }
  specialty: {
    name: string
    description: string
    employment: string
  }
}
