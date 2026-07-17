---
name: motion
description: Biblioteca Motion (motiondivision/motion) — animações React/JS para sites e apps da Real Vision. Ativar quando o assunto envolver animações, transições, hover effects, scroll effects, UI polish ou qualquer efeito visual em projetos React (site, VisionFlow, sites de clientes, Solarium).
---

# Motion — Animation Library (Real Vision)

Biblioteca open source MIT para animações React, JS e Vue. Usada por Framer e Figma. É a ferramenta de animação padrão pra qualquer projeto React da Real Vision.

---

## Setup

```bash
npm install framer-motion
```

Projetos novos da Real Vision já nascem com essa dependência instalada — só rodar o comando acima se o projeto ainda não tiver o pacote (`framer-motion` no `package.json`).

---

## Onde se encaixa na Real Vision

| Projeto | Uso principal |
|---|---|
| **realvisionmaps.com** | Hero reveals, scroll animations de seções, hover em cards de serviço |
| **Landing pages de clientes** | Entrada de seções, CTAs com pulse, counters animados |
| **VisionFlow (CRM)** | Transições de tela, modais, loading states, toasts |
| **Solarium Aarau** | Galeria com transições, entrada do tour 360° |
| **Sites de clientes** | Qualquer site que precise de polish visual profissional |

---

## APIs essenciais

```tsx
// Animação básica
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} />

// Gestos
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} />

// Scroll reveal (padrão para seções de landing page)
const { ref, inView } = useInView({ triggerOnce: true })
<motion.div ref={ref} animate={inView ? { opacity: 1 } : { opacity: 0 }} />

// Exit animations
<AnimatePresence>
  {isVisible && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>

// Scroll-linked (parallax / progress bar)
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -100])

// Variants (coordenar múltiplos elementos)
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
```

---

## Padrões para Claude Code

Ao implementar Motion:
- Sempre usar `framer-motion` como pacote (é o nome npm — Motion e Framer Motion são o mesmo pacote)
- Preferir `initial/animate/transition` em vez de CSS keyframes
- Para scroll reveals em landing pages: `useInView` com `triggerOnce: true`
- Não animar mais de 3 propriedades simultaneamente — prejudica performance
- Usar `will-change: transform` implícito via `motion.div` (já otimizado pela lib)

---

## Triggers que ativam esta skill

Palavras/situações que indicam que Motion é relevante:
- "animação", "animações", "transição", "hover effect", "scroll effect"
- "entrada suave", "fade in", "slide", "reveal", "parallax"
- "deixar mais bonito/dinâmico/profissional visualmente"
- "micro-interação", "efeito visual", "cursor animado", "carrossel"
- Qualquer pedido de UI polish em projeto React
