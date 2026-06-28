# TIMELINE – DESENVOLVIMENTO LANDING PAGE SOLARIUM AARAU

**Projeto:** Landing Page Meta Ads para Solarium Aarau  
**Cliente:** Gabriel  
**Data Início:** 2026-06-24  
**Responsáveis:** Felipe Garcia, Romana Loznjakovic  
**Meta:** Entrega oficial da landing page

---

## Visão Geral

Esta timeline serve como **documento de rastreamento** para toda a execução do projeto até a entrega final ao Gabriel.

Cada fase tem:
- **Duração estimada**
- **Tarefas específicas**
- **Responsável**
- **Status** (Pendente / Em Progresso / Concluído)
- **Critério de sucesso**

---

## FASE 0: PRÉ-DESENVOLVIMENTO (Confirmação de Escopo)

**Duração estimada:** 3-5 dias úteis  
**Status:** ✅ CONCLUÍDA (28/06/2026) — Gabriel delegou decisões à Real Vision

### Tarefa 0.1: Aguardar Respostas do Gabriel
- **Status:** ✅ Concluída
- **Resultado:** Gabriel respondeu em 17/06 via WhatsApp pedindo que a Real Vision decida por ele

### Tarefa 0.2: Consolidar Escopo Final
- **Status:** ✅ Concluída
- **Decisões tomadas:** Ver RELATORIO seções 10 e 12
- **Resumo:** `/willkommen` no site atual + Meta Pixel + GA4 + sem gestão de ads + projeto único

### Tarefa 0.3: Calcular Orçamento Final
- **Status:** ✅ Concluída
- **Valor definido:** CHF 1.200 (inclui landing page completa + tracking)

### Tarefa 0.4: Criar Proposta Comercial
- **Status:** ⏳ Pendente — será enviada junto com o link da landing page pronta
- **Estratégia:** mostrar o produto pronto antes de pedir aprovação formal

### Tarefa 0.5: Enviar Link Provisório + Proposta ao Gabriel
- **Status:** ⏳ Pendente — aguardando deploy da landing page

---

## FASE 1: PLANEJAMENTO E DESIGN (Estrutura da Landing Page)

**Duração estimada:** 2-3 dias úteis  
**Status:** ⏳ Pendente (começa após aprovação de escopo)  

### Tarefa 1.1: Definir Arquitetura da Landing Page
- **Responsável:** Felipe Garcia
- **Ação:** Estruturar seções, componentes, fluxo de conversão
- **Entregável:** Documento com estrutura detalhada (wireframe em texto)
- **Critério de sucesso:** Estrutura validada e documentada

### Tarefa 1.2: Mapear Copy em Alemão
- **Responsável:** Romana Loznjakovic
- **Ação:** Revisar e adaptar copy existente do site para o tom da landing page
- **Entregável:** Arquivo de copy em .json ou .md
- **Critério de sucesso:** Copy pronto e alinhado com brand voice

### Tarefa 1.3: Definir Assets e Imagens
- **Responsável:** Felipe Garcia
- **Ação:** Listar quais assets já existentes serão usados
- **Entregável:** Spreadsheet ou documento com mapeamento
- **Critério de sucesso:** 100% dos assets identificados

### Tarefa 1.4: Definir Fluxo de Conversão
- **Responsável:** Felipe Garcia
- **Ação:** Mapear journey do visitante até a ação final (visita física)
- **Entregável:** Diagrama ou documento de user flow
- **Critério de sucesso:** Fluxo aprovado e CTA definido

### Tarefa 1.5: Criar Especificação Técnica
- **Responsável:** Felipe Garcia
- **Ação:** Documentar componentes React a usar, i18n, SEO, tracking
- **Entregável:** Documento técnico
- **Critério de sucesso:** Specs claras para implementação

---

## FASE 2: DESENVOLVIMENTO FRONTEND (Construção)

**Duração estimada:** 4-6 dias úteis  
**Status:** ⏳ Pendente (começa após Fase 1)  

### Tarefa 2.1: Criar Nova Rota e Componente Principal
- **Responsável:** Felipe Garcia
- **Ação:** `pages/LandingPageWillkommen.tsx` (ou nome definido)
- **Entregável:** Componente funcional (sem styling)
- **Critério de sucesso:** Rota acessível em `/willkommen`

### Tarefa 2.2: Implementar Seção Hero
- **Responsável:** Felipe Garcia
- **Ação:** Hero com headline, subheadline, CTA, imagem
- **Entregável:** Componente visualmente completo
- **Critério de sucesso:** Visual aprovado, imagem otimizada

### Tarefa 2.3: Implementar Seção de Benefícios (3 passos)
- **Responsável:** Felipe Garcia
- **Ação:** Reusar componentes SpotlightCard, adicionar badges
- **Entregável:** Cards visualmente alinhadas
- **Critério de sucesso:** Layout responsivo, funcionando mobile/desktop

### Tarefa 2.4: Implementar Seção de Prova Social (Google Reviews)
- **Responsável:** Felipe Garcia
- **Ação:** Cards com avaliações, estrelas, nome de clientes
- **Entregável:** Seção com review cards
- **Critério de sucesso:** Reviews renderizando corretamente

### Tarefa 2.5: Implementar Seção de Bônus
- **Responsável:** Felipe Garcia
- **Ação:** Cards com tabela de bônus 50/100/200 CHF
- **Entregável:** Seção com preços e ilustrações
- **Critério de sucesso:** Números corretos, layout limpo

### Tarefa 2.6: Implementar Preview do Tour 360°
- **Responsável:** Felipe Garcia
- **Ação:** Imagem com CTA para abrir tour completo
- **Entregável:** Seção com botão de link externo
- **Critério de sucesso:** Link funciona, imagem otimizada

### Tarefa 2.7: Implementar CTA Final + Mapa
- **Responsável:** Felipe Garcia
- **Ação:** Google Maps embed + botão "Route starten"
- **Entregável:** Seção final com mapa e horários
- **Critério de sucesso:** Mapa funciona, botão redireciona corretamente

### Tarefa 2.8: Implementar Responsividade (Mobile/Tablet/Desktop)
- **Responsável:** Felipe Garcia
- **Ação:** Testar e ajustar breakpoints Tailwind
- **Entregável:** Landing page acessível em todos os devices
- **Critério de sucesso:** Sem layout breaks, legível em todos os tamanhos

### Tarefa 2.9: Adicionar i18n (DE/EN)
- **Responsável:** Felipe Garcia
- **Ação:** Criar arquivos `de/willkommen.json` e `en/willkommen.json`
- **Entregável:** Landing page bilíngue
- **Critério de sucesso:** Switcher de idioma funciona

---

## FASE 3: TRACKING E INTEGRAÇÃO

**Duração estimada:** 2-3 dias úteis  
**Status:** ⏳ Pendente (começa após Fase 2, se escopo incluir tracking)  

### Tarefa 3.1: Implementar Meta Pixel
- **Responsável:** Felipe Garcia
- **Ação:** Adicionar código Meta Pixel ao `index.html` ou GA
- **Entregável:** Meta Pixel rastreando pageviews e conversões
- **Critério de sucesso:** Pixel validado no Meta Business Suite

### Tarefa 3.2: Implementar Google Analytics 4
- **Responsável:** Felipe Garcia
- **Ação:** Integrar GA4 tag
- **Entregável:** GA4 rastreando eventos
- **Critério de sucesso:** Eventos aparecem em GA4 em tempo real

### Tarefa 3.3: Definir Eventos de Conversão
- **Responsável:** Felipe Garcia
- **Ação:** Mapear eventos (clique em CTA, visita de mapa, etc)
- **Entregável:** Documento de eventos para Meta e GA
- **Critério de sucesso:** Eventos acionando corretamente

---

## FASE 4: TESTES E QA

**Duração estimada:** 2-3 dias úteis  
**Status:** ⏳ Pendente (começa após Fase 2)  

### Tarefa 4.1: Teste Funcional Completo
- **Responsável:** Felipe Garcia
- **Ação:** Verificar todos os CTAs, links, formulários
- **Entregável:** Lista de bugs encontrados e corrigidos
- **Critério de sucesso:** Todos os cliques funcionando

### Tarefa 4.2: Teste de Responsividade
- **Responsável:** Felipe Garcia
- **Ação:** Testar em iPhone, iPad, Android, desktop
- **Entregável:** Screenshots de cada device
- **Critério de sucesso:** Layout correto em todos os tamanhos

### Tarefa 4.3: Teste de Performance
- **Responsável:** Felipe Garcia
- **Ação:** Lighthouse, PageSpeed Insights
- **Entregável:** Relatório de performance
- **Critério de sucesso:** Score > 90 em Lighthouse

### Tarefa 4.4: Teste de SEO
- **Responsável:** Felipe Garcia
- **Ação:** Validar `<title>`, `<meta description>`, headings
- **Entregável:** Documento de validação SEO
- **Critério de sucesso:** Meta tags otimizadas

### Tarefa 4.5: Teste de Acessibilidade
- **Responsável:** Felipe Garcia
- **Ação:** Wave, Axe, validação de contraste
- **Entregável:** Relatório de acessibilidade
- **Critério de sucesso:** WCAG 2.1 AA compliance

---

## FASE 5: FEEDBACK E AJUSTES (Gabriel)

**Duração estimada:** 2-4 dias úteis  
**Status:** ⏳ Pendente (depois de Fase 4)  

### Tarefa 5.1: Enviar Preview ao Gabriel
- **Responsável:** Felipe Garcia / Romana Loznjakovic
- **Ação:** Compartilhar link de staging com Gabriel
- **Entregável:** URL de acesso + documento de instruções
- **Critério de sucesso:** Gabriel consegue acessar e testar

### Tarefa 5.2: Coletar Feedback do Gabriel
- **Responsável:** Romana Loznjakovic (em alemão)
- **Ação:** Agendar call ou email com sugestões
- **Entregável:** Lista de ajustes solicitados
- **Critério de sucesso:** Feedback documentado e priorizado

### Tarefa 5.3: Implementar Ajustes
- **Responsável:** Felipe Garcia
- **Ação:** Fazer alterações solicitadas
- **Entregável:** Nova versão da landing page
- **Critério de sucesso:** Ajustes implementados e testados

### Tarefa 5.4: Validação Final com Gabriel
- **Responsável:** Romana Loznjakovic
- **Ação:** Confirmar que todas as mudanças estão OK
- **Entregável:** Aprovação formal do Gabriel
- **Critério de sucesso:** Email de aprovação recebido

---

## FASE 6: DEPLOY EM PRODUÇÃO

**Duração estimada:** 1 dia útil  
**Status:** ⏳ Pendente (depois de Fase 5)  

### Tarefa 6.1: Configurar Domínio/Subdomínio
- **Responsável:** Felipe Garcia
- **Ação:** DNS, SSL, configuração no Vercel
- **Entregável:** Landing page acessível no domínio final
- **Critério de sucesso:** URL funciona, HTTPS ativo

### Tarefa 6.2: Deploy em Produção
- **Responsável:** Felipe Garcia
- **Ação:** Push para `main`, deploy automático no Vercel
- **Entregável:** Landing page live
- **Critério de sucesso:** Zero erros em produção

### Tarefa 6.3: Validação em Produção
- **Responsável:** Felipe Garcia
- **Ação:** Testar todos os funcionalidades no domínio final
- **Entregável:** Checklist de validação completo
- **Critério de sucesso:** Tudo funcionando em produção

### Tarefa 6.4: Enviar URL Oficial ao Gabriel
- **Responsável:** Felipe Garcia / Romana Loznjakovic
- **Ação:** Comunicar URL final, credenciais (se houver)
- **Entregável:** Email com documentação
- **Critério de sucesso:** Gabriel tem acesso completo

---

## FASE 7: ENTREGA OFICIAL E HANDOVER

**Duração estimada:** 1 dia útil  
**Status:** ⏳ Pendente (depois de Fase 6)  

### Tarefa 7.1: Preparar Documentação Técnica
- **Responsável:** Felipe Garcia
- **Ação:** Criar README.md com instruções de manutenção, estrutura de código
- **Entregável:** Documento técnico completo
- **Critério de sucesso:** Documentação clara e útil

### Tarefa 7.2: Criar Guia de Campanhas Meta Ads
- **Responsável:** Felipe Garcia / Romana Loznjakovic
- **Ação:** Documento com dicas de setup de campanha, targeting, orçamento
- **Entregável:** Guia em alemão (ou bilíngue)
- **Critério de sucesso:** Pronto para Gabriel usar

### Tarefa 7.3: Agendar Briefing de Entrega com Gabriel
- **Responsável:** Romana Loznjakovic
- **Ação:** Call final com Gabriel explicando tudo
- **Entregável:** Call realizada com presença de Felipe
- **Critério de sucesso:** Gabriel entendeu como usar e manter

### Tarefa 7.4: Entregar Todos os Materiais
- **Responsável:** Felipe Garcia
- **Ação:** Compilar documentação, links, credenciais
- **Entregável:** Pasta/email com tudo organizado
- **Critério de sucesso:** Gabriel tem 100% do que precisa

### Tarefa 7.5: Confirmar Satisfação do Cliente
- **Responsável:** Romana Loznjakovic
- **Ação:** Solicitar confirmação de entrega bem-sucedida
- **Entregável:** Email de confirmação
- **Critério de sucesso:** Gabriel confirma entrega ✅

---

## CRONOGRAMA CONSOLIDADO

| Fase | Tarefas | Duração | Fim Estimado |
|------|---------|---------|--------------|
| **0: Escopo** | 0.1 – 0.5 | 3-5 dias | 2026-06-29 |
| **1: Planejamento** | 1.1 – 1.5 | 2-3 dias | 2026-07-02 |
| **2: Desenvolvimento** | 2.1 – 2.9 | 4-6 dias | 2026-07-10 |
| **3: Tracking** | 3.1 – 3.3 | 2-3 dias | 2026-07-14 |
| **4: QA** | 4.1 – 4.5 | 2-3 dias | 2026-07-17 |
| **5: Feedback Gabriel** | 5.1 – 5.4 | 2-4 dias | 2026-07-23 |
| **6: Deploy** | 6.1 – 6.4 | 1 dia | 2026-07-24 |
| **7: Entrega Final** | 7.1 – 7.5 | 1 dia | 2026-07-25 |

**Data de entrega esperada: 2026-07-25**

---

## Status Geral do Projeto

```
Fase 0 (Escopo):           ✅ Concluída (28/06/2026)
Fase 1 (Planejamento):     🔄 Em andamento
Fase 2 (Desenvolvimento):  🔄 Em andamento
Fase 3 (Tracking):         🔄 Em andamento (junto com Fase 2)
Fase 4 (QA):               ⏳ Pendente
Fase 5 (Feedback Gabriel): ⏳ Pendente
Fase 6 (Deploy):           ⏳ Pendente
Fase 7 (Entrega):          ⏳ Pendente

Projeto: ~15% Concluído
```

---

## ✅ Bloqueador Resolvido

Gabriel delegou todas as decisões à Real Vision (17/06). Escopo, domínio, tracking e manutenção definidos. **Desenvolvimento pode começar imediatamente.**

**Estratégia de entrega:** construir a landing page → deploy em URL provisória Vercel → enviar link ao Gabriel junto com a proposta CHF 1.200 para aprovação.

---

## Notas Adicionais

- **Responsáveis:** Felipe Garcia (desenvolvimento) + Romana Loznjakovic (comunicação com Gabriel em alemão)
- **Ferramentas:** React, Vite, Tailwind, Vercel, Canva (proposta), Meta/GA (tracking)
- **Risco principal:** Scope creep ou feedback tardio do Gabriel
- **Mitigation:** Comunicação semanal clara, documento de escopo aprovado em Fase 0

---

**Versão:** 1.0  
**Data:** 2026-06-24  
**Próxima revisão:** Após aprovação de escopo do Gabriel  
**Status:** ⏳ AGUARDANDO FEEDBACK DO CLIENTE
