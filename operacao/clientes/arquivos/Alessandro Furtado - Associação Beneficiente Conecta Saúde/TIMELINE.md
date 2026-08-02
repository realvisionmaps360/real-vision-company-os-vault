# TIMELINE — Alessandro Furtado (Associação Beneficiente Conectando Saúde)

Wiki: [[alessandro-furtado]] · Ver: [[FICHA-CLIENTE]] · [[RELATORIOS]] · [[email-relatorio-mensal-modelo]] · [[relatorio-mensal-modelo]] · [[AUDITORIA-CRO-CONECTANDO-SAUDE]] · [[AUDITORIA-TECNICA-CONECTANDO-SAUDE]] · [[PLANO-EXECUCAO-PROXIMA-SESSAO]] · [[ANALYTICS-CLARITY]] · [[ANALYTICS-POSTHOG]]

## Tempo investido

| Data | Sessão | Duração estimada |
|---|---|---|
| 02/08/2026 | Auditoria CRO+técnica, correções de site, indexação GSC, PostHog+Clarity | 1-2h |

---

## 10/07/2026 — Primeiro relatório mensal enviado (consolidado)

- Gerado `ConectandoSaude_RelatorioMensal_10-07-26.html` (skill `rv-relatorio`), consolidando todo o período em atraso desde a criação do GA4 (13/05/2026) até 09/07/2026 num único documento — não um HTML por mês retroativo (decisão do Felipe).
- Criado modelo reutilizável (`relatorio-mensal-modelo.md`, `email-relatorio-mensal-modelo.md`) para os próximos relatórios mensais deste cliente.
- Rascunho criado no Gmail (`realvisionmaps360@gmail.com`), destinatário `Conectandosaude.a.b@gmail.com`, aguardando revisão e envio do Felipe.
- Rotina automática criada: a partir de 01/08/2026, novo relatório mensal é preparado como rascunho todo dia 1.

## 11/07/2026 — Relatório refeito no estilo "leve" (padrão fixado)

- O relatório de 10/07 estava muito genérico e com poucos dados. Refeito como `ConectandoSaude_RelatorioMensal_11-07-26.html`, no estilo "leve" (mesmo do relatório do Gabriel/Solarium usado como referência), com mais seções: resumo, desempenho, páginas mais visitadas, origem de tráfego, mobile/desktop e próximos passos. O arquivo de 10/07 não foi apagado, ficou na pasta como histórico.
- Deixado explícito no relatório que o acompanhamento formal só começa agora (site entregue em 12/01/2026, GA4 configurado em 13/05/2026 por falha interna nossa) — sem dados de janeiro a abril.
- Novo rascunho criado no Gmail com o mesmo conteúdo, sem anexar o HTML (regra nova de 11/07) — só referenciando o caminho do arquivo pro Felipe anexar manualmente. Felipe já enviou esse email pro Alessandro hoje.
- Estilo "leve" fixado como padrão pros próximos relatórios deste cliente (ver `RELATORIOS.md`). Próximo envio real: 01/08/2026, cobrindo julho/2026 fechado.

## 11/07/2026 — Confirmado: e-mail enviado ao Alessandro

- Felipe confirmou que enviou o e-mail com o relatório (`ConectandoSaude_RelatorioMensal_11-07-26.html`) pro Alessandro hoje. Primeiro relatório mensal real, oficialmente entregue ao cliente.

## 02/08/2026 — Auditoria CRO+técnica, correções de site e indexação GSC

- Geradas `AUDITORIA-CRO-CONECTANDO-SAUDE.md` e `AUDITORIA-TECNICA-CONECTANDO-SAUDE.md`, e `PLANO-EXECUCAO-PROXIMA-SESSAO.md` fechado com 10 itens.
- Corrigidos: wikilinks do cliente, `sitemap.xml` (`lastmod` atualizado), `robots.txt` (regra órfã do Lovable removida), README (placeholder Lovable removido), aviso de voluntariado (sem menção a mês), CTA "Doe agora" + menu "Doar" agora levam direto pra âncora do PIX (antes iam pra `/contato`).
- Commit `ac92107` pushado pro `main`, deploy confirmado.
- Felipe fez a indexação no Search Console: sitemap reenviado com êxito (7 páginas encontradas), as 6 rotas internas confirmadas fora do Google e "Solicitar indexação" feito em todas — aguardando o Google processar.
- Item 3 concluído: PostHog instalado (código igual padrão RV/Solarium, `posthog-js` clássico + `ConsentBanner`), testado local (aceitar carrega o SDK de verdade, recusar não carrega), env vars adicionadas no Vercel pelo Felipe, commit `6fd7af3` pushado e deploy disparado. Clarity confirmado no código, `ANALYTICS-CLARITY.md` e `ANALYTICS-POSTHOG.md` criados. Regra de data obrigatória documentada no `INDICE-CLIENTES.md`.
- Pendente: confirmar ao vivo que o banner do PostHog aparece em produção e o evento chega no painel; item 10 (pedido de material pro cliente, entra no relatório final).

## 02/08/2026 — Relatório mensal de julho gerado (rotina automática)

- Gerado `ConectandoSaude_RelatorioMensal_02-08-26.html` (skill `rv-relatorio`, estilo leve), cobrindo julho/2026 completo — primeiro mês fechado analisado isoladamente desde o baseline (13/05-10/07, 17 sessões consolidadas).
- Dados via GA4 (`properties/537716669`): 33 sessões, 25 usuários, 44 page views, duração média 1min07s. Julho sozinho já superou o total acumulado do baseline. Busca orgânica ganhou espaço (29% → 54,5%), acesso direto caiu (71% → 45,5%).
- Rascunho criado no Gmail (`r-4247648090546932498`), destinatário `Conectandosaude.a.b@gmail.com`, em português, referenciando o caminho do arquivo (sem anexar) — aguardando revisão e envio do Felipe.
