import { Header } from "@/components/header"
import { ErrorReviewDashboard } from "@/components/error-review-dashboard"

export default function RevisaoErrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ErrorReviewDashboard />
      </main>
    </div>
  )
}
