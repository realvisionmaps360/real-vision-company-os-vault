---
name: lbos-relacionamentos
description: Passo 3 do pipeline LBOS. Responde "com o que isso está conectado?" — identifica as entidades envolvidas e cria as arestas tipadas do grafo. Use depois de `lbos-classificacao` e antes de `lbos-impacto`. Carregar junto com a skill `lbos`.
---

# LBOS — Skill de Relacionamentos

**Responsabilidade única:** alimentar o grafo. Responde: *com o que isso está conectado?*

Não analisa impacto. Não atualiza documento nenhum.

## O que fazer

1. **Procurar antes de criar.** Cada entidade candidata: já existe nó? `obsidian search query="<nome>"`
2. Mapear as arestas usando **só** o vocabulário de `CONVENCOES.md`
3. Escrever no frontmatter do nó
4. Espelhar em `## Relacionados`, legível

## Vocabulário fechado

`pertence_a` · `participa_de` · `gera_receita` · `gera_despesa` · `financia` · `depende_de` · `afeta` · `altera` · `origina_tarefa` · `mitiga` · `documenta` · `decide_sobre` · `impacta` · `originada_por` · `referencia`

Precisa de um verbo que não está aqui? **Para.** Propõe em `CONVENCOES.md`, espera aprovação. Vocabulário aberto vira sopa e o grafo perde o sentido.

## Formato

Sempre lista, sempre wikilink entre aspas — mesmo com um item só:

```yaml
depende_de: ["[[DOC-2026-014]]"]
financia: ["[[OBJ-casamento-suica]]"]
```

Nome ambíguo (existe em mais de uma pasta)? Caminho completo: `[[02-Projetos/casamento/PROJETO]]`.

## Reciprocidade

Aresta importante vale nos dois lados. Se A `financia` B, B deveria ter `financiado_por` A. Não é obrigatório em toda relação, mas em objetivo ↔ financiamento e projeto ↔ dependência é o que faz a análise de impacto enxergar os dois sentidos.

## Regras

- **Nunca duplicar entidade.** Duplicata quebra a Fonte Única na origem. Procurar sempre
- **Não relacionar por associação vaga.** "Tem a ver com o casamento" não é aresta. `depende_de` é
- **Ponte com o Company OS** usa `referencia:`

## Entrega

Nós com arestas preenchidas + lista das conexões criadas. Passa para `lbos-impacto`.
