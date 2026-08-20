---
id: CON-2026-004
tipo: conhecimento
nome: Domínio ainda no builder antigo apesar do repo existir — diagnóstico e correção
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-13
atualizado_em: 2026-08-13
proxima_revisao: 2026-11-13
confiabilidade: alta
fonte: caso real Vila dos Corais, 13/08/2026
pertence_a: ["[[LBOS]]"]
referencia: ["[[02-Projetos/vila-dos-corais/PROJETO]]"]
tags: [lbos/entidade, lbos/conhecimento]
---

# Domínio ainda no builder antigo apesar do repo existir

## O padrão

Cliente teve o site original feito em builder (Lovable, e potencialmente outros como Framer/Wix/Webflow). Em algum momento o código foi exportado/portado para um repositório próprio da Real Vision (Vite/React, hospedado na Vercel). O repositório existe, está atualizado, o `git log` mostra commits recentes — **mas o domínio do cliente nunca foi de fato apontado pro deploy novo**. O builder antigo continua sendo o que está no ar, silenciosamente.

Sintomas típicos:
- Algo "cosmético" do site antigo persiste mesmo depois de corrigido no código (favicon, og:image, um texto) — porque a correção está no repo que ninguém está servindo.
- `git push` não muda nada visível no domínio de produção.
- Um script ou elemento estranho aparece no HTML servido que não existe no código-fonte do repo.

## Como diagnosticar rápido

1. **Nunca assumir hospedagem pelo nome do arquivo ou pela pasta do repo.** Confirmar sempre.
2. `nslookup dominio.com.br` — ver o IP real.
3. `curl -s https://ipinfo.io/IP/json` — identificar o `org`/`hostname`. Builders costumam aparecer no `hostname` mesmo atrás de Cloudflare (ex.: `lovable-app-*.p.l5e.io` identificou o Lovable neste caso).
4. `nslookup -type=CNAME dominio.com.br` — descobre quem é o DNS autoritativo (registrador/painel onde a correção precisa ser feita).
5. Comparar o HTML servido (`curl -s https://dominio.com.br`) com o `index.html` do repo — se divergem (scripts extras, tags faltando), é outro host servindo, não cache.

**Regra:** não concluir "é cache do Google/navegador" sem antes confirmar o host real pelo IP. Ver também o aprendizado equivalente da auditoria Solarium em `rv-auditoria-tecnica-site` — mas lá era duplicação de domínio; aqui é builder antigo nunca desligado.

## Como corrigir

1. Confirmar (ou criar) o projeto na Vercel a partir do repositório: `npx vercel --prod` na pasta do site.
2. Adicionar o domínio ao projeto: `npx vercel domains add dominio.com.br <projeto>`.
3. `npx vercel domains inspect dominio.com.br` — ele informa o registro exato a mudar (normalmente `A dominio.com.br 76.76.21.21`, sem precisar trocar nameservers).
4. Passar o registro pro Felipe aplicar no painel do registrador (Locaweb, Registro.br, etc.) — **login em painel de terceiros é sempre ação do Felipe, nunca da IA**.
5. Aguardar propagação (minutos a algumas horas) e reconfirmar com `nslookup` + `curl`.

## Sites que já passaram por esse diagnóstico via LBOS

| Cliente | Domínio | Builder antigo | Data do diagnóstico | Status |
|---|---|---|---|---|
| Flávia Andrade — Vila dos Corais | viladoscorais.com.br | Lovable | 2026-08-13 | DNS trocado pelo Felipe na Locaweb, aguardando propagação — ver [[02-Projetos/vila-dos-corais/PROJETO]] |

## Relacionados
- Pertence a: [[LBOS]]
- Referencia: [[02-Projetos/vila-dos-corais/PROJETO]]
- Ver também: `skills/rv-auditoria-tecnica-site/SKILL.md`

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-13 | Documento criado | Caso Vila dos Corais revelou um padrão reaproveitável (repo atualizado ≠ domínio real) | Próxima vez que um site "não atualiza" mesmo com código certo, o diagnóstico começa aqui em vez de do zero | Vira registro vivo — cada novo caso semelhante adiciona uma linha na tabela, não um documento novo |
