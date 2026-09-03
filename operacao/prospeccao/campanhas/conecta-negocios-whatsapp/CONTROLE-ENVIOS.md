---
campanha: conecta-negocios-whatsapp
status: em andamento
inicio: 2026-09-03
---

# Conecta Negócios — Disparo WhatsApp

Link para [[README|prospecção geral]].

## Contexto

Felipe é membro do grupo de WhatsApp **"📍CONECTA NEGÓCIOS - Grupo Oficial"** (Instituto Conecta, 1.021 membros). A campanha consiste em mandar mensagem direta (1:1, fora do grupo) para os membros do grupo — leads de negócios locais que podem precisar de site/app.

**WhatsApp usado para o disparo:** pessoal do Felipe, número final **1924** (ver preferência salva na skill `rv-disparo-whatsapp`).

**Mensagem padrão enviada:**
```
Oi tudo bem, bom dia.

Me chamo Felipe Garcia e peguei seu contato no grupo Conecta Negócios, você precisa de um site ou de um aplicativo para o seu negócio? Dá uma olhada no meu portifólio: https://realvisionmaps.com/portfolio
```

**Excluídos sempre:** Tati Instituto Conecta (admin/dona do grupo), Renan Queiroz Vereador, e os demais números marcados como "Admin do grupo" (equipe do Instituto Conecta, não são leads).

**Método:** Chrome in Claude (mcp claude-in-chrome) → WhatsApp Web já logado no navegador do Felipe → abrir "Dados do grupo" → "Pesquisar membros" → percorrer a lista (ordem alfabética/join do WhatsApp) → abrir "Conversar com [número]" → colar mensagem → enviar. Um contato por vez, sem automação em lote (risco de bloqueio por spam do WhatsApp).

## Envios realizados

### Leva 1 — 03/09/2026 (contatos 1-10)

| # | Nome/Perfil | Número | Resultado |
|---|---|---|---|
| 1 | butterflyfields pijamas | +55 11 94508-3729 | Entregue, resposta automática (fora do expediente) |
| 2 | Carol Dona Mesquita Pastelaria | +55 11 94748-7740 | Entregue, resposta automática |
| 3 | Cristal Rosa Semijoias | +55 11 98907-3089 | Entregue, resposta automática |
| 4 | Mahroh Repres. e Assessoria | +55 11 91826-1187 | Entregue |
| 5 | Regiane Andrade Vieira | +55 11 98208-7221 | Entregue |
| 6 | Sheila | +55 11 98181-2427 | Entregue |
| 7 | Sonhe Doce Biscoitos | +55 11 99457-8890 | Entregue, resposta automática |
| 8 | Vitrine de Garagem | +55 11 96461-8283 | Entregue |
| 9 | (sem nome) | +55 87 9136-4494 | Entregue |
| 10 | (sem nome) | +55 11 97443-2593 | Entregue |

### Leva 2 — 03/09/2026 (contatos 11-20)

| # | Nome/Perfil | Número | Resultado |
|---|---|---|---|
| 11 | (sem nome) | +55 11 99499-8436 | Entregue |
| 12 | (sem nome) | +55 11 96771-0755 | Entregue |
| 13 | (sem nome) | +55 11 98667-3643 | Entregue |
| 14 | (sem nome) | +55 11 98938-7715 | Entregue |
| 15 | (sem nome) | +55 11 99610-9196 | Entregue |
| 16 | (sem nome) | +55 11 96362-0183 | Entregue |
| 17 | (sem nome) | +55 11 99667-9157 | Entregue |
| 18 | (sem nome) | +55 11 98186-1302 | Entregue |
| 19 | Ateliê Rafa Raiza | +55 11 99988-3742 | Entregue |
| 20 | (sem nome) | +55 11 97211-4364 | Entregue |

### Leva 3 — 03/09/2026 (contatos 21-42)

| # | Número | Resultado |
|---|---|---|
| 21 | +55 11 99800-7005 | Entregue |
| 22 | +55 11 98712-5201 | Entregue |
| 23 | +55 11 99138-5028 | Entregue |
| 24 | +55 11 92090-3810 | Entregue |
| 25 | +55 11 95351-1129 | Entregue |
| 26 | +55 11 98387-4242 | Entregue |
| 27 | +55 11 98224-1138 | Entregue, resposta automática (fora do expediente) |
| 28 | +55 12 99607-2013 | Entregue |
| 29 | +55 14 98171-9564 | Entregue |
| 30 | +55 11 99977-7760 | Entregue |
| 31 | +55 11 99251-1493 | Entregue |
| 32 | +55 11 98570-1913 | Entregue |
| 33 | +55 11 95552-0506 | Entregue |
| 34 | +55 11 97750-8338 | Entregue |
| 35 | +55 11 99528-2747 | Entregue |
| 36 | +55 11 96124-5319 | Entregue |
| 37 | +55 11 96169-6629 | Entregue, resposta automática (bot de atendimento) |
| 38 | +55 11 96348-5027 | Entregue |
| 39 | +55 11 98888-8418 | Entregue |
| 40 | +55 11 94343-1737 | Entregue |
| 41 | +55 11 96774-6913 | Entregue |
| 42 | +55 11 96162-1494 | Entregue |

**Total até agora: 42 contatos.**

## Método de extração da fila (a partir da Leva 3)

Para evitar reabrir o painel "Dados do grupo → Pesquisar membros" a cada contato (lento, 1 número por vez), o processo mudou:

1. Abrir o painel de membros **uma única vez**, rolar a lista e extrair de uma vez (via leitura da página, não clique a clique) os próximos ~20 números ainda não contatados, pulando admins/excluídos.
2. Salvar essa lista num arquivo temporário na pasta da campanha (ex: `TEMP-levaN.md`) antes de começar a mandar.
3. Para o envio em si, usar "Nova conversa" (ícone de lápis) → colar `+55 DD NNNNN-NNNN` na busca → abrir o resultado → mandar a mensagem. Isso é mais rápido que reabrir o painel do grupo a cada contato.
4. Depois de mandar a leva toda, consolidar os resultados aqui no CONTROLE-ENVIOS.md e apagar o arquivo temporário.

## Próximo passo

Continuar a lista de membros do grupo a partir de onde a Leva 3 parou (depois de +55 11 96162-1494). Repetir o método acima: extrair a próxima leva de uma vez, salvar em temp, mandar, consolidar.

## Pendências / observações

- Nenhuma resposta manual de interesse ainda recebida — só respostas automáticas de fora do expediente.
- Vale revisitar em alguns dias pra ver quem respondeu manualmente e dar sequência comercial.
