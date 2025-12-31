import { Header } from "@/components/header"
import { LessonsList } from "@/components/lessons-list"

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Lições</h1>
          <p className="text-muted-foreground">Aprenda os fundamentos da dedução natural passo a passo</p>
        </div>
        <LessonsList />
      </main>
    </div>
  )
}
