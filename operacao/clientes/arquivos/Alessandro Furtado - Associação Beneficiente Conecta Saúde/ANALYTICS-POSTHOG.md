# PostHog Analytics — Alessandro Furtado / Conectando Saúde

## Status: ✅ Instalado em produção — 02/08/2026

## O que é e por que instalamos

PostHog é a ferramenta de analytics de produto usada pela Real Vision. Objetivo: entender como o
visitante navega o site de doação — de onde vem, onde clica, se chega até o QR Code do PIX — nos
mesmos moldes já rodando no site institucional da Real Vision e no Solarium Aarau (ver
[[operacao/clientes/arquivos/Gabriel Iberg - Solarium Aarau/ANALYTICS-POSTHOG|ANALYTICS-POSTHOG do Solarium]]).

**Projeto PostHog próprio do cliente** — token passado pelo Felipe (projeto já existente).

---

## O que foi feito

- `posthog-js` instalado em `operacao/clientes/arquivos/Alessandro Furtado - Associação Beneficiente Conecta Saúde/site/` (jeito "clássico", igual ao padrão já validado no site da Real Vision e no Solarium — sem `@posthog/react`).
- `src/lib/posthog.ts` criado, réplica do modelo já validado (`initPostHog`, `grantConsent`, `denyConsent`, `getStoredConsent`), chave de consentimento própria (`conectando-saude-analytics-consent`).
- `ConsentBanner.tsx` criado com o design system do próprio site (tokens `bg-background`, `border-border`, `Button` do shadcn/ui já existente no repo). Site só tem PT-BR (sem i18n), texto direto no componente.
- `.env` local criado com `VITE_POSTHOG_PROJECT_TOKEN` e `VITE_POSTHOG_HOST` (`https://us.i.posthog.com`), `.env` adicionado ao `.gitignore` (não tinha essa entrada ainda).
- `.env.example` atualizado documentando as novas variáveis (sem valor).
- Wiring: `main.tsx` inicializa o PostHog no load se já houver consentimento salvo; `App.tsx` renderiza o `ConsentBanner`.
- `npm run build` e `npx tsc --noEmit` rodados limpos, sem erro.
- Testado localmente (porta 8080) nos 3 cenários:
  1. Primeira visita → banner aparece.
  2. Aceitar → `posthog-js` carrega de verdade (`window.posthog.__loaded === true`, `distinct_id` e `session_id` reais gerados).
  3. Recusar → PostHog não carrega, escolha persiste no reload, banner não reaparece.

---

## Decisões tomadas

| Decisão | Escolha |
|---|---|
| Região do projeto | US Cloud (`https://us.i.posthog.com`) |
| Padrão de instalação | Clássico (`posthog-js` puro), igual à Real Vision e ao Solarium — não o wizard novo com `@posthog/react` |
| Banner de consentimento | Mostrado pra todo visitante, adaptado ao layout do site, só PT-BR |
| `person_profiles` | `identified_only` (mesmo padrão dos outros projetos RV) |

---

## Próximos passos

- [x] Env vars adicionadas no Vercel (Production + Preview) pelo Felipe — 02/08/2026.
- [x] Commit `6fd7af3` pushado pro `main`, deploy disparado — 02/08/2026.
- [ ] Confirmar ao vivo no site real que o banner aparece pro visitante e que o evento de pageview chega no painel do PostHog.

---

## Documentos relacionados
- [[FICHA-CLIENTE]] — ficha central do cliente
- [[TIMELINE]] — timeline do cliente
- [[RELATORIOS]] — relatórios mensais
- [[ANALYTICS-CLARITY]] — Clarity do mesmo cliente
- `operacao/gestao/infraestrutura/auditoria-tecnica-clientes/INDICE-CLIENTES.md` — índice central de todos os clientes
