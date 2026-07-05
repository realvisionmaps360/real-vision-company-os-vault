---
name: vercel-react-best-practices
description: Diretrizes de performance para aplicações React/SPA e boas práticas de deploy na Vercel.
---

# 🚀 Vercel & React SPA Performance Optimization

Diretrizes técnicas para assegurar o carregamento instantâneo, evitar gargalos de processamento no navegador e melhorar a nota do Lighthouse / Core Web Vitals no React.

---

## 1. Code Splitting e Lazy Loading de Rotas
* **Carregamento sob demanda:** Evite carregar toda a aplicação no bundle inicial. Use `lazy` e `Suspense` para rotas secundárias ou componentes pesados que não aparecem acima da dobra (above-the-fold):
  ```typescript
  import { lazy, Suspense } from "react";
  const PaginaPesada = lazy(() => import("./pages/PaginaPesada"));
  ```
* **Fallback Leve:** O componente de fallback do Suspense deve ser extremamente minimalista para não gerar atraso visual durante a troca de rotas.

---

## 2. Otimização Avançada de Imagens e Mídia
* **Formatos Modernos:** Use preferencialmente arquivos `.webp` ou `.avif`.
* **Above-the-Fold (Acima da Dobra):** Imagens do banner principal (hero section) e logotipos superiores devem ser carregados de forma rápida/imediata:
  - `loading="eager"` (ou omitido)
  - `decoding="async"`
* **Below-the-Fold (Abaixo da Dobra):** Imagens secundárias, fotos de seções inferiores e galerias devem ser adiadas:
  - `loading="lazy"`
  - `decoding="async"`
* **Prevenção de Layout Shift (CLS):** Sempre defina dimensões de proporção de aspecto (aspect-ratio ou explicitamente `width` e `height`) nas tags `<img>` para que o navegador reserve o espaço antes do carregamento da imagem, eliminando pulos na tela.

---

## 3. Gestão de Estado e Renderizações
* **Evite Renderizações Desnecessárias:** Separe estados que mudam frequentemente de componentes estáticos ou use hooks como `useMemo` e `useCallback` para funções/cálculos pesados.
* **Componentes Focados:** Mantenha os componentes pequenos e focados em uma única responsabilidade.
