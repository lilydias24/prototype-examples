"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, CheckCircle2, Clock, Star, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const lessons = [
  {
    id: 1,
    title: "Introdução à Lógica Proposicional",
    description: "Aprenda os conceitos básicos de proposições e valores de verdade",
    duration: "15 min",
    xp: 100,
    status: "completed",
    progress: 100,
  },
  {
    id: 2,
    title: "Conectivos Lógicos: E (∧)",
    description: "Entenda a conjunção e como ela funciona em provas",
    duration: "20 min",
    xp: 150,
    status: "completed",
    progress: 100,
  },
  {
    id: 3,
    title: "Conectivos Lógicos: OU (∨)",
    description: "Explore a disjunção e suas regras de inferência",
    duration: "20 min",
    xp: 150,
    status: "completed",
    progress: 100,
  },
  {
    id: 4,
    title: "Introdução à Implicação (→)",
    description: "Domine o conectivo mais importante da lógica formal",
    duration: "25 min",
    xp: 200,
    status: "in-progress",
    progress: 40,
  },
  {
    id: 5,
    title: "Modus Ponens na Prática",
    description: "Aplique a regra de eliminação da implicação em exercícios",
    duration: "30 min",
    xp: 250,
    status: "locked",
    progress: 0,
  },
  {
    id: 6,
    title: "Sub-provas e Hipóteses",
    description: "Aprenda a criar provas aninhadas e trabalhar com suposições",
    duration: "35 min",
    xp: 300,
    status: "locked",
    progress: 0,
  },
]

export function LessonsList() {
  return (
    <div className="grid gap-4">
      {lessons.map((lesson, index) => (
        <Card key={lesson.id} className={cn("transition-all", lesson.status === "locked" && "opacity-60")}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-xl shrink-0",
                  lesson.status === "completed" && "bg-accent text-accent-foreground",
                  lesson.status === "in-progress" && "bg-primary text-primary-foreground",
                  lesson.status === "locked" && "bg-muted text-muted-foreground",
                )}
              >
                {lesson.status === "completed" ? (
                  <CheckCircle2 className="h-7 w-7" />
                ) : lesson.status === "in-progress" ? (
                  <PlayCircle className="h-7 w-7" />
                ) : (
                  <BookOpen className="h-6 w-6" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-muted-foreground">Lição {index + 1}</span>
                  {lesson.status === "in-progress" && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Em Andamento</Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-accent">
                    <Star className="h-4 w-4" />+{lesson.xp} XP
                  </div>
                  {lesson.status !== "locked" && (
                    <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                      <Progress value={lesson.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{lesson.progress}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <Link href={lesson.status !== "locked" ? `/lessons/${lesson.id}` : "#"}>
                  <Button
                    variant={lesson.status === "in-progress" ? "default" : "secondary"}
                    disabled={lesson.status === "locked"}
                  >
                    {lesson.status === "completed"
                      ? "Revisar"
                      : lesson.status === "in-progress"
                        ? "Continuar"
                        : "Bloqueado"}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
