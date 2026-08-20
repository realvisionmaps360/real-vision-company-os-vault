---
id: SIS-2026-001
tipo: processo
nome: Arquitetura do LBOS
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

# Arquitetura do LBOS

Como a especificação vira sistema funcionando. A spec (`[[LBOS-v1.0]]`) define **o quê**; este documento define **como**, na stack que a gente usa.

Documento vivo: muda quando a implementação ensina algo. A spec não muda — ela só ganha versão nova.

---

## 1. A ideia em uma frase

O LBOS não é uma árvore de pastas com arquivos dentro. É um **grafo**: cada documento é um nó, e o valor está nas conexões entre eles.

As pastas `00` a `09` são endereço postal — servem pra você achar as coisas. O que faz o sistema funcionar são as **arestas tipadas**, e elas moram no frontmatter.

---

## 2. As quatro camadas

Tudo nativo do Obsidian. Sem plugin pago, sem banco de dados, sem serviço externo. Se o Obsidian sumir amanhã, sobram arquivos de texto legíveis.

| Camada | Tecnologia | Papel | Quem lê |
|---|---|---|---|
| **Semântica** | Frontmatter YAML, chave = tipo de relação | Guarda o verbo da conexão | Máquina |
| **Navegação** | Wikilink `[[ ]]` no bloco `## Relacionados` | Backlink, grafo visual, clique | Humano |
| **Consulta** | Obsidian Bases (`.base`) | Dashboards vivos sem duplicar dado | Ambos |
| **Rastreabilidade** | Seção `## Histórico` em cada nó | Linha do tempo da entidade | Ambos |

### Por que o verbo importa

Um wikilink puro diz que A e B se conhecem. Não diz o que um faz com o outro.

```markdown
[[Real Vision]] e [[Fluxo de Caixa]]     ← ligação sem sentido definido
```

```yaml
gera_receita: ["[[REC-2026-014]]"]
impacta: ["[[Fluxo de Caixa]]"]           ← agora dá pra propagar impacto
```

A segunda forma permite responder "se essa receita não entrar, o que quebra?". A primeira, não. É essa diferença que separa um vault comum de um grafo de conhecimento.

---

## 3. Anatomia de um nó

```
┌─────────────────────────────┐
│  Frontmatter YAML           │  ← arestas. Painel recolhível, uma linha fina
├─────────────────────────────┤
│  ## O que é                 │
│  ## Contexto                │  ← o que você lê
├─────────────────────────────┤
│  ## Relacionados            │  ← as mesmas arestas, legíveis
│  ## Histórico               │  ← linha do tempo
└─────────────────────────────┘
```

O frontmatter fica no topo porque o parser do Obsidian exige — não é escolha de design. Fica **recolhido** para não atrapalhar a leitura. Você abre com um clique quando quiser conferir status.

Detalhes de campos, IDs e vocabulário: `[[CONVENCOES]]`.

---

## 4. As três camadas lógicas da spec (§8)

A spec divide o sistema em Conhecimento, Projetos e Operação. No disco isso vira:

| Camada da spec | Pastas | Ritmo de mudança |
|---|---|---|
| **Conhecimento** | `04-Documentos`, `05-Conhecimento`, `06-Pessoas` | Muda pouco. É referência |
| **Projetos** | `01-Objetivos`, `02-Projetos`, `03-Financeiro` | Muda por ciclo |
| **Operação** | `07-Operacao`, `08-Decisoes` | Muda todo dia |

`00-Sistema` é meta — o sistema falando de si mesmo. `09-Arquivo` é o cemitério onde nada é apagado, só aposentado.

---

## 5. Fluxo de informação (§10 e §29)

Nenhuma informação entra solta. Toda entrada passa pelos mesmos sete passos:

```
Entrada bruta          →  07-Operacao/inbox/
      ↓
Classificação          →  tipo, projeto, prioridade, confiabilidade
      ↓
Identificar entidades  →  nós novos ou existentes
      ↓
Mapear relações        →  arestas tipadas no frontmatter
      ↓
Análise de impacto     →  as 6 perguntas do §31
      ↓
Atualização seletiva   →  só onde há impacto real
      ↓
Registro + sugestões   →  ## Histórico + 08-Decisoes
```

**O passo 5 nunca é pulado, e o resultado dele é sempre mostrado ao Felipe antes do passo 6.** A spec é explícita no §36: o sistema recomenda, não decide.

---

## 6. Propagação seletiva (§33)

Nem toda informação toca todo documento. A propagação segue as arestas, e para onde a aresta não vai, o impacto não chega.

```
Receita confirmada na Real Vision
      ↓ impacta
Fluxo de Caixa
      ↓ financia
Objetivo Casamento
      ↓ afeta
Cronograma
```

A Sunbite não aparece nessa cadeia porque não existe aresta ligando ela à receita. Isso é uma feature: evita que tudo atualize tudo e o sistema vire ruído.

---

## 7. Fonte Única na prática

`fonte_unica: true` marca o nó dono de um dado. Só um nó por dado.

Quando a skill de consistência encontra o mesmo valor em dois lugares e nenhum marcado como dono — ou pior, dois marcados — isso vira pendência de revisão. É a defesa automática contra o problema que originou o LBOS: documentos que discordam entre si.

---

## 8. Relação com o Company OS

O LBOS mora no mesmo cofre que o Company OS, mas **não manda nele**.

| | Company OS | LBOS |
|---|---|---|
| Onde | `operacao/`, `contexto/`, `skills/` | `LBOS/` |
| Regido por | `AGENTS.md` | `LBOS-v1.0` + este documento |
| Papel | Como a Real Vision opera | Como vida e negócio se conectam |

A ponte é de mão única: nós do LBOS referenciam o Company OS, o Company OS não sabe que o LBOS existe. Nenhum arquivo de `operacao/` ou `contexto/` ganha frontmatter LBOS ou muda de lugar.

Mesmo cofre significa **mesmo grafo** — foi por isso que a decisão foi essa. Cofre separado quebraria todo wikilink entre vida e negócio, matando o §5.4 Contexto Compartilhado, que é a razão de ser do sistema.

---

## 9. O que não fazemos

- **Plugin de comunidade para a estrutura central.** Dataview, Templater e afins podem entrar como conveniência, nunca como dependência. Se o plugin morrer, o grafo continua de pé
- **Automação antes da Fase 4.** A spec §55 é clara: não se automatiza sobre base desorganizada
- **Inventar dado.** Se não está no vault ou não veio do Felipe nesta sessão, pergunta-se. Sem exceção
- **Apagar.** Arquiva-se em `09-Arquivo/`. Nunca se deleta

---

## Relacionados

- Pertence a: [[LBOS]]
- Regido por: [[LBOS-v1.0]]
- Detalhado por: [[CONVENCOES]]
- Versionado em: [[VERSIONAMENTO]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Documento criado | Fase 1 — Fundação | Traduz a spec v1.0 em implementação sobre stack nativa do Obsidian | Quatro camadas: frontmatter, wikilink, Bases, histórico |
