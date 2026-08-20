---
tipo: hub
nome: 00 — Sistema
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
pertence_a: ["[[LBOS]]"]
tags: [lbos/hub]
---

# 00 — Sistema

O sistema falando de si mesmo.

| Documento | Natureza |
|---|---|
| [[LBOS]] | Nó raiz, índice global. **Comece aqui** |
| [[LBOS-v1.0]] | Especificação oficial — congelada, imutável |
| [[ARQUITETURA]] | Como a spec vira sistema funcionando |
| [[CONVENCOES]] | Como escrever um nó corretamente |
| [[VERSIONAMENTO]] | Como o sistema evolui sem se quebrar |
| [[SINCRONIA-GIT]] | Procedimento Suíça ↔ Brasil |
| [[FLUXO-DOCUMENTO-VIVO]] | Os 7 passos que tornam o sistema vivo |
| [[HANDOFF-IA-EXTERNA]] | Como trazer uma sessão de IA externa pro LBOS |

## `templates/`

Um por entidade, 15 no total. Sempre partir do template — é o que garante que todo nó tenha os mesmos campos e o grafo continue consultável.

## `bases/`

Dashboards vivos (`.base`). Leem o frontmatter dos nós e mostram estado sem duplicar nenhum dado. É como o §37 (indicadores de saúde) é implementado.

## `prd/`

Versões congeladas da especificação. Nunca editar um arquivo daqui — versão nova é arquivo novo.

## Relacionados

- Pertence a: [[LBOS]]
