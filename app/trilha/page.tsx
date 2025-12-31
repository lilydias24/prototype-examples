import { Header } from "@/components/header"
import { LearningPathDetailed } from "@/components/learning-path-detailed"

export default function TrilhaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LearningPathDetailed />
      </main>
    </div>
  )
}
