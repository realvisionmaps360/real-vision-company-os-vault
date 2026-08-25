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
| Fase 3 — 1ª sequência (clientes ativos) | ✅ Concluída | 6/6 |
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
- ✅ Os 13 emails da campanha 001 foram disparados em 03/07/2026 (envio manual pelo Gmail,
  confirmado por Felipe em 20/08/2026). Respostas nunca foram registradas.
- **Sem tracking de abertura/clique.** Os 31 envios da campanha 002 estão com `aberto`, `clicado` e
  `bounced` em `false` no banco. O Resend registra esses eventos, mas não existe webhook trazendo
  de volta pro Supabase. Enquanto isso não existir, métrica de campanha é zero por construção.
- **Sem interface pra ver o que foi enviado.** O disparo pelo Resend não deixa cópia em caixa de
  email nenhuma. Hoje o único jeito de saber o que saiu é consultar `email_envios` por SQL.

---

## Numeração de campanhas (a partir de 20/07/2026)

> **Consolidado em 20/08/2026:** a lista completa e atualizada vive em
> [[INDICE-CAMPANHAS]] (`campanhas/INDICE-CAMPANHAS.md`), que passou a ser a fonte única.
> A regra também foi gravada na skill `rv-email`. Este trecho fica como registro histórico.

Cada disparo de email marketing ganha um número sequencial.

- **Campanha 001** — Reativação de clientes antigos de tour virtual (13 clientes, ver seção acima e `03-CLIENTES-REATIVACAO.md`).
- **Campanha 002** — "O erro de R$0 que muito dono de empresa tá cometendo agora" (lista geral, todos os contatos ativos).
- **Campanha 003** — Drone Digital Unterentfelden (24 negócios locais na Suíça, em alemão).

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

### 20/08/2026 — Consolidação da numeração de campanhas
- **Contexto:** a numeração existia só neste arquivo, num parágrafo solto. Uma sessão anterior
  procurou o número da campanha de Unterentfelden, não encontrou o registro, e concluiu que não
  existia numeração nenhuma. Existia.
- **Criado** `campanhas/INDICE-CAMPANHAS.md` como fonte única: regra de numeração + tabela das
  campanhas 001, 002 e 003 + ficha de cada uma.
- **Gravada a regra na skill `rv-email`** (seção INFRA): ler o índice antes de qualquer campanha
  nova, número atribuído antes do primeiro envio, vale para envio manual também.
- **Campanha 003** atribuída ao projeto Drone Digital Unterentfelden.
- **Correção de status:** a Fase 3 estava marcada como "não iniciada" na tabela de status enquanto o
  resto do arquivo descrevia a campanha 001 pronta. Felipe confirmou que os 13 emails da 001 saíram
  em 03/07/2026, envio manual pelo Gmail. Fase 3 marcada como concluída.
- **Verificação da 002 no banco:** `email_sequencias` tem `002 - Site é o maior ativo digital` com
  `status='enviada'` e **31 registros** em `email_envios`, entre 17:36 e 17:48 de 20/07/2026. A
  campanha saiu. Não aparece no Gmail do Felipe porque saiu pelo Resend, não pelo Gmail.

### 21/08/2026 — Organização em pasta única, calendário editorial e Fase 1 da campanha 004
- **Contexto:** sessão longa, três blocos: (1) organizar o projeto todo numa pasta auditável,
  (2) construir o calendário de conteúdo com os 9 gatilhos de Walker, (3) escrever e testar os
  4 primeiros emails.

**Bloco 1 — Organização e aprendizado**
- Criado **hub da pasta** ([[README]]) — índice de todos os 13 documentos, infraestrutura de
  referência, estado das decisões, nota explícita sobre o LBOS (nenhum nó criado lá, por
  respeito à checagem de impacto obrigatória do sistema).
- Criado **[[04-CALENDARIO-EDITORIAL]]**: inventário real de 21 blog posts (4 eixos) e 15
  projetos de portfólio, mapa dos 9 gatilhos de Walker × ativo do site, grade de 12 emails em 3
  fases (campanhas 004, 005, 006).
- Criado **[[05-SISTEMA-RESPOSTA-PERSONALIZADA]]**: proposta (não implementada) de dossiê por
  contato, Reverse Lead Magnet, banco de aprendizado com registro de delta, escada de autonomia
  0→3, digest diário via Telegram (decidido, fica pro final da fila).
- Criado **[[06-MANUAL-APRENDIZADO]]**: escola de email marketing em 6 níveis pro Felipe
  aprender fazendo — MX/SPF/DKIM/DMARC, warm-up, A/B, segmentação, automação.
- **Diagnóstico de DNS corrigido:** checagem real (`Resolve-DnsName`) mostrou que
  `realvisionmaps.com` **tem MX próprio** (Hostinger) — a anotação antiga de "sem MX" nesta
  timeline estava errada. Felipe confirmou as caixas `contato@` e `adm@` recebem normalmente.
- **Decisões confirmadas pelo Felipe:** capacidade de agenda = 1 projeto novo/mês (3 vagas no
  trimestre, usado no gatilho de escassez do email 11); ciclo 1 vai pra lista geral, sem
  segmentar; digest diário por Telegram, implementação no fim da fila.
- **Skill `rv-email` atualizada:** nota no topo apontando a pasta como fonte única do projeto,
  pra reconhecimento automático em sessões futuras. Memória de longo prazo também salva.

**Bloco 2 — Fase 1 da campanha 004 escrita**
- Escritos os 4 emails da Fase 1 ("Semear Autoridade"): email 1 (post `site-maior-ativo-era-ia`,
  dado real de 51% tráfego bot 2024 + conversão 3x), email 2 (post GMB, Reverse Lead Magnet —
  responder com o link do perfil pra análise grátis), email 3 (portfólio Hub Ilha do Contrato),
  email 4 (case Solarium Aarau). Todo fato usado foi verificado nos arquivos reais do site
  (`projects.ts`, `blog-posts.ts`), nada inventado.
- Campanha **004** reservada no [[INDICE-CAMPANHAS]].
- Arquivos salvos em `campanhas/004-01` a `004-04`.

**Bloco 3 — Incidente de template e correção**
- **O que aconteceu:** o primeiro teste visual (email 1) foi enviado com dois problemas, os dois
  encontrados pelo Felipe comparando visualmente com a campanha 002 real:
  1. Saiu pelo Gmail (`realvisionmaps360@gmail.com`) em vez do domínio configurado — remetente
     errado. Causa: não havia acesso ao `HERMES_SECRET` (segredo do Supabase, nunca solicitado
     em texto por regra) pra chamar o `hermes-send` de verdade.
  2. Depois de corrigir o remetente, o **cabeçalho ainda estava errado** — usava o
     `template-newsletter.html` da skill (masthead em texto + foto de hero solta + botão amber),
     que **nunca foi o modelo real**. O modelo real e aprovado é o da campanha 002: masthead em
     imagem (`masthead-002.png`, grid-bg + logo real), CTA como link sublinhado, sem hero solta,
     assinatura com foto.
- **Correção do remetente:** criada função temporária `hermes-test-send` no Supabase
  (`ghwjetvazmdlaqidgxqi`) — usa o mesmo `RESEND_API_KEY` e o mesmo domínio verificado do
  `hermes-send`, protegida por uma chave simples embutida no próprio código (não é segredo de
  produção), sem precisar do `HERMES_SECRET`. Deploy autorizado explicitamente pelo Felipe via
  pergunta de escolha (classificador do Claude Code bloqueou a ação por padrão, por ser deploy em
  produção). **Pendência:** apagar essa função depois que os testes acabarem — não é pipeline
  de produção.
- **Correção do template:** os 4 arquivos `.html` da campanha 004 e o `template-newsletter.html`
  da skill `rv-email` foram reescritos pra bater com o modelo real da 002. O `template-newsletter.html`
  agora é a fonte única de verdade do corpo de todo email futuro — qualquer email novo parte dele,
  nunca de uma cópia antiga.
- **Teste final:** reenviado e confirmado correto pelo Felipe (`resend_id: 27ac474a-4e5b-4109-82e3-9030539464f4`).
- **Lição registrada:** antes de qualquer teste visual novo, comparar contra um email real já
  disparado (a 002), não confiar de memória em qual template está ativo na skill.
- **Próximo passo:** apagar a função `hermes-test-send`; Felipe aprovar a copy dos 4 emails da
  Fase 1 pra reservar `sequencia_id` e disparar de verdade, um por quinta, via `hermes-send`.

### 20/08/2026 — Webhook do Resend: métricas voltam pro banco
- **Problema:** os 31 envios da campanha 002 estavam com `aberto`, `clicado` e `bounced` em `false`.
  O Resend registrava os eventos, mas nada trazia de volta pro Supabase. Métrica era zero por
  construção, não por falta de audiência.
- **Migração `email_envios_eventos_resend`:** colunas novas `entregue_em`, `ultimo_evento`,
  `ultimo_evento_em` + índice em `resend_id`.
- **Edge Function `resend-webhook`** (v1, `verify_jwt=false`): recebe os eventos do Resend, valida a
  assinatura Svix (HMAC-SHA256, rejeita evento com mais de 5 min contra replay) e atualiza
  `email_envios` casando por `resend_id`.
  - `email.delivered` → `entregue_em`
  - `email.opened` → `aberto` + `aberto_em`
  - `email.clicked` → `clicado` + `clicado_em` (e marca `aberto`, porque clique implica abertura
    mesmo quando o pixel é bloqueado)
  - `email.bounced` → `bounced` **e** contato vira `status='bounced'`
  - `email.complained` → contato vira `status='descadastrado'`
  - O `hermes-send` já recusa disparar pra contato fora de `ativo`, então a higiene de lista passa a
    ser automática.
- **Secret `RESEND_WEBHOOK_SECRET`:** configurado por Felipe no painel do Supabase. Sem ele a função
  responde 500 e não processa nada.
- **Limite conhecido:** os eventos só existem retroativamente a partir da criação do webhook. A
  campanha 002 (20/07) **não** será preenchida. Vale da próxima em diante.

### 22/07/2026 — Nova fonte de entrada em `email_contatos`: squeeze page da comunidade WhatsApp
Edge Function pública `capture-community-lead` (mesmo projeto Supabase do Hermes) grava direto em `email_contatos` com `origem_consentimento='blog-<slug>'`. Testado local, ainda não publicado em produção. Detalhe completo em [`TIMELINE.md`](../../projetos/_RV-Internos/campanha-google-ads-slm-llm/TIMELINE.md), entrada de 22/07/2026.
