"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  Star,
  Trophy,
  Flame,
  Target,
  BookOpen,
  ChevronRight,
  Clock,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const modules = [
  {
    id: 1,
    title: "Fundamentos da Lógica Proposicional",
    description: "Aprenda os conceitos básicos de proposições, valores de verdade e tabelas-verdade.",
    lessons: 5,
    completed: 5,
    status: "completed",
    xp: 500,
    duration: "2h 30min",
    topics: ["Proposições", "Valores de Verdade", "Tabelas-Verdade", "Tautologias", "Contradições"],
  },
  {
    id: 2,
    title: "Conectivos Lógicos",
    description: "Domine os conectivos AND, OR, NOT, implicação e bi-implicação.",
    lessons: 6,
    completed: 6,
    status: "completed",
    xp: 600,
    duration: "3h",
    topics: ["Conjunção (∧)", "Disjunção (∨)", "Negação (¬)", "Implicação (→)", "Bi-implicação (↔)", "Precedência"],
  },
  {
    id: 3,
    title: "Regras de Introdução",
    description: "Aprenda como introduzir conectivos em provas formais.",
    lessons: 8,
    completed: 5,
    status: "in-progress",
    xp: 800,
    duration: "4h",
    topics: ["∧-Intro", "∨-Intro", "→-Intro", "↔-Intro", "¬-Intro", "RAA", "Exercícios", "Desafios"],
  },
  {
    id: 4,
    title: "Regras de Eliminação",
    description: "Aprenda como eliminar conectivos para extrair informações das premissas.",
    lessons: 8,
    completed: 0,
    status: "locked",
    xp: 800,
    duration: "4h",
    topics: ["∧-Elim", "∨-Elim", "→-Elim (MP)", "↔-Elim", "¬-Elim (DN)", "Reit", "Exercícios", "Desafios"],
  },
  {
    id: 5,
    title: "Sub-provas e Hipóteses",
    description: "Domine o uso de sub-provas e hipóteses temporárias em deduções.",
    lessons: 6,
    completed: 0,
    status: "locked",
    xp: 600,
    duration: "3h",
    topics: [
      "Escopo de Hipóteses",
      "Prova Condicional",
      "Prova por Contradição",
      "Aninhamento",
      "Estratégias",
      "Desafios",
    ],
  },
  {
    id: 6,
    title: "Provas Avançadas",
    description: "Combine todas as técnicas em provas complexas e desafiadoras.",
    lessons: 10,
    completed: 0,
    status: "locked",
    xp: 1000,
    duration: "5h",
    topics: ["Provas Longas", "Equivalências", "Teoremas Importantes", "Otimização", "Competição"],
  },
]

const userStats = {
  totalXP: 1250,
  level: 7,
  streak: 12,
  modulesCompleted: 2,
  totalModules: 6,
  lessonsCompleted: 16,
  totalLessons: 43,
}

export function LearningPathDetailed() {
  const [expandedModule, setExpandedModule] = useState<number | null>(3)

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Trilha de Aprendizado</h1>
          <p className="text-muted-foreground">Domine a dedução natural passo a passo, do básico ao avançado.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-chart-3/10 text-chart-3">
            <Flame className="h-5 w-5" />
            <span className="font-semibold">{userStats.streak} dias</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">{userStats.totalXP} XP</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span className="text-sm">Nível Atual</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{userStats.level}</p>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">750 XP para o nível 8</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="text-sm">Módulos</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {userStats.modulesCompleted}/{userStats.totalModules}
              </p>
              <Progress value={(userStats.modulesCompleted / userStats.totalModules) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">33% concluído</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">Lições</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {userStats.lessonsCompleted}/{userStats.totalLessons}
              </p>
              <Progress value={(userStats.lessonsCompleted / userStats.totalLessons) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">37% concluído</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span className="text-sm">Próxima Meta</span>
              </div>
              <p className="text-lg font-semibold text-foreground">Completar Regras de Introdução</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  +800 XP
                </Badge>
                <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                  Conquista
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <Card
            key={module.id}
            className={cn(
              "overflow-hidden transition-all",
              module.status === "locked" && "opacity-60",
              expandedModule === module.id && "ring-2 ring-primary/20",
            )}
          >
            <div
              className={cn("p-6 cursor-pointer", module.status !== "locked" && "hover:bg-secondary/50")}
              onClick={() =>
                module.status !== "locked" && setExpandedModule(expandedModule === module.id ? null : module.id)
              }
            >
              <div className="flex items-start gap-4">
                {/* Module Icon */}
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-xl shrink-0",
                    module.status === "completed" && "bg-accent text-accent-foreground",
                    module.status === "in-progress" && "bg-primary text-primary-foreground",
                    module.status === "locked" && "bg-muted text-muted-foreground",
                  )}
                >
                  {module.status === "completed" ? (
                    <CheckCircle2 className="h-7 w-7" />
                  ) : module.status === "in-progress" ? (
                    <PlayCircle className="h-7 w-7" />
                  ) : (
                    <Lock className="h-6 w-6" />
                  )}
                </div>

                {/* Module Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-muted-foreground font-medium">Módulo {index + 1}</span>
                    {module.status === "completed" && (
                      <Badge className="bg-accent/10 text-accent hover:bg-accent/20">Concluído</Badge>
                    )}
                    {module.status === "in-progress" && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Em Andamento</Badge>
                    )}
                    {module.status === "locked" && (
                      <Badge variant="outline" className="text-muted-foreground">
                        Bloqueado
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{module.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{module.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{module.lessons} lições</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-accent">
                      <Trophy className="h-4 w-4" />
                      <span className="font-medium">+{module.xp} XP</span>
                    </div>
                  </div>
                </div>

                {/* Progress and Arrow */}
                <div className="flex items-center gap-4">
                  {module.status !== "locked" && (
                    <div className="text-right hidden sm:block">
                      <p className="text-2xl font-bold text-foreground">
                        {Math.round((module.completed / module.lessons) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {module.completed}/{module.lessons} lições
                      </p>
                    </div>
                  )}
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      expandedModule === module.id && "rotate-90",
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedModule === module.id && module.status !== "locked" && (
              <div className="border-t border-border bg-secondary/30 p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-3">Tópicos do Módulo</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, i) => (
                      <Badge
                        key={topic}
                        variant="outline"
                        className={cn(
                          "text-sm",
                          i < module.completed
                            ? "bg-accent/10 text-accent border-accent/30"
                            : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {i < module.completed && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/modulo/${module.id}`}>
                    <Button>
                      {module.status === "completed" ? "Revisar Módulo" : "Continuar"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  {module.status === "in-progress" && (
                    <p className="text-sm text-muted-foreground">
                      Próxima lição:{" "}
                      <span className="font-medium text-foreground">{module.topics[module.completed]}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
