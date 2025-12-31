import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, BookOpen, Sparkles, History } from "lucide-react"

const actions = [
  {
    title: "Continuar Prática",
    description: "Retome de onde parou",
    icon: Play,
    href: "/practice",
    variant: "default" as const,
  },
  {
    title: "Nova Lição",
    description: "Introdução à Implicação",
    icon: BookOpen,
    href: "/lessons/implication",
    variant: "secondary" as const,
  },
  {
    title: "Desafio do Dia",
    description: "Ganhe bônus de XP",
    icon: Sparkles,
    href: "/practice?challenge=true",
    variant: "secondary" as const,
  },
  {
    title: "Revisar Erros",
    description: "3 erros recentes",
    icon: History,
    href: "/review",
    variant: "secondary" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button variant={action.variant} className="w-full justify-start h-auto py-3 px-4">
              <action.icon className="h-5 w-5 mr-3 shrink-0" />
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className="text-xs opacity-70">{action.description}</p>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
