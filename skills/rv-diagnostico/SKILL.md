---
name: rv-diagnostico
description: Carrega o projeto RV Diagnóstico — melhorias do relatório PostHog do site oficial, implementadas e testadas no site v2 (real-vision-site-v2.vercel.app). Use SEMPRE que Felipe disser "RV Diagnóstico", "rv diagnostico", "diagnóstico do site", "site v2", "PostHog v2" ou quiser retomar/comparar/levar pra produção essas melhorias.
---

# RV Diagnóstico

Ao ativar:
1. Ler `operacao/projetos/_RV-Internos/documentacao/RV-DIAGNOSTICO-PROJETO.md` (estado, regras, pendências, linha do tempo).
2. Se for mexer em código ou rodar agentes: carregar a skill `rv-orquestrador` (fluxo e armadilhas) e `rv-posthog-setup`.
3. Relatório de origem: `operacao/projetos/_RV-Internos/documentacao/RELATORIO-DIAGNOSTICO-POSTHOG-11-09-26.md`.
4. Antes de mexer: `git fetch` + `git status` em `operacao/projetos/_RV-Internos/sites/real-vision-site-v2`. Push sempre com refspec explícito: `git push origin v2-posthog:v2-posthog`.
5. PostHog MCP: confirmar projeto ativo (`switch-project` 610410 pro v2; 518429 só leitura).

## Fase comercial (desde 17/09/2026)

Aplicar a auditoria comercial (vender sites pra pousadas) no v2. Seguir o plano à risca:
- Plano: `operacao/projetos/_RV-Internos/documentacao/RV-DIAGNOSTICO-PLANO-COMERCIAL.md`
- Auditoria: `operacao/projetos/_RV-Internos/documentacao/AUDITORIA-COMERCIAL-11-09-26.md`

Permissões: deploy no v2 livre. Site oficial, `main`, DNS e PostHog 518429 só com "pode fazer" literal.

Ao encerrar sessão: atualizar a linha do tempo e as pendências no documento do projeto.
