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

## Prompt para retomar em outra sessão

```
Continuar o trabalho de i18n do site Real Vision (real-vision-site). Ativar a skill rv-i18n
para ver o estado completo do progresso.

A estrutura de dados do blog já está pronta (LocalizedText + localizeText/localizeBlocks em
src/data/blog-posts.ts) e os posts id 20, 19, 18, 17, 16, 14, 10, 11, 12, 13, 1, 2 já estão 100%
traduzidos.

Falta traduzir os outros 7 posts em src/data/blog-posts.ts para EN e DE — título, resumo,
todos os contentBlocks. Usar a skill rv-copy pra manter tom de marca, não tradução literal.
Seguir exatamente o padrão já usado nos posts anteriores (contentBlocks: { pt: [...], en: [...],
de: [...] } satisfies ContentBlock[]). Fazer em lotes pequenos (2-3 posts) pra revisão, sempre
rodando npx tsc --noEmit + build + preview PT/EN/DE antes de fechar cada lote.

Atenção: os ids não são sequenciais no arquivo — usar grep -n 'id: "N"' src/data/blog-posts.ts
pra achar a posição real de cada post. Próximo da fila: id 3, depois 8, 9 e os demais.
```
