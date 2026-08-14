---
title: Flávia Andrade — Vila dos Corais
tags:
  - cliente
  - ativo
status: ativo
data_inicio: 2026-06-16
servicos: [Site Institucional]
---

# Flávia Andrade — Vila dos Corais

Timeline: [[Vila-dos-Corais-TIMELINE]]

## Contexto
Refúgio à beira-mar em Algodões, Península de Maraú, Bahia. Site institucional (`viladoscorais.com.br`) desenvolvido via Lovable/React, deploy na Vercel, domínio registrado na Locaweb. Repo local em `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/site/`.

## Serviços contratados
- Site Institucional (proposta em `Porposta Comercial Flávia Andrade 2 (1).pdf`)

## Entregas realizadas
- **14/08/2026** — Verificação da propriedade `viladoscorais.com.br` no Google Search Console concluída (método Tag HTML). Causa raiz do bloqueio anterior: certificado SSL do domínio na Vercel estava "Failed To Generate Cert" (timeout na checagem de CAA via nameservers da Locaweb) — resolveu sozinho após um refresh/retry da Vercel, sem precisar trocar nameservers.

## Próximos passos
- Confirmar se o projeto já tem `sitemap.xml` configurado (checagem em `viladoscorais.com.br/sitemap.xml` deu 404 em 14/08/2026) — se não tiver, configurar geração de sitemap no projeto Vite/React antes de enviar ao Search Console.
- Depois do sitemap: enviar em Search Console → Sitemaps, e solicitar indexação manual da home via Inspeção de URL.
- Verificar se o GA4 já está vinculado a essa propriedade.

## Observações
- Stack do site: deploy Vercel + domínio Locaweb (NS: ns1/ns2/ns3.locaweb.com.br) — **não é Hostinger nem Cloudflare**, não sugerir troca de provedor sem necessidade real.
- Sem MX/TXT configurados no domínio hoje — nenhum email depende do DNS atual.
