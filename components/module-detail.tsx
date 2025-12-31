"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  PlayCircle,
  Lock,
  ArrowLeft,
  Clock,
  Trophy,
  BookOpen,
  FileText,
  Code,
  ChevronRight,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const moduleData = {
  id: 3,
  title: "Regras de Introdução",
  description:
    "Aprenda como introduzir conectivos em provas formais. Este módulo cobre todas as regras de introdução da dedução natural.",
  totalLessons: 8,
  completedLessons: 5,
  xp: 800,
  duration: "4h",
  lessons: [
    {
      id: 1,
      title: "Introdução da Conjunção (∧-Intro)",
      type: "theory",
      duration: "15min",
      xp: 50,
      status: "completed",
      description: "Aprenda a combinar duas proposições em uma conjunção.",
    },
    {
      id: 2,
      title: "Praticando ∧-Intro",
      type: "practice",
      duration: "20min",
      xp: 75,
      status: "completed",
      description: "Exercícios práticos de introdução da conjunção.",
    },
    {
      id: 3,
      title: "Introdução da Disjunção (∨-Intro)",
      type: "theory",
      duration: "15min",
      xp: 50,
      status: "completed",
      description: "Aprenda a introduzir uma disjunção a partir de uma proposição.",
    },
    {
      id: 4,
      title: "Praticando ∨-Intro",
      type: "practice",
      duration: "20min",
      xp: 75,
      status: "completed",
      description: "Exercícios práticos de introdução da disjunção.",
    },
    {
      id: 5,
      title: "Introdução do Condicional (→-Intro)",
      type: "theory",
      duration: "25min",
      xp: 100,
      status: "completed",
      description: "A regra mais importante: prova condicional com sub-provas.",
    },
    {
      id: 6,
      title: "Praticando →-Intro",
      type: "practice",
      duration: "30min",
      xp: 100,
      status: "current",
      description: "Exercícios de prova condicional com dificuldade progressiva.",
    },
    {
      id: 7,
      title: "Introdução da Negação (¬-Intro / RAA)",
      type: "theory",
      duration: "30min",
      xp: 125,
      status: "locked",
      description: "Aprenda a técnica de redução ao absurdo.",
    },
    {
      id: 8,
      title: "Desafio: Provas Combinadas",
      type: "challenge",
      duration: "45min",
      xp: 225,
      status: "locked",
      description: "Combine todas as regras de introdução em provas complexas.",
    },
  ],
}

const getLessonIcon = (type: string) => {
  switch (type) {
    case "theory":
      return BookOpen
    case "practice":
      return Code
    case "challenge":
      return Trophy
    default:
      return FileText
  }
}

const getLessonTypeLabel = (type: string) => {
  switch (type) {
    case "theory":
      return "Teoria"
    case "practice":
      return "Prática"
    case "challenge":
      return "Desafio"
    default:
      return "Lição"
  }
}

export function ModuleDetail({ moduleId }: { moduleId: string }) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(6)

  const progress = (moduleData.completedLessons / moduleData.totalLessons) * 100

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div>
        <Link href="/trilha">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Trilha
          </Button>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">Módulo {moduleId}</Badge>
              <Badge className="bg-primary/10 text-primary">Em Andamento</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{moduleData.title}</h1>
            <p className="text-muted-foreground max-w-2xl">{moduleData.description}</p>
          </div>

          <Card className="lg:min-w-[280px]">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progresso</span>
                    <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{moduleData.completedLessons}</p>
                    <p className="text-xs text-muted-foreground">Concluídas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{moduleData.duration}</p>
                    <p className="text-xs text-muted-foreground">Duração</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{moduleData.xp}</p>
                    <p className="text-xs text-muted-foreground">XP Total</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lessons List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xl font-semibold text-foreground mb-4">Lições do Módulo</h2>
          {moduleData.lessons.map((lesson, index) => {
            const Icon = getLessonIcon(lesson.type)
            return (
              <div
                key={lesson.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                  lesson.status === "completed" && "bg-accent/5 border-accent/20 hover:border-accent/40",
                  lesson.status === "current" && "bg-primary/5 border-primary ring-2 ring-primary/20",
                  lesson.status === "locked" && "bg-muted/30 border-border opacity-60 cursor-not-allowed",
                  selectedLesson === lesson.id && lesson.status !== "locked" && "ring-2 ring-primary/30",
                )}
                onClick={() => lesson.status !== "locked" && setSelectedLesson(lesson.id)}
              >
                {/* Lesson Number */}
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full shrink-0 text-sm font-bold",
                    lesson.status === "completed" && "bg-accent text-accent-foreground",
                    lesson.status === "current" && "bg-primary text-primary-foreground",
                    lesson.status === "locked" && "bg-muted text-muted-foreground",
                  )}
                >
                  {lesson.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : lesson.status === "locked" ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        lesson.type === "theory" && "bg-chart-4/10 text-chart-4 border-chart-4/30",
                        lesson.type === "practice" && "bg-primary/10 text-primary border-primary/30",
                        lesson.type === "challenge" && "bg-chart-3/10 text-chart-3 border-chart-3/30",
                      )}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {getLessonTypeLabel(lesson.type)}
                    </Badge>
                    {lesson.status === "current" && (
                      <Badge className="bg-primary text-primary-foreground text-xs">Próxima</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1 text-accent">
                      <Star className="h-3.5 w-3.5" />+{lesson.xp} XP
                    </span>
                  </div>
                </div>

                {lesson.status !== "locked" && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
              </div>
            )
          })}
        </div>

        {/* Lesson Preview */}
        <div className="lg:col-span-1">
          {selectedLesson && (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Prévia da Lição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const lesson = moduleData.lessons.find((l) => l.id === selectedLesson)
                  if (!lesson) return null
                  const Icon = getLessonIcon(lesson.type)
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-xl",
                            lesson.type === "theory" && "bg-chart-4/10 text-chart-4",
                            lesson.type === "practice" && "bg-primary/10 text-primary",
                            lesson.type === "challenge" && "bg-chart-3/10 text-chart-3",
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">{getLessonTypeLabel(lesson.type)}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{lesson.description}</p>

                      <div className="flex items-center justify-between py-3 border-y border-border">
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{lesson.duration}</p>
                          <p className="text-xs text-muted-foreground">Duração</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-accent">+{lesson.xp}</p>
                          <p className="text-xs text-muted-foreground">XP</p>
                        </div>
                      </div>

                      {lesson.type === "theory" && (
                        <div className="p-3 rounded-lg bg-chart-4/5 border border-chart-4/20">
                          <h4 className="text-sm font-medium text-chart-4 mb-1">O que você vai aprender</h4>
                          <p className="text-xs text-muted-foreground">
                            Conceitos teóricos com exemplos visuais e explicações passo a passo da IA.
                          </p>
                        </div>
                      )}

                      {lesson.type === "practice" && (
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <h4 className="text-sm font-medium text-primary mb-1">Exercícios Interativos</h4>
                          <p className="text-xs text-muted-foreground">
                            Pratique com feedback em tempo real e análise de erros pela IA pedagógica.
                          </p>
                        </div>
                      )}

                      {lesson.type === "challenge" && (
                        <div className="p-3 rounded-lg bg-chart-3/5 border border-chart-3/20">
                          <h4 className="text-sm font-medium text-chart-3 mb-1">Desafio Especial</h4>
                          <p className="text-xs text-muted-foreground">
                            Teste suas habilidades com provas complexas e ganhe bônus de XP!
                          </p>
                        </div>
                      )}

                      <Link href={`/licao/${lesson.id}`} className="block">
                        <Button className="w-full" size="lg">
                          {lesson.status === "completed" ? "Revisar Lição" : "Começar Lição"}
                          <PlayCircle className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
