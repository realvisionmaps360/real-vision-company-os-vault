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

## Próximos passos

- [ ] Enviar proposta da Landing Page (CHF 600) ao Gabriel, via Romana, junto com o link provisório
- [ ] Follow-up pós-entrega: satisfação e possibilidade de outros serviços
- [ ] Oportunidade: outros clientes suíços via indicação do Gabriel

## Projeto em andamento — Landing Page Meta Ads (03/07/2026)

- Proposta comercial gerada: CHF 600, dividido em Estratégia & Texto (190) + Design & Desenvolvimento (320) + Rastreamento (90)
- Documentos: `Solarium-Aarau_Proposta-LandingPage_03-07-26_PT.html` (revisão interna) e `_DE.html` (versão para o Gabriel)
- Detalhes completos em [[RELATORIO-LANDING-PAGE-META-ADS]] e [[TIMELINE-DESENVOLVIMENTO-LANDING-PAGE]]

## Saúde Técnica do Site
- Site online: sim — https://www.aarau-solarium.ch
- Hospedagem confirmada: Vercel
- Search Console: conectado e verificado — propriedade `www.aarau-solarium.ch` ativa, sitemap.xml processado (10 páginas encontradas, confirmado ao vivo em 29/07/2026)
- Indexação: 6 páginas indexadas no momento da auditoria — havia duplicação entre `solariumaarau.ch` e `www.aarau-solarium.ch` (confirmada via `site:` no Google), corrigida em 29/07/2026 (canonical/sitemap/robots unificados); domínios secundários nunca tiveram conteúdo próprio, sempre foram redirect — confirmado com Felipe, sem necessidade de ferramenta de Alteração de Endereço no Search Console
- Favicon: correto — confirmado visualmente na busca do Google (ícone da marca, não genérico); tag `<link rel="icon">` explícita adicionada em 29/07/2026 (só existia apple-touch-icon antes)
- Google Analytics (GA4): instalado — property `G-7SZVNPKT6L`
- PostHog: instalado em 02/08/2026 (decisão de 29/07/2026 revertida — Felipe abriu projeto próprio no PostHog e pediu instalação). Ver [[ANALYTICS-POSTHOG]].
- Última auditoria: 29/07/2026 — correção aplicada via commit `25cc207` em `operacao/projetos/solariumaarau`

## Observações

- Idioma de trabalho: DE (Hochdeutsch) ou EN — Suíça
- Primeiro cliente internacional da Real Vision
- Ponto de referência para expansão na Suíça/Europa
- Contato via Romana Loznjakovic

## Conexões

- [[AUDITORIA-CRO-SOLARIUM]] — auditoria de conversão da landing page
- [[RELATORIO-LANDING-PAGE-META-ADS]] — relatório de performance de Meta Ads
- [[TIMELINE-DESENVOLVIMENTO-LANDING-PAGE]] — cronologia do desenvolvimento
- [[ANALYTICS-POSTHOG]] — instalação do PostHog no site do Solarium
