import { NextRequest } from "next/server"

import { prisma } from "@/config/prisma"
import { FacultyDetailedType, SpecialtyDetailedType, UniversityDetailedType } from "@/types"
import { compressSuggestions } from "@/utils/compress"
import { toSimpleFaculty, toSimpleSpecialty, toSimpleUniversity } from "@/utils/toSimpleTable"

import { ResponseTemplate } from "../../utils"

export async function POST(req: NextRequest) {
  const data = await req.json()
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
    if (!data) {
      const compressedResult = compressSuggestions({ suggestions: suggestions })
      return ResponseTemplate(200, "query search default", compressedResult)
    }
    const descriptors: string[] = []
    for (const suggestion of suggestions) {
      descriptors.push(
        [
          suggestion.university.name,
          suggestion.university.description,
          suggestion.faculty.name,
          suggestion.faculty.description,
          suggestion.faculty.areasOfKnowledge.join(" "),
          suggestion.specialty.name,
          suggestion.specialty.description,
          suggestion.specialty.employment,
        ]
          .join(" ")
          .toLowerCase(),
      )
    }
    const query = data.toLowerCase()
    const result = suggestions.filter((_, i) => descriptors[i].indexOf(query) >= 0)
    const compressedResult = compressSuggestions({ suggestions: result })
    return ResponseTemplate(200, "query search", compressedResult)
  } catch (error) {
    console.error((error as unknown as Error).message)
    return ResponseTemplate(500, `query search: ${(error as unknown as Error).message}`)
  }
}
