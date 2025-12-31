"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  Lightbulb,
  Play,
  Star,
  Trophy,
  Brain,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const lessonData = {
  id: 6,
  moduleId: 3,
  title: "Praticando →-Intro",
  type: "practice",
  duration: "30min",
  xp: 100,
  progress: 40,
  totalSteps: 5,
  currentStep: 2,
  theory: {
    title: "Regra de Introdução do Condicional (→-Intro)",
    content: `A regra →-Intro permite derivar uma implicação P → Q abrindo uma sub-prova:

1. Assuma P como hipótese temporária
2. Derive Q dentro da sub-prova
3. Feche a sub-prova para obter P → Q

Esta é uma das regras mais poderosas da dedução natural, pois permite "provar" condicionais assumindo temporariamente o antecedente.`,
    example: {
      premises: ["P ∧ Q"],
      conclusion: "P → (P ∧ Q)",
      steps: [
        { line: 1, formula: "P ∧ Q", justification: "Premissa", depth: 0 },
        { line: 2, formula: "P", justification: "Hipótese", depth: 1, isHypothesis: true },
        { line: 3, formula: "P ∧ Q", justification: "Reit: 1", depth: 1 },
        { line: 4, formula: "P → (P ∧ Q)", justification: "→-Intro: 2-3", depth: 0 },
      ],
    },
  },
  exercises: [
    {
      id: 1,
      premises: ["P"],
      conclusion: "Q → P",
      difficulty: "fácil",
      completed: true,
      xp: 15,
    },
    {
      id: 2,
      premises: ["P → Q", "Q → R"],
      conclusion: "P → R",
      difficulty: "médio",
      completed: false,
      xp: 25,
      current: true,
    },
    {
      id: 3,
      premises: ["P → (Q → R)"],
      conclusion: "Q → (P → R)",
      difficulty: "médio",
      xp: 25,
      completed: false,
    },
    {
      id: 4,
      premises: ["(P ∧ Q) → R"],
      conclusion: "P → (Q → R)",
      difficulty: "difícil",
      xp: 35,
      completed: false,
    },
  ],
}

export function LessonView({ lessonId }: { lessonId: string }) {
  const [showTheory, setShowTheory] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(1)

  const exercise = lessonData.exercises.find((e) => e.id === currentExercise + 1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Link href={`/modulo/${lessonData.moduleId}`}>
            <Button variant="ghost" className="mb-2 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Módulo
            </Button>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">Módulo {lessonData.moduleId}</Badge>
            <Badge className="bg-primary/10 text-primary">Prática</Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{lessonData.title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{lessonData.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-accent">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">+{lessonData.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Exercício {currentExercise + 1} de {lessonData.exercises.length}
            </span>
            <span className="text-sm font-medium text-foreground">{lessonData.progress}%</span>
          </div>
          <Progress value={lessonData.progress} className="h-2" />
          <div className="flex gap-1 mt-3">
            {lessonData.exercises.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setCurrentExercise(i)}
                className={cn(
                  "flex-1 h-2 rounded-full transition-colors",
                  ex.completed && "bg-accent",
                  ex.current && !ex.completed && "bg-primary",
                  !ex.completed && !ex.current && "bg-secondary",
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Theory Toggle */}
          <div className="flex items-center gap-2">
            <Button variant={showTheory ? "default" : "outline"} size="sm" onClick={() => setShowTheory(true)}>
              <BookOpen className="h-4 w-4 mr-2" />
              Teoria
            </Button>
            <Button variant={!showTheory ? "default" : "outline"} size="sm" onClick={() => setShowTheory(false)}>
              <Play className="h-4 w-4 mr-2" />
              Exercício
            </Button>
          </div>

          {showTheory ? (
            /* Theory Card */
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {lessonData.theory.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground whitespace-pre-line">{lessonData.theory.content}</p>
                </div>

                {/* Example Proof */}
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <h4 className="font-semibold text-foreground mb-3">Exemplo</h4>
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground">
                      Premissas: {lessonData.theory.example.premises.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">Conclusão: {lessonData.theory.example.conclusion}</p>
                  </div>
                  <div className="space-y-1 font-mono text-sm">
                    {lessonData.theory.example.steps.map((step) => (
                      <div
                        key={step.line}
                        className={cn(
                          "flex items-center gap-4 p-2 rounded",
                          step.isHypothesis && "bg-primary/10 border-l-2 border-primary ml-4",
                          step.depth === 1 && !step.isHypothesis && "ml-4 border-l-2 border-primary/30",
                        )}
                      >
                        <span className="text-muted-foreground w-6">{step.line}.</span>
                        <span className="flex-1 text-foreground">{step.formula}</span>
                        <span className="text-muted-foreground text-xs">{step.justification}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setShowTheory(false)}>
                  Ir para Exercícios
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Exercise Card */
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Exercício {currentExercise + 1}</CardTitle>
                  <Badge
                    variant="outline"
                    className={cn(
                      exercise?.difficulty === "fácil" && "bg-accent/10 text-accent border-accent/30",
                      exercise?.difficulty === "médio" && "bg-primary/10 text-primary border-primary/30",
                      exercise?.difficulty === "difícil" && "bg-chart-3/10 text-chart-3 border-chart-3/30",
                    )}
                  >
                    {exercise?.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {exercise && (
                  <>
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Premissas:</p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.premises.map((p, i) => (
                            <Badge key={i} variant="outline" className="font-mono text-base py-1 px-3">
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">Prove:</p>
                        <p className="font-mono text-xl font-semibold text-foreground mt-1">{exercise.conclusion}</p>
                      </div>
                    </div>

                    {/* Proof Area Placeholder */}
                    <div className="min-h-[200px] p-4 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                      <div className="text-center">
                        <Brain className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                        <p className="text-muted-foreground">Clique abaixo para abrir o editor de provas</p>
                        <Link href="/practice">
                          <Button className="mt-4">
                            Abrir Editor de Provas
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Hint Section */}
                    {showHint && (
                      <div className="p-4 rounded-xl bg-chart-3/5 border border-chart-3/20">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-chart-3 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-chart-3 mb-1">Dica</p>
                            <p className="text-sm text-muted-foreground">
                              Comece assumindo P como hipótese. Dentro da sub-prova, use as duas premissas com MP para
                              chegar em R. Depois feche a sub-prova.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
                        <HelpCircle className="h-4 w-4 mr-2" />
                        {showHint ? "Esconder Dica" : "Ver Dica"} (-5 XP)
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          disabled={currentExercise === 0}
                          onClick={() => setCurrentExercise((c) => c - 1)}
                        >
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Anterior
                        </Button>
                        <Button
                          disabled={currentExercise === lessonData.exercises.length - 1}
                          onClick={() => setCurrentExercise((c) => c + 1)}
                        >
                          Próximo
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Exercise List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Exercícios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessonData.exercises.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setCurrentExercise(i)
                    setShowTheory(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                    currentExercise === i && "ring-2 ring-primary/20 border-primary/30 bg-primary/5",
                    currentExercise !== i && "hover:bg-secondary",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full shrink-0 text-sm font-medium",
                      ex.completed && "bg-accent text-accent-foreground",
                      !ex.completed && currentExercise === i && "bg-primary text-primary-foreground",
                      !ex.completed && currentExercise !== i && "bg-secondary text-muted-foreground",
                    )}
                  >
                    {ex.completed ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{ex.conclusion}</p>
                    <p className="text-xs text-muted-foreground">{ex.difficulty}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    +{ex.xp}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* XP Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-accent" />
                Recompensas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Exercícios</span>
                  <span className="text-sm font-medium text-foreground">
                    +{lessonData.exercises.reduce((acc, e) => acc + e.xp, 0)} XP
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bônus Sem Erros</span>
                  <span className="text-sm font-medium text-accent">+25 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bônus Velocidade</span>
                  <span className="text-sm font-medium text-chart-3">+15 XP</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Total Possível</span>
                    <span className="font-bold text-foreground">
                      +{lessonData.exercises.reduce((acc, e) => acc + e.xp, 0) + 40} XP
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
