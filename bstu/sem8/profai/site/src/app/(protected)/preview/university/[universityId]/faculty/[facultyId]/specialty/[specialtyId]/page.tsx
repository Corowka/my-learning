import { FacultyPreview } from "@/modules/preview/university/FacultyPreview/FacultyPreview"
import { SpecialtyPreview } from "@/modules/preview/university/SpecialtyPreview/SpecialtyPreview"
import styles from "@/modules/preview/university/styles.module.css"
import { UniversityPreview } from "@/modules/preview/university/UniversityPreview/UniversityPreview"

interface UniversityPreviewPageProps {
  params: Promise<{
    universityId: string
    facultyId: string
    specialtyId: string
  }>
}

export default async function Page({ params }: UniversityPreviewPageProps) {
  const { universityId, facultyId, specialtyId } = await params
  return (
    <div className={styles.container}>
      <UniversityPreview universityId={universityId} />
      <FacultyPreview facultyId={facultyId} />
      <SpecialtyPreview specialtyId={specialtyId} />
    </div>
  )
}
