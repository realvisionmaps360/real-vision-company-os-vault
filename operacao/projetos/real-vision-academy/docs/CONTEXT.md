---
id: CONTEXT
title: Contexto Atual — Real Vision Academy
type: context
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - MASTER_PRD
  - ARCHITECTURE
  - ROADMAP
  - DECISIONS
---

# Contexto Atual — Real Vision Academy

> Primeiro documento a ler para reconstruir o contexto. Mantido curto e atualizado ao fim de cada etapa.

## Fase atual
**Planejamento** — fundação documental criada. Nenhum código de produto implementado ainda.

## Objetivo em andamento
Concluir a documentação de fundação (PRD + Arquitetura + Roadmap) e a pesquisa técnica de pagamento
e hospedagem de vídeo, para o Felipe revisar e aprovar antes de iniciar a implementação.

## Última etapa concluída (2026-07-17)
- Leitura das diretivas (Master Engineering Directive + adendo Master Visionair/Obsidian CLI).
- Rodada de perguntas com o Felipe → decisões travadas (ver [[DECISIONS]]).
- Análise da base existente (`real-vision-site`) → ver [[ARCHITECTURE]] §"O que já existe".
- Skill [[master-visionair]] criada.
- Estrutura documental criada neste vault.

## Decisões recentes
- Academy = **mesmo repo** do site, rota `/academy`. Ver [[DECISIONS]] D-001.
- Supabase novo `xomtfkbvathddfpbknyo` **unifica** usuários finais (blog + Academy). Ver [[DECISIONS]] D-002.

## Bloqueios
- Nenhum bloqueio duro. Duas decisões dependem de pesquisa: gateway de pagamento e hospedagem de vídeo.

## Riscos atuais
- Ver [[KNOWN_ISSUES]] (auth do blog hoje no Supabase do VisionFlow; falta Google OAuth e AuthContext global).

## Pendências
- [x] Pesquisa [[pagamento]] concluída → **Stripe** escolhido (D-005).
- [ ] Hospedagem de vídeo: Felipe optou por decidir depois (D-006 pendente). Recomendação: Bunny Stream.
- [ ] Felipe revisar e aprovar [[MASTER_PRD]] + [[ROADMAP]] para liberar a implementação.
- [ ] Obter anon key do Supabase novo + confirmar Google OAuth habilitado (só na Fase 1).

## Pendências para execução (plano de execução ainda não vira prompt sem isto)

**🔴 Bloqueadores duros — sem isso não dá pra montar o prompt de execução da Fase 1:**
1. Felipe aprovar [[MASTER_PRD]] + [[ROADMAP]] (regra de prioridade máxima da diretiva).
2. Anon key do Supabase novo (`xomtfkbvathddfpbknyo`) — pegar no painel.
3. Google OAuth habilitado no Auth do Supabase novo (Client ID + Secret do Google Cloud).
4. Decidir como aplicar as tabelas no banco novo — reconectar o MCP Supabase pro projeto novo, ou
   rodar o SQL manualmente no painel.

**🟡 Decidir, mas resolvível já no início da Fase 1:**
5. Confirmar se **comunidade** fica mesmo fora do MVP (última checagem de escopo do alinhamento).
6. Login do blog (parcialmente implementado, rodando hoje no Supabase do VisionFlow) — **migrar os
   dados existentes** para o banco novo ou **recomeçar limpo**? Muda o tamanho da Fase 1.
7. Variáveis de ambiente novas (`VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`) em local + Vercel.

**🟢 Não bloqueia o início — pendências de fases seguintes:**
8. D-006 (vídeo) — Fase 3.
9. Conta Stripe + chaves test/live + produto/preço cadastrado — Fase 4.
10. Conteúdo do Profissional 360 (vídeos + prompts `.md`) — Fase 5.

## Próximos passos
1. Felipe resolve os bloqueadores 🔴 acima (1–4) e idealmente também 🟡 (5–6).
2. Master Visionair transforma o plano da Fase 1 em **prompt de execução** para o **Fable 5**.
3. Ativar `/goal` para manter o Fable focado no escopo da Fase 1 durante a execução.
4. Vídeo (D-006) pode ser decidido até a Fase 3 — não bloqueia Fases 1–2.

## Documentos a consultar para continuar
[[MASTER_PRD]] · [[ARCHITECTURE]] · [[ROADMAP]] · [[DECISIONS]] · [[KNOWN_ISSUES]]
