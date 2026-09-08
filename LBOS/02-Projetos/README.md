---
tipo: hub
nome: 02 — Projetos
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-09-08
pertence_a: ["[[LBOS]]"]
tags: [lbos/hub]
---

# 02 — Projetos

Cada projeto tem vida própria e o **mesmo esqueleto**. Uniformidade aqui é o que permite a IA navegar qualquer projeto sem aprender uma estrutura nova toda vez.

## Esqueleto obrigatório

```
projeto/
├── PROJETO.md       ← nó principal, tudo pendura aqui
├── planejamento.md
├── cronograma.md
├── checklist.md
├── riscos.md
├── documentos.md    ← só referências para 04-Documentos
├── financeiro.md    ← só referências para 03-Financeiro
├── reunioes/
└── HISTORICO.md
```

Para criar projeto novo: copiar `_TEMPLATE-PROJETO/` inteiro e preencher.

## Projetos

Status espelha o campo `status` do frontmatter de cada `PROJETO.md`. Se divergir, o frontmatter vence.

| Projeto | Status | Nota |
|---|---|---|
| [[02-Projetos/casamento/PROJETO\|Casamento]] | `pausado` | Falta de caixa desde 31/07. Certidão venceu em 11/08 — cadeia recomeça |
| [[02-Projetos/real-vision/PROJETO\|Real Vision]] | `ativo` | Nó-ponte para o Company OS |
| [[02-Projetos/sunbite/PROJETO\|Sunbite]] | `ativo` | Fonte principal de caixa prevista para o casamento |
| [[02-Projetos/vila-dos-corais/PROJETO\|Vila dos Corais]] | `ativo` | Cliente. Atualização de conteúdo agendada pelo Felipe |
| [[02-Projetos/paraty-onboard/PROJETO\|Paraty Onboard]] | `ativo` | Cliente |
| [[02-Projetos/visionvault/PROJETO\|VisionVault]] | `ativo` | v1 no ar |
| [[02-Projetos/evento-experimental/PROJETO\|Evento experimental com amigos]] | `ideia` | |

Clientes novos não entram aqui por padrão — ver [[DEC-2026-005]].

## Contexto compartilhado (§5.4)

Projetos não são silos. Uma receita nova da Real Vision pode mexer no cronograma do casamento — e é exatamente por isso que o LBOS existe. Essas conexões vivem nas arestas do frontmatter, não na cabeça de ninguém.

## Relacionados

- Pertence a: [[LBOS]]
- Regido por: [[DEC-2026-005]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-09-08 | Tabela passa de 5 para 7 projetos, com o status real de cada um | Auditoria achou vila-dos-corais e paraty-onboard fora da lista, e os status "Fase 2" não batendo com nenhum frontmatter | O hub volta a ser índice confiável da pasta | Status do hub espelha o frontmatter, nunca fase de implementação |
