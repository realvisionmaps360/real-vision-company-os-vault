---
name: lbos-classificacao
description: Passo 2 do pipeline LBOS. Responde "o que essa informação representa?" — atribui tipo de entidade, projeto, prioridade e responsável a uma nota do inbox. Use depois de `lbos-entrada` e antes de `lbos-relacionamentos`. Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Classificação

**Responsabilidade única:** dar contexto à informação. Responde: *o que isso representa?*

Não cria relações. Não analisa impacto. Não atualiza nada.

## O que fazer

Ler a nota do inbox e preencher:

| Campo | Valores |
|---|---|
| `tipo` | um dos 15 tipos oficiais |
| `projeto` | a que projeto pertence, ou `nenhum` |
| `prioridade` | `alta` · `media` · `baixa` |
| `responsavel` | quem responde por isso |
| `entidades_candidatas` | nomes que aparecem e podem virar nó |

## Os 15 tipos

`pessoa` · `projeto` · `objetivo` · `documento` · `decisao` · `tarefa` · `evento` · `receita` · `despesa` · `ativo` · `processo` · `conhecimento` · `empresa` · `ferramenta` · `risco`

Nenhum tipo novo sem atualizar `CONVENCOES.md` primeiro.

## Como decidir o tipo

| Se a informação... | Tipo |
|---|---|
| descreve um estado que se quer alcançar | `objetivo` |
| descreve uma ação a executar | `tarefa` |
| é uma escolha já feita, com motivo | `decisao` |
| envolve dinheiro entrando | `receita` |
| envolve dinheiro saindo | `despesa` |
| é papel oficial | `documento` |
| é algo que pode dar errado | `risco` |
| é algo aprendido, reutilizável | `conhecimento` |
| tem data e lugar marcados | `evento` |

Uma nota pode gerar **vários** nós de tipos diferentes. Contrato fechado = `documento` + `receita` + `tarefa`. Classificar todos.

## Regras

- **Na dúvida entre dois tipos, perguntar.** Tipo errado envenena o grafo inteiro
- **Não inventar projeto.** Se não existe, `projeto: nenhum` e sinalizar
- **Confiabilidade não se altera aqui.** Ela vem da entrada e permanece

## Entrega

Nota com frontmatter classificado + lista de entidades candidatas. Passa para `lbos-relacionamentos`.
