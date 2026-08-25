---
data: 2026-08-17
origem: "sessao de voice dump com ChatGPT — Felipe trouxe como PRD estruturado (prd-memory-dump-operacional-2026-08-17.md)"
confiabilidade: media
status_pipeline: "entrada — classificacao/impacto ainda nao concluidos para todas as frentes"
tags: [lbos/inbox, lbos/handoff]
---

# PRD — Memory Dump Operacional — 2026-08-17

> Nota crua no sentido do LBOS: chegou já estruturada pelo Felipe/ChatGPT, mas ainda não passou pelo pipeline completo (classificação → entidades → relações → impacto) aqui no vault. Serve de referência única para as 3 sessões trabalhando em paralelo nas prioridades 1, 2 e 3 (ver `## Status de processamento` no fim).

## 1. Objetivo deste documento

Este documento consolida o memory dump feito por Felipe em 17/08/2026 e transforma a conversa bruta em uma entrada estruturada para ingestão no Company OS e no LBOS.

Ele **não é a fonte final de verdade de cada projeto** e **não deve sobrescrever automaticamente documentos existentes**.

## 2. Regras de ingestão

### 2.1 Regra principal
Tudo abaixo deve ser tratado como informação recebida nesta sessão. Nenhum dado deve ser inventado para completar lacunas. Quando um dado estiver incompleto, registrar como pendência.

### 2.2 Hierarquia de confiabilidade
- **FATO:** dito diretamente por Felipe nesta sessão ou confirmado por documento oficial do sistema.
- **HIPÓTESE:** interpretação, ideia de implementação ou caminho ainda não validado.
- **PENDÊNCIA:** informação necessária para avançar, mas ainda não confirmada.
- **DECISÃO DA SESSÃO:** regra explicitamente aprovada por Felipe nesta conversa.

## 3. Ordem de prioridade aprovada

| Ordem | Frente | Prioridade | Resultado principal |
|---|---|---:|---|
| 1 | Dorival / Brasilcomp | CRÍTICA | Desativar definitivamente o cliente |
| 2 | Eduardo Barqueiro | ALTA | Organizar e concluir a entrega do pacote contratado |
| 3 | Sunbite | ALTA | Colocar operação, segurança, compras, métricas e próxima saída sob controle |
| 4 | Flávia / Vila dos Corais | ALTA | Formalizar entrega, contrato, Google e organização da cliente |
| 5 | VisionFlow / Gestão de Contratos | ALTA | Criar controle visual e documental de contratos por cliente |
| 6 | Profissão 360 / Módulo 0.2 | ALTA | Desenvolver o módulo 0.2 |
| 7 | Campanha de sites para estúdios de música | MÉDIA | Transformar a demo AMP em produto replicável e prospectar estúdios |
| 8 | Sistema de conteúdo com Gemini Notebook | MÉDIA | Criar pipeline de reaproveitamento, distribuição e automação de conteúdo |

> Conteúdo completo de cada prioridade (fatos, ações, pendências, critérios de conclusão) está no arquivo original do Felipe: `prd-memory-dump-operacional-2026-08-17.md` (Downloads). Resumo de cada frente abaixo, na medida do que já foi cruzado com o estado real.

### Prioridade 1 — Dorival / Brasilcomp
Desativação definitiva do cliente. PRD assume que a desativação "ainda está pendente" desde a quinta anterior.

### Prioridade 2 — Eduardo Barqueiro
Concluir entrega contratada: site no ar + canal do YouTube. PRD assume que o site ainda não foi publicado.

### Prioridade 3 — Sunbite
Consolida: segurança da Foodbike (bateria zerou no retorno, freio fraco, retorno perigoso à meia-noite), definição da próxima operação (fim de semana seguinte), checklist operacional reutilizável, controle financeiro por operação, compra de colher de vidro backup, compra de 3 chapéus de morango (Temu, custo ~CHF 8 não confirmado, venda ~CHF 60 como oportunidade percebida), e ideia de loja virtual no site com os chapéus como primeiro produto.

### Prioridades 4-8
Flávia/Vila dos Corais (formalizar contrato + portfólio), VisionFlow (módulo de status contratual visual por cliente), Profissão 360 módulo 0.2, campanha de sites para estúdios de música (baseada na demo AMP/Saulo, genérica, 30-100 leads, ~R$1.500/site), pipeline de conteúdo via Gemini Notebook (shorts verticais, multi-canal, automação de comentário→DM→site).

## 16. Instruções específicas para o Claude Code (do PRD original)

1. Não executar mudanças em produção automaticamente.
2. Ler `AGENTS.md`.
3. Ler os hubs relevantes (aqui: skill `lbos` + `CONVENCOES.md` + `FLUXO-DOCUMENTO-VIVO.md`).
4. Localizar os registros atuais no VisionFlow export/Company OS.
5. Identificar arquivos que já existem. Não criar duplicatas. Não apagar notas.
6. Comparar este handoff com o estado real. Marcar divergências.
7. Criar proposta de ingestão + análise de impacto. Esperar aprovação do Felipe antes de alterações que exigem decisão.
8. Usar os templates LBOS existentes para novos nós. Registrar histórico em cada nó efetivamente alterado.
9. Manter valores financeiros em fonte única. Não transformar hipóteses em fatos.

---

## Status de processamento (preenchido pelo Claude Code em 2026-08-17)

| Prioridade | Passo do fluxo | Sessão responsável |
|---|---|---|
| 1 — Dorival/Brasilcomp | **CONCLUÍDO 17/08/2026.** Divergência resolvida (prazo de 72h vencido sem migração confirmada); 8 registros DNS removidos em `brazilcomp.com.br` + domínio irmão `brazilcomp.com` descoberto e zerado. Ver TIMELINE.md do cliente | Esta sessão |
| 2 — Eduardo Barqueiro | **CONCLUÍDO 17/08/2026.** Divergência resolvida: R$1.000 de referência era permuta pelo passeio de barco (nunca cobrança), R$550 é pagamento novo e integral pela Opção 3 (domínio próprio + YouTube). Site reconectado na Vercel, `FICHA-CLIENTE.md` atualizada, [[02-Projetos/paraty-onboard/PROJETO]] e [[REC-2026-002]] criados. Falta o Eduardo/Felipe: comprar `paratyonboard.com.br`, migrar o domínio, subir o canal do YouTube | Esta sessão |
| 3 — Sunbite | **CONCLUÍDO 17/08/2026.** Continuação do projeto existente, não frente nova. Desfecho da operação de 15/08 registrado (só sábado, ~18h-23h30, esgotou o estoque, CHF 450,90). Dados financeiros da Romana ingeridos: [[REC-2026-004]], [[REC-2026-003]], [[DES-2026-002]], [[DES-2026-003]], [[DES-2026-004]], [[sunbite-unit-economics]], [[sunbite-caixa]], [[sunbite-ficha-tecnica-produto]], [[Mama]]. Divergência de preço resolvida (CHF 7,50, não CHF 5,00). Riscos [[RSC-2026-002]] (bateria/freio, trava operação) e [[RSC-2026-003]] (margem desconhecida) abertos; [[RSC-2026-001]] e [[TAR-2026-001]] fechados. Tarefas [[TAR-2026-006]] a [[TAR-2026-010]] criadas | Sessão separada |
| 4 — Flávia/Vila dos Corais | Achado: já existe `02-Projetos/vila-dos-corais/PROJETO.md` (PRJ-2026-005), mas desatualizado — histórico para em 13/08 quando o Company OS já mostra migração de domínio resolvida em 14/08. Prompt de continuação entregue, primeiro passo é sincronizar o nó antes de tocar em contrato/portfólio | Sessão separada (prompt entregue ao Felipe) |
| 5 — VisionFlow/Contratos | **PAUSADO 21/08/2026, antes de codar.** Campo verde confirmado no banco. Desenho passou por 2 rodadas: proposta inicial (tabela `client_contracts` + aba nova) rejeitada por Felipe; desenho final aprovado em conversa — reaproveitar a aba Arquivos já existente + botão indicador cinza/verde na aba Informações, sem tabela nova. 3 perguntas em aberto travam a implementação. Ver [[02-Projetos/real-vision/TAR-2026-011]] | Esta sessão |

Divergências completas apresentadas ao Felipe no chat da sessão em 2026-08-17. Ver `## Histórico` de cada nó tocado depois da decisão dele.

## Relacionados

- Pertence a: [[LBOS]]
- Processado por: [[FLUXO-DOCUMENTO-VIVO]]
- Toca: [[02-Projetos/sunbite/PROJETO]]
- Referencia (Company OS): `operacao/clientes/arquivos/Dorival  Martins - Brazilcomp/TIMELINE.md`, `operacao/clientes/arquivos/Eduardo Barqueiro/FICHA-CLIENTE.md`, `operacao/clientes/arquivos/Romana Loznjakovic - Sunbite.ch/`

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-17 | Nota criada no inbox a partir do PRD trazido pelo Felipe | Handoff externo (sessão de voice dump), início do trabalho em paralelo nas 3 primeiras prioridades | Vira referência única para as 3 sessões (esta + 2 a abrir) | Ainda não classificada/processada pelo pipeline completo — ver tabela de status acima |
