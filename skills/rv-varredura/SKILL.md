# rv-varredura — Varredura do Company OS para a Wiki

Skill de estado e protocolo para a varredura contínua do Company OS da Real Vision no Obsidian.
Carregar junto com `obsidian` e `rv-wiki` ao iniciar qualquer sessão de varredura.

## O que é a varredura

Processo de ingestar sistematicamente os arquivos do Company OS (`Desktop\Real Vision\`) para a wiki do Obsidian em `operacao/gestao/infraestrutura/obsidian/wiki/`.

**Wiki path:** `Desktop\Real Vision\operacao\gestao\infraestrutura\obsidian\wiki\`

---

## Estado atual da wiki (30/06/2026)

### O que existe

| Pasta | Arquivos |
|---|---|
| `wiki/concepts/` | 17 arquivos |
| `wiki/sources/` | 4 arquivos |
| `wiki/questions/` | 2 arquivos |
| `wiki/entities/` | 36 arquivos (35 clientes + felipe-garcia) |

### Concepts existentes
- **Empresa:** rv-empresa, rv-time, rv-voz, rv-design
- **Serviços:** tour-360, google-meu-negocio, website, cartao-digital, video-drone, chatbot-ia
- **Prospecção:** acquisition-system, opportunity-score, campanha-paraty-2026, socio-digital, icp-real-vision
- **Marketing:** hermes-email-marketing
- **Comercial:** contrato-rv, termos-condicoes

### Sources existentes
acquisition-claude-role, acquisition-timeline, acquisition-operating-system, campanha-paraty-pousadas

---

## Fila de trabalho — ordem de prioridade

### ✅ CONCLUÍDO (29-30/06/2026)
- 35 entities de clientes criadas
- 7 concepts de serviços criados
- 4 concepts de empresa (rv-empresa, rv-time, rv-voz, rv-design)
- 1 entity (felipe-garcia)
- 1 concept marketing (hermes-email-marketing)
- 3 sources (acquisition-timeline, acquisition-operating-system, campanha-paraty-pousadas)

### ✅ CONCLUÍDO (30/06/2026 — continuação)
- Source `cursos-real-vision` criado (3 cursos: Sócio Digital, Profissão 360°, Empresa com IA)
- Backlinks expandidos em `icp-real-vision` com 35 clientes classificados por tier

### 🟡 PENDENTE — Pasta de projetos
- `operacao/projetos/real-vision-site/` → concept sobre o site principal
- VisionFlow: pasta não encontrada em `operacao/projetos/visionflow/` — verificar localização real

### 🟡 PENDENTE — Lint (Workflow 3)
- Verificar links quebrados nos 36 entities (alguns wikilinks no corpo podem não ter página correspondente)
- Confirmar `source_count` de cada arquivo (todos estão em 0 ou 1 — revisar)

---

## Protocolo de retomada (como usar esta skill)

1. Carregar: `obsidian` + `rv-wiki` + `rv-varredura`
2. Conferir estado: `Get-ChildItem wiki/ -Recurse -Filter "*.md" | Measure-Object`
3. Retomar pela fila acima, da 🔴 para a 🟢
4. Ao finalizar cada item, atualizar esta skill removendo da fila

---

## Schema das entities de cliente (padrão)

```yaml
---
type: entity
title: "Nome Completo — Empresa"
aliases: ["Nome", "Empresa"]
date_created: YYYY-MM-DD
date_updated: YYYY-MM-DD
source_count: 1
tags: [cliente, status-entregue]
status: stable
---
```

Seções obrigatórias:
- `## Resumo` — quem é, empresa, cidade, status atual
- `## Serviços contratados` — lista com datas
- `## Entregas` — o que foi entregue de fato
- `## Histórico` — linha do tempo resumida
- `## Conexões` — backlinks para conceitos (icp, campanha, serviços)
