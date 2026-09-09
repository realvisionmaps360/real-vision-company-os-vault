---
id: campanha-estudios-musica-2026-leva5-controle
tipo: controle
pertence_a: ["[[HANDOFF]]", "[[CONTROLE-ENVIOS]]"]
atualizado_em: 2026-09-09
---

# Leva 5 — 50 novos contatos de e-mail (Escola de Música, São Paulo capital)

> Planilha **separada** da leva 1-4 ([`../escolas-musica-consolidado.csv`](../escolas-musica-consolidado.csv)), a pedido do Felipe. Este grupo já nasce com e-mail confirmado e segue canal e-mail primeiro (D2).

## O que foi feito (09/09/2026)

1. Testado o MCP do Apify na sessão — conectado e funcionando.
2. Rodado `compass/crawler-google-places`, com o add-on **"Company contacts enrichment"** ligado — em vez de exigir domínio próprio (o jeito que o Hunter.io funcionaria e que não serve pra quem não tem site), esse add-on visita o link salvo como "site" no Google Maps, mesmo quando esse link é só um Instagram ou Linktree, e extrai e-mail de lá.
3. Busca: "escola de música", "aula de música particular", "professor de música" — São Paulo capital, só lugares com algum link salvo (`website: withWebsite` — inclui Instagram/Linktree), até 150 por termo.
4. Resultado: 191 lugares raspados, 79 com e-mail encontrado, 136 na categoria exata "Escola de Música".
5. Filtro final: categoria = Escola de Música + e-mail encontrado + não fechado + **excluídos os que já estão na leva 1-4** (dedup por telefone contra `escolas-musica-consolidado.csv`) → 51 novos, cortado nos **50 com mais avaliações** (proxy de negócio ativo).

**Custo estimado do run:** ~US$ 1,34 (191 lugares × ~US$ 0,007 — base + filtro de site + enriquecimento de contato), dentro do teto de US$ 5 combinado. Custo exato só é confirmado no painel `console.apify.com` → Billing (o MCP não expõe billing).

## Arquivos desta leva

- [`contatos.csv`](contatos.csv) — os 50 leads: nome, telefone, bairro, categoria, Instagram, e-mail, fonte do e-mail, status, data de coleta.
- [`interacoes.csv`](interacoes.csv) — log de cronologia: cada linha é um toque (e-mail ou WhatsApp, enviado ou recebido) com data e resultado, ligado ao `id` do contato em `contatos.csv`. Vazio até o primeiro envio.

## Regras desta leva

- **Nenhum envio feito ainda** — Felipe pediu só planejar e coletar por enquanto ("nao testa nada ainda").
- Canal de abertura: e-mail (decisão D2, igual à leva 1-4).
- Cada contato do e-mail que responder ou clicar libera o WhatsApp para aquele contato específico — registrar isso em `interacoes.csv` antes de migrar de canal.
- Copy ainda não escrita para este grupo — usar a mesma copy segmentada por escola de música que será revisada por Felipe antes de qualquer disparo (ver [[CONTROLE-ENVIOS]]).
- Antes de rodar uma leva 6 (mais 50, outro bairro/termo), repetir o dedup contra **ambas** as planilhas (`escolas-musica-consolidado.csv` + este `contatos.csv`).

## Qualidade dos 50

- E-mails majoritariamente institucionais (`contato@`, `atendimento@`, nome da escola no domínio) — poucos são Gmail pessoal solto.
- Inclui algumas redes/franquias (ex: School of Rock, 3 unidades diferentes) — são leads válidos, mas vale decidir se aborda cada unidade separada ou consolida por rede antes de disparar.
- Instituto Baccarelli veio com Instagrams de unidades de CEU (parcerias públicas) misturados no campo — checar manualmente antes de usar esse contato específico.
