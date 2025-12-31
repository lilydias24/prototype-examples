import { Header } from "@/components/header"
import { ProofEditor } from "@/components/proof-editor"

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProofEditor />
      </main>
    </div>
  )
}
