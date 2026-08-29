> ## ⚠️ Protótipo descontinuado — 29/08/2026
>
> Esta versão standalone **foi substituída** pela rota `/sitelp` dentro do site oficial
> (`real-vision-core`, `src/pages/SiteLP.tsx`, branch `claude/lp-sitelp`).
>
> **Por quê:** aqui o design system era *copiado* do site. Na rota, ele é *herdado* — a LP usa
> os mesmos `.btn-amber`, `.svc-card`, `.faq-item` e `.form-input` do `index.css`, os mesmos
> assets, e atualiza sozinha quando o site muda. O formulário também deixou de precisar de Edge
> Function própria: posta em `/api/contact`, a mesma função que a página de contato usa.
>
> **Nada aqui foi apagado** — a pasta fica como registro do estudo que produziu a conferência de
> tokens abaixo, que segue válida e virou a seção "Correções de 29/08/2026" do `contexto/DESIGN.md`.
>
> **Não deployar esta pasta.** Documentação viva da LP: `../../documentacao/LP-SITELP.md`.

---

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
├── src/style.css         tokens e componentes portados do real-vision-core
├── src/main.js           constantes de configuração + WhatsApp + formulário + analytics
├── public/                logos, favicon e imagem do hero, copiados do site oficial
├── .env.example          nomes das variáveis, sem valor
└── vercel.json           cleanUrls + headers de segurança
```

## Seções (na ordem)

| # | Seção | Papel na conversão |
|---|---|---|
| 1 | Hero | Promessa + CTA em 5 segundos |
| 2 | Barra de credibilidade | 17+ sites · 33+ tours · 12+ cidades · 9+ segmentos (números de produção) |
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

## Marca e imagens

Arquivos copiados do repo do site oficial (`real-vision-core`), não recriados:

| Arquivo em `public/` | Origem no `real-vision-core` |
|---|---|
| `logo-header.png` | `src/assets/logo-header.png` (nav, altura 36px, igual ao site) |
| `logo-footer.png` | `src/assets/logo-footer.png` (rodapé, altura 40px, igual ao site) |
| `mark.png` | `src/assets/mark.png` (símbolo isolado, reserva) |
| `favicon.ico` | `public/favicon.ico` |
| `hero-sites.webp` | `src/assets/photo-site-laptop.png`, a mesma imagem que o site usa no pilar Sites (`ServiceSites.tsx`), reamostrada para 1280px e convertida: **2032 KB → 55 KB** |

O `contexto/ativos/` continua com tudo marcado como "A adicionar". Vale corrigir aquele README:
os arquivos existem, só vivem no repo do site.

## Divergências entre `DESIGN.md` e o CSS real

Conferido em 29/08/2026 com o site rodando local e Playwright lendo os estilos computados.
**Onde divergiu, produção venceu.** O `contexto/DESIGN.md` está desatualizado nestes pontos:

| Token | `DESIGN.md` diz | Produção usa | Efeito |
|---|---|---|---|
| Fundo do body | `#0a0d14` | `#090b11` | `--background: 222 33% 5%` do `index.css` |
| Superfície alternada | `#161c2b` | `#0c1018` | `#161c2b` é só a base dos gradientes de card |
| Âmbar | `#F5A623` chapado | rampa `#E5C07B → #C58B2A → #9E6F1E` | o site **não usa âmbar chapado** em botão nenhum |
| Botão primário | não descrito | gradiente + glow + shine sweep no hover, texto **branco** | `.btn-amber` |
| Raio de borda | não descrito | 12px (14px no submit) | `--radius: 0.75rem` |
| Ritmo vertical | não descrito | 144 a 160px por seção | medido nas seções da home |
| Cards | `rgba(20,20,28,0.85)` chapado | `linear-gradient(180deg, rgba(22,28,43,.45), rgba(15,19,30,.55))` | `.svc-card` |
| Container | não descrito | `max-w-[1320px]`, padding 24px / 40px em lg | `CredibilityBar.tsx` |
| h1 / h2 | não descrito | Bebas 77.76px / 72px, line-height 1.0, tracking -0.01em / -0.025em | computado |

**Números da barra de credibilidade:** o `EMPRESA.md` diz "30+ projetos · 10+ cidades · 5+ segmentos".
O `CredibilityBar.tsx` em produção diz **17+ sites · 33+ tours · 12+ cidades · 9+ segmentos**.
A LP usa os de produção. Vale atualizar o `EMPRESA.md`.

### Componentes portados do `index.css` do site

`.btn-amber` (gradiente + shine), `.grid-bg` (grid mascarado do hero), `.live-dot` (dot pulsante do
eyebrow), `.svc-card` e `.svc-card-big` (cards), `.proj-card` (portfólio), `.check-dot` (lista de
inclusos), `.faq-item` (barra âmbar + ícone que rotaciona 45°), `.form-input` e `.form-submit`
(formulário), `.text-amber-grad` (texto em gradiente), `.img-treatment` (saturate .85 / contrast 1.05).

### Tipografia não pôde ser conferida visualmente

O Google Fonts está bloqueado pelo proxy de egress desta sessão, então **Bebas Neue não renderizou**
nos screenshots, nem na LP nem no site oficial rodando local. As duas caem no mesmo fallback, então a
comparação de layout continua válida, mas o peso e a largura reais das headings não foram vistos.
Conferir no primeiro deploy.

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
- [ ] Conferir se Bebas Neue renderiza (não deu pra ver nesta sessão, Google Fonts bloqueado)
- [ ] Preencher `VITE_POSTHOG_PROJECT_TOKEN` na Vercel
- [ ] Ligar `LEAD_ENDPOINT` e testar o formulário ponta a ponta
- [ ] Importar `form_submit` e `whatsapp_click` como conversão no Google Ads
- [ ] Rodar Lighthouse e conferir Core Web Vitals (a página promete LCP < 2,5s na copy)

## Relacionados

- Design system: `real-vision-core/src/index.css` e `tailwind.config.ts` (fonte real);
  `contexto/DESIGN.md` como resumo, com as ressalvas da tabela acima
- Voz e copy: `contexto/VOZ.md`, `skills/rv-copy/SKILL.md`
- Fatos usados (portfólio, processo de 6 etapas, números): `contexto/EMPRESA.md`
- Padrão de landing com captura própria: [[landing-de-campanha-com-captura-propria]]
- Copy da LP institucional (pilares): `../../documentacao/LP-PRESENCA-DIGITAL-COPY-2026-07.md`
- Catálogo de repositórios: [[CONTROLE-REPOSITORIOS]]
