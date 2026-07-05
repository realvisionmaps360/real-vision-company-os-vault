---
name: realvision
description: Carrega o contexto completo da Real Vision — empresa do Felipe Garcia. Use SEMPRE que o Felipe disser "Real Vision", "real vision", "RV", mencionar tours virtuais 360, captação com drone, otimização de Google Meu Negócio, ou quando estiver trabalhando em qualquer coisa relacionada ao negócio dele. Também use no início de qualquer sessão onde o Felipe quiser trabalhar em projetos da empresa.
---

# Real Vision — Context Loader

Felipe Garcia é o fundador da **Real Vision**. Esta skill carrega todo o contexto necessário pra trabalhar com ele.

## Passo 1 — Ler as regras de trabalho

Leia primeiro o arquivo de regras gerais:
`C:\Users\Computador\Desktop\Real Vision\AGENTS.md`

## Passo 2 — Ler o contexto da empresa

Leia o contexto principal da empresa:
`C:\Users\Computador\Desktop\Real Vision\contexto\EMPRESA.md`

Esse arquivo contém:
- O que a Real Vision faz e para quem
- Portfólio completo (clientes na BA + pipeline internacional)
- Metodologia própria ("Tríade do Sucesso", processos de site e tour)
- Visão estratégica & expansão (curso online, rede de fotógrafos 360, alcance bilíngue)
- Stack e links principais

## Passo 3 — Ativar skills complementares (quando aplicável)

### `rv-skill-scout` — SEMPRE
Ativar junto com `realvision` em toda sessão de trabalho. É a skill orquestradora: analisa a tarefa, mapeia quais outras skills são relevantes e emite o sinal sutil de ativação para cada uma.

### `07-superpowers` + `02-frontend-design` — SEMPRE quando houver código
Ativar **no início**, junto com `realvision`, se a sessão envolver: site, código, componentes React, arquivos `.tsx`/`.ts`/`.css`, git, deploy, Vercel, VisionFlow, repos locais, build ou ambiente de desenvolvimento.
**NÃO esperar o momento de executar** — ativar logo na leitura do pedido.
Sessões de conteúdo puro (blog post, proposta, RH, copy sem tocar em código) estão isentas.

### `motion`
Ativar se a sessão envolver: animações, transições, hover effects, scroll effects, UI polish, efeito visual, fade, slide, reveal, parallax, micro-interação, ou qualquer pedido de melhoria visual em projeto React (site, VisionFlow, sites de clientes, Solarium).
Pode ser ativada no início ou no meio da conversa quando o assunto virar visual.

### `ui-ux-pro-max`
Ativar no início de todo projeto novo de site ou redesign. Usar para gerar o design system do cliente antes de desenvolver.
Trigger: "que estilo combina com X", "que cores usar para Y negócio", início de site novo, escolha de tipografia, redesign de página.
**Atenção Windows:** o comando é `python` (não `python3`). Python 3.14.5 instalado em `C:\Users\Computador`.

### Skills complementares — tabela de referência rápida

| Skill | Ativar quando... |
|---|---|
| `ruflo` | Tarefas complexas multi-sessão, planejamento de curso/lançamento, conteúdo em escala, automações |
| `01-supabase-postgres` | Banco de dados, VisionFlow (backend), auth, queries, migrations |
| `02-frontend-design` | UI/UX, novos componentes, dark mode, CSS, sistema de design |
| `03-vercel-react` | Build, deploy, performance, Core Web Vitals, Vercel configs |
| `04-favicon-setup` | Configuração inicial de site novo — favicon, manifest, PWA |
| `05-marketing-seo` | SEO, meta tags, Schema JSON-LD, GA4, GTM, presença no Google |
| `06-awesome-claude` | Qualquer sessão de codificação — boas práticas TS/React |
| `rv-blogpost` | Posts do blog, copy de email, scripts de conteúdo |
| `rv-intencao-busca` | Pesquisa de intenção de busca (perguntas reais no Google) antes de escrever qualquer blog post — ativa sempre junto com `rv-blogpost` |
| `rv-relatorio` | Relatório de cliente, relatório de status, documento de alinhamento, prestação de contas em PDF (capa honeycomb, escura ou clara) |
| `karpathy-guidelines` | Tarefas complexas multi-etapa, refatorações, decisões de arquitetura |
| `rh-real-vision` | RH, candidatas, processo seletivo, Upwork, equipe |
| `gnomo-monstro` | Pano2VR, tours virtuais, Street View, hotspots, 360° |
| `landing-page-design` | Layout de alta conversão + geração de imagem hero com IA (belt CLI) | Site novo para cliente, hero section, estrutura above-the-fold |
| `landing-page-copywriter` | Copy para landing page de cliente — headlines, hero, CTAs, PAS/AIDA |
| `cro` | "Página não está convertendo", auditoria de conversão, melhoria de CTA |
| `script-writer` | Roteiros YouTube (canal Real Vision), scripts do curso online |
| `web-design-guidelines` | Auditoria de UI, revisão de acessibilidade, checagem antes de publicar |
| `canvas-design` | Arte visual estática — pôsteres, capas YouTube/Instagram, PDFs comerciais com design premium. **NÃO usar para UI de site** |
| `skill-creator` | Criar, testar, avaliar e otimizar skills (com evals + benchmark + otimização de trigger). Substitui o `skill-builder` |

## Passo 4 — Ler contextos complementares (conforme o assunto da sessão)

Leia os arquivos adicionais que forem relevantes para o trabalho do dia:

| Arquivo | Quando ler |
|---|---|
| `C:\Users\Computador\Desktop\Real Vision\contexto\TIME.md` | Sempre — estrutura do time, contratações, papel do Felipe |
| `C:\Users\Computador\Desktop\Real Vision\contexto\VOZ.md` | Quando for criar copy, posts, scripts ou qualquer texto para o negócio |
| `C:\Users\Computador\Desktop\Real Vision\contexto\DESIGN.md` | Quando for criar peças visuais, artes ou layouts |

## Passo 5 — Confirmar e perguntar

Depois de carregar o contexto, confirme em português:

> "Contexto Real Vision carregado. Sei quem você é, o stack da empresa, projetos no portfólio e planos de expansão. O que vamos trabalhar hoje?"

NÃO recapitule o knowledge base inteiro pro Felipe — ele já sabe quem é. Só confirme que carregou.

## Regras de trabalho com o Felipe

- **Idioma:** Português brasileiro, sempre
- **Site real:** NUNCA mexer em produção sem autorização explícita
- **Company OS:** source of truth é `C:\Users\Computador\Desktop\Real Vision\`. Quando descobrir info nova, AVISAR antes de atualizar — apresentar o que pretende mudar e esperar OK
- **Ferramentas que ele usa:** Claude Code (sites e apps), Pano2VR (tours), câmera 360 + drone próprios, Google Street View, agentes IA
- **Canal YouTube:** https://www.youtube.com/@RealVisionMaps
- **Idiomas atendimento:** PT + EN
- **Quando Felipe mostrar uma pasta (screenshot ou caminho):** ler TODOS os arquivos dentro dela antes de agir — nunca trabalhar com leitura parcial da pasta. Se a pasta tiver muitos arquivos, listar primeiro e confirmar quais são relevantes, mas o padrão é ler tudo.
