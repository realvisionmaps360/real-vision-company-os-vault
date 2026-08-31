---
title: Índice de Clientes — Saúde Técnica do Site
tags: [infraestrutura, auditoria, indice]
id: PRC-009
tipo: processo
pertence_a: ["[[operacao/gestao/README]]"]
atualizado_em: 2026-08-28
---

# Índice de Clientes — Saúde Técnica do Site

> Controle central de quantos clientes têm site online e em que estado de configuração técnica. Atualizado pela skill [[rv-auditoria-tecnica-site]] a cada auditoria concluída. Processo completo em [[METODOLOGIA]].

Uma linha por cliente auditado — clientes ainda não auditados não aparecem aqui (evita dado inventado).

| Cliente | Site Online | Search Console | Indexação | Favicon | GA4 | PostHog | Clarity | Última Auditoria |
|---|---|---|---|---|---|---|---|---|
| [[operacao/clientes/arquivos/Gabriel Iberg - Solarium Aarau/FICHA-CLIENTE\|Gabriel Iberg - Solarium Aarau]] | sim — www.aarau-solarium.ch | conectado e verificado | 6 páginas (duplicação corrigida) | correto | instalado | instalado em produção 02/08/2026, ver [[operacao/clientes/arquivos/Gabriel Iberg - Solarium Aarau/ANALYTICS-POSTHOG\|ANALYTICS-POSTHOG]] | instalado, confirmado no código (`index.html`) — registrado 02/08/2026 | 29/07/2026 |
| [[operacao/clientes/arquivos/Alessandro Furtado - Associação Beneficiente Conecta Saúde/FICHA-CLIENTE\|Alessandro Furtado - Associação Beneficiente Conecta Saúde]] | sim | conectado (02/08/2026) | 6/7 solicitadas indexação, aguardando processamento | não auditado nesta rodada | instalado (relatório mensal já usa GA4) | instalado em produção (02/08/2026, ver [[operacao/clientes/arquivos/Alessandro Furtado - Associação Beneficiente Conecta Saúde/ANALYTICS-POSTHOG\|ANALYTICS-POSTHOG]]) | instalado, 02/08/2026, ver [[operacao/clientes/arquivos/Alessandro Furtado - Associação Beneficiente Conecta Saúde/ANALYTICS-CLARITY\|ANALYTICS-CLARITY]] | 02/08/2026 |

> **Site institucional da própria Real Vision** não entra nesta tabela (não é cliente), mas também
> tem Clarity e PostHog instalados — confirmado no código (`index.html` e [[POSTHOG-ANALYTICS]] em
> `_RV-Internos/documentacao/`). Registrar aqui como referência: ambos ativos desde antes desta
> atualização (02/08/2026).

## Como ler

- **Site Online**: sim/não + URL.
- **Search Console**: conectado / pendente.
- **Indexação**: X/Y páginas indexadas.
- **Favicon**: correto / genérico / pendente.
- **GA4**: instalado / pendente.
- **PostHog**: instalado / pendente / não aplicável.
- **Clarity**: instalado / pendente / não aplicável.
- **"não auditado nesta rodada"**: campo que ninguém checou ainda nesta passada — não é "não" nem
  "pendente", é falta de dado. Nunca inventar um status aqui; rodar a auditoria completa
  ([[rv-auditoria-tecnica-site]]) pra preencher de verdade.

**Regra fixa — data obrigatória em PostHog e Clarity:** toda célula de PostHog ou Clarity
(nesta tabela e nos documentos `ANALYTICS-POSTHOG.md`/`ANALYTICS-CLARITY.md` de cada cliente)
carrega a data em que aquele status foi confirmado/registrado — nunca só "instalado" sem data.
Se for instalação em produção, usar "Instalado em produção: DD/MM/AAAA"; se for só confirmação
via código/local, deixar explícito que é isso e datar como "registrado em DD/MM/AAAA". Sem data,
o campo não serve de controle histórico.

Cada célula "Cliente" é um wikilink para o `FICHA-CLIENTE.md` daquele cliente — clicar leva direto pra ficha completa.

**Atenção ao criar novas linhas:** todo cliente tem um arquivo chamado `FICHA-CLIENTE.md` — um wikilink curto tipo `[[FICHA-CLIENTE]]` é ambíguo (o Obsidian não sabe qual cliente). Usar sempre o caminho completo: `[[operacao/clientes/arquivos/[Nome-Cliente]/FICHA-CLIENTE|Nome de exibição]]`.

---

*Criado em 29/07/2026. Ver também: [[METODOLOGIA]], [[PASSO-A-PASSO-GOOGLE]].*
