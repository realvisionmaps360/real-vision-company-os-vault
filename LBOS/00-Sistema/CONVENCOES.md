---
id: SIS-2026-002
tipo: processo
nome: Convenções do LBOS
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
proxima_revisao: 2026-11-06
versao_lbos: "1.0"
fonte_unica: true
pertence_a: ["[[LBOS]]"]
tags: [lbos/sistema, lbos/processo]
---

# Convenções do LBOS

Este documento é a **fonte única** das regras de escrita do sistema. Se um nó não segue o que está aqui, ele está errado — não o contrário.

---

## 1. Anatomia de um nó

Todo arquivo `.md` que representa uma entidade tem três partes, nesta ordem:

```
1. Frontmatter YAML   → a máquina lê. Arestas do grafo.
2. Corpo              → o humano lê. O que é, contexto.
3. Relacionados + Histórico → o rodapé. Conexões legíveis e linha do tempo.
```

O frontmatter **precisa** ficar no topo — é exigência do parser do Obsidian, não escolha. Para não atrapalhar a leitura, o painel de propriedades fica configurado como **Visível e recolhível**: uma linha fina que você abre com um clique.

---

## 2. Campos obrigatórios do frontmatter

Todos os 15 tipos de entidade carregam este conjunto mínimo (§15 da spec):

| Campo | Formato | Para que serve |
|---|---|---|
| `id` | `TIPO-ANO-NNN` | Identificador único e permanente |
| `tipo` | minúsculo, singular | Um dos 15 tipos oficiais |
| `nome` | texto livre | Nome humano da entidade |
| `status` | ver §4 | Onde a entidade está |
| `responsavel` | `"[[Nome]]"` | Quem responde por ela |
| `criado_em` | `AAAA-MM-DD` | Data de nascimento do nó |
| `atualizado_em` | `AAAA-MM-DD` | Última alteração relevante |
| `proxima_revisao` | `AAAA-MM-DD` | Quando revisitar |
| `tags` | `[lbos/entidade, lbos/<tipo>]` | Permite busca e Bases |

Campos opcionais conforme o tipo: `confiabilidade`, `prioridade`, `valor`, `moeda`, `prazo`, `fonte_unica`.

---

## 3. Padrão de ID

`TIPO-ANO-NNN` — três letras, ano de criação, sequencial de três dígitos.

| Entidade | Prefixo | Exemplo |
|---|---|---|
| Pessoa | `PES` | `PES-2026-001` |
| Projeto | `PRJ` | `PRJ-2026-001` |
| Objetivo | `OBJ` | `OBJ-2026-001` |
| Documento | `DOC` | `DOC-2026-014` |
| Decisão | `DEC` | `DEC-2026-003` |
| Tarefa | `TAR` | `TAR-2026-047` |
| Evento | `EVT` | `EVT-2026-008` |
| Receita | `REC` | `REC-2026-014` |
| Despesa | `DES` | `DES-2026-092` |
| Ativo | `ATV` | `ATV-2026-002` |
| Processo | `PRC` | `PRC-2026-005` |
| Conhecimento | `CON` | `CON-2026-021` |
| Empresa | `EMP` | `EMP-2026-001` |
| Ferramenta | `FER` | `FER-2026-011` |
| Risco | `RSC` | `RSC-2026-004` |

O ID **nunca muda**, mesmo que o nome ou o arquivo mudem. É a âncora da entidade.

Objetivos e projetos de longa duração podem usar slug em vez de sequencial quando isso ajuda a leitura: `OBJ-casamento-suica`. Vale para os dois casos, desde que o prefixo seja respeitado.

---

## 4. Vocabulário de status

Fechado. Não inventar valores novos sem atualizar este documento.

| Status | Significado |
|---|---|
| `ideia` | Existe como intenção, sem compromisso |
| `planejado` | Decidido, ainda não começou |
| `ativo` | Em andamento agora |
| `bloqueado` | Parado por dependência externa |
| `pausado` | Parado por decisão própria |
| `concluido` | Terminou e foi validado |
| `arquivado` | Encerrado, movido para `09-Arquivo/` |
| `cancelado` | Abandonado antes de terminar |

Entidades financeiras usam um conjunto próprio: `prevista`, `confirmada`, `recebida`, `paga`, `cancelada`.

---

## 5. Vocabulário de relações — o coração do grafo

Estas chaves de frontmatter **são** as arestas do grafo. Vocabulário fechado: usar uma chave fora desta lista quebra a análise de impacto, porque a IA não sabe o que aquele verbo significa.

| Chave | Lê-se | Exemplo |
|---|---|---|
| `pertence_a` | X pertence a Y | Receita pertence a Real Vision |
| `participa_de` | X participa de Y | Felipe participa do projeto Casamento |
| `gera_receita` | X gera a receita Y | Projeto gera receita |
| `gera_despesa` | X gera a despesa Y | Projeto gera despesa |
| `financia` | X financia Y | Fluxo de Caixa financia Objetivo |
| `depende_de` | X depende de Y | Casamento depende de Tradução |
| `afeta` | X afeta Y | Risco afeta Cronograma |
| `altera` | X altera Y | Decisão altera Projeto |
| `origina_tarefa` | X origina a tarefa Y | Decisão origina tarefa |
| `mitiga` | X mitiga o risco Y | Tarefa mitiga risco |
| `documenta` | X documenta Y | Documento documenta Projeto |
| `decide_sobre` | X decide sobre Y | Decisão decide sobre Objetivo |
| `impacta` | X impacta Y | Receita impacta Fluxo de Caixa |
| `originada_por` | X foi originada por Y | Receita originada por Cliente |
| `referencia` | X referencia Y | Ponte para o Company OS |

**Formato:** sempre lista, sempre wikilink entre aspas.

```yaml
depende_de: ["[[DOC-2026-014]]", "[[Tradução juramentada]]"]
```

Lista com um item só continua sendo lista. Consistência importa mais que economia de caracteres.

### Precisa de uma relação nova?

Pare. Não invente no arquivo. Traga a proposta para este documento, ela é discutida, aprovada e só então entra em uso. Vocabulário aberto vira sopa e o grafo perde o sentido.

---

## 6. Frontmatter x corpo — onde vai o quê

**Regra fundadora do LBOS:**

> Relação estrutural vai no frontmatter. Menção contextual vai no corpo.

Se a conexão está só no corpo, ela é prosa: um humano entende, a IA não propaga impacto por ela. Se está no frontmatter, é aresta: entra no grafo, nas Bases e na análise de impacto.

Na prática, toda conexão importante aparece **nos dois lugares** — no frontmatter para a máquina, no bloco `## Relacionados` para você. Isso não viola o §17 da spec: §17 proíbe duplicar **valores** ("R$ 3.185" em cinco documentos), não arestas. Repetir uma aresta em forma legível é redundância barata e reversível.

---

## 7. Fonte Única da Verdade (§5.1 e §17)

Todo dado tem exatamente **um** nó dono. Esse nó marca:

```yaml
fonte_unica: true
```

Qualquer outro documento que precise daquele dado **linka**, nunca copia.

❌ Errado — o valor aparece em cinco arquivos e três já estão desatualizados:
```markdown
O casamento custa R$ 3.185.
```

✅ Certo — existe um dono, todo mundo aponta pra ele:
```markdown
Custo atual: ver [[OBJ-casamento-suica]].
```

A skill `lbos-consistencia` audita duplicatas contra esta marca.

---

## 8. Nomenclatura de arquivos

- `kebab-case` para tudo, sem espaço, sem acento, sem maiúscula
- Datas sempre `AAAA-MM-DD` ou `AAAA-MM`
- Exceção: nós de Pessoa usam o nome real (`Felipe Garcia.md`) porque o wikilink fica legível e o nome é a chave natural
- Exceção: documentos-âncora do sistema em `MAIUSCULO-COM-HIFENS.md` (`CONVENCOES.md`, `ARQUITETURA.md`)

Nome de arquivo que se repete em pastas diferentes gera wikilink ambíguo. Nesse caso usar caminho: `[[02-Projetos/casamento/PROJETO]]`.

---

## 9. Histórico (§20 e §34)

Todo nó termina com uma tabela. Linha nova a cada mudança relevante — não a cada correção de vírgula.

```markdown
## Histórico
| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Nó criado | Fundação do LBOS | — | — |
```

"Relevante" significa: mudou um valor, mudou um status, nasceu ou morreu uma dependência, ou uma decisão foi tomada.

---

## 10. Ponte com o Company OS

O LBOS **referencia** o Company OS, nunca o absorve. `operacao/`, `contexto/`, `skills/` e `AGENTS.md` continuam exatamente onde estão e seguem as regras deles.

Para citar, usar `referencia:` no frontmatter e wikilink normal no corpo. Nenhum arquivo do Company OS ganha frontmatter LBOS ou muda de lugar por causa do LBOS.

---

## Relacionados

- Pertence a: [[LBOS]]
- Detalha: [[ARQUITETURA]]
- Regido por: [[LBOS-v1.0]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Documento criado | Fase 1 — Fundação | Define as regras de escrita de todos os nós | Vocabulário de relações fechado em 15 chaves |
