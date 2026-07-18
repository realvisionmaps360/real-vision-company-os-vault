---
id: research-pagamento
title: Pesquisa — Gateway de Pagamento (curso avulso BR)
type: research
status: draft
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - DECISIONS
  - ARCHITECTURE
---

# Pesquisa — Gateway de Pagamento

> Objetivo: escolher como cobrar pelo curso avulso. Dois caminhos distintos: **gateway** (nós
> construímos checkout + área de membros) vs **plataforma pronta** (Hotmart/Kiwify hospedam tudo).
> Dados de mercado de meados de 2026 — reconferir taxa vigente antes de contratar.

## Contexto da decisão
- Modelo: **curso avulso** (compra única). Ver [[DECISIONS]] D-003.
- Já decidimos ter **área de membros própria** no site (`/academy`). Isso favorece **gateway**, não
  plataforma pronta — a plataforma pronta duplicaria a área de membros que vamos construir.
- Público MVP: Brasil, PT.

## Opção A — Gateway (recomendado para o nosso modelo)

| Gateway | Taxa cartão (aprox.) | Prós | Contras |
|---|---|---|---|
| **Stripe** | ~3,9%–4,9% + R$0,50 | Checkout transparente (sem redirect), melhor DX/API, ideal p/ internacional e futura assinatura, docs excelentes | Cadastro mais burocrático; Pix/boleto menos maduros que os locais |
| **Mercado Pago** | ~4,99%–5,49% (liberação imediata) | Cadastro simples, repasse rápido, Pix/boleto fortes, confiança BR | Checkout redirecionado, muitas notificações, antifraude pode atrasar |
| **PagSeguro** | ~3,99%–5,59% | Confiança BR, Pix/QR/boleto | Repasse mais lento, checkout pouco personalizável |

**Observação técnica:** qualquer gateway exige um **webhook server-side** para confirmar pagamento e
criar a matrícula. O repo já tem `@vercel/node` → dá pra usar Vercel serverless functions. Ver
[[ARCHITECTURE]] §5.

## Opção B — Plataforma pronta (Hotmart / Kiwify)

| Plataforma | Taxa por venda (aprox.) | Observação |
|---|---|---|
| **Kiwify** | ~7%–9% + fixo | Área de membros + player nativos inclusos; checkout fluido |
| **Hotmart** | ~9,9%–14,9% + R$1 | Área de membros + hospedagem de vídeo inclusas; mais cara |

Vantagem: zero desenvolvimento de checkout/vídeo/área de membros. **Desvantagem para nós:** conflita
com a diretiva (área de membros própria, ecossistema integrado ao site) e cobra 2–3× a taxa de um
gateway. Faz sentido só se quisermos validar venda **antes** de construir a plataforma.

## Recomendação

**Stripe** como gateway do MVP:
1. Menor taxa efetiva da Opção A e checkout transparente (fica dentro do nosso site — consistência
   visual que a diretiva exige).
2. Destrava naturalmente o futuro (assinatura, internacional — a RV já tem cliente na Suíça).
3. API/DX superiores encurtam a Fase 4.

Complemento sugerido: habilitar **Pix via Stripe** (ou adicionar Mercado Pago só para Pix) se o
público reagir mal a só cartão — decidir com dado real depois do lançamento.

**Trade-off honesto:** se o Felipe quiser **vender antes de construir** (validar demanda do
Profissional 360 sem esperar as Fases 1–4), **Kiwify** é o atalho — aceita-se a taxa maior em troca
de velocidade, e migra-se para a plataforma própria depois.

## Decisão do Felipe
- [x] nao vamos mexer em nada disso agora, nao é problema pra agora, vamos por tudo pra funcionar, por enquanto voce vai enviar o pagamento pra mim pelo whats app, com toda a informação pré preenchida do que a pessoa comprou e todos os detalhes pro meu numero dewhats app, o mesmo que tem cadastrado no site. 

## Fontes
- [Stripe pricing](https://stripe.com/pricing)
- [Gateways de Pagamento 2026 — curso online (Estudiosite)](https://www.estudiosite.com.br/site/tecnologia/gateways-pagamento-curso-online-2026)
- [Melhor gateway BR (Fintechnode)](https://fintechnode.com.br/conteudos/tecnologia/melhor-gateway-pagamento-brasil/)
- [Hotmart ou Kiwify (Negócios Rápido)](https://negociosrapido.com.br/hotmart-ou-kiwify/)
- [Kiwify taxas e análise (bit4learn)](https://bit4learn.com/pt/lms/kiwify-venda-cursos-online/)

## Documentos relacionados
- [[DECISIONS]] · [[ARCHITECTURE]] · [[ROADMAP]]
