"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, X, ChevronRight, Sparkles } from "lucide-react"

interface ProofLine {
  id: number
  content: string
  rule: string
  references: number[]
  errorMessage?: string
}

interface AIFeedbackProps {
  error: ProofLine
  onClose: () => void
}

export function AIFeedback({ error, onClose }: AIFeedbackProps) {
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState("")

  const fullFeedback = `Analisando sua tentativa de aplicar ${error.rule} para obter ${error.content}...

**O que deu errado:**
${error.errorMessage || "A regra não foi aplicada corretamente nas linhas referenciadas."}

**Explicação pedagógica:**
A regra de Eliminação da Implicação (→E), também conhecida como *Modus Ponens*, requer duas premissas específicas:
1. Uma implicação no formato "A → B"
2. O antecedente "A" dessa implicação

Para obter R como conclusão, você precisa:
- Primeiro obter Q (usando P → Q e P)
- Depois usar Q → R junto com Q para derivar R

**Sugestão:**
Tente primeiro aplicar →E nas linhas 1 e 3 para obter Q. Depois, use esse resultado com a linha 2.`

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullFeedback.length) {
        setDisplayedText(fullFeedback.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-lg">Assistente IA</CardTitle>
            {isTyping && (
              <Badge variant="secondary" className="animate-pulse">
                Analisando...
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
            {displayedText.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="font-semibold text-foreground mt-4 mb-2">
                    {line.replace(/\*\*/g, "")}
                  </p>
                )
              }
              if (line.startsWith("**")) {
                const parts = line.split("**")
                return (
                  <p key={i} className="mt-4 mb-2">
                    <span className="font-semibold">{parts[1]}</span>
                    {parts[2]}
                  </p>
                )
              }
              return (
                <p key={i} className="text-muted-foreground">
                  {line}
                </p>
              )
            })}
            {isTyping && <span className="animate-pulse">▊</span>}
          </div>
        </div>

        {!isTyping && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
              <Lightbulb className="h-4 w-4" />
              Ver exemplo similar
            </Button>
            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
              <ChevronRight className="h-4 w-4" />
              Próxima dica
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
