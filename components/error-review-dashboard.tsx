"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Brain,
  Lightbulb,
  RefreshCw,
  ChevronRight,
  Target,
  BarChart3,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const errorStats = {
  totalErrors: 47,
  resolvedErrors: 32,
  pendingErrors: 15,
  improvementRate: 68,
  commonMistakes: [
    { rule: "→-Intro", count: 12, resolved: 8 },
    { rule: "∨-Elim", count: 9, resolved: 7 },
    { rule: "¬-Intro", count: 8, resolved: 5 },
    { rule: "∧-Elim", count: 6, resolved: 4 },
    { rule: "MP", count: 5, resolved: 3 },
  ],
}

const errorHistory = [
  {
    id: 1,
    date: "Hoje",
    exercise: "Prova: P → (Q → R) ⊢ Q → (P → R)",
    errorType: "Escopo incorreto",
    rule: "→-Intro",
    status: "pending",
    severity: "high",
    aiAnalysis: {
      problem: "Você fechou a sub-prova antes de derivar a conclusão necessária.",
      concept:
        "Ao usar →-Intro, a sub-prova deve conter tanto a hipótese quanto a conclusão desejada antes de ser fechada.",
      suggestion: "Mantenha a sub-prova aberta até derivar R, e só então feche para obter Q → R.",
      relatedLessons: ["Introdução do Condicional", "Sub-provas e Escopo"],
    },
  },
  {
    id: 2,
    date: "Hoje",
    exercise: "Prova: (P ∨ Q) ∧ ¬P ⊢ Q",
    errorType: "Premissa fora do escopo",
    rule: "∨-Elim",
    status: "pending",
    severity: "medium",
    aiAnalysis: {
      problem: "Você tentou usar uma linha que está fora do escopo atual da sub-prova.",
      concept: "Linhas de sub-provas anteriores não podem ser referenciadas após a sub-prova ser fechada.",
      suggestion: "Derive Q dentro de cada sub-prova de ∨-Elim antes de fechá-las.",
      relatedLessons: ["Eliminação da Disjunção", "Regras de Escopo"],
    },
  },
  {
    id: 3,
    date: "Ontem",
    exercise: "Prova: P → Q, Q → R ⊢ P → R",
    errorType: "Aplicação correta",
    rule: "→-Intro",
    status: "resolved",
    severity: "none",
    aiAnalysis: {
      problem: "Nenhum erro - você aplicou a regra corretamente!",
      concept: "Excelente uso de prova condicional com encadeamento de MP.",
      suggestion: "Continue praticando para consolidar este padrão.",
      relatedLessons: [],
    },
  },
  {
    id: 4,
    date: "Ontem",
    exercise: "Prova: ¬(P ∧ Q) ⊢ ¬P ∨ ¬Q",
    errorType: "RAA incompleto",
    rule: "¬-Intro",
    status: "resolved",
    severity: "high",
    aiAnalysis: {
      problem: "A contradição derivada não foi explicitamente mostrada na prova.",
      concept: "RAA requer que você derive uma contradição explícita (φ ∧ ¬φ) dentro da sub-prova.",
      suggestion: "Após assumir a negação, trabalhe até derivar P ∧ ¬P ou Q ∧ ¬Q explicitamente.",
      relatedLessons: ["Redução ao Absurdo", "Provas por Contradição"],
    },
  },
  {
    id: 5,
    date: "2 dias atrás",
    exercise: "Prova: P ∧ Q ⊢ Q ∧ P",
    errorType: "Ordem das premissas",
    rule: "∧-Intro",
    status: "resolved",
    severity: "low",
    aiAnalysis: {
      problem: "Você usou as premissas na ordem errada para ∧-Intro.",
      concept: "∧-Intro combina duas proposições na ordem especificada: primeiro o lado esquerdo, depois o direito.",
      suggestion: "Para Q ∧ P, primeiro extraia Q (∧-Elim direito), depois P (∧-Elim esquerdo).",
      relatedLessons: ["Introdução da Conjunção"],
    },
  },
]

const weeklyProgress = [
  { day: "Seg", errors: 8, resolved: 5 },
  { day: "Ter", errors: 6, resolved: 4 },
  { day: "Qua", errors: 10, resolved: 8 },
  { day: "Qui", errors: 5, resolved: 4 },
  { day: "Sex", errors: 7, resolved: 5 },
  { day: "Sáb", errors: 4, resolved: 3 },
  { day: "Dom", errors: 7, resolved: 3 },
]

export function ErrorReviewDashboard() {
  const [selectedError, setSelectedError] = useState<number | null>(1)
  const [activeTab, setActiveTab] = useState("pendentes")

  const filteredErrors = errorHistory.filter((error) =>
    activeTab === "pendentes" ? error.status === "pending" : error.status === "resolved",
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Revisão de Erros</h1>
          <p className="text-muted-foreground">
            Analise seus erros com ajuda da IA e melhore seu desempenho em dedução natural.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar Análise
          </Button>
          <Link href="/practice">
            <Button>
              Praticar Agora
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{errorStats.pendingErrors}</p>
                <p className="text-sm text-muted-foreground">Erros Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{errorStats.resolvedErrors}</p>
                <p className="text-sm text-muted-foreground">Erros Resolvidos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{errorStats.improvementRate}%</p>
                <p className="text-sm text-muted-foreground">Taxa de Melhoria</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10 text-chart-3">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">→-Intro</p>
                <p className="text-sm text-muted-foreground">Foco Recomendado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Error List */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="pendentes" className="gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Pendentes ({errorStats.pendingErrors})
                </TabsTrigger>
                <TabsTrigger value="resolvidos" className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Resolvidos ({errorStats.resolvedErrors})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pendentes" className="space-y-3 mt-0">
              {filteredErrors.map((error) => (
                <ErrorCard
                  key={error.id}
                  error={error}
                  isSelected={selectedError === error.id}
                  onSelect={() => setSelectedError(error.id)}
                />
              ))}
            </TabsContent>

            <TabsContent value="resolvidos" className="space-y-3 mt-0">
              {filteredErrors.map((error) => (
                <ErrorCard
                  key={error.id}
                  error={error}
                  isSelected={selectedError === error.id}
                  onSelect={() => setSelectedError(error.id)}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* AI Analysis Panel */}
          {selectedError && (
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">Análise da IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const error = errorHistory.find((e) => e.id === selectedError)
                  if (!error) return null
                  return (
                    <>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-destructive">Problema Identificado</p>
                              <p className="text-sm text-muted-foreground mt-1">{error.aiAnalysis.problem}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <div className="flex items-start gap-2">
                            <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-primary">Conceito Importante</p>
                              <p className="text-sm text-muted-foreground mt-1">{error.aiAnalysis.concept}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-accent">Sugestão</p>
                              <p className="text-sm text-muted-foreground mt-1">{error.aiAnalysis.suggestion}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {error.aiAnalysis.relatedLessons.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Lições Relacionadas</p>
                          <div className="flex flex-wrap gap-2">
                            {error.aiAnalysis.relatedLessons.map((lesson) => (
                              <Badge key={lesson} variant="outline" className="cursor-pointer hover:bg-secondary">
                                {lesson}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {error.status === "pending" && (
                        <Button className="w-full" size="sm">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Praticar Este Conceito
                        </Button>
                      )}
                    </>
                  )
                })()}
              </CardContent>
            </Card>
          )}

          {/* Common Mistakes */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Erros Mais Comuns</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {errorStats.commonMistakes.map((mistake) => (
                <div key={mistake.rule} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{mistake.rule}</span>
                    <span className="text-muted-foreground">
                      {mistake.resolved}/{mistake.count}
                    </span>
                  </div>
                  <Progress value={(mistake.resolved / mistake.count) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Progresso Semanal</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-24">
                {weeklyProgress.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-0.5">
                      <div className="w-full bg-accent rounded-t" style={{ height: `${(day.resolved / 10) * 60}px` }} />
                      <div
                        className="w-full bg-destructive/30 rounded-b"
                        style={{ height: `${((day.errors - day.resolved) / 10) * 60}px` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded bg-accent" />
                  <span className="text-muted-foreground">Resolvidos</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded bg-destructive/30" />
                  <span className="text-muted-foreground">Pendentes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ErrorCard({
  error,
  isSelected,
  onSelect,
}: {
  error: (typeof errorHistory)[0]
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-primary/30",
        isSelected && "ring-2 ring-primary/20 border-primary/30",
        error.status === "resolved" && "opacity-75",
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
              error.status === "pending" && error.severity === "high" && "bg-destructive/10 text-destructive",
              error.status === "pending" && error.severity === "medium" && "bg-warning/10 text-warning",
              error.status === "pending" && error.severity === "low" && "bg-chart-4/10 text-chart-4",
              error.status === "resolved" && "bg-accent/10 text-accent",
            )}
          >
            {error.status === "resolved" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {error.rule}
              </Badge>
              <span className="text-xs text-muted-foreground">{error.date}</span>
            </div>
            <p className="font-medium text-foreground text-sm mb-1 truncate">{error.exercise}</p>
            <p className="text-sm text-muted-foreground">{error.errorType}</p>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>
      </CardContent>
    </Card>
  )
}
