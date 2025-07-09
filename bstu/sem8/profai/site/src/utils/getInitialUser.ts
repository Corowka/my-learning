import { v4 as uuidv4 } from "uuid"

import { StudentDetailedType, UniversityDetailedType, UserDetailedType } from "@/types"

export const getInitialUser = (data: UserDetailedType) => {
  const role = data.role
  let student: StudentDetailedType | undefined
  let university: UniversityDetailedType | undefined
  if (role === "student" && data?.student) {
    student = {
      ...data.student,
      firstName: data.student?.firstName || "",
      secondName: data.student?.secondName || "",
      thirdName: data.student?.thirdName || "",
      yearOfBirth: data.student?.yearOfBirth || 0,
      tests: [],
    }
  }
  if (role === "university" && data.university) {
    const newSpecialtyId = uuidv4()
    const newFacultyId = uuidv4()
    const initialSpecialty = {
      id: newSpecialtyId,
      name: "",
      description: "",
      employment: "",
      extraInfo: [],
      test: [],
      facultyId: data.university?.faculties.length ? data.university?.faculties[0].id : newFacultyId,
    }
    const initialFaculty = {
      id: newFacultyId,
      name: "",
      areasOfKnowledge: [] as string[],
      description: "",
      extraInfo: [],
      universityId: data.university.id,
      specialties: [initialSpecialty],
    }
    university = {
      ...data.university,
      latitude: 0,
      longitude: 0,
      siteLink: data.university?.siteLink || "",
      images: data.university?.images || [],
      numberOfStudents: data.university?.numberOfStudents || 0,
      approved: data.university?.approved || null,
      name: data.university?.name || "",
      description: data.university?.description || "",
      extraInfo: data.university?.extraInfo
        ? data.university?.extraInfo.map((extraInfo) => ({
            ...extraInfo,
            name: extraInfo?.name || "",
            value: extraInfo?.value || "",
          }))
        : [],
      faculties:
        data.university?.faculties.length > 0
          ? data.university?.faculties.map((faculty) => ({
              ...faculty,
              name: faculty?.name || "",
              areasOfKnowledge: faculty?.areasOfKnowledge || ([] as string[]),
              description: faculty?.description || "",
              extraInfo: faculty?.extraInfo
                ? faculty.extraInfo.map((extraInfo) => ({
                    ...extraInfo,
                    name: extraInfo?.name || "",
                    value: extraInfo?.value || "",
                  }))
                : [],
              specialties:
                faculty?.specialties.length > 0
                  ? faculty?.specialties.map((specialty) => ({
                      ...specialty,
                      name: specialty?.name || "",
                      description: specialty?.description || "",
                      employment: specialty?.employment || "",
                      extraInfo: specialty?.extraInfo
                        ? specialty.extraInfo.map((extraInfo) => ({
                            ...extraInfo,
                            name: extraInfo?.name || "",
                            value: extraInfo?.value || "",
                          }))
                        : [],
                    }))
                  : [initialSpecialty],
            }))
          : [initialFaculty],
    }
  }
  return {
    ...data,
    name: "",
    email: "",
    emailVerified: "",
    image: "",
    password: "",
    role,
    student,
    university,
  }
}
