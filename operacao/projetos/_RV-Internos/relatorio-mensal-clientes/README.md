---
title: Relatório Mensal Automático — Clientes
tags:
  - projeto-interno
  - automacao
  - email
status: em-andamento
data_inicio: 2026-07-10
---

# Relatório Mensal Automático — Clientes

## Objetivo

Todo dia 1 do mês, deixar pronto no Gmail (`realvisionmaps360@gmail.com`) um **rascunho** de email por cliente com plano mensal, com o relatório do site (dados do Google Analytics + resumo) em HTML salvo na pasta do cliente. O email referencia o caminho do arquivo (não anexa), e o Felipe anexa manualmente no Gmail antes de revisar e disparar — nada é enviado sozinho.

Esse projeto já estava em aberto há meses (dois clientes atrasados). Nesta sessão (10-11/07/2026) foi destravado: os dois envios atrasados foram gerados e a rotina automática foi criada.

## Parâmetros fechados com o Felipe (10/07/2026)

| Parâmetro | Decisão |
|---|---|
| Caixa de email dos rascunhos | `realvisionmaps360@gmail.com` (Gmail conectado ao MCP) — **não** `adm@realvisionmaps.com`, que é o padrão de outros documentos da skill `rv-relatorio` |
| Quem dispara o email | Sempre o Felipe, manualmente. A automação só cria o rascunho |
| Frequência | Mensal, todo dia 1, 9h (horário local) |
| Template do relatório | Mesmo da skill `rv-relatorio` (HTML, capa honeycomb, identidade RV) |
| Clientes atrasados com meses acumulados | Consolidar num **único documento** cobrindo todo o período em atraso — nunca gerar um HTML por mês retroativo. Caso do Alessandro/Conectando Saúde (atraso desde 13/05/2026) |
| Cliente sem atraso acumulado | Segue relatório único do mês corrente. Caso do Gabriel/Solarium (GA4 criado 20/05/2026, sem meses perdidos) |

## Clientes cobertos

| Cliente | Pasta | GA4 property | Destinatário do rascunho | Idioma |
|---|---|---|---|---|
| Gabriel Iberg — Solarium Aarau | `operacao/clientes/arquivos/Gabriel Iberg - Solarium Aarau/` | `properties/538376459` | solariumaarau@gmail.com | Alemão (Hochdeutsch) |
| Alessandro Furtado — Conectando Saúde | `operacao/clientes/arquivos/Alessandro Furtado - Associação Beneficiente Conecta Saúde/` | `properties/537716669` | Conectandosaude.a.b@gmail.com | Português |

Lista expansível — novos clientes com plano mensal entram nesta tabela e no prompt da scheduled task (ver abaixo).

## Restrição técnica descoberta (importante para qualquer sessão futura)

O HTML "oficial" da skill `rv-relatorio`, com a foto de capa (honeycomb) embutida em base64, costuma passar de 150-300 KB. Anexar esse arquivo num rascunho de Gmail via MCP exige colar o conteúdo inteiro em base64 como parâmetro de uma chamada de ferramenta — e a codificação em base64 tokeniza de forma extremamente ineficiente (chegou a ~230 mil tokens só de anexo num teste). Isso é inviável dentro de uma única resposta do agente.

**Solução adotada (atualizada em 11/07/2026):** o agente não anexa mais nada. O HTML oficial (com foto/capa honeycomb) é salvo só na pasta do cliente, e o rascunho do Gmail apenas referencia o caminho completo do arquivo no corpo do email — o Felipe anexa manualmente no Gmail antes de enviar. A "versão leve sem foto" que existia para contornar o limite de tokens foi abandonada; só existe mais o HTML oficial.

**Regra adicional (11/07/2026) — clientes em alemão:** além do relatório oficial no idioma do cliente, o agente gera uma segunda versão idêntica em português na mesma pasta (sufixo `_PT`), só para o Felipe conferir o conteúdo antes de aprovar o envio. Essa versão PT não vai para o cliente.

## O que foi feito nesta sessão (10-11/07/2026)

- **Solarium Aarau:** primeiro relatório gerado (`Solarium_RelatorioMensal_10-07-26.html`, período 20/05–09/07/2026), rascunho criado no Gmail em alemão. `TIMELINE.md` do cliente criada.
- **Conectando Saúde:** não existia nenhum modelo — criados `relatorio-mensal-modelo.md` e `email-relatorio-mensal-modelo.md` na pasta do cliente. Primeiro relatório consolidado gerado (`ConectandoSaude_RelatorioMensal_10-07-26.html`, período 13/05–09/07/2026), rascunho criado no Gmail em português. `TIMELINE.md` criada.
- **Scheduled task criada:** `relatorio-mensal-clientes` (cron `0 9 1 * *`), próxima execução 01/08/2026. Roda com um prompt autocontido (sem memória desta conversa) que instrui a puxar dados do GA4, montar as duas versões do HTML, criar o rascunho no Gmail e atualizar a TIMELINE de cada cliente. Arquivo: `C:\Users\Computador\.claude\scheduled-tasks\relatorio-mensal-clientes\SKILL.md`.

## Pendências / próximos passos

- Confirmar com o Felipe se os dois rascunhos de julho foram revisados e enviados (ver Gmail).
- Se a lista de clientes com plano mensal crescer, atualizar a tabela acima **e** o prompt da scheduled task (editar via `mcp__scheduled-tasks__update_scheduled_task`).
- Rotina alterada em 11/07/2026 (rascunho sem anexo + versão PT para clientes alemães) — validar no próximo teste manual se o formato do email ficou claro o suficiente para o Felipe achar o arquivo na pasta.
