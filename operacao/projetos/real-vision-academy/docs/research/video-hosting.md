---
id: research-video-hosting
title: Pesquisa — Hospedagem de Vídeo
type: research
status: draft
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - DECISIONS
  - ARCHITECTURE
---

# Pesquisa — Hospedagem de Vídeo

> Objetivo: onde hospedar os vídeos das aulas. Critérios: **proteção do conteúdo pago**, **custo**,
> **qualidade do player/DX**. Dados de meados de 2026 — reconferir preço vigente antes de contratar.

## Opções

| Opção | Custo (aprox.) | Proteção | DX / Player | Veredito |
|---|---|---|---|---|
| **YouTube não-listado** | Grátis | Fraca (link vaza, sem trava por matrícula) | Player conhecido, mas com marca YouTube e sugestões | ❌ Não serve p/ conteúdo pago |
| **Vimeo** (planos pagos) | ~US$12–33/mês | Boa (domain restriction, privacidade) | Player ótimo, simples | 👍 Simples, mas mais caro |
| **Bunny Stream** | ~US$1–5/mês típico (US$0,01/GB storage + banda; transcode grátis) | **Muito boa**: token/signed URL com expiração, DRM (MediaCage) bloqueia download/gravação | API boa, player customizável; exige um pouco de setup | ✅ **Recomendado** |
| **Supabase Storage** | Incluso no plano Supabase (por GB) | Média (signed URL), mas **sem streaming adaptativo nem player** — teríamos que montar | Trabalhoso p/ vídeo | ⚠️ Bom p/ prompts `.md`/PDFs, não p/ vídeo |

## Recomendação

**Bunny Stream** para os vídeos:
1. **Custo baixíssimo** no volume da Academy (poucos GB no início) — ordem de poucos dólares/mês.
2. **Proteção adequada para conteúdo pago**: signed URLs com expiração + DRM opcional, exatamente o
   requisito de "aluno só assiste o que comprou".
3. API/embed integram bem com LMS próprio (o nosso caso) — sem depender de plataforma fechada.
4. Transcodificação (múltiplas qualidades) inclusa, sem custo extra.

**Complemento:** usar **Supabase Storage** (já teremos o projeto) para os **materiais complementares**
— principalmente os **prompts `.md`** e PDFs — com signed URL por matrícula. Vídeo no Bunny, arquivos
no Supabase. Divisão limpa.

**Trade-off honesto:** Vimeo é "plug and play" (menos setup), ao custo de ~US$12–33/mês e menos
controle de proteção via token. Se o Felipe priorizar simplicidade máxima sobre custo/controle na
largada, Vimeo é aceitável — mas o setup do Bunny é pontual e se paga rápido.

## Decisão do Felipe
- [ ] **Adiada** (2026-07-17) — Felipe optou por decidir depois. Ver [[DECISIONS]] D-006 (pendente).
  Recomendação em pé: Bunny Stream. Só trava a Fase 3.

## Fontes
- [Bunny Stream pricing](https://bunny.net/pricing/stream/)
- [Bunny Stream review 2026 (Bitdoze)](https://www.bitdoze.com/bunny-net-review/)
- [BunnyStream + DRM (Dave Swift)](https://daveswift.com/bunnystream/)
- [Host course videos com Bunny (Ruzuku)](https://www.ruzuku.com/learn/tools/bunny-net/host-course-videos)

## Documentos relacionados
- [[DECISIONS]] · [[ARCHITECTURE]] · [[MASTER_PRD]]
