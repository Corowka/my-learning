import styles from "@/modules/preview/test/styles.module.css"
import { TestPreview } from "@/modules/preview/test/TestPreview/TestPreview"

interface UniversityPreviewPageProps {
  params: Promise<{
    testId: string
  }>
}

export default async function Page({ params }: UniversityPreviewPageProps) {
  const { testId } = await params
  return (
    <div className={styles.container}>
      <TestPreview testId={testId} />
    </div>
  )
}
