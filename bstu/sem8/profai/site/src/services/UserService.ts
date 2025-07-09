import bcrypt from "bcryptjs"

import {
  ExtendedSearchFormType,
  FacultyDetailedType,
  FacultyType,
  SpecialtyDetailedType,
  SpecialtyType,
  StudentDetailedType,
  SuggestionType,
  TestDetailedType,
  TestType,
  UniversityDetailedType,
  UniversityType,
  UserDetailedType,
  UserType,
} from "@/types"
import { decompressSuggestions } from "@/utils/compress"
import { getUserChanges } from "@/utils/getUserChanges"

export interface CreateUserProps {
  name?: string
  email: string
  password?: string
  role?: string
}

export class UserService {
  static async createUser(data: CreateUserProps) {
    if (!data.email) {
      throw new Error("email is required")
    }
    try {
      const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : ""
      const role = data.role || "student"

      const createUserRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: hashedPassword,
          role,
        }),
      })
      if (!createUserRes.ok) throw new Error()
      const user = await createUserRes.json()
      if (!user.data) throw new Error()

      if (role === "university") {
        const createUniversityRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/university`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.data.id }),
        })
        if (!createUniversityRes.ok) throw new Error()
        const university = await createUniversityRes.json()
        if (!university.data) throw new Error()
      }

      if (role === "student") {
        const createStudentRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.data.id }),
        })
        if (!createStudentRes.ok) throw new Error()
        const student = await createStudentRes.json()
        if (!student.data) throw new Error()
      }

      return user
    } catch {
      console.error(`UserService createUser`)
      return null
    }
  }

  static async getUser(userId: string): Promise<UserType | null> {
    try {
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`)
      if (!userRes.ok) throw new Error()
      const user = await userRes.json()
      if (!user.data) throw new Error()
      return user.data as UserType
    } catch (error) {
      console.error(`UserService getUser: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getDetailedUser(userId: string): Promise<UserDetailedType | null> {
    try {
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}/detailed`)
      if (!userRes.ok) throw new Error()
      const user = await userRes.json()
      if (!user.data) throw new Error()
      return user.data
    } catch (error) {
      console.error(`UserService getDetailedUser: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getDetailedUniversity(universityId: string): Promise<UniversityDetailedType | null> {
    try {
      const universityRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/university/${universityId}/detailed`)
      if (!universityRes.ok) throw new Error()
      const university = await universityRes.json()
      if (!university.data) throw new Error()
      return university.data
    } catch (error) {
      console.error(`UserService getDetailedUniversity: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getUniversity(universityId: string): Promise<UniversityType | null> {
    try {
      const universityRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/university/${universityId}`)
      if (!universityRes.ok) throw new Error()
      const university = await universityRes.json()
      if (!university.data) throw new Error()
      return university.data
    } catch (error) {
      console.error(`UserService getUniversity: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getDetailedStudent(studentId: string): Promise<StudentDetailedType | null> {
    try {
      const studentRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/${studentId}/detailed`)
      if (!studentRes.ok) throw new Error()
      const student = await studentRes.json()
      if (!student.data) throw new Error()
      return student.data
    } catch (error) {
      console.error(`UserService getDetailedStudent: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getDetailedFaculty(facultyId: string): Promise<FacultyDetailedType | null> {
    try {
      const facultyRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faculty/${facultyId}/detailed`)
      if (!facultyRes.ok) throw new Error()
      const faculty = await facultyRes.json()
      if (!faculty.data) throw new Error()
      return faculty.data
    } catch (error) {
      console.error(`UserService getDetailedFaculty: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getFaculty(facultyId: string): Promise<FacultyType | null> {
    try {
      const facultyRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faculty/${facultyId}`)
      if (!facultyRes.ok) throw new Error()
      const faculty = await facultyRes.json()
      if (!faculty.data) throw new Error()
      return faculty.data
    } catch (error) {
      console.error(`UserService getFaculty: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getDetailedSpecialty(specialtyId: string): Promise<SpecialtyDetailedType | null> {
    try {
      const specialtyRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specialty/${specialtyId}/detailed`)
      if (!specialtyRes.ok) throw new Error()
      const specialty = await specialtyRes.json()
      if (!specialty.data) throw new Error()
      return specialty.data
    } catch (error) {
      console.error(`UserService getDetailedSpecialty: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getSpecialty(specialtyId: string): Promise<SpecialtyType | null> {
    try {
      const specialtyRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specialty/${specialtyId}`)
      if (!specialtyRes.ok) throw new Error()
      const specialty = await specialtyRes.json()
      if (!specialty.data) throw new Error()
      return specialty.data
    } catch (error) {
      console.error(`UserService getSpecialty: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getAllDetailedUniversities(): Promise<UniversityDetailedType[] | null> {
    try {
      const allUniversitiesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/university/detailed`)
      if (!allUniversitiesRes.ok) throw new Error()
      const universities = await allUniversitiesRes.json()
      if (!universities.data) throw new Error()
      return universities.data
    } catch (error) {
      console.error(`UserService getAllDetailedUniversities: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getAiEvaluate(text: string): Promise<number[] | null> {
    try {
      const evaluationRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      if (!evaluationRes.ok) throw new Error()
      const evaluation = await evaluationRes.json()
      if (!evaluation.data) throw new Error()
      return evaluation.data.scores
    } catch (error) {
      console.error(`UserService getAllDetailedUniversities: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async createTest(data: TestType): Promise<TestType | null> {
    try {
      const testRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!testRes.ok) throw new Error()
      const test = await testRes.json()
      if (!test.data) throw new Error()
      return test.data
    } catch (error) {
      console.error(`UserService createTest: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getDetailedTest(testId: string): Promise<TestDetailedType | null> {
    try {
      const testRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${testId}/detailed`)
      if (!testRes.ok) throw new Error()
      const test = await testRes.json()
      if (!test.data) throw new Error()
      return test.data
    } catch (error) {
      console.error(`UserService getDetailedTest: ${(error as unknown as Error).message}`)
      return null
    }
  }

  static async getDetailedTestsWithStudentId(studentId: string): Promise<TestDetailedType[]> {
    try {
      const testsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/detailed/with/${studentId}`)
      if (!testsRes.ok) throw new Error()
      const tests = await testsRes.json()
      if (!tests.data) throw new Error()
      return tests.data
    } catch (error) {
      console.error(`UserService getDetailedTest: ${(error as unknown as Error).message}`)
      return []
    }
  }

  static async getSuggestions(testId: string): Promise<SuggestionType[]> {
    try {
      const suggestionsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/suggestions/${testId}`)
      if (!suggestionsRes.ok) throw new Error()
      const suggestions = await suggestionsRes.json()
      if (!suggestions.data) throw new Error()
      const decompressed = decompressSuggestions({ compressedSuggestions: suggestions.data })
      return decompressed
    } catch (error) {
      console.error(`UserService getSuggestions: ${(error as unknown as Error).message}`)
      return []
    }
  }

  static async searchQuery(query: string): Promise<SuggestionType[]> {
    try {
      const suggestionsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      })
      if (!suggestionsRes.ok) throw new Error()
      const suggestions = await suggestionsRes.json()
      if (!suggestions.data) throw new Error()
      const decompressed = decompressSuggestions({ compressedSuggestions: suggestions.data })
      return decompressed
    } catch (error) {
      console.error(`UserService getSuggestions: ${(error as unknown as Error).message}`)
      return []
    }
  }

  static async searchExtended(form: ExtendedSearchFormType): Promise<SuggestionType[]> {
    try {
      const suggestionsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/extended`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!suggestionsRes.ok) throw new Error()
      const suggestions = await suggestionsRes.json()
      if (!suggestions.data) throw new Error()
      const decompressed = decompressSuggestions({ compressedSuggestions: suggestions.data })
      return decompressed
    } catch (error) {
      console.error(`UserService getSuggestions: ${(error as unknown as Error).message}`)
      return []
    }
  }

  static async updateDetailedUser(data: UserDetailedType): Promise<UserDetailedType | null> {
    try {
      const userId = data.id
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}/detailed`)
      if (!userRes.ok) throw new Error("Failed to fetch user details")
      const user = await userRes.json()
      if (!user.data) throw new Error("User data not found")

      const changes = getUserChanges({ oldUser: user.data, newUser: data })

      if (changes.user.toUpdate) {
        const userUpdateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${changes.user.toUpdate.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changes.user.toUpdate),
        })
        if (!userUpdateRes.ok) throw new Error("Failed to update user")
      }

      if (changes.university.toUpdate) {
        const universityUpdateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/university/${changes.university.toUpdate.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changes.university.toUpdate),
        })
        if (!universityUpdateRes.ok) throw new Error("Failed to update university")
      }

      if (changes.student.toUpdate) {
        const studentUpdateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/${changes.student.toUpdate.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changes.student.toUpdate),
        })
        if (!studentUpdateRes.ok) throw new Error("Failed to update student")
      }

      for (const createData of changes.extraUniversityInfo.toCreate) {
        const createRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraUniversityInfo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        })
        if (!createRes.ok) throw new Error("Failed to create extra university info")
      }

      for (const updateData of changes.extraUniversityInfo.toUpdate) {
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraUniversityInfo/${updateData.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })
        if (!updateRes.ok) throw new Error("Failed to update extra university info")
      }

      for (const deleteId of changes.extraUniversityInfo.toDelete) {
        const deleteRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraUniversityInfo/${deleteId}`, { method: "DELETE" })
        if (!deleteRes.ok) throw new Error("Failed to delete extra university info")
      }

      for (const createData of changes.faculties.toCreate) {
        const createRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faculty`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        })
        if (!createRes.ok) throw new Error("Failed to create faculty")
      }

      for (const updateData of changes.faculties.toUpdate) {
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faculty/${updateData.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })
        if (!updateRes.ok) throw new Error("Failed to update faculty")
      }

      for (const deleteId of changes.faculties.toDelete) {
        const deleteRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faculty/${deleteId}`, { method: "DELETE" })
        if (!deleteRes.ok) throw new Error("Failed to delete faculty")
      }

      for (const createData of changes.extraFacultyInfo.toCreate) {
        const createRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraFacultyInfo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        })
        if (!createRes.ok) throw new Error("Failed to create extra faculty info")
      }

      for (const updateData of changes.extraFacultyInfo.toUpdate) {
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraFacultyInfo/${updateData.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })
        if (!updateRes.ok) throw new Error("Failed to update extra faculty info")
      }

      for (const deleteId of changes.extraFacultyInfo.toDelete) {
        const deleteRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraFacultyInfo/${deleteId}`, { method: "DELETE" })
        if (!deleteRes.ok) throw new Error("Failed to delete extra faculty info")
      }

      for (const createData of changes.specialties.toCreate) {
        const createRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specialty`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        })
        if (!createRes.ok) throw new Error("Failed to create specialty")
      }

      for (const updateData of changes.specialties.toUpdate) {
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specialty/${updateData.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })
        if (!updateRes.ok) throw new Error("Failed to update specialty")
      }

      for (const deleteId of changes.specialties.toDelete) {
        const deleteRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/specialty/${deleteId}`, { method: "DELETE" })
        if (!deleteRes.ok) throw new Error("Failed to delete specialty")
      }

      for (const createData of changes.extraSpecialtyInfo.toCreate) {
        const createRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraSpecialtyInfo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        })
        if (!createRes.ok) throw new Error("Failed to create extra specialty info")
      }

      for (const updateData of changes.extraSpecialtyInfo.toUpdate) {
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraSpecialtyInfo/${updateData.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })
        if (!updateRes.ok) throw new Error("Failed to update extra specialty info")
      }

      for (const deleteId of changes.extraSpecialtyInfo.toDelete) {
        const deleteRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extraSpecialtyInfo/${deleteId}`, { method: "DELETE" })
        if (!deleteRes.ok) throw new Error("Failed to delete extra specialty info")
      }

      return data
    } catch (error) {
      console.error(`UserService updateDetailedUser: ${(error as Error).message}`)
      return null
    }
  }
}
