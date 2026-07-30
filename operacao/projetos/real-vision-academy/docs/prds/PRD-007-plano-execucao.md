---
id: PRD-007-plano-execucao
title: Plano de Execução — PRD-007 Curso Narrado Sincronizado
type: plan
status: aguardando aprovação
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-30
updated: 2026-07-30
depends_on:
  - PRD-007-curso-narrado-sincronizado
  - PRD-007-arquitetura-leitor-narrado
related:
  - ROADMAP
  - DECISIONS
  - KNOWN_ISSUES
---

# Plano de Execução — PRD-007

> **Navegação:** [[PRD-007-curso-narrado-sincronizado]] (produto) ·
> [[PRD-007-arquitetura-leitor-narrado]] (técnica) · [[MODULO-0-bem-vindo]] (conteúdo da aula) ·
> [[DECISIONS]] · [[KNOWN_ISSUES]] · [[ROADMAP]] · [[TIMELINE]] ·
> [[PRD-006-plano-execucao]] (padrão de plano que funcionou)

> **Escopo: uma aula.** A aula 0.1 do Profissional 360, ponta a ponta (D-023). Nada além dela.
>
> **Nenhuma fase começa sem OK explícito do Felipe.** Cada fase tem trava própria. "Aprovei a fase 3"
> não aprova a fase 4.

## Regras que valem para todas as fases

- **Commit no fim de cada fase**, com `git status` antes para não subir lixo de build. Rollback de código
  = reverter o commit da fase.
- **Build de produção (`npm run build`) antes de fechar qualquer fase** que toque em código. Build limpo
  não prova roteamento em produção (aprendizado do incidente 404), mas build quebrado bloqueia.
- **Push e deploy exigem confirmação literal do Felipe**, separada da aprovação da fase.
- **Mudança de banco não roda por MCP** (KI-20: MCP Supabase não alcança o projeto `xomtfkbvathddfpbknyo`).
  Vai pelo SQL Editor com o Felipe, ou pela Management API com PAT da conta smarthome. Query com
  acentuação nunca inline no Bash (KI-17b) — heredoc ou arquivo.
- **Hooks novos nascem com `user.id` no `queryKey`** (KI-22/KI-27). Sem exceção.
- **Nenhuma linha do texto da aula muda depois da gravação** (KI-23).

---

## Fase 0 — Conteúdo pronto (Felipe, sem código) ✅ CONCLUÍDA (30/07/2026)

**Objetivo:** ter o insumo da aula 0.1 antes de qualquer implementação.

| Passo | Responsável |
|---|---|
| Revisar o texto da aula 0.1 palavra por palavra em [[MODULO-0-bem-vindo]] | Felipe |
| Confirmar os 📌 (credenciais: Nível 8, 3 milhões de visualizações, 50+ projetos) | Felipe |
| Gravar a narração da 0.1 | Felipe |
| Entregar o arquivo de áudio (qualquer formato que o ffmpeg leia) | Felipe |

**Critério de aceite:** texto congelado + áudio gravado da versão congelada.
**Rollback:** não se aplica.
**Trava:** sem áudio e texto final, as fases 2 em diante não têm o que processar.

**Resultado:** Felipe narrou livre em cima do roteiro (não seguiu palavra por palavra) e entregou
`TEMP/profisssaooo/Aula 0.1.m4a` (12min19s). Texto final ajustado para bater com a gravação e já
atualizado em [[MODULO-0-bem-vindo]] — ver nota de proveniência na própria seção da Aula 0.1. Os 📌
antigos (3 milhões/50+ projetos) não aparecem mais literalmente no texto novo; a versão gravada fala em
termos gerais ("milhões de visualizações", "dezenas de projetos").

---

## Fase 1 — Teste do Android ✅ CONCLUÍDA (30/07/2026)

**Objetivo:** fechar D-021 com dado real, não com suposição.

Executado pelo Felipe no próprio celular (Chrome Android), com os 8 min de narração do post
`site-maior-ativo-era-ia` que já está no ar. **Todos os cenários passaram**, incluindo o mais rigoroso
(economia de bateria ligada): áudio sobreviveu à tela apagada por 2 min, controles apareceram na tela de
bloqueio, e a troca para outro app não interrompeu nem desalinhou o destaque ao voltar.

**Resultado:** [[DECISIONS]] D-021 fechada — **PWA aprovada, Capacitor fora do escopo.** A Fase 6 encolheu
(ver abaixo) e nenhuma fase segue travada.

**Observação a reverificar na Fase 6:** o retorno correto do destaque após a troca de app foi reportado
pelo Felipe, não medido. Como o comportamento depende de recalcular pela posição do áudio, vale confirmar
dentro da Academy, com aula real, antes de fechar o critério 5.

---

## Fase 2 — Pipeline e artefatos da aula (sem tocar no app)

**Objetivo:** transformar texto + áudio nos três artefatos da aula: conteúdo estruturado, MP3 e mapa de
sincronização. Nenhuma alteração na aplicação nesta fase.

**Escopo:**
- Script que recebe o texto da aula, extrai o texto narrável na ordem, quebra em frases e gera o `.txt`
  que o Aeneas espera.
- Conversão do áudio para MP3 (`ffmpeg`, comando no playbook).
- Alinhamento com Aeneas no Docker (parâmetros no [[NARRACAO-SINCRONIZADA-BLOG]]).
- Script que consome o `syncmap.json` e produz fragmentos + mapa bloco→frases, **automaticamente**
  (D-020, elimina o passo manual).
- Onde o script vive: `scripts/` do repo do site, junto dos scripts de build já existentes.

**Critério de aceite:**
- contagem de fragmentos gerados = contagem de frases do texto;
- `end` do último fragmento = duração do MP3 (tolerância de 1s);
- mapa cobre todos os blocos narráveis, nenhum bloco de título dentro dele;
- rodar o script duas vezes no mesmo insumo dá saída idêntica.

**Teste:** rodar o script sobre o post do blog que já está no ar e comparar com o mapa que foi montado à
mão. Se bater, o script está correto — é o único caso com gabarito conhecido.

**Rollback:** apagar os artefatos gerados. Nenhum efeito no app.
**Trava:** aprovação do Felipe sobre a saída antes de gravar isso no banco.

**Resultado (30/07/2026):** os 3 artefatos da aula 0.1 gerados em `TEMP/modulo/output/`:
`aula-0.1.mp3` (12min18.9s), `blocks.json` (82 parágrafos), `fragments.txt` (97 frases) e
`aula-0.1-final.json` (fragmentos com begin/end + blockMap). Critérios de aceite batidos: 97
fragmentos = 97 frases do texto; último `end` (738.88s) contra duração real do MP3 (738.89s, diferença
de 0.01s); script determinístico (rodado 2x, saída idêntica); todos os 82 blocos são `paragraph`, nenhum
título entrou no mapa.
**Pendente:** (1) o teste-gabarito contra o blog (`site-maior-ativo-era-ia`) ainda não foi rodado — só
validei pelos critérios numéricos acima, não pelo caso com gabarito manual conhecido; (2) script está em
Python solto no TEMP, ainda não portado pra `scripts/` do repo do site como o escopo pede — migração faz
sentido junto da Fase 3, quando o formato de `content_blocks`/`sync_map` no banco estiver definido.

---

## Fase 3 — Banco e armazenamento protegido ✅ CONCLUÍDA (30/07/2026)

**Objetivo:** ter onde guardar a aula narrada, com o gate de matrícula funcionando.

**Escopo:**
- Colunas novas em `lessons` (formato, conteúdo estruturado, caminho do áudio, mapa) — nomes finais
  definidos na aprovação, desenho no §3 da arquitetura.
- Colunas novas em `lesson_progress` (última posição, tempo ouvido).
- Gate do conteúdo pago: view com exigência de matrícula, padrão `prompts_gated`/`skills_gated`
  (recomendação do §3) ou tabela separada, conforme a decisão do Felipe.
- Bucket privado do áudio + policy de leitura por matrícula, padrão `materials_read_enrolled`.
- Upload do MP3 da 0.1 no caminho `{course_id}/{lesson_id}/`.
- Gravação dos artefatos da Fase 2 na aula.

**Critério de aceite (é aqui que a segurança se prova):**
1. aluno **sem** matrícula: não lê o texto, não lê o mapa, não obtém URL do áudio;
2. aluno **com** matrícula: lê os três;
3. anônimo: não lê nada do conteúdo pago, mas o catálogo (título/ordem) continua visível;
4. `format` default mantém **todas** as aulas de vídeo existentes funcionando sem alteração.

**Teste:** consulta direta ao banco com sessão de cada perfil, mais tentativa de baixar o áudio sem
sessão. Não presumir a partir da policy escrita — executar (critério de aceite 6 do PRD).

**Rollback:** colunas novas são aditivas; remover a view e as policies restaura o estado anterior.
Atenção: `drop column` apaga o conteúdo já gravado. Antes do drop, exportar.

**Decisões aprovadas por Felipe (30/07/2026):** nomes de coluna conforme §3 da arquitetura · gate por
**view** (`lessons_gated`, mesmo padrão de `prompts_gated`/`skills_gated`) · áudio no bucket
**`course-materials`** já existente (sem bucket novo, reusa a policy `materials_read_enrolled`).
**Trava:** aprovação dos nomes de coluna e da escolha view vs. tabela **antes** de rodar o SQL — cumprida.

**Resultado (30/07/2026):** Felipe rodou os dois SQLs no SQL Editor
([[PRD-007-fase3-sql|PRD-007-fase3-sql.sql]] e
[[PRD-007-fase3-update-aula01|PRD-007-fase3-update-aula01.sql]]) e subiu o áudio pelo painel do Storage
(tentativa automática via Management API foi bloqueada pelo classificador de segurança do Claude Code,
tanto pra o DDL quanto pro UPDATE — confirmado em duas tentativas, não insisti numa terceira). Tudo
**verificado por leitura direta no banco**, não presumido:
- `information_schema` confirma as 6 colunas novas + a view `lessons_gated`;
- a aula 0.1 (`lesson_id` `37c49e32-…`) tem `format = 'narrated'`, `audio_path` preenchido, 82 blocos em
  `content_blocks`, fragmentos presentes em `sync_map`;
- `storage.objects` confirma `aula-0.1.mp3` no bucket `course-materials`, 10.301.188 bytes — bate exato
  com o arquivo gerado na Fase 2.
**Pendente:** teste de acesso real (aluno matriculado vs. sem matrícula) só é possível depois que a Fase 5
tiver o leitor renderizando a aula — hoje não existe UI nenhuma consumindo essas colunas ainda.

---

## Fase 4 — Leitor genérico (refatoração, sem feature nova) ✅ CONCLUÍDA (30/07/2026)

**Objetivo:** tirar a lógica de highlight e auto-scroll de dentro do `BlogPost.tsx` para um componente
reutilizável, **sem mudar nada visualmente no blog**.

**Escopo:** extrair `renderBlock`/`narration`/`data-frag`, o `useEffect` de `scrollIntoView` e a proteção
de 1,5s contra scroll manual. Blog passa a consumir o componente extraído.

**Cuidado que não pode ser perdido:** os `<span>` usam o texto **já processado pelo pipeline**, nunca uma
requebra do texto original por regex em runtime. É o que garante que o destaque bate com o áudio.

**Critério de aceite:** o post do blog em produção se comporta **idêntico** a antes — destaque,
auto-scroll, proteção de scroll manual, seek pela waveform.
**Teste:** verificação lado a lado no preview, com o áudio rodando de ponta a ponta em um trecho.
**Rollback:** reverter o commit. Fase isolada de propósito, justamente para o rollback ser limpo.
**Trava:** nenhuma regressão no blog aceita. Se houver, a fase não fecha.

**Resultado (30/07/2026):** extraído só o que é narração/highlight — não o `renderBlock` inteiro (ele
continua no `BlogPost.tsx`, tratando os ~12 tipos de bloco do blog que não têm nada a ver com narração).
Dois arquivos novos, consumidos pelo blog e prontos pra Academy reusar na Fase 5:
- `src/components/narration/NarratedSpans.tsx` — `NarrationContext`/`NarrationFragment` (tipos),
  `narratedSpanClassName` (a classe do destaque, antes duplicada entre o parágrafo/highlight e a lista) e
  `renderNarratedSpans` (recebe `formatText` como parâmetro em vez de importar o `boldify` do blog, pra não
  acoplar a peça genérica ao processamento de texto específico do blog).
- `src/hooks/useNarrationAutoScroll.ts` — o par de `useEffect` (marca scroll manual + `scrollIntoView`
  com a trava de 1,5s), extraído 1:1, mesma lógica e dependências.

`BlogPost.tsx` ficou 44 linhas mais enxuto; `renderBlock` e o `useEffect` de SEO/tracking não foram
tocados. Build (`npm run build`) e lint (`eslint`) limpos — os 2 warnings de `exhaustive-deps` já existiam
antes, em efeitos que esta fase não tocou. Verificado no preview local (`/blog/site-maior-ativo-era-ia`,
65 fragmentos, bate com o commit `34cd211` já testado): forcei o `<audio>` pra 3 pontos do áudio via
`timeupdate` sintético e confirmei os 3 comportamentos — destaque aplica no fragmento certo com
auto-scroll (`scrollY` 0 → 642), um `wheel` sintético bloqueia o auto-scroll por 1,5s (`scrollY` ficou em
0 mesmo com fragmento novo ativo), e o auto-scroll retoma sozinho depois da janela de proteção (`scrollY`
974 após esperar 1,8s). Não naveguei o áudio ponta a ponta em tempo real — a simulação cobre os 3 estados
do teste prescrito (ativação, bloqueio, retomada) sem esperar 12 minutos de narração.
**Commit pushado pro `main`** (`63ab090`, confirmação do Felipe em 30/07/2026).

---

## Fase 5 — A aula narrada na Academy

> **Plano detalhado, passo a passo: [[PRD-007-fase5-plano]].** SQL pronto para rodar:
> [[PRD-007-fase5-sql|PRD-007-fase5-sql.sql]]. Esta seção é o resumo; o documento separado tem o
> detalhe arquivo por arquivo, os 8 erros achados na revisão de 30/07/2026 e o roteiro de verificação.

**Objetivo:** aluno matriculado abre a 0.1 e a experiência funciona.

**Trava nova, descoberta na revisão (30/07/2026) — leia antes de começar:** o Passo 0 do
[[PRD-007-fase5-plano]] (SQL) é **pré-requisito absoluto**. A view `lessons_gated` da Fase 3 é
`security_invoker = true`, então a RLS de `lessons`/`modules` continua valendo por baixo — e ela exige
curso publicado. Com o Profissional 360 em `published = false`, a view devolve **zero linhas** para o
aluno matriculado. Sem o SQL, a Fase 5 pareceria funcionar para o admin e estaria quebrada para todo
aluno pagante. Detalhe em KI-31.

**Escopo:**
- `useCourse` estendido para trazer os campos novos; a página da aula escolhe o leitor por `format`.
- Áudio via URL assinada, com renovação antes de expirar (padrão do `LessonPlayer.tsx`, KI-24).
- Controles que faltam: velocidade, ±15s, clique na frase para seek.
- Posição salva + "Continuar de onde parei".
- Escuta real: acumular por avanço contínuo do áudio, persistir a cada ~15s e ao sair; aula conclui ao
  atingir o percentual definido.
- Admin: o mínimo para cadastrar/atualizar uma aula narrada.

**Critério de aceite:** os 10 critérios do §14 do PRD, exceto o 5 (segundo plano, que é a Fase 6).
**Teste:** percurso completo no preview com aluno matriculado — abrir, ouvir, ver o destaque acompanhar,
mudar velocidade, clicar numa frase, sair no meio, voltar e cair no ponto certo, concluir por escuta.
Mais o caso negativo: a mesma URL sem matrícula. **O teste com aluno matriculado não-admin é obrigatório
e não pode ser substituído pelo teste como admin** — é justamente onde o KI-31 se esconde.
**Rollback:** reverter o commit; dados de progresso permanecem, inofensivos. Atenção: o backfill de
`lesson_progress` do Passo 0 não tem rollback automático (o SQL registra o estado anterior antes).
**Trava:** (1) Felipe rodar o SQL do Passo 0; (2) aprovação do Felipe sobre a experiência antes da Fase 6.

**Status (30/07/2026):** planejada e revisada, **nada implementado**. A revisão encontrou 8 problemas — 3
graves, sendo dois deles bugs que já existem em produção hoje, independentes desta fase (KI-30 vazamento
de conteúdo pago pelo `useCourse.ts`; KI-31 aluno de pré-venda não enxerga aula nenhuma). Todos estão
documentados com correção em [[PRD-007-fase5-plano]].

---

## Fase 6 — Metadados e instalabilidade (escopo reduzido após D-021)

**Objetivo:** confirmar o segundo plano **dentro da Academy**, com áudio protegido, e deixar os controles
do sistema com cara de aula em vez de rótulo genérico do navegador.

O teste da Fase 1 já provou que o áudio em segundo plano funciona sem nada implementado. Então esta fase
deixou de ser "fazer funcionar" e passou a ser acabamento:

- **Media Session API:** título da aula, nome do curso e capa nos controles do sistema. Sem isso funciona,
  mas aparece "realvisionmaps.com" na tela de bloqueio em vez do nome da aula.
- **`manifest.json` + ícones:** torna o site instalável no Android. É o que dá o ícone na tela inicial.
- **Service worker: fora do escopo.** O áudio em segundo plano não depende dele (provado), offline não está
  no MVP, e ele carrega o risco do KI-26 de servir build velha no site inteiro. Só entra se a
  instalabilidade exigir, e nesse caso com escopo estreito e política de cache explícita.
- **Capacitor: descartado** (D-021).

**Critério de aceite:** critério 5 do §14 verificado **na aula real** — áudio protegido tocando com a tela
apagada, e o destaque voltando ao ponto certo depois de trocar de app (a parte reportada mas não medida na
Fase 1). Aparelho real, não emulador.
**Rollback:** reverter o commit. Sem service worker, o rollback é limpo — é parte do motivo de deixá-lo
fora.
**Trava:** nenhuma pendente. Depende só da Fase 5 estar aprovada.

---

## Fase 7 — Verificação final e publicação

**Objetivo:** fechar o MVP com prova, não com impressão.

**Escopo:**
- percurso completo no desktop e no celular;
- caso negativo de segurança repetido (sem matrícula não acessa);
- `npm run build` limpo;
- rota testada **digitando a URL direto** e com F5, não só navegando por dentro (regra do incidente 404);
- documentação atualizada: [[TIMELINE]], [[CHANGELOG]], [[CONTEXT]], e os aprendizados em
  [[METHODOLOGY_LEARNINGS]].

**Critério de aceite:** os 10 critérios do §14 do PRD, todos verificados com evidência.
**Trava:** **publicação em produção exige confirmação literal do Felipe**, separada de tudo o que foi
aprovado antes.

---

## Ordem e paralelismo

```
Fase 1 (teste Android) ✅ CONCLUÍDA

Fase 0 (conteúdo, Felipe) ─→ Fase 2 (pipeline) → Fase 3 (banco) → Fase 5 (aula) ─┐
                     Fase 4 (leitor genérico) ───────────────────────────────────┤
                                                          Fase 6 (metadados/PWA) ┤
                                                                                 └→ Fase 7
```

A Fase 4 é independente das fases 0 a 3 e pode ser feita a qualquer momento antes da 5 — é a única que dá
para começar **agora**, sem esperar o áudio do Felipe, porque só mexe em código que já existe.

## O que este plano deliberadamente não faz

- Aulas 0.2, 0.3, 0.4 e os demais módulos.
- Tela de listagem ou navegação entre aulas narradas.
- Importação de aula em lote, automação de Aeneas no painel.
- XP, badges, missões, sequência de dias.
- Funcionamento offline.
- Stripe, i18n da Academy.
- Correção do KI-15 (divergência de cor) e do KI-27 nos hooks antigos da Comunidade — registrados, fora
  de escopo.

## Documentos relacionados
- [[PRD-007-curso-narrado-sincronizado]] · [[PRD-007-arquitetura-leitor-narrado]]
- [[DECISIONS]] · [[KNOWN_ISSUES]] · [[ROADMAP]] · [[CONTEXT]]
- [[NARRACAO-SINCRONIZADA-BLOG]] (fora deste vault)
