---
id: SIS-2026-003
tipo: processo
nome: Versionamento do LBOS
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-06
atualizado_em: 2026-08-06
proxima_revisao: 2026-11-06
versao_lbos: "1.0"
fonte_unica: true
pertence_a: ["[[LBOS]]"]
tags: [lbos/sistema, lbos/processo]
---

# Versionamento do LBOS

## Regra

Uma versão oficial **nunca é editada**. Mudou? Nasce versão nova, e a anterior fica congelada em `00-Sistema/prd/`.

| Tipo de mudança | Efeito | Exemplo |
|---|---|---|
| Correção pequena | Versão menor (1.0 → 1.0.1) | Corrigir erro de digitação na spec |
| Funcionalidade nova | Versão nova (1.0 → 1.1) | Adicionar uma 16ª entidade |
| Mudança estrutural | Versão principal (1.0 → 2.0) | Trocar o modelo de pastas ou o vocabulário de relações |

## O que é congelado x o que é vivo

| Arquivo | Natureza |
|---|---|
| `prd/LBOS-v1.0.md` | **Congelado.** Cópia intocável da spec oficial |
| `ARQUITETURA.md` | Vivo. Muda quando a implementação ensina algo |
| `CONVENCOES.md` | Vivo, mas com trava: vocabulário de relações só muda com aprovação |
| `LBOS.md` | Vivo. Reflete o estado atual do sistema |

A spec descreve a intenção; a arquitetura descreve a execução. As duas podem divergir temporariamente — quando isso acontece e a divergência se confirma como melhoria, ela vira proposta de nova versão da spec.

## Como propor uma versão nova

1. Registrar o motivo em `08-Decisoes/` no modelo do §21
2. Copiar a spec vigente para `prd/LBOS-vX.Y.md`
3. Aplicar a mudança **só na cópia nova**
4. Atualizar o campo `versao_lbos` nos documentos de sistema
5. Registrar aqui na tabela de versões

## Versões

| Versão | Data | Status | O que mudou |
|---|---|---|---|
| 1.0 | 2026-08-06 | **Vigente** | Especificação inicial. 6 partes, 61 seções, 15 entidades |

---

## Relacionados

- Pertence a: [[LBOS]]
- Versiona: [[LBOS-v1.0]]
- Complementa: [[ARQUITETURA]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-06 | Documento criado | Fase 1 — Fundação | Trava a spec v1.0 como imutável | Versão oficial nunca é editada, só sucedida |
