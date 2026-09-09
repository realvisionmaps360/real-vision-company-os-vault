---
title: Gabriel Iberg — Solarium Aarau
tags:
  - cliente
  - entregue
  - suica
status: entregue
data_inicio: 2026-04-01
servicos:
  - tour-360
id: CLI-009
tipo: cliente
pertence_a: ["[[operacao/clientes/README]]"]
atualizado_em: 2026-09-09
---

# Gabriel Iberg — Solarium Aarau

## Contexto

Gabriel Iberg é o cliente do primeiro projeto internacional da Real Vision — Solarium Aarau, localizado na Suíça. Tour Virtual 360° entregue. Chegou através da Romana (co-fundadora da RV).

## Serviços contratados

- **Tour Virtual 360°** (entregue) — tour do Solarium Aarau

## Entregas realizadas

- Tour 360° entregue e publicado
- Repo: `operacao/projetos/solariumaarau/`
- Skill por-cliente: `solarium`
- PostHog instalado em 02/08/2026 (analytics + banner de consentimento DE/EN), testado local nos 3 cenários (visita/aceitar/recusar), aguardando aprovação pra deploy. Ver [[ANALYTICS-POSTHOG]]
- Relatório mensal recorrente (analytics do site) — histórico completo em [[TIMELINE]]. A partir de 09/09/2026, cada envio cruza 3 fontes (Google Analytics + Search Console + PostHog) num único documento bilíngue DE/PT com botão de idioma, no padrão da skill `rv-relatorio`.

## Próximos passos

- [ ] Gabriel confirmou interesse em tráfego pago (Google Ads) pro site, mas está sem orçamento no momento (09/09/2026) — sem prazo definido, sem proposta aberta ainda. Dado de oportunidade já levantado: termo de busca genérico "solarium" tem alto volume (425 impressões/40 dias) e captura orgânica quase nula (posição ~40) — ver [[TIMELINE]] 09/09/2026 e o relatório mensal do período.
- [ ] Retomar a Landing Page Meta Ads (CHF 550/600) quando o Gabriel sinalizar orçamento — projeto pausado por decisão dele (comprou outro espaço/salão), não cancelado. Ver seção abaixo.
- [ ] Follow-up pós-entrega: satisfação e possibilidade de outros serviços
- [ ] Oportunidade: outros clientes suíços via indicação do Gabriel

## Projeto em andamento — Landing Page Meta Ads (03/07/2026)

- Proposta comercial gerada: CHF 600, dividido em Estratégia & Texto (190) + Design & Desenvolvimento (320) + Rastreamento (90)
- Documentos: `Solarium-Aarau_Proposta-LandingPage_03-07-26_PT.html` (revisão interna) e `_DE.html` (versão para o Gabriel)
- Detalhes completos em [[RELATORIO-LANDING-PAGE-META-ADS]] e [[TIMELINE-DESENVOLVIMENTO-LANDING-PAGE]]

## Saúde Técnica do Site
- Site online: sim — https://www.aarau-solarium.ch
- Hospedagem confirmada: Vercel
- Search Console: conectado e verificado — propriedade `www.aarau-solarium.ch` ativa, sitemap.xml processado (10 páginas encontradas, confirmado ao vivo em 29/07/2026). **Acesso confirmado 09/09/2026: conta Google `smarthomefg@gmail.com`** (diferente da conta do GA4!) — entrar com `https://search.google.com/u/0/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.aarau-solarium.ch%2F` (o `u/0` pode variar, testar outras se der "sem acesso"). Search Console tem defasagem de ~1-2 dias nos dados mais recentes.
- Indexação: 6 páginas indexadas no momento da auditoria — havia duplicação entre `solariumaarau.ch` e `www.aarau-solarium.ch` (confirmada via `site:` no Google), corrigida em 29/07/2026 (canonical/sitemap/robots unificados); domínios secundários nunca tiveram conteúdo próprio, sempre foram redirect — confirmado com Felipe, sem necessidade de ferramenta de Alteração de Endereço no Search Console
- Favicon: correto — confirmado visualmente na busca do Google (ícone da marca, não genérico); tag `<link rel="icon">` explícita adicionada em 29/07/2026 (só existia apple-touch-icon antes)
- Google Analytics (GA4): instalado — property `G-7SZVNPKT6L` (numérica `538376459`). **Acesso confirmado 09/09/2026: só a conta Google `realvisionmaps360@gmail.com` enxerga essa propriedade** (aparece como "Solarium Aarau Website"). As contas `smarthomefg@gmail.com` e `felipegarciajericoacoara@gmail.com`, também logadas no Chrome do Felipe, **não têm acesso** — dá "Permissões ausentes". Sempre entrar direto com `https://analytics.google.com/analytics/web/?authuser=1#/p538376459/reports/reportinghub` (o `authuser=1` pode variar conforme a ordem das contas logadas no Chrome no momento — se der permissão ausente, trocar de conta pelo avatar até achar "Solarium Aarau Website").
- PostHog: instalado em 02/08/2026 (decisão de 29/07/2026 revertida — Felipe abriu projeto próprio no PostHog e pediu instalação). Ver [[ANALYTICS-POSTHOG]].
- Última auditoria: 29/07/2026 — correção aplicada via commit `25cc207` em `operacao/projetos/solariumaarau`

## Observações

- Idioma de trabalho: DE (Hochdeutsch) ou EN — Suíça
- Primeiro cliente internacional da Real Vision
- Ponto de referência para expansão na Suíça/Europa
- Contato via Romana Loznjakovic

## Conexões

- [[TIMELINE]] — histórico completo do site principal, inclui todos os relatórios mensais
- [[AUDITORIA-CRO-SOLARIUM]] — auditoria de conversão da landing page
- [[RELATORIO-LANDING-PAGE-META-ADS]] — relatório de performance de Meta Ads
- [[TIMELINE-DESENVOLVIMENTO-LANDING-PAGE]] — cronologia do desenvolvimento
- [[ANALYTICS-POSTHOG]] — instalação do PostHog no site do Solarium
- [[ANALYTICS-CLARITY]] — Microsoft Clarity do mesmo site
- Skill `rv-analytics-cliente` — onde e como puxar cada fonte de dado (GA4/GSC/PostHog/Clarity) pro relatório mensal
