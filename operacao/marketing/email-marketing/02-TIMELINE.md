# Timeline — Projeto Hermes (Email Marketing RV)

> Diário de bordo vivo. **Regra:** ao final de toda sessão de trabalho no email marketing,
> atualizar este arquivo (o que foi feito, decisões, próximo passo) e marcar os checkboxes
> no `01-PLANO-EXECUCAO.md`. Datas em formato absoluto.

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
  Arquivo de capivara em: `operacao/marketing/email-marketing/03-CLIENTES-REATIVACAO.md`.
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
