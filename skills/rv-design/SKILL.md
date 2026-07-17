---
name: rv-design
description: "Padrões de UI/UX específicos para projetos Real Vision 360: pousadas, restaurantes, food trucks, operadoras de turismo e negócios locais em Bahia e mercado internacional. Ativar em sessões de código React, landing pages, sites de clientes. Complementa frontend-design e motion com contexto específico de turismo, hospitalidade e negócios locais."
---

# RV Design — UI/UX para Turismo e Negócios Locais

Guia compacto de design para os projetos da Real Vision 360. Cobre paletas, tipografia, layouts e padrões de conversão adequados para pousadas, restaurantes, food trucks, tour operators e negócios locais no Brasil e exterior.

---

## 1. Paletas de Cor por Segmento

### Turismo & Pousadas (Bahia, litoral)
- **Principal:** azul oceano profundo `hsl(210, 65%, 30%)` + areia quente `hsl(38, 45%, 88%)`
- **Acento:** verde tropical `hsl(155, 55%, 38%)` ou terracota `hsl(18, 70%, 52%)`
- **Fundo:** branco quente `hsl(45, 30%, 97%)` — nunca branco puro #fff
- **Texto:** grafite caramelo `hsl(30, 15%, 20%)`

### Gastronomia & Food Trucks
- **Principal:** tons terrosos quentes — mostarda `hsl(42, 80%, 45%)`, café `hsl(25, 60%, 30%)`
- **Acento:** vermelho tomate `hsl(5, 75%, 52%)` ou verde erva `hsl(130, 50%, 35%)`
- **Fundo:** creme `hsl(48, 40%, 95%)`

### Mercado Internacional (Suíça, Europa)
- **Principal:** azul confiança `hsl(220, 55%, 35%)` + branco limpo `hsl(0, 0%, 98%)`
- **Acento:** dourado premium `hsl(45, 70%, 48%)`
- **Personalidade:** mais sóbrio, tipografia maior, menos saturação

### Consistência entre temas
- Nunca usar preto puro (#000) — usar grafite `hsl(220, 15%, 15%)`
- Sombras com cor, nunca cinza neutro: `box-shadow: 0 4px 24px hsl(210 40% 20% / 0.12)`
- Bordas arredondadas: `rounded-xl` (12px) para cards, `rounded-2xl` (16px) para modais

---

## 2. Tipografia

### Stack recomendada para projetos Real Vision 360
```
Títulos: "Playfair Display" (turismo premium) OU "Outfit" (moderno, tech)
Corpo: "Inter" OU "Plus Jakarta Sans"
Tamanho mínimo corpo: 16px (turistas leem em celular no sol)
```

### Hierarquia
- H1: `text-4xl font-bold` em mobile → `text-6xl` em desktop
- H2: `text-2xl font-semibold`
- Corpo: `text-base leading-relaxed` (line-height 1.6)
- CTA buttons: `text-base font-semibold uppercase tracking-wide`

### Regras de texto
- `text-wrap: balance` em todos os títulos
- Nunca mais que 65 caracteres por linha em texto corrido
- Subtítulos em peso 400–500, nunca bold

---

## 3. Padrões de Layout para Turismo

### Hero Section (acima da dobra)
```
1. Imagem/vídeo de fundo imersivo (tour 360° ou drone) — sempre com overlay escuro 40%
2. Título grande (problema resolvido, não nome da empresa)
3. Subtítulo de 1 linha com prova social (ex: "+120 negócios no Google Maps")
4. CTA primário + CTA secundário (ex: "Ver demo" / "Falar no WhatsApp")
5. Logos de clientes OU Google ratings abaixo do fold
```

### Cards de Serviço
- Sempre com ícone ou imagem real (nunca placeholder)
- Preço ou "a partir de" visível — custo de esconder é alto
- 1 CTA por card

### Prova Social — obrigatória
- Reviews do Google: mostrar nota + número de avaliações
- Fotos reais de clientes/locais — nunca stock photos
- Logos de parceiros (Google, Street View, etc.)

---

## 4. Mobile-First para Turismo

Turistas acessam em celular, frequentemente sem WiFi excelente:

- Imagens: sempre `loading="lazy"` + formato WebP + `srcset` responsivo
- Botão WhatsApp: fixo no canto inferior direito em mobile (z-index 50)
- Formulários: máximo 3 campos visíveis inicialmente
- Touch targets: mínimo 44px de altura para botões
- Animações: preferir `prefers-reduced-motion` — não bloquear UX com animações pesadas

---

## 5. Padrões de Conversão Específicos

### Para negócios locais (pousadas, restaurantes)
1. **Localização sempre visível** — Google Maps embed ou endereço no header
2. **WhatsApp CTA** mais forte que formulário — brasileiros preferem
3. **Horários de funcionamento** no primeiro scroll
4. **Urgência genuína** — "apenas X vagas", "temporada alta aproximando"

### Para tour operators e Real Vision 360 como serviço
1. **Antes/Depois** — perfil GMB sem tour vs. com tour 360°
2. **ROI numérico** — tempo no site, mais visualizações no Maps
3. **Portfolio com link clicável** — cliente vê o próprio tipo de negócio no exemplo
4. **Garantia** — se não ficar satisfeito, retrabalha

---

## 6. Anti-padrões — Nunca fazer

- ❌ Carousel automático de hero (mata conversão, inacessível)
- ❌ Pop-up imediato ao entrar no site (especialmente mobile)
- ❌ Texto branco sobre imagem sem overlay adequado (contraste ruim)
- ❌ Formulário com muitos campos como CTA principal
- ❌ Fonte menor que 14px em qualquer elemento
- ❌ Botões sem estado :hover visível
- ❌ Página sem heading H1 único
- ❌ Imagens sem alt text (SEO + acessibilidade)

---

## 7. Stack Técnica Real Vision 360

```
React + Vite + TypeScript
Tailwind CSS (classes utilitárias)
Motion (animações — ativar skill motion junto)
Vercel (deploy)
```

### Componentes preferidos
- Shadcn/ui para base — customizar cor/radius conforme marca do cliente
- Embla Carousel (se precisar de carousel — nunca automático)
- react-intersection-observer para animações on-scroll
