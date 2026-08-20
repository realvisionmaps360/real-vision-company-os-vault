---
id: CON-2026-002
tipo: conhecimento
nome: Prospecção de negócios locais por scraping do Google Maps com Apify
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-13
atualizado_em: 2026-08-13
proxima_revisao: 2026-11-13
confiabilidade: alta
fonte: Experiência própria — campanha Drone & Digital Unterentfelden, 13/08/2026
pertence_a: ["[[LBOS]]"]
referencia: ["[[02-Projetos/real-vision/PROJETO]]", "[[georreferenciar-print-de-mapa]]"]
tags: [lbos/entidade, lbos/conhecimento]
---

# Prospecção de negócios locais por scraping do Google Maps com Apify

## O que é

Método validado para levantar **todos** os negócios de uma área geográfica delimitada, com email, e filtrar quem se aplica a uma oferta. Testado numa área de 0,6 km² na Suíça: 69 lugares, 64 negócios, 30 com email, por **US$ 1,03**.

## Contexto

Serve quando a oferta é geograficamente delimitada e o critério de elegibilidade é observável no perfil do Google (falta de foto, falta de site, perfil não reivindicado). Não serve para prospecção por segmento sem recorte de área — aí Apollo ou Vibe Prospecting encaixam melhor.

Ferramenta: **Apify**, actor `compass/crawler-google-places`. Conta `vann_gghost`, plano FREE, US$ 5/mês de crédito.

## As três lições que fazem o método funcionar

**1. Uma varredura só não cobre a área.** O modo `all_places_no_search_ocr` sozinho retornou 23 lugares e perdeu um negócio ativo que estava dentro do polígono e cujo perfil eu já conhecia. O sweep por 58 termos de categoria em alemão foi o que fechou a cobertura em 69. Sempre combinar OCR + varredura por mouse + busca por categorias, e deduplicar por `placeId`.

**2. Descoberta barata primeiro, enriquecimento pago só no fim.** Rodar as varreduras de descoberta com `scrapePlaceDetailPage: false` e `scrapeContacts: false`, deduplicar, e só então uma passada de enriquecimento passando os `placeIds` da lista única. Evita pagar detalhe e contato de duplicata.

**3. Nunca ligar `maximumLeadsEnrichmentRecords`.** Custa US$ 0,10 por lead e queima o crédito mensal inteiro em 50 registros. Nome do contato sai do site ou do Impressum de graça, ou do próprio nome do negócio.

Preços no tier FREE, por lugar: US$ 0,004 descoberta · 0,002 detalhe · 0,002 contato · 0,001 por filtro aplicado.

## Restrições de ambiente (custaram tempo para descobrir)

- **`api.apify.com` está bloqueado** tanto no sandbox de nuvem do Cowork quanto no `device_bash` da máquina local. O proxy libera `api.github.com` e não libera o Apify. A chamada precisa sair de um **navegador autenticado**: `fetch` numa aba em `console.apify.com`, que tem CORS liberado para a API.
- O `javascript_tool` do navegador **corta em 45 s** por chamada. Polls de run precisam ser curtos, com a espera fora da chamada.
- A saída do `javascript_tool` **trunca por volta de 1000 a 1400 caracteres**, e **base64 é bloqueado** por filtro de segurança. Transferir dados em blocos pequenos de texto puro, ou fazer o filtro dentro do navegador e transferir só o resultado final.

## Onde a implementação mora

Company OS, não aqui: `operacao/prospeccao/campanhas/drone-digital-unterentfelden/`

- `dados/apify-config.json` — as quatro varreduras com os parâmetros exatos
- `dados/gerador-planilha.py` — monta o xlsx a partir dos dados brutos
- `emails/gerador-emails.py` — gera os textos personalizados
- `HANDOFF.md` — contexto completo da campanha

Convenção de campanhas de prospecção: `operacao/prospeccao/`, indexada no README de lá.

## Fontes

Experiência própria, campanha Drone & Digital Unterentfelden, 13/08/2026. Confiabilidade alta: os números foram medidos, não estimados, e o método foi validado contra um negócio conhecido dentro da área.

## Relacionados

- Pertence a: [[LBOS]]
- Referencia: [[02-Projetos/real-vision/PROJETO]], [[georreferenciar-print-de-mapa]]
- Aplicado em: [[TAR-2026-005]]
- Decidido em: [[DEC-2026-002]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-13 | Nó criado | Método validado na primeira campanha real na Suíça | Torna a prospecção geográfica repetível a custo conhecido | Combinar as três varreduras sempre; nunca ligar lead enrichment |
