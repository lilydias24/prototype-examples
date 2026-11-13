# LogicMind — protótipo de interface

Protótipo navegável da interface do **Tutor Inteligente para Dedução Natural**, meu
projeto de tutor que verifica provas formalmente e explica, em linguagem natural, por que
um passo falhou. Este protótipo serviu para validar a experiência do estudante antes da
especificação do sistema; os dados das telas são fictícios e não há backend.

## Telas

| Tela | O que mostra |
| --- | --- |
| Início | Visão geral do progresso, atividade recente e atalhos |
| Trilha e módulos | Exercícios organizados em trilhas de dificuldade crescente |
| Lição / prática | Editor de prova passo a passo, com premissas, conclusão e XP do exercício |
| Painel de regras | Regras de inferência com detalhes ao clicar |
| Assistente IA | Área de feedback explicando o erro do passo |
| Árvore de dependência | Como cada linha da prova depende das anteriores |
| Revisão de erros | Erros pendentes e resolvidos e a taxa de melhoria |
| Conquistas | Gamificação do progresso |

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · componentes shadcn/ui. Gerado e
iterado no [v0](https://v0.app).

## Como rodar

```bash
pnpm install
pnpm dev   # http://localhost:3000
```
