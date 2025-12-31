import { Header } from "@/components/header"
import { LearningPath } from "@/components/learning-path"
import { StatsOverview } from "@/components/stats-overview"
import { QuickActions } from "@/components/quick-actions"
import { RecentActivity } from "@/components/recent-activity"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo ao LogicMind</h1>
          <p className="text-muted-foreground">Domine a dedução natural com assistência de IA e gamificação</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <StatsOverview />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LearningPath />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
