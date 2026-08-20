---
name: lbos-atualizacao
description: Passo 5 do pipeline LBOS. Aplica as mudanças aprovadas nos nós afetados, sem nunca duplicar dado. Use SOMENTE depois de `lbos-impacto` ter apresentado a análise e o Felipe ter confirmado. Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Atualização

**Responsabilidade única:** aplicar o que foi aprovado.

Não decide o que atualizar — isso veio da `lbos-impacto`. Não verifica consistência — isso é da `lbos-consistencia`.

> **Pré-requisito absoluto:** o Felipe confirmou a análise de impacto. Sem isso, esta skill não roda.

## Os três destinos

Todo nó tocado cai em uma das três categorias:

| Destino | O que fazer |
|---|---|
| **Modificar** | Alterar o conteúdo. Atualizar `atualizado_em`. Registrar no `## Histórico` |
| **Referenciar** | Só adicionar aresta e link. Nenhum valor copiado |
| **Não tocar** | Sem impacto real. Deixar quieto |

A maioria dos nós cai em "referenciar" ou "não tocar". Se muitos nós estão sendo modificados, provavelmente há duplicação acontecendo.

## A regra que não se quebra

**Nunca duplicar.** Se o dado tem dono (`fonte_unica: true`), os outros recebem link.

❌ `O casamento custa R$ 3.185`
✅ `Custo atual: ver [[DES-2026-001]]`

## Toda modificação registra

Linha no `## Histórico` do nó:

```markdown
| 2026-08-06 | Valor atualizado para X | Contrato assinado | Antecipa OBJ-casamento-suica em 3 semanas | DEC-2026-004 |
```

Sem linha no histórico, a mudança não aconteceu. É o §34 da spec.

## Ordem de aplicação

1. Criar os nós novos primeiro
2. Depois as arestas nos nós existentes
3. Por último os históricos

Assim nenhum wikilink aponta para arquivo que ainda não existe.

## Regras

- **Só o que foi aprovado.** Notou outra coisa que precisa mudar? Reporta, não faz
- **Mudança cirúrgica.** Não "melhorar" conteúdo adjacente que ninguém pediu
- **Nunca apagar.** Conteúdo superado vai para `09-Arquivo/` com `status: arquivado`
- **`atualizado_em` sempre.** Sem isso a auditoria de saúde mente

## Entrega

Lista do que foi modificado, do que só recebeu referência e do que não mudou. Passa para `lbos-consistencia`.
