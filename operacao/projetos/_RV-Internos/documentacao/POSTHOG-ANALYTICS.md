# PostHog Analytics — Real Vision (site institucional)

## Status: ✅ No ar em produção (18/07/2026)

## O que é e por que instalamos

PostHog é a ferramenta de analytics de produto que passamos a usar no `real-vision-site`
(institucional + blog + Academy, mesmo repo/deploy). Objetivo: entender de verdade como o
visitante navega o site inteiro — de onde vem, o que clica, onde trava — e medir o funil de
matrícula/compra do Profissional 360 (checkout manual via WhatsApp, D-011 do
[[PRD-004-analytics-posthog]]).

Detalhes técnicos completos e decisões arquiteturais estão no
[`PRD-004-analytics-posthog.md`](../../real-vision-academy/docs/prds/PRD-004-analytics-posthog.md)
— este documento aqui é o registro vivo, de leitura rápida, com espaço pra ir anotando os
insights conforme formos analisando os dados reais no painel.

---

## O que foi feito

- `posthog-js` instalado, inicializado em `src/main.tsx`, cobrindo o site inteiro numa única
  integração (institucional, blog, `/academy/*`).
- Banner de consentimento (`ConsentBanner.tsx`, PT/EN/DE) — o PostHog só carrega depois do
  visitante clicar em "Aceitar"; clicar em "Recusar" não dispara nenhuma chamada de rede pro
  PostHog. Escolha salva em `localStorage`, não pergunta de novo.
- Variáveis de ambiente (`VITE_POSTHOG_PROJECT_TOKEN`, `VITE_POSTHOG_HOST`) no `.env` local e no
  Vercel (Production + Preview).
- Testado ao vivo nos 3 cenários (primeira visita / aceitar / recusar) antes de publicar —
  confirmado que o PostHog só rastreia depois do aceite.
- Publicado em produção via commit `7bb7af3`, deploy Vercel `Ready`.

---

## Decisões tomadas

| Decisão | Escolha |
|---|---|
| Região do projeto | US Cloud |
| Nível de rastreamento | Completo — analytics + session recording + feature flags + funnels |
| Banner de consentimento | Mostrado pra **todo** visitante (não só Europa) |
| `person_profiles` | `identified_only` (padrão recomendado pela doc, mais barato pra visitante anônimo) |

---

## Insights e monitoramento

> Log datado — cresce conforme a gente for olhando os dados reais no painel do PostHog. Adicionar
> entrada nova aqui a cada análise, não sobrescrever as anteriores.

### 18/07/2026 — Go-live
PostHog publicado em produção. Ainda sem volume de dado suficiente pra qualquer insight — este é
o marco zero. Próxima entrada deve trazer os primeiros números reais de pageview/sessão.

---

## Próximos passos

- Mascarar campos sensíveis (login, formulário de WhatsApp/checkout) na gravação de sessão —
  depende de confirmar a sintaxe atual em https://posthog.com/docs antes de codar.
- Montar no painel do PostHog: funil de matrícula/compra (pedido → WhatsApp → matrícula) e
  dashboard de pageviews por seção do site.
- Ver [[rv-posthog-setup]] — mesma integração formalizada como skill, pra repetir em sites de
  cliente (um projeto PostHog por cliente, nunca misturado com o da Real Vision).

---

## Documentos relacionados
- [[PRD-004-analytics-posthog]] — plano técnico completo, decisões de arquitetura
- [[rv-posthog-setup]] — skill pra repetir esta integração em sites de cliente
