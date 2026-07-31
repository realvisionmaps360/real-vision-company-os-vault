# PRD — Landing Page Lavanderia Magnólia

**Cliente:** Hallan Costa · Lavanderia Magnólia — São Bernardo do Campo/SP (bairro Orquídeas)
**Modelo:** permuta (landing page ⇄ 1.000 cartões de visita Real Vision)
**Referência:** https://lavobrasil.com.br/ilhabelasul/ — usada como referência de *estrutura*, não de layout
**Data:** 20/07/2026 · v1
Ficha: [[FICHA-CLIENTE]] · Dossiê: [[PROJETO]]

---

## 1. Objetivo

Página única que converte busca local ("lavanderia perto de mim", Google Maps, Instagram bio) em **visita física à loja**.

Não é institucional. Não é catálogo. É um cartão de visita digital com uma pergunta respondida: *"vale a pena eu ir até lá?"*

**Métrica de sucesso:** cliques no botão "Como chegar" / abertura do Maps.

## 2. Público

Morador do bairro Orquídeas e adjacências, 25–55 anos, provavelmente no celular, provavelmente com uma pilha de roupa em casa agora. Nunca usou lavanderia self-service ou usou pouco — **tem dúvida de como funciona**. Por isso o FAQ não é enfeite, é conversão.

**Mobile-first não é opção, é o cenário principal.** ~85% do tráfego virá de celular.

## 3. Decisões fechadas

| Item | Decisão |
|---|---|
| Stack | **Vite + React + Tailwind v4**, deploy Vercel. *(Corrigido em 20/07/2026 — o PRD original previa Next.js, mas todo o resto do portfólio de clientes RV usa Vite, sem nenhum projeto Next.js no repositório; página única/estática não se beneficia de SSR.)* |
| CTA primário | **Google Maps** — "Como chegar" |
| CTA secundário | **WhatsApp** — botão flutuante fixo, canto inferior direito |
| Tom | Limpo, direto, acolhedor de bairro. Sem corporativês |
| Escopo | Landing única, sem domínio e sem hospedagem inclusos (Real Vision conecta o domínio sem custo quando o Hallan comprar) |

## 4. Paleta de cores

Extraída pixel a pixel de `magnolia lavanderia logo.jpeg`:

| Token | Hex | Uso |
|---|---|---|
| `--magnolia-teal` | **#2BAAB1** | Cor da marca. Títulos de seção, ícones, detalhes, hero |
| `--magnolia-teal-dark` | **#1E7C81** | Hover de botões, texto teal sobre fundo claro (contraste AA) |
| `--magnolia-teal-soft` | **#E8F6F7** | Fundos de seção alternados, cards, chips |
| `--ink` | **#111111** | Texto principal (o preto do contorno do logo) |
| `--ink-muted` | **#5A5F60** | Texto de apoio, legendas |
| `--paper` | **#F7F7F7** | Fundo geral da página |
| `--white` | **#FFFFFF** | Cards, superfícies elevadas |
| `--accent-coral` | **#FF6B4A** | **Cor de apoio.** Exclusiva dos CTAs |
| `--accent-coral-dark` | **#E2512F** | Hover do CTA |

**Regra da cor de apoio:** o coral aparece **só em botão de ação**. Nada mais na página usa coral. Isso faz o olho aprender em 2 segundos que laranja = clicável, e o CTA salta do teal em vez de se perder nele. Se o coral vazar pra títulos ou ícones, a regra morre e o CTA perde força.

**Tipografia:** `Inter` (corpo) + `Bricolage Grotesque` ou similar geométrica encorpada nos títulos, pra dialogar com o lettering arredondado do logo. Via `next/font`, sem request externo.

## 5. Arquitetura da página

Ordem pensada como funil, não como menu.

### 5.1 Header
Fixo, fino, fundo branco com leve blur no scroll. Logo à esquerda. À direita: link "Como chegar" (âncora). Sem menu hambúrguer — a página é curta, ancoragem basta.

### 5.2 Hero
- Logo Magnólia grande, centralizado, sobre fundo `--paper`
- H1: **"Sua roupa lavada e seca em 1 hora."**
- Subtítulo: lavanderia self-service no bairro Orquídeas, São Bernardo do Campo
- Chips de reforço: `Aberto todos os dias` · `Lava e seca em 1h` · `Sabão e amaciante inclusos`
- **CTA coral: "Como chegar"** → Maps
- Sem foto no MVP. Fundo com um gradiente teal-soft muito sutil + formas orgânicas inspiradas nas pétalas do logo (SVG inline, leve)

> ⚠️ Todo o texto do hero é **placeholder** até o Hallan confirmar horário e diferenciais reais.

### 5.3 O que você encontra
Grid de 6 cards com ícone + título curto. Ícones em `--magnolia-teal`.
Placeholder: Máquinas modernas · Sabão e amaciante inclusos · Pagamento por PIX e cartão · Ambiente climatizado · Wi-Fi grátis · Estacionamento

### 5.4 Como funciona
Três passos numerados, horizontal no desktop, empilhado no mobile.
`1. Meça no cesto` → `2. Escolha a máquina e pague` → `3. Volte em 1 hora`

Essa seção existe porque o maior atrito do público não é preço, é **não saber como usar**.

### 5.5 Preços
Tabela simples, fundo `--white`, sem cores berrantes.
Colunas: Serviço · Tempo · Valor.
Placeholder: Lavagem (35 min) · Secagem (45 min) · Lavagem + Secagem (combo).
Nota de rodapé: "Sabão e amaciante já inclusos no valor da lavagem."

> ⚠️ **Valores 100% placeholder.** Não publicar sem confirmação do Hallan.

### 5.6 Horário de funcionamento
Bloco teal cheio (único momento de teal sólido em grande área), tipografia grande.
Placeholder: `Segunda a domingo · 7h às 22h`

### 5.7 Como chegar
- Mapa do Google embedado (`iframe`, `loading="lazy"` — não pode custar LCP)
- Endereço completo em texto selecionável
- **CTA coral: "Abrir no Google Maps"**
- Referência de localização em linguagem de bairro ("em frente ao...")

### 5.8 Depoimentos
Carrossel simples de 3 cards com nome, 5 estrelas e texto.
Estrutura pronta, **conteúdo vazio até termos avaliações reais do Google**. Se o Hallan não tiver avaliações, a seção não entra no ar — depoimento inventado destrói confiança em negócio de bairro.

### 5.9 FAQ
Accordion, ~8 perguntas. Conteúdo base adaptado da referência Lavô (perguntas de lavanderia self-service são universais), **revisado pelo Hallan** porque as regras da loja dele podem diferir.

Perguntas: quanto tempo demora · capacidade por máquina · como funciona o autoatendimento · formas de pagamento · preciso levar sabão · lava tênis/tapete/travesseiro · e se a máquina der problema.

### 5.10 Rodapé
Logo · endereço · telefone · CNPJ · links Instagram e WhatsApp · "Criado e desenvolvido por Real Vision 2026".

### 5.11 Botão flutuante WhatsApp
Fixo, canto inferior direito, verde WhatsApp (exceção justificada à paleta — é convenção reconhecida). Link com mensagem pré-preenchida:
`Olá! Vi o site da Lavanderia Magnólia e gostaria de mais informações.`

## 6. Requisitos técnicos

- **Next.js App Router**, componente único de página com seções em componentes separados
- **Tailwind** com os tokens da paleta em `tailwind.config`
- Todas as imagens via `next/image`
- Metadados: `title`, `description`, `og:image`, `canonical`
- **JSON-LD `LocalBusiness`** — crítico pra SEO local. Nome, endereço, geo, horário, telefone, `priceRange`
- `sitemap.xml` + `robots.txt`
- Alvo Lighthouse: **90+ em todas as categorias**, mobile
- Acessibilidade: contraste AA, `alt` em tudo, navegação por teclado no accordion e no carrossel
- Sem analytics no MVP (adicionar GA4 ou Umami depois, se o Hallan quiser)

## 7. Estratégia de placeholder

Tudo que depende do Hallan entra com conteúdo genérico e marcação clara, pra não travar o MVP:

- Textos pendentes ficam em `content/magnolia.ts` — **um único arquivo**, todo o conteúdo editável num lugar só. Trocar dado real depois é edição de 5 minutos, não caça ao tesouro pelo código
- Imagens ausentes: blocos de cor teal-soft com o ícone da flor do logo, não caixas cinzas quebradas
- Nenhum dado inventado que pareça real vai ao ar (preço, avaliação, CNPJ). Placeholder tem que parecer placeholder pro Hallan

## 8. Fora de escopo (v1)

Domínio · hospedagem paga · blog · agendamento online · área de cliente · e-commerce · múltiplos idiomas · integração com sistema de máquinas.

## 9. Riscos

| Risco | Mitigação |
|---|---|
| Hallan demora a mandar dados/fotos | MVP sobe com placeholder e link de preview; ele vê e reage — pedir feedback sobre algo pronto é mais rápido que pedir briefing no vazio |
| Sem avaliações no Google | Seção de depoimentos não entra. Sugerir a ele pedir avaliações aos clientes antes do lançamento |
| Ele quer redesenhar tudo (é designer) | Alinhar antes: ele manda arte, a gente implementa. Evita retrabalho e conflito criativo |
| Domínio nunca comprado | Entregar em subdomínio Vercel funcional, para o site existir enquanto isso |

## 10. Próximos passos

1. ~~Enviar mensagem de briefing ao Hallan~~ ✅
2. ~~Codar o MVP~~ ✅ — feito com dados 100% reais (Hallan respondeu tudo antes do código começar, sem necessidade de placeholder)
3. Deploy em preview na Vercel, mandar o link pra ele
4. Conectar domínio quando ele comprar

**Atualização 20/07/2026:** todas as pendências de conteúdo (CNPJ, preços, pagamento, WhatsApp, funcionamento, regras da loja, headline, fotos) foram resolvidas antes do MVP — não houve necessidade de subir com placeholder de conteúdo. Depoimentos usam o texto real das 5 avaliações do Google (puxadas via MCP, com place_id confirmado). Falta apenas: revisão visual do Felipe e deploy de preview.
