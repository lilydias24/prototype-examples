"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProofLine {
  id: number
  content: string
  rule: string
  references: number[]
  isValid: boolean | null
}

interface ProofTreeProps {
  proof: ProofLine[]
}

export function ProofTree({ proof }: ProofTreeProps) {
  // Build dependency tree
  const buildTree = () => {
    const nodes = proof.map((line) => ({
      ...line,
      children: proof.filter((p) => p.references.includes(line.id)),
    }))
    return nodes
  }

  const tree = buildTree()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Árvore de Dependência</CardTitle>
        <p className="text-xs text-muted-foreground">Visualize como cada linha depende das anteriores</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {proof.map((line) => (
            <div key={line.id} className="relative">
              <div
                className={cn(
                  "p-3 rounded-lg border",
                  line.isValid === true && "border-accent/30 bg-accent/5",
                  line.isValid === false && "border-destructive/30 bg-destructive/5",
                  line.isValid === null && "border-border bg-secondary/30",
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">
                    Linha {line.id}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{line.rule}</span>
                </div>
                <p className="font-mono text-sm text-foreground">{line.content}</p>

                {line.references.length > 0 && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Depende de:</span>
                    {line.references.map((ref) => (
                      <Badge key={ref} variant="secondary" className="text-xs">
                        {ref}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Connection lines */}
              {line.references.length > 0 && <div className="absolute left-4 -top-3 w-px h-3 bg-border" />}
            </div>
          ))}
        </div>

        {proof.length <= 3 && (
          <div className="mt-4 p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">Adicione mais linhas para ver as conexões</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
