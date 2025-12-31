import { Header } from "@/components/header"
import { LessonView } from "@/components/lesson-view"

export default function LicaoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LessonView lessonId={params.id} />
      </main>
    </div>
  )
}
