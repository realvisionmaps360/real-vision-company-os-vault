---
name: project-curso-profissao-360
description: "Curso Profissão 360° — estrutura, decisões de produção e onde ficam os arquivos do projeto"
metadata: 
  node_type: memory
  type: project
  originSessionId: d402741b-dfcf-43c6-90bf-3229f2b2d237
---

**Curso Profissão 360°** — formação completa da Real Vision que reúne as 4 mentorias (vendidas separadas) num curso só: Google Meu Negócio, Imersão Total 360° (tour/drone/Pano2VR), Sites com IA (Claude Code) e Gestão 360° de Clientes.

Pasta dedicada (porta de entrada = `README.md`): `operacao/cursos/02-profissional-360/`
- `README.md` — índice do projeto · `CONCEITO.md` — grade-mestra · `MODULO-1-google-meu-negocio.md` — roteiro pronto.

**Decisões (01/06/2026):** 6 módulos (0 a 5), ~40 aulas de ~5 min, screencast (tela + voz do Felipe), só PT por enquanto, hospedagem em **área de membros própria** (React/Vercel — não terceiros). Cada pilar fecha com aula "quanto cobrar". Preços já no site: completo R$997 pré-venda (de R$1.997); mentoria 1:1 R$250/h; workshops avulsos GMN R$197 / Tour R$297 / Sites R$397.

**Pendências no site (NÃO mexer sem OK):** `Pro360Modules.tsx` linha 29 e outros arquivos ainda citam "Lovable" (ver [[feedback_lovable_abandonado]]); `products.ts` diz "12 módulos/40h" mas a grade real é 6 módulos/~3h30. Módulo 2 se apoia no [[project_gnomo_monstro_skill]] (Pano2VR).

**Why:** projeto estratégico de escala da Real Vision (transformar conhecimento do Felipe em produto); decisões de formato não são deriváveis do código.
**How to apply:** ao retomar o curso, abrir o `README.md` da pasta primeiro; seguir o formato de roteiro do Módulo 1 para os próximos módulos; persona de copy = O Arquiteto da Persuasão (rv-blogpost).
