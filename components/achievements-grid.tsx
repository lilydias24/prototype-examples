"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Target, Zap, BookOpen, Star, Award, Crown, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const achievements = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Complete sua primeira prova",
    icon: Trophy,
    xp: 50,
    unlocked: true,
    date: "15 Jan 2025",
  },
  {
    id: 2,
    title: "Sem Erros",
    description: "Complete uma prova sem cometer erros",
    icon: Target,
    xp: 100,
    unlocked: true,
    date: "18 Jan 2025",
  },
  {
    id: 3,
    title: "Sequência de 7 Dias",
    description: "Pratique por 7 dias consecutivos",
    icon: Flame,
    xp: 150,
    unlocked: true,
    date: "22 Jan 2025",
  },
  {
    id: 4,
    title: "Mestre do Modus Ponens",
    description: "Use →E corretamente 25 vezes",
    icon: Zap,
    xp: 200,
    progress: 18,
    total: 25,
    unlocked: false,
  },
  {
    id: 5,
    title: "Estudante Dedicado",
    description: "Complete todas as lições básicas",
    icon: BookOpen,
    xp: 300,
    progress: 3,
    total: 5,
    unlocked: false,
  },
  {
    id: 6,
    title: "Perfeccionista",
    description: "Complete 10 provas sem erros",
    icon: Star,
    xp: 500,
    progress: 4,
    total: 10,
    unlocked: false,
  },
  {
    id: 7,
    title: "Lógico Avançado",
    description: "Complete o módulo de provas avançadas",
    icon: Award,
    xp: 750,
    progress: 0,
    total: 1,
    unlocked: false,
  },
  {
    id: 8,
    title: "Mestre da Dedução",
    description: "Complete todos os desafios do app",
    icon: Crown,
    xp: 1000,
    progress: 0,
    total: 1,
    unlocked: false,
  },
]

export function AchievementsGrid() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalXP = achievements.filter((a) => a.unlocked).reduce((acc, a) => acc + a.xp, 0)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{unlockedCount}</p>
              <p className="text-sm text-muted-foreground">Desbloqueadas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{achievements.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">{totalXP}</p>
              <p className="text-sm text-muted-foreground">XP Ganho</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Progresso</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon
          const hasProgress = !achievement.unlocked && achievement.progress !== undefined

          return (
            <Card
              key={achievement.id}
              className={cn("transition-all", achievement.unlocked ? "border-accent/30 bg-accent/5" : "opacity-75")}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl shrink-0",
                      achievement.unlocked ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {achievement.unlocked ? <Icon className="h-7 w-7" /> : <Lock className="h-6 w-6" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>

                    {achievement.unlocked ? (
                      <div className="flex items-center justify-between">
                        <Badge className="bg-accent/20 text-accent">+{achievement.xp} XP</Badge>
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                      </div>
                    ) : hasProgress ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {achievement.progress}/{achievement.total}
                          </span>
                          <span className="text-accent">+{achievement.xp} XP</span>
                        </div>
                        <Progress value={(achievement.progress! / achievement.total!) * 100} className="h-2" />
                      </div>
                    ) : (
                      <Badge variant="secondary">+{achievement.xp} XP</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
