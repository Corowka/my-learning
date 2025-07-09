import { CompressedSuggestionType, SuggestionType } from "@/types"

interface CompressSuggestionsProps {
  suggestions: SuggestionType[]
}

export const compressSuggestions = ({ suggestions }: CompressSuggestionsProps): CompressedSuggestionType[] => {
  const universityMap = new Map<string, CompressedSuggestionType["university"]>()
  suggestions.forEach(({ university, faculty, specialty }, i) => {
    if (!universityMap.has(university.name)) {
      universityMap.set(university.name, {
        id: university.id,
        name: university.name,
        images: university?.images?.[0] ? [university.images[0]] : [],
        faculties: [],
        userId: university.userId,
      })
    }
    const uni = universityMap.get(university.name)!
    let facultyEntry = uni.faculties.find((f) => f.name === faculty.name)
    if (!facultyEntry) {
      facultyEntry = {
        id: faculty.id,
        name: faculty.name,
        areasOfKnowledge: faculty.areasOfKnowledge || [],
        specialties: [],
        universityId: faculty.universityId,
      }
      uni.faculties.push(facultyEntry)
    }
    if (!facultyEntry.specialties.some((s) => s.name === specialty.name)) {
      facultyEntry.specialties.push({
        id: specialty.id,
        name: specialty.name,
        facultyId: specialty.facultyId,
        description: specialty.description,
        benefits: suggestions[i]?.benefits,
        skills: suggestions[i]?.skills,
        llmSkills: suggestions[i]?.llmSkills,
      })
    }
  })
  return Array.from(universityMap.values()).map((university) => ({ university }))
}

interface DecompressSuggestionsProps {
  compressedSuggestions: CompressedSuggestionType[]
}

export const decompressSuggestions = ({ compressedSuggestions }: DecompressSuggestionsProps): SuggestionType[] => {
  const decompressedSuggestions: SuggestionType[] = []
  compressedSuggestions.forEach(({ university }) => {
    university.faculties.forEach((faculty) => {
      faculty.specialties.forEach((specialty) => {
        decompressedSuggestions.push({
          university: {
            id: university.id,
            name: university.name,
            images: university.images,
            latitude: 0,
            longitude: 0,
            siteLink: "",
            numberOfStudents: 0,
            approved: null,
            description: "",
            userId: "",
          },
          faculty: {
            id: faculty.id,
            name: faculty.name,
            areasOfKnowledge: faculty.areasOfKnowledge,
            description: "",
            universityId: faculty.universityId,
          },
          specialty: {
            id: specialty.id,
            name: specialty.name,
            description: specialty.description,
            employment: "",
            facultyId: specialty.facultyId,
          },
          benefits: specialty.benefits,
          skills: specialty.skills,
          llmSkills: specialty.llmSkills,
        })
      })
    })
  })

  return decompressedSuggestions
}
