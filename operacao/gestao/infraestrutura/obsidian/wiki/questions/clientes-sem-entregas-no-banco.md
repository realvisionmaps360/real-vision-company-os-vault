---
type: question
title: Clientes com status "entregue" mas sem entregas registradas no banco
aliases: []
date_created: 2026-06-29
date_updated: 2026-06-29
source_count: 0
tags: [clientes, supabase, dados, lacuna]
status: draft
---

# Clientes com status "entregue" mas sem entregas registradas no banco

## Problema

Três clientes têm `status_pipeline = entregue` no Supabase mas nenhuma entrega registrada na tabela `deliveries`. Os arquivos físicos das pastas podem ter mais informação.

## Clientes afetados

- [[entities/betao-pousada-cajueiro]] — Pousada Cajueiro, Igrapiúna/BA, jan/2025
- [[entities/emerson-pousada-recanto]] — Pousada Recanto da Natureza, Ituberá/BA, jan/2025
- [[entities/messias-restaurante-por-do-sol]] — Restaurante Pôr do Sol, Ituberá/BA, jan/2025

## O que fazer

- [ ] Abrir pastas dos 3 clientes e ver arquivos existentes
- [ ] Se houver tours/links, adicionar no Supabase via VisionFlow
- [ ] Atualizar fichas FICHA-CLIENTE.md com dados reais

## Origem

Detectado durante varredura de 29/06/2026 ao criar fichas via Supabase.
