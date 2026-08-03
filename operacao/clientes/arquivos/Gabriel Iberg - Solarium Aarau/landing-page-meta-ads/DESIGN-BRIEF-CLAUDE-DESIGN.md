# Design Brief — Handoff para Claude Design (LP `/willkommen` v2)

> Para: exploração de 2-3 direções visuais no Claude Design.
> Conteúdo aprovado: [[BLUEPRINT-LP-WILLKOMMEN]] · Reviews: [[REVIEWS-GOOGLE-5ESTRELAS]]
> Depois de escolhida uma direção: handoff de volta ao Claude Code via `/design-sync`.

---

## O que é

Landing page para tráfego frio de Meta Ads do **Solarium Aarau** (estúdio de bronzeamento
self-service, Aarau, Suíça). Objetivo único: converter visita online em **primeira visita física**
ao estúdio. Não é o site institucional (que já existe e continua no ar). Rota final:
`aarau-solarium.ch/willkommen`.

**Importante:** este NÃO é um redesign do layout atual. É uma versão nova, mais moderna e premium,
usando a mesma identidade de marca.

---

## Identidade a preservar (não inventar do zero)

- **Cor primária:** laranja quente `hsl(24 92% 53%)` (~#F26B21). É a cor da marca, sempre presente
  como destaque/CTA.
- **Tipografia:** Space Grotesk (títulos) + Inter (corpo). Já usadas no site do cliente.
- **Logo:** `solarium-logo.webp` (disponível).
- Tom visual: solário suíço premium, não genérico/plástico. Sensação de sol, calor, bem-estar.

## Liberdade criativa (o que pode/deve mudar)

- Layout, composição, hierarquia visual: **livre**. Não copiar a v1 (template shadcn genérico que
  já foi reprovado).
- Considerar um **hero dark/dramático** (o projeto já tem um tema navy `hsl(220 15% 8%)` pronto e
  sem uso) com o laranja em destaque, para dar contraste premium, versus uma versão 100% clara.
  Vale explorar as duas.
- Estética sugerida: **"golden hour"** — gradientes de pôr-do-sol, luz quente, glassmorphism sutil.
- Micro-animações de entrada em scroll (reveals), hover suave nos cards.

## Conteúdo (usar exatamente o do blueprint aprovado)

11 seções, nesta ordem — copy completa em [[BLUEPRINT-LP-WILLKOMMEN]]:
1. Hero ("Perfect tan today. No appointment. Just walk in.")
2. Trust bar (4.8★ · aberto 06–24 · sem dinheiro)
3. The problem (dor: inverno, fricção, receio da primeira vez)
4. Benefits + Collarium (UV+red light, +50% pigmentação, Vitamina D)
5. How it works — 3 passos **cashless** (escolher cabine → pagar no cartão/TWINT → entrar)
6. Clean & cared for (limpeza + equipe presente, argumento de confiança)
7. Testimonials — 8 reviews reais do Google (foto + nome + 5 estrelas, sem profissão)
8. Tour 360° preview
9. FAQ (5 perguntas, adaptadas ao cashless)
10. Bonus (menção secundária, uma linha)
11. CTA final + mapa

## Assets disponíveis (reutilizar, não gerar do zero)

`operacao/projetos/solariumaarau/src/assets/`: `hero-collarium.webp`, `tour-preview.webp`,
`solarium-logo.webp`, fotos de estúdio (`studio/foto-01..09.webp`), ícones de pagamento
(`credit-card.webp`, `twint.webp`).

## Fora do escopo desta etapa

Nenhum deploy. Nenhuma versão alemã ainda (fica para depois, revisão da Romana). Sem Meta
Pixel/GA4 nesta rodada de design.

---

## Próximo passo

Felipe abre o Claude Design e explora **2-3 direções visuais** com este brief. Direção escolhida →
handoff para o Claude Code (`/design-sync`) para implementação em `src/pages/Willkommen.tsx`.
