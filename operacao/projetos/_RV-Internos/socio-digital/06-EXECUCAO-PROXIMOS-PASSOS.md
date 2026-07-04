# Execução — Próximos Passos

> Este documento existe pra outro modelo (Sonnet ou outro Claude) continuar o projeto de onde parou.
> Ordem exata + dependências + decisões pendentes + comandos prontos.

---

## Decisões pendentes do Felipe (BLOQUEANTES)

Antes de iniciar qualquer execução além da Fase 0, Felipe precisa decidir:

### Decisão 1 — URL da página
- **Opção A (recomendada):** `/socio-digital` — limpa, memorável, SEO ainda fica bom via title
- **Opção B:** `/socio-digital-real-vision` — URL longa, mais keywords, mas pior UX
→ **Recomendação:** Opção A

### Decisão 2 — Funil de entrada
- **Opção A (recomendada):** Call de diagnóstico grátis 30min como porta de entrada
  - Qualifica lead, aumenta conversão, permite ajustar tier ao vivo
- **Opção B:** Form direto pra orçamento, sem call obrigatória
  - Reduz fricção mas reduz conversão
→ **Recomendação:** Opção A

### Decisão 3 — Cliente piloto
**Quem vai ser o primeiro case (pode ser implementação grátis em troca de depoimento + permissão pra usar como case)?**

Sugestões pra Felipe avaliar:
- Cliente atual da Real Vision em outro pilar (tour 360 ou GMN) que já confie
- Pousada conhecida em Itacaré (Felipe escolhe 1)
- Restaurante local (Felipe escolhe 1)
- Pessoa próxima do círculo do Felipe com PME

Critérios pra cliente piloto:
- [ ] Toleraria iteração (algo pode dar errado nas primeiras semanas)
- [ ] Abriria acesso ao computador
- [ ] Daria depoimento gravado em vídeo
- [ ] Autorizaria virar case público

### Decisão 4 — Orçamento Google Ads
- **Opção A (recomendada):** R$ 3.000/mês inicial (R$ 1.500 Search + R$ 1.500 Performance Max)
- **Opção B:** R$ 1.500/mês inicial (só Search, sem PMax) — mais conservador
- **Opção C:** R$ 5.000+ mês — mais agressivo, fecha clientes mais rápido
→ **Recomendação:** Opção A nos primeiros 30 dias; escalar pra R$ 5.000 se CPL ficar abaixo de R$ 100

### Decisão 5 — Inspirações visuais pro Claude Design
**Felipe precisa enviar 2 a 3 links de páginas que ele acha visualmente bonitas** pra Claude Design referenciar no design da `/socio-digital`.

Sugestões de inspiração (Felipe pode usar ou trocar):
- linear.app
- vercel.com/products
- arc.net
- raycast.com

---

## Ordem de execução (10 etapas — NÃO PULAR)

### ✅ Etapa 0 — Documentação completa
**Status:** Concluída em 2026-05-24
**Saída:** Esta pasta `socio-digital/` com 7 documentos.

---

### ▶️ Etapa 1 — Aprovação do briefing da página

**Quem:** Felipe.
**Bloqueador:** decisões 1, 2, 5 acima.

**O que fazer:**
1. Felipe lê `03-PAGINA-SERVICO-BRIEFING.md`
2. Responde as 5 decisões bloqueantes
3. Marca o que mudar no briefing (se algo)

**Saída:** briefing aprovado + decisões respondidas (anotar em `01-PLANO-MESTRE.md` seção "Status atual").

---

### Etapa 2 — Design via Claude Design

**Quem:** Felipe.
**Bloqueador:** Etapa 1 concluída + decisão 5.

**O que fazer:**
1. Felipe abre uma sessão no Claude Design (Claude.ai com Artifacts)
2. Anexa:
   - Conteúdo de `03-PAGINA-SERVICO-BRIEFING.md`
   - Conteúdo de `contexto/DESIGN.md`
   - Conteúdo de `contexto/VOZ.md`
   - 2–3 links de inspiração (decisão 5)
3. Pede: "Crie o mockup completo (React + Tailwind) da página `/socio-digital` seguindo este briefing. Mobile + desktop. Use placeholders pros assets visuais (mockup laptop, ícones, fotos)."
4. Itera com Claude Design até ficar satisfeito

**Saída:** código React/HTML/Tailwind funcional, pronto pra integrar no real-vision-core.

---

### Etapa 3 — Integração no real-vision-core

**Quem:** Claude Code (próximo modelo Sonnet).
**Bloqueador:** Etapa 2 concluída.

**O que fazer:**
1. Felipe passa pro Claude Code o output do Claude Design
2. Abrir projeto `C:\Users\Computador\Documents\Site Novo Real Vision\real-vision-core`
3. Verificar estrutura atual:
   ```bash
   git status
   git pull origin main  # sync com Lovable
   ```
4. Criar nova rota `/socio-digital` ou conforme decisão 1
5. Integrar componentes seguindo o padrão React do projeto
6. Adicionar JSON-LD schema markup (Service + FAQPage) — conforme `03-PAGINA-SERVICO-BRIEFING.md`
7. Adicionar meta tags SEO (title, description, OG, Twitter Card)
8. Configurar form de contato:
   - Destino: definir com Felipe (VisionFlow CRM ou e-mail direto)
   - Validação client-side
   - Disparar evento GA4 `diagnostico_agendado` no submit
9. Adicionar link interno no header "Soluções" → `/socio-digital`
10. Rodar Lighthouse (`npm run build` + serve) e ajustar pra mobile ≥ 90, desktop ≥ 95
11. Validar schema em https://validator.schema.org/
12. Validar OG em https://www.opengraph.xyz/
13. Commit e push (deploy automático via Vercel/Lovable)

**Saída:** página `/socio-digital` no ar com Lighthouse ≥ 90 mobile.

---

### Etapa 4 — Templates operacionais editáveis

**Quem:** Felipe + Claude.

**O que fazer:**
1. Criar pasta `operacao/projetos/socio-digital/templates-editaveis/`
2. Pegar cada template de `05-TEMPLATES-OPERACIONAIS.md`
3. Criar versão editável de cada um:
   - **Briefing** → Google Doc ou Notion page
   - **Proposta** → Google Doc com merge fields ou Notion template
   - **Checklist implementação** → Notion checklist ou Google Doc imprimível
   - **Diário de Operação** → arquivo `.md` template
   - **Relatório mensal** → Google Doc template com merge fields
   - **E-mail pós-venda** → template no Gmail (com filtros/merge)
   - **NPS** → Google Form ou Tally
4. Linkar cada template no índice da pasta

**Saída:** todos os templates prontos pra Felipe usar imediatamente em produção.

---

### Etapa 5 — Estrutura base do cliente (template Company OS adaptado)

**Quem:** Claude Code.

**O que fazer:**
1. Criar pasta de template: `operacao/projetos/socio-digital/template-cliente-base/`
2. Replicar estrutura simplificada do Company OS Real Vision:
   ```
   template-cliente-base/
   ├── AGENTS.md (versão genérica, [CLIENTE] como placeholder)
   ├── CLAUDE.md (versão genérica)
   ├── contexto/
   │   ├── EMPRESA.md (template com seções a preencher)
   │   ├── VOZ.md (template)
   │   └── DESIGN.md (opcional, se cliente tiver site)
   ├── operacao/
   │   ├── clientes/  (vazia)
   │   ├── financeiro/  (vazia)
   │   └── marketing/  (vazia)
   ├── DIARIO.md (template com cabeçalho explicativo)
   └── .claude/
       └── skills/
           └── cliente-style/
               └── SKILL.md (template skill)
   ```
3. Criar variantes por nicho:
   - `template-cliente-base/pousada/` (operacao/ ajustada: reservas/, reviews/, instagram/)
   - `template-cliente-base/restaurante/` (operacao/ ajustada: cardapio/, pedidos/, avaliacoes/)
   - `template-cliente-base/ecommerce/` (operacao/ ajustada: produtos/, pedidos/, atendimento/)
   - `template-cliente-base/festival/` (operacao/ ajustada: imprensa/, inscricoes/, redes/)
   - `template-cliente-base/agencia/` (operacao/ ajustada: sub-clientes/, midia-paga/, relatorios/)
4. Criar README explicando como copiar/instanciar pra um cliente novo
5. (Opcional) Script PowerShell ou bash que automatiza:
   ```
   ./novo-cliente.ps1 -nome "Pousada do Mar" -nicho "pousada" -path "C:\Users\joao\Documents\"
   ```

**Saída:** templates prontos pra usar na call de implementação — economiza 30min de configuração por cliente.

---

### Etapa 6 — Blog posts (3 posts iniciais)

**Quem:** Claude Code escreve, Felipe revisa.
**Bloqueador:** Etapa 3 concluída (precisa da página pra linkar).

**O que fazer:**

#### Post 1 — Conceito
1. Escrever em `operacao/projetos/socio-digital/blog-posts/01-substituindo-planilhas-por-socio-digital.md`
2. 1.500 palavras
3. Estrutura: H1, 5 H2s, FAQ schema (3 Qs), CTA pra `/socio-digital`
4. Felipe revisa
5. Publicar via Lovable
6. Indexar manualmente no Google Search Console

#### Post 2 — Custo
1. Escrever em `02-socio-digital-vs-estagiario.md`
2. 1.500 palavras + tabela comparativa + cálculo ROI
3. Felipe revisa
4. Publicar (1 semana após Post 1)

#### Post 3 — Case Real Vision
1. Escrever em `03-fim-tarefas-repetitivas-case-real-vision.md`
2. 1.800 palavras, 1ª pessoa Felipe
3. Pedir prints pro Felipe (estrutura da Real Vision, screens reais)
4. Felipe revisa e ajusta tom pessoal
5. Publicar (1 semana após Post 2)

**Saída:** 3 posts indexados, gerando tráfego orgânico em D+30 a D+60.

---

### Etapa 7 — Brand kit Higgsfield + primeiros criativos

**Quem:** Claude (com Higgsfield MCP).
**Bloqueador:** Etapa 3 concluída (página tem que existir pra criar webproduct).

**O que fazer:**

1. **Criar brand kit Real Vision:**
   ```
   show_marketing_studio({
     action: 'create',
     type: 'brand_kit',
     brand_kit: {
       brand_name: 'Real Vision',
       tagline: 'Sócio Digital — o parceiro de IA que executa pela sua empresa',
       industry: 'Tecnologia / Marketing Digital',
       tone_of_voice: ['direto', 'técnico', 'sem rodeios', 'premium'],
       brand_values: ['execução', 'transparência', 'autonomia do cliente'],
       colors: [<extrair de contexto/DESIGN.md>],
       fonts: [<extrair de contexto/DESIGN.md>],
       website_url: 'https://realvisionmaps.com',
       social_links: { youtube: 'https://www.youtube.com/@RealVisionMaps' }
     }
   })
   ```

2. **Criar avatar Felipe Garcia:**
   - Felipe envia foto dele em alta qualidade
   - `media_upload` da foto
   - `show_marketing_studio({ action: 'create', type: 'avatar', avatars: [...] })`

3. **Criar webproduct "Sócio Digital":**
   ```
   show_marketing_studio({
     action: 'fetch',
     type: 'webproduct',
     url: 'https://realvisionmaps.com/socio-digital'
   })
   ```

4. **Gerar primeiros 3 criativos prioritários** (ver `04-MARKETING-CRIATIVOS.md` pros briefings completos):
   - Conceito 2 (imagem) — "Versus estagiário"
   - Conceito 4 (imagem) — "Implementação em 4h"
   - Conceito 8 (imagem) — "9 tarefas em 4 minutos"

5. **Salvar URLs/jobs em** `operacao/projetos/socio-digital/criativos-higgsfield/LOG.md`:
   ```
   ## 2026-XX-XX
   - Conceito 2 — Versus estagiário — 1:1 — job_id: xxx — url: yyy — status: aprovado
   - Conceito 2 — Versus estagiário — 4:5 — job_id: xxx — url: yyy — status: pendente
   ```

6. **Felipe valida** cada criativo e marca aprovado / refazer

**Saída:** 3 criativos prontos pra subir no Performance Max.

---

### Etapa 8 — Campanha Google Ads

**Quem:** Felipe (com Claude orientando passo a passo).
**Bloqueador:** Etapa 3 (página) + Etapa 7 (criativos) + decisão 4 (orçamento).

**O que fazer:**

1. Felipe loga em Google Ads
2. **Pré-requisitos:**
   - [ ] GA4 instalado e enviando dados (verificar em https://analytics.google.com/)
   - [ ] Evento de conversão `diagnostico_agendado` aparece em GA4 → Eventos
   - [ ] Google Ads linkado com GA4 (em Admin → Vinculação de produto)
   - [ ] Tag de conversão importada do GA4 pro Google Ads
3. **Campanha Search:**
   - Criar campanha tipo "Pesquisa"
   - Orçamento diário: R$ 50 (R$ 1.500/mês)
   - Locations: Brasil (ajustar conforme alcance)
   - Languages: Português
   - Bidding: Maximizar conversões com CPA alvo R$ 200
   - Criar 4 grupos de anúncios conforme `04-MARKETING-CRIATIVOS.md`
   - Adicionar headlines, descriptions, sitelinks, callouts conforme documento
   - Adicionar negative keywords
4. **Campanha Performance Max:**
   - Criar campanha tipo "Performance Max"
   - Orçamento diário: R$ 50 (R$ 1.500/mês)
   - URL final: `/socio-digital`
   - Subir assets:
     - 5 imagens 1.91:1 (gerar Higgsfield se faltar)
     - 5 imagens 1:1
     - 5 imagens 4:5
     - 5 vídeos (gerar Higgsfield)
     - 5 logos Real Vision
     - 5 headlines curtos + 5 longos
     - 4 descriptions
   - Sinais de audiência: pessoas que pesquisaram automação empresarial + segmento donos PMEs
   - Conversão alvo: `diagnostico_agendado`
5. **Lançar** ambas as campanhas
6. Monitorar diariamente nos primeiros 7 dias

**Saída:** campanhas no ar, lead chegando no form da `/socio-digital`.

---

### Etapa 9 — Captação + cliente piloto

**Quem:** Felipe.
**Bloqueador:** Etapa 8 rodando + decisão 3 (cliente piloto se Felipe quiser começar com case próximo antes dos leads pagos).

**O que fazer:**

1. **Path A — Piloto próximo (recomendado se decisão 3 tem candidato):**
   - Convidar cliente piloto pra implementação gratuita
   - Implementar (4h, mesmo processo do checklist `05-TEMPLATES-OPERACIONAIS.md`)
   - Acompanhar de perto nas primeiras 4 semanas
   - Coletar depoimento em vídeo
   - Atualizar `/socio-digital` com depoimento real

2. **Path B — Lead pago primeiro:**
   - Lead chega via form (Google Ads → /socio-digital → form)
   - Felipe responde em < 4h
   - Agenda diagnóstico 30min
   - Realiza diagnóstico → preenche briefing
   - Envia proposta
   - Cliente aceita → paga 50% setup
   - Agenda implementação
   - Realiza implementação (4h)
   - Pós-venda D+7
   - Relatório mensal D+30

3. **Ambos os caminhos:**
   - Documentar tudo em `operacao/clientes/[nome-cliente]/`
   - Atualizar VisionFlow CRM
   - Marcar lembretes no Google Calendar

**Saída:** 1º cliente ativo + case study pra usar em marketing.

---

### Etapa 10 — Iteração + escala

**Quem:** Felipe + Claude.
**Bloqueador:** 30 dias de campanha rodando + 1 cliente ativo no mínimo.

**O que fazer:**

#### Aos 30 dias de campanha:
1. Analisar métricas Google Ads:
   - CTR por grupo de anúncio
   - CPL real vs alvo (R$ 100)
   - Taxa de conversão form → call → cliente
2. Pausar criativos com performance ruim
3. Escalar criativos com performance boa (aumentar lances)
4. Refinar keywords (adicionar negative keywords baseado em search terms reais)
5. A/B test 2 novas headlines

#### Após 1º cliente fechado:
6. Coletar depoimento + autorização case study
7. Atualizar `/socio-digital` substituindo prova social genérica por real
8. Postar case study como Post 4 do blog (ou stories no LinkedIn)

#### Aos 60 dias / 3 clientes ativos:
9. Refinar processo de implementação (meta: reduzir de 4h pra 3h)
10. Publicar Post 4 (Vision Cloud) — `BLOG-POSTS-PIPELINE.md`
11. Iniciar próximas frentes:
    - FB Ads (próxima fonte de tráfego)
    - YouTube Ads (remarketing)
    - LinkedIn outbound (decisão Felipe)

**Saída:** processo refinado, MRR > R$ 2.400, próximas frentes mapeadas.

---

## Onde estão as coisas (referência rápida)

| O que procuro | Onde está |
|---|---|
| Visão geral do projeto + decisões pendentes | `01-PLANO-MESTRE.md` |
| Tiers, preços, escopo, processo de entrega | `02-SERVICO-COMPLETO.md` |
| Briefing detalhado da página `/socio-digital` | `03-PAGINA-SERVICO-BRIEFING.md` |
| Estratégia Google Ads + Higgsfield + blog | `04-MARKETING-CRIATIVOS.md` |
| Templates: briefing, proposta, checklist, etc | `05-TEMPLATES-OPERACIONAIS.md` |
| Pipeline blog posts | `../BLOG-POSTS-PIPELINE.md` |
| Contexto da Real Vision (empresa) | `../../../contexto/EMPRESA.md` |
| Voz da Real Vision | `../../../contexto/VOZ.md` |
| Design system Real Vision | `../../../contexto/DESIGN.md` |
| Memória persistente Claude | `~/.claude/projects/.../memory/MEMORY.md` |
| Site real-vision-core | `C:\Users\Computador\Documents\Site Novo Real Vision\real-vision-core` |

---

## Tarefa futura — Mapeamento com draw.io (aguardando desenvolvimento do curso)

**Ferramenta:** draw.io / app.diagrams.net (gratuito, open source, roda no browser)
**GitHub:** https://github.com/jgraph/drawio

**O que fazer quando chegar a hora:**
1. Criar diagramas da estrutura da Real Vision (pipeline de cliente, fluxo de produção de tour 360°, arquitetura de sistemas, Company OS visual)
2. Exportar os diagramas em PNG/SVG e incluir na documentação do curso
3. O aluno aprende a mapear a própria empresa usando essa mesma ferramenta — vira módulo prático

**Por quê:** o diagrama serve dupla função — documenta internamente o Company OS **e** vira conteúdo didático do Curso Sócio Digital, ensinando o aluno a fazer o mesmo na empresa dele.

**Quando fazer:** quando o desenvolvimento do conteúdo do curso avançar (pós-Etapa 1 + Etapa 4 concluídas).

**Não fazer agora** — registrado para o momento certo.

---

## O que NÃO fazer

- ❌ Não começar Etapa 3 sem Etapa 2 (briefing precisa virar mockup primeiro)
- ❌ Não publicar página sem rodar Lighthouse + validar schema
- ❌ Não rodar Google Ads sem GA4 + tag de conversão configurados (vai queimar dinheiro)
- ❌ Não aceitar cliente que não passe nos critérios mínimos (`02-SERVICO-COMPLETO.md`)
- ❌ Não revelar pro cliente que "Vision Cloud" = Hostinger ou "Sincronização Vision" = Nextcloud
- ❌ Não fazer implementação sem o pagamento dos 50% iniciais confirmado
- ❌ Não escalar Performance Max nos primeiros 14 dias (deixa Google aprender)
- ❌ Não pular o e-mail D+7 — é onde a maioria dos clientes destrava ou churn

## Tips operacionais

- **Higgsfield erro temporário:** se `balance` ou `list_workspaces` der erro 500, tentar de novo em 5min. Geralmente é instabilidade do servidor.
- **Lovable + Git:** sempre fazer `git pull origin main` antes de editar o `real-vision-core` localmente (Lovable faz push automático que pode estar à frente do local).
- **Plano Pro Claude do cliente:** orientar o cliente a criar conta direto em https://claude.ai e ativar Pro ANTES da call de implementação (economiza 15 min).
- **TeamViewer vs AnyDesk:** AnyDesk é mais leve, TeamViewer é mais conhecido. Deixar cliente escolher.
- **Internet do cliente fraca:** se < 50 Mbps, sugerir cliente reagendar ou conectar via cabo no dia da implementação.
