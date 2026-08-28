# TIMELINE — VisionVault

> Diário de bordo do painel do Company OS. **Regra:** ao final de toda sessão de trabalho no
> VisionVault, registrar aqui o que foi feito, as decisões e o próximo passo — e atualizar os
> `_PAINEL.md` dos projetos tocados. Datas em formato absoluto.

---

## Status geral

| Fase | Status | Observação |
|---|---|---|
| 0 — Contrato (`_PAINEL.md` + schema) | ✅ Concluída | 2 projetos-piloto |
| 1 — Gerador em CI | ✅ Concluída | Action publica em `painel-dist` |
| 2 — App instalável | ✅ Concluída | PWA no ar, login validado |
| 3 — Detalhe + leitor markdown | ✅ Concluída | Wikilinks resolvidos no build |
| 4 — Visualizações tipadas | ✅ Concluída | Kanban e cadência |
| 5 — Arquivos + calendário | ✅ Concluída | Calendário lê datas do vault |
| 6 — Mapa mental | ✅ Concluída | React Flow + dagre |
| 7 — Polimento e teste | ✅ Concluída | Validado logado em produção |
| 8 — Google Calendar (OAuth) | ⬜ Não iniciada | Adiado por decisão do Felipe |
| Futuro — frontmatter no vault inteiro | ⬜ Não iniciada | ~665 documentos vivos |

**No ar:** https://visionvault-gold.vercel.app

---

## Registro de sessões

### 27–28/08/2026 — Sessão 1: concepção, construção e entrega

**Ponto de partida.** Felipe descreveu o problema: toca vários projetos em paralelo, o estado de
cada um vive espalhado em centenas de markdowns, e não existe um lugar que responda "o que está
rolando agora". Queria um app no celular com o visual da Real Vision Academy.

**Levantamento antes de desenhar.** Varredura do vault (1.174 arquivos `.md`, ~12 MB; ~665
documentos vivos fora de `skills/`, `.claude/`, `TEMP/`) e do código da Academy. Duas descobertas
mudaram o desenho:

1. **Parsear a prosa não funcionaria.** 58% de `operacao/` não tem frontmatter — e justamente os
   projetos mais ativos (email marketing, pipeline de blog, campanhas de prospecção) têm zero.
   Onde `status` existe, há ~40 valores de ocorrência única, alguns frases inteiras.
2. **Já existia conflito de fonte de verdade.** Na pasta de email marketing, três documentos se
   declaram autoridade sobre o mesmo dado. E o pipeline de blog conhece 2 posts publicados
   enquanto o calendário editorial conta 21 — porque a verdade sobre publicação vive no repo do
   site, não no vault.

**Decisão central:** o app não adivinha. Cada projeto declara seu estado num `_PAINEL.md` com
frontmatter tipado, mantido pelo agente. O gerador lê só esses arquivos e os documentos que eles
apontam.

**Construído:**
- `tools/painel/schema.ts` — schema Zod, definição normativa do contrato
- `tools/painel/build.ts` — gerador tolerante por arquivo, resolve wikilinks, cross-check com git
- `.github/workflows/painel.yml` — Action publica o índice no branch órfão `painel-dist`
- App React + Vite + Tailwind, visual replicado da Academy, PWA instalável
- Telas: Início (grid ordenado por energia), Projeto (3 visualizações), Documento (markdown com
  wikilinks e callouts do Obsidian), Arquivos (árvore + busca), Calendário, Mapa (React Flow)
- `api/painel/*` na Vercel: valida JWT do Supabase + allowlist antes de ler o vault no GitHub
- `scripts/verificar-vazamento.mjs` — trava de build contra vazamento de conteúdo do vault

**Decisões registradas:**
- 27/08 — Dados via GitHub, não leitura local: o app precisa abrir no celular em qualquer lugar
- 27/08 — Só leitura. O app nunca escreve no vault
- 27/08 — Home ordena por atividade, não por pasta. A hierarquia vive na aba Arquivos
- 27/08 — Índice publicado em branch órfão, não em `main`: em `main` brigaria com o `vault-sync.sh`
- 27/08 — Nenhum byte do vault no bundle, com teste automatizado que falha o build
- 28/08 — **Auth migrada para o Supabase do VisionFlow** (`ghwjetvazmdlaqidgxqi`). O projeto do
  site (`xomtfkbvathddfpbknyo`) vive em outra conta Google que o Felipe não acessa
- 28/08 — Google Calendar adiado para o fim; o calendário v1 lê as datas declaradas no vault
- 28/08 — Padronizar frontmatter de todo o vault fica como fase futura

**Os três bugs que impediram o login** (cada um escondendo o próximo, todos corrigidos):

1. **Projeto Supabase inacessível.** O app usava o do site, que está em outra conta Google. Felipe
   tentou adicionar a Redirect URL e não teve efeito — ele não estava mexendo naquele projeto.
2. **Service worker servindo versão antiga.** Sem `skipWaiting`/`clientsClaim`, o app instalado
   ficaria preso na versão quebrada mesmo depois da correção.
3. **BOM invisível em variável de ambiente.** O pipe do PowerShell gravou U+FEFF no valor do
   `SUPABASE_PROJECT_REF`. O emissor virou `https://<BOM>ghwjet...` e a verificação falhava com um
   "token inválido" mudo. Blindado com sanitização, e o servidor agora informa o motivo real da
   recusa junto com o emissor esperado.

**Validado de ponta a ponta em produção**, logado com `realvisionmaps360@gmail.com`: login Google
→ JWT ES256 → allowlist → GitHub → índice do vault (HTTP 200, 11 KB de dados reais). Todas as seis
telas percorridas. Ciclo de atualização confirmado: push no vault → Action → app atualizado.

**Lição de processo:** na primeira entrega, o login foi apresentado como funcionando quando só a
tela de login e a recusa sem token tinham sido testadas. O pedaço mais importante ficou de fora.
Verificação parcial precisa ser declarada como parcial.

**Próximo passo:** ligar a métrica "Contatos ativos: 28" ao documento da lista — ver abaixo.

---

## Próxima sessão — métrica clicável

Hoje o card de métrica é texto morto. O número **28 contatos ativos** vive no `_PAINEL.md` do
email marketing, e a lista real desses contatos vive noutro documento do vault. Os dois não se
falam: para saber *quem* são os 28, o Felipe ainda precisa sair do painel e caçar o arquivo.

**Objetivo:** clicar numa métrica e abrir o documento que a sustenta.

Pontos a resolver:

1. **Qual documento é a fonte real dos 28.** Candidatos em `operacao/marketing/email-marketing/`:
   `03-SEGMENTACAO-CONTATOS.md` e `03-CLIENTES-REATIVACAO - Corrigido.md`. Confirmar com o Felipe
   antes de apontar — a tabela `email_contatos` no Supabase pode ser a verdade, e aí o documento
   é espelho, não fonte.
2. **Como o contrato expressa isso.** Provável: campo opcional `fonte` em `metricas[]`, com o
   caminho do documento. O gerador resolve para hash como já faz em `documentos[]`.
3. **O que a UI faz.** Métrica com `fonte` vira link; sem `fonte` continua texto. Sem inventar
   affordance onde não há destino.
4. **O risco do número solto.** O 28 é escrito à mão no `_PAINEL.md` e pode divergir do documento
   e do banco. Vale decidir se o painel mostra a data em que aquele número foi apurado.

Este é o primeiro caso de **métrica com procedência**, e o padrão que sair daqui vale para todas
as outras.

---

## Relacionados

- Skill: `skills/visionvault`
- Nó LBOS: `LBOS/02-Projetos/visionvault/PROJETO.md` (`PRJ-2026-007`)
- Painéis-piloto: `operacao/marketing/email-marketing/_PAINEL.md` ·
  `operacao/projetos/_RV-Internos/documentacao/_PAINEL.md`
- Gerador: `tools/painel/`

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-28 | Arquivo criado com o registro da sessão 1 | Primeira entrega do VisionVault |
