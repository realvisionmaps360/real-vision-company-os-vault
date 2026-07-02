# BrazilComp — Analytics Final

> Documentação interna dos dados do Google Analytics.
> Coletado em: 25/06/2026. Encerramento do serviço: 26/06/2026.

**Relacionados:** [[TIMELINE]] | [Alinhamento 11-06-26](BrazilComp_Alinhamento_11-06-26.pdf) | [Relatório 11-05-26](BrazilComp_Relatorio_11-05-26.pdf)

---

## Período de vigência do GA

- **GA instalado em:** ~12 de abril de 2026 (confirmado pelo gráfico de público-alvo — zero tráfego antes dessa data)
- **Último dia de coleta:** 25 de junho de 2026
- **Total de dias monitorados:** 74 dias

---

## KPIs Gerais

| Métrica | Valor |
|---|---|
| Usuários ativos | 12.000 |
| Novos usuários | 12.000 |
| Sessões totais | 11.710 |
| Duração média da sessão | 29s |
| Taxa de engajamento (real) | 5,05% |
| Sessões engajadas (reais) | ~591 |
| Contagem de eventos | 52.394 |
| Receita registrada | R$ 0,00 |
| Visualizações de página | 15.300 |

---

## Diagnóstico de qualidade do tráfego

**O tráfego bruto de 12k usuários NÃO representa 12k potenciais clientes.**

O GA registra toda visita ao site, incluindo bots automáticos que varrem a internet. Os sinais de bot neste caso são inequívocos:

- Taxa de rejeição da homepage: **95%**
- Engajamento médio: **0 segundos** para as cidades top
- Cidades de origem: Miami, Wheaton, Amsterdam, Singapore — centros de data centers internacionais, não cidades com demanda por componentes eletrônicos no Brasil
- Apenas **591 sessões** (5,05%) tiveram engajamento mensurável

**Tráfego real estimado (usuários humanos):** ~500–600 sessões no período de 74 dias ≈ ~8 sessões reais por dia.

Isso é normal para um site novo sem campanha de tráfego pago ativa. O tráfego orgânico do Google (162 sessões) é o único canal que trouxe visitantes genuínos.

---

## Top Páginas

| # | Página | Visualizações | Usuários ativos | Tempo médio |
|---|---|---|---|---|
| 1 | / (Homepage) | 2.444 | 1.748 | 6s |
| 2 | /loja | 1.172 | 563 | 21s |
| 3 | /minha-conta | 315 | 23 | 3min 22s |
| 4 | /carrinho | 313 | 71 | 52s |
| 5 | /search-results | 228 | 228 | 0s |
| 6 | /login | 204 | 28 | 2min 23s |
| 7 | /checkout | 141 | 18 | 2min 19s |
| 8 | /admin/produtos | 131 | 7 | 4min 25s |
| 9 | /contato | 128 | 104 | 21s |
| 10 | /admin | 115 | 11 | 2min 07s |

**Total de páginas únicas indexadas pelo GA:** 1.227

**Observação:** `/minha-conta`, `/checkout`, `/admin/produtos` e `/admin` mostram alto tempo de engajamento — são acessos de usuário real (provavelmente o próprio Dorival/Vitória ou testadores).

---

## Canais de Aquisição

### Usuários por primeira origem

| Canal | Usuários ativos |
|---|---|
| (direct) / (none) | 11.000 |
| google / organic | 104 |
| brazilcomplojaonline.myshopify.co... | 23 |
| bing / organic | 14 |
| google / wix_google_business_profile | 13 |
| lovable.dev / referral | 9 |
| quemfornece.com / referral | 9 |

### Sessões por origem

| Canal | Sessões |
|---|---|
| (direct) / (none) | 11.000 |
| google / organic | 162 |
| lovable.dev / referral | 67 |
| brazilcomplojaonline.myshopify.co... | 37 |
| mercadopago.com.br / referral | 21 |
| bing / organic | 20 |
| chatgpt.com / ai-assistant | 16 |

**Nota:** `direct/(none)` com 11k é onde a maioria dos bots é classificada. O tráfego orgânico do Google (162 sessões) é o canal de maior valor real.

---

## Distribuição Geográfica (Top 10 Cidades)

| # | Cidade | Usuários | Engajamento | Observação |
|---|---|---|---|---|
| 1 | Miami | 2.084 | 0s | Bot — data center |
| 2 | (not set) | 1.952 | 2s | Misto |
| 3 | Wheaton | 1.357 | 0s | Bot — data center |
| 4 | Amsterdam | 687 | 0s | Bot — data center |
| 5 | Aulnay-sous-Bois | 658 | 0s | Bot — data center |
| 6 | Singapore | 624 | 0s | Bot — data center |
| 7 | Flower Mound | 500 | 0s | Bot — data center |
| 8 | Istres | 412 | 0s | Bot — data center |
| 9 | East Los Angeles | 401 | 0s | Bot — data center |
| 10 | Hounslow | 369 | 0s | Bot — data center |

**Total de cidades registradas:** 304  
**Nenhuma cidade brasileira aparece no top 10** — confirmação de que o volume bruto é tráfego automatizado.

---

## Conclusão Interna

O Google Analytics da BrazilComp ficou ativo por **74 dias** (12/04 → 25/06/2026). O volume bruto de 12k usuários é inflado por bots. O tráfego real estimado é de **~600 sessões**, o que equivale a ~8 visitas humanas por dia em um site novo sem tráfego pago.

O único canal com tráfego orgânico real foi o **Google Search (162 sessões)** — resultado direto da implementação de SEO e do GA4 configurado com eventos de conversão.

A estrutura de rastreamento estava correta e funcional. A ausência de receita (R$ 0,00) reflete que o site nunca foi publicado no domínio definitivo (`brazilcomp.com.br`) — operava em domínio de staging — e que os testes de pagamento real nunca foram concluídos pelo cliente.
