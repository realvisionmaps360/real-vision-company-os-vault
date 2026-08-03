# Processo de Blog Post — Real Vision (v2, refinado)

> Documento **vivo**. Atualizar a cada post novo com o que for aprendido/ajustado — não é registro de uma sessão só, é o processo oficial que Claude Code e Hermes seguem igualmente.
> Criado em 24/07/2026, a partir da sessão que produziu [[2026-07-24-riscos-inteligencia-artificial-hack-openai-hugging-face]].

---

## Resumo de 30 segundos

Todo blog post da Real Vision sai **sempre em português primeiro**, passa por aprovação em camadas com o Felipe (ângulo → título → conteúdo → metadados → publicação), e só depois de publicado e revisado é que se cogita tradução EN/DE. O processo mistura três disciplinas: verificação de fato, pesquisa de palavra-chave real, e copywriting consultivo (Hormozi).

---

## O passo a passo completo

### 0. Se o tema vier de conteúdo externo (vídeo, notícia, boato) — verificar antes de tudo
Antes de aceitar qualquer alegação como fato, rodar WebSearch pra confirmar se aconteceu de verdade, quando, e com quais detalhes exatos. Boato viral (ex: vídeo sensacionalista) frequentemente distorce nomes, datas e mecanismo do que houve. Regra de ouro nº1 do Company OS (nunca inventar dado) vale também pra fontes externas — não é só sobre dados internos da RV.

### 1. Mapear skills relevantes
Carregar `rv-skill-scout` primeiro. Pra blog post, o combo padrão é sempre: `realvision` + `rv-blogpost` + `rv-intencao-busca` + `rv-copy`.

### 2. Alinhar o ângulo em conversa — antes de qualquer pesquisa
Discutir com o Felipe o ponto de vista, o que ele quer criticar/defender, se tem opinião pessoal que precisa entrar no texto. Isso muda a direção da pesquisa de palavra-chave depois — não adianta pesquisar termo antes de saber o que vai ser dito sobre o tema.

### 3. Fase 0 — Pesquisa de Intenção de Busca (`rv-intencao-busca`)
Rodar o script pra termos candidatos ao tema. **Descartar termos sem volume real de busca** (aparecem vazios no autocomplete) mesmo que pareçam bons gatilhos de clique — eles não geram tráfego orgânico, só servem como gancho de abertura, não como H2/título.

### 4. 5 opções de título
Sempre apresentar 5, com justificativa de cada (dor, autoridade, contraste, reframe, urgência). Felipe escolhe.

### 5. Rascunho dos `contentBlocks`
Escrever em Markdown, salvar em `operacao/projetos/_RV-Internos/documentacao/rascunhos/YYYY-MM-DD-slug.md`. Passa por quantas rodadas de ajuste o Felipe pedir — ver seção "Lições" abaixo pros tipos de ajuste mais comuns.

### 6. Confirmar o ID livre
`git pull origin main` no repo do site (`real-vision-site`), depois checar o maior `id` em `src/data/blog-posts.ts`. **Nunca assumir.** O vault não tem essa informação — ela só existe no repo do site.

### 7. Metadados finais
slug, category, tags, readTime, image, metaTitle (≤60 chars), metaDescription (≤160 chars, com dado concreto).

### 8. Imagem de capa
Felipe salva o arquivo em `TEMP/`. Copiar pra `src/assets/blog/<slug>.png`, importar no topo do `blog-posts.ts` (`import nomeVar from "@/assets/blog/arquivo.png"`), usar a variável — nunca string de caminho solta — no campo `image`.

### 9. Inserir no array
Novo post entra **no início** do array `blogPosts` (mais recente primeiro).

### 9.5. Fontes no final do post — sempre, sem exceção
Todo post que cita fato/dado/caso externo (notícia, relatório, incidente) termina com bloco `{ type: "heading3", text: "Fontes" }` (PT) / `"Quellen"` (DE) / `"Sources"` (EN) + `{ type: "list", items: [...] }` com um `<a href="URL">Nome do veículo</a>` por fonte, uma por linha do rascunho da seção "Fontes" em `documentacao/rascunhos/`. Conferir esse bloco existe no `contentBlocks` **antes** do passo 10 (build) — ficou de fora uma vez (post 22, 24-25/07/2026) e só foi notado depois de publicado.

### 10. Build
`npm run build` — zero erro antes de cogitar commit.

### 11. Commit seletivo
`git add` **só os arquivos do post** (`blog-posts.ts` + imagem nova). Nunca `git add -A` — a pasta do site pode acumular lixo solto (`.claude/`, `graphify-out/`, arquivos temporários) que não deve ir pro commit.

### 12. Push
`git commit` + `git push origin main`. Deploy automático via Vercel, no ar em 1-2 minutos.

### 13. Link pro Felipe conferir
Sempre mandar o link final: `https://realvisionmaps.com/blog/<slug>`.

### 14. Ciclo de ajuste pós-publicação
Correções (imagem, texto) seguem o mesmo padrão: editar → build → add seletivo → commit → push. Não é preciso repetir todo o processo, só as etapas 8-13.

### 15. Tradução — sempre depois, nunca junto
Post sai **sempre em PT primeiro**. EN/DE só entram depois que o post em PT já estiver publicado, revisado e aprovado. Não presumir que todo post sai multilíngue de cara — regra fixa, não uma pergunta caso a caso. Quando chegar a hora, usar `rv-i18n`.

---

## Lições da sessão de 24/07/2026 (primeira rodada)

- **Termos técnicos precisam de explicação isolada, com analogia.** "Sandbox" e "zero-day" não podem ficar emendados dentro de um parágrafo corrido ou item de lista — usar um bloco `highlight` separado, curto, com analogia simples (ex: sandbox = caixinha de areia do parquinho).
- **`two-col.label` é uma faixa vertical estreita.** Só cabe um termo curto (nome de marca/produto: "OpenAI", "GLM 5.2") — frase descritiva longa corta visualmente.
- **Negrito precisa ser usado com intenção**, nas frases/dados centrais de cada bloco — não só 1-2 vezes espalhadas no post inteiro.
- **Crítica a empresas/pessoas: ficar no fato concreto e verificável, nunca em julgamento de caráter.** Acusação de caráter (ex: chamar pessoa física de algo pejorativo) é risco de difamação e foge da voz consultora da RV — o mesmo ponto crítico pode ser feito com o fato objetivo ("colocaram infraestrutura de terceiro em risco pra um teste interno").
- **Heading não deve carregar qualificador defensivo** tipo "(sem exagero, sem viral de vídeo)" — se o texto já entrega isso, o heading fica só com o assunto direto.

## Lições da sessão de 24/07/2026 (segunda rodada — post 23)

- **O repo do site se chama `real-vision-core`**, não `real-vision-site`. O nome exato está em `contexto/EMPRESA.md` e no AGENTS.md — não assumir nome genérico.
- **Post grande (12+ min de leitura, 40+ ContentBlocks) funciona bem** sem estourar limites do TypeScript. Manter um summary forte pro card.
- **Post que não é sobre serviço RV:** âncora Real Vision vai no `postCta` e na conexão final, não no corpo do texto. Posts de reflexão não precisam forçar venda.
- **Import de imagem:** usar `import nomeVar from "@/assets/blog/arquivo.png"` e passar a variável no campo `image`. Nunca string de caminho.
- **Commit seletivo:** `git add src/data/blog-posts.ts src/assets/blog/<slug>.png` — só os 2 arquivos. `package-lock.json` não vai.
- **Conflito de skills duplicadas:** backup `real-vision.backup.1784253085` causa erro de ambiguidade no `skill_view`. Usar caminho categorizado (ex: `real-vision/core/rv-skill-scout`) em vez do nome simples.
- **Google Drive sem MCP:** funciona com `curl -sL -o output.png "https://drive.google.com/uc?export=download&id=..."`.

---

## Pendência aberta

- **Tradução EN/DE do post "Riscos da inteligência artificial: o hack real da OpenAI na Hugging Face"** — publicado em PT em 24/07/2026, aguardando revisão final do Felipe antes de traduzir. Ver [[2026-07-24-riscos-inteligencia-artificial-hack-openai-hugging-face]].
- **Tradução EN do post "Elon Musk diz que o trabalho será opcional. Mas quem será dono dos robôs?"** — publicado em PT em 24/07/2026, aguardando definição se vai traduzir.

---

## Conexões
|- [[BLOG-POSTS-PIPELINE]] — backlog de temas/posts planejados (fonte de status de publicação)
|- Skill `rv-blogpost` (SKILL.md na pasta `operacao/projetos/_RV-Internos/documentacao/`) — versão operacional do mesmo processo, usada pelo Claude Code
|- Skill `rv-intencao-busca` — Fase 0, pesquisa de palavra-chave real via Google Autocomplete
|- Skill `rv-copy` — princípios Hormozi aplicados ao texto (dor, especificidade, value equation)
|- [[2026-07-24-riscos-inteligencia-artificial-hack-openai-hugging-face]] — rascunho de referência, primeiro post a seguir esse processo v2
|- [[2026-07-24-trabalho-opcional-elon-musk-donos-robos]] — segundo post seguindo o processo v2
|> Skill desta pasta: `rv-blogpost` · `rv-intencao-busca` · `rv-copy`
