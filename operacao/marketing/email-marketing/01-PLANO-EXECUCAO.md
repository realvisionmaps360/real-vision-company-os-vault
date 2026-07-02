# Plano de Execução — Hermes (Agente de Email Marketing RV)

> Passo a passo completo até "tudo pronto e funcionando". Cada passo tem uma checagem de
> sucesso. Marcar `[x]` quando concluído e registrar no [[02-TIMELINE]].
> Criado em 23/06/2026. Estratégia geral: [[00-ESTRATEGIA]].

---

## 🎯 META FINAL (Definition of Done)

> **Quando TODOS os itens abaixo estiverem ✅, o Hermes está "pronto e funcionando" e o
> Claude envia ao Felipe uma MENSAGEM DE PARABÉNS proativa.** (ver seção "Gatilho de Parabéns")

1. Skill `rv-email` (Hermes) criada e carregando.
2. Domínio realvisionmaps.com verificado no Resend (SPF/DKIM/DMARC = "verified").
3. E-mail de teste chega na **caixa de entrada** (não Promoções/Spam).
4. Tabelas dedicadas de email criadas no Supabase.
5. Hermes lê 1 cliente real do VisionFlow e gera um rascunho na voz RV.
6. Primeira sequência (clientes ativos) escrita, com auto-melhoria, e **aprovada pelo Felipe**.
7. Disparo da 1ª sequência funcionando + métricas sendo gravadas no banco.

---

## FASE 1 — O agente (a inteligência) 🟢 100% seguro, não toca produção

- [x] **1.1** Criar `~/.claude/skills/rv-email/SKILL.md` com a persona **Hermes**
  (estrategista-redator). → *Checagem:* skill aparece e carrega no Claude Code. ✅ 23/06/2026
- [x] **1.2** Escrever o playbook destilado dos 4 mestres dentro da skill (princípios
  Hormozi + 9 gatilhos Walker + máquina Ferdy + auto-melhoria Jay). → *Checagem:* skill
  descreve as 3 trilhas e a estrutura de email. ✅ 23/06/2026
- [x] **1.3** Adicionar regra de **voz** (cruzar com `contexto/VOZ.md`) e bilíngue PT+DE/EN. ✅ 23/06/2026
- [x] **1.4** Adicionar o **catálogo de 12 serviços** como banco de oportunidades de upsell. ✅ 23/06/2026
- [x] **1.5** Adicionar a seção de **auto-crítica/auto-melhoria** (loop que reescreve a
  copy até bater critérios) e o conceito de **reverse lead magnet** RV. ✅ 23/06/2026
- [x] **1.6** Carregar `realvision` antes (regra). → *Checagem:* Hermes responde com
  contexto RV correto num teste. ✅ 23/06/2026

## FASE 2 — A máquina (base técnica)

- [x] **2.1** Criar conta no **Resend** e pegar API key. ✅ (conta já existia, key salva no Supabase)
- [x] **2.2** Adicionar domínio realvisionmaps.com no Resend e configurar
  **SPF, DKIM, DMARC** no DNS da Hostinger. → Status "Verified" confirmado. ✅ 23/06/2026
- [x] **2.3** Remetente profissional: `contato@realvisionmaps.com`. ✅
- [x] **2.4** Tabelas dedicadas criadas no Supabase `ghwjetvazmdlaqidgxqi`:
  - `email_contatos` · `email_envios` · `email_sequencias` · `email_ab_testes`
  → Vazias, sem tocar no CRM. ✅ 23/06/2026
- [x] **2.5** Edge Function `hermes-send` deployed (Supabase + Resend). Autenticada via
  `HERMES_SECRET`. Registra cada envio no banco automaticamente. ✅ 23/06/2026
- [x] **2.6** Email de teste chegou na **caixa de entrada** (não Promoções/Spam).
  Acentos e emojis OK. Link de descadastro presente. ✅ 23/06/2026

## FASE 3 — Primeira sequência: clientes ativos

- [ ] **3.1** Confirmar com Felipe a lista de clientes ativos reais e o **consentimento**
  (relação comercial) + garantir **link de descadastro**.
- [ ] **3.2** Hermes gera a estratégia da sequência (objetivo: relação + 1 upsell do catálogo).
- [ ] **3.3** Hermes escreve 3–4 emails em PT (com loop de auto-melhoria) na voz RV.
- [ ] **3.4** Felipe revisa e **aprova** (nada vai sem OK).
- [ ] **3.5** Agendar/disparar a sequência + gravar métricas no banco.
- [ ] **3.6** Hermes lê as métricas e sugere o próximo passo (o ciclo de aprendizado).

## FASE 4 (futura) — Motor frio + reverse lead magnet

- [ ] **4.1** Domínios separados pra prospecção (nunca o principal).
- [ ] **4.2** Reverse lead magnet RV (mini-tour 360° / análise GMN) integrado à `rv-prospeccao`.
- [ ] **4.3** Avaliação LGPD do cold antes de qualquer disparo.

---

## 🎉 Gatilho de Parabéns

Quando os 7 itens da **Definition of Done** estiverem ✅, o Claude envia ao Felipe uma
mensagem proativa de parabéns confirmando que o Hermes está no ar e funcionando, com um
resumo do que foi entregue e os primeiros números. (Disparada no fim da sessão em que o
último item for concluído — não é automática por sistema; é compromisso registrado aqui.)

---

## Ordem recomendada
Fase 1 → Fase 2 → Fase 3 → (futuro) Fase 4.
Fase 1 é 100% segura. Fases 2 e 3 mexem em infra/envio — nada de disparo real sem OK do Felipe.
