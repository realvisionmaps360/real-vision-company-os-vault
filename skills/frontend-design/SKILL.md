---
name: frontend-design
description: Padrões de design visual premium, interfaces ricas, tipografia moderna e animações para frontends.
---

# 🎨 Frontend Design & Visual Aesthetics

Playbook de design para criar interfaces modernas, ricas e visualmente impressionantes. O objetivo é afastar-se do padrão visual simplista ou cinzento gerado por IAs convencionais, entregando um design com acabamento profissional e premium.

---

## 1. Cores e Paletas Harmônicas
* **Evite Cores Genéricas:** Nunca use cores básicas puras (como vermelho puro, verde puro ou azul padrão do Tailwind).
* **Defina uma Paleta HSL:** Use cores expressas em HSL para controle preciso de saturação e brilho. Prefira paletas com identidade clara (ex: tons de oklch, cinzas azulados frios ou grafite premium).
* **Tema Escuro/Claro Coeso:** Ao projetar temas, garanta que os contrastes sigam as diretrizes de acessibilidade WCAG, mantendo uma hierarquia visual limpa.

---

## 2. Tipografia Moderna e Hierarquia
* **Fontes Premium:** Utilize famílias tipográficas limpas e elegantes via Google Fonts (ex: *Inter*, *Outfit*, *Roboto*, *Plus Jakarta Sans*).
* **Escala Tipográfica Clara:** Crie distinções fortes entre títulos (grandes, bold, espaçamento ligeiramente menor) e textos corridos (leitura confortável, espaçamento entre linhas de `1.5` a `1.7`).
* **Text-wrap Tuning:** Utilize `text-wrap: balance` em títulos curtos para evitar quebras de linha desalinhadas ou órfãs nas visualizações de tela.

---

## 3. Elementos Dinâmicos e Micro-Animações
* **Efeitos de Hover:** Toda interação deve se fazer "viva". Use transições suaves (`transition-all duration-300`) em botões, links e cards.
* **Vidro e Efeitos Premium (Glassmorphism):** Utilize desfoque de fundo (`backdrop-blur`) e bordas semitransparentes finas para simular profundidade e camadas tridimensionais.
* **Gradients Sofisticados:** Adicione gradientes lineares sutis em planos de fundo ou textos destacados em vez de cores sólidas chapadas.

---

## 4. Layouts Responsivos e Fluidos
* **Mobile-First:** Projete com foco prioritário em telas menores e escale progressivamente para desktops.
* **Espaçamento Coerente:** Utilize uma grade de espaçamento lógica (ex: múltiplos de 4px ou 8px) para garantir simetria em paddings, margins e gaps de grid.
