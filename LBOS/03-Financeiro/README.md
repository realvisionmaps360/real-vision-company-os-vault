---
tipo: hub
nome: 03 — Financeiro
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
pertence_a: ["[[LBOS]]"]
tags: [lbos/hub]
---

# 03 — Financeiro

Fonte única de **qualquer valor** do sistema.

## A regra mais dura do LBOS

> Nenhum documento fora desta pasta repete um número. Todos referenciam.

❌ `O casamento custa R$ 3.185`
✅ `Custo atual: ver [[OBJ-casamento-suica]]`

Foi a duplicação de valores que criou o problema que o LBOS resolve: cinco documentos com cinco números diferentes e ninguém sabendo qual está certo.

## Estrutura

| Onde | O quê |
|---|---|
| `lancamentos/AAAA-MM.md` | Registro mensal, formato de tabela |
| `categorias.md` | Dicionário de categorias e subcategorias |
| Nós `REC-*` | Receitas, uma por nó, com `fonte_unica: true` |
| Nós `DES-*` | Despesas, uma por nó, com `fonte_unica: true` |

## Templates

[[TEMPLATE-receita]] · [[TEMPLATE-despesa]] · [[TEMPLATE-ativo]]

## Propagação

Toda receita ou despesa confirmada dispara a cadeia do §33:

```
Receita → Fluxo de Caixa → Objetivo financiado → Cronograma
```

## Relacionados

- Pertence a: [[LBOS]]
