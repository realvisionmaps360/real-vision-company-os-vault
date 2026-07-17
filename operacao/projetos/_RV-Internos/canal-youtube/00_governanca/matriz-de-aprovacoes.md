---
status: v1 — espelha .claude/rules/seguranca-e-aprovacoes.md
última atualização: 2026-07-14
---

# Matriz de Aprovações (versão sincronizável)

Este arquivo é a cópia sincronizável (`.md` normal, vai pro vault) da regra completa que vive em `.claude/rules/seguranca-e-aprovacoes.md` (local, não sincroniza). Se as duas divergirem, a versão em `.claude/rules/` é a operacional; esta aqui existe para sobreviver no histórico do Company OS mesmo se a pasta `.claude/` for perdida numa outra máquina.

| Nível | Exige | Exemplo |
|---|---|---|
| A | Nada — autonomia total | Ler, pesquisar, criar rascunho, analisar dado já disponível |
| B | Plano apresentado + aprovação explícita | Reestruturar pastas, mudar CLAUDE.md/regras/hooks, renomear em massa |
| C | Aprovação específica por ação | Upload privado/não-listado, editar metadado de vídeo publicado, playlist |
| D | Aprovação imediatamente anterior, frase exata | `APROVO A PUBLICAÇÃO PÚBLICA DO VÍDEO [ID/slug]` |
| E | Dupla aprovação + backup, frases exatas | `APROVO EXCLUSÃO 1 — OPERAÇÃO [ID]` / `APROVO EXCLUSÃO 2 — OPERAÇÃO [ID]` |

Detalhe completo de cada nível, fluxo de exclusão e o que nunca conta como aprovação: ver a regra completa citada acima.
