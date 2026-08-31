# Plano para puxar mais contatos em escala

> Escrito em 27/08/2026, depois da leva 3. Contexto: crédito Apify do mês esgotado,
> 135 contatos já abordados (50 Floripa + 50 SP + 35 SP leva 3).

## O gargalo real

Não é falta de estúdio. É que **cada fonte satura**.

| Fonte | Teto prático | Estado |
|---|---|---|
| Apify + Google Maps, São Paulo | ~60 elegíveis por rodada de 500 lugares | crédito zerado até virar o mês |
| Google Places API (MCP) | ~10 resultados por busca, sem paginação | usada nesta leva; rende ~1 contato novo por busca depois de 30 buscas |

A Places API satura porque devolve sempre os mesmos negócios populares. A Apify não satura
porque varre a área inteira em grade — é a ferramenta certa, só está sem crédito.

## Ordem de execução recomendada

### 1. Esgotar São Paulo com o que já está pago (custo zero, agora)
Os **11 leads sem site com telefone fixo** que descartei estão listados no relatório 04.
Fixo não serve pra WhatsApp, mas serve pra e-mail — e o próprio HANDOFF já recomenda
e-mail como canal de abertura. Ação: rodar `Domain-Search`/`Email-Finder` (MCP Hunter,
já conectado, custo separado da Apify) ou ligar.

### 2. Abrir a categoria "site fraco" (custo zero, alto volume)
Nesta leva eu cortei todo perfil cujo site é Instagram, Facebook, Linktree, `sites.google.com`,
`negocio.site`, `blogspot` ou `wixsite`. **Isso é público, não é lista de rejeitados** — é
exatamente o ICP de quem precisa de site profissional: já entendeu que precisa de presença
digital, mas resolveu com gambiarra. Só nas buscas desta sessão apareceram ~15 casos
(Estúdio Trigger, Nimbus, Cabeção Music, Zeppelin, Impulse, Primeiro Andar, Jubarte, AMJ,
Casa dos Músicos, ArtClave, Bela Kanto, SP Music, Nezo, Conservatório Asaph, Black Moon).
Argumento de venda muda: em vez de "você não tem site", é "seu site é um Instagram".
**Ação: rodar a mesma varredura filtrando `website` que contenha esses domínios.**

### 3. Trocar de cidade em vez de insistir em SP (custo zero de crédito)
SP está com 85 contatos abordados. Rio, Belo Horizonte, Curitiba, Porto Alegre, Salvador e
Campinas estão intocadas e têm densidade comparável. A Places API rende bem no **primeiro**
mês de cada cidade — é a saturação que mata, não a ferramenta.
**Ação: repetir o método da leva 3 no Rio de Janeiro. Estimativa: 30-40 contatos.**

### 4. Quando a Apify virar o mês (~US$ 5 de crédito novo)
Voltar ao `compass/crawler-google-places`, que é superior porque devolve `claimThisBusiness`
e `imagesCount` — os dois filtros de qualidade que a Places API não tem.
Configuração recomendada, dentro do teto de US$ 5:
- `website: "withoutWebsite"` (1 filtro, +US$ 0,001/lugar → US$ 0,005 total por lugar)
- 8 termos × 120 lugares = até 960 lugares = ~US$ 4,80
- **nunca** ligar `business leads enrichment` nem `email verification` (US$ 0,10 cada no FREE)
- `maxTotalChargeUsd: 5` no run, como trava dura

### 5. Se quiser volume de verdade: subir de tier
No tier FREE o lugar custa US$ 0,004. No BRONZE cai pra US$ 0,003, e os add-ons de
enriquecimento despencam de US$ 0,10 para US$ 0,005 — **20 vezes mais barato**. Só faz sentido
se a decisão for rodar campanha nacional contínua, não pra uma leva por mês.

## Decisão que trava tudo isso

Continua pendente do HANDOFF, seção 6: **qual dos três tipos de estúdio é o alvo** (gravação,
ensaio, escola). As três levas misturaram os três. Enquanto isso não estiver decidido, cada
lista sai com copy genérica — o que provavelmente explica parte do silêncio nas respostas.

---

**Ver também:** [[HANDOFF]] · [[04-35-contatos-sao-paulo-leva3-google-places]]
