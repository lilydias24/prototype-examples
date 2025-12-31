import { Header } from "@/components/header"
import { AchievementsGrid } from "@/components/achievements-grid"

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Conquistas</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso e desbloqueie recompensas</p>
        </div>
        <AchievementsGrid />
      </main>
    </div>
  )
}
