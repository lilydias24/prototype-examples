"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Lock, PlayCircle, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const modules = [
  {
    id: 1,
    title: "Fundamentos da Lógica Proposicional",
    lessons: 5,
    completed: 5,
    status: "completed",
    xp: 500,
  },
  {
    id: 2,
    title: "Conectivos Lógicos",
    lessons: 6,
    completed: 6,
    status: "completed",
    xp: 600,
  },
  {
    id: 3,
    title: "Regras de Introdução",
    lessons: 8,
    completed: 5,
    status: "in-progress",
    xp: 800,
  },
  {
    id: 4,
    title: "Regras de Eliminação",
    lessons: 8,
    completed: 0,
    status: "locked",
    xp: 800,
  },
  {
    id: 5,
    title: "Sub-provas e Hipóteses",
    lessons: 6,
    completed: 0,
    status: "locked",
    xp: 600,
  },
  {
    id: 6,
    title: "Provas Avançadas",
    lessons: 10,
    completed: 0,
    status: "locked",
    xp: 1000,
  },
]

export function LearningPath() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Trilha de Aprendizado</CardTitle>
          <Badge variant="outline" className="gap-1">
            <Star className="h-3 w-3 fill-chart-3 text-chart-3" />
            Nível 7
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {modules.map((module, index) => (
            <Link
              key={module.id}
              href={module.status !== "locked" ? `/lessons/${module.id}` : "#"}
              className={cn("block", module.status === "locked" && "pointer-events-none")}
            >
              <div
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all",
                  module.status === "completed" && "bg-accent/5 border-accent/20 hover:border-accent/40",
                  module.status === "in-progress" && "bg-primary/5 border-primary/20 hover:border-primary/40",
                  module.status === "locked" && "bg-muted/50 border-border opacity-60",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl shrink-0",
                    module.status === "completed" && "bg-accent text-accent-foreground",
                    module.status === "in-progress" && "bg-primary text-primary-foreground",
                    module.status === "locked" && "bg-muted text-muted-foreground",
                  )}
                >
                  {module.status === "completed" ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : module.status === "in-progress" ? (
                    <PlayCircle className="h-6 w-6" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">Módulo {index + 1}</span>
                    {module.status === "in-progress" && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">Em Andamento</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground truncate">{module.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {module.completed}/{module.lessons} lições
                    </span>
                    <span className="text-xs text-accent font-medium">+{module.xp} XP</span>
                  </div>
                </div>

                {module.status !== "locked" && (
                  <div className="hidden sm:block">
                    <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          module.status === "completed" ? "bg-accent" : "bg-primary",
                        )}
                        style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
