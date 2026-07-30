---
id: PRD-007
title: Curso Narrado Sincronizado — Real Vision Academy
type: prd
status: em revisão
project: real-vision-academy
phase: discovery
owner: master-visionair
created: 2026-07-29
updated: 2026-07-30
depends_on:
  - CONTEXT
  - ARCHITECTURE
related:
  - MASTER_PRD
  - DECISIONS
  - ROADMAP
  - KNOWN_ISSUES
  - PRD-002-modelo-de-dados
  - PRD-003-area-de-membros
  - PRD-007-arquitetura-leitor-narrado
---

# PRD-007 — Curso Narrado Sincronizado

> **Navegação:** [[CONTEXT]] (estado atual) · [[PRD-007-arquitetura-leitor-narrado]] (técnica) ·
> [[PRD-007-plano-execucao]] (fases) · [[DECISIONS]] (D-016 a D-023) · [[KNOWN_ISSUES]] (KI-23 a KI-28) ·
> [[ROADMAP]] (Fase 7) · [[MODULO-0-bem-vindo]] (conteúdo) · [[NARRACAO-SINCRONIZADA-BLOG]] (pipeline)

> Versão final para revisão do Felipe. Substitui o rascunho inicial (preservado em
> `TEMP/Nova pasta/PRD-007-CURSO-NARRADO-SINCRONIZADO(1).md`), incorporando as decisões da sessão de
> 30/07/2026 e os achados da auditoria do código real. Arquitetura técnica em
> [[PRD-007-arquitetura-leitor-narrado]].

## 1. Visão

Uma segunda modalidade de aula dentro da Academy: **texto estruturado + áudio narrado pelo Felipe**, com
a frase sendo dita destacada e acompanhada automaticamente na tela — o efeito que já está no ar no blog
(RV Voice Sync), agora aplicado a conteúdo **pago e protegido**.

Funciona no desktop, no navegador do celular e, se a arquitetura confirmar, como aplicativo instalável no
Android — sempre com o mesmo login, identidade visual e controle de matrícula que a Academy já tem.

Primeiro produto: **Profissional 360**, Módulo 0.

## 2. Decisão de posicionamento: coexistência, não substituição

Vídeo e narrado **coexistem** (D-016). O Bunny Stream continua sendo a entrega de vídeo — a conta está
paga, configurada (Library `707363`) e validada em produção. O narrado é formato novo ao lado.

O encaixe natural, que orienta a produção de conteúdo:

| Tipo de aula | Formato | Por quê |
|---|---|---|
| Mentalidade, mercado, método, precificação | **Narrado** | Não há tela pra mostrar. Ver o Felipe falando não agrega — ouvir enquanto lê, sim |
| Ferramenta na prática (GMN, Pano2VR, Claude Code, drone) | **Vídeo screencast** | Ver a tela **é** o valor da aula |

Consequência: cada aula tem um formato declarado, e a Academy sabe renderizar os dois.

## 3. Objetivo do MVP

Um aluno matriculado consegue:

- abrir o Profissional 360 e escolher uma aula narrada;
- ler o conteúdo enquanto escuta a voz do Felipe;
- ver a frase narrada destacada, com a tela acompanhando sozinha;
- pausar, retomar, avançar, voltar e mudar a velocidade;
- clicar numa frase para o áudio ir até ali;
- fechar e voltar de onde parou;
- ver o progresso do curso, com a aula contando como concluída só se ele realmente ouviu.

## 4. Experiência de leitura e áudio

Controles do leitor:

- play / pause;
- avançar e voltar 15s;
- barra de progresso com tempo atual e duração;
- controle de velocidade;
- destaque da frase sendo narrada;
- rolagem automática mantendo a frase visível, **com a proteção que já existe no blog**: se o aluno mexeu
  a tela há menos de 1,5s, o auto-scroll cede a vez em vez de brigar com ele;
- clique na frase move o áudio para aquele trecho;
- salvamento automático da posição + botão "Continuar de onde parei".

Narração é a **voz real do Felipe**. Sem TTS, sem voz artificial no MVP.

## 5. Reprodução em segundo plano — resolvido: PWA

Requisito: no Android, o áudio continua tocando com a tela desligada, com o app em segundo plano, e
oferece controles na tela de bloqueio / notificações.

**Verificado em aparelho real em 30/07/2026** (D-021). Teste de 10 min no celular do Felipe, usando os
8 min de narração do post que já está no ar. Todos os cenários passaram: tela apagada por 2 min, controles
na tela de bloqueio, troca de app e volta com o destaque no lugar certo, e o mesmo com **economia de
bateria ligada**.

**Decisão: PWA + Media Session API.** Wrapper Capacitor descartado — não resolve problema que exista.

Isso reduz o escopo do trabalho: os controles no sistema já aparecem sem nada implementado, então falta
`manifest.json` + ícones (instalabilidade) e Media Session apenas para os metadados (título e capa da aula
em vez do rótulo genérico do navegador). **Service worker fica fora** — o teste provou que o áudio em
segundo plano não depende dele, offline está fora do MVP, e ele carrega o risco do KI-26.

**Auditoria:** o site **não tem PWA nenhuma hoje** — sem `manifest.json`, sem service worker, sem
`vite-plugin-pwa`. Não é ajuste, é construção nova, mas menor do que o rascunho supunha.

## 6. Conteúdo e sincronização

Fonte do texto: **os roteiros do curso** (D-017), adaptados para leitura — não transcrição de fala.
PDF, se aparecer, serve como fonte de extração ou material complementar; nunca como tela de leitura.

Pipeline (detalhe e comandos em [[NARRACAO-SINCRONIZADA-BLOG]], já validado no blog):

1. escrever/adaptar o texto da aula;
2. organizar em blocos;
3. Felipe grava a narração;
4. alinhamento por frase com Aeneas via Docker;
5. **geração automática do mapa de sincronização por script** (D-020 — hoje esse passo é manual e é o
   maior risco de erro humano do pipeline);
6. publicar texto, áudio e mapa;
7. validar a aula antes de liberar.

Granularidade: **por frase**, decisão já tomada e validada no blog.

## 7. Onde o conteúdo mora — restrição de segurança

**O texto pago vai para o banco, nunca para arquivo do repositório** (D-018).

No blog o texto vive em `src/data/` porque é conteúdo público. Em curso pago isso seria conteúdo
baixável sem pagar — qualquer pessoa lê o código-fonte do site. O texto da aula, o áudio e o mapa de
sincronização ficam protegidos por matrícula: banco com RLS para texto e mapa, bucket privado com URL
assinada para o áudio, reusando o padrão já validado em D-010.

Isso não é preferência de arquitetura. É o que impede o produto de ser pirateado no primeiro dia.

## 8. Produção de conteúdo

No MVP, **não** se roda Aeneas nem Docker dentro do painel admin. O fluxo técnico acontece fora, no
Claude Code, e a Academy recebe conteúdo já processado. O painel admin ganha só o mínimo necessário para
cadastrar uma aula narrada.

Automação de upload e sincronização no painel fica fora do escopo até uma aula real provar a experiência.

## 9. Gamificação — escopo mínimo

Escopo do MVP (D-019):

- progresso por módulo e por curso;
- aula marcada como concluída **apenas se o aluno ouviu a maior parte do áudio**.

A segunda regra é o ponto que impede a gamificação de virar decoração vazia: deixar o áudio tocando de
fundo não conclui a aula. Exige registrar escuta real, não só um clique em "concluí".

Fora do MVP: XP, badges, missões, sequência de dias, recompensas. Entram depois que a experiência de
leitura narrada estiver validada.

**Auditoria:** não existe nada de gamificação no sistema hoje. O `lesson_progress` atual é só
`completed` / `completed_at`, sem posição e sem noção de quanto foi ouvido.

## 10. Stack — confirmada após auditoria do código

A stack sugerida no rascunho **está correta**, porque é a que o projeto já usa. Confirmado no repo:
React + Vite + TypeScript, Tailwind + shadcn/ui, React Router v6, TanStack React Query, Supabase
(auth + banco + Storage + RLS), Vercel, framer-motion. Aeneas em Docker para o alinhamento.

Duas correções ao rascunho:

- **PWA não existe** e precisa ser construída (§5) — não é "ativar", é implementar.
- **Capacitor fica fora** até o teste do Android reprovar a PWA. Não entra "por precaução".

Nada novo a instalar para o leitor em si: o player do blog roda com `<audio>` nativo, sem biblioteca de
áudio.

## 11. Dados por aula — o que falta

O modelo atual (`courses` → `modules` → `lessons` → `materials`, PRD-002) é **estendido, não duplicado**.
Nenhum catálogo paralelo.

| Já existe | Falta |
|---|---|
| título, ordem, módulo, duração, publicação, matrícula | formato da aula (vídeo / narrado) |
| `video_ref` para o vídeo Bunny | conteúdo estruturado da aula |
| `lesson_progress` com concluída + data | caminho do áudio protegido |
| | mapa de sincronização por frase |
| | última posição do aluno |
| | quanto do áudio foi realmente ouvido |

Desenho das colunas em [[PRD-007-arquitetura-leitor-narrado]].

## 12. Fora do MVP

- Upload de documentos pelo aluno; leitor genérico de PDF.
- Voz artificial; sincronização palavra por palavra.
- Aeneas automatizado dentro do painel.
- **Aulas 0.2, 0.3 e 0.4** (D-023) e os módulos 1 a 5 em formato narrado — só depois da prova aprovada.
- Listagem/navegação entre aulas narradas, importação de aula em lote.
- Aplicativo nativo separado; publicação na Play Store.
- Gamificação além do mínimo do §9.
- Funcionamento offline completo.
- Stripe, i18n da Academy.

## 13. Prova inicial — uma aula só

**Aula 0.1 — "O que é um Profissional 360°"**, do Módulo 0 do Profissional 360 (D-022, escopo reduzido
em D-023).

O Módulo 0 é o início real do curso e é conteúdo sem tela pra mostrar, o caso em que o formato narrado é
melhor que vídeo e não apenas diferente. Dentro dele, a **0.1 é a única aula do MVP**: é ela que prova
se o app funciona. As outras três (0.2 mercado, 0.3 como estudar, 0.4 a meta) só entram depois da
experiência validada e aprovada pelo Felipe.

Consequência prática do escopo de uma aula: nada de tela de listagem de aulas narradas, nada de
navegação entre aulas do módulo, nada de importação em lote. Uma aula, ponta a ponta, funcionando.

**Conteúdo:** o texto das 4 aulas do Módulo 0 já está escrito e aguardando revisão em
[[MODULO-0-bem-vindo]] (grade em [[02-profissional-360/CONCEITO|CONCEITO]], contexto de marca em
[[CONTEXTO-PARA-IA-ROTEIRISTA]]).
Para o MVP só a 0.1 precisa estar revisada
e gravada. O texto é final palavra por palavra, porque é simultaneamente o que o Felipe lê na gravação,
o que aparece na tela e o que o alinhamento sincroniza.

## 14. Critérios de aceite

O MVP está validado quando:

1. um aluno matriculado abre uma aula narrada no desktop e no celular;
2. texto e áudio ficam sincronizados por frase, com destaque e auto-scroll;
3. os controles funcionam, incluindo velocidade e clique na frase para seek;
4. a última posição é salva e o "Continuar de onde parei" funciona;
5. o áudio continua tocando com a tela desligada no Android — arquitetura já aprovada em D-021 (PWA),
   falta confirmar dentro da Academy com áudio protegido;
6. quem não tem matrícula não acessa o texto nem o áudio — verificado, não presumido;
7. o visual segue a identidade da Real Vision;
8. a aula só conta como concluída com escuta real;
9. a aula 0.1 rodou ponta a ponta, com conteúdo real (D-023);
10. build limpo, e o fluxo principal documentado.

## 15. Processo obrigatório antes da execução

1. leitura da documentação ✅ (30/07/2026)
2. auditoria do sistema atual ✅ (30/07/2026)
3. perguntas ao Felipe ✅
4. decisões registradas → [[DECISIONS]] D-016 a D-022
5. plano de documentação aprovado ✅
6. documentação técnica escrita e aprovada ← **etapa atual**
7. roteiro do Módulo 0 escrito e aprovado
8. teste do Android → fecha D-021
9. plano de execução por fases
10. **OK explícito do Felipe** → só então implementação

Enquanto o passo 10 não acontecer: nenhum código, nenhuma mudança de schema, nenhuma dependência
instalada, nenhum deploy.

## Documentos relacionados
- [[PRD-007-arquitetura-leitor-narrado]]
- [[CONTEXT]] · [[ARCHITECTURE]] · [[DECISIONS]] · [[KNOWN_ISSUES]] · [[ROADMAP]]
- [[PRD-002-modelo-de-dados]] · [[PRD-003-area-de-membros]]
- [[NARRACAO-SINCRONIZADA-BLOG]] (playbook do RV Voice Sync, fora deste vault)
