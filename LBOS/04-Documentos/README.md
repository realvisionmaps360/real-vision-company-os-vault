---
tipo: hub
nome: 04 — Documentos
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
pertence_a: ["[[LBOS]]"]
tags: [lbos/hub]
---

# 04 — Documentos

Armazenamento puro. Certidões, contratos, traduções, passaportes, notas fiscais, protocolos de consulado.

## Regra

**Nenhuma interpretação acontece aqui.** Um nó de documento diz o que o documento é, quando foi emitido, até quando vale e onde está o arquivo. Análise, decisão e consequência moram em `08-Decisoes/` e nos projetos.

## Campos que importam

`emitido_por` · `emitido_em` · `validade` · `arquivo_fisico`

O campo `validade` é o que permite a skill de auditoria avisar antes de um documento vencer — que é meio caminho andado num processo de consulado.

Template: [[TEMPLATE-documento]]

## Relacionados

- Pertence a: [[LBOS]]
