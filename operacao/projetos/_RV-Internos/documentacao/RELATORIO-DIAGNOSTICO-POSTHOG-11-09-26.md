# Relatório de Diagnóstico — PostHog Real Vision (site institucional)

**Período analisado:** 18/07/2026 (go-live) até 11/09/2026 — 8 semanas
**Projeto PostHog:** "Real Vision Website" (id 518429), org Real Vision, US Cloud
**Fonte:** dados reais puxados direto do PostHog via MCP nesta sessão (não é estimativa)

Relacionado: [[PRD-004-analytics-posthog]] · [[POSTHOG-ANALYTICS]] · [[rv-posthog-setup]] · [[RV-DIAGNOSTICO-PROJETO]] (implementação)

---

## 1. Resumo executivo

| Métrica | Valor |
|---|---|
| Pageviews totais | 707 |
| Visitantes únicos | 57 |
| Sessões | 296 (250 com pageview associado) |
| Duração média de sessão | ~12min13s (733s) |
| Rageclicks (frustração de clique) | 43, concentrados em **7 pessoas** |
| LCP médio | 1.396s (bom — meta é <2.5s) |
| INP médio | 163ms (bom — meta é <200ms) |
| CLS médio | 0.023 (ótimo — meta é <0.1) |

Core Web Vitals estão saudáveis. O ponto de atenção real é o cluster de rageclicks nas aulas do curso Profissional 360 (ver seção 5).

---

## 2. Volume por semana

| Semana (início) | Pageviews | Visitantes únicos |
|---|---|---|
| 13/07 | 71 | 6 |
| 20/07 | 269 | 14 |
| 27/07 | 131 | 14 |
| 03/08 | 17 | 12 |
| 10/08 | 47 | 11 |
| 17/08 | 41 | 6 |
| 24/08 | 44 | 8 |
| 31/08 | 48 | 12 |
| 07/09 (parcial) | 39 | 4 |

Pico na semana do go-live (20/07), provável tráfego de teste/divulgação inicial. Depois disso o volume estabilizou numa faixa baixa (40-50 pageviews/semana, 6-14 visitantes únicos). Isso é volume de site em fase inicial — nada alarmante, mas ainda não dá massa estatística pra funil ou A/B test.

---

## 3. Páginas mais visitadas

| Página | Views | Visitantes únicos |
|---|---|---|
| `/` (home) | 230 | 23 |
| `/academy` | 60 | 5 |
| `/blog` | 45 | 6 |
| `/portfolio` | 42 | 4 |
| `/blog/site-maior-ativo-era-ia` | 31 | 5 |
| `/sobre` | 27 | 6 |
| `/blog/trabalho-opcional-elon-musk-donos-robos` | 26 | 4 |
| `/blog/riscos-inteligencia-artificial-hack-openai-hugging-face` | 22 | 5 |
| `/links-uteis/` | 16 | 2 |
| `/blog/google-meu-negocio-guia-completo-negocios-locais` | 15 | 5 |
| `/de/blog` | 13 | 3 |
| `/profissional-360` | 12 | 2 |
| `/academy/curso/profissional-360` | 11 | 3 |

Home concentra quase 1/3 do tráfego. Blog puxa bem (3 dos 4 posts mais lidos aparecem aqui) — os posts sobre IA (Elon Musk/robôs, riscos IA, LLM vs SLM) performam melhor que os posts institucionais.

---

## 4. Origem do tráfego

| Origem | Views | Visitantes únicos |
|---|---|---|
| Direto (`$direct`) | 610 | 32 |
| Google (busca orgânica) | 26 | 18 |
| realvisionmaps.com (navegação interna) | 24 | 8 |
| Gmail (app Android) | 10 | 1 |
| accounts.google.com | 10 | 2 |
| Instagram | 7 | 3 |
| Subdomínio unterentfelden | 6 | 1 |

Tráfego é majoritariamente direto — típico de site novo sem SEO maduro ainda, indica que a maior parte das visitas vem de links compartilhados/divulgação manual, não descoberta orgânica. Vale notar: 18 dos 32 visitantes diretos vieram via Google, então busca orgânica já traz gente nova, só ainda é pouco volume.

### Por país
Brasil (486 views / 26 visitantes) e Suíça (201 views / 15 visitantes) dominam — consistente com a operação bi-continente. Resto (EUA, Alemanha, Israel, Portugal, Canadá, Itália, Áustria) é tráfego pontual, 1-2 visitantes cada.

### Por dispositivo/navegador
Desktop Chrome lidera (505 views), Mobile Chrome em segundo (174 views). Safari (desktop+mobile) é residual. Confirma que o site é usado majoritariamente em desktop até agora.

---

## 5. Ponto de atenção: rageclicks

**43 rageclicks, concentrados em apenas 7 pessoas.** Rageclick = clique repetido e rápido no mesmo lugar, sinal clássico de "isso deveria funcionar e não funcionou".

URLs onde aconteceu, todas nas aulas do curso Profissional 360 (Academy):
- `/academy/curso/profissional-360/aula/19f6739d.../ler`
- `/academy/curso/profissional-360/aula/37c49e32.../ler`
- `/academy/curso/profissional-360/aula/37c49e32...` (sem `/ler`)
- `/academy/curso/profissional-360`
- Versões locais (`192.168.0.21:8080` e `localhost`) — sinal de que parte disso é teste seu/dev, não usuário real

**Recomendação:** isolar rageclicks de sessões locais/dev (IP interno) das de visitantes reais antes de tirar conclusão definitiva — mas o padrão em `/aula/.../ler` merece um teste manual da tela de leitura de aula pra ver se algo trava ou não responde ao clique.

---

## 6. O que está configurado no PostHog hoje

- **Rastreamento:** completo — analytics + session recording + feature flags + funnels (decisão original do PRD-004)
- **Banner de consentimento:** ativo, PT/EN/DE, PostHog só carrega pós-aceite — **os números acima são só de quem aceitou**, tráfego real do site é maior
- **`person_profiles`:** `identified_only` — ninguém foi identificado ainda (sem evento `$identify` nos últimos 30 dias), esperado pra site público sem login geral
- **Session replay:** habilitado e capturando (confirmado via propriedade de sessão nos eventos)
- **Error tracking (exception autocapture):** **desabilitado** — não estamos captando erros JS automaticamente
- **Surveys:** **desabilitado**
- **Insights prontos:** 8 (todos os padrões de onboarding do PostHog — Visit to interaction funnel, Top referrers, Retention, WAU, DAU, Pageviews 7d, Sessions 7d, Active users 30d). Nenhum insight customizado criado ainda (funil de matrícula/compra do PRD-004 ainda não foi montado)
- **Dashboards:** só o "Your starter dashboard" padrão — nenhum dashboard customizado

---

## 7. Gaps vs. o que o PRD-004 previa

Do arquivo `POSTHOG-ANALYTICS.md`, próximos passos que ainda não saíram do papel:

1. Mascarar campos sensíveis (login, WhatsApp/checkout) na gravação de sessão — não verificado nesta sessão, precisa confirmar sintaxe atual na doc do PostHog antes de codar
2. Funil de matrícula/compra (pedido → WhatsApp → matrícula) — **não existe**, só os insights padrão de onboarding
3. Dashboard de pageviews por seção do site — **não existe**

---

## 8. Recomendações

1. **Montar o funil de matrícula** (pedido → WhatsApp → matrícula) — é o D-011 do PRD-004 e ainda não foi feito, é o principal motivo de ter instalado PostHog
2. **Investigar rageclicks na tela de leitura de aula** (`/aula/.../ler`) — teste manual rápido resolve
3. **Ativar error tracking** — hoje não temos visibilidade de erro JS em produção, é gap de monitoramento básico
4. **Volume ainda baixo pra funil estatisticamente confiável** — 57 visitantes únicos em 8 semanas. Não é problema do PostHog, é fase do site. Revisitar quando tráfego crescer (SEO/i18n em andamento deve ajudar)

---

*Relatório gerado em 11/09/2026 com dados extraídos ao vivo do PostHog (projeto 518429). Nenhum número foi estimado ou reaproveitado de sessão anterior.*
