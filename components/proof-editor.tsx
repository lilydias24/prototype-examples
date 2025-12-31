"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Lightbulb, RotateCcw, Check, AlertCircle, Plus, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { AIFeedback } from "@/components/ai-feedback"
import { ProofTree } from "@/components/proof-tree"
import { RulesPanel } from "@/components/rules-panel"

interface ProofLine {
  id: number
  content: string
  rule: string
  references: number[]
  isHypothesis: boolean
  depth: number
  isValid: boolean | null
  errorMessage?: string
}

const initialProblem = {
  premises: ["P → Q", "Q → R", "P"],
  conclusion: "R",
  hint: "Tente aplicar Modus Ponens (→E) duas vezes.",
}

const initialProof: ProofLine[] = [
  { id: 1, content: "P → Q", rule: "Premissa", references: [], isHypothesis: false, depth: 0, isValid: true },
  { id: 2, content: "Q → R", rule: "Premissa", references: [], isHypothesis: false, depth: 0, isValid: true },
  { id: 3, content: "P", rule: "Premissa", references: [], isHypothesis: false, depth: 0, isValid: true },
]

export function ProofEditor() {
  const [proof, setProof] = useState<ProofLine[]>(initialProof)
  const [selectedRule, setSelectedRule] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showAIFeedback, setShowAIFeedback] = useState(false)
  const [lastError, setLastError] = useState<ProofLine | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const addLine = (content: string, rule: string, references: number[]) => {
    const newLine: ProofLine = {
      id: proof.length + 1,
      content,
      rule,
      references,
      isHypothesis: false,
      depth: 0,
      isValid: null,
    }

    // Simulate validation
    const isValidMove = validateMove(newLine)
    newLine.isValid = isValidMove.valid
    newLine.errorMessage = isValidMove.message

    if (!isValidMove.valid) {
      setLastError(newLine)
      setShowAIFeedback(true)
    }

    setProof([...proof, newLine])

    // Check if proof is complete
    if (content === initialProblem.conclusion && isValidMove.valid) {
      setIsComplete(true)
    }
  }

  const validateMove = (line: ProofLine): { valid: boolean; message?: string } => {
    // Simple validation simulation
    if (line.rule === "→E" && line.content === "Q" && line.references.includes(1) && line.references.includes(3)) {
      return { valid: true }
    }
    if (line.rule === "→E" && line.content === "R" && line.references.includes(2)) {
      return { valid: true }
    }
    if (line.rule === "→E" && line.content === "R" && !line.references.includes(2)) {
      return { valid: false, message: "Para aplicar →E e obter R, você precisa referenciar Q → R (linha 2) e Q." }
    }
    return { valid: true }
  }

  const handleQuickAdd = (type: string) => {
    switch (type) {
      case "modus-ponens-q":
        addLine("Q", "→E", [1, 3])
        break
      case "modus-ponens-r":
        addLine("R", "→E", [2, 4])
        break
      case "wrong-step":
        addLine("R", "→E", [1, 3])
        break
    }
  }

  const resetProof = () => {
    setProof(initialProof)
    setShowAIFeedback(false)
    setLastError(null)
    setIsComplete(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Problem Statement */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Exercício: Silogismo Hipotético</CardTitle>
              <Badge variant="outline" className="gap-1">
                <span className="text-accent">+75 XP</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Premissas:</span>
                {initialProblem.premises.map((p, i) => (
                  <Badge key={i} variant="secondary" className="font-mono">
                    {p}
                  </Badge>
                ))}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Conclusão:</span>
                <Badge className="bg-primary/10 text-primary font-mono">{initialProblem.conclusion}</Badge>
              </div>
            </div>

            {showHint && (
              <div className="mt-4 p-3 rounded-lg bg-chart-3/10 border border-chart-3/20">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-chart-3 mt-0.5" />
                  <p className="text-sm text-foreground">{initialProblem.hint}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Proof Editor */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Editor de Prova</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Dica
                </Button>
                <Button variant="ghost" size="sm" onClick={resetProof}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reiniciar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {proof.map((line) => (
                <div
                  key={line.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all",
                    line.isValid === true && "bg-accent/5 border-accent/20",
                    line.isValid === false && "bg-destructive/5 border-destructive/20",
                    line.isValid === null && "bg-secondary/50 border-border",
                  )}
                  style={{ marginLeft: line.depth * 24 }}
                >
                  <span className="text-sm text-muted-foreground w-6">{line.id}.</span>
                  <span className="font-mono text-foreground flex-1">{line.content}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {line.rule}
                      {line.references.length > 0 && ` (${line.references.join(", ")})`}
                    </span>
                    {line.isValid === true && <Check className="h-4 w-4 text-accent" />}
                    {line.isValid === false && <AlertCircle className="h-4 w-4 text-destructive" />}
                  </div>
                </div>
              ))}
            </div>

            {isComplete ? (
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
                <Check className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-semibold text-foreground">Prova Completa!</p>
                <p className="text-sm text-muted-foreground">Você ganhou +75 XP</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Adicionar próximo passo:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAdd("modus-ponens-q")}
                    disabled={proof.length > 3}
                  >
                    <Plus className="h-4 w-4 mr-1" />Q via →E (1, 3)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAdd("modus-ponens-r")}
                    disabled={proof.length < 4 || proof.length > 4}
                  >
                    <Plus className="h-4 w-4 mr-1" />R via →E (2, 4)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAdd("wrong-step")}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Simular Erro
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Feedback Panel */}
        {showAIFeedback && lastError && <AIFeedback error={lastError} onClose={() => setShowAIFeedback(false)} />}
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        <Tabs defaultValue="rules" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rules">Regras</TabsTrigger>
            <TabsTrigger value="tree">Árvore</TabsTrigger>
          </TabsList>
          <TabsContent value="rules" className="mt-4">
            <RulesPanel selectedRule={selectedRule} onSelectRule={setSelectedRule} />
          </TabsContent>
          <TabsContent value="tree" className="mt-4">
            <ProofTree proof={proof} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
