---
name: rv-pacote-ia-externa
description: Empacota o contexto do Company OS numa pasta descartável em TEMP/ para o Felipe levar a uma IA externa (ChatGPT). Use SEMPRE que ele disser "monta o pacote", "exporta o contexto", "quero levar isso pro ChatGPT", "prepara o material pra outra IA", "pacote de contexto", "vou conversar com a outra IA sobre X", ou /rv-pacote-ia-externa. Copia os arquivos INTEGRAIS (cliente, projeto, institucional, jurídico, nós do LBOS) e escreve um guia de direcionamento endereçado à IA externa, com as regras das skills escritas por extenso e a explicação de como ler frontmatter e wikilinks. Cobre só a IDA — o retorno é regido por LBOS/00-Sistema/HANDOFF-IA-EXTERNA.md. Carregar junto com `realvision`.
---

# Skill: rv-pacote-ia-externa — Exportador de Contexto

> Felipe usa uma IA externa (ChatGPT) como oficina de raciocínio. Ela não tem acesso ao vault,
> não tem sistema de skills, não entende o grafo. Esta skill monta o pacote que resolve isso.

**Esta skill cobre a IDA.** A VOLTA (como o material produzido lá fora entra no vault) já é regida por
`LBOS/00-Sistema/HANDOFF-IA-EXTERNA.md` — não reimplementar aqui, apenas apontar.

---

## 1. Princípios inegociáveis

| Princípio | O que significa na prática |
|---|---|
| **Cópia integral** | Arquivo inteiro, byte a byte. Nunca resumir, cortar seção ou "otimizar". Limite de upload do ChatGPT não é preocupação |
| **Arquivos separados** | Nunca consolidar num arquivo só. Felipe arrasta a pasta inteira pro chat |
| **Só cópia, nunca mover** | O vault não é tocado. Zero edição no original |
| **Pasta descartável** | Vive em `TEMP/`, Felipe apaga quando termina o trabalho pontual |
| **Lista antes de copiar** | Sempre mostrar a lista de arquivos escolhidos e esperar o OK. Ele tira ou acrescenta |
| **Escolha pelo objetivo** | Não existe lista fixa de anexos. O objetivo determina o que entra (§3) |

---

## 2. O fluxo

```
1. Felipe dá o objetivo       →  "quero mexer no projeto do cliente X"
2. Mapeia os arquivos          →  varre o vault pelas 5 camadas do §3
3. MOSTRA A LISTA · PARA       →  ponto de parada obrigatório
4. Cria TEMP/pacote-<slug>-<AAAA-MM-DD>/
5. Copia os arquivos integrais, renomeados com prefixo de ordem
6. Escreve 00-LEIA-PRIMEIRO.md (§4) — o guia endereçado à IA externa
7. Entrega o caminho da pasta + a mensagem inicial pra colar no chat
```

O passo 3 nunca é pulado. Mapear errado custa uma sessão inteira de raciocínio fora daqui.

---

## 3. As cinco camadas — o que entra no pacote

Decidir **pelo objetivo**, não por regra fixa. Toda camada abaixo é avaliada; entra o que o objetivo puxa.

### Camada 1 — O alvo do objetivo
O que a tarefa é sobre. Puxar a pasta inteira, não arquivos soltos.

- Cliente → `operacao/clientes/arquivos/<Nome do Cliente>/` (FICHA-CLIENTE, TIMELINE, PROJETO, propostas, briefings)
- Projeto interno → `operacao/projetos/_RV-Internos/<projeto>/` + docs, PRDs, DECISIONS, KNOWN_ISSUES
- Assunto pessoal/estratégico → os nós do LBOS envolvidos (`LBOS/0X-.../`)

### Camada 2 — Institucional (quase sempre entra)
- `AGENTS.md` — regras de trabalho, regras de ouro, tom
- `contexto/EMPRESA.md` — o que a RV vende, 5 pilares, metodologia PDI
- `contexto/VOZ.md` — tom de voz, palavras que usamos/evitamos
- `contexto/TIME.md` — quem é quem, quem decide o quê
- `contexto/DESIGN.md` — só se o objetivo toca visual/site/material gráfico

### Camada 3 — Jurídico e comercial
Entra quando o objetivo toca cliente, dinheiro, escopo, proposta ou conflito:
- `operacao/comercial/CONTRATO-PRESTACAO-SERVICOS-TEMPLATE-*.md`
- Termos e condições gerais (PT/EN)
- Template de proposta comercial, tabela de preços

### Camada 4 — Skills aplicáveis
**Não copiar o `SKILL.md` cru.** Ler a skill e **traduzir a funcionalidade em regras escritas por extenso**
dentro do `00-LEIA-PRIMEIRO.md` (§4, seção 5). O ChatGPT não tem sistema de skills — "use a skill rv-copy"
não significa nada pra ele; "nunca use travessão/em-dash, venda pela dor, frases curtas" significa.

Usar o raciocínio do `rv-skill-scout` pra decidir quais skills se aplicam ao objetivo.

### Camada 5 — Gramática do grafo
Entra **sempre que o pacote contiver qualquer arquivo do LBOS** ou qualquer `.md` com frontmatter YAML:
- `LBOS/00-Sistema/CONVENCOES.md` — vocabulário fechado de relações e status. Sem isso a IA externa inventa aresta
- `LBOS/00-Sistema/ARQUITETURA.md` — como o grafo funciona
- `LBOS/00-Sistema/LBOS.md` — nó raiz
- `LBOS/00-Sistema/FLUXO-DOCUMENTO-VIVO.md` — os 7 passos, pra ela saber que existe processo do outro lado
- `LBOS/00-Sistema/HANDOFF-IA-EXTERNA.md` — o molde de saída que ela deve produzir

### O que NUNCA entra
- `LBOS-v1.0.md` — spec congelada, não é pra IA externa opinar
- Qualquer `.env`, chave, token, senha, connection string
- Dado financeiro sensível que não esteja já no vault como nó
- `node_modules/`, binários, imagens pesadas (mencionar no guia que existem, não copiar)

---

## 4. O `00-LEIA-PRIMEIRO.md` — estrutura obrigatória

Escrito **na segunda pessoa, endereçado à IA externa**. Não é um resumo pro Felipe.

### Seção 1 — Seu papel nesta conversa
Uma frase sobre o objetivo + o que ela deve e não deve fazer. Modelo:

```markdown
Você está ajudando Felipe Garcia, fundador da Real Vision 360, a [objetivo].
Todos os arquivos anexados são cópias do sistema de conhecimento dele (Company OS).

Sua função:
1. Ajudar a pensar, pesquisar e organizar o raciocínio
2. NÃO inventar dado nenhum — nome de cliente, preço, prazo, status, número.
   Se não está nos arquivos e ele não te disse agora, você pergunta
3. NÃO decidir. Você analisa, propõe e mostra trade-offs. Quem decide é o Felipe
4. Marcar sempre o que é FATO (está nos arquivos), o que é PESQUISA sua,
   e o que é HIPÓTESE não confirmada
5. No fim, quando ele pedir, gerar o documento de handoff conforme a seção final deste guia
```

### Seção 2 — Quem é a Real Vision
Resumo curto: fundador, o que vende (5 pilares), metodologia PDI, onde opera, produto Sócio Digital.
Fatos vêm de `contexto/EMPRESA.md` — não inventar nada aqui.

### Seção 3 — Como falar (tom de voz)
Destilar `contexto/VOZ.md` em regras acionáveis: direto sem rodeios, português brasileiro,
zero jargão de IA, sem hipérbole, honestidade radical acima de parecer útil.
Listar as palavras que usamos e as que evitamos.

### Seção 4 — Mapa dos arquivos desta pasta
Tabela. Uma linha por arquivo, o que ele é e por que está aqui.

| Arquivo | O que é | Por que está aqui |
|---|---|---|

### Seção 5 — Regras operacionais aplicáveis (skills traduzidas)
O coração da skill. Uma subseção por skill relevante, com a **funcionalidade detalhada em texto corrido**:
o que ela faz, os critérios, o passo a passo, as proibições. Nunca citar o nome da skill como se fosse
um comando — ela não existe do outro lado.

Exemplo do formato:

```markdown
#### Ao escrever qualquer texto de venda ou copy
- Nunca use travessão longo (—). Substitua por vírgula, ponto ou dois-pontos
- A dor é o argumento: descreva o problema com precisão antes de oferecer a solução
- Frases curtas. Palavra simples. Se cabe em 8 palavras, não use 20
- Nomes de marca exatos: "Real Vision 360", "Google Meu Negócio", "Sócio Digital"
- Sem hipérbole ("revolucionário", "incrível", "o melhor do mercado")
```

### Seção 6 — Como ler estes arquivos (a gramática do grafo)
**Obrigatória sempre que houver frontmatter YAML no pacote.** Conteúdo mínimo:

```markdown
Vários arquivos começam com um bloco entre `---`. Isso é o frontmatter YAML, e ele
NÃO é decoração: ele é a estrutura de ligação entre os documentos.

- `[[assim]]` é um wikilink — referência a outro arquivo desta mesma pasta, não um link web
- As chaves de relação no frontmatter (`pertence_a`, `depende_de`, `afeta`, `altera`,
  `documenta`, `referencia`, `gera_receita`, `gera_despesa`, `financia`, `mitiga`,
  `impacta`, `origina_tarefa`, `decide_sobre`, `participa_de`, `originada_por`)
  são VOCABULÁRIO FECHADO. São 15 e só 15. Você não pode inventar uma chave nova.
  Se sentir falta de uma, escreva a proposta em texto — não a use no frontmatter
- `status` também é fechado: ideia, planejado, ativo, bloqueado, pausado, concluido,
  arquivado, cancelado. Entidades financeiras usam: prevista, confirmada, recebida,
  paga, cancelada
- `id` segue `TIPO-ANO-NNN` (ex: PRJ-2026-004) e NUNCA muda. Você não inventa IDs novos
- `fonte_unica: true` marca o dono do dado. Todos os outros documentos linkam pra ele,
  nunca copiam o valor. Se você vir o mesmo número em dois arquivos, um deles está errado
  — aponte isso, não escolha sozinho qual é o certo
- Relação estrutural mora no frontmatter. Menção contextual mora no corpo do texto
- Todo nó termina com uma tabela de Histórico. Ela é a linha do tempo daquele documento
```

### Seção 7 — O que produzir no fim
Apontar para o molde da seção 4 do `HANDOFF-IA-EXTERNA.md` (que está no pacote):
instrução principal ao Claude Code, contexto da sessão, um bloco por assunto separando
fato/pesquisa/hipótese, backlog por prioridade, lembrete da análise de impacto,
controle de qualidade, e a nota de procedência.

E a regra crítica: **o handoff é entrada, nunca fonte soberana.** Se ele contradisser o vault,
o conflito é mostrado, não resolvido em silêncio.

---

## 5. Convenções da pasta

```
TEMP/pacote-<slug-do-objetivo>-<AAAA-MM-DD>/
├── 00-LEIA-PRIMEIRO.md
├── 01-institucional-AGENTS.md
├── 02-institucional-EMPRESA.md
├── 03-institucional-VOZ.md
├── 10-cliente-FICHA-CLIENTE.md
├── 11-cliente-TIMELINE.md
├── 20-juridico-TERMOS-GERAIS.md
├── 30-grafo-CONVENCOES.md
└── 31-grafo-HANDOFF-IA-EXTERNA.md
```

- Prefixo numérico define a ordem de leitura. Faixas: `00` guia · `0X` institucional ·
  `1X` alvo do objetivo · `2X` jurídico · `3X` grafo/LBOS
- Nome original preservado depois do prefixo e da categoria — Felipe precisa reconhecer o arquivo
- Nada de subpastas. Tudo plano, pra arrastar de uma vez

---

## 6. Entrega ao Felipe

Ao terminar, devolver:

1. Caminho clicável da pasta
2. Contagem: quantos arquivos, quais camadas entraram
3. **A mensagem inicial pronta pra colar no ChatGPT**, em bloco de código:

```
Anexei uma pasta de contexto. Comece lendo o 00-LEIA-PRIMEIRO.md antes de
qualquer coisa — ele explica quem eu sou, como esses arquivos funcionam e
o que você pode e não pode fazer. Depois me confirma o que entendeu.
Objetivo desta conversa: [objetivo]
```

4. Lembrete de que a pasta é descartável e ele apaga quando terminar

---

## 7. Checklist antes de fechar

- [ ] Mostrei a lista e recebi o OK antes de copiar?
- [ ] Todos os arquivos são cópias **integrais**?
- [ ] Nenhum `.env`, chave ou token entrou?
- [ ] O `00-LEIA-PRIMEIRO.md` está escrito **para a IA externa**, não pro Felipe?
- [ ] As skills viraram regras por extenso, sem citar nome de skill como comando?
- [ ] Se há frontmatter no pacote, a seção 6 (gramática do grafo) está lá?
- [ ] O `HANDOFF-IA-EXTERNA.md` está no pacote pra fechar o ciclo de volta?
- [ ] O vault original ficou intocado?

---

## Relacionados

- Ciclo de volta: [[HANDOFF-IA-EXTERNA]]
- Gramática do grafo: [[CONVENCOES]] · [[ARQUITETURA]]
- Escolha de skills: [[rv-skill-scout]]
- Contexto base: [[realvision]]
