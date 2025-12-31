import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Flame, CheckCircle2, Clock } from "lucide-react"

const stats = [
  {
    title: "Provas Completas",
    value: "47",
    change: "+5 esta semana",
    icon: CheckCircle2,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Sequência Atual",
    value: "12 dias",
    change: "Recorde: 18 dias",
    icon: Flame,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Precisão",
    value: "87%",
    change: "+3% vs mês passado",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Tempo Médio",
    value: "4:32",
    change: "Por prova",
    icon: Clock,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function StatsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seu Progresso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.title} className="space-y-2">
              <div className={`inline-flex p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-accent">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso Semanal</span>
            <span className="font-medium text-foreground">7/10 exercícios</span>
          </div>
          <Progress value={70} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
