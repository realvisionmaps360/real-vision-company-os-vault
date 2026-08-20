---
name: lbos-planejamento
description: Skill auxiliar do LBOS. Transforma objetivo em sequência de tarefas com dependências mapeadas. Use quando Felipe definir um objetivo novo, quando um objetivo travar, ou quando ele pedir "o que preciso fazer para X". Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Planejamento

**Responsabilidade única:** transformar objetivo em ação.

Estrutura. Não executa. Não decide prioridade sozinha.

## O que fazer

1. Ler o nó de objetivo e o critério de `## Como se mede`
2. Quebrar em tarefas verificáveis
3. Mapear dependências entre elas
4. Identificar o caminho crítico
5. Propor a sequência ao Felipe

## Exemplo

**Objetivo:** casar na Suíça

```
Emitir certidão ──┐
Emitir escritura ─┼─→ Apostilar (1 visita) ──┐
Emitir antecedentes ┘                        ├─→ Agendar consulado → Entregar dossiê → Visto D
                    └─→ Traduzir (alemão) ───┘
Preencher formulários (alemão) ──────────────┘
```

Caminho crítico: antecedentes → apostilamento → tradução. É a cadeia mais longa, e atraso nela atrasa tudo.

## Toda tarefa precisa de

| Campo | Sem isso |
|---|---|
| Critério de conclusão verificável | a tarefa nunca fecha |
| `depende_de` explícito | o caminho crítico é invisível |
| Responsável | ninguém faz |
| Prazo, quando existir | não dá pra priorizar |

Tarefa que não sabe dizer quando terminou não é tarefa. É intenção.

## Caminho crítico

Sempre identificar e destacar. É a informação mais útil do planejamento: onde o atraso custa caro e onde não custa nada.

## Regras

- **Não inventar prazo.** Sem data confirmada, `prazo: a definir`
- **Não executar.** Estrutura e propõe. O Felipe decide o que entra na fila
- **Dependência externa vira risco.** Aprovação de consulado não é tarefa — é `risco` com gatilho de alerta

## Entrega

Sequência de tarefas com dependências + caminho crítico destacado. Vira nós `TAR-*` só depois do OK.
