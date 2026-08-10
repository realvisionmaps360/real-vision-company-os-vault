---
name: rv-academy
description: "Guia operacional de engenharia da Real Vision Academy — a plataforma de cursos (React + Vite + Supabase, dentro do repo real-vision-site). Cobre os PRDs vivos, o leitor de aula narrada, o harness de verificação em Playwright, o padrão obrigatório de print em 390px e as armadilhas que já custaram tempo. Use SEMPRE que Felipe for trabalhar em código da Academy: leitor narrado, trilha do curso, painéis, materiais, progresso, matrícula, nav da Academy. NÃO usar para desenhar conteúdo/currículo de curso — para isso é rv-course-builder."
---

# Skill: rv-academy

Engenharia da **Real Vision Academy** — a plataforma de cursos que vive dentro do site oficial.

Carregar junto com `realvision`. Se a sessão envolver banco, somar `supabase-postgres`; se envolver
layout, somar `frontend-design` e `web-design-guidelines`.

> **Fronteira com `rv-course-builder`:** aquela skill desenha currículo, módulos e roteiro de aula
> (design instrucional). Esta cuida do **software** que entrega o curso. Não confundir.

## Onde tudo vive

| O quê | Caminho |
|---|---|
| Código | `operacao/projetos/_RV-Internos/sites/real-vision-site` — repo `real-vision-core` |
| Telas | `src/pages/academy/` |
| Componentes | `src/components/academy/` e `src/components/academy/narrated/` |
| Hooks | `src/hooks/useCourse.ts`, `useProgress.ts`, `useEnrollment.ts`, `useNarratedAudio.ts`, `useImmersiveChrome.ts` |
| Harness de verificação | `tests/verify-bloco*.mjs`, `tests/login-aluno.mjs` |
| **Documentação do projeto** | `operacao/projetos/real-vision-academy/docs/` |

**A documentação é a fonte da verdade, não o código.** Antes de qualquer trabalho, ler nessa ordem:

1. o **handoff mais recente** — `docs/HANDOFF-*.md`
2. o **PRD da fase ativa** — `docs/prds/PRD-00X-*.md`
3. `docs/DECISIONS.md` — decisões numeradas `D-0XX`, com o porquê
4. `docs/KNOWN_ISSUES.md` — os `KI-XX` são restrições reais, não sugestões

## Regra de ouro desta plataforma: como "verificado" se define (D-039)

Em 10/08/2026 os Blocos 1 a 4 do leitor estavam documentados como "verificados 32/32, 47/47, 17/17".
O Felipe testou no celular e achou container vazando, cor reprovada, item quebrando linha e rolagem
horizontal. **Tudo passou no Playwright**, porque nada disso é asserção dele. Pior: o ramo nunca tinha
sido juntado ao `main`, então ele avaliou a tela **antiga**.

Bloco só fecha com os cinco:

1. `npm run build` limpo
2. Playwright verde — comportamento **e** regressão
3. **Screenshot em 390px que você abre e olha com seus próprios olhos**
4. Revisão contra `contexto/DESIGN.md`
5. **Antes de pedir teste ao Felipe:** confirmar que o commit está no `main` **publicado** e que a Vercel
   já serve o pacote novo (comparar o nome do asset do `dist/` com o que produção responde)

Teste de robô prova que **não quebrou**. Não prova que **está bom**.

## Rodando o harness

```bash
cd "operacao/projetos/_RV-Internos/sites/real-vision-site"
npm run dev
```

Os scripts têm como padrão o perfil de **admin**, que não está matriculado. Usar o de **aluno**:

```bash
RV_PROFILE="C:\Users\Felipe Garcia\.playwright-rv-aluno" node tests/verify-bloco4.mjs mobile
```

Sessão expirada (página mostra "Faça login para acessar esta aula") → `node tests/login-aluno.mjs` abre
janela visível pro Felipe entrar. **Nenhuma credencial passa pelo agente.**

Conta de teste: `smarthomefg@gmail.com`, matriculada pelo admin `realvisionmaps360@gmail.com`.

## Armadilhas que já custaram tempo

- **Nunca `node -e` com caminho do Windows.** Escape de barras errado criou uma pasta de perfil do Chrome
  na raiz do repo e o vigia de arquivos do Vite morreu com `EBUSY`, derrubando o servidor. A mesma leva
  de comandos deixou sete arquivos-lixo no repo. Escrever arquivo de script, e conferir `git status`
  antes de comitar.
- **Perfis do Playwright moram FORA do repo**, de propósito, pelo motivo acima.
- **A frase narrada fica debaixo do cabeçalho.** O auto-scroll a encosta no topo e o cabeçalho tem 60px;
  clique por coordenada acerta o cabeçalho e o teste acusa falha de código que está certo. Rolar com
  `scrollIntoView({ block: "center" })` antes de medir.
- **`completedSet` do `useProgress` é um `Set` novo a cada render.** Memoizar por ele memoiza errado —
  usar `done`, `percent` ou `.size`.
- **Falha de teste pode ser estado sujo, não regressão.** O harness do Bloco 3 não limpa marcadores
  quando morre no meio; a rodada seguinte quebra com o botão em "Marcada" em vez de "Marcar frase".
  Limpar pela interface antes de acusar regressão.
- **Espera fixa em teste de narração é armadilha.** A frase 0 da aula 0.1 dura ~10,5s; um teste com 6s
  cravados falhava sem nada estar quebrado. Esperar o **evento**, com teto.
- **`git push origin ramo:main` é bloqueado pelo classificador.** Avançar o `main` local e
  `git push origin main`.
- **`git fetch` antes de `git status`** — `status` sozinho usa cache e já enganou aqui.
- **Escrita no banco nunca por MCP ou Management API** (KI-29). SQL vai pro SQL Editor, com o Felipe.
- **Hook novo nasce com `user.id` no `queryKey`** (KI-22/KI-27), sem exceção.

## O leitor de aula narrada — o que está aprovado

Comportamento validado pelo Felipe em aparelho real e **guardado por teste de regressão**. Não mexer sem
pedido explícito dele:

| Gesto | Efeito | Decisão |
|---|---|---|
| Toque simples em qualquer pixel | Alterna cabeçalho **e** barra juntos; não mexe no áudio | D-033 |
| Duplo toque numa frase | Pula pro trecho e **começa a tocar** | D-034 |
| Rolar / ficar parado | **Nada muda** | D-035 |

Rodapé em três camadas, com a barrinha de progresso **sempre** na tela e as outras montando sobre ela
(D-036). Barrinha com fundo sólido (D-037). Barra com `−15 −5 [play] +5 +15` (D-038). Geometria derivada
de `STRIP_H`, exportado por `ImmersiveStrip.tsx` — qualquer camada nova de rodapé parte dessa constante.

## Padrão de trabalho por fase

O projeto anda em **blocos**, um por vez, cada um fechando com build limpo, Playwright verde, print
revisado e **aval do Felipe** antes do seguinte começar. Ao terminar uma fase:

1. Atualizar o **PRD** da fase (estado dos blocos, o que mudou e por quê)
2. Registrar decisões novas em `DECISIONS.md` — **conferir o último número usado**, a numeração já
   colidiu uma vez
3. Escrever o dia em `TIMELINE.md`, incluindo o que **não** foi corrigido
4. Se a sessão terminar com escopo pendente, criar `HANDOFF-<data>-<assunto>.md`

## Documentos vivos

- `PRD-007-curso-narrado-sincronizado` — o produto original e o pipeline de gravação
- `PRD-008-leitor-narrado-design` — o leitor; Blocos 0-4 + Fases A e A-2 no ar, **Fase B é o próximo**
- `PRD-009-trilha-gamificada` — trilha estilo Duolingo + tela por aula; especificado, zero código

## Pré-requisito de fora do código

Gravar aula nova depende de **ffmpeg**, **Python 3** e **Docker** (Aeneas) — nenhum instalado na máquina
atual do Felipe (verificado 04/08/2026). Os scripts `clean_text.py` e `build_final.py` estão em
`TEMP/modulo/output/`, ainda fora de `scripts/` do repo. **Leitor pronto não destrava a gravação** —
não prometer aula nova só porque o software ficou pronto.
