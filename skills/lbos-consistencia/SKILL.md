---
name: lbos-consistencia
description: Passo 6 e último do pipeline LBOS. Verifica conflitos, duplicatas, links quebrados e nós órfãos depois de qualquer atualização. Use sempre ao final do fluxo, depois de `lbos-atualizacao`. Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Consistência

**Responsabilidade única:** encontrar o que ficou torto.

Não conserta sozinha em silêncio. Encontra, reporta e propõe.

## As cinco checagens (§35)

| # | Pergunta | Como checar |
|---|---|---|
| 1 | Informação conflitante? | Mesmo dado com valores diferentes em nós distintos |
| 2 | Documento desatualizado? | Base `revisoes-vencidas` |
| 3 | Entidade sem relação? | Nó sem nenhuma aresta e sem backlink |
| 4 | Objetivo sem responsável? | `responsavel` vazio em nós `objetivo` |
| 5 | Decisão inválida? | `proxima_revisao` vencida em nós `decisao` |

## Auditoria de Fonte Única

A mais importante. Dois modos de falhar:

- **Dois donos** — o mesmo dado com `fonte_unica: true` em dois nós
- **Nenhum dono** — um valor aparecendo em vários lugares sem nenhum marcado

Ambos derrubam o §17 e são o problema original que o LBOS existe para resolver.

Base de apoio: `00-Sistema/bases/fonte-unica.base`

## Links quebrados

```bash
obsidian search query="<nome-do-no>"
obsidian backlinks file="<nome-do-no>"
```

Wikilink apontando para arquivo inexistente é aresta morta: o grafo mostra a conexão, a análise de impacto não consegue segui-la.

## O que fazer com o que achar

Pendência em `07-Operacao/`, no formato:

```markdown
## Pendência de consistência — AAAA-MM-DD
**O quê:**
**Onde:**
**Por que é problema:**
**Correção proposta:**
```

Correção **nunca é aplicada** sem o Felipe ver. Consertar em silêncio é como o dado errado se propaga.

## Regras

- **Reportar sempre, mesmo achando nada.** "Zero inconsistências" é informação
- **Não confundir órfão com novo.** Nó criado agora ainda não tem backlink — normal
- **Não apagar duplicata.** Reportar as duas e deixar o Felipe escolher qual é a fonte

## Entrega

Relatório das cinco checagens + pendências abertas.
