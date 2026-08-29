[[operacao/projetos/README|← Projetos]]

# LP `/sitelp` — Sites Profissionais

> Landing page de venda do pilar **Sites Profissionais**, dentro do site oficial.
> Rota: `realvisionmaps.com/sitelp` · Código: `real-vision-core/src/pages/SiteLP.tsx`
> Criada em 29/08/2026 · Branch `claude/lp-sitelp` · **Ainda não mergeada em `main`**

---

## Pra que serve

Dois usos, os dois pedidos pelo Felipe:

1. **Link no rodapé dos sites de cliente** — "Site desenvolvido por Real Vision" aponta pra cá em
   vez de pra home. Quem clica já está vendo um site nosso e quer saber sobre sites, não sobre tour
   360°.
2. **Destino de tráfego pago** (Google Ads), onde a página precisa converter o clique sozinha.

Não substitui `/servicos`. Aquela é o catálogo dos cinco pilares; esta é conversão de um pilar só.

## Por que é rota do site, e não projeto separado

A primeira versão foi construída standalone, em
`operacao/projetos/_RV-Internos/sites/lp-sites/` (mantida como registro, marcada como
descontinuada). O problema: ali o design system era **copiado** do site, e cópia desatualiza.

Como rota, a LP **herda**:

- Os componentes de `src/index.css`: `.btn-amber`, `.grid-bg`, `.live-dot`, `.svc-card`,
  `.svc-card-big`, `.proj-card`, `.check-dot`, `.faq-item`, `.form-input`, `.form-submit`,
  `.text-amber-grad`, `.img-treatment`
- Os assets reais (`logo-header.png`, `photo-site-laptop.png`)
- O `HomeFooter`, com os links legais que o Google Ads exige
- O `CanonicalSync` e o `ConsentBanner` globais
- `/api/contact`, a função serverless que a página de contato já usa

Quando o site mudar de cara, a LP muda junto. Sem manutenção paralela.

## Estrutura da página

| # | Seção | Papel |
|---|---|---|
| 1 | Hero | Promessa + CTA em 5 segundos, imagem do pilar Sites à direita |
| 2 | Barra de credibilidade | 17+ sites · 33+ tours · 12+ cidades · 9+ segmentos |
| 3 | O problema real | Dor em momento concreto (pesquisa no celular à noite) |
| 4 | O que está incluso | Value equation: a base que sai em todo projeto |
| 5 | Formatos | Cartão Digital → Landing Page → Site Institucional → Loja Virtual |
| 6 | Processo em 6 etapas | Reduz risco percebido |
| 7 | Diferencial | GEO, sistema integrado, sem vendor lock-in |
| 8 | Projetos reais | Prova, 6 projetos do `EMPRESA.md` |
| 9 | FAQ | 6 objeções de quem veio de anúncio |
| 10 | CTA + formulário | Diagnóstico gratuito de 30 min |

CTA fixo de WhatsApp no rodapé da tela no celular.

## Formulário

Posta em `/api/contact` (Resend), com `origem: "LP /sitelp"` e `servicos: ["Site profissional"]`.
A resposta cai no email de sempre, com `reply_to` apontando pro lead. Honeypot `botcheck` no HTML.

**Não precisa de Edge Function nem de liberar CORS por domínio** — é mesma origem. Foi o principal
ganho de virar rota: a versão standalone tinha essa pendência aberta.

## SEO

Segue o padrão do `Services.tsx`: aplica no mount, restaura no unmount.

- `<title>`: "Sites Profissionais que trazem cliente | Real Vision 360"
- `description` e tags `og:` próprias
- JSON-LD de `Service` (com os quatro formatos em `serviceType`) e de `FAQPage` (as 6 perguntas)
- Canonical: coberto pelo `CanonicalSync` global
- Sitemap: entra como **entrada PT-only**. O `urlBlock` do gerador emite as três variantes de
  idioma, e `/en/sitelp` e `/de/sitelp` cairiam no `NotFound` — por isso existe agora um
  `PT_ONLY_PAGES` em `scripts/generate-sitemap.mjs`

## Conteúdo — de onde veio cada dado

Nada foi inventado (Regra de Ouro 1).

| Dado | Fonte |
|---|---|
| 17+ / 33+ / 12+ / 9+ | `CredibilityBar.tsx` do próprio site |
| Processo de 6 etapas | `contexto/EMPRESA.md` |
| 6 projetos do portfólio | `contexto/EMPRESA.md` |
| Quatro formatos de site | `project_catalogo_servicos` (hierarquia Cartão → LP → Site → Loja) |
| Tom e vocabulário | `contexto/VOZ.md` + `skills/rv-copy` |
| WhatsApp `5511912931924` | `ServiceSites.tsx` do site |

**Depoimentos:** nenhum. O `COPY-HOME.md` registra que os do site são placeholders em coleta.
Não entram aqui até existirem de verdade, com autorização.

## Preço — pendência aberta

**Não existe preço na página, de propósito.** O vault tem três valores conflitantes para site,
de documentos com datas diferentes: R$ 800 (LP), R$ 1.500 e R$ 3.500 (`COPY-HOME.md`, jul/2026).

A FAQ 1 responde "quanto custa" pelo escopo, não pelo número.

Pra tráfego pago, âncora de preço costuma ajudar bastante na qualificação do lead. **Quando o
Felipe definir a faixa oficial**, ela entra na FAQ 1 e pode virar um bloco no hero.

## Bugs pegos na conferência visual

Os dois só apareceram porque a página foi aberta no Playwright, não por leitura de código:

1. **`.btn-amber` declara `position: relative`** e vence a classe `.fixed` do Tailwind. O CTA fixo
   do celular ignorava o `inset-x-4` e vazava 16px pra direita, criando scroll horizontal. Corrigido
   com `position: fixed` inline. Vale pra qualquer elemento fixo que use `.btn-amber`.
2. **`fetchPriority` em camelCase** dispara warning no React 18. Vai em minúsculo.

## Antes de publicar

- [ ] Merge de `claude/lp-sitelp` em `main`
- [ ] Conferir a página em produção no celular real
- [ ] Criar imagem `og:image` própria (hoje herda a do site)
- [ ] Trocar o rodapé dos sites de cliente pra apontar pra `/sitelp`
- [ ] Importar conversão no Google Ads (envio do formulário + clique no WhatsApp)
- [ ] Rodar Lighthouse — a copy promete LCP abaixo de 2,5s
- [ ] Definir se entra faixa de preço

## Relacionados

- Design system conferido: `contexto/DESIGN.md`, seção "Correções de 29/08/2026"
- Voz e copy: `contexto/VOZ.md`, `skills/rv-copy/SKILL.md`
- Dados de empresa e portfólio: `contexto/EMPRESA.md`
- Protótipo standalone que originou isto: `../sites/lp-sites/README.md`
- LP institucional dos cinco pilares: [[LP-PRESENCA-DIGITAL-COPY-2026-07]]
- Catálogo de repositórios: [[CONTROLE-REPOSITORIOS]]
