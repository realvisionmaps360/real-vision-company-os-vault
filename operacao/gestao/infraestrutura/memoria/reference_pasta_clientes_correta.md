---
name: pasta_clientes_correta
description: "Localização correta da pasta de clientes — arquivos, documentação e projetos"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 27d89d13-5c0a-4398-a507-3d606748d859
---

# Pasta de Clientes — Localização Correta

**Pasta raiz de clientes:** `C:\Users\Computador\Desktop\Real Vision\operacao\clientes\`

## Estrutura
```
operacao/
├── clientes/
│   ├── arquivos/                              ← DOCUMENTAÇÃO DOS CLIENTES
│   │   ├── Gabriel Iberg - Solarium Aarau/
│   │   │   ├── AUDITORIA-CRO-SOLARIUM.md
│   │   │   ├── RELATORIO-LANDING-PAGE-META-ADS.md
│   │   │   ├── TIMELINE-DESENVOLVIMENTO-LANDING-PAGE.md
│   │   │   ├── Proposta_Angebotsübersicht...
│   │   │   ├── Solarium Aarau Real Vision
│   │   │   └── ... (contratos, briefings, etc)
│   │   ├── Romana Loznjakovic/  (ou Romana)
│   │   │   ├── BRIEFING-SUNBITE.md
│   │   │   └── ... (documentação)
│   │   ├── Eduardo Barqueiro/
│   │   └── ... (outros clientes)
│   │
│   ├── prospeccao/
│   └── CLIENTES_VISIONFLOW_2026-05-24.md
│
└── projetos/                                   ← REPOSITÓRIOS DE PROJETOS
    ├── solariumaarau/                        (cliente: Gabriel)
    ├── sunbite-site/                         (cliente: Romana)
    ├── rv-cartaodigital-paraty-onboard/      (cliente: Eduardo Barqueiro)
    ├── _RV-Internos/
    │   ├── real-vision-site/
    │   ├── visionflow/
    │   ├── socio-digital/
    │   └── ... (projetos internos)
    └── ... (outros repositórios)
```

## ⚠️ REGRA IMPORTANTE

- **Documentação comercial** (briefing, contratos, propostas) → `operacao/clientes/arquivos/[Nome-do-Cliente]/`
- **Documentação técnica** de projeto (README, docs, análises) → `operacao/clientes/arquivos/[Nome-do-Cliente]/` OU junto com o código em `operacao/projetos/[repo]/`
- **Repositórios de projeto** → `operacao/projetos/[nome-repo]/`
- **Repositórios internos da RV** → `operacao/projetos/_RV-Internos/[nome-repo]/`

## Erro Cometido
Criei incorretamente `operacao/projetos/clientes/` que foi deletada. A pasta correta é `operacao/clientes/arquivos/`.

