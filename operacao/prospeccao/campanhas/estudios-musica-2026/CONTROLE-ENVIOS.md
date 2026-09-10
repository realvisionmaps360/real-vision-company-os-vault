---
id: campanha-estudios-musica-2026-controle-envios
tipo: controle
pertence_a: ["[[HANDOFF]]"]
atualizado_em: 2026-09-09
---

# CONTROLE-ENVIOS — Estúdios de Música 2026

> Ver [[HANDOFF]] · [[PROXIMA-SESSAO]] · [[PLANO-ESCALA-CONTATOS]] para o histórico completo da campanha.

## Decisões travadas nesta sessão (09/09/2026)

- **D1 — Tipo de estúdio alvo:** Escola de música (decidido pelo Felipe). Estúdio de gravação/ensaio ficam de fora desta rodada.
- **D2 — Ordem de canal:** E-mail abre a conversa. WhatsApp só entra depois que o lead responder ou clicar — não dispara frio no WhatsApp para este grupo (reduz risco de banimento da conta, ver `pesquisa/01-boas-praticas-pesquisadas.md`).

## Segmento: Escola de Música — consolidado das 4 levas

Arquivo de dados: [`escolas-musica-consolidado.csv`](escolas-musica-consolidado.csv)

| Origem | Total coletado | Escolas de música |
|---|---|---|
| Leva 1 — Florianópolis | 50 | 6 |
| Leva 2 — São Paulo refinado | 50 | 16 |
| Leva 3 — São Paulo (Places API) | 35 | 5 (2 duplicados removidos — mesmo telefone da leva 2) |
| Leva 4 — São Paulo (Apify, mais recente) | 105 | 39 |
| **Total único (dedupado por telefone)** | **240** | **64** |

- 55 com celular (WhatsApp possível, mas só depois de resposta por e-mail — regra D2)
- 9 com telefone fixo (só e-mail, celular não se aplica)

## Bloqueio identificado: nenhum lead tem e-mail coletado ainda

Os dados vieram do Google Maps filtrados para **"sem site cadastrado"** — ou seja, por desenho da campanha, nenhum desses 64 tem site ou e-mail no perfil. Isso trava D2 diretamente: não dá para abrir por e-mail sem primeiro descobrir o e-mail de cada um.

**Testado nesta sessão:** MCP do Apify conectado e funcionando (`search-actors` retornou resultado normalmente).

**Caminho de enriquecimento avaliado (ainda não executado — aguardando aprovação de custo):**

1. `Instagram Keyword Search Scraper` / `Instagram User Search Scraper` — busca o Instagram de cada estúdio pelo nome. **US$ 0,005 por perfil encontrado.**
2. `Instagram Email Scraper` (ex: `zaver.api/instagram-email-contact-extractor`) — extrai e-mail/telefone da bio de cada perfil achado. **US$ 0,004 por perfil analisado + US$ 0,01 por contato com e-mail encontrado.**

**Estimativa de custo para os 64 leads:** entre US$ 0,60 e US$ 1,50 (fase 1 sempre roda; fase 2 só cobra o "achou e-mail" nos casos que renderem resultado). Taxa de acerto desconhecida — muita escola pequena não tem Instagram cadastrado com e-mail visível na bio.

**Hunter.io testado e descartado para este grupo:** existe como Actor pago no Apify (`hunter-io-api-actor`), mas opera por **domínio** — como nenhum desses 64 tem site/domínio, não tem o que buscar. Só voltaria a fazer sentido se a etapa 1 (Instagram) achar um link-in-bio com domínio próprio.

**Alternativa mais barata, sem custo de crédito:** os relatórios das levas 3 e 4 já descartaram propositalmente estabelecimentos cujo "site" no Google era Instagram/Linktree/Facebook (ver `PLANO-ESCALA-CONTATOS.md`, item 2 — lista "site fraco"). Esses são um segundo grupo, fora do CSV atual, com Instagram já confirmado e provavelmente maior taxa de acerto para achar e-mail — não foi levantado ainda por não ser "escola de música" garantido (a lista lá mistura os 3 tipos).

## Próximo passo — aguardando decisão do Felipe

Não vou gastar crédito do Apify sem confirmação (regra do projeto). Escolher:

- **(a)** Rodar o pipeline Instagram → e-mail nos 64 da lista atual, custo estimado US$ 0,60–1,50.
- **(b)** Primeiro filtrar a lista "site fraco" das levas 3/4 por nome de escola de música (provável Instagram já ativo, taxa de acerto maior) e enriquecer esse grupo primeiro.
- **(c)** Os dois, em sequência.

## Registro de envios (nenhum envio feito ainda)

Nenhuma mensagem ou e-mail foi disparado nesta campanha para o segmento escola de música. Assim que o e-mail for encontrado e a copy revisada por Felipe frase a frase, o envio real e o resultado (aberto / respondeu / silêncio) serão registrados linha a linha no CSV (`escolas-musica-consolidado.csv`), colunas `enviado`, `data_envio`, `resultado`.
