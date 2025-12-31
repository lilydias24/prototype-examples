"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface RulesPanelProps {
  selectedRule: string | null
  onSelectRule: (rule: string) => void
}

const rules = [
  {
    category: "Introdução",
    items: [
      {
        id: "and-intro",
        name: "∧I",
        fullName: "Introdução da Conjunção",
        description: "De A e B separadamente, derive A ∧ B",
        example: "A, B ⊢ A ∧ B",
      },
      {
        id: "or-intro",
        name: "∨I",
        fullName: "Introdução da Disjunção",
        description: "De A, derive A ∨ B (para qualquer B)",
        example: "A ⊢ A ∨ B",
      },
      {
        id: "impl-intro",
        name: "→I",
        fullName: "Introdução da Implicação",
        description: "Se assumindo A você derivar B, conclua A → B",
        example: "[A] ... B ⊢ A → B",
      },
    ],
  },
  {
    category: "Eliminação",
    items: [
      {
        id: "and-elim",
        name: "∧E",
        fullName: "Eliminação da Conjunção",
        description: "De A ∧ B, derive A ou B",
        example: "A ∧ B ⊢ A",
      },
      {
        id: "or-elim",
        name: "∨E",
        fullName: "Eliminação da Disjunção",
        description: "De A ∨ B e sub-provas de A→C e B→C, derive C",
        example: "A ∨ B, [A]→C, [B]→C ⊢ C",
      },
      {
        id: "impl-elim",
        name: "→E",
        fullName: "Eliminação da Implicação (Modus Ponens)",
        description: "De A → B e A, derive B",
        example: "A → B, A ⊢ B",
      },
    ],
  },
  {
    category: "Negação",
    items: [
      {
        id: "neg-intro",
        name: "¬I",
        fullName: "Introdução da Negação",
        description: "Se assumindo A você derivar contradição, conclua ¬A",
        example: "[A] ... ⊥ ⊢ ¬A",
      },
      {
        id: "neg-elim",
        name: "¬E",
        fullName: "Eliminação da Negação",
        description: "De A e ¬A, derive contradição (⊥)",
        example: "A, ¬A ⊢ ⊥",
      },
      {
        id: "double-neg",
        name: "¬¬E",
        fullName: "Eliminação da Dupla Negação",
        description: "De ¬¬A, derive A",
        example: "¬¬A ⊢ A",
      },
    ],
  },
]

export function RulesPanel({ selectedRule, onSelectRule }: RulesPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Regras de Inferência</CardTitle>
        <p className="text-xs text-muted-foreground">Clique em uma regra para ver detalhes</p>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="multiple" className="w-full" defaultValue={["Eliminação"]}>
          {rules.map((category) => (
            <AccordionItem key={category.category} value={category.category}>
              <AccordionTrigger className="px-4 py-3 text-sm">{category.category}</AccordionTrigger>
              <AccordionContent className="px-2 pb-3">
                <div className="space-y-2">
                  {category.items.map((rule) => (
                    <button
                      key={rule.id}
                      onClick={() => onSelectRule(rule.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-all",
                        selectedRule === rule.id
                          ? "border-primary bg-primary/5"
                          : "border-transparent bg-secondary/50 hover:bg-secondary",
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="font-mono">
                          {rule.name}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground">{rule.fullName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rule.description}</p>
                      <code className="block text-xs font-mono text-primary mt-2 bg-primary/5 px-2 py-1 rounded">
                        {rule.example}
                      </code>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
