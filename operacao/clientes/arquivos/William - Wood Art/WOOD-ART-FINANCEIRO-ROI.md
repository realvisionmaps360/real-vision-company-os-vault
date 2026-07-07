---
title: Wood Art — Financeiro, Painel Admin e ROI
tags:
  - cliente
  - spec
  - financeiro
data: 2026-07-06
---

# Wood Art — Financeiro, Painel Admin e ROI

> Documento de insumo para a proposta comercial. Não é a proposta em si.
> Dossiê principal em [[WOOD-ART-PROJETO]]. Frentes completas em [[WOOD-ART-FRENTES-DE-TRABALHO]].

## 1. Painel administrativo financeiro unificado

**O que é:** dentro do site próprio, um painel onde o William acessa e organiza toda a parte financeira do negócio num só lugar — vendas do site + vendas do Mercado Livre + vendas da Shopee, todas contabilizadas juntas via integração com as APIs dessas plataformas.

**Por que importa:** hoje o dado financeiro do William está espalhado em 3 lugares (site, ML, Shopee), sem visão consolidada. O painel resolve isso independente de qualquer decisão sobre ROI ou migração de canal — é valor por si só.

**Status atual:** ideia definida nesta sessão (06/07/2026). Nada avaliado tecnicamente ainda.

**Decisão/checagem pendente:** viabilidade técnica de puxar dados via API pública do Mercado Livre e da Shopee (o que cada uma expõe, limites de acesso) precisa ser checada antes de entrar na proposta como item fechado.

## 2. Lógica de ROI (sem números fechados)

Estrutura do cálculo, pronta para ser preenchida quando os dados existirem:

```
Payback (meses) = Investimento único (site + configurador)
                   ÷ Economia mensal estimada de taxas
```

A "economia mensal estimada" depende de uma variável que hoje não temos: **que % dos clientes do William compra mais de uma vez**. Sem esse dado, qualquer número na proposta seria invenção — contra a regra de nunca inventar dado de cliente.

**Pendências em aberto (nenhuma delas o Felipe sabe hoje):**
1. Valor final do investimento único (app + site) — depende do escopo do configurador, ainda não confirmado com o William.
2. Taxa de recompra dos clientes — ou, na ausência desse dado, aceitar apresentar um cenário conservador hipotético na proposta, deixando explícito que é estimativa (ex.: "se apenas 10% da base migrar para recompra direta...").

**Referência de custos atuais (já registrados, não reinventar):**
- Mercado Livre: ~R$80.000/mês em mercadoria, R$20.000/mês de taxa, R$4.000/mês em anúncios.
- Shopee: ~R$170.000/mês faturamento, R$50.000/mês de taxa, R$6.000/mês em anúncios.

## 3. Google Merchant Center — versão expandida

- **Cadastro e listagem de produtos: gratuito.** Custo real só aparece se ativar Google Shopping Ads (campanha paga dentro do Google Ads, orçamento definido pelo cliente).
- **Por que é mais interessante do que parece:** o cadastro no Merchant Center é feito uma vez, mas abre elegibilidade para múltiplas superfícies de venda — Google Shopping Ads, listagens orgânicas gratuitas na busca, e cada vez mais superfícies emergentes de compra via inteligência artificial/agentes de IA que consultam catálogos de produtos.
- **Por que importa pro William:** múltiplos canais de descoberta a partir de uma única integração, sem taxa por venda (diferente de ML/Shopee).
- **Pré-requisito:** precisa do feed de produtos do site próprio para alimentar o Merchant Center — por isso faz mais sentido como parte do pacote de site próprio do que como item isolado.

## Fechamento

Este documento organiza os dados financeiros e as duas frentes relacionadas (painel admin + Merchant Center) para alimentar a proposta comercial final. Cruza com:
- [[WOOD-ART-FRENTES-DE-TRABALHO]] — itens 3 (loja própria), 7 (dados financeiros) e 8 (Google Merchant Center)
- [[WOOD-ART-PROJETO]] — dossiê geral do cliente
