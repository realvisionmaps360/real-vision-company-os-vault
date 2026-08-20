---
name: lbos-auditoria
description: Skill auxiliar do LBOS. Inspeção preventiva periódica — documentos sem atualização, projetos parados, metas esquecidas, tarefas vencidas, documentos perto do vencimento. Use em revisão semanal ou mensal, ou quando Felipe perguntar "como está o sistema". Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Auditoria

**Responsabilidade única:** inspeção preventiva.

A `lbos-consistencia` roda depois de cada atualização e olha o que acabou de mudar. Esta roda periodicamente e olha o que **parou de mudar** — que costuma ser o problema mais caro.

## O que verificar (§51)

| # | O quê | Sinal de alerta |
|---|---|---|
| 1 | Documentos sem atualização | `atualizado_em` antigo demais para o tipo |
| 2 | Projetos parados | `status: ativo` sem movimento no histórico |
| 3 | Metas esquecidas | Objetivo ativo sem tarefa ligada |
| 4 | Tarefas vencidas | `prazo` no passado, `status` diferente de `concluido` |
| 5 | Revisões atrasadas | `proxima_revisao` vencida |
| 6 | **Documentos perto de vencer** | `validade` chegando |

## O item 6 é o mais valioso

Certidão vencida significa recomeçar a cadeia inteira: reemissão, novo apostilamento, nova tradução. Semanas perdidas por falta de um aviso.

Avisar com antecedência proporcional à cadeia de dependências que o documento alimenta — não com prazo fixo. Documento que só precisa ser entregue avisa perto; documento que ainda vai ser apostilado e traduzido avisa cedo.

## Bases de apoio

`00-Sistema/bases/saude-do-sistema.base` · `revisoes-vencidas.base` · `fonte-unica.base`

As Bases fazem o trabalho bruto. A skill interpreta e prioriza.

## Formato do relatório

```markdown
## Auditoria do LBOS — AAAA-MM-DD

**Estado geral:** <uma frase>

### 🔴 Exige ação agora
### 🟡 Atenção
### 🟢 Saudável

**Recomendação:** <o item mais urgente e o porquê>
```

## Regras

- **Não corrigir.** Auditoria diagnostica. Correção passa pelo fluxo normal
- **Priorizar por consequência, não por atraso.** Documento vencendo em 5 dias é mais urgente que nó parado há 3 meses
- **Nó parado nem sempre é problema.** Documento arquivado deve ficar parado. Julgar pelo tipo
- **Reportar mesmo quando está tudo bem.** "Sistema saudável" é resultado válido

## Entrega

O relatório acima, com uma recomendação única do que fazer primeiro.
