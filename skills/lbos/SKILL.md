---
name: lbos
description: Skill mestre do Life & Business Operating System. Carrega o contexto do LBOS — arquitetura, convenções, vocabulário de relações e fluxo do Documento Vivo. Use SEMPRE que Felipe mencionar "LBOS", "Life & Business OS", "meu sistema", grafo de conhecimento pessoal, ou for criar/atualizar qualquer nó em `LBOS/`. Carregar antes de qualquer skill `lbos-*` do pipeline.
---

# LBOS — Life & Business Operating System

Cérebro externo do Felipe. Conecta vida pessoal, finanças, documentação e negócios num único grafo.

**Localização:** `C:\Users\Felipe Garcia\Desktop\Real Vision\LBOS\`
**Versão vigente:** 1.0

## Antes de qualquer coisa, leia

| Arquivo | Para quê |
|---|---|
| `LBOS/00-Sistema/LBOS.md` | Nó raiz, índice global |
| `LBOS/00-Sistema/CONVENCOES.md` | Como escrever um nó. **Obrigatório** |
| `LBOS/00-Sistema/ARQUITETURA.md` | Como o grafo funciona |
| `LBOS/00-Sistema/FLUXO-DOCUMENTO-VIVO.md` | Os 7 passos |
| `LBOS/00-Sistema/prd/LBOS-v1.0.md` | Spec oficial, congelada |

## As cinco regras inquebráveis

1. **Fonte Única.** Um dado, um nó dono (`fonte_unica: true`). Os outros referenciam. Nunca copiam
2. **Vocabulário fechado.** Relação fora da lista de `CONVENCOES.md` não existe. Precisa de uma nova? Propõe, não inventa
3. **Impacto antes de atualizar.** Nenhum nó muda sem as 6 perguntas respondidas e mostradas ao Felipe
4. **Nunca apagar.** Arquiva em `09-Arquivo/` com `status: arquivado`
5. **Zero invenção.** Se não está no vault e não veio do Felipe agora, pergunta

## A regra fundadora

> Relação estrutural vai no frontmatter. Menção contextual vai no corpo.

Só no corpo = prosa, a IA não propaga impacto. No frontmatter = aresta do grafo.

Toda conexão importante aparece nos dois: frontmatter para a máquina, `## Relacionados` para o Felipe.

## Anatomia de todo nó

```yaml
---
id: TIPO-ANO-NNN
tipo:
nome:
status:
responsavel: "[[Felipe Garcia]]"
criado_em: AAAA-MM-DD
atualizado_em: AAAA-MM-DD
proxima_revisao: AAAA-MM-DD
# arestas tipadas aqui
tags: [lbos/entidade, lbos/<tipo>]
---

## O que é
## Contexto
## Relacionados
## Histórico
```

Sempre partir do template em `LBOS/00-Sistema/templates/`.

## Pipeline de skills

`lbos-entrada` → `lbos-classificacao` → `lbos-relacionamentos` → `lbos-impacto` → `lbos-atualizacao` → `lbos-consistencia`

Auxiliares: `lbos-planejamento` · `lbos-memoria` · `lbos-auditoria`

Cada uma tem responsabilidade única. Nenhuma faz o trabalho de outra. Nenhuma decide.

## Fronteira com o Company OS

O LBOS **referencia** o Company OS, nunca o absorve. `operacao/`, `contexto/`, `skills/` e `AGENTS.md` não se movem, não ganham frontmatter LBOS, não são reescritos.

Quando precisar de dado do negócio: linka. Nunca copia.

## Obsidian CLI

O CLI (`obsidian`) exige o Obsidian **aberto** no PC. Se falhar, avisar o Felipe em vez de assumir que não há acesso.

```bash
obsidian search query="lbos/entidade"
obsidian backlinks file="OBJ-casamento-suica"
obsidian properties path="LBOS/03-Financeiro/DES-2026-001.md"
```
