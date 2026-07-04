# Plano Mestre — Sócio Digital

> Documento de orientação principal. Quando em dúvida sobre prioridade, ordem ou estratégia macro, este arquivo é a fonte da verdade.

## Visão estratégica

A Real Vision já tem 5 pilares (sites, GMN, tours 360°, foto/drone, automações com IA). **Sócio Digital é o 6º pilar — e é o que monetiza a metodologia operacional que a própria Real Vision já usa internamente** (o Company OS em `C:\Users\Computador\Desktop\Real Vision\`).

### Por que agora

- Real Vision usa essa estrutura internamente há meses (case validado de dentro pra fora)
- Tecnologia atingiu maturidade pra leigos usarem (Claude Code, MCPs como Higgsfield + computer-use, novos modelos baratos)
- Mercado local (Bahia + PMEs Brasil) **não tem nenhuma oferta similar** — janela de oportunidade clara
- Receita recorrente (mensalidade) compensa volatilidade dos serviços avulsos da Real Vision

### Modelo de receita

- **One-time:** R$ 2.500 (Essencial) a R$ 8.000 (Empresarial) por implementação
- **Recorrente:** R$ 400 a R$ 1.500 mensais por cliente
- **Margem alta:**
  - Plano Pro do Claude o cliente paga direto à Anthropic (USD 20/mês)
  - Nextcloud é open-source
  - Vision Cloud é Hostinger com markup
  - Custo principal: tempo do Felipe (implementação + suporte)

### Diferencial competitivo

- **Ninguém faz isso no Brasil ainda** — pesquisa por "Sócio Digital", "Funcionário Digital de IA implementado remoto", etc retorna zero concorrência direta
- Implementação no computador do cliente (não SaaS) → maior switching cost
- Conhecimento metodológico que a Real Vision desenvolveu sozinha → barreira de entrada

## Fases do projeto

| Fase | Nome | Status | Saída principal |
|---|---|---|---|
| 0 | Documentação completa | 🟢 Concluída | Esta pasta `socio-digital/` |
| 1 | Página `/socio-digital` | ⏳ Próxima | Página publicada no real-vision-core |
| 2 | Operação interna ativa | ⏳ Pendente | Templates editáveis + estrutura base cliente |
| 3 | Conteúdo SEO | ⏳ Pendente | 3 blog posts publicados |
| 4 | Marketing pago | ⏳ Pendente | Campanha Google Ads + criativos Higgsfield |
| 5 | Cliente piloto | ⏳ Pendente | 1 cliente real implementado com NPS ≥ 9 |
| 6 | Iteração + escala | ⏳ Pendente | 3+ clientes ativos, processo refinado |

## Cronograma alvo (estimativa, ajustável)

| Semana | Foco | Saída |
|---|---|---|
| 1 (atual) | Fases 0 + início 1 | Docs prontos, briefing aprovado |
| 2 | Fase 1 completa | Página publicada |
| 3 | Fase 2 + início 3 | Templates ativos + 1º blog post |
| 4 | Fase 3 | 3 blog posts publicados |
| 5–6 | Fase 4 | Criativos Higgsfield + Google Ads no ar |
| 7+ | Fase 5 + captação | Diagnósticos rolando, 1º cliente fechado |
| 8–12 | Fase 6 | 3 clientes ativos, MRR > R$ 2.400 |

## KPIs por fase

### Fase 1 (página)
- Lighthouse mobile ≥ 90
- LCP < 2.5s
- Schema markup validado em validator.schema.org
- Form conectado e enviando teste

### Fase 3 (conteúdo)
- 3 posts publicados com schema FAQ
- Cada post indexado pelo Google em ≤ 14 dias
- Internal links pra `/socio-digital` em todos

### Fase 4 (marketing)
- CTR Search > 2%
- CTR Performance Max > 1%
- CPL (custo por lead) < R$ 100
- Pelo menos 5 leads qualificados/semana após D+14

### Fase 5 (piloto)
- Implementação em ≤ 4h
- Cliente reporta primeira tarefa delegada em ≤ 7 dias
- NPS ≥ 9
- Cliente autoriza case study + depoimento gravado

### Pós-lançamento (mês 1–3)
- 3 clientes ativos
- MRR ≥ R$ 2.400
- Tempo médio de resposta a suporte < 4h (Profissional/Empresarial: < 4h; Essencial: < 24h)
- Churn = 0 nos primeiros 90 dias

## Premissas operacionais

- **Felipe é único operador no momento** — todas as fases precisam minimizar trabalho recorrente manual
- **Cliente alvo:** PMEs locais (pousadas, restaurantes, comércio) + festivais nacionais + agências
- **Idioma:** PT-BR sempre; EN é fase 2 (global, futuro)
- **Stack confirmado:**
  - real-vision-core (Lovable hoje, Claude Code no futuro)
  - Hospedagem: Hostinger
  - Deploy: Vercel
  - Sincronização cliente multiusuário: Nextcloud (interno, apresentado como "Sincronização Vision")
  - Criativos: Higgsfield (via MCP)
  - Agentes IA: Claude Code (cliente paga plano Pro Anthropic direto)

## Restrições / Não-objetivos

- **Não vamos** desenvolver software proprietário (SaaS) — toda a IP fica em metodologia + skills + processo
- **Não vamos** vender Claude Code de cara — vendemos *transformação operacional* que usa Claude por baixo
- **Não vamos** revelar stack interno pro cliente ("Vision Cloud" = Hostinger; "Sincronização Vision" = Nextcloud)
- **Não vamos** aceitar cliente que não passa nos critérios mínimos (ver `02-SERVICO-COMPLETO.md`)

## Decisões pendentes (BLOQUEANTES — Felipe precisa decidir)

1. **URL:** `/socio-digital` (recomendado) ou `/socio-digital-real-vision`
2. **Funil:** diagnóstico grátis 30min (recomendado) ou form direto orçamento
3. **Cliente piloto:** quem
4. **Orçamento Google Ads:** R$ 3.000/mês inicial (recomendado) ou outro
5. **Inspirações visuais:** 2–3 links pro Claude Design

Detalhes e justificativas das recomendações em `06-EXECUCAO-PROXIMOS-PASSOS.md`.

## Status atual (2026-05-24)

- ✅ Nome definido: **Sócio Digital** (Cortex descartado — `cortex-intelligence.com` já existe no Brasil)
- ✅ Pricing aprovado: R$ 2.500/4.500/8.000 + R$ 400/800/1.500
- ✅ Brinde Vision Cloud aprovado (apresentação como marca própria)
- ✅ Nextcloud confirmado como solução técnica do tier multiusuário
- ✅ Stack confirmado: Hostinger + Vercel + Lovable
- ✅ Higgsfield MCP conectado
- ✅ Skill `find-skills` instalada globalmente
- ⏳ Aguardando decisões bloqueantes pra iniciar Fase 1
