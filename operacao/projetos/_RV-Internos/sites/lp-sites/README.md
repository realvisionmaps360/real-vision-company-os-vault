# LP Sites — Real Vision 360

Landing page de venda do pilar **Sites Profissionais**. Dois usos previstos:

1. **Link no rodapé dos sites de cliente** ("Site desenvolvido por Real Vision")
2. **Destino de tráfego pago** (Google Ads), onde a página precisa converter o clique sozinha

Não substitui `realvisionmaps.com/servicos`. É página de conversão de um pilar só, sem menu de
navegação, sem blog, sem saída lateral. Todo caminho leva ao diagnóstico gratuito.

## Estrutura

```
lp-sites/
├── index.html            conteúdo e estrutura da página
├── src/style.css         design system Real Vision (contexto/DESIGN.md)
├── src/main.js           constantes de configuração + WhatsApp + formulário + analytics
├── public/favicon.svg    ícone provisório (ver "Marca" abaixo)
├── .env.example          nomes das variáveis, sem valor
└── vercel.json           cleanUrls + headers de segurança
```

## Seções (na ordem)

| # | Seção | Papel na conversão |
|---|---|---|
| 1 | Hero | Promessa + CTA em 5 segundos |
| 2 | Barra de credibilidade | 30+ projetos · 10+ cidades · 5+ segmentos · Brasil e Suíça |
| 3 | O problema real | A dor em momento concreto (pesquisa no celular à noite) |
| 4 | O que está incluso | Value equation: o que sempre vem no pacote |
| 5 | Formatos | Cartão Digital → Landing Page → Site Institucional → Loja Virtual |
| 6 | Processo em 6 etapas | Reduz risco percebido (EMPRESA.md, processo oficial de site) |
| 7 | Diferencial | GEO, sistema integrado, sem vendor lock-in |
| 8 | Projetos reais | Prova (nomes reais de EMPRESA.md) |
| 9 | FAQ | Objeções de quem veio de anúncio |
| 10 | CTA + formulário | Diagnóstico gratuito de 30 min |

## Constantes de configuração (`src/main.js`)

Tudo que muda vive no topo do arquivo. Mesmo padrão de degradação da landing de
Unterentfelden: **constante vazia nunca vira link morto**.

| Constante | Hoje | Comportamento se vazia |
|---|---|---|
| `WHATSAPP_NUMERO` | `5511912931924` | Todos os botões de WhatsApp são removidos do DOM |
| `LEAD_ENDPOINT` | `""` | O formulário monta uma mensagem de WhatsApp com os dados preenchidos, em vez de falhar em silêncio |
| `LEAD_TAG` | `lp-sites` | Tag gravada junto com o lead |

### Ligar o formulário na Edge Function

Enquanto `LEAD_ENDPOINT` estiver vazio, o formulário funciona pelo WhatsApp. Para gravar o lead na
base própria, preencher a constante com a URL da Edge Function de captura no Supabase e liberar o
CORS pro domínio desta página.

**Atenção que morde:** o CORS fica travado por domínio na função. Trocar o domínio da página sem
atualizar a lista de origens quebra o formulário **em silêncio** (o usuário preenche e nada
acontece). Mesma pegadinha registrada em [[landing-de-campanha-com-captura-propria]].

Campos enviados: `nome`, `negocio`, `email`, `whatsapp`, `tem_site`, `mensagem`,
`consentimento` (bool), `tag`, `botcheck` (honeypot).

O opt-in de email é **separado** do envio do formulário. Quem pede diagnóstico sem marcar o
checkbox não entra na base de email marketing. Mesmo desacoplamento validado em Unterentfelden.

## Analytics — PostHog cookieless

Roda em `persistence: "memory"`: nenhum cookie, nenhum localStorage, por isso a página não tem
banner de consentimento. Sem token, o PostHog **não inicializa e a página funciona igual**.

```
VITE_POSTHOG_PROJECT_TOKEN=
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

Eventos: `$pageview`, `whatsapp_click` (com `origem`: nav/hero/form/sticky), `form_submit`,
`newsletter_optin`, `faq_open`.

## Marca

O `contexto/ativos/` ainda está com todos os arquivos de logo marcados como "A adicionar", então a
página usa um **wordmark em texto** (Bebas Neue + âmbar) e um favicon SVG provisório, dentro do
design system. Nenhum arquivo de marca foi inventado.

Quando os PNGs oficiais existirem, é troca de uma linha em cada ponto:

```html
<!-- nav -->
<img src="/logo-header.png" alt="Real Vision 360" width="150" height="34" />
<!-- rodapé -->
<img class="foot__logo" src="/logo-footer.png" alt="Real Vision 360" width="132" height="30" />
```

Arquivos vão em `public/`.

## Preço

**Não existe preço nesta página, de propósito.** O vault tem valores conflitantes para site
(R$ 800 / R$ 1.500 / R$ 3.500 em documentos de datas diferentes), então nada foi hardcoded. A FAQ
responde "quanto custa" pelo escopo, não pelo número.

Se o Felipe definir a faixa oficial, ela entra na FAQ 1 e vira um bloco de âncora de preço no hero.

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy (Vercel)

```bash
npm run build
npx vercel --prod
```

Projeto ainda **não criado** na Vercel. Domínio sugerido: `sites.realvisionmaps.com` (as tags
`canonical` e `og:url` no `index.html` já apontam pra lá; se o domínio mudar, atualizar as duas).

## Antes de mandar tráfego pago pra cá

- [ ] Definir domínio e apontar na Vercel
- [ ] Atualizar `canonical` e `og:url` se o domínio for outro
- [ ] Criar a imagem `og-sites.jpg` e colocar em `public/`
- [ ] Preencher `VITE_POSTHOG_PROJECT_TOKEN` na Vercel
- [ ] Ligar `LEAD_ENDPOINT` e testar o formulário ponta a ponta
- [ ] Importar `form_submit` e `whatsapp_click` como conversão no Google Ads
- [ ] Rodar Lighthouse e conferir Core Web Vitals (a página promete LCP < 2,5s na copy)

## Relacionados

- Design system: `contexto/DESIGN.md`
- Voz e copy: `contexto/VOZ.md`, `skills/rv-copy/SKILL.md`
- Fatos usados (portfólio, processo de 6 etapas, números): `contexto/EMPRESA.md`
- Padrão de landing com captura própria: [[landing-de-campanha-com-captura-propria]]
- Copy da LP institucional (pilares): `../../documentacao/LP-PRESENCA-DIGITAL-COPY-2026-07.md`
- Catálogo de repositórios: [[CONTROLE-REPOSITORIOS]]
