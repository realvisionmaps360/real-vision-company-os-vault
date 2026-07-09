---
name: project-cartao-digital-metodologia
description: Metodologia completa para criar e publicar Cartão Digital para clientes da Real Vision
metadata: 
  node_type: memory
  type: project
  originSessionId: 0f61d61a-49fd-411c-afbf-3795157c50b0
---

# Cartão Digital — Metodologia Real Vision

Produto criado em jun/2026. Alternativa ao Linktree: página de perfil e links do cliente, hospedada via Vercel com domínio na Hostinger.

**Primeiro cliente:** Eduardo Barqueiro / Paraty Onboard — `paraty.realvisionmaps.com`

## Stack

- Vite + React + Tailwind CSS
- Ícones SVG inline com gradiente e drop-shadow (efeito 3D)
- Glassmorphism nos botões via CSS puro (`backdrop-filter: blur`)
- Hover: `translateY(-4px)` + `background` mais claro

## Estrutura de pastas

```
operacao/projetos/rv-cartaodigital-[slug-cliente]/
├── .gitignore          ← node_modules, dist, .env
├── .claude/launch.json ← configuração do preview
├── index.html
├── package.json        ← "type": "module" obrigatório
├── vite.config.js      ← server.port fixo (5174+)
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── fundo.jpg       ← imagem de fundo do cliente
│   └── perfil.png      ← logo/foto circular
└── src/
    ├── main.jsx
    ├── index.css       ← @tailwind + .glass-btn
    └── App.jsx         ← tudo em um componente
```

## Passo a passo de entrega

1. **Preparar assets:** copiar `fundo.jpg` e `perfil.png` da pasta do cliente em `operacao/clientes/arquivos/[nome]/`
2. **Criar projeto:** estrutura acima, `npm install`
3. **Preview local:** adicionar entrada no `.claude/launch.json` global (`Desktop\Real Vision\.claude\launch.json`)
4. **Git:** `git init`, criar `.gitignore` ANTES do primeiro commit
5. **GitHub:** `gh repo create realvisionmaps360/rv-cartaodigital-[slug] --private --source=. --remote=origin --push`
6. **Vercel:** importar repo → framework Vite → deploy automático
7. **Hostinger DNS:** adicionar CNAME `[slug]` → valor fornecido pela Vercel em Settings > Domains
8. **Vercel Domains:** Add Domain `[slug].realvisionmaps.com` → aguardar verde

## Registro global no launch.json

Cada novo cartão digital precisa de uma entrada no arquivo `Desktop\Real Vision\.claude\launch.json` com porta única (5174, 5175, 5176...).

## Padrão de URL

`[slug-cliente].realvisionmaps.com` — subdomínio do domínio principal da Real Vision.

## Por que "Cartão Digital" e não "Link na Bio"

Felipe pediu explicitamente: "Link na Bio" remete ao Instagram. "Cartão Digital" é mais profissional e genérico.
