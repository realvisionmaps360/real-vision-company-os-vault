# RV Diagnóstico — Site v2 + PostHog

Projeto interno que transforma o [[RELATORIO-DIAGNOSTICO-POSTHOG-11-09-26]] em melhorias reais, testadas num site v2 separado antes de ir pro realvisionmaps.com.

Relacionado: [[POSTHOG-ANALYTICS]] · skill `rv-diagnostico` · skill `rv-orquestrador` · skill `rv-posthog-setup`

---

## Onde está cada coisa

| Coisa | Onde |
|---|---|
| Site v2 (teste) | https://real-vision-site-v2.vercel.app (escondido do Google) |
| Código v2 | `operacao/projetos/_RV-Internos/sites/real-vision-site-v2` (branch `v2-posthog`, também no GitHub) |
| Projeto Vercel | `real-vision-site-v2` |
| PostHog v2 | "Real Vision Website V2" (id 610410) |
| Dashboard | https://us.posthog.com/project/610410/dashboard/2098424 |
| PostHog do site real | projeto 518429 (só leitura, intocado) |
| Banco | mesmo Supabase do site real (testes marcados "TESTE") |

## Regras combinadas com o Felipe (15/09/2026)

- Publicar no **site v2** sem pedir permissão.
- **realvisionmaps.com, versão principal (`main`), DNS e PostHog 518429** continuam exigindo "pode fazer".
- Esperar 1-2 semanas de dados no v2 antes de propor levar pro site oficial.

## O que foi feito

| # | Melhoria | Resultado |
|---|---|---|
| 1 | Funil da Academy | 5 etapas: `academy_course_viewed` → `academy_purchase_clicked` → `academy_order_created` → `academy_whatsapp_clicked` → `academy_enrolled`. Testado ao vivo (etapa 1) |
| 2 | Rageclicks na tela de aula | Não era bug: botões removidos em 10/08 (commit `f4dca32`). Sem mudança de código |
| 3 | Captura de erros | `capture_exceptions` ligado. Erro proposital chegou no PostHog |
| 4 | Esconder dados sensíveis na gravação | `maskAllInputs` + classe `ph-mask` em login, senha, WhatsApp, tabela de alunos. Falta conferir numa gravação |
| 5 | Dashboard por seção | Funil, visitas por seção, erros por dia, rageclicks reais |
| 6 | Filtrar testes internos | localhost/192.168 fora dos gráficos; gravação só no domínio v2; rageclick ignora volume/letra/15s |

**"Virou aluno"**: conta na 1ª vez que o aluno logado vê a própria matrícula (a liberação é manual no painel). O aluno é reconhecido pelo id da conta, sem e-mail no PostHog.

## Linha do tempo

- **11/09/2026** — Relatório de diagnóstico gerado.
- **12/09/2026** — Obsidian CLI conectado; plano das 6 melhorias aprovado.
- **15/09/2026** — Site v2 + projeto Vercel + PostHog v2 criados. Agentes em paralelo (A: rastreamento, B: tela de aula). Itens 1-6 no ar no v2. Skill `rv-orquestrador` criada. Etapa "virou aluno" adicionada. Branch `v2-posthog` enviada pro GitHub (`main` intocada, `848f4cc`).
- **17/09/2026** — Projeto salvo com o nome **RV Diagnóstico** (skill `rv-diagnostico`).
- **17/09/2026** — Fase comercial planejada: [[AUDITORIA-COMERCIAL-11-09-26]] vira [[RV-DIAGNOSTICO-PLANO-COMERCIAL]]. Público: pousadas e casas de temporada. Execução no notebook da Romana.

## Pendências

- [ ] Testar etapa "virou aluno" com uma conta de aluno matriculada (precisa do Felipe ou conta de teste existente)
- [ ] Abrir uma gravação no PostHog v2 e confirmar campos borrados
- [ ] Por volta de 29/09/2026: comparar números v2 x site real e propor ida pra produção (com "pode fazer")
- [ ] Depois da ida pra produção: aplicar as mesmas configurações no PostHog 518429
