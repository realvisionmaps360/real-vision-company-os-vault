# Projeto — Curso Profissão 360°

> **Porta de entrada do projeto.** Abra este arquivo primeiro: ele resume o que é, o que já está pronto, as decisões tomadas e o que vem depois.
> Última atualização: 01/06/2026.

---

## O que é

O **Profissão 360°** é o curso completo da Real Vision que forma um profissional de presença digital do zero. Ele **reúne as 4 mentorias** (vendidas separadas) numa formação única:

1. Google Meu Negócio
2. Imersão Total 360° (tour, drone, Pano2VR, Street View)
3. Sites com IA / Engenharia de Software (Claude Code)
4. Gestão 360° de Clientes

Quem termina o curso sai com um negócio montado e os primeiros clientes a caminho — não só com um certificado.

---

## Decisões tomadas (sessão de 01/06/2026)

1. **Estrutura:** as mentorias separadas = os 4 pilares. O Profissão 360° junta todos.
2. **Formato:** aulas curtas e práticas, **~5 min cada**. Nada maçante.
3. **Produção:** Felipe grava **tela + voz** (screencast).
4. **Idioma:** **só PT por enquanto** (EN/DE ficam pra depois).
5. **Hospedagem:** **área de membros própria**, no site da Real Vision (React/Vercel). Não usar plataforma de terceiros.
6. **Grade:** 6 módulos (0 a 5), ~40 aulas, ~3h30 de vídeo. Cada pilar fecha com a aula "quanto cobrar".

---

## Arquivos desta pasta

| Arquivo | O que é |
|---|---|
| README.md | Este índice — visão geral do projeto |
| [[CONCEITO]] | **Grade-mestra**: os 6 módulos, todas as aulas, preços e modelos de venda |
| [[MODULO-1-google-meu-negocio]] | **Roteiro pronto pra gravar** do Módulo 1 (8 aulas, com fala e tela) |

> Convenção: os próximos roteiros seguem o mesmo nome — `MODULO-2-...md`, `MODULO-3-...md`, etc. (padrão flat, igual ao Curso 01).

---

## Status e roadmap

- [x] Grade-mestra definida (`CONCEITO.md`)
- [x] Roteiro do Módulo 1 — Google Meu Negócio (`MODULO-1-...md`)
- [ ] Roteiro do Módulo 0 — Bem-vindo / mentalidade
- [ ] Roteiro do Módulo 2 — Imersão Total 360°
- [ ] Roteiro do Módulo 3 — Sites com IA
- [ ] Roteiro do Módulo 4 — Gestão de Clientes
- [ ] Roteiro do Módulo 5 — Montando seu negócio 360°
- [ ] Gravação das aulas (tela + voz)
- [ ] Construção da área de membros no site
- [ ] Arte de capa do curso

---

## Pendências no site (NÃO mexer sem OK do Felipe)

Mapeado nesta sessão, deixado pra depois a pedido do Felipe:

1. **"Lovable" no site** — a Real Vision já abandonou o Lovable (hoje é Claude Code), mas o nome ainda aparece em:
   - `src/components/sections/pro360/Pro360Modules.tsx` (linha 29) — **aparece na página de vendas** (prioridade)
   - `README.md` do repositório do site (texto padrão do Lovable)
   - `src/components/AboutSection.tsx` (linha 5) — comentário interno
   - Parte técnica: pacote `lovable-tagger` em `package.json` + `vite.config.ts` (precisa testar o site ao remover)
2. **`products.ts`** diz "12 módulos / 40+ horas" — a grade real tem **6 módulos / ~40 aulas / ~3h30**. Alinhar o texto do site a este projeto.

---

## Modelos de venda (resumo — detalhe no `CONCEITO.md`)

- **Mentoria individual 1:1:** R$250/hora
- **Workshops avulsos:** GMN R$197 · Tour 360° R$297 · Sites com IA R$397
- **Profissão 360° completo:** R$997 pré-venda (de R$1.997) · 12x R$97

---

## Histórico

- **01/06/2026** — Sessão de planejamento e criação. Definida a grade completa, escrito o roteiro do Módulo 1, mapeadas as pendências do site. Persona de copy usada: O Arquiteto da Persuasão (Halbert/Ogilvy/Schwartz na voz Real Vision).
