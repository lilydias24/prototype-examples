import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    type: "success",
    title: "Prova concluída",
    description: "Modus Ponens - Exercício 3",
    time: "Há 2 horas",
    xp: "+50 XP",
  },
  {
    type: "error",
    title: "Erro identificado",
    description: "Aplicação incorreta de ∧I",
    time: "Há 3 horas",
    xp: null,
  },
  {
    type: "achievement",
    title: "Conquista desbloqueada!",
    description: "Primeira prova sem erros",
    time: "Há 5 horas",
    xp: "+100 XP",
  },
  {
    type: "progress",
    title: "Lição iniciada",
    description: "Introdução à Implicação",
    time: "Ontem",
    xp: null,
  },
]

const activityConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  error: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  achievement: {
    icon: Trophy,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  progress: {
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const config = activityConfig[activity.type as keyof typeof activityConfig]
            const Icon = config.icon

            return (
              <div key={index} className="flex gap-3">
                <div className={cn("p-2 rounded-lg h-fit shrink-0", config.bgColor)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    {activity.xp && <span className="text-xs text-accent font-medium">{activity.xp}</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
