---
name: rv-orquestrador
description: Orquestrador de agentes da Real Vision para implementar melhorias no site oficial (realvisionmaps.com) numa versão separada (site v2) antes de levar pra produção. Use quando Felipe disser "orquestrador", "roda os agentes", "implementa as melhorias do relatório/diagnóstico", "manda pro v2", ou trouxer um diagnóstico (PostHog, SEO, auditoria) pra virar implementação. Divide o trabalho em agentes paralelos isolados, junta, testa e publica no link v2.
---

# RV Orquestrador — melhorias no site v2

## Ambiente fixo (criado em 15/09/2026)

| Coisa | Valor |
|---|---|
| Pasta v2 (git worktree) | `operacao/projetos/_RV-Internos/sites/real-vision-site-v2` |
| Branch | `v2-posthog` (nasceu de `origin/main`) |
| Link v2 | https://real-vision-site-v2.vercel.app (projeto Vercel `real-vision-site-v2`) |
| PostHog v2 | projeto `Real Vision Website V2` (id 610410) — dashboard 2098424 |
| PostHog produção | projeto 518429 — **só leitura** |
| Banco | mesmo Supabase do site real — dados de teste com "TESTE" no nome e apagar depois |
| Google | v2 com `X-Robots-Tag: noindex` só no host do v2 (`vercel.json`); `SKIP_INDEXNOW=1` só no projeto Vercel v2 |

## Regras de permissão (decididas pelo Felipe em 15/09/2026)

- **Link v2:** publicar sem pedir (`vercel deploy --prod --yes` dentro da pasta v2).
- **realvisionmaps.com, push na `main`, DNS, projeto PostHog 518429:** continuam exigindo "pode fazer" literal.
- Nunca mexer na branch `fase2-home` nem na pasta `real-vision-site` (outra frente em andamento).

## Fluxo

1. **Pré-voo:** `git fetch` + `git status` na pasta v2. Se `origin/main` andou, trazer (`git merge origin/main`) antes de começar.
2. **Quebrar em frentes:** cada item do diagnóstico vira tarefa com critério de teste. Agrupar por arquivo tocado — dois agentes nunca editam o mesmo arquivo.
3. **Disparar agentes em paralelo** (`Agent`, `isolation: worktree`, background). Cada prompt leva: contexto do site, arquivos proibidos, como montar `.env` (copiar da pasta v2, nunca imprimir) e `node_modules` (junction pra `real-vision-site/node_modules`), "commit sem push, sem deploy", e formato de relatório.
4. **MCP do PostHog tem um projeto ativo por sessão.** Só um agente por vez usa as ferramentas de projeto; quem trocar pra 518429 volta pra 610410 no fim. Docs via context7 não conflitam.
5. **Conferir antes de aceitar:** checar no git/código a afirmação principal de cada relatório (não copiar conclusão sem verificar).
6. **Juntar:** o worktree do agente nasce do HEAD do repo principal, não da v2 — trazer com `git cherry-pick <hash>` na pasta v2. Apagar worktree e branch do agente depois.
7. **Build + deploy v2:** `npm run build` local passa → `vercel deploy --prod --yes`.
8. **Teste real no link v2** (Playwright): consentimento via `localStorage.setItem('rv-analytics-consent','granted')` **na origem do v2**, reload, provocar o evento, conferir no PostHog v2 com `execute-sql`.
9. **Relatório pro Felipe:** tabela item → status → prova (print/consulta). Levar pra produção só com "pode fazer".

## Armadilhas já vistas

- `npm run build` dispara `notify-indexnow` — no local sem `SKIP_INDEXNOW` ele manda as URLs de produção (responde 403, inofensivo).
- `vercel env add` com `VITE_*`: usar `--type config` (Vercel recusa como Secret). Passar valor via `printf` no Bash, nunca pipe do PowerShell (BOM).
- Playwright salva arquivos só dentro de `Desktop\Real Vision` — prints em `.playwright-mcp\`.
- Rageclick em botões de repetição (volume, letra, pular 15s) é falso positivo.
