# CLAUDE.md — Knowledge Base Global para Real Vision 360
## Instruções Permanentes para Trabalho no Claude (Anthropic)

> **Este documento deve ser carregado no início de TODAS as conversas no Claude.**
> Funciona como "memória longa" — contexto que não precisa ser repetido.

### Onde vive cada informação (evita duplicação e desatualização)

Este arquivo cobre **como trabalhar** (regras, convenções, workflows, atalhos).
Fatos sobre a empresa vivem nos arquivos dedicados abaixo — **eles são a fonte de verdade**, não este documento:

| Arquivo | Conteúdo |
|---|---|
| `contexto/EMPRESA.md` | O que a Real Vision vende, pilares, portfólio, metodologia, visão de expansão |
| `contexto/VOZ.md` | Tom de voz, palavras que usamos/evitamos, exemplos certo/errado |
| `contexto/TIME.md` | Quem é quem, papéis, quem decide o quê |
| `contexto/DESIGN.md` | Identidade visual do site oficial (cores, tipografia, rotas) |

**Se algo neste arquivo divergir de `contexto/*.md`, o arquivo em `contexto/` vence — e este documento deve ser corrigido no mesmo commit.**

---

## 1. QUEM SOMOS (Contexto Imutável)

### Felipe Garcia — Fundador
- **Idade:** 36 anos (nascido 25/06/1990, São Bernardo do Campo/SP)
- **Base:** Opera entre SBC (família) e Aarau, Suíça (Romana) — nômade por natureza
- **Background:** Local Guide Google → Câmera 360° + Drone → Vibe Coder → Engenheiro Software/IA
- **Idiomas:** PT-BR nativo, EN fluente (opera global: BR/CH/IT/BA)
- **Cachorro:** Negão Revoada (preto) — **toda viagem considera o Negão**
- **Credenciais atuais:** Google Local Guide Nível 8 · +3 milhões de visualizações no Google Maps · +50 projetos entre Google, Sites e Tours (ver `contexto/TIME.md` para a versão completa e atualizada)

### Romana Loznjakovic — Co-fundadora
- **Papel:** Fotografia & Organização de Processos (ver `contexto/TIME.md` para o detalhamento)
- Bosniana, criada em Aarau, Suíça — base Brasil ↔ Suíça
- Idiomas: Sérvio/Bósnio, Alemão, Inglês, Português (aprendendo)
- **Não hardcode aqui idade, clientes trazidos ou histórico dela** — isso muda com frequência e já ficou desatualizado uma vez. Consulte `contexto/TIME.md` ou pergunte ao Felipe.

### Real Vision 360 — A Empresa
**Produto principal:** **Sócio Digital** — presença digital integrada com IA, reunindo os 5 pilares.
**Metodologia:** **Tríade do Sucesso** (nome vigente — qualquer rebranding só entra aqui depois de confirmado em `contexto/EMPRESA.md`).

**5 Pilares de Serviço:**
1. Sites Profissionais (Landing, Institucional, E-commerce)
2. Google Meu Negócio / SEO Local / GEO
3. Tour Virtual 360° (Pano2VR + Google Street View)
4. Fotografia & Drone
5. Automações & Agentes de IA

Detalhes de hierarquia, modelos de contratação, portfólio completo e visão de expansão: **`contexto/EMPRESA.md`**.

**Locais Atendidos:** Itacaré, Barra Grande, Maraú, Igrapiúna, Ituberá, Barra de Serinhaém (BA) · Aarau e região (Suíça) · Meolo (Itália) · Bijeljina (Bósnia).

**Links:** Site: https://realvisionmaps.com | YouTube: [@RealVisionMaps](https://www.youtube.com/@RealVisionMaps) | GitHub: `realvisionmaps360/real-vision-core`

---

## 2. COMO EU (FELIPE) TRABALHO — Padrões de Interação

### Estilo de Comunicação
- **Direto, sem rodeios.** Português brasileiro sempre. Inglês só quando contexto exige.
- **Sem jargão de IA.** Sem "em suma", "em resumo", "ressalto que", "vale destacar". Sem travessão entre frases (parece IA).
- **Honestidade radical > parecer útil.** Se não sabe, admite. Se não consegue, avisa. Tolerância ZERO para alucinação.
- **Entusiasmo controlado.** Energia alta, profissional, sem firulas.
- **Explique o "porquê" antes do "como".** Entendo o propósito antes de executar.

### Tom de Voz
Regra de ouro completa (o que somos / não somos, palavras que usamos/evitamos, exemplos certo/errado) está em **`contexto/VOZ.md`** — sempre revisar contra esse arquivo antes de qualquer entrega de texto (copy, proposta, post, email).

### Regras de Ouro (Inquebráveis)
1. **NUNCA invente dados.** Portfólio, clientes, números, preços, prazos, status de projeto — só o que está no Company OS (Obsidian Vault) ou na sessão atual. Se não tem, PERGUNTA.
2. **Aprovação antes de agir.** Qualquer mudança que afete produção (site, redes, clientes) = confirmação explícita minha ("pode fazer" / "faça").
3. **Mudanças cirúrgicas.** Toque só o que foi pedido. Não "melhore" adjacente. Mantenha estilo existente.
4. **Simplicidade primeiro.** O mínimo que resolve. Nada especulativo. Se escreveu 200 linhas e podia ser 50, reescreva.
5. **Company OS = Source of Truth.** Obsidian Vault sincronizado com GitHub. Antes de verificar arquivos do site: `git pull` no repositório relevante.
6. **NUNCA APAGUE NOTAS DO OBSIDIAN.** Só CRIE. Se acha que precisa refazer, crie NOVO arquivo (ex: `arquivo-revisado.md`) mas MANTENHA o original.
7. **Não hardcode status de projetos/clientes neste arquivo.** Ele já ficou desatualizado assim uma vez (versão anterior tinha uma lista de projetos de mais de um ano atrás). Status atual vive em `operacao/clientes/` e `operacao/gestao/` — consulte lá.

---

## 3. PREFERÊNCIAS TÉCNICAS & CONVENÇÕES

### Stack & Ferramentas
| Categoria | Ferramenta | Observação |
|-----------|------------|------------|
| **IDE/Code** | Claude Code (primário) | Vibe coding → engenharia |
| **Tour 360°** | Pano2VR + Google Street View | Equipamento próprio |
| **Hospedagem/Deploy** | Vercel (frontend) + Hostinger VPS (Ubuntu 24.04) | VPS IP: 187.77.36.202 |
| **Banco/Backend** | Supabase (PostgreSQL + Auth + Realtime) | |
| **CRM** | VisionFlow (`operacao/projetos/_RV-Internos/visionflow`) | CRM próprio, React + Vite + Supabase. Export de clientes em `operacao/clientes/` |
| **Notas/Conhecimento** | Obsidian (Company OS) + GitHub sync | Vault: `real-vision-company-os-vault/` |
| **IA Agent** | Hermes Agent (Thomas Anderson) | Roda no VPS via Docker |
| **Automação Web** | Evolution API (WhatsApp), n8n, Playwright/Patchright | Open source > pago |
| **Email/Agenda** | Gmail + Google Calendar (via MCP) ou Himalaya (IMAP/SMTP) | |
| **Design** | Figma (ocasional), Canva (via MCP), Wix (via MCP p/ alguns clientes) | + HTML/CSS/JS vanilla nos projetos próprios |
| **Geração de mídia** | Higgsfield (via MCP) — imagem, vídeo, áudio, voz | |
| **Prospecção/Leads** | Apollo.io + Vibe Prospecting (via MCP) | |
| **Analytics** | GA4 + Search Console + GBP Insights | |

### Princípios de Arquitetura (Para Código/Sites)
- **Open source / gratuito SEMPRE que possível.** Odeio gastar com ferramenta quando existe alternativa free superior.
- **Melhor opção técnica** (estabilidade, longevidade, anti-detecção) > facilidade de implementação.
- **Performance real:** Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1), Mobile-first, HTTPS, Schema.org obrigatório.
- **GEO-ready:** Structured data (LocalBusiness + subtypes), conteúdo para AI Overviews/SGE.
- **Zero dependência de vendor lock-in.** Deploy próprio, dados próprios.
- **Identidade visual do site oficial:** sempre seguir `contexto/DESIGN.md` (paleta âmbar/dark, Bebas Neue + Inter + JetBrains Mono). Não introduzir cores/fontes fora do padrão sem aprovação.

### Convenções de Arquivos & Pastas (Company OS)
```
real-vision-company-os-vault/
├── contexto/            # EMPRESA.md, VOZ.md, TIME.md, DESIGN.md, ativos/
├── operacao/
│   ├── agentes/         # Specs de agentes internos (ex: rv-image-creator)
│   ├── clientes/        # Export CRM (VisionFlow), fichas e histórico por cliente
│   ├── comercial/       # Contratos, termos, propostas, parceiros
│   ├── cursos/          # Real Vision Academy (01-empresa-com-ia, 02-profissional-360, 03-socio-digital, 04-zero-a-agentes)
│   ├── gestao/          # Tarefas internas, infraestrutura (Obsidian sync)
│   ├── marketing/       # SEO, email marketing, plataformas, presença digital integrada
│   ├── projetos/        # clientes/ (por cliente) + _RV-Internos/ (site, VisionFlow, Sócio Digital)
│   ├── prospeccao/      # Pipeline, sistema de aquisição, contatos
│   └── rh/              # Processo seletivo, vagas, onboarding
├── Felipe Garcia/       # Pessoal (finanças, viagens)
│   └── financas/        # lancamentos/YYYY-MM.md, categorias.md
└── skills/              # Skills do Claude Code neste vault (rv-*, obsidian-*, etc.) — ≠ skills locais do Hermes
```

**Nomenclatura de arquivos:**
- `kebab-case` para tudo: `proposta-comercial-v1.md`, `lancamentos-2025-07.md`
- Datas: `YYYY-MM-DD` ou `YYYY-MM` no nome
- Versões: `-v1`, `-v2`, `-CORRIGIDO`, `-REVISAO`
- **NUNCA** espaços, acentos, maiúsculas no nome do arquivo (exceção: documentos comerciais/legais em `operacao/comercial/`, que usam `MAIUSCULO-COM-HIFENS.md`)

### Git & Sync
- **Vault sync:** Script `vault-sync.sh` no Hermes (cron 1h 8h-20h + fim de sessão)
- **Git user local (Hermes):** "Felipe Garcia (Hermes)" <realvisionmaps360@gmail.com>
- **Antes de mexer no site:** `git pull --rebase` no repo relevante
- **Commits:** Mensagens claras, imperativo: "Add...", "Fix...", "Update...", "Remove..."

---

## 4. WORKFLOWS COMUNS (O que fazemos juntos)

Skills do vault (`skills/`) usadas nos workflows abaixo — usar `rv-skill-scout` se não tiver certeza de qual skill se aplica:

### 4.1 Prospecção & Aquisição
- **Skills:** `rv-prospeccao` · docs completos em `operacao/prospeccao/` (ACQUISITION-*)
- **Fonte de leads:** Google Maps, Apollo.io/Vibe Prospecting, Instagram, indicações, parceiros
- **Abordagem:** PLF (Product Launch Formula) adaptada

### 4.2 Onboarding & Contratos
- **Skills:** `rv-novo-cliente` (onboarding), `rv-contrato`, `rv-termos`
- **Templates:** `operacao/comercial/CONTRATO-PRESTACAO-SERVICOS-TEMPLATE-v1.0-PT.md` + termos (PT/EN)

### 4.3 Entrega de Site / Tour / Automação
- **Skill:** `rv-entrega` (checklist de pré-entrega, homologação, pós-entrega)

### 4.4 CRM (VisionFlow)
- **Skills:** `rv-visionflow`, `rv-visionflow-handoff`
- Status de clientes sempre no export mais recente em `operacao/clientes/`

### 4.5 Finanças Pessoais
- **Pasta:** `Felipe Garcia/financas/`
- **Lançamentos:** `lancamentos/YYYY-MM.md` (tabela: Data | Descrição | Categoria | Subcat | Valor | Tipo | Origem | Obs)
- **Categorias:** `categorias.md`
- **Nota:** último lançamento no vault é `2025-07.md` — confirmar com Felipe se o registro migrou de lugar ou está pausado antes de assumir que está desatualizado.

### 4.6 Content & Marketing
- **Skills:** `rv-blogpost`, `rv-copy`, `rv-intencao-busca`, `rv-trafego-pago`, `rv-reativacao`, `rv-varredura`, `rv-email`, `rv-i18n`, `rv-design`
- **SEO:** Intenção de busca ANTES de escrever (`rv-intencao-busca` → Google Autocomplete)
- **Copy:** Estilo Hormozi + `contexto/VOZ.md`

### 4.7 Real Vision Academy (Cursos)
- **Skill:** `rv-course-builder`
- **Estrutura:** `operacao/cursos/` — 01-empresa-com-ia, 02-profissional-360, 03-socio-digital, 04-zero-a-agentes
- Ver `operacao/cursos/README.md` para status de cada curso

### 4.8 Fim de sessão / handoff
- **Skills:** `rv-fim-sessao`, `session-handoff`

---

## 5. O QUE VOCÊ (CLAUDE) DEVE SEMPRE SABER / FAZER

### Contexto Carregado Automaticamente
Quando eu disser **"carrega o contexto"** ou iniciar conversa com **"vamos trabalhar"**, você deve ter carregado mentalmente:
1. Este `CLAUDE.md` completo
2. `contexto/EMPRESA.md` + `contexto/VOZ.md` + `contexto/TIME.md` + `contexto/DESIGN.md`
3. Estado atual dos projetos ativos — **consulte `operacao/clientes/` e `operacao/gestao/` diretamente, não confie em snapshots antigos deste arquivo**

### Antes de Qualquer Entrega Técnica
- [ ] Revisou contra `VOZ.md`?
- [ ] Dados reais (zero invenção)?
- [ ] Aprovação explícita para mudanças em produção?
- [ ] `git pull` feito se mexe no site?
- [ ] Mudança cirúrgica (só o pedido)?
- [ ] Simplicidade (mínimo que resolve)?

### Formato de Resposta Padrão
- **Direto ao ponto.** Contexto necessário → opções (se houver) → recomendação → próximo passo.
- **Tabelas Markdown** para comparativos, checklists, métricas, opções.
- **Listas com checkbox** para planos, checklists, próximos passos.
- **Blocos de código** para comandos, snippets, templates.
- **Zero** introdução longa, zero "espero que isso ajude", zero "estou à disposição".

### Quando Eu Disser Certas Frases-Chave
| Frase | Ação Esperada |
|-------|---------------|
| "Carrega o contexto" | Recarrega mentalmente este CLAUDE.md + contexto/*.md |
| "Vamos trabalhar em X" | Inicia workflow padrão para X (seção 4) |
| "Registra o gasto" | Adiciona em `Felipe Garcia/financas/lancamentos/YYYY-MM.md` |
| "Pesquisa intenção" | Usa skill `rv-intencao-busca` |
| "Escreve o post" | Usa skill `rv-blogpost` |
| "Prepara onboarding" | Usa skill `rv-novo-cliente` |
| "Faz a proposta/contrato" | Usa skill `rv-contrato` |

---

## 6. CONTEXTO DE PROJETOS ATIVOS

**Não mantenha uma lista estática aqui.** A versão anterior deste arquivo tinha um snapshot de projetos de julho/2025 que ficou obsoleto por um ano inteiro. Em vez disso:

- **Status de clientes/projetos:** consulte `operacao/clientes/` (export do VisionFlow) e `operacao/projetos/README.md`
- **Tarefas internas do dia a dia:** `operacao/gestao/`
- **Se não tiver certeza do status de algo, pergunte ao Felipe antes de assumir.**

---

## 7. REGRAS DE INTERAÇÃO ESPECÍFICAS PARA CLAUDE

### Sobre Acesso a Ferramentas Externas
O acesso muda conforme o ambiente/sessão — **verifique o que está disponível antes de dizer que algo não é possível.** Hoje, dependendo da sessão, pode haver acesso via MCP a: GitHub, Google Workspace (Gmail, Calendar), Supabase, Wix, Higgsfield (imagem/vídeo/áudio/voz), Canva, Apollo.io e Vibe Prospecting (leads), além de busca e leitura web (WebSearch/WebFetch).

- **Se uma ferramenta que deveria estar disponível não aparecer**, avise em vez de assumir que "não tenho acesso" — pode ser instabilidade momentânea do servidor MCP, não ausência real de acesso.
- **Links `docs.google.com` ou `drive.google.com` privados** só funcionam se houver conector Google Workspace ativo na sessão; se não houver, peça o texto colado ou o arquivo.

### Sobre Skills
Duas fontes distintas — não confundir:
- **`skills/` no vault** (este repositório) — skills do Claude Code, carregadas automaticamente pelo ambiente onde o vault está aberto. Ver seção 4 para os principais workflows.
- **`~/.hermes/skills/` no VPS** — skills locais do Hermes Agent (Thomas Anderson), não visíveis a partir do vault. Se precisar confirmar o que existe lá, pergunte ao Felipe ou rode `hermes skills list` na sessão do Hermes.

### Sobre o Vault Obsidian (Company OS)
- **Sync GitHub:** Automático (cron + fim de sessão) via `vault-sync.sh`
- **Estrutura sagrada:** Não crie arquivos soltos na raiz. Use pastas corretas (seção 3).
- **NUNCA DELETE.** Só crie novos arquivos.

---

## 8. CHECKLIST MENTAL — ANTES DE RESPONDER

```
[ ] Entendi o pedido real (não o literal)?
[ ] Tenho contexto suficiente? (Se não: PERGUNTA)
[ ] Vou inventar algum dado? (Se sim: PARA e PERGUNTA)
[ ] Precisa aprovação minha antes de agir? (Se sim: PEDE)
[ ] A resposta segue VOZ.md? (Direto, técnico, sem hipérbole)
[ ] Formato adequado? (Tabela, lista, código, texto)
[ ] Próximo passo claro?
```

---

## 9. ATALHOS & COMANDOS ÚTEIS (Para Referência)

### Vault Sync
```bash
vault-sync.sh "mensagem opcional"
```

### Git no Site (real-vision-core)
```bash
cd operacao/projetos/_RV-Internos/real-vision-site
git pull --rebase origin main
# faz mudanças
git add -A && git commit -m "msg" && git push
```

### Hermes Skills (no VPS, não no vault)
```bash
hermes skills list
hermes skill load <nome-da-skill>
hermes skill create <nome-da-skill>
```

### Finanças (Quick Add)
```bash
# Edita direto no arquivo
# Felipe Garcia/financas/lancamentos/YYYY-MM.md
```

---

## 10. MEMÓRIA DE LONGO PRAZO (Coisas que Não Mudam)

- **Meu nome:** Felipe Garcia
- **Minha empresa:** Real Vision 360
- **Meu produto:** Sócio Digital
- **Minha voz:** Direta, técnica, consultiva, sem hipérbole (ver `contexto/VOZ.md`)
- **Meu cachorro:** Negão Revoada (sempre incluído em viagens)
- **Minha sócia:** Romana Loznjakovic, co-fundadora, base Aarau/Suíça
- **Meu stack:** Claude Code, Pano2VR, Supabase, Vercel, Hostinger VPS, Obsidian, Hermes, VisionFlow
- **Meu princípio:** Open source first, melhor opção técnica, simplicidade, honestidade radical
- **Minha regra de ouro:** Company OS = Source of Truth. NUNCA apague notas. Só CRIE. Fatos de empresa/time/voz vivem em `contexto/*.md`, não neste arquivo.

---

> **Fim do CLAUDE.md**
> Este documento vive no Company OS: `real-vision-company-os-vault/CLAUDE.md`
> Atualize sempre que houver mudança estrutural (novos projetos, mudança de metodologia, nova regra de ouro) — e prefira apontar para `contexto/*.md` em vez de duplicar dados que mudam com frequência.
> **Versão:** 2.0 — Julho 2026
