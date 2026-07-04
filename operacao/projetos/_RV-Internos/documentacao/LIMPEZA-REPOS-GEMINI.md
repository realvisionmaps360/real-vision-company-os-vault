# Limpeza de Repos Duplicados — Gemini Scratch

Data: 2026-05-25

## O que aconteceu

O Gemini CLI criou cópias de trabalho dos repos da Real Vision na pasta `C:\Users\Computador\.gemini\`. Essas cópias foram identificadas e os projetos foram movidos para a estrutura correta do Company OS.

## Repos movidos

| Projeto | Origem (Gemini — APAGAR) | Destino correto |
|---|---|---|
| VisionFlow CRM | `C:\Users\Computador\.gemini\antigravity-backup\scratch\visionflow-crm-48fe197a` | `Desktop\Real Vision\operacao\projetos\visionflow` (já existia com `.git` correto) |
| VisionFlow CRM | `C:\Users\Computador\.gemini\antigravity-ide\scratch\visionflow-crm-48fe197a` | idem acima |
| Solarium Aarau | `C:\Users\Computador\.gemini\antigravity-backup\scratch\solariumaarau-12006307` | `Desktop\Real Vision\operacao\projetos\solariumaarau` (clonado em 2026-05-25) |
| Solarium Aarau | `C:\Users\Computador\.gemini\antigravity-ide\scratch\solariumaarau-12006307` | idem acima |

## Remotes confirmados (fonte da verdade = GitHub)

- **VisionFlow:** `https://github.com/realvisionmaps360/visionflow-crm-48fe197a`
- **Solarium Aarau:** `https://github.com/realvisionmaps360/solariumaarau-12006307`

## Ação pendente

Apagar manualmente as pastas Gemini listadas acima:
```
C:\Users\Computador\.gemini\antigravity-backup\scratch\visionflow-crm-48fe197a
C:\Users\Computador\.gemini\antigravity-backup\scratch\solariumaarau-12006307
C:\Users\Computador\.gemini\antigravity-ide\scratch\visionflow-crm-48fe197a
C:\Users\Computador\.gemini\antigravity-ide\scratch\solariumaarau-12006307
```

A fonte da verdade é sempre `Desktop\Real Vision\operacao\projetos\`.
