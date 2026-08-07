# Automação de Newsletter 3x/semana — Pesquisa e Arquitetura

> **Data:** 07/08/2026
> **Status:** pesquisa e proposta. **Nada construído, nada configurado, nada disparado.**
> **Pedido do Felipe:** automatizar 3 emails/semana com conteúdo relevante, levando a lista para
> ler um blog post do site. Gancho inicial: os emails do Neil Patel que chegam na caixa dele.
> Docs relacionados: [[00-ESTRATEGIA]] · [[02-TIMELINE]] · [[03-SEGMENTACAO-CONTATOS]] · skill `rv-email`

---

## RESUMO EXECUTIVO (versão curta)

**A ideia original — "chegou email do Neil → adapta → dispara" — não sobrevive ao contato com os dados.** Três motivos, todos verificados nesta sessão:

1. **Metade do que ele manda é anúncio dele, não conteúdo.** Dos 13 emails dos últimos 60 dias, 6 são convite de webinar, venda de plano Ubersuggest ou "SEO Week fecha amanhã". Adaptar isso produziria propaganda do Ubersuggest em português.
2. **A frequência dele não é a nossa.** São ~4-5/semana, não 3. Amarrar nossa cadência à dele entrega o controle do nosso calendário pra um remetente externo.
3. **Adaptar conteúdo genérico gera conteúdo genérico.** Neil escreve pra um público de SaaS americano. Traduzir isso dá português genérico — exatamente o que o Felipe disse que não quer.

**O reposicionamento que resolve:** o Neil deixa de ser *fonte de conteúdo* e vira **sinal de pauta**. A fonte de conteúdo passa a ser o que já temos e ele não tem: **21 blog posts publicados** (PT/EN/DE) e a operação real da Real Vision.

**A arquitetura recomendada:**

```
Segunda/Quarta/Sexta, 7h
   ↓
Routine do Claude Code dispara (cron) — tem acesso ao vault, à VOZ.md e à skill rv-email
   ↓
Escolhe a próxima PAUTA da fila (ângulo + blog post de destino)
   ↓
Escreve o email + roda o loop de auto-crítica que já existe no rv-email
   ↓
Envia SÓ pro email do Felipe (via hermes-send, contato de teste)
   ↓
Felipe abre no celular. Se aprovar → toca UM botão no próprio email
   ↓
Edge Function nova `hermes-approve` valida o token e dispara pros 28 contatos ativos
```

**Custo real:** 1 Edge Function nova (`hermes-approve`), 2 tabelas novas (`email_pautas`, `email_aprovacoes`), 1 Routine. O resto já existe e está no ar.

**Os três avisos honestos, antes de qualquer linha de código:**

| # | Aviso | Por quê |
|---|---|---|
| 1 | **A lista tem 28 pessoas.** | Ir de ~1 email/mês pra 13/mês numa lista de 28 é multiplicar por 13 a chance de descadastro e de queixa de spam, sobre uma base pequena demais pra gerar retorno comercial. O gargalo do negócio hoje é tamanho de lista, não frequência de envio. |
| 2 | **Não medimos nada hoje.** | `email_envios` grava o `resend_id` e para por aí. `email_ab_testes` tem **0 linhas** — o A/B nunca rodou. Subir pra 3x/semana sem taxa de abertura é queimar a lista no escuro. |
| 3 | **21 posts não sustentam 156 emails/ano se cada email for "leia esse post".** | A matemática só fecha se a unidade de trabalho for **ângulo**, não post. Detalhado na seção 4. |

**Recomendação de cadência:** começar **1x/semana**, subir pra 2x depois de 4 semanas com descadastro estável, e só então 3x. A automação já é construída pra 3x — o que muda é a frequência do cron, uma linha.

---

## 1. O QUE FOI VERIFICADO (dados reais, 07/08/2026)

Nada aqui é estimativa. Tudo foi consultado ao vivo nesta sessão.

### 1.1 Os emails do Neil Patel

Remetente único: `np@neilpatel.com`. Últimos 60 dias, 13 emails:

| Data | Assunto | Tem conteúdo aproveitável? |
|---|---|---|
| 06/08 | SEO has changed. Has your strategy? | Sim |
| 05/08 | The easiest way to grow revenue (without more traffic) | Sim |
| 04/08 | The future of marketing | **Não** — convite de summit |
| 03/08 | The search funnel has changed (webinar invite) | **Não** — convite |
| 30/07 | The search funnel has changed (webinar invite) — reenvio | **Não** — convite repetido |
| 29/07 | AI isn't replacing SEO's. It's exposing weak strategies | Sim |
| 28/07 | AI search just got better for marketers | Sim |
| 26/07 | SEO Week closes tomorrow (5 months free) | **Não** — venda |
| 23/07 | AI Isn't changing email (webinar invite) | **Não** — convite |
| 22/07 | Discovery doesn't start on Google, it starts here | Sim — traz dado de pesquisa próprio |
| 21/07 | This is what holds your website back | Sim |
| 20/07 | Which Ubersuggest plan fits how you work | **Não** — venda de plano |
| 16/07 | AI is changing email marketing | Sim |

**7 de 13 têm conteúdo. 6 são anúncio.** Uma automação sem portão de triagem erra ~46% das vezes.

Observação: ele inclusive **reenvia o mesmo assunto** (30/07 e 03/08). Dedupe por assunto é obrigatório.

### 1.2 O estoque de conteúdo — 21 blog posts publicados

Conferido em `src/data/blog-posts.ts` no repo `real-vision-core` (570 KB, 21 posts, cada um com slug em **PT, EN e DE**).

| Categoria | Qtde | Exemplos de slug (PT) |
|---|---|---|
| Reflexões | 8 | `trabalho-opcional-elon-musk-donos-robos` · `riscos-inteligencia-artificial-hack-openai-hugging-face` · `diferenca-entre-llm-e-slm` · `anthropic-ia-chinesa-eua-baniram-proprios-modelos` |
| Presença Digital | 6 | `site-maior-ativo-era-ia` · `google-meu-negocio-guia-completo-negocios-locais` · `por-que-seu-negocio-precisa-site-profissional` · `street-view-linha-azul-pratigi` |
| Bastidores | 4 | `solarium-aarau-primeiro-cliente-internacional` · `bastidores-tour-360-universo-paralello-18` · `drones-em-2026-alem-da-fotografia` |
| Tutoriais | 1 | `como-escolher-camera-360-producao-profissional` |
| Outros | 2 | `fotografia-360-era-dslr-acabou-2026` · `reflexoes-presenca-digital-negocios-locais` |

Datas vão de **10/03/2025 a 24/07/2026**. Os mais recentes são de 24/07/2026.

> ⚠️ O `BLOG-POSTS-PIPELINE.md` está desatualizado: lista só 2 posts como publicados e vários como "📝 ideia" que na verdade já estão no ar (ex: `fim-das-tarefas-repetitivas-socio-digital-real-vision`, `como-pequenas-empresas-estao-substituindo-tarefas-por-socio-digital`). **Corrigir esse doc é pré-requisito** — a automação vai ler a fila de pautas, e se a fonte estiver errada ela erra junto.

### 1.3 A infraestrutura de envio — já existe e está no ar

| Componente | Estado verificado |
|---|---|
| `hermes-send` (Edge Function) | **ATIVA**, v12, `verify_jwt: false`, auth por header `x-hermes-key` |
| Payload | `{ contato_id, sequencia_id, assunto, html, variante_ab }` |
| Remetente | `Real Vision <contato@realvisionmaps.com>` |
| Descadastro LGPD | **Injetado automaticamente** — link `/descadastro?id=<contato_id>` no rodapé |
| Trava de segurança | Recusa contato com `status != 'ativo'` (HTTP 422) |
| Registro | Insere em `email_envios` com `resend_id` |
| `email_contatos` | 28 linhas, **todas `ativo`**. Colunas: `id, nome, email, idioma, origem_consentimento, status, cliente_id, criado_em, descadastrado_em, tags[]` |
| `email_envios` | 38 linhas |
| `email_sequencias` | 2 linhas (campanhas 001 e 002) |
| `email_ab_testes` | **0 linhas** |
| DNS | SPF + DKIM + DMARC verificados na Hostinger |
| Formato visual | Campanha 002 já foi feita em estilo Neil Patel (masthead, foto na assinatura, P.S.) — template em `skills/rv-email/assets/template-newsletter.html` |

**Limitação estrutural do `hermes-send`: manda para UM contato por chamada.** Não tem endpoint de lote. Pra 28 contatos são 28 chamadas em loop. Funciona bem nessa escala; acima de ~500 contatos vira fila com retry (Resend tem limite de taxa padrão de 2 req/s).

**A coluna `idioma` já existe** e os posts já têm slug PT/EN/DE. Ou seja: a segmentação por idioma pros clientes da Suíça está destravada do lado dos dados — é só usar.

---

## 2. AS OPÇÕES DE ARQUITETURA (e por que a escolhida ganhou)

### 2.1 O gatilho — o que faz a coisa acordar

| Opção | Como funciona | Veredito |
|---|---|---|
| **Gmail push (Pub/Sub)** | `users.watch` publica num tópico do Google Cloud a cada email novo | ❌ **Descartado.** Exige projeto no GCP, o `watch` **expira a cada 7 dias** e precisa de renovação automática — se a renovação falhar em silêncio, a automação morre sem avisar. Complexidade alta pra um gatilho que a gente nem quer mais (ver 2.2) |
| **Polling do Gmail** | Consulta a caixa a cada N minutos | ⚠️ Viável, e o OAuth do Google **já existe nesse Supabase** (`user_google_calendar_tokens` + funções `google-calendar-oauth`/`-sync`) — dá pra reaproveitar o fluxo pro escopo do Gmail. Mas continua amarrando nossa cadência à dele |
| **n8n (Cloudfy)** | Instância já paga e ociosa desde julho | ⚠️ Boa pra transporte, ruim pro miolo. O passo difícil é *escrever na voz da Real Vision*, e isso exige o vault + `VOZ.md` + skill `rv-email`. No n8n viraria uma chamada de API a um LLM sem esse contexto. Além disso, [[ANALISE-MIGRACAO-N8N-2026-07-16]] listou 4 pendências da instância que **nunca foram confirmadas** (teto de execuções, workflows ativos, URL pública, gestão de credenciais) |
| **✅ Routine do Claude Code** | Cron dispara uma sessão nova com acesso ao vault | **Escolhida.** É o único caminho em que o passo de escrita roda *dentro* do contexto que já contém a voz, as skills, os clientes e os posts. Zero infra nova pro gatilho |
| **Claude Agent SDK no VPS** | Headless, `claude -p` em cron no Hostinger | Alternativa real se um dia quiser tirar da nuvem. Desde 15/06/2026 o SDK consome um pool de créditos separado da assinatura — vira custo variável a monitorar. Fica como plano B |

### 2.2 A decisão que muda o desenho: cadência fixa, não reativa

O pedido original era reativo ("assim que esse cara manda um email"). O pedido real, dito na segunda mensagem, é **"3 vezes por semana"** — e os dois são incompatíveis, porque ele manda 4-5.

**Cadência fixa ganha**, por três razões:
- Newsletter com dia fixo treina o leitor (Walker: *Eventos & Rituais*, um dos 9 gatilhos que a skill `rv-email` já usa).
- Desacopla nossa operação de um remetente externo. Se o Neil parar de mandar, ou trocar de ESP, ou o email cair em Promoções, nossa newsletter não para.
- Torna a fila de pautas planejável em vez de sortear pauta pelo que caiu na caixa.

O Neil continua no fluxo — como **sinal de pauta**, não como gatilho. Ver seção 3.2.

### 2.3 O fluxo de aprovação no celular

O pedido: "recebo no celular, se tiver legal dou um ok e vai pra lista".

| Opção | Veredito |
|---|---|
| Responder "OK" no email de teste | Exige receber email de volta (Resend Inbound ou Cloudflare Email Routing) + parsing. Infra nova, e parsing de resposta é frágil (assinatura, "Re:", HTML) |
| Bot no Telegram | Já existe uma Edge Function `telegram` v6 no projeto (não consegui ler o bundle — o Supabase devolveu erro 500 ao buscar). Botões funcionam bem, mas adiciona um canal a manter |
| **✅ Botão no próprio email de teste** | **Escolhida.** Um link assinado no rodapé do email de teste: *"✅ Aprovar e enviar para os 28"*. Um toque no celular. Funciona em qualquer aparelho, sem app, sem canal novo |

**Segurança desse botão — inegociável.** Quem tiver a URL dispara um broadcast. Portanto:
- token aleatório de 32+ bytes, **uso único**, invalidado ao usar;
- **expira em 24h**;
- o `hermes-approve` confere o token contra a tabela `email_aprovacoes` antes de qualquer envio;
- página de confirmação intermediária ("Confirmar envio para 28 contatos?") — evita disparo por prefetch de link do Gmail/iOS, que é um problema real e conhecido.

---

## 3. COMO FAZER O CONTEÚDO SER REAL E AUTÊNTICO

Essa foi a pergunta central do Felipe, e é a parte que nenhuma ferramenta resolve sozinha.

### 3.1 Por que o conteúdo do Neil soa genérico pra gente

Não é porque ele escreve mal — escreve bem. É porque ele escreve **pra ninguém em particular**: um público enorme de marketing/SaaS, majoritariamente americano. Conteúdo que serve pra todo mundo não fala especificamente com ninguém.

A Real Vision tem exatamente o oposto, e é aí que está o ativo: **especificidade que ele estruturalmente não pode ter.** Ele nunca vai poder escrever "o tour da pousada em Barra Grande", nem "o primeiro cliente internacional em Aarau", nem "o que aconteceu quando publiquei a Linha Azul no Pratigi".

**Traduzir o Neil = pegar o material genérico dele e deixar genérico em português.** É o pior dos dois mundos: perde a especificidade dele (dados de pesquisa própria) e não ganha a nossa.

### 3.2 O mecanismo: regra da Prova de Campo

Regra estrutural, não questão de gosto. **Todo email precisa carregar pelo menos uma coisa que só a Real Vision poderia dizer.** Uma das quatro:

| Tipo de prova | Onde buscar | Exemplo real disponível |
|---|---|---|
| **Número nosso** | GBP Insights, GA4, Search Console | +3 milhões de visualizações no Maps · Nível 8 de Local Guide |
| **Cliente real** | `operacao/clientes/`, `operacao/projetos/` | Solarium Aarau (1º internacional) · Universo Paralello · Linha Azul do Pratigi |
| **Bastidor da operação** | A semana do Felipe | "essa newsletter que você tá lendo foi escrita por uma automação que eu montei — e é isso que eu instalo nos clientes" |
| **Opinião com risco** | Felipe | Posição que dá pra discordar. Post do Elon Musk e o dos riscos de IA já fazem isso |

O 3º tipo é o mais subaproveitado e o mais forte: **a Real Vision vende automação com IA e opera com automação com IA.** A própria existência dessa newsletter automatizada é prova de venda. Isso o Neil não tem.

**Como isso vira automação de verdade:** o loop de auto-crítica da skill `rv-email` já existe e já roda 8 checagens antes de entregar. Adiciona-se uma nona, bloqueante:

```
- Tem Prova de Campo? [qual, e de que tipo]
Se não tiver → NÃO ENTREGA. Volta e busca no vault, ou marca a pauta
  como "precisa de input do Felipe" e pula pra próxima da fila.
```

Isso é o que impede a automação de virar máquina de encher linguiça. Ela **prefere pular um envio a mandar algo vazio** — e isso precisa ser regra explícita, porque o comportamento padrão de qualquer gerador é sempre produzir alguma coisa.

### 3.3 O papel que sobra pro Neil: detector de pauta quente

Ele é bom em uma coisa específica: **farejar o que o mercado está discutindo agora**. Olhando os assuntos dele — busca com IA, AI Overviews, funil de descoberta mudando, descoberta começando em rede social e não no Google — é exatamente a tese de **GEO** que a Real Vision já defende.

Então o fluxo com ele é:

```
Email do Neil chega (label automática no Gmail)
   ↓
Portão de triagem: é conteúdo ou é anúncio dele?
  (heurística: assunto com "webinar", "invite", "closes", "% off",
   "plan", "free months", "summit" → descarta. Dedupe por assunto.)
   ↓ (só o que passou)
Extrai o TEMA, não o texto
   ↓
Cruza com os 21 posts: já temos post sobre isso?
   ↓
   ├── TEM → vira pauta na fila: "tema quente do mercado + nosso post + nossa prova de campo"
   └── NÃO TEM → vira sugestão de pauta de blog post novo (entra no BLOG-POSTS-PIPELINE)
```

Ele nunca fornece frase. Fornece **tema**. A frase é sempre nossa.

---

## 4. A MATEMÁTICA DO CONTEÚDO — resolvendo o "às vezes não tenho conteúdo"

Esse foi o problema que o Felipe descreveu, e ele é real. Mas a solução não é buscar conteúdo fora.

**O erro de conta:** 3 emails/semana = 13/mês = **156/ano**. Com 21 posts, se cada email aponta pra um post novo, o catálogo acaba em **7 semanas**.

**A correção: a unidade de trabalho é ÂNGULO, não post.**

Um único post rende vários emails, porque um email não é o resumo do post — é **uma porta de entrada específica pra ele**.

Exemplo com `google-meu-negocio-guia-completo-negocios-locais` (1 post → 5 emails):

| # | Ângulo do email | Prova de campo |
|---|---|---|
| 1 | "Categoria errada no GMN faz você sumir da busca" | Print de um cliente real antes/depois |
| 2 | "Foto de celular vs. foto profissional no perfil: o que muda nas ligações" | Número do GBP Insights de um cliente |
| 3 | "Respondi 40 avaliações de um cliente. O que aconteceu no mês seguinte" | Bastidor da operação |
| 4 | "Por que o Maps te mostra pra quem tá a 3km e não a 10km" | +3M de visualizações, Local Guide N8 |
| 5 | "O que a IA generativa lê do seu GMN quando alguém pergunta pro ChatGPT" | Tese GEO + post do Solarium |

Todos os 5 levam pro **mesmo post**. Nenhum é repetido, porque cada um abre por uma dor diferente.

**A conta refeita:**

| | |
|---|---|
| 21 posts × 3 ângulos (conservador) | **63 emails** |
| A 3x/semana | ~5 meses de fila |
| A 1x/semana (cadência inicial recomendada) | **~15 meses** |
| \+ posts novos que o Felipe publicar no período | soma em cima |
| \+ evergreen revisitado após 6 meses (assinante novo nunca viu) | soma de novo |

**O estoque não é o gargalo. A falta de uma fila organizada era.**

Por isso a tabela `email_pautas`: ela transforma "não tenho conteúdo" (sensação) em "tenho 63 ângulos, 11 usados, 52 na fila" (fato). E o Felipe consegue enfileirar 10 ângulos de uma vez num domingo, em vez de inventar um email toda segunda.

---

## 5. O QUE PRECISA SER CONSTRUÍDO

Ordenado por dependência. Nada disso existe hoje.

### Fase 0 — Antes de automatizar qualquer coisa (bloqueante)

- [ ] **Ligar medição.** Webhook do Resend (`email.opened`, `email.clicked`, `email.bounced`, `email.complained`) → Edge Function → colunas novas em `email_envios`. **Sem isso, subir a frequência é operar no escuro.** É o item mais importante da lista inteira e o mais barato.
- [ ] **Corrigir o `BLOG-POSTS-PIPELINE.md`** — hoje diz 2 posts publicados, são 21.
- [ ] **Definir o contato de teste do Felipe** em `email_contatos` com tag própria (ex: `tags = ['teste']`), pra ele nunca entrar no disparo geral.
- [ ] **Decidir a cadência inicial.** Recomendação: 1x/semana por 4 semanas.

### Fase 1 — A fila de pautas

- [ ] Tabela `email_pautas`: `id, angulo, post_slug, prova_de_campo, status (fila|usada|precisa_input), idioma, prioridade, tema_origem, criada_em, usada_em`
- [ ] Popular com ~20 ângulos iniciais (Claude gera a partir dos 21 posts, Felipe revisa e corta)

### Fase 2 — Aprovação em um toque

- [ ] Tabela `email_aprovacoes`: `id, token, assunto, html, sequencia_id, status, expira_em, usado_em`
- [ ] Edge Function `hermes-approve`: valida token → página de confirmação → loop de `hermes-send` nos 28 ativos → marca token como usado
- [ ] Ajuste no template: bloco de aprovação só no email de teste, nunca no envio real

### Fase 3 — A Routine

- [ ] Routine (cron) Seg/Qua/Sex 7h → puxa próxima pauta → escreve → roda auto-crítica **com a checagem de Prova de Campo** → envia só pro contato de teste
- [ ] Regra explícita: **sem Prova de Campo, não envia** — marca a pauta como `precisa_input` e pula

### Fase 4 — O Neil como sinal de pauta (opcional, último)

- [ ] Filtro no Gmail: `from:np@neilpatel.com` → label `pauta-radar`
- [ ] Leitura no início da Routine, com o portão de triagem da seção 3.3
- [ ] Temas sem post correspondente → sugestão no `BLOG-POSTS-PIPELINE.md`

> Fase 4 é a última de propósito. O sistema tem que funcionar **sem** o Neil. Ele é tempero, não ingrediente.

---

## 6. RISCOS

| Risco | Gravidade | Mitigação |
|---|---|---|
| Descadastro em massa ao 13x a frequência numa lista de 28 | **Alta** | Subir gradual (1x → 2x → 3x), monitorar descadastro a cada envio, parar se passar de ~2% |
| Reputação do domínio `realvisionmaps.com` queimada por queixa de spam | **Alta** | Descadastro fácil já está automático no `hermes-send`. Monitorar `email.complained` via webhook |
| Botão de aprovação disparado por prefetch de link (Gmail/iOS fazem isso) | **Alta** | Página de confirmação intermediária — nunca disparar no GET direto |
| Automação produzindo conteúdo vazio pra cumprir cadência | **Média** | Regra da Prova de Campo bloqueante — prefere pular envio |
| Fila de pautas esgotar sem ninguém notar | **Média** | Alerta quando restarem < 5 pautas em fila |
| Ficar dependente do Neil e ele mudar de formato/parar | **Baixa** | Fase 4 é opcional por design; cadência é fixa e própria |
| Loop de 28 chamadas do `hermes-send` estourar limite do Resend | **Baixa hoje** | 28 é confortável. Acima de ~500 contatos, virar fila com retry |

---

## 7. O QUE NÃO CONSEGUI VERIFICAR

Honestidade sobre os limites desta pesquisa:

- **`realvisionmaps.com` está bloqueado pelo proxy de egress desta sessão.** Contei os posts pelo repositório (`src/data/blog-posts.ts`), não pelo site no ar. Se algum post estiver publicado mas não commitado — ou commitado e não publicado — a contagem de 21 muda.
- **A Edge Function `telegram` (v6) não pôde ser lida** — o Supabase devolveu erro 500 ao buscar o bundle. Não sei o que ela faz, então não a considerei como canal de aprovação.
- **As 4 pendências da instância n8n continuam abertas** desde 16/07 (teto de execuções, workflows ativos, URL pública, credenciais). Como a recomendação não usa n8n, isso não bloqueia — mas a fatura segue correndo por uma instância ociosa, e isso merece decisão à parte.
- **Não abri o conteúdo dos emails do Neil**, só assuntos e remetentes. A triagem conteúdo-vs-anúncio foi feita pelo assunto, que é forte mas não infalível.

---

## 8. DECISÕES QUE PRECISAM DO FELIPE

1. **Cadência inicial** — 1x/semana subindo gradual (recomendado) ou 3x/semana direto?
2. **Dias e horário** — Seg/Qua/Sex às 7h?
3. **Idioma** — só PT no começo, ou já segmentar PT/DE pelos contatos da Suíça? (a coluna `idioma` e os slugs DE já existem)
4. **Aprovação** — botão no email (recomendado) ou Telegram?
5. **Fase 0 primeiro?** — ligar a medição antes de automatizar. Recomendação forte: sim.

---

> Documento de pesquisa. Nenhuma alteração feita em produção, banco, DNS, lista ou site.
> Próximo passo: decisão do Felipe nos 5 pontos da seção 8.
