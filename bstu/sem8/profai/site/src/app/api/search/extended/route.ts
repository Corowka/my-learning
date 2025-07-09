import { NextRequest } from "next/server"

import { prisma } from "@/config/prisma"
import {
    ExtendedSearchFormType, FacultyDetailedType, SpecialtyDetailedType, UniversityDetailedType
} from "@/types"
import { compressSuggestions } from "@/utils/compress"
import { toSimpleFaculty, toSimpleSpecialty, toSimpleUniversity } from "@/utils/toSimpleTable"

import { ResponseTemplate } from "../../utils"

export async function POST(req: NextRequest) {
  const data = await req.json()
  if (!data) {
    return ResponseTemplate(400, "invalid extended search data")
  }
  try {
    const universities = await prisma.university.findMany({
      include: {
        faculties: {
          include: {
            extraInfo: true,
            specialties: { include: { extraInfo: true } },
          },
        },
        extraInfo: true,
      },
    })
    if (!universities) {
      return ResponseTemplate(400, "while getting all detailed universities")
    }
    const suggestions = []
    for (const detailedUniversity of universities) {
      const university = toSimpleUniversity(detailedUniversity as UniversityDetailedType)
      for (const detailedFaculty of detailedUniversity.faculties) {
        const faculty = toSimpleFaculty(detailedFaculty as FacultyDetailedType)
        for (const detailedSpecialty of detailedFaculty.specialties) {
          const specialty = toSimpleSpecialty(detailedSpecialty as SpecialtyDetailedType)
          suggestions.push({ university, faculty, specialty })
        }
      }
    }
    const descriptors: ExtendedSearchFormType[] = []
    for (const suggestion of suggestions) {
      descriptors.push({
        university: {
          name: suggestion.university?.name.toLowerCase() || "",
          description: suggestion.university?.description.toLowerCase() || "",
        },
        faculty: {
          name: suggestion.faculty?.name.toLowerCase() || "",
          description: suggestion.faculty?.description.toLowerCase() || "",
          areasOfKnowledge: suggestion.faculty?.areasOfKnowledge.join(" ").toLowerCase() || "",
        },
        specialty: {
          name: suggestion.specialty?.name.toLowerCase() || "",
          description: suggestion.specialty?.description.toLowerCase() || "",
          employment: suggestion.specialty?.employment.toLowerCase() || "",
        },
      })
    }
    const form = {
      university: {
        name: data.university?.name.toLowerCase() || "",
        description: data.university?.description.toLowerCase() || "",
      },
      faculty: {
        name: data.faculty?.name.toLowerCase() || "",
        description: data.faculty?.description.toLowerCase() || "",
        areasOfKnowledge: data.faculty?.areasOfKnowledge.toLowerCase() || "",
      },
      specialty: {
        name: data.specialty?.name.toLowerCase() || "",
        description: data.specialty?.description.toLowerCase() || "",
        employment: data.specialty?.employment.toLowerCase() || "",
      },
    }
    const result = suggestions.filter(
      (_, i) =>
        (form.university.name && descriptors[i].university.name.indexOf(form.university.name) >= 0) ||
        (form.university.description && descriptors[i].university.description.indexOf(form.university.description) >= 0) ||
        (form.faculty.name && descriptors[i].faculty.name.indexOf(form.faculty.name) >= 0) ||
        (form.faculty.description && descriptors[i].faculty.description.indexOf(form.faculty.description) >= 0) ||
        (form.faculty.areasOfKnowledge && descriptors[i].faculty.areasOfKnowledge.indexOf(form.faculty.areasOfKnowledge) >= 0) ||
        (form.specialty.name && descriptors[i].specialty.name.indexOf(form.specialty.name) >= 0) ||
        (form.specialty.description && descriptors[i].specialty.description.indexOf(form.specialty.description) >= 0) ||
        (form.specialty.employment && descriptors[i].specialty.employment.indexOf(form.specialty.employment) >= 0),
    )
    const compressedResult = compressSuggestions({ suggestions: result })
    return ResponseTemplate(200, "extended search", compressedResult)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `extended search: ${(error as unknown as Error).message}`)
  }
}
