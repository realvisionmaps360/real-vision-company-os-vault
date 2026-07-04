# Estrutura de Projetos — Real Vision 360

**Data:** 2026-06-24  
**Última atualização:** Reorganização concluída

---

## 📋 Visão Geral

Esta pasta contém **todos os projetos da Real Vision**, organizados em duas categorias principais:

### 1️⃣ **Projetos de Cliente** (`/clientes/`)
Cada cliente tem sua própria pasta com todos os seus projetos, documentação e briefings.

### 2️⃣ **Projetos Internos** (`/_RV-Internos/`)
Projetos, produtos e infraestrutura da Real Vision 360.

---

## 📁 Estrutura Completa

```
projetos/
│
├── clientes/
│   ├── Eduardo-Barqueiro/
│   │   └── rv-cartaodigital-paraty-onboard/  [Cartão Digital Paraty]
│   │
│   ├── Gabriel/
│   │   └── solariumaarau/  [Solarium Aarau — Suíça]
│   │       ├── AUDITORIA-CRO-SOLARIUM.md
│   │       ├── RELATORIO-LANDING-PAGE-META-ADS.md
│   │       ├── TIMELINE-DESENVOLVIMENTO-LANDING-PAGE.md
│   │       └── ... (projeto React + documentação)
│   │
│   └── Romana-Loznjakovic/
│       ├── sunbite-site/  [Sunbite — Food Bike Premium]
│       ├── BRIEFING-SUNBITE.md
│       └── ... (projeto React + documentação)
│
└── _RV-Internos/
    ├── real-vision-site/  [Site oficial realvisionmaps.com]
    ├── visionflow/  [CRM interno da Real Vision]
    ├── socio-digital/  [6º pilar: Sócio Digital (produto)]
    ├── brasil-trip-junho-2026/  [Evento/trip]
    │
    └── documentacao/
        ├── AUDITORIA-HOME.md
        ├── BLOG-POSTS-PIPELINE.md
        ├── BRIEFING-CLAUDE-DESIGN.md
        ├── COPY-HOME.md
        ├── INTEGRACAO-SOCIO-DIGITAL.md
        ├── LIMPEZA-REPOS-GEMINI.md
        ├── MELHORIAS-SITE.md
        └── NOVA-HOME-ARQUITETURA.md
```

---

## 🤔 Quando Adicionar um Novo Cliente?

Ao começar um projeto para um novo cliente:

1. **Criar pasta do cliente** em `clientes/[Nome-Cliente]/`
2. **Criar subfolder do projeto** dentro da pasta do cliente
3. **Mover documentação do cliente** (briefing, contratos, etc) para `clientes/[Nome-Cliente]/`
4. **Documentação técnica** do projeto fica junto com o código (raiz do projeto)

**Exemplo — Novo cliente "João da Silva":**
```
clientes/
└── Joao-da-Silva/
    ├── meu-projeto-web/
    │   ├── src/
    │   ├── package.json
    │   ├── README.md
    │   └── ... (código do projeto)
    ├── BRIEFING-JOAO.md
    ├── CONTRATO.pdf
    └── ... (documentação comercial)
```

---

## 📊 Clientes Ativos

| Cliente | Projeto | Status | Responsável |
|---------|---------|--------|-------------|
| Gabriel | [[solariumaarau/README\|Solarium Aarau]] (Suíça) | Em desenvolvimento (Landing Page) | Felipe |
| Romana Loznjakovic | [[sunbite-site/README\|Sunbite.ch]] | Aguardando | Felipe + Romana |
| Eduardo Barqueiro | Paraty Onboard (Cartão Digital) | Entregue | Felipe |

---

## 🚀 Projetos Internos da Real Vision

### real-vision-site
- **O quê:** Site oficial da empresa (realvisionmaps.com)
- **Stack:** React + Vite + i18n + Tailwind
- **Responsável:** Felipe
- **Link:** https://realvisionmaps.com
- **Docs:** [[_RV-Internos/real-vision-site/README|README do projeto]]

### visionflow
- **O quê:** CRM interno para gerenciar clientes, oportunidades, tarefas
- **Stack:** React + Vite + Supabase
- **Responsável:** Felipe
- **Docs:** [[_RV-Internos/visionflow/README|README do VisionFlow]] · [[_RV-Internos/visionflow/docs/TIMELINE|Timeline]]

### socio-digital
- **O quê:** 6º pilar da Real Vision — Sócio Digital (assistente IA implementado no PC do cliente)
- **Modelo:** Serviço com receita recorrente (R$ 400-1.500/mês)
- **Docs:** [[_RV-Internos/socio-digital/01-PLANO-MESTRE|01-PLANO-MESTRE]]
- **Responsável:** Felipe

### brasil-trip-junho-2026
- **O quê:** Trip/evento realizado em junho de 2026
- **Documentação:** [[_RV-Internos/brasil-trip-junho-2026/itinerario|Itinerário]], [[_RV-Internos/brasil-trip-junho-2026/log-jornada|log de jornada]]
- **Responsável:** Felipe

---

## 📝 Padrões de Organização

### Para projetos de cliente:
- ✅ Código do projeto em raiz ou subfolder
- ✅ Documentação técnica (README, especificações) junto com código
- ✅ Documentação comercial (briefing, contrato) na pasta do cliente
- ✅ Cada cliente tem sua pasta isolada

### Para projetos internos:
- ✅ Todos em `_RV-Internos/`
- ✅ Docs específicas de cada projeto em seu root
- ✅ Docs genéricas (auditorias, procedimentos) em `documentacao/`

### Convenções de nomes:
- Pasta de cliente: `[Nome-Pessoa]` (ex: Gabriel, Romana-Loznjakovic, Eduardo-Barqueiro)
- Pasta de projeto: `kebab-case` (ex: solariumaarau, rv-cartaodigital-paraty-onboard)
- Documentos: `MAIUSCULO-COM-HIFENS.md` (ex: BRIEFING-SUNBITE.md)

---

## 🔗 Relacionados

- **Company OS:** `C:\Users\Computador\Desktop\Real Vision\` (arquivo mestre da empresa)
- **CLAUDE.md:** Instruções globais no project root
- **Memória:** Notas persistentes de projeto em `.claude/projects/*/memory/`

---

## ❓ Dúvidas?

- **Estrutura está confusa?** Consulte este README
- **Novo cliente chegando?** Copie a estrutura do exemplo acima
- **Projeto antigo perdido?** Procure em `_RV-Internos/documentacao/` ou no Company OS

---

**Last Updated:** 2026-06-24  
**Responsável:** Felipe Garcia + Romana Loznjakovic
