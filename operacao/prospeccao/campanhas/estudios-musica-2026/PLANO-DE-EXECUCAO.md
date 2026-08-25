# Plano de Execução — Campanha Estúdios de Música

> Escrito em 18/08/2026, depois da auditoria de ambiente e da pesquisa de boas práticas.
> **Nada deste plano foi executado.** A execução começa na próxima sessão.
> Base: `ESPECIFICACAO-CAMPANHA.md` (escopo oficial) corrigida pelo que a pesquisa mostrou
> em `pesquisa/01-boas-praticas-pesquisadas.md`.

---

## Onde estamos

| Fase | Estado |
|---|---|
| F0 — Workspace organizado | ✅ concluída em 18/08/2026 |
| F1 — Acessos e material | 🟡 parcial: Apify conectada; faltam Supabase e o pacote do vault |
| F2 — Ferramentas | ⬜ pronta para começar |
| F3 — Mercados | ⬜ |
| F4 — Amostra | ⬜ bloqueada pelo Supabase |
| F5 — Copy e campanha | ⬜ |

---

## Princípios que atravessam todas as fases

1. **Nada inventado.** Cidade, preço, prazo, volume, taxa. Marcar sempre FATO, PESQUISA ou
   HIPÓTESE.
2. **Descoberta barata, enriquecimento caro só nos únicos.** Lição do Unterentfelden,
   confirmada pela pesquisa externa.
3. **Dedup antes de qualquer escrita** no banco, nas 3 camadas do `aquisicao-contract.md`.
4. **Toda ação vira evento** append-only.
5. **Nenhuma mensagem sai sem revisão humana** frase a frase.
6. **Custo declarado antes de gastar**, nunca depois.
7. Na dúvida se algo é portão humano, é portão.

---

## F1 — Acessos e material

**Objetivo:** destravar o que a auditoria apontou como bloqueio.

| # | Tarefa | Quem | Depende de |
|---|---|---|---|
| 1.1 | Trazer o pacote do Company OS (skills e arquivos de apoio) | Felipe, via Google Drive | `PROMPT-PARA-O-VAULT.md` |
| 1.2 | Instalar as 4 skills no workspace e conferir se citam algo que não existe aqui | Claude | 1.1 |
| 1.3 | Instalar o MCP do Supabase pela interface do Claude Desktop | Felipe, orientado pela skill `mcp-install` | — |
| 1.4 | Validar leitura no `rv-acquisition` com uma consulta que não escreve nada | Claude | 1.3 |
| 1.5 | Ler o saldo de crédito da Apify em `console.apify.com` → Billing | Felipe | — |
| 1.6 | `git init` no workspace, antes de qualquer credencial entrar no `.env` | Claude | — |
| 1.7 | Conferir SPF, DKIM e DMARC do domínio que vai enviar e-mail | Claude verifica, Felipe corrige DNS se faltar | Felipe dizer qual domínio |

**Entregável:** atualização do `relatorios/01-auditoria-ambiente.md` com tudo verde ou com
o motivo de continuar vermelho.

**Portão:** 1.3 e 1.7 dependem de ação do Felipe. Não dá pra contornar.

---

## F2 — Ferramentas (Missão 2 da especificação)

**Objetivo:** provar que a Apify entrega os campos que a campanha precisa, a um custo
conhecido por negócio útil.

Campos exigidos pela especificação §9: nome, categoria, cidade, website, telefone, reviews,
quantidade de reviews, endereço, Place ID, e-mail ou enriquecimento de contato.

| # | Tarefa | Custo |
|---|---|---|
| 2.1 | Ler o esquema de entrada do `compass/crawler-google-places` e mapear campo a campo contra a lista exigida | zero |
| 2.2 | Desenhar a config de descoberta barata: `scrapePlaceDetailPage: false`, `scrapeContacts: false` | zero |
| 2.3 | Desenhar a config de enriquecimento, rodando só sobre `placeId` únicos | zero |
| 2.4 | **Teste real mínimo**, 1 cidade pequena, teto rígido de resultados, orçamento aprovado antes | a declarar antes |
| 2.5 | Medir custo por negócio útil, cobertura, taxa de acerto de e-mail, campos vazios | zero |
| 2.6 | Só se houver deficiência objetiva, comparar alternativa pelos 7 critérios da especificação §9 | zero |

**Regra de custo travada:** **não usar** os eventos `Business leads enrichment` nem
`Email verification`. No tier FREE custam US$ 0,10 cada, contra US$ 0,002 do enriquecimento
de contato comum. Ver `pesquisa/01-boas-praticas-pesquisadas.md` §4.

**Entregável:** `relatorios/02-ferramentas.md`.

**Portão:** 2.4 é o primeiro gasto real de dinheiro. Orçamento e teto declarados e
aprovados pelo Felipe antes de rodar.

---

## F3 — Mercados (Missão 3 da especificação)

**Objetivo:** escolher onde começar, por dado e não por fama. São Bernardo do Campo fora.

**Decisão que vem antes de tudo:** qual dos três tipos de estúdio é o alvo. Gravação,
ensaio, ou escola de música com estúdio. Muda categoria de busca, muda copy, muda preço.
Ver `pesquisa/01-boas-praticas-pesquisadas.md` §6.

| # | Tarefa |
|---|---|
| 3.1 | Felipe define o tipo de estúdio alvo |
| 3.2 | Montar lista de 6 a 10 regiões candidatas, com justificativa de por que entraram |
| 3.3 | Definir o critério objetivo de elegibilidade, no formato dos 4 critérios do Unterentfelden §4 |
| 3.4 | Contagem barata por região: quantos estúdios, quantos sem site, quantos com site fraco, atividade no Google, canal de contato, porte aparente, fit remoto |
| 3.5 | Shortlist de 2 ou 3 regiões com os trade-offs escritos |

**Entregável:** `relatorios/03-mercados.md`.

**Portão:** a cidade final é decisão do Felipe. Nenhuma região vira campanha oficial sem
ele.

---

## F4 — Amostra pequena (Missão 4 da especificação)

**Bloqueada até o MCP do Supabase existir.**

| # | Tarefa |
|---|---|
| 4.1 | Propor o tamanho da amostra e o custo ao Felipe, e esperar |
| 4.2 | Criar a `campaign` no banco, com `code` no padrão `<cidade>-estudios-2026-MM` |
| 4.3 | Coletar a amostra na região aprovada |
| 4.4 | **Dedup nas 3 camadas** antes de qualquer INSERT: nome mais cidade normalizados, telefone, e-mail, e fuzzy acima de 0,8 |
| 4.5 | Cruzar com o export de clientes do VisionFlow. Quem já é cliente não é prospect |
| 4.6 | Enriquecer só os únicos e elegíveis |
| 4.7 | Analisar presença digital pelas 10 lentes do Operating System §2 |
| 4.8 | Calcular o Opportunity Score, os 4 sub-scores e escrever `score_reasons` |
| 4.9 | Registrar `prospect_services`: `website` como primária, mais as secundárias identificadas |
| 4.10 | Apresentar qualidade e custo reais da amostra |

**Sobre `score_reasons`:** além de justificar a prioridade, ele é a **prova documentada de
legítimo interesse** exigida pela LGPD. Escrever o motivo objetivo do contato, por prospect,
deixa de ser boa prática e vira requisito legal.

**Pendência L2:** os códigos `website_management` e `domain_management` não constam na lista
oficial do `aquisicao-contract.md`. Resolver antes de gravar `prospect_services`.

**Portão:** tamanho da amostra, custo, e a criação da campanha oficial no banco.

---

## F5 — Copy e campanha

**Não começa antes de F4 fechada.**

### Canais, com a correção da pesquisa

A especificação previa e-mail e WhatsApp. A pesquisa mostrou que WhatsApp na abertura, para
lista raspada, é o pior caso de uso segundo a política do Meta, e o que mais derruba conta.
Proposta, sujeita à decisão do Felipe:

| Momento | Canal |
|---|---|
| Abertura | **E-mail.** Legal por legítimo interesse, sem risco de banimento, já validado no Unterentfelden |
| Depois da resposta ou do clique | **WhatsApp.** Conversa iniciada pelo prospect, risco quase zero |
| Se o Felipe insistir em WhatsApp na abertura | Número separado, nunca o comercial principal, volume baixíssimo, aceitando que o número pode queimar |

### Requisitos técnicos de envio, obrigatórios

- SPF, DKIM e DMARC passando **e alinhados** com o domínio do From.
- Descadastro em um clique, cabeçalhos `List-Unsubscribe` e `List-Unsubscribe-Post`,
  funcionando sem login, honrado em 2 dias.
- Teto de 30 a 50 e-mails por caixa por dia.
- Manter reclamação abaixo de 0,3% e bounce abaixo de 2%.
- Avaliar subdomínio de envio dedicado, para não arriscar a reputação do domínio principal.

### Estrutura da mensagem

Primeiro contato: curto, humano, direto, mostra que existe solução, preço pode aparecer,
objetivo é gerar resposta de interesse.

Segundo contato, só com interesse: o que está incluído, como funciona a adaptação do modelo,
domínio, hospedagem, processo, próximos passos.

**Nunca misturar Website com chatbot, 360 ou qualquer outro produto no primeiro contato.**

Antes de escrever qualquer linha: passar pelo `contexto/03-institucional-VOZ.md`. Sem
hipérbole, sem travessão ligando frases, sem jargão de IA.

### Critério de sucesso, definido antes de rodar

A pesquisa recomenda decidir o veredito antes de ver o resultado. A definir com o Felipe:
que taxa de resposta faz escalar, que taxa faz estreitar, que taxa faz parar.

**Portão:** copy final, criação dos rascunhos, e envio. Todos do Felipe.

---

## Ordem sugerida para a próxima sessão

1. Integrar o pacote do vault, se já tiver chegado.
2. Instalar e validar o Supabase, se o Felipe já tiver feito a parte dele.
3. **Começar a F2**, que não depende de nenhum dos dois e é onde há trabalho real a fazer.
4. Levar as decisões pendentes ao Felipe quando ele estiver disponível, não travar esperando.

## Decisões pendentes do Felipe

| # | Decisão | Trava |
|---|---|---|
| D1 | Tipo de estúdio: gravação, ensaio, ou escola com estúdio | F3 inteira |
| D2 | Ordem dos canais: aceita e-mail primeiro e WhatsApp só na resposta? | F5 |
| D3 | Qual domínio envia o e-mail, e se usa subdomínio dedicado | F5 e a checagem de DNS |
| D4 | O que acontece no ano 2, a renovação (pendência C4) | Desenho da oferta |
| D5 | Orçamento e teto do primeiro teste pago na Apify | F2.4 |
| D6 | Critério de sucesso da amostra | F4 e F5 |
