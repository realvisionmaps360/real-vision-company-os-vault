# Canal YouTube — Real Vision

Sistema Operacional do canal [@RealVisionMaps](https://www.youtube.com/@RealVisionMaps) no Claude Code. Ponto de entrada técnico: [`CLAUDE.md`](CLAUDE.md).

## Estrutura

| Pasta | O que tem |
|---|---|
| `.claude/` | Regras (`rules/`) e skills (`skills/`) — **local, não sincroniza** com o vault |
| `00_governanca/` | Estratégia, plano 12-24-36 meses, matriz de aprovações, pendências |
| `01_pesquisas/` | Audiência, concorrentes, tendências, palavras-chave, fontes externas |
| `02_banco-de-ideias/` | Ideias, backlog, hipóteses de público, séries e formatos |
| `03_planejamento-editorial/` | Calendário, pipeline de produção, plano de 90 dias |
| `04_videos/` | Uma pasta por vídeo (`AAAA-MM-DD_slug-do-video/`) |
| `05_metricas/` | Catálogo de vídeos, dashboard, baseline, snapshots |
| `06_relatorios/` | Relatórios semanais e mensais |
| `07_decisoes/` | Registro de decisões, aprendizados e experimentos |
| `08_templates/` | Templates reutilizáveis (manifesto de vídeo, roteiro, etc.) |
| `09_procedimentos/` | Procedimentos operacionais escritos |
| `10_scripts/` | Scripts de apoio (leves, sem segredo) |
| `99_arquivo/` | Material descontinuado, mantido por histórico |
| `source of truth/` | Transcrições brutas usadas como matéria-prima da síntese em `01_pesquisas/fontes/` |

## Estado atual (13-14/07/2026)

- MCP do YouTube: **não instalado**. Decisão registrada em `00_governanca/pendencias-de-integracao.md`: quando instalar, será a Opção 1 (gestão completa via OAuth2, 22 ferramentas).
- Hooks de segurança: desenhados, **não ativados** — ver `.claude/rules/seguranca-e-aprovacoes.md` e aguardam demonstração + aprovação específica.
- Público-alvo: em hipótese, não validado — ver `02_banco-de-ideias/hipoteses-de-publico.md`.

## Como continuar uma sessão

1. Leia `CLAUDE.md`.
2. Cheque `00_governanca/pendencias-de-integracao.md`.
3. Veja a skill mais próxima da tarefa em `.claude/skills/`.
