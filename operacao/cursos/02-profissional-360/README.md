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

## Como desenvolvemos as aulas narradas (Módulo 0 e qualquer outro módulo em formato narrado)

> Processo fechado na sessão de 31/08/2026, ao revisar a Aula 0.2. Vale pra 0.3, 0.4 e qualquer aula
> narrada futura — não é regra só do Módulo 0.

1. **O texto sai da voz do Felipe, não da IA.** Felipe dita o conteúdo falando naturalmente (às vezes por
   voz transcrita, às vezes digitado corrido). O valor da aula narrada está em soar como ele fala de
   verdade — então a IA nunca reescreve o conteúdo, só organiza.
2. **Organizar = quebrar em frases/parágrafos e ajustar pontuação.** Nada de trocar palavra por sinônimo,
   resumir ideia ou "melhorar" o estilo. Mesmo princípio já registrado no cabeçalho da Aula 0.1.
3. **Trecho confuso do ditado (fala embaralhada, transcrição por voz que saiu sem nexo) nunca é
   adivinhado.** Marca com 📌 e pergunta direto ao Felipe o que ele quis dizer ali. Só fecha depois que
   ele confirma ou reescreve o trecho.
4. **Fluxo de revisão:** quando o Felipe pede pra "conversar" sobre um trecho, mostrar **antes/depois**
   no chat antes de tocar no arquivo. Quando ele já resolveu os pontos em aberto e pede pra "aplicar",
   aplica direto no arquivo e devolve o texto final pronto pra leitura em voz alta.
5. **Cada 📌 resolvido é removido do texto** — o arquivo final não deve carregar marcação de pendência já
   fechada, só o que ainda falta confirmar antes de gravar (ex: uma estatística que o Felipe ainda não
   validou).

## ⚠️ Restrição de máquina — narração e transcrição sincronizada

> Registrado em 31/08/2026 porque quase virou confusão: o Felipe estava na Suíça no notebook nesta
> sessão, e a ferramenta que faz o alinhamento de áudio (Aeneas, via Docker — usada no
> [[NARRACAO-SINCRONIZADA-BLOG]]/RV Voice Sync) **só está instalada na máquina dele no Brasil (PC)**.

- **Planejamento, organização de roteiro e escrita do texto narrado** (o que fizemos nesta sessão) —
  pode ser feito de qualquer máquina, incluindo o notebook na Suíça.
- **Processamento técnico do áudio** (rodar o Docker/Aeneas pra gerar o sync frase-a-frase) — só funciona
  na máquina do Brasil. Quando o Felipe estiver acessando aquele PC (fisicamente ou via TeamViewer), ele
  avisa na sessão, e a partir daí dá pra rodar essa etapa.
- **Na prática:** o texto final de cada aula narrada (como o da 0.2, já fechado) fica pronto pra gravação
  em qualquer sessão. Só a etapa de sincronização do áudio depende de estar na máquina certa.

---

## Arquivos desta pasta

| Arquivo | O que é |
|---|---|
| README.md | Este índice — visão geral do projeto |
| [[CONCEITO]] | **Grade-mestra**: os 6 módulos, todas as aulas, preços e modelos de venda |
| [[MODULO-0-bem-vindo]] | **Texto pronto pra gravar** do Módulo 0 (4 aulas) — formato **narrado**, texto final palavra por palavra |
| [[MODULO-1-google-meu-negocio]] | **Roteiro pronto pra gravar** do Módulo 1 (8 aulas, com fala e tela) |
| [[MODULO-2-imersao-total-360]] | **Rascunho** do Módulo 2 — só aulas 2.1 e 2.2, aguardando o resto do conteúdo |

> Convenção: os próximos roteiros seguem o mesmo nome — `MODULO-2-...md`, `MODULO-3-...md`, etc. (padrão flat, igual ao Curso 01).

---

## Status e roadmap

- [x] Grade-mestra definida (`CONCEITO.md`)
- [x] Roteiro do Módulo 1 — Google Meu Negócio (`MODULO-1-...md`) — aulas 1.2, 1.3, 1.4, 1.6, 1.7 enriquecidas em 28/08/2026
- [x] Roteiro do Módulo 0 — Bem-vindo / mentalidade (`MODULO-0-bem-vindo.md`) — aula 0.2 com texto final em 28/08/2026, aguardando gravação
- [ ] Roteiro do Módulo 2 — Imersão Total 360° — rascunho das aulas 2.1 e 2.2 iniciado (`MODULO-2-imersao-total-360.md`), faltam 2.3 a 2.9
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
- **28-31/08/2026** — Enriquecido o roteiro do Módulo 1 (1.2, 1.3, 1.4, 1.6, 1.7) com detalhes reais de operação do Felipe. Reescrita a Aula 0.2 no formato narrado (texto final, ditado por ele em duas rodadas, todos os 📌 fechados em 31/08). Criado o rascunho do Módulo 2 (aulas 2.1 e 2.2). Fechado o processo de trabalho pra aulas narradas e registrada a restrição de máquina (Docker/Aeneas só no PC do Brasil) — ver seções acima. Próxima sessão: Aula 0.3.
