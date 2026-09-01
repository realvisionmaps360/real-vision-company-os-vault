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
| 7.5 — Painel que se explica | ✅ Concluída | Bloco de compreensão, glossário e "?" por item |
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

### 28/08/2026 — Sessão 2: o painel passa a se explicar

**Ponto de partida.** Felipe abriu a tela do Pipeline de Blog e não entendeu. As palavras dele:
gostou do fluxo, mas o início não tem uma instrução simples dizendo o que é o projeto e o que é
cada tela, e falta um botão de interrogação com a explicação específica de cada item. O pedido:
que essas telas sejam legíveis por qualquer pessoa, porque elas são o reflexo real dos
documentos vivos e ele vai ler o estado dos projetos por ali.

**O diagnóstico.** A tela abria em `MARKETING · ATIVO · RISCO`, quatro métricas sem tradução
(`Na fila 6`, `No painel 2`, `No site 21`, `Sem tradução 2`) e um kanban. Nada dizia o que o
projeto era. O vocabulário do sistema (`ativo`, `risco`, `defasado`, os três moldes) não estava
definido em lugar nenhum do app. E `objetivo_final` não existia no contrato: não era bug de UI,
era lacuna do modelo de dados.

**Decisão central:** a explicação nasce no `_PAINEL.md`, não no código. Explicação hardcoded no
app morre no dia em que o projeto muda, e essas telas precisam refletir o documento vivo.

**Construído:**
- Contrato: `o_que_e` (obrigatório), `para_que_serve`, `como_funciona`, `objetivo_final` (+ critério)
- `ajuda` em métrica, pendência, documento, item e coluna de kanban — o texto do "?" daquele item
- `Metrica.fonte` (documento do vault ou banco fora dele) + `apurado_em`
- `colunas` do kanban passa a aceitar explicação por coluna, sem quebrar a forma curta
- `src/lib/glossario.ts` — o vocabulário do sistema definido uma vez, lido das fontes normativas
- Componente `Ajuda`: toggletip em portal, fecha com Esc e clique fora, não vaza em 390px
- Tela de projeto: bloco "O que é isso" sempre visível + "Entender este painel" expansível
- Início: cartão dispensável "O que é o VisionVault" e "?" nas três métricas do topo

**Decisões registradas:**
- 28/08 — `objetivo_final` fica **em aberto em todos os painéis** por enquanto. Ausente, a UI
  mostra "Objetivo final não declarado" em âmbar. É lacuna visível de propósito, não erro
- 28/08 — Métrica com fonte de banco **não vira link**. Não há destino dentro do app, e criar
  affordance de clique sem destino é mentir para o dedo do usuário
- 28/08 — Glossário mora no app, não repetido em cada `_PAINEL.md`. Termo do sistema é do
  sistema; `ajuda` é para o que é específico daquele item

**Dois bugs encontrados e corrigidos:**

1. **Primeira coluna do kanban cortada em 390px.** A causa não era o `-mx-4`/`px-4`, como
   parecia. Era `snap-mandatory`: o snapport usa o padding box, então `snap-start` encaixava a
   coluna em `x=0` e o container se auto-rolava 16px sozinho no carregamento. Corrigido com
   `scroll-pl-4`. Diagnóstico fechado medindo `scrollLeft` no DOM, não a olho
2. **O "?" riscado.** Em item de checklist concluído, o `line-through` atravessava o botão de
   ajuda. O "?" passou a ser irmão do texto, não filho

**O primeiro uso da procedência já pegou um erro.** O painel dizia "Contatos ativos: 28". A
skill `rv-email` aponta a tabela `email_contatos` como a base viva, e o documento
`03-SEGMENTACAO-CONTATOS.md` traz um snapshot de 22/07/2026 com 28 contatos. Foi de lá que o
número veio. Em 28/08 o banco tem **27 ativos**: um contato de relação comercial deu bounce e o
webhook do Resend o tirou da lista ativa sozinho, como está documentado na skill. Dos 27, três
ainda são contatos de teste, então o público real de campanha é 24. O `28` também é o número que
o E1 recebeu no disparo de 27/08, o que significa que o envio pegou os testes e o contato que
depois bounceou.

**Em aberto ao fim da sessão:** Felipe precisa decidir se a métrica mostra 27 ou 24, e se o
snapshot de 22/07 no `03-SEGMENTACAO-CONTATOS.md` ganha uma linha datada com o estado de hoje.
Até lá, a métrica de contatos ficou intocada no `_PAINEL.md` do email marketing.

**Verificado:** typecheck limpo, lint sem erro novo, gerador validando os 3 painéis, e as três
visualizações percorridas em 390px e 1280px com o "?" aberto, fechado por Esc e por clique fora,
sem rolagem horizontal na página. Não testado em produção: as mudanças estão só no local.

---

> [!info] Concluído na sessão 3 (28/08/2026)
> A métrica com procedência foi entregue: `fonte` + `apurado_em` no schema, e a decisão de que
> métrica de banco não vira link. A seção abaixo fica como registro de como o problema foi
> pensado antes de existir solução.

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

## Sessão 4 — 01/09/2026 · uso real: rolagem, tela preta e navegação por dedo

Primeira rodada de correções vinda do **uso**, não do plano. O Felipe usou o painel no celular e
trouxe cinco incômodos. Investigando, quatro deles couberam em três causas.

### A "tela preta" e a "página que abre no meio" eram o mesmo bug

O app nunca resetava a rolagem ao trocar de rota. O sintoma óbvio era abrir um projeto e cair no
meio dele. O sintoma **não** óbvio: quando a página de destino é mais curta que a posição
anterior, o navegador prende a rolagem no fim dela — e o que sobra na tela é fundo escuro vazio.
Parecia app travado sem carregar nada.

Medido antes da correção:

| Ação | Rolagem antes | Rolagem depois | Altura do destino |
|---|---|---|---|
| Início → `/arquivos` | 6000 | 1006 | 1818px |
| Início → `/projeto/...` | 1196 | 1196 | — |

Correção em `src/components/IrAoTopo.tsx`: `useLayoutEffect` no `pathname`, com `hash` de fora
para link de âncora continuar funcionando. Depois da correção, as duas rotas medem `0`.

### O app não tinha rede de segurança nenhuma

Não existia `ErrorBoundary` em lugar algum. Qualquer erro de render derrubava a árvore inteira e
deixava o fundo `#0a0d14` na tela — que num app dark é indistinguível de "não carregou". Agora
`src/components/ErroBoundary.tsx` envolve o `Outlet`, com `key` na rota para se resetar ao
navegar, e trata em separado a falha de chunk preguiçoso (deploy novo + service worker velho),
oferecendo limpar o cache em vez de mostrar erro técnico.

`Documento.tsx` também tinha um `return null` mudo quando o documento não vinha. Virou estado
vazio explícito.

### Não existia faixa de tablet

A casca ia de celular direto para desktop em 1024px. O iPad em retrato (768px) caía no layout de
celular — o único tamanho que ele nunca tem. Agora são três faixas:

| Largura | Navegação |
|---|---|
| < 768px | Barra fixa embaixo, no alcance do polegar, com área segura do iPhone |
| 768–1023px | Coluna estreita de ícones (iPad retrato) |
| ≥ 1024px | Coluna larga com rótulo ao lado do ícone |

A navegação do celular saiu do topo de propósito: como grade de chips lá em cima, exigia esticar
o dedo até a outra ponta do aparelho e sumia assim que a página rolava. Todo alvo clicável da
casca tem no mínimo 44px, contorno no repouso, estado âmbar no ativo, anel de foco visível e
retorno de toque (`scale`) onde não há hover.

O manifesto do PWA travava a orientação em `portrait`. Para iPad isso é errado — virou `any`.

### Métrica de banco ganhou destino

O `_PAINEL.md` já podia declarar `fonte.url`, mas o app ignorava o campo: o card de **Contatos
ativos** dizia "fora do vault" e não levava a lugar nenhum. Agora, quando há `url`, o card vira
link externo e o rótulo passa a ser "abrir onde nasce". Sem `url`, segue inerte de propósito —
melhor um card quieto que um clique morto. O `_PAINEL.md` do email marketing recebeu a URL do
editor do Supabase.

### O que ficou pendente

**Login em dispositivo novo cai no VisionFlow.** O código do app está certo: ele manda
`redirectTo` com o próprio endereço e a barra final. O que falha é a allowlist de *Redirect URLs*
do projeto Supabase `ghwjetvazmdlaqidgxqi` — quando o destino não casa, o Supabase descarta em
silêncio e joga na Site URL do projeto, que é a do VisionFlow. Falta saber **de qual endereço** o
Felipe entrou para acrescentar exatamente aquele padrão. A escrita dessa configuração é PATCH na
Management API, bloqueada pelo classificador: o clique final é dele, no painel.

**Dois arquivos-lixo na raiz do repo do app** (`25).slice(0` e `r.text())`), sobra de um `node -e`
com caminho do Windows. Não apagados — aguardando OK.

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
| 2026-08-28 | Registro da sessão 2: painel que se explica | Felipe abriu o painel do blog e não entendeu a própria tela |
| 2026-08-28 | Sessão 3: métrica com procedência, base 28 → 24 ativos, segredos em variáveis de ambiente | O painel dizia "28 contatos" havia um mês, número copiado de snapshot velho |
| 2026-09-01 | Sessão 4: rolagem, boundary de erro, três faixas de navegação, métrica com destino | Primeira rodada vinda do uso real no celular |
