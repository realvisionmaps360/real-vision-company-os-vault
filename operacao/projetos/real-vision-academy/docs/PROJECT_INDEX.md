---
id: PROJECT_INDEX
title: Índice do Projeto — Real Vision Academy
type: index
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-30
---

# 🎓 Real Vision Academy — Índice do Projeto

> Índice central da documentação viva da Academy. Mantido por [[master-visionair]].
> **Comece por [[CONTEXT]]** para saber o estado atual em 30 segundos.

## 🚦 Estado atual
- **Fase 7 (Curso Narrado Sincronizado): Fases 0-4 concluídas, Fase 5 documentada e pronta pra executar.**
  MVP é **uma aula só** (a 0.1 do Profissional 360). D-021 fechada (PWA aprovada em aparelho real,
  Capacitor descartado). Nenhuma decisão em aberto travando fase.
  **Antes de executar a Fase 5, ler KI-30/KI-31/KI-32 em [[KNOWN_ISSUES]]** — a revisão do plano achou dois
  bugs que já existem em produção, e o SQL de [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]] é pré-requisito
  absoluto (sem ele a Academy mostra o curso vazio para todo aluno).
- **Fase 6 (Hub + Comunidade v1):** concluída no código e verificada no preview — passos 3 a 6 do
  [[PRD-006-plano-execucao]] fechados (memberships/gating, casca do hub, Comunidade, Biblioteca de
  Prompts+Skills).
- Resumo executivo → [[CONTEXT]]

## 📌 Visão do produto & requisitos
- [[MASTER_PRD]] — visão, escopo, requisitos, evolução
- [[GLOSSARY]] — termos do projeto

## 🏗️ Arquitetura
- [[ARCHITECTURE]] — visão técnica, modelo de dados, integrações
- `diagrams/` — diagramas (a criar)

## 🗺️ Planejamento
- [[ROADMAP]] — fases de desenvolvimento e evolução
- [[TIMELINE]] — registro cronológico do desenvolvimento

## 🧠 Decisões & conhecimento
- [[DECISIONS]] — decisões arquiteturais (contexto, problema, decisão, justificativa)
- [[KNOWN_ISSUES]] — problemas conhecidos, limitações, riscos
- [[IDEAS]] — ideias e oportunidades futuras
- [[CHANGELOG]] — histórico de alterações
- [[METHODOLOGY_LEARNINGS]] — validação da metodologia de engenharia

## 🔬 Pesquisa (destrava decisões pendentes)
- [[pagamento]] — comparativo de gateways/taxas (curso avulso BR)
- [[video-hosting]] — comparativo de hospedagem de vídeo
- `references/` — materiais de referência externos

## 📂 PRDs por módulo
- [[PRD-002-modelo-de-dados]] — schema do catálogo + RLS (Fase 2, implementado)
- [[PRD-004-analytics-posthog]] — analytics PostHog no site inteiro (draft, aguardando aprovação)
- [[PRD-005-area-de-membros]] — entrada da área de membros no header + resumo + perfil (draft, aguardando aprovação)
- [[PRD-006-hub-comunidade]] — hub da área de membros + comunidade nativa v1 (draft, aguardando aprovação)
- [[PRD-007-curso-narrado-sincronizado]] — aula narrada com áudio sincronizado: produto e escopo (em revisão)
- [[PRD-007-arquitetura-leitor-narrado]] — leitor, dados, segurança, segundo plano, pipeline (em revisão)
- [[PRD-007-plano-execucao]] — as 8 fases com checkpoint, aceite, rollback e trava (fases 0-4 concluídas)
- [[PRD-007-fase5-plano]] — passo a passo detalhado da Fase 5, auto-suficiente (aguardando execução)
- [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]] — SQL da Fase 5, pronto pro SQL Editor (aguardando Felipe rodar)

## 🔗 Fora deste vault
- **Código:** `operacao/projetos/_RV-Internos/real-vision-site` (rota `/academy`)
- **Conteúdo do curso Profissional 360:** `operacao/cursos/02-profissional-360/` — [[02-profissional-360/CONCEITO|CONCEITO]] (grade),
  [[CONTEXTO-PARA-IA-ROTEIRISTA]] (marca e tom), [[MODULO-0-bem-vindo]] (texto narrado, insumo da Fase 7),
  [[MODULO-1-google-meu-negocio]] (roteiro screencast)
- **Playbook do RV Voice Sync (base técnica da Fase 7):** [[NARRACAO-SINCRONIZADA-BLOG]]
- Skill condutora: [[master-visionair]] · contexto da empresa: [[realvision]]
