---
name: rv-skill-scout
description: Meta-skill que analisa qualquer nova tarefa e identifica proativamente quais skills locais são relevantes, explicando a contribuição específica de cada uma antes da execução.
---

# RV Skill Scout — Conselheiro de Skills

Toda vez que Felipe atribuir uma nova tarefa, ative este raciocínio antes de qualquer execução.

## Regra central

Antes de iniciar qualquer trabalho, analise a tarefa e responda internamente:
> "Quais das nossas skills locais impactam diretamente a qualidade desta execução?"

Se houver skills relevantes além das já carregadas, apresente-as **antes de começar a executar**. Seja específico sobre o que cada skill entrega para aquela tarefa em particular — não apenas "skill X pode ajudar", mas "skill X cobre o ponto Y que vai aparecer quando fizermos Z."

---

## Mapa de skills locais

| Skill | Domínio | Ativa quando... |
|---|---|---|
| `realvision` | Contexto empresa, voz, portfólio | **Sempre** — qualquer tarefa do negócio Real Vision |
| `01-supabase-postgres` | Banco de dados, RLS, queries, migrations | Banco de dados, backend, persistência, auth, APIs com dados |
| `02-frontend-design` | Design visual, tipografia, animações, paleta | UI/UX, novos componentes, redesign, CSS, dark mode |
| `03-vercel-react` | Performance, code splitting, imagens, deploy | Build, Vercel, lazy loading, Core Web Vitals, otimização |
| `04-favicon-setup` | Favicon, ícones, PWA manifest | Configuração inicial de site, manifest.json, ícones |
| `05-marketing-seo` | SEO local, Schema JSON-LD, hreflang, GA4/GTM | SEO, meta tags, analytics, rastreamento, i18n, presença Google |
| `06-awesome-claude` | Qualidade de código, tipagem, pair programming | Qualquer codificação — reforça boas práticas de TS/React |
| `07-superpowers` | Git, diagnóstico, build, ambiente local | Git commit/push, build errors, porta travada, node_modules |
| `motion` | Animações React, transições, scroll effects, gestos | Animações, hover effects, fade, reveal, parallax, UI polish em React |
| `rv-blogpost` | Copywriting, estrutura de post, ContentBlocks | Posts do blog, textos de conteúdo, copy de email |
| `karpathy-guidelines` | Precisão, planejamento antes de executar, mudanças cirúrgicas | Tarefas complexas multi-etapa, refatorações, decisões de arquitetura |
| `rh-real-vision` | Processo seletivo, fichas de candidatas, Upwork | Contratação, RH, avaliação de candidatos |
| `gnomo-monstro` | Pano2VR 7 — interface, hotspots, patches, skin editor, GSV, workflows | Qualquer dúvida ou trabalho com Pano2VR: tours, Street View, skin, animações, patches |
| `ui-ux-pro-max` | Design system por banco de dados — 67 estilos, 161 paletas, 57 tipografias, 99 UX rules | Início de todo projeto novo, escolha de estilo/cor/fonte, redesign, "que visual combina com X negócio" |
| `ruflo` | Orquestração multi-agente, memória vetorial (AgentDB), workers de auditoria, GOAP planner | Sessões técnicas complexas, planejamento de curso/lançamento, produção de conteúdo em escala, automações |
| `landing-page-copywriter` | Copy de landing page — frameworks PAS, AIDA, StoryBrand, headlines, CTAs | Escrever copy para site de cliente, proposta com texto, landing page nova, copy de hero section |
| `cro` | Otimização de conversão — análise de página, UX de formulário, hierarquia visual, trust signals | "Esta página não está convertendo", "melhorar CTA", auditoria de landing page, página de preços |
| `script-writer` | Scripts de vídeo para YouTube — hooks, estrutura, retenção, variações de formato | Roteiro para YouTube da Real Vision, scripts do curso online, vídeos de vendas |
| `web-design-guidelines` | Auditoria de UI contra Web Interface Guidelines (Vercel) — acessibilidade, performance, UX | "Revisa minha UI", "audita o design", "checa acessibilidade", revisão de componente antes de publicar |
| `landing-page-design` | Layout de alta conversão + geração de imagem hero com IA (belt CLI) — above-the-fold, social proof, CTA psychology | Site novo para cliente, hero section, "quero uma imagem de hero", estrutura de landing page |
| `canvas-design` | Arte visual estática (PNG/PDF) — pôsteres, capas, posts de redes sociais, PDFs comerciais com design premium | "cria um pôster", "quero uma capa de YouTube", "proposta com design bonito", arte para Instagram/TikTok, qualquer peça visual em PNG ou PDF. **NÃO usar para UI de site** — isso é `ui-ux-pro-max` |
| `skill-creator` | Criar, testar, avaliar e otimizar skills — inclui evals, benchmark e otimização de trigger. Substitui o `skill-builder` | "quero criar uma skill", "melhora esta skill", "testa se o trigger está correto", "otimiza a description da skill X" |
| `rv-i18n` | Internacionalização PT/EN/DE do real-vision-site — estado do progresso, padrão de código (useTranslation/Trans), o que já foi traduzido e o que falta | "continua o i18n do site", "traduz o blog/página X pra inglês/alemão", trabalho no seletor de idiomas do site RV |
| `earth-game` | EARTH GAME (jogo da RV) — contexto do projeto, filosofia visual Nigredo Luminoso, paleta oficial, método de mockup por tela | Qualquer sessão do jogo: design, mockups, roteiro, decisões, protótipo |
| `rv-intencao-busca` | Pesquisa de intenção de busca — réplica gratuita do AnswerThePublic via Google Autocomplete (pipeline Python, sem custo de assinatura) | Antes de escrever qualquer blog post (sempre junto com `rv-blogpost`), "pesquisa de palavra-chave", "que perguntas as pessoas fazem sobre X", "AnswerThePublic", "FindQuestions" |

---

## Sinal de ativação de skill

Sempre que ativar uma skill — no início ou no meio de uma conversa — emitir um aviso sutil em itálico na resposta:

> *→ skill [nome] ativada*

Nunca silencioso. Sempre visível, sempre discreto.

---

## Como apresentar as sugestões

Formato direto, sem cerimônia. Mostre só o que é relevante para aquela tarefa específica:

```
Skills ativas para essa tarefa:
• realvision — voz e contexto da marca (sempre)
• 05-marketing-seo — hreflang tags e meta descriptions bilíngues (essencial pra i18n com SEO correto)
• 03-vercel-react — lazy loading dos JSONs de tradução (evita impacto no bundle)
• 02-frontend-design — language switcher na nav seguindo o design system atual
```

Se a lista for óbvia demais (ex: só `realvision` + uma skill técnica trivial), pode resumir ou omitir.

---

## Regras de aplicação

**Sempre fazer:**
- Carregar `realvision` primeiro para qualquer tarefa do negócio Real Vision
- Identificar skills antes de qualquer leitura de arquivo ou edição
- Explicar por que cada skill é relevante para *aquela* tarefa específica (não genérico)

**Nunca fazer:**
- Carregar skills que não têm relação direta com a tarefa
- Listar skills "por precaução" sem explicar a contribuição concreta
- Sugerir skills depois de já ter começado a executar

**Tarefas simples (ex: corrigir typo, renomear variável):**
- Pular a análise de skills — custo de overhead maior que o benefício

---

## Mapeamento por tipo de tarefa

### Novo componente React / UI
`realvision` + `02-frontend-design` + `motion` + `06-awesome-claude` + `03-vercel-react`

### SEO / meta tags / analytics
`realvision` + `05-marketing-seo` + `07-superpowers` (para validar build depois)

### i18n / internacionalização
`realvision` + `rv-i18n` (estado do site real-vision-site especificamente) + `05-marketing-seo` + `03-vercel-react` + `02-frontend-design`

### Blog post / copy / texto
`realvision` + `rv-blogpost` + `rv-intencao-busca` (pesquisa de perguntas reais antes de escrever)

### Deploy / git / build
`07-superpowers` + `03-vercel-react`

### Banco de dados / backend
`01-supabase-postgres` + `06-awesome-claude`

### Arquitetura / refatoração grande
`karpathy-guidelines` + `06-awesome-claude` + `07-superpowers`

### RH / processo seletivo
`realvision` + `rh-real-vision`

### Pano2VR / tours virtuais / Google Street View
`realvision` + `gnomo-monstro`

### Site novo (do zero)
`realvision` + `ui-ux-pro-max` + `landing-page-copywriter` + `02-frontend-design` + `motion` + `03-vercel-react` + `04-favicon-setup` + `05-marketing-seo`

### Copy / texto de landing page
`realvision` + `landing-page-copywriter` + `cro`

### Site novo para cliente (completo)
`realvision` + `ui-ux-pro-max` + `landing-page-design` + `landing-page-copywriter` + `cro` + `motion`

### Otimização de conversão
`realvision` + `cro` + `05-marketing-seo`

### YouTube / curso / vídeo
`realvision` + `script-writer` + `rv-blogpost`

### Revisão de UI antes de publicar
`realvision` + `web-design-guidelines` + `02-frontend-design`

### Arte visual / pôster / redes sociais / PDF com design
`realvision` + `canvas-design`

### EARTH GAME (jogo da Real Vision)
`realvision` + `earth-game` (+ `canvas-design` para mockups e artes estáticas)

### Criar ou melhorar uma skill
`skill-creator` (nota: `skill-builder` está aposentado — usar sempre `skill-creator`)

---

## Diagnóstico final (obrigatório em tarefas grandes)

Ao concluir qualquer tarefa de múltiplas etapas, execute:

1. **Build limpo** — `npm run build` sem erros
2. **Git status** — confirmar que só os arquivos relevantes estão staged
3. **Checklist da skill mais crítica** — ex: se usou `05-marketing-seo`, confirmar hreflang; se usou `02-frontend-design`, confirmar responsividade
4. **Reportar ao Felipe** — o que foi feito, o que ficou pendente, e qualquer desvio do plano original
5. **Verificar se o workflow merece virar skill** — ver seção abaixo

---

## Detecção proativa de novas skills

**Ao final de qualquer entrega relevante**, verificar estes sinais. Se um ou mais estiverem presentes, perguntar ao Felipe:

> *"Esse fluxo que a gente desenvolveu aqui parece candidato a virar uma skill. Quer que eu crie?"*

### Sinais de que um workflow merece virar skill

| Sinal | O que observar |
|---|---|
| **Repetição** | Felipe pediu algo similar pela segunda vez e eu segui os mesmos passos |
| **Muitas idas e voltas** | Levamos várias mensagens pra acertar formato, fluxo ou tom — esse know-how não deve se perder |
| **Domínio especializado novo** | Felipe trouxe contexto que eu não tinha e que vai aparecer de novo (ferramenta, cliente, processo) |
| **Entrega que funcionou muito bem** | Fluxo gerou resultado claramente acima do comum — proposta, post, análise, geração de PDF |
| **Correções repetidas do Felipe** | Felipe corrigiu minha abordagem várias vezes → existe um "jeito certo" que vale capturar |
| **Processo de mais de 5 etapas** | Workflow com muitas etapas distintas que poderiam ser automatizadas numa skill |

### Como fazer a pergunta

Formato curto, sem cerimônia:

> *"Esse fluxo que desenvolvemos [descrição em 1 linha] parece bom candidato a virar uma skill para não perdermos esse know-how. Quer que eu crie agora ou deixa pra depois?"*

Felipe responde sim/não. Se sim, usar a `skill-creator` para montar e testar.

### Quando NÃO sugerir

- Tarefa trivial que qualquer conversa resolve (corrigir typo, responder dúvida pontual)
- Workflow que já existe como skill (verificar o mapa acima antes de sugerir)
- O Felipe acabou de dizer que não quer criar skill agora

---

## Gatilho: nova skill criada (automático, sem Felipe precisar pedir)

Sempre que uma skill nova for criada (por `skill-creator` ou qualquer outro fluxo) ou uma existente for modificada significativamente, disparar automaticamente — no mesmo momento, antes de considerar a tarefa concluída:

1. **Mapear onde ela se encaixa** na realidade da Real Vision: que tipo de tarefa ela cobre, que cliente/projeto ela toca, se ela sobrepõe ou compete com alguma skill já existente (ex: dois pipelines de SEO diferentes pro mesmo cliente).
2. **Atualizar a tabela "Mapa de skills locais"** acima com a entrada real.
3. **Adicionar ao "Mapeamento por tipo de tarefa"** se ela se encaixa num fluxo já mapeado, ou criar uma entrada nova de fluxo se for um domínio inédito.
4. **Atualizar o `README.md`** da pasta skills.
5. **Retornar o veredito ao Felipe antes de seguir**, no formato:

```
Skill nova mapeada: [nome]
• Onde entra: [tipo de tarefa / cliente / domínio]
• Como será chamada: [trigger — comando explícito, palavra-chave, ou automática por contexto]
• Sobreposição: [nenhuma / substitui X / compete com Y — decidir qual prevalece]
```

Esse retorno é obrigatório mesmo que a skill pareça óbvia — é o que evita o que aconteceu com a `wix-seo-autopilot` (criada em outra sessão, nunca mapeada aqui, ficou órfã e quase foi reaproveitada com um serviço fora de escopo).
