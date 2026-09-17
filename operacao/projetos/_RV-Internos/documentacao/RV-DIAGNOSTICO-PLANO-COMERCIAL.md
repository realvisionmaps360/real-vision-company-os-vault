# Plano — Auditoria Comercial aplicada no Site v2 (vender sites para pousadas)

Hub: [[RV-DIAGNOSTICO-PROJETO]] · Auditoria: [[AUDITORIA-COMERCIAL-11-09-26]]

> Criado em 17/09/2026 no notebook do Felipe. Execução no notebook da Romana.
> Nome curto pra retomar: **"RV Diagnóstico — fase comercial"**.

## Contexto

Em 11/09/2026 saíram dois relatórios. O de medição (PostHog) virou o projeto RV Diagnóstico e está no ar no site v2. O **comercial** (`auditoria_realvisionmaps_2026-09-11.md`) nunca entrou no vault e não foi aplicado. Por isso a home ainda vende "Sistemas que trabalham enquanto você dorme" com o Sócio Digital no centro.

Decisão do Felipe (17/09): **o público inicial é pousadas e casas de temporada**. A oferta principal passa a ser "site próprio pra receber pedido de reserva pelo WhatsApp". O Sócio Digital sai da home.

Objetivo: aplicar a auditoria no **site v2** (https://real-vision-site-v2.vercel.app), testar no navegador com agentes revisores e só então propor a ida pro site oficial.

## Regras fixas (valem pra toda a execução)

- Publicar no **site v2** (branch `v2-posthog`) sem pedir. **realvisionmaps.com, `main`, DNS e PostHog 518429 só com "pode fazer" do Felipe.**
- **Nunca inventar dado.** Números, preços, prazos e resultados de cliente só se estiverem no vault. Se faltar, marcar `📌 PERGUNTAR FELIPE` e seguir com o resto.
- **Pesquisar na internet sempre que não tiver certeza** de como algo funciona (ex: regra do Google pra título, API do Resend, comportamento do Vite/React Router). Usar WebSearch/WebFetch ou `context7` pra biblioteca. Nunca supor sintaxe.
- Texto sem travessão, sem jargão ("arquitetura", "multi-agentes", "Company OS", "ativos"). Revisar contra `contexto/VOZ.md`.
- Mudanças cirúrgicas. Nada de apagar o Sócio Digital do site: ele sai da home e continua existindo em outra página.
- Antes de mexer: `git pull` no repo do v2 e `git fetch` antes de `git status`.
- **Resumo pro Felipe a cada passo.** Sempre que começar ou terminar alguma coisa (cada etapa, cada rodada de agentes, cada teste), mandar 1 a 3 frases dizendo o que está acontecendo. Linguagem simples, sem termo técnico. Exemplo: "Consertei o botão da loja que levava pra página de erro. Agora estou testando no celular e no computador." Nada de nome de arquivo, commit ou comando nesses resumos.

## Onde está cada coisa

Repo: `operacao/projetos/_RV-Internos/sites/real-vision-site-v2` (branch `v2-posthog`)

| O quê | Arquivo |
|---|---|
| Rotas | `src/App.tsx` (PT linhas ~100-117; EN/DE ~66-77) |
| Home | `src/pages/Index.tsx` → `src/components/home/` (`HomeHero`, `CredibilityBar`, `SocioDigital`, `ServicesGrid`, `HomePortfolio`, `HomeTestimonials`, `FitCheck`, `Founder`, `HomeFAQ`, `HomeContactForm`, `HomeFooter`/`LojaCTA`) |
| Textos | `src/locales/{pt,en,de}/translation.json` (home usa `t()`); serviços em `src/data/services.ts` |
| Link quebrado `/shop` | `src/components/servicos/items/ServicoEstrutura.tsx:56`, `ServicoTour.tsx:81` |
| "em construção" | `src/data/services.ts:114` e `:129` |
| Números soltos | `CredibilityBar.tsx:8-9`, `HomeHero.tsx:219,221`, `sections/portfolio/PortfolioMetrics.tsx:8,11`, `pages/SiteLP.tsx:34-35`, en/de `translation.json:154` |
| Título/descrição por página | Manual com `document.title` (modelo: `src/pages/Services.tsx:35-53`). Resto cai no `index.html` |
| Formulário da home | `HomeContactForm.tsx:28` **só faz console.log — lead se perde** |
| Formulário de contato | `src/pages/Contact.tsx:100` → `api/contact.ts` (email via Resend) |
| Loja | `src/data/products.ts` (rota `/loja/:slug`) |
| Portfólio | `src/data/projects.ts` (Vila dos Corais) |
| Testes | `npm run build`, `npm run test` (vitest), `tests/smoke.mjs`; Playwright instalado sem config |
| Auditoria original | `C:\Users\Felipe Garcia\Downloads\auditoria_realvisionmaps_2026-09-11.md` (copiar pro vault na Etapa 0) |

## Etapas

Cada etapa: implementar → loop de validação (ver seção abaixo) → commit na `v2-posthog` → deploy v2 → registrar no `RV-DIAGNOSTICO-PROJETO.md`.

### Etapa 0 — Levar o plano e a auditoria pro notebook da Romana (feito no notebook do Felipe)
- Copiar este plano para `operacao/projetos/_RV-Internos/documentacao/RV-DIAGNOSTICO-PLANO-COMERCIAL.md`.
- Copiar a auditoria para `operacao/projetos/_RV-Internos/documentacao/AUDITORIA-COMERCIAL-11-09-26.md`.
- Linkar os dois em `RV-DIAGNOSTICO-PROJETO.md` e na skill `skills/rv-diagnostico/SKILL.md` (seção "fase comercial").
- Commit + push do vault (só esses arquivos). No notebook da Romana: `git pull` e abrir `RV-DIAGNOSTICO-PLANO-COMERCIAL.md`.
- Verificar: arquivo aparece no notebook da Romana depois do pull.

### Etapa 1 — Consertos imediatos (sem decisão de copy)
Skills: `realvision`, `superpowers:systematic-debugging` se algo quebrar.
- `/shop` → `/loja/<slug do tour>` nos dois arquivos. Conferir todos os `href` comerciais (`grep -r 'href="/' src/components/servicos src/components/home`).
- Tirar "embed em construção" e "Galeria em construção" (`services.ts`): trocar por tour e fotos reais já publicados (portfólio) ou remover o bloco.
- **Formulário da home**: ligar em `/api/contact` igual ao `Contact.tsx` (reaproveitar a mesma chamada, não criar outra).
- Verificar: todos os botões da home e de `/servicos` abrem página útil; envio de teste marcado "TESTE" chega no email.

### Etapa 2 — Oferta e texto da nova home (pousadas)
Skills: `realvision` + `rv-copy` + `landing-page-copywriter` + `cro` + `humanizer` no final.
- Escrever primeiro em `documentacao/COPY-HOME-POUSADAS-v1.md` (não no código). Seguir a ordem da auditoria: público e resultado → demonstração → quando faz sentido → o que está incluído → casos → processo e prazo → investimento → dúvidas → convite ao diagnóstico.
- Direção de headline: "Site próprio para pousadas e casas de temporada receberem pedidos de reserva pelo WhatsApp." Prometer só o que a entrega garante (o canal, não o número de reservas).
- Preço, prazo e o que está incluído: puxar de `src/data/products.ts` e `contexto/EMPRESA.md`. O que não existir → `📌 PERGUNTAR FELIPE`.
- **Parar e mostrar a copy pro Felipe antes de codar.** Só segue com "pode seguir".

### Etapa 3 — Montar a nova home
Skills: `realvision` + `frontend-design` + `rv-design` + `motion` (só se precisar) + `vercel-react`. Seguir `contexto/DESIGN.md` (âmbar/dark, Bebas Neue + Inter + JetBrains Mono).
- `HomeHero`: nova promessa, público claro, um botão principal (diagnóstico). Visual com projeto real (Vila dos Corais) em vez de paisagem.
- Tirar `SocioDigital` da home (`Index.tsx`). O componente continua no código; criar rota `/socio-digital` usando ele (página própria). Link discreto no menu ou rodapé.
- Reordenar seções conforme a copy aprovada. Reduzir o menu (Formação e Loja de equipamentos em percurso próprio).
- Texto secundário mais legível (contraste).
- Textos novos em `locales/pt`. EN/DE: `rv-i18n` depois, numa etapa própria, pra não travar.

### Etapa 4 — Página de diagnóstico
Skills: `realvision` + `rv-copy` + `cro`.
- Nova rota `/diagnostico`: mesma promessa do botão, duração (30 min), o que será analisado, o que a pessoa recebe, próximo passo.
- Formulário curto: nome, WhatsApp, nome da pousada/cidade (confirmar campos com Felipe). Envia por `/api/contact` com origem "diagnostico".
- Evento PostHog `diagnostico_form_enviado` (padrão dos eventos já criados no v2; conferir docs PostHog antes).
- Todos os botões "diagnóstico grátis" apontam pra `/diagnostico`.

### Etapa 5 — Prova e consistência
Skills: `realvision` + `rv-copy` + `cro`.
- Três casos em destaque: Vila dos Corais (calculadora + pedido no WhatsApp), mais dois de hospedagem (sugestão: Casa dos Cajus, Vila Mandela). Formato: problema → o que foi feito → demonstração → efeito. Sem número inventado; sem medição = mostrar a entrega funcionando.
- Números: manter como estão. Remover só o "100% satisfeitos".
- Página do site na loja (`products.ts`): landing "a partir de R$ 500", institucional "a partir de R$ 1.500" (promoção de Natal), o que o preço base inclui, o que cada adicional resolve, custos recorrentes. Explicar diferença entre SEO incluso e SEO avançado.
- Promoção de Natal visível: faixa no topo, selo nos cards, menção na home. Texto e data de fim num único lugar pra trocar depois (Black Friday etc.). Data de fim: 📌 confirmar com Felipe.

### Etapa 6 — Próximo ciclo (depois das etapas 1-5 aprovadas)
- Título e descrição por página e por idioma (`marketing-seo`; confirmar recomendação atual do Google Search Central antes). Reaproveitar o padrão de `Services.tsx`, sem biblioteca nova.
- Tours da home carregando só quando visíveis (`loading="lazy"`), se ainda houver iframes.
- Blog: destacar posts de compra (`rv-blogpost` + `rv-intencao-busca`).
- Formação (`/profissional-360`): calendário, total parcelado (12 × R$ 97 = R$ 1.164), tirar "vídeo em breve" (`rv-academy`).
- EN/DE da nova home (`rv-i18n`).

### Etapa 6.5 — Estruturar o projeto no LBOS (uma vez só, antes de fechar)
Skills: `lbos` + `lbos-entrada` → `lbos-classificacao` → `lbos-impacto` → `lbos-atualizacao` (reler as skills antes, não confiar de memória).
- Rodar **uma vez**, depois das etapas 1-6 e antes da Etapa 7. Não registrar etapa por etapa.
- Criar o nó do projeto e ligar: decisões (público pousadas, preços de Natal, "100%" removido, Sócio Digital fora da home), casos (Vila dos Corais, Casa dos Cajus, Vila Mandela), promoção sazonal, pendências e a tarefa do tour do hotel na Itália.
- Apontar pros arquivos existentes (`RV-DIAGNOSTICO-PROJETO.md`, plano, auditoria), sem copiar o conteúdo deles.
- Mostrar a análise de impacto e só gravar com o OK do Felipe.
- **Regra dos agentes:** durante todo o projeto os agentes só **leem** o LBOS pra pegar contexto. Nenhum agente grava nele. Só a sessão principal grava, nesta etapa.

### Etapa 7 — Ida pro site oficial
- Só com dados do v2 (por volta de 29/09) e **"pode fazer" do Felipe**. Checklist `rv-entrega` antes.

## Loop de orquestração (validação antes de dizer "pronto")

Skill: `rv-orquestrador` + `superpowers:dispatching-parallel-agents`. Rodar ao fim de cada etapa:

1. **Construtor**: implementa a etapa (1 agente por área independente; nunca dois no mesmo arquivo).
2. **Revisores em paralelo** (agentes separados, cada um recebe o objetivo da etapa e a lista de arquivos):
   - **Revisor de código**: `npm run build` e `npm run test` limpos, diff só com o que foi pedido, nenhum link quebrado (`/code-review` ou `caveman:cavecrew-reviewer`).
   - **Revisor de texto**: confere contra `VOZ.md`, sem travessão, sem jargão, sem número inventado (`rv-copy` + `humanizer`).
   - **Testador no navegador**: roda o site (dev ou preview do v2) e clica em todos os botões da etapa, envia formulário "TESTE", confere console sem erro. **Print em 1440px e em 390px** (conferir largura real via JS: `window.innerWidth`, porque o redimensionamento falha neste Windows). Usar Playwright MCP.
   - **Revisor de conversão** (etapas 2-5): `cro` + `web-design-guidelines` — a promessa é a mesma do primeiro clique até o formulário?
3. **Juiz**: junta os achados. Se houver erro → volta pro construtor com a lista exata. Repetir até zerar (máximo 3 voltas; na 3ª falha, parar e mostrar pro Felipe).
4. Só então: commit na `v2-posthog`, deploy v2, prints enviados ao Felipe, registro no `RV-DIAGNOSTICO-PROJETO.md`.

## Skills por momento (resumo)

| Momento | Skills |
|---|---|
| Sempre | `realvision`, `rv-diagnostico`, `karpathy-guidelines` |
| Texto | `rv-copy`, `landing-page-copywriter`, `cro`, `humanizer` |
| Tela | `frontend-design`, `rv-design`, `motion`, `vercel-react`, `web-design-guidelines` |
| Agentes e testes | `rv-orquestrador`, `superpowers:dispatching-parallel-agents`, `superpowers:verification-before-completion` |
| Medição | `rv-posthog-setup` (docs PostHog são a fonte de verdade) |
| SEO / idiomas | `marketing-seo`, `rv-i18n` |
| Blog / formação | `rv-blogpost`, `rv-intencao-busca`, `rv-academy` |
| Registro do projeto (Etapa 6.5) | `lbos` + `lbos-*` |
| Fim de sessão | `rv-fim-sessao` |

## Respostas do Felipe (17/09/2026)

1. **Números**: não há oficiais. Manter os números atuais como estão (não unificar agora). Só o "100%" sai.
2. **"100% satisfeitos"**: sai de todas as páginas (`PortfolioMetrics.tsx:11` e onde mais aparecer).
3. **Preços**: landing page **a partir de R$ 500**, site institucional **a partir de R$ 1.500**, como **promoção de Natal**. Atualizar `products.ts` e a copy. Deixar a promoção bem visível (faixa no topo + selo no card do produto + menção na home), com data de fim real (📌 confirmar com Felipe a data de encerramento). Montar de forma que dê pra trocar o tema depois (Black Friday, Natal) mudando só texto e data, num lugar só.
4. **Casos**: Vila dos Corais + Casa dos Cajus + Vila Mandela por enquanto. O hotel chique entra mais pra frente.
5. **Formulário do diagnóstico** (decidido por mim, avisar Felipe ao final): nome, WhatsApp, nome da pousada + cidade, e um campo opcional "site ou Instagram atual". Nada de email obrigatório.

Com isso a Etapa 5 muda: **não criar `stats.ts`**, só remover o "100%".

## Tarefa final (depois da Etapa 7)

- **Tour virtual do hotel na Itália** (visitado no aniversário da Romana). Criar o tour e publicar como caso. Skills: `gnomo-monstro` (Pano2VR) + `realvision`. 📌 Perguntar ao Felipe nome do hotel, onde estão as fotos 360° e se há autorização do hotel antes de publicar.

## Verificação final

- `npm run build` e `npm run test` limpos.
- Todos os botões da home, `/servicos`, `/diagnostico` e `/loja` levam a página útil (zero 404).
- Formulário da home e do diagnóstico chegam no email (teste "TESTE").
- Nenhum "em construção" no site público.
- Home: pousada entende em 5 segundos o que recebe e qual o próximo passo.
- Prints 1440px e 390px enviados ao Felipe.
- `realvisionmaps.com` e `main` intocados.
