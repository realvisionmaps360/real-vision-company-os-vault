---
id: SIS-2026-007
tipo: processo
nome: Auditoria do LBOS — 08/09/2026
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-09-08
atualizado_em: 2026-09-08
proxima_revisao: 2026-10-08
versao_lbos: "1.0"
fonte_unica: true
pertence_a: ["[[LBOS]]"]
referencia: ["[[CONVENCOES]]", "[[ARQUITETURA]]", "[[FLUXO-DOCUMENTO-VIVO]]"]
tags: [lbos/sistema, lbos/processo]
---

# Auditoria do LBOS — 08/09/2026

Varredura completa dos 144 arquivos do LBOS contra [[CONVENCOES]], [[ARQUITETURA]] e [[FLUXO-DOCUMENTO-VIVO]], mais cruzamento com o Company OS para achar informação que envelheceu.

**Nenhum nó foi alterado nesta auditoria.** Este documento é o resultado das fases 1 a 5. A fase 6 (correção nó por nó) espera aprovação do Felipe.

---

## 1. Resposta curta

| Pergunta | Resposta |
|---|---|
| Quanto do LBOS está estruturalmente conforme? | **55%** |
| Quanto da realidade já virou nó no grafo? | **~50%** (estimativa) |
| Quantos nós estão desatualizados? | **16 com revisão vencida** + 14 contradições confirmadas |
| Quanto falta para "organizado e atualizado"? | 3 blocos de trabalho, ~45% do caminho |

O sistema **não está quebrado** — está parado. As regras estão escritas, os templates existem, o grafo tem 113 nós com aresta. O que falhou foi o passo 7 do fluxo: o mundo andou entre 17/08 e 08/09 e os nós não acompanharam.

---

## 2. Conformidade estrutural, pasta por pasta

Score = média de três checagens por arquivo: os 9 campos obrigatórios do §2, pelo menos uma aresta do vocabulário do §5, e a seção `## Histórico` do §9.

| Pasta | Arq. | Com FM | FM completo | Com aresta | Com histórico | Score |
|---|---:|---:|---:|---:|---:|---:|
| 00-Sistema | 9 | 9 | 7 | 8 | 7 | **81%** |
| 00-Sistema/templates | 15 | 15 | 0 | 15 | 15 | 67% |
| 01-Objetivos | 2 | 2 | 1 | 2 | 1 | 67% |
| 02-Projetos | 60 | 47 | 11 | 47 | 21 | **44%** |
| 02-Projetos/_TEMPLATE | 8 | 1 | 0 | 1 | 1 | 8% |
| 03-Financeiro | 11 | 11 | 8 | 11 | 10 | **88%** |
| 04-Documentos | 1 | 1 | 0 | 1 | 0 | 33% |
| 04-Interagente | 1 | 0 | 0 | 0 | 0 | **0%** |
| 05-Conhecimento | 9 | 9 | 8 | 9 | 8 | **93%** |
| 06-Pessoas | 6 | 6 | 5 | 6 | 5 | **89%** |
| 07-Operacao | 9 | 9 | 1 | 7 | 6 | 52% |
| 08-Decisoes | 5 | 5 | 4 | 5 | 4 | **87%** |
| 09-Arquivo | 6 | 6 | 0 | 1 | 1 | **11%** |
| (raiz) | 2 | 0 | 0 | 0 | 0 | 0% |
| **TOTAL** | **144** | **121** | **45** | **113** | **79** | **55%** |

Leitura: o miolo do sistema (Financeiro, Conhecimento, Pessoas, Decisões) está em boa forma, entre 87% e 93%. O que puxa a média pra baixo é `02-Projetos` — que é 42% do volume — e duas pastas que nunca saíram do papel.

**Campos obrigatórios ausentes (dos 121 que têm frontmatter):**

| Campo | Faltando em |
|---|---:|
| `proxima_revisao` | 60 |
| `id` | 46 |
| `nome` | 25 |
| `status` / `criado_em` / `atualizado_em` | 9 cada |
| `tipo` / `responsavel` | 8 cada |
| `tags` | 7 |

`proxima_revisao` faltando em 60 arquivos e `id` em 46 é o que impede o §37 (indicadores de saúde) de existir: sem data de revisão não há como o sistema avisar que algo envelheceu, e sem ID a entidade não tem âncora.

---

## 3. Cobertura — quanto da realidade virou nó

| Área | Estado | Cobertura |
|---|---|---:|
| 00 — Sistema | 8 docs previstos, 8 existem. Falta `bases/` | 85% |
| 01 — Objetivos | 1 objetivo (casamento). O nó raiz prevê anual, trimestral, mensal, financeiro e pessoal | ~20% |
| 02 — Projetos | 7 projetos com esqueleto. Dos 20 clientes do Company OS, 2 têm nó | ~45% |
| 03 — Financeiro | 8 nós REC/DES + 2 de apoio. Faltam `lancamentos/` e `categorias.md` prometidos no README | ~50% |
| 04 — Documentos | Só o README. Zero nós DOC, apesar de 3 documentos do casamento emitidos | **0%** |
| 05 — Conhecimento | 8 nós, README em dia, todos indexados | 90% |
| 06 — Pessoas | 5 entidades (Felipe, Romana, Mama, Gabriel Iberg, Real Vision 360) | ~60% |
| 07 — Operação | Inbox funcionando mas com fila desatualizada; 4 eventos | ~50% |
| 08 — Decisões | 4 decisões registradas e ligadas | ~70% |
| 09 — Arquivo | 5 notas arquivadas, nenhuma marcada como arquivada | ~40% |

Os números de 01 e 06 são estimativa: o denominador (quantos objetivos e quantas pessoas *deveriam* existir) não está declarado em lugar nenhum. Os demais são contagem direta.

---

## 4. As 14 contradições confirmadas

Cada uma foi verificada em arquivo. Nenhuma é suposição.

### Documentos do sistema falando de coisas que não existem

**1. Fase do sistema contradiz a si mesma.** [[LBOS]] tem `fase_atual: "1 — Fundação"` no frontmatter, e no corpo uma tabela dizendo que as fases 1, 2 e 4 estão concluídas e a 3 construída. As duas coisas não podem ser verdade.

**2. As 3 Bases não existem.** [[LBOS]] marca a Fase 3 como "✅ construída". Não há nenhum arquivo `.base` no vault inteiro, e a pasta `00-Sistema/bases/` não existe. Ela é citada como real em quatro lugares: [[LBOS]], [[ARQUITETURA]] §2, [[00-Sistema/README]] e [[FLUXO-DOCUMENTO-VIVO]] (verificação de consistência).

**3. `AGENTE.md` não existe.** [[LBOS]] diz que a Fase 5 "aguarda decisão sobre a regra 6 do `AGENTE.md`". O arquivo é `AGENTS.md`, e a regra 6 dele é "NUNCA APAGUE NOTAS DO OBSIDIAN". Ou a referência está errada, ou a decisão pendente é outra.

**4. `03-Financeiro/README` descreve pasta que não existe.** Promete `lancamentos/AAAA-MM.md` e `categorias.md` como estrutura da pasta. Nenhum dos dois existe. Os lançamentos reais moram em `Felipe Garcia/financas/`, fora do LBOS, e param em `2025-07.md`.

**5. `04-Interagente/` é uma casca.** O README descreve `Thomas-para-LBOS/` e `LBOS-para-Thomas/` com exemplos de arquivo. Nenhuma das duas pastas existe, nenhuma mensagem foi trocada. O arquivo também não tem frontmatter, e o número **04 está duplicado** com `04-Documentos`.

**6. Dois READMEs disputando o papel de raiz.** `LBOS/README.md` (2 linhas, sem frontmatter) diz "Setup parcial, bug de resposta não resolvido" e aponta pra um caminho `/workspace/...` de outra máquina. O nó raiz de verdade é [[LBOS]] em `00-Sistema/`. Quem abre a pasta encontra primeiro o errado.

### Informação que o tempo passou por cima

**7. A certidão de nascimento venceu e ninguém marcou.** [[02-Projetos/casamento/PROJETO]] carrega o aviso: *"a Certidão de Nascimento tinha validade até 11/08/2026 e o consulado nunca foi agendado. Se venceu, a cadeia recomeça do zero."* Hoje é 08/09. Venceu há quatro semanas. O nó não é tocado desde 06/08. Se a cadeia recomeçou, [[DES-2026-001]] (R$ 2.517) está errada.

**8. Objetivo ativo, projeto pausado.** [[OBJ-casamento-suica]] tem `status: ativo`; o projeto que o realiza tem `status: pausado` desde 31/07 por falta de caixa. A `proxima_revisao` do objetivo era 11/08 — vencida há quatro semanas.

**9. A fila do inbox está errada em três pontos.** [[INBOX]] lista 2 notas na "Fila atual". A pasta tem 3, e nenhuma das duas listadas confere: faltam `2026-08-25-roteiro-reuniao-romana-3-frentes` e `2026-08-27-ingestao-handoff-editorial-email-blog`, e a fila cita `2026-08-20-servicos-google-merchant-loja-site`, que **não existe como arquivo**. `atualizado_em` do INBOX: 06/08.

**10. `02-Projetos/README` lista 5 projetos, existem 7.** Faltam vila-dos-corais e paraty-onboard. E os status da tabela ("⬜ Fase 2") não batem com o frontmatter de nenhum dos três primeiros: casamento está `pausado`, real-vision e sunbite estão `ativo`.

**11. O nó Real Vision diz que uma migração concluída está em andamento.** A tabela de clientes em [[02-Projetos/real-vision/PROJETO]] descreve vila-dos-corais como *"migração de domínio pro Vercel em andamento"*. O checklist do próprio projeto marca a migração como feita em 13-14/08, com o Search Console já verificado.

**12. Cliente Moreno não chegou ao grafo.** Onboardado em 02/09 com `FICHA-CLIENTE.md`, `MORENO-PROJETO.md`, `MORENO-TIMELINE.md` e entidade na wiki do Company OS. A palavra "Moreno" não aparece em nenhum arquivo do LBOS.

**13. Vila dos Corais está três semanas atrás da realidade.** O nó tem `atualizado_em: 2026-08-17`. Desde então o Company OS registrou: reunião com a Evelin (21/08), deck de reunião (31/08) e, em 01/09, a correção do login e a **migração completa do Supabase para conta própria** — projeto novo `xcymehoyqppdgvrhytfj`, dados migrados e conferidos. Nada disso chegou ao LBOS. Em particular, a pendência de SMTP próprio é um risco novo que não virou nó em `riscos.md`.

**14. Solarium segue como receita prevista.** [[REC-2026-001]] (CHF 600) está `prevista` desde 06/08. A ficha do cliente no Company OS foi mexida em 31/08. Precisa confirmar com o Felipe se virou `recebida` — se virou, a cadeia `receita → caixa → OBJ-casamento-suica` nunca propagou.

---

## 5. Defeitos de grafo

### Links quebrados dentro do LBOS

Nós citados como se existissem, nunca criados:

| Alvo | Ocorrências | Citado em |
|---|---:|---|
| `[[CON-2026-005]]` | 7 | TAR-2026-005, DEC-2026-003, DEC-2026-004 |
| `[[TAR-2026-011]]` | 4 | real-vision/HISTORICO, real-vision/PROJETO, inbox |
| `[[CON-2026-006]]` | 3 | TAR-2026-005 |
| `[[VisionVault — painel do Company OS]]` | 3 | visionvault/riscos |
| `[[Real Vision — operação]]` | 2 | visionvault/PROJETO |
| `[[TEXTO-BASE-EMAIL-v2-2026-08-20]]` | 1 | TAR-2026-005 |
| `[[2026-08-20-servicos-google-merchant-loja-site]]` | 1 | INBOX |

Os dois com travessão são erro de forma, não de conteúdo: apontam para o `nome:` do nó em vez do nome do arquivo. Correção barata.

No vault inteiro (LBOS + Company OS) são **156 alvos quebrados em 296 ocorrências** — a maioria fora do LBOS, em `skills/` citando skills umas às outras.

### Vocabulário fora da convenção

`tipo: hub` (9 arquivos) e `tipo: apoio` (28 arquivos) são usados sistematicamente, mas **nenhum dos dois está na lista de 15 tipos oficiais** do §3. Pelo §5 da própria convenção, "vocabulário fora da lista não existe".

São 37 arquivos, ou seja: a prática já decidiu. O caminho barato é adicionar os dois tipos ao [[CONVENCOES]] com um parágrafo explicando o papel de cada um, não reclassificar 37 arquivos.

Mesma situação, menor escala: 33 chaves de frontmatter fora do conjunto documentado (`data_prevista`, `severidade`, `mitigado_por`, `horizonte`, `motivo_pausa`, `etapa_atual`...). Quase todas nascem dos próprios templates oficiais, então são legítimas — só nunca foram escritas na convenção.

### Nós sem nenhuma aresta

8 nós fora do grafo: o `LBOS-v1.0` (aceitável, é spec congelada), 2 notas de inbox e as 5 notas de `09-Arquivo`.

### Arquivo sem marca de arquivado

Nenhuma das 5 notas em `09-Arquivo/` tem `status: arquivado`. A regra 4 ("nunca apagar, arquivar com `status: arquivado`") foi cumprida pela metade: moveram, não marcaram.

### Revisões vencidas

16 nós com `proxima_revisao` no passado. Os mais antigos:

| Vencida em | Nó |
|---|---|
| 2026-08-11 | [[OBJ-casamento-suica]] |
| 2026-08-13 | `sunbite/RSC-2026-001` |
| 2026-08-21 | `sunbite/RSC-2026-002` |
| 2026-08-24 | [[SINCRONIA-GIT]], `paraty-onboard/PROJETO` |
| 2026-09-06 | 11 nós, incluindo [[LBOS]] e 4 dos PROJETO.md |

Sem as Bases, ninguém ia perceber. É exatamente o buraco que a Base de saúde deveria tapar.

---

## 6. Onde o sistema parou

93 dos 96 nós datados foram atualizados em agosto. Três em setembro, todos no dia 02.

O último commit em `00-Sistema`, `01-Objetivos`, `03-Financeiro`, `06-Pessoas`, `08-Decisoes` e `09-Arquivo` é **20/08/2026**. Nesse mesmo período o Company OS recebeu 16 commits: cliente novo, campanha de WhatsApp, migração de banco, aula de curso, correções de email marketing.

O diagnóstico não é de estrutura. É que o passo 7 do fluxo — registro de volta no grafo — deixou de acontecer quando o trabalho real esquentou.

---

## 7. Fila de correção proposta (fase 6)

Ordem por risco, não por esforço.

### Bloco A — o que pode custar dinheiro ou prazo (fazer primeiro)

| # | O quê | Bloqueio |
|---|---|---|
| A1 | Confirmar se a Certidão de Nascimento venceu em 11/08 e o que isso faz com [[DES-2026-001]] | **Precisa do Felipe** |
| A2 | Confirmar se [[REC-2026-001]] (Solarium, CHF 600) foi recebida | **Precisa do Felipe** |
| A3 | Alinhar [[OBJ-casamento-suica]] com o projeto pausado, e renovar a revisão | Depende de A1 |
| A4 | Trazer para o LBOS a migração do Supabase da Vila dos Corais + o risco de SMTP | Posso fazer, dado o OK |

### Bloco B — o que está mentindo hoje

| # | O quê |
|---|---|
| B1 | Resolver a fase do sistema em [[LBOS]] (frontmatter × tabela) |
| B2 | Corrigir o status das Bases: "planejada", não "construída" — ou construir as 3 |
| B3 | Corrigir a referência ao `AGENTE.md` |
| B4 | Refazer a "Fila atual" do [[INBOX]] com as 3 notas reais |
| B5 | Completar a tabela de [[02-Projetos/README]] com os 7 projetos e o status real de cada um |
| B6 | Atualizar a tabela de clientes em [[02-Projetos/real-vision/PROJETO]] e decidir se o Moreno entra no grafo |
| B7 | Ajustar o `03-Financeiro/README` para descrever a pasta que existe |
| B8 | Decidir o destino do `04-Interagente/` (usar, ou marcar como não implementado) e resolver o 04 duplicado |
| B9 | Substituir o `LBOS/README.md` da raiz por um ponteiro para [[LBOS]] |

### Bloco C — higiene do grafo (mecânico, posso rodar em lote)

| # | O quê | Volume |
|---|---|---:|
| C1 | Adicionar `tipo: hub` e `tipo: apoio` ao [[CONVENCOES]], mais as 33 chaves que os templates já usam | 1 arquivo |
| C2 | Criar os nós faltantes ou remover os links: CON-2026-005, CON-2026-006, TAR-2026-011 | 3 nós |
| C3 | Corrigir os 2 wikilinks que apontam para `nome:` em vez de nome de arquivo | 5 ocorrências |
| C4 | Marcar `status: arquivado` nas 5 notas de `09-Arquivo/` | 5 arquivos |
| C5 | Preencher `id` e `proxima_revisao` onde faltam | 46 e 60 arquivos |
| C6 | Adicionar `## Histórico` nos 65 arquivos sem a seção | 65 arquivos |
| C7 | Renovar as 16 revisões vencidas | 16 arquivos |

C5 e C6 mexem em quase metade dos arquivos do LBOS. Vale rodar em lote, um commit por bloco, para o diff ficar legível.

### O que fica de fora sem decisão do Felipe

- Absorver `Felipe Garcia/` (Missão 1 / Fase 5) — segue travada na questão do `AGENTE.md`
- Trazer os outros 18 clientes do Company OS para o grafo — pode ser deliberado que não devem vir, já que o nó Real Vision é ponte, não gerente
- Construir as 3 Bases

---

---

## 8. Fase 6 — primeira rodada, aplicada em 08/09/2026

O Felipe respondeu as perguntas do Bloco A e tomou as decisões de escopo. O que isso destravou foi aplicado no mesmo dia. **9 arquivos tocados, nenhum apagado.**

### Respostas que fecharam o Bloco A

| Pergunta | Resposta do Felipe |
|---|---|
| A certidão venceu? | **Sim.** Precisa tirar de novo. O caixa foi para a passagem, ele está na Suíça, o casamento não andou |
| A despesa de R$ 2.517 ocorreu? | **Não.** Nada foi pago |
| A receita do Solarium entrou? | **Não.** Conversa com o Gabriel ainda aberta |
| Os 18 clientes entram no grafo? | **Não.** Cliente é uma coisa só, mora em `operacao/clientes/` |
| `04-Documentos` precisa de nós? | **Não por enquanto.** Fica de pé, vazia, para o futuro |
| Vila dos Corais? | Tem várias atualizações, mas o Felipe vai **agendar depois** |
| Moreno? | Parou numa pergunta sobre tour, sem evolução. **Fica parado** |

### O que mudou nos nós

| Nó | Mudança |
|---|---|
| [[02-Projetos/casamento/PROJETO]] | Vencimento da certidão confirmado e datado; cadeia de documentos recomeça; base do Felipe na Suíça registrada; Escritura (13/10) passa a ser o prazo ativo; aberta a pergunta de logística presencial × procuração |
| [[OBJ-casamento-suica]] | `ativo` → `pausado`, alinhado ao projeto; estado atual reescrito; progresso registrado como **menor** que os ~15% anteriores |
| [[DES-2026-001]] | Confirmada como não ocorrida; alerta de que R$ 2.517 **não é mais** o custo de retomada — falta somar reemissão e novo apostilamento |
| [[REC-2026-001]] | Confirmada como não recebida, conversa aberta; registrado que o objetivo segue sem nenhuma fonte de caixa |
| [[DEC-2026-005]] | **Nó novo.** Fecha a fronteira: clientes ficam no Company OS; `04-Documentos` fica vazia de propósito; Moreno fora |
| [[02-Projetos/real-vision/PROJETO]] | Tabela de clientes corrigida (migração da Vila dos Corais é concluída, não "em andamento"); pendência da Vila registrada como agendada; Moreno explicitamente fora |
| [[INBOX]] | Fila reconciliada: 3 notas reais; link quebrado corrigido com o assunto preservado no corpo |
| [[02-Projetos/README]] | 5 → 7 projetos, com o `status` real de cada um |
| [[LBOS]] | `fase_atual` corrigida; Fase 3 rebaixada para parcial (as Bases não existem); travamento da Fase 5 explicado — o arquivo é `AGENTS.md` e a pergunta real é copiar × mover |

### O que a decisão do Felipe fez com os números

A cobertura de `02-Projetos` deixa de ser medida contra a carteira de 20 clientes. Com [[DEC-2026-005]], os 7 projetos que existem **são** o escopo, e a pasta passa de ~45% para completa. `04-Documentos` deixa de contar como 0% de buraco e passa a contar como vazia por decisão.

Sobra como cobertura real a construir: as **3 Bases** da Fase 3 e a definição do escopo de `01-Objetivos` (hoje só o casamento).

### O que continua aberto

| # | Item | Espera |
|---|---|---|
| 1 | Custo da reemissão da certidão + novo apostilamento | Levantamento, quando o processo for retomado |
| 2 | Logística presencial × procuração (Felipe na Suíça, cartório e consulado no Brasil) | Decisão do Felipe |
| 3 | Atualização de conteúdo da Vila dos Corais (reunião 21/08, deck 31/08, migração Supabase 01/09, risco de SMTP) | Felipe vai agendar |
| 4 | Missão 1 — absorver `Felipe Garcia/`: copiar ou mover? | Decisão do Felipe |
| 5 | Construir as 3 Bases | Aprovação |
| 6 | Bloco C inteiro — higiene em lote (IDs, revisões, históricos, links quebrados, `tipo: hub`/`apoio` na convenção) | Aprovação |

Os Blocos B e C da seção 7 seguem válidos no que não foi tocado: `03-Financeiro/README`, `04-Interagente`, o `README.md` da raiz, as notas de `09-Arquivo` sem `status: arquivado`, e os nós citados mas nunca criados (CON-2026-005, CON-2026-006, TAR-2026-011).

---

## Relacionados

- Pertence a: [[LBOS]]
- Audita: [[CONVENCOES]], [[ARQUITETURA]], [[FLUXO-DOCUMENTO-VIVO]]
- Origina: [[DEC-2026-005]]
- Referencia: [[INBOX]], [[OBJ-casamento-suica]], [[02-Projetos/real-vision/PROJETO]], [[02-Projetos/casamento/PROJETO]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-09-08 | Auditoria criada | Felipe pediu leitura completa do LBOS antes de atualizar | Mede 55% de conformidade e 14 contradições confirmadas; nenhum nó alterado | Fase 6 (correção) espera aprovação |
| 2026-09-08 | Seção 8 adicionada: primeira rodada da fase 6 aplicada | Felipe respondeu o Bloco A e decidiu a fronteira dos clientes | 9 arquivos atualizados; cobertura de `02-Projetos` deixa de ser buraco por decisão | [[DEC-2026-005]] |
