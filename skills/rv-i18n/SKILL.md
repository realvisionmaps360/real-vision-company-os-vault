---
name: rv-i18n
description: Internacionalização (PT/EN/DE) do site real-vision-site — estado do progresso, arquitetura, e o que falta traduzir. Use quando Felipe disser "continua o i18n do site", "traduz o blog", "traduzir para inglês/alemão" no contexto do site da Real Vision, ou mencionar o seletor de idiomas.
---

# RV i18n — Internacionalização do Site Real Vision

Projeto: `real-vision-site` (repo `real-vision-core`), pasta local
`operacao/projetos/_RV-Internos/real-vision-site`.

Stack: React + Vite + react-i18next. Idiomas: PT (padrão, sem prefixo), EN (`/en/...`), DE (`/de/...`).
Arquivos de tradução: `src/locales/pt|en|de/translation.json` — sempre mantidos com as mesmas chaves
(estrutura espelhada nos 3 arquivos).

Padrão de código estabelecido (seguir sempre):
```tsx
import { useTranslation, Trans } from "react-i18next";
const { t } = useTranslation();
// texto simples:
{t("namespace.key")}
// texto com <strong>/<span> embutido:
<Trans i18nKey="namespace.key" components={{ bold: <strong /> }} />
// no JSON: "key": "texto com <bold>destaque</bold> no meio"
```

## Estado em 25/07/2026 (3ª sessão — bug do seletor de idioma + i18n 100% do blog)

**Gatilho da sessão:** Felipe reportou dois problemas ao navegar o site em EN/DE — (1) clicar no
seletor de idioma em qualquer página (blog, post) sempre voltava pra home do idioma escolhido, em
vez de manter a página atual; (2) vários posts do blog ainda apareciam em português mesmo com EN/DE
selecionado (citou como exemplo `fotografia-360-era-dslr-acabou-2026` e
`drones-em-2026-alem-da-fotografia`).

### 1. Bug do seletor de idioma — corrigido

Causa raiz: `HomeNav.tsx` tinha um array `LANGS` com paths fixos (`/`, `/en`, `/de`) e `switchLang()`
simplesmente navegava pra esse path fixo, ignorando a rota atual. O projeto já tinha a peça certa
pronta (`localizedHref` em `i18n-routes.ts`) mas ela não era usada no switcher.

Fix: nova função `switchLanguagePath(currentPathname, targetLang)` em `src/lib/i18n-routes.ts` —
detecta o idioma atual pelo prefixo do path, extrai o path canônico em PT (tratando rotas com slug
dinâmico como `/blog/:slug` e `/portfolio/:slug`, que mantêm o mesmo slug em qualquer idioma), e
remonta o path de destino via `localizedHref` (ou o path puro se destino for PT). `HomeNav.tsx`
passou a usar `useLocation()` + essa função. Testado manualmente nos três sentidos (PT↔EN↔DE) em
rota simples e rota com slug — sempre mantém a página atual.

### 2. Tradução do blog — **22/22 posts agora 100% em PT/EN/DE**

Os **10 posts que faltavam** foram traduzidos (título, resumo, content, contentBlocks, seguindo
exatamente o padrão `LocalizedText`/`localizeBlocks` já estabelecido):
`bastidores-tour-360-universo-paralello-18` (id 3), `por-que-seu-negocio-precisa-site-profissional`
(id 4), `fotografia-360-era-dslr-acabou-2026` (id 5), `como-escolher-camera-360-producao-profissional`
(id 6), `street-view-linha-azul-pratigi` (id 7), `reflexoes-presenca-digital-negocios-locais` (id 8),
`drones-em-2026-alem-da-fotografia` (id 9), `anthropic-ia-chinesa-eua-baniram-proprios-modelos`
(id 21 — só faltava o metaTitle/metaDescription localizado, contentBlocks já estava completo),
`riscos-inteligencia-artificial-hack-openai-hugging-face` (id 22 — faltava o bloco `en` inteiro),
`trabalho-opcional-elon-musk-donos-robos` (id 23 — o mais longo, só existia em PT).

### 3. Gaps identificados na sessão anterior — todos fechados agora

- **`metaTitle`/`metaDescription`**: viraram `LocalizedText` no `BlogPost` interface (eram `string`).
  `BlogPost.tsx` agora chama `localizeText(post.metaTitle, i18n.language)` /
  `localizeText(post.metaDescription, i18n.language)` antes de setar `document.title`, meta tags
  OG/Twitter e o JSON-LD `description`. Sem isso, o título da aba e o preview de link (OG/WhatsApp)
  ficavam em PT mesmo em post traduzido — bug só percebido ao testar no navegador (título virava
  `[object Object]` até o fix, porque o campo passou a ser objeto sem o código saber ler).
- **`postCta`** (CTA no fim de cada post — label, title, texto dos botões): interface `PostCta`
  virou `LocalizedText` em `label`/`title`/`buttons[].text`. Novo helper `localizePostCta(cta, lang)`
  em `blog-posts.ts`. `BlogPost.tsx` usa via IIFE (`post.postCta && (() => {...})()`) pra resolver o
  CTA localizado antes de renderizar. Todos os **21 postCta** do arquivo foram traduzidos EN/DE.
- **UI hardcoded de `Blog.tsx`/`BlogPost.tsx`**: novo namespace `blogPage`/`blogPostPage` nos 3
  `translation.json` — busca, "limpar filtros", "nenhum artigo encontrado", "ler artigo completo",
  "voltar ao blog", "neste artigo", "post anterior/próximo", tempo de leitura (`{{time}} de leitura`
  / `{{time}} read` / `{{time}} Lesezeit`). Formato de data (`toLocaleDateString`) também passou a
  seguir o idioma ativo via mapa `DATE_LOCALES = { pt: "pt-BR", en: "en-US", de: "de-DE" }`.
- **`ShareButtons.tsx`/`PostLikeButton.tsx`**: componentes passaram a usar `useTranslation()` —
  namespace `shareButtons`/`postLikeButton`. Texto "Compartilhar:", aria-labels de cada rede,
  "copiar link"/"link copiado", aria-label de curtir/descurtir.
- **`BlogComments.tsx`**: namespace `blogComments` — placeholders, mensagens de erro, botão
  comentar/enviando, "carregando comentários", "seja o primeiro a comentar", tempo relativo
  (`relativeTime` refeita pra receber `t` e `lang` como parâmetro em vez de string fixa em PT — usa
  chaves i18next com plural automático `timeDays_one`/`timeDays_other`), aria-label de curtir
  comentário.
- **Categorias fixas do blog** (`Destinos 360°`, `Presença Digital`, `Tutoriais`, `Cases Reais`,
  `Bastidores`, `Reflexões`): novo `CATEGORY_LABELS` + `localizeCategory(category, lang)` em
  `blog-posts.ts` (fallback pro valor original se a categoria não estiver no mapa — cobre tags
  soltas tipo "Inteligência Artificial" que não são traduzidas, decisão consciente pra não expandir
  escopo pra taxonomia livre). Usado nos chips de filtro (`Blog.tsx`), badge de categoria
  (`Blog.tsx` + `BlogPost.tsx`) e tags no rodapé do post (`BlogPost.tsx`).

**Ainda não traduzido (fora do escopo desta sessão, não pedido):** sistema de comentários usa
Supabase — dados dos comentários em si (o texto que o usuário escreve) nunca são traduzidos, isso é
esperado. Nomes de tags livres além das 6 categorias fixas (ex: "Futuro do Trabalho", "Inteligência
Artificial") continuam só em PT.

**Verificação:** cada etapa rodou `npx tsc --noEmit -p .` + `npm run build` + teste manual real no
Browser pane (PT/EN/DE, rota simples e rota com slug, seletor de idioma nos 3 sentidos) antes de
fechar. 3 commits nesta sessão, todos pushados pro `origin/main`:
- `d4ba434` — fix do seletor de idioma + tradução dos 10 posts pendentes + metaTitle/metaDescription
- `8e49d39` — localização de postCta + UI de Blog/BlogPost + ShareButtons/PostLikeButton
- `b60eb6b` — localização de BlogComments + categorias

## Estado em 03/07/2026 (2ª sessão — ProjectDetail + links + 1º post do blog)

**Traduzido e testado nesta sessão (build + preview PT/EN/DE, sem erros de console):**
- `ProjectDetail.tsx` — namespace `projectDetail` criado nos 3 locales (labels de UI: Contexto,
  Desafio, Solução Aplicada, Galeria, HUB, etc). Conteúdo dos projetos em si (`context`/`challenge`/
  `solution` de `src/data/projects.ts`) continua só em PT — mesmo padrão do PortfolioGrid (só a
  interface traduz, o conteúdo dos projetos ainda não).
- Links do menu (`HomeNav.tsx`) e rodapé (`HomeFooter.tsx`) — criada `src/lib/i18n-routes.ts` com
  `localizedHref(ptPath, lang)`, que mapeia `/sobre → /en/about`, `/loja → /en/shop`, etc, e trata
  âncoras (`/#socio-digital → /en#socio-digital`). Felipe aprovou essa abordagem (função central em
  vez de duplicar hrefs por idioma nos NAV_ITEMS). CanonicalSync.tsx não foi tocado — usa `pathname`
  puro, sem conflito.
- Estrutura de dados do blog (`src/data/blog-posts.ts`): `title`/`summary`/`content` viraram
  `LocalizedText = string | { pt, en?, de? }`; `contentBlocks` virou `ContentBlock[] | { pt, en?, de? }`.
  Helpers exportados: `localizeText(field, lang)` e `localizeBlocks(post, lang)`. `Blog.tsx` e
  `BlogPost.tsx` atualizados para usar os helpers em todo lugar que lia `post.title/summary/content/
  contentBlocks` (busca, card, hero, h1, alt, JSON-LD headline, TOC, prev/next, ShareButtons).
  Posts sem tradução ainda funcionam normal (fallback pt automático via string simples).
- **Posts traduzidos 100%** (título, resumo, content e todos os contentBlocks em EN/DE, tom de marca
  preservado), 12 de 19 até agora: `diferenca-entre-llm-e-slm` (id 20), `bugonia-mentira-2000-anos-
  realidade-verificavel` (id 19), `site-maior-ativo-era-ia` (id 18), `crise-oportunidade-inteligencia-
  artificial` (id 17), `fim-das-tarefas-repetitivas-socio-digital-real-vision` (id 16),
  `como-pequenas-empresas-estao-substituindo-tarefas-por-socio-digital` (id 14),
  `era-da-ia-negocios-que-vao-sobreviver` (id 10), `nao-e-sobre-tecnologia-e-sobre-sobrevivencia`
  (id 11), `sua-mentalidade-e-seu-maior-ativo-proteja-seu-cerebro` (id 12),
  `do-maps-ao-fechamento-tour-virtual-google-site` (id 13),
  `solarium-aarau-primeiro-cliente-internacional` (id 1),
  `google-meu-negocio-guia-completo-negocios-locais` (id 2). Todos verificados com
  `npx tsc --noEmit` + `npm run build` + preview real em PT/EN/DE.

**NÃO traduzido ainda (pendente):**
1. Restam **7 posts** em `src/data/blog-posts.ts` para traduzir EN/DE (título, resumo, contentBlocks).
   Nota: os ids não são sequenciais no arquivo. Sempre usar `grep -n 'id: "N"'` pra achar a posição
   real. Próximo da fila: id 3 (`bastidores-tour-360-universo-paralello-18`, já visto de relance nesta
   sessão), seguido de 8, 9 e os demais. Usar a skill `rv-copy` pra manter tom, fazer em lotes
   pequenos (cada post tem ~15-30 contentBlocks), sempre rodando `npx tsc --noEmit` + build +
   preview PT/EN/DE antes de fechar o lote.
2. Interface do Blog.tsx/BlogPost.tsx (busca, filtros, botões, "Voltar ao Blog", "Neste artigo",
   "Post anterior/Próximo post", CTA inline) — ainda hardcoded em PT. Fora do escopo pedido até agora.
3. postCta (título/label/texto dos botões de CTA no fim de cada post) não foi localizado — fica só
   em PT mesmo quando o post está traduzido. Decisão consciente pra não inflar ainda mais o escopo;
   avaliar com Felipe se vale traduzir também.
4. `metaTitle`/`metaDescription` (campos usados no preview de link — Open Graph/WhatsApp/Facebook e
   `<title>`/meta description da aba) são strings únicas por post, sem versão EN/DE. Um post aberto
   em `/en/blog/...` ou `/de/blog/...` mostra o preview e o título da aba em português mesmo assim.
   Identificado em 16/07/2026 ao corrigir o bug da imagem de capa no preview (ver
   `scripts/generate-blog-og.mjs`, que gera o HTML de preview por post e por idioma, mas hoje
   replica o mesmo texto PT nos 3 arquivos porque a fonte também não é localizada). Corrigir exigiria
   virar `metaTitle`/`metaDescription` em `LocalizedText` (mesmo padrão de `title`/`summary`) e
   atualizar o script gerador pra usar o idioma certo por variante. Não é regressão do gerador — é
   o mesmo gap que já existia antes, só "congelado" em build agora.

## Links do menu/rodapé — arquitetura implementada

Resolvido nesta sessão. Ver `src/lib/i18n-routes.ts`. Se novas rotas forem adicionadas ao site
(`App.tsx` + `LangRoutes`), adicionar o mapeamento correspondente em `ROUTE_MAP` desse arquivo.

## Achado não relacionado a i18n — comentários do blog (Supabase)

A seção de comentários do post novo (`diferenca-entre-llm-e-slm`) ficou travada em "Carregando
comentários..." no ambiente de teste. Felipe confirmou em 03/07/2026, direto no painel do Supabase,
que é **problema interno do próprio Supabase** (eles já sabem e estão resolvendo) — não é bug do
código do site. Ver [[project_blog_comentarios_supabase_bug]]. Não investigar como bug de código
se o sintoma reaparecer — checar primeiro se é o mesmo incidente do lado deles.

## Status geral (25/07/2026): i18n do blog e do seletor de idioma concluídos

Todos os pontos abertos nas sessões anteriores (posts pendentes, metaTitle/metaDescription, postCta,
UI hardcoded, comentários, categorias, bug do seletor) foram resolvidos — ver seção "Estado em
25/07/2026" no topo deste arquivo. Não há prompt de retomada pendente para este escopo.

Se surgir trabalho novo de i18n (nova rota, novo post, novo componente com texto hardcoded), seguir
o mesmo padrão já estabelecido:
- Texto de UI → `useTranslation()` + chave em `src/locales/pt|en|de/translation.json`
- Conteúdo de dado (posts, cards) → `LocalizedText`/`localizeText`/`localizeBlocks` em `blog-posts.ts`
- Sempre `npx tsc --noEmit -p .` + `npm run build` + teste manual PT/EN/DE antes de considerar pronto
