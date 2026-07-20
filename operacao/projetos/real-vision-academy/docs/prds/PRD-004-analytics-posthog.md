---
id: PRD-004
title: PRD — Analytics PostHog (site inteiro)
type: prd
status: live
project: real-vision-academy
phase: transversal
owner: master-visionair
created: 2026-07-18
updated: 2026-07-18
depends_on:
  - ARCHITECTURE
related:
  - DECISIONS
  - ROADMAP
---

# PRD-004 — Analytics PostHog (Fase transversal, site inteiro)

> Plano aguardando aprovação do Felipe (2026-07-18). Fonte de verdade técnica:
> [posthog.com/docs](https://posthog.com/docs) — nenhuma configuração abaixo foi inventada; itens não
> confirmados na documentação estão marcados como "a verificar" e devem ser checados na doc antes de
> codar.

## Objetivo

Instrumentar o `real-vision-site` inteiro (institucional + blog + Academy) com PostHog para
monitorar e documentar uso real do site: pageviews, cliques, gravação de sessão, funis de conversão
(matrícula, WhatsApp de compra) e, mais adiante, feature flags/testes A/B.

**Por que no PRD da Academy:** a Academy roda no mesmo repo/deploy do site (D-001), então a
inicialização do PostHog acontece uma vez na raiz do app e cobre automaticamente todas as rotas —
não é um recurso exclusivo da Academy, mas o site inteiro se beneficia da mesma integração.

## Decisões tomadas com o Felipe (2026-07-18)

| Decisão | Escolha |
|---|---|
| Região do projeto PostHog | **US Cloud** |
| Nível de rastreamento inicial | **Tudo** — analytics + session recording + feature flags + funnels |
| Banner de consentimento | **Não existe, precisa ser criado** |
| Execução | **Só o plano agora** — implementação em sessão futura, após aprovação |

**Ponto de atenção (US Cloud + visitantes EU/CH):** o site atende clientes/prospects na Suíça
(Solarium Aarau, Romana). A doc do PostHog recomenda anonimizar dados de visitantes da UE quando o
projeto está hospedado fora da UE. Isso reforça a necessidade do banner de consentimento (já
decidido) — a verificar na doc exatamente qual opção de anonimização/IP usar antes de implementar.

## Diretrizes de Implementação

### 1. Pacotes e variáveis de ambiente
- Instalar `posthog-js` (SDK) + integração React (provider), conforme
  [docs de instalação React](https://posthog.com/docs/libraries/react).
- Variáveis com prefixo `VITE_` (padrão Vite, não Next.js):
  - `VITE_POSTHOG_PROJECT_TOKEN` — a API key que você está pegando agora no wizard.
  - `VITE_POSTHOG_HOST=https://us.i.posthog.com` — host da região US Cloud.
- Local: `.env.local` (dev). Produção/preview: variáveis de ambiente no painel Vercel.

### 2. Onde inicializar
- `src/main.tsx` (raiz do Vite), envolvendo `<App/>` — **não** dentro de `App.tsx` por rota. Isso
  garante cobertura do site inteiro (institucional, blog, `/academy/*`) com uma única inicialização.

### 3. Consentimento antes de carregar (novo componente)
- Criar `ConsentBanner.tsx` (padrão shadcn/ui, mesmo estilo visual do site).
- O PostHog só é inicializado **depois** do clique em "aceitar" — enquanto não há consentimento,
  nenhum script do PostHog carrega (evita capturar dado sem opt-in, conforme a doc de GDPR).
- Escolha do usuário salva em `localStorage` para não perguntar de novo.
- Sem esse banner, session recording com visitante europeu é a maior exposição de risco do plano —
  por isso entra na Fase 1 de implementação, não depois.

### 4. Session Recording
- Ativa automaticamente junto com o `init` (captura clique, scroll, input, pageview).
- **A verificar na doc antes de codar:** sintaxe exata de mascaramento de campos sensíveis (login,
  formulário de checkout/WhatsApp) — a doc confirma que a opção existe ("recording rules" / "privacy
  controls") mas não fixei a sintaxe atual aqui para não arriscar inventar.

### 5. Content-Security-Policy
- Se o site tiver CSP configurada (verificar `vercel.json`/headers do Vercel), precisa liberar
  domínios do PostHog em `script-src`/`connect-src` — a doc avisa que, sem isso, eventos falham
  **silenciosamente** (sem erro visível). Item de verificação obrigatória antes do deploy.

### 6. Feature Flags (uso futuro, não bloqueia o MVP do plano)
- Hook `useFeatureFlagEnabled` disponível para testar variações de CTA/landing (ex: Profissional
  360) quando fizer sentido. Não faz parte da primeira entrega, só documentado aqui pra não perder.

## Sequência de implementação (quando aprovado)

1. Confirmar projeto criado no PostHog (US Cloud) + copiar token e host.
2. Adicionar env vars (`.env.local` + Vercel Production/Preview).
3. Instalar pacotes.
4. Construir `ConsentBanner.tsx`.
5. Inicializar PostHog em `main.tsx`, condicionado ao consentimento.
6. Checar/ajustar CSP do Vercel.
7. Mascarar campos sensíveis do session recording (sintaxe confirmada na doc nesse momento).
8. Deploy em preview → conferir eventos chegando no dashboard do PostHog.
9. Aprovação explícita do Felipe → merge em produção (regra de ouro: nunca mexer em produção sem OK).
10. No PostHog: montar funil de matrícula/compra (Fase 4 — pedido via WhatsApp) e dashboard de
    pageviews por seção do site.

## Status da implementação (2026-07-18) — NO AR

Publicado em produção (realvisionmaps.com). Commit `7bb7af3` em `main`, deploy Vercel Ready.

**Feito e verificado:**
- Projeto PostHog confirmado (US Cloud) + token/host em `.env` (local) e nas env vars do Vercel
  (Production + Preview).
- `posthog-js` instalado; `ConsentBanner.tsx` (PT/EN/DE); init em `main.tsx` condicionado ao aceite.
- Build de produção limpo. Testado ao vivo no preview (`vite preview`) nos 3 cenários:
  1. Primeira visita → banner aparece.
  2. Aceitar → PostHog carrega de verdade (chamadas a `us-assets.i.posthog.com` com o token,
     incluindo `posthog-recorder.js` = session recording) + cookie `ph_`.
  3. Recusar / recarregar com "denied" → zero rede pro PostHog, banner não reaparece.
- Produção confirmada: bundle servido em realvisionmaps.com contém token + host + chave de consent;
  banner "Recusar/Aceitar" renderiza no site ao vivo.

**Falta (fora do escopo desta entrega, backlog):**
- Mascarar campos sensíveis do session recording (login, WhatsApp) — depende de confirmar sintaxe
  atual na doc (https://posthog.com/docs).
- Montar no PostHog: funil de matrícula/compra (Fase 4, pedido via WhatsApp) e dashboard de
  pageviews por seção.
- CSP: `vercel.json` hoje não define `Content-Security-Policy`, então nada bloqueia o PostHog. Se
  uma CSP for adicionada no futuro, liberar domínios do PostHog em `script-src`/`connect-src`.

## Fora de escopo deste PRD
- Migração de gateway de pagamento (D-005/D-011, sem relação).
- Testes A/B ativos (só a capacidade fica disponível).
- Qualquer mudança em produção sem aprovação explícita.

## Documentos relacionados
- [[ARCHITECTURE]]
- [[DECISIONS]]
- [[ROADMAP]]
- [[POSTHOG-ANALYTICS]] — documento vivo com o log de insights/monitoramento contínuo (não
  duplicar aqui; novas observações do dia a dia entram lá, este PRD guarda só o plano técnico)
- [[rv-posthog-setup]] — skill que formaliza esta integração pra repetir em sites de cliente
