---
name: rv-posthog-setup
description: Instala e documenta o PostHog (analytics + banner de consentimento) em um site de cliente, repetindo a integração feita no site da Real Vision. Use SEMPRE que Felipe disser "instalar PostHog no site do cliente X", "analytics pro cliente X", "monitorar o site do cliente X", "colocar PostHog em X" ou for repetir esse processo em outro site. NÃO usar sem antes escolher o cliente com o Felipe — nunca rodar em lote sem aprovação por site.
---

# Skill: rv-posthog-setup — Instalar PostHog em site de cliente

> Repete no site do cliente o que foi feito no site da Real Vision (PostHog + banner de
> consentimento). Cada cliente ganha seu próprio projeto PostHog e sua própria documentação —
> nunca reaproveitar o projeto da Real Vision para dado de cliente.

---

## Quando usar

- Felipe decidiu instalar analytics PostHog em um site de cliente específico (já escolhido, não
  em lote)
- Repetir a integração para um novo cliente depois de já ter feito outros
- Revisar/ajustar uma instalação de PostHog já existente em algum cliente

---

## Procedimento

### Passo 1 — Confirmar o stack do site

Este processo, do jeito que está documentado, serve pra sites **React + Vite**. Antes de começar:
- Conferir `package.json` do repositório do cliente.
- Se for outro stack (Wix, WordPress, site estático, Next.js etc.), avisar o Felipe — os passos
  abaixo precisam adaptação e a instalação via `posthog-js`/`PostHogProvider` pode não se aplicar
  do mesmo jeito. Consultar https://posthog.com/docs/libraries antes de prosseguir.

### Passo 2 — Criar/confirmar o projeto PostHog do cliente

- **Nunca usar o projeto PostHog da Real Vision para o cliente.** Dado de visitante de cliente não
  se mistura com dado da RV nem de outro cliente.
- Confirmar com o Felipe: projeto já existe no PostHog (conta dele) ou precisa criar um novo.
- Anotar região (US Cloud ou EU Cloud — decidir por cliente, considerando onde estão os visitantes
  dele) + token do projeto + host correspondente.

> ⚠️ **Limite de projetos por organização (confirmado na doc em 18/07/2026):** a conta do Felipe é
> uma única *Organization* no PostHog. Sem cartão cadastrado, o plano gratuito permite **1
> projeto**. Com cartão cadastrado (upgrade, ainda pode ficar dentro da cota gratuita de uso),
> sobe pra **até 6 projetos**. Cada cliente novo consome uma vaga dessa cota — ao se aproximar de
> 6 clientes com PostHog ativo, avisar o Felipe: vai precisar decidir entre cadastrar cartão (se
> ainda não tiver) ou abrir uma segunda *Organization* (mesmo login, mas os detalhes exatos de
> como isso funciona ainda não foram confirmados na doc — verificar antes de agir quando chegar
> nesse número).

### Passo 3 — Instalar e configurar

- `npm install posthog-js` no repositório do cliente.
- Variáveis de ambiente `VITE_POSTHOG_PROJECT_TOKEN` e `VITE_POSTHOG_HOST` no `.env` local
  **e** nas env vars do Vercel (Production + Preview) do projeto do cliente.
- Inicializar em `src/main.tsx` (ou equivalente), condicionado ao consentimento salvo em
  `localStorage` — reaproveitar `src/lib/posthog.ts` do `real-vision-site` como modelo
  (`initPostHog`, `grantConsent`, `denyConsent`, `getStoredConsent`).
- `person_profiles: "identified_only"` como padrão (confirmar na doc se mudou:
  https://posthog.com/docs/data/anonymous-vs-identified-events).

### Passo 4 — Banner de consentimento adaptado ao cliente

- **Não copiar o visual do banner da Real Vision.** Recriar com as cores/fontes/tom daquele site
  específico (reaproveitar o `Button`/design system que o próprio repo do cliente já tiver).
- Perguntar ao Felipe se o cliente precisa do banner pra todo mundo (como a RV decidiu) ou só faz
  sentido pra visitante europeu — depende de quem é o público daquele site. Não assumir.
- Se o site tiver i18n (vários idiomas), traduzir o texto do banner nos idiomas que o site já tiver.

### Passo 5 — Build e teste dos 3 cenários

Antes de cogitar publicar, confirmar (local ou preview):
1. Primeira visita → banner aparece.
2. Aceitar → PostHog carrega de verdade (checar rede: chamadas pro host do PostHog, cookie `ph_`).
3. Recusar → nenhuma chamada de rede pro PostHog; reload não mostra o banner de novo depois de
   qualquer escolha (aceitar ou recusar).

`npm run build` precisa passar limpo antes de qualquer deploy.

### Passo 6 — Documentar na pasta do cliente

Na pasta `operacao/clientes/arquivos/[Nome] - [Empresa]/`:
- Criar (ou atualizar) `ANALYTICS-POSTHOG.md` — mesmo esqueleto do documento vivo da Real Vision
  (ver [[POSTHOG-ANALYTICS]]): O que é / O que foi feito / Decisões tomadas / Insights e
  monitoramento (log datado, cresce com o tempo) / Próximos passos.
- Acrescentar uma linha em "Entregas realizadas" do `[NOME]-PROJETO.md`.
- Acrescentar uma entrada datada no `[NOME]-TIMELINE.md`.

### Passo 7 — Deploy

- **Só com aprovação explícita do Felipe**, cliente por cliente — nunca automático, nunca em lote,
  nunca de madrugada sem supervisão. Regra de ouro: nenhuma produção de cliente é tocada sem OK.

---

## Decisões-padrão já validadas na Real Vision (ponto de partida, não regra fixa)

| Decisão | O que a RV escolheu | Vale pra todo cliente? |
|---|---|---|
| Região do projeto | US Cloud | Avaliar por cliente (público europeu → considerar EU Cloud) |
| Nível de rastreamento | Analytics + session recording + feature flags + funnels | Perguntar ao Felipe — pode ser só o básico pra cliente pequeno |
| Banner de consentimento | Mostrado pra todo mundo | Perguntar — site 100% local BR pode não precisar |
| `person_profiles` | `identified_only` | Manter, é o recomendado na doc pra reduzir custo com visitante anônimo |

---

## Importante

- **Regra de ouro:** nunca mexer em produção de cliente sem aprovação explícita, mesmo depois de
  já ter feito em outros clientes antes — cada site pede confirmação própria.
- **Nunca supor sintaxe/config do PostHog.** https://posthog.com/docs é a fonte de verdade —
  consultar antes de configurar qualquer opção que não esteja já validada aqui.
- **1 projeto PostHog por cliente**, sempre — nunca misturar tráfego de clientes diferentes (ou
  da própria RV) no mesmo projeto.
- Essa skill **não roda em lote sozinha**. Se o Felipe pedir pra "fazer em todos os clientes de
  uma vez", o caminho é: levantar candidatos (read-only) → escolher pilotos → aprovar caso a
  caso — nunca execução autônoma sem supervisão em site de cliente.

---

*Skill criada em 18/07/2026, a partir da integração no site da Real Vision (ver [[PRD-004-analytics-posthog]] e [[POSTHOG-ANALYTICS]]). Ver também: [[realvision]], [[rv-novo-cliente]].*
