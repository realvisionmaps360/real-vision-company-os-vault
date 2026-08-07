# Timeline — Projeto Hermes (Email Marketing RV)

> Diário de bordo vivo. **Regra:** ao final de toda sessão de trabalho no email marketing,
> atualizar este arquivo (o que foi feito, decisões, próximo passo) e marcar os checkboxes
> no [[01-PLANO-EXECUCAO]]. Datas em formato absoluto. Estratégia geral: [[00-ESTRATEGIA]].

---

## Status geral

| Fase | Status | Progresso |
|---|---|---|
| Fase 1 — Agente (skill rv-email) | ✅ Concluída | 6/6 |
| Fase 2 — Máquina (Resend + Supabase) | ✅ Concluída | 6/6 |
| Fase 3 — 1ª sequência (clientes ativos) | ⏳ Não iniciada | 0/6 |
| Fase 4 — Motor frio (futuro) | 🔒 Bloqueada (depende de 1–3) | 0/3 |

**Meta de parabéns:** ⬜ pendente (dispara quando os 7 itens da Definition of Done = ✅)

---

## Registro de sessões

### 23/06/2026 — Pesquisa e planejamento
- Analisadas as 4 fontes: Hormozi, Ferdy/OmniSend, Jeff Walker, Lead Gen Jay.
- Definida a estratégia "Megazord" (cérebro/voz/corpo/sistema nervoso de IA).
- **Decisões:** plataforma Resend + Supabase; público prioritário = clientes ativos;
  persona = **Hermes**; tabelas dedicadas só pro email; skill `rv-email`.
- Criada a pasta `operacao/marketing/email-marketing/` com:
  `00-ESTRATEGIA.md`, `01-PLANO-EXECUCAO.md`, `02-TIMELINE.md`.
- Explicado LGPD/consentimento; definido reverse lead magnet RV.
- **Próximo passo:** aguardando OK do Felipe pra iniciar a Fase 1 (criar a skill do Hermes).

### 23/06/2026 — Fase 1 concluída (skill rv-email)
- Criada `~/.claude/skills/rv-email/SKILL.md` com a persona Hermes completa.
- Playbook dos 4 mestres destilado: Walker (9 gatilhos + sequência 3 emails), Hormozi (estrutura fixa + regras de entregabilidade), Ferdy (segmentação por comportamento), Jay (loop de auto-melhoria).
- Regras de voz cruzadas com `contexto/VOZ.md` — bilíngue PT+DE/EN.
- Catálogo de 12 serviços embutido como banco de upsell.
- Loop de auto-crítica com critérios verificáveis antes de entregar copy ao Felipe.
- Reverse lead magnet RV documentado (conectado com `rv-prospeccao`).
- Regra de LGPD e motor quente/frio documentados.
- **Próximo passo:** Fase 2 — Resend (conta + API key + DNS) + tabelas Supabase.

### 23/06/2026 — Fase 2 concluída (máquina de envio)
- Conta Resend já existia; domínio `realvisionmaps.com` já estava Verified (região São Paulo).
- API key salva como segredo da Edge Function no Supabase.
- 4 tabelas criadas: `email_contatos`, `email_envios`, `email_sequencias`, `email_ab_testes`.
- Edge Function `hermes-send` deployed (versão 4) — auth via `HERMES_SECRET`, registra cada envio no banco, injeta link de descadastro LGPD automaticamente.
- Email de teste entregue na caixa de entrada (não spam/promoções). Acentos e emojis OK.
- **Próximo passo:** Fase 3 — confirmar lista de clientes ativos + consentimento, escrever sequência com Hermes, aprovação do Felipe, disparo real.

---

## Decisões registradas
- 23/06/2026 — Nome do agente: **Hermes**.
- 23/06/2026 — Banco: **tabelas dedicadas** (separadas do VisionFlow).
- 23/06/2026 — Plataforma: **Resend + Supabase**.
- 23/06/2026 — Prioridade: **clientes ativos** (motor quente).

### 25/06/2026 — Definição da Campanha de Reativação (13 clientes antigos)
- **Contexto:** 13 clientes de tour virtual (dez/2024–mai/2025) sem renovação e sem contato.
  Plano era anual, sem contrato formal. A campanha é o kickstart da Fase 3 do Hermes.
- **Decisões de canal:**
  - WhatsApp + Email **simultaneamente** para cada cliente.
  - Hermes escreve as 2 versões (email formal + WhatsApp mais direto).
  - No WhatsApp, perguntar se o cliente tem acesso ao email e se leu a mensagem enviada.
  - Objetivo: **estabelecer o email como canal principal** de comunicação. Se não viu o email,
    envia o conteúdo via WhatsApp também.
- **Decisões de oferta:**
  - Manter preços de hospedagem do tour: R$100/ano (só tour) · R$200 (tour + analytics).
  - Upsell principal desta campanha: **sites, landing pages e cartão digital** (preço especial
    para clientes antigos).
  - Foco primeiro em relação genuína — oferta só no Email/WA 3.
- **Segmentos identificados:**
  - Grupo A — vencidos há +6 meses (Nery, Jair, Antônio, Jucélia, Getúlio, Emerson,
    Messias, Betão, Zuleide): reaquecimento mais cuidadoso.
  - Grupo B — vencendo agora (Fernanda, Didier, Kelly): janela de urgência natural.
  - Grupo C — ainda no prazo (Ian Marques): abordagem diferente ("chegando ao fim do período").
- **Próximo passo:** Felipe envia a "capivara" (pesquisa) de cada cliente.
  Arquivo de capivara em: [[03-CLIENTES-REATIVACAO - Corrigido|03-CLIENTES-REATIVACAO]].
  Assim que tiver as capivaras, Hermes escreve Email 1 + WA 1 por segmento → revisão do Felipe → disparo.

## Decisões registradas
- 23/06/2026 — Nome do agente: **Hermes**.
- 23/06/2026 — Banco: **tabelas dedicadas** (separadas do VisionFlow).
- 23/06/2026 — Plataforma: **Resend + Supabase**.
- 23/06/2026 — Prioridade: **clientes ativos** (motor quente).
- 25/06/2026 — Canal: **WhatsApp + Email simultâneos**; email como canal principal.
- 25/06/2026 — Upsell foco: **sites, landing pages e cartão digital** a preço especial.
- 25/06/2026 — Pesquisa capivara obrigatória antes de cada mensagem (Felipe envia).

### 26/06/2026 — Fase 3 iniciada: capivaras + Email 1 + WA 1
- Felipe fez a pesquisa de campo de todos os 13 clientes (GMN, Instagram, tour, situação atual).
- Hermes preencheu as capivaras e escreveu Email 1 + WA 1 personalizados para cada cliente.
- **Decisões desta sessão:**
  - Gancho Universo Paralelo (dez/2026) usado apenas para clientes da região de Pratigi: Nery, Jair, Antônio, Jucélia, Getúlio.
  - Betão, Zuleide, Didier, Kelly e Ian Marques ficam fora desse gancho (região diferente).
  - Didier: abordagem sem oferta de site (já recusou antes) — foco em valor gratuito (adicionar tour no Linktree). Upsell de site fica pra 2ª conversa.
  - Zuleide: email explora dupla função do site (hóspedes + anunciar venda da pousada).
  - Fernanda/Siri Bar: tom pessoal (amizade com Felipe e Romana).
  - Jucélia: tom de gratidão genuína, não comercial.
  - Framework Hormozi aplicado: texto puro, 1 ideia por email, CTA único, P.S. estratégico.
- **Próximo passo:** Felipe revisa e aprova cada email/WA individualmente. Nenhum disparo sem OK explícito.
- Arquivo: `operacao/marketing/email-marketing/03-CLIENTES-REATIVACAO.md`

## Pendências / pontos abertos
- Felipe revisa e aprova os 13 emails + 13 WAs (checklist no `03-CLIENTES-REATIVACAO.md`).
- Após aprovação: disparo via Hermes (Resend) + WA manual por Felipe.
- Registrar respostas e atualizar checklist.

---

## Numeração de campanhas (a partir de 20/07/2026)

A partir de agora, cada disparo de email marketing ganha um número sequencial.

- **Campanha 001** — Reativação de clientes antigos de tour virtual (13 clientes, ver seção acima e `03-CLIENTES-REATIVACAO.md`).
- **Campanha 002** — "O erro de R$0 que muito dono de empresa tá cometendo agora" (lista geral, todos os contatos ativos).

### 20/07/2026 — Campanha 002 disparada pra lista geral
- **Contexto:** Felipe mostrou o email anterior (disparo de teste) com bug de encoding (mojibake — "não" virando "n�o") e sem nenhuma formatação HTML. Pediu pra reformatar no estilo de um email de referência do Neil Patel (Ubersuggest): logo, texto direto, negrito estratégico, P.S., assinatura com foto.
- **Correção do bug:** o `hermes-send` já declara `charset="UTF-8"` corretamente — o problema era que o disparo anterior não passou por ele (foi texto puro direto). A partir de agora, todo envio usa HTML via `hermes-send`.
- **Masthead nova:** em vez do texto "REAL VISION" em fundo preto sólido, agora usa o mesmo fundo `.grid-bg` (radial-gradients âmbar + grid pontilhado) usado na Home/RV Academy do site, com o logo real (`logo-header.png`) embutido. Gerado via Playwright (screenshot do CSS real do site) e publicado em `real-vision-site/public/email-assets/masthead-002.png`.
- **Assinatura com foto:** recorte da foto do Felipe com o drone (`felipe-drone.png`, seção "Fundador" da Home), publicada em `public/email-assets/felipe-assinatura.png`.
- **Secret do Hermes:** `HERMES_SECRET` agora vive em `.mcp.json` (raiz do vault, gitignorado) na chave `"secrets"` — Felipe regenerou o valor no Supabase Dashboard porque o valor antigo não podia ser recuperado (Supabase não expõe secrets já salvos).
- **Bug de teste (resolvido):** primeiro teste real teve um erro meu (mandei um placeholder no lugar do HTML) e depois um problema de cache do proxy de imagem do Gmail mobile (bateu bem na hora da propagação do deploy) — resolvido com cache-bust (`?v=2`) na URL das imagens.
- **Romana Loznjakovic cadastrada** na tabela `email_contatos` (`romana.loznjakovic@gmail.com`) — não estava na lista ainda.
- **Disparo:** 28 contatos ativos (`status='ativo'`), sequência `002 - Site é o maior ativo digital` marcada como `enviada` em `email_sequencias`.
- **Arquivo da campanha:** `operacao/marketing/email-marketing/campanhas/002-site-maior-ativo-digital.html`.
- **Próximo passo:** acompanhar métricas de abertura/clique no Resend, e Felipe/Romana avaliam se o formato novo (Neil Patel style) fica como padrão pras próximas campanhas.

### 22/07/2026 — Nova fonte de entrada em `email_contatos`: squeeze page da comunidade WhatsApp
Edge Function pública `capture-community-lead` (mesmo projeto Supabase do Hermes) grava direto em `email_contatos` com `origem_consentimento='blog-<slug>'`. Testado local, ainda não publicado em produção. Detalhe completo em [`TIMELINE.md`](../../projetos/_RV-Internos/campanha-google-ads-slm-llm/TIMELINE.md), entrada de 22/07/2026.

---

### 07/08/2026 — Pesquisa: automação da newsletter recorrente (nada construído ainda)

Sessão de pesquisa e arquitetura. **Nenhum código escrito, nenhum disparo, nenhuma tabela criada.**
Único write em produção: tag `teste` no contato do Felipe (ver abaixo).

**Pedido original do Felipe:** automatizar a newsletter — quando chegasse email do Neil Patel,
adaptar o conteúdo pra realidade da Real Vision, mandar pro email de teste dele e, com um OK,
disparar pra lista. Depois refinado para: **3x/semana, conteúdo relevante, levando pra ler um
blog post do site.**

**Achados que reposicionaram o pedido:**
- Dos 13 emails do Neil Patel em 60 dias, **6 são anúncio dele** (convite de webinar, venda de
  plano Ubersuggest, "SEO Week fecha amanhã"). Automação sem triagem erraria ~46% das vezes.
- A frequência dele é **~4-5/semana**, não 3. Amarrar nossa cadência à dele entrega o calendário
  a um remetente externo.
- **O site tem 21 blog posts publicados** em PT/EN/DE, não 2. O `BLOG-POSTS-PIPELINE.md` está
  desatualizado e precisa de correção — vários posts marcados "📝 ideia" já estão no ar.
- `hermes-send` envia **1 contato por chamada** (sem endpoint de lote). 28 contatos = 28 chamadas.
- **`email_ab_testes` tem 0 linhas** — o A/B nunca rodou.
- **Não existe medição de abertura/clique.** `email_envios` grava só o `resend_id`.
- Dos "28 contatos ativos", **pelo menos 6 são internos** (Felipe ×2, "Teste Felipe", Maria Luci,
  Acacio, Jeri) + 2 em alemão + Romana. Público externo real ≈ **20 clientes**. A campanha 002 foi
  disparada pros 28 contando esses.

**Decisões tomadas com o Felipe:**
- Cadência: **1x/semana subindo gradual** (aprovado), não 3x direto.
- Primeiro envio: **segunda 10h** (horário Brasil). Teste chega antes, lista recebe ao aprovar.
- Idioma: **só PT por enquanto**; os 2 contatos DE (Suíça) ficam fora desta rodada.
- Aprovação: **botão no próprio email de teste** (link assinado, uso único, expira em 24h, com
  página de confirmação intermediária pra não disparar por prefetch do Gmail/iOS). Preferido ao
  Telegram porque o email de teste **é** o email real — é o que o Felipe queria conferir no celular.
- Neil Patel deixa de ser gatilho e vira **sinal de pauta**, com portão de triagem.
- **Regra da Prova de Campo:** todo email carrega algo que só a Real Vision poderia dizer. Sem isso,
  não envia — marca a pauta como `precisa_input` e pula. É o que impede a automação de encher
  linguiça pra cumprir a cadência.
- **Solarium Aarau não pode ser citado ainda** (decisão do Felipe, 07/08). Vale pro print do
  ChatGPT recomendando o cliente, que era a prova mais forte disponível.

**Write em produção (único):** contato `realvisionmaps360@gmail.com`
(id `2df1cfcd-290b-4789-8c84-4d5b340a00a6`) recebeu `tags = ['teste']`. Ele já estava na lista e
recebeu a campanha 002 junto com os clientes. **Atenção:** a tag sozinha não exclui do disparo —
a query da campanha precisa filtrar `not ('teste' = any(tags))`.

**Documentos criados:**
- [[2026-08-07-automacao-newsletter-3x-semana-PESQUISA]] — arquitetura completa, fases, riscos
- [[2026-08-07-analise-concorrentes-e-angulos-newsletter]] — **primeira pesquisa de concorrente do
  vault** + inventário do que a RV faz + 5 ângulos

**Próximo passo (definido pelo Felipe):** trabalhar os **blog posts** — extrair a sacada de cada um
dos 21 posts e escrever um trecho curto e impactante sobre o conteúdo de cada, pra usar no email
marketing. Só depois construir a automação.

---

### 07/08/2026 — Sacadas dos 21 blog posts (matéria-prima da fila de pautas)

Os 21 posts foram baixados do `real-vision-core` (`src/data/blog-posts.ts`, commit `60ed8f6`) via
GitHub MCP — `raw.githubusercontent` dá 404 porque o repo é privado. Todos lidos na íntegra na
versão PT. **Nenhum email escrito, nenhum disparo, nada alterado em produção.**

**Entregue:** [[2026-08-07-sacadas-dos-21-blog-posts]] — para cada post, a **sacada** (a ideia mais
forte) + um **trecho curto pronto pra email**, na voz da RV, com a Prova de Campo marcada por post
(✅ tem prova própria · 🟡 dado de terceiro, prova nossa precisa vir de fora · 🔴 bloqueado).
Índice com prioridade calculada pro público atual (~20 clientes, pousadas/restaurantes locais BA).

**Solarium Aarau:** respeitado o bloqueio de 07/08 — o post 13 ficou sem trecho e fora da fila.
Registrado no documento que a menção ao cliente **respinga em outros dois posts**
(`site-maior-ativo-era-ia` cita pelo nome com o print do ChatGPT; `drones-em-2026` cita de
passagem). Tirar só o post dele da fila não resolve o bloqueio inteiro.

**Achados que precisam de decisão do Felipe:**
- `do-maps-ao-fechamento-tour-virtual-google-site` ainda chama a metodologia de **"Tríade do
  Sucesso"** — desde jul/2026 é **Sistema PDI**. Email e post vão falar coisas diferentes até o
  post ser corrigido no `real-vision-core`.
- `reflexoes-presenca-digital-negocios-locais` tem 4 min e quase só a tese — **não serve como
  destino de clique**. Ou expandir, ou redirecionar a ideia pro post do Maps/do site.
- Apareceu um post que não estava mapeado na pesquisa anterior: `crise-oportunidade-inteligencia-artificial`
  (id 17). Reforça que o `BLOG-POSTS-PIPELINE.md` precisa da correção da Fase 0.
- **Nenhum dos 21 posts serve de destino pro ângulo A** ("perguntei pro ChatGPT onde se hospedar em
  Barra Grande"). Ou vira post novo, ou o email aponta pro `site-maior-ativo-era-ia`.

**Próximo passo:** com as sacadas na mão, montar a fila (`email_pautas`) — cada post rende mais de
um ângulo, conforme a seção 4 da pesquisa. Automação depois disso.
