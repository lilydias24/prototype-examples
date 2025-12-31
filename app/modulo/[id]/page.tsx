import { Header } from "@/components/header"
import { ModuleDetail } from "@/components/module-detail"

export default function ModuloPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ModuleDetail moduleId={params.id} />
      </main>
    </div>
  )
}
