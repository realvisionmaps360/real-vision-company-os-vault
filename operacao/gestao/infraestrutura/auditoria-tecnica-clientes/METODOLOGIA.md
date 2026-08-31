---
title: Metodologia — Auditoria Técnica de Sites por Cliente
tags: [infraestrutura, auditoria, seo, ga4, posthog]
id: PRC-010
tipo: processo
pertence_a: ["[[operacao/gestao/README]]"]
atualizado_em: 2026-08-28
---

# Metodologia — Auditoria Técnica de Sites por Cliente

> Processo repetível para saber, cliente por cliente, se o site está online, indexado corretamente no Google, com favicon certo, GA4 e PostHog configurados. Executado pela skill [[rv-auditoria-tecnica-site]].

## Por que existe

Real Vision tem várias dezenas de clientes em `operacao/clientes/arquivos/`, mas nenhum controle central de quantos sites estão de fato no ar e configurados corretamente. O que existia antes era ad-hoc — cada cliente com um arquivo de diagnóstico diferente (`GA4-DIAGNOSTICO-CHECKLIST.md`, `AUDITORIA-CRO-SOLARIUM.md`, `WOOD-ART-SITE-DIAGNOSTICO.md`), sem padrão nem índice. Esta metodologia substitui isso por um processo único.

## O que é "projeto final" (critério de pronto)

Um cliente está com a auditoria técnica **completa** quando os 5 pilares abaixo estão OK:

1. **Site online** — hospedagem confirmada, URL respondendo.
2. **Google Search Console** — propriedade verificada, sitemap enviado.
3. **Indexação** — páginas do site aparecem em `site:dominio.com` no Google, com título/descrição corretos.
4. **Favicon** — aparece corretamente na busca (não o ícone genérico do navegador/Google).
5. **Analytics** — GA4 instalado e recebendo dados; PostHog instalado (quando aplicável ao projeto).

## Quem faz o quê

| Etapa | Quem faz |
|---|---|
| Ler ficha, pasta e código do cliente | IA |
| Rodar `/improve quick` (bugs/segurança/performance) | IA |
| Checar indexação e favicon no Google (busca real) | IA (via Browser pane) |
| Montar panorama e apontar bloqueadores | IA |
| Decidir o que corrigir e aprovar mudanças na ficha | Felipe |
| Login e configuração dentro do Google Search Console / GA4 | Felipe (a IA entrega o passo a passo — ver [[PASSO-A-PASSO-GOOGLE]]) |
| Atualizar `FICHA-CLIENTE.md` e `INDICE-CLIENTES.md` | IA, após aprovação do Felipe |

## Processo passo a passo

1. Felipe indica o nome do cliente.
2. IA localiza a pasta em `operacao/clientes/arquivos/[Nome-Cliente]/` e lê `FICHA-CLIENTE.md` + demais docs.
3. Se houver repositório do site: `git pull --rebase origin main` (regra fixa do AGENTS.md) antes de qualquer leitura de código.
4. IA lê o código: favicon usado, tags de GA4/GTM/PostHog no HTML, presença de `sitemap.xml` e `robots.txt`.
5. IA roda `/improve quick` no repositório (mesmo padrão da skill [[rv-entrega]]) para bugs/segurança/performance.
6. IA abre o site e o Google (`site:dominio.com`) no Browser pane para conferir visualmente indexação e favicon.
7. IA apresenta o panorama pra Felipe: o que está ok, o que falta, o que é bloqueador.
8. Felipe aprova. IA atualiza a seção "Saúde Técnica do Site" na `FICHA-CLIENTE.md` do cliente e a linha correspondente em [[INDICE-CLIENTES]].
9. IA entrega o passo a passo relevante de [[PASSO-A-PASSO-GOOGLE]] para o que só o Felipe pode configurar manualmente.
10. Depois que o Felipe executa a parte dele, ele avisa e a IA confirma o fechamento do ciclo (atualiza status pra "OK" no índice).

## Campo padrão na ficha do cliente

Inserido em `FICHA-CLIENTE.md` **somente quando aquele cliente passa pela auditoria** — não retroativo em massa nos clientes que ainda não foram auditados.

```
## Saúde Técnica do Site
- Site online: [sim/não] — URL
- Hospedagem confirmada: [Vercel/Hostinger/outro]
- Search Console: [conectado/pendente] — verificado em [data]
- Indexação: [X/Y páginas]
- Favicon: [correto/genérico/pendente]
- Google Analytics (GA4): [instalado/pendente] — property ID
- PostHog: [instalado/pendente] — project
- Última auditoria: [data]
```

## Skills e docs reaproveitados (não recriar)

- [[obsidian-cli]] — ler/atualizar `FICHA-CLIENTE.md`, criar wikilinks.
- [[favicon-setup]] — guia técnico de favicon + reindexação via GSC.
- [[marketing-seo]] — GA4/GTM, sitemap.xml, robots.txt, Schema.
- [[rv-posthog-setup]] — o que checar de instalação do PostHog.
- [[rv-entrega]] — padrão de invocar `/improve quick` no repo do cliente.
- `reference_diagnostico_hospedagem_real.md` (em `operacao/gestao/infraestrutura/memoria/`) — runbook de nslookup/curl/ipinfo pra confirmar hospedagem real.

## Nota de escopo — VisionFlow

Existe um plano aprovado e não implementado no VisionFlow (`operacao/projetos/_RV-Internos/visionflow/plans/006-dashboard-monitoramento-uptime.md`) para um dashboard de uptime dentro do CRM. Esta metodologia é o processo documental via Obsidian/skill — os dois podem convergir no futuro, mas não são a mesma coisa. Não confundir escopo.

## Loop de aprimoramento contínuo

Cada cliente auditado alimenta a skill, não é só uma execução isolada:
- Ao final de cada auditoria, o que surgiu de novo (padrão de erro recorrente, passo que faltava, critério não previsto) é registrado na seção `## Aprendizados` do próprio `skills/rv-auditoria-tecnica-site/SKILL.md`.
- Aprendizado genérico o bastante é incorporado direto no checklist/fluxo da skill — não fica só anotado.
- Esta metodologia reflete o processo geral estabilizado; a skill absorve os ajustes finos de execução.

---

*Criado em 29/07/2026. Ver também: [[INDICE-CLIENTES]], [[PASSO-A-PASSO-GOOGLE]], [[rv-auditoria-tecnica-site]].*
