---
name: rv-novo-cliente
description: Onboarding de cliente novo da Real Vision 360. Use SEMPRE que Felipe apresentar um cliente novo — um print/imagem da ficha do VisionFlow, um nome de pessoa, um nome de empresa, a frase "novo cliente", ou um lead de prospecção de campo (visita, indicação) que ainda não está em nenhum sistema. Consulta o Supabase do VisionFlow, confirma o match com o Felipe (anti-duplicata) — e se for lead genuíno ainda não cadastrado, cria o registro no VisionFlow com aprovação. Cria a estrutura padrão do cliente — pasta + docs base (PROJETO + TIMELINE + FICHA-CLIENTE) + skill por-cliente; em fase de prospecção, também briefing de call + script de WhatsApp. Carregar sempre junto com a skill `realvision`.
---

# Skill: rv-novo-cliente — Onboarding de Cliente Novo

> Objetivo: padronizar a entrada de todo cliente novo que chega pelo VisionFlow.
> Para cada cliente novo geramos: **pasta + 2 docs base + skill por-cliente**.
> Carregue sempre junto com `realvision`. Se for tocar no banco, siga o pré-voo de `rv-visionflow`.

---

## Quando esta skill dispara

Felipe entrega a primeira informação relevante de um cliente:
- Um **print / imagem** da ficha do VisionFlow
- Um **nome** de pessoa ou empresa
- A frase **"novo cliente"** (ou similar)
- Um **lead de prospecção de campo** — Felipe descreve uma oportunidade que ainda não está em nenhum sistema (visita a um negócio, indicação, conversa de rua). Nesse caso o cliente pode não existir no VisionFlow ainda — ver seção 3.1.

---

## Procedimento (passo a passo)

### 1. Identificar o termo de busca
Extraia da entrada (print ou texto) o nome da pessoa e/ou da empresa. Se o print
não estiver legível ou o nome estiver ambíguo, **pergunte ao Felipe** antes de buscar.

### 2. Consultar o Supabase do VisionFlow
Project: `ghwjetvazmdlaqidgxqi` · tabela `clients`.
Colunas reais: `id`, `nome`, `empresa`, `endereco`, `localizacao`, `contato`, `email`, `status_pipeline`, `created_at`.

```sql
SELECT id, nome, empresa, status_pipeline, contato, localizacao, email, created_at
FROM clients
WHERE nome ILIKE '%<termo>%' OR empresa ILIKE '%<termo>%';
```

(Se for usar MCP Supabase e o banco estiver em sessão de escrita, confirmar conexão — ver `rv-visionflow`.)

### 3. Anti-duplicata — REGRA CENTRAL (nunca criar nada antes de confirmar)

| Resultado da query | Ação |
|---|---|
| **0 resultados** | Avisar Felipe que não achou no banco. Perguntar: é erro de busca (nome/empresa errado) ou é **lead novo de verdade**? Se for erro de busca, pedir o termo certo e buscar de novo. Se for lead novo → ver seção 3.1. NÃO criar nada sem essa confirmação. |
| **1 resultado** | Mostrar a ficha (nome, empresa, status, contato, local) e perguntar: "é este?". Só seguir com OK. |
| **2+ parecidos** | Listar todos numerados e **perguntar qual** é o certo. NÃO adivinhar. |

Além disso, **sempre** checar se a pasta já existe:
`operacao/clientes/arquivos/<Nome> - <Empresa>/`
- Se já existir → avisar Felipe e **não duplicar**. Perguntar se é pra atualizar a existente.

> Pode perguntar ao Felipe a qualquer momento que algo estiver ambíguo. Melhor perguntar do que criar duplicata.

### 3.1 Lead novo que não existe no VisionFlow (criar o registro)

Quando Felipe confirma que é um lead genuíno e ainda não está no banco:

1. Pré-voo obrigatório: `git status` na pasta do VisionFlow (`operacao/projetos/_RV-Internos/visionflow`) + confirmar MCP Supabase conectado — ver `rv-visionflow`.
2. Inserir na tabela `clients` **só com dados que Felipe forneceu** (nunca inventar campo vazio).
3. **Atenção ao campo `status_pipeline` — é um enum, não aceita texto livre.** Valores válidos: `lead`, `proposta`, `recusado`, `desenvolvimento`, `entregue`, `recorrente`. Todo lead novo entra como `lead` (não usar "prospecção" — dá erro).
4. Guardar o `id` retornado — vai referenciar nos documentos locais (PROJETO/FICHA/skill por-cliente).

### 4. Criar a estrutura padrão (só após confirmação explícita)

**Convenção de nome de pasta:** `Nome - Empresa` (ex: `Gabriel Iberg - Solarium Aarau`, `Romana Loznjakovic - Sunbite.ch`).

1. Pasta: `operacao/clientes/arquivos/<Nome> - <Empresa>/`
2. `<CLIENTE>-PROJETO.md` — dossiê (template abaixo)
3. `<CLIENTE>-TIMELINE.md` — linha do tempo (começa pela data de `created_at` do VisionFlow)
4. `FICHA-CLIENTE.md` — contexto de sessão (template abaixo) ← **sempre criar**
5. Skill por-cliente: `~/.claude/skills/<slug>/SKILL.md` (template abaixo, modelo `solarium`)
6. **Se o cliente ainda estiver em fase de prospecção** (lead novo da seção 3.1, sem call/conversa formal marcada ainda) — criar também:
   - `BRIEFING-REUNIAO-15MIN.md` — roteiro de diagnóstico (abertura + 5-7 perguntas + checklist + encerramento)
   - `SCRIPT-AUDIO-WHATSAPP.md` — script de apresentação pra Felipe gravar/enviar
   
   Esses dois só entram nessa fase inicial — **não são padrão** pra clientes que já chegam prontos do VisionFlow (já ativos ou com conversa avançada).

### 5. Registrar em memória
- Pointer no `MEMORY.md` para a nova skill por-cliente e para a pasta canônica do cliente.

### 6. Fase de onboarding — só diagnóstico, sem antecipar execução
Enquanto o cliente estiver em fase de prospecção/diagnóstico (status `lead`, sem decisão de serviço confirmada), ativar **só** `realvision` + `rv-novo-cliente`. Skills de execução (`gnomo-monstro`, `landing-page-copywriter`, `05-marketing-seo`, `cro`, `03-vercel-react` etc.) só entram depois de decisão concreta de serviço — normalmente pós-call. Ver `rv-skill-scout` para o mapeamento completo por fase.

---

## Regras herdadas (não duplicar — referenciar)
- Carregar sempre com `realvision`.
- Tocar no banco → pré-voo de `rv-visionflow` (git status + git pull + MCP conectado).
- **Nunca inventar dados** — só o que está no banco ou na sessão. Campo vazio fica vazio / "a confirmar".
- Avisar Felipe antes de qualquer escrita no Company OS.
- Idioma: Português brasileiro com o Felipe; idioma do cliente conforme o caso (Suíça → DE/EN).

---

## Template — `FICHA-CLIENTE.md` (contexto de sessão para o obsidian-cli)

```markdown
---
title: [Nome] — [Empresa]
tags:
  - cliente
  - ativo
status: ativo
data_inicio: YYYY-MM-DD
servicos: []
---

# [Nome] — [Empresa]

## Contexto
<!-- Quem é, o que faz, como chegou até a RV -->

## Serviços contratados
<!-- Lista dos serviços ativos/contratados -->

## Entregas realizadas
<!-- Histórico com datas — atualizar ao final de cada sessão -->

## Próximos passos
<!-- O que está pendente ou planejado — atualizar ao final de cada sessão -->

## Observações
<!-- Preferências, idioma, contatos, notas importantes -->
```

> Esta ficha é lida pelo Claude com `obsidian-cli` ao iniciar sessão: `obsidian read path="operacao/clientes/arquivos/[Cliente]/FICHA-CLIENTE.md" vault="Real Vision"`
> Ver protocolo completo em [[PROTOCOLO-Sessao-Contexto]].

---

## Template — `<CLIENTE>-PROJETO.md`

```markdown
# <Empresa> — Dossiê do Projeto

> Cliente da Real Vision 360. Carregue sempre junto com a skill `realvision`.
> Idioma de trabalho com o cliente: <idioma>.

## Quem é
- **Cliente:** <Nome>
- **Negócio:** <descrição curta>
- **Local:** <localizacao>
- **Contato:** <contato> · <email>
- **VisionFlow:** id `<id>` · status `<status_pipeline>`

## O que foi entregue
- (listar entregas reais; se nada ainda, "Nenhuma entrega ainda")

## Onde está o código
- Repo local / GitHub / Deploy / URLs (preencher quando existir)

## Pendências conhecidas
- [ ] ...

## Como trabalhar este cliente
- Skills a ativar / idioma / observações
```

## Template — `<CLIENTE>-TIMELINE.md`

```markdown
# <Empresa> — Linha do Tempo do Projeto

> Dossiê completo em [[<CLIENTE>-PROJETO]].

## <ano>
### <DD/MM/AAAA> — <marco>
- <descrição>

## Próximos marcos
- ...
```

## Template — skill por-cliente (`~/.claude/skills/<slug>/SKILL.md`)

```markdown
---
name: <slug>
description: Carrega o contexto completo do cliente <Nome> (<Empresa>). Use SEMPRE que Felipe disser "<gatilhos>", ou for trabalhar em qualquer entrega desse cliente. Carrega histórico, status, modelo de negócio, assets e próximos passos.
---

# <Empresa> — Dossiê do Cliente

> Carregue sempre junto com a skill `realvision`. Idioma de trabalho: <idioma>.

## Quem é
## O que já foi entregue ✅
## Onde está o código
## Pasta do cliente (documentação)
## Status atual (<data>)
## Como trabalhar este cliente
```

---

## Exemplo resolvido — Romana / Sunbite.ch (29/06/2026)
- Query por "romana"/"sunbite" → 1 match: `Romana Loznjakovic` / `Sunbite.ch` / id `a1bbaea7-0081-48d1-bdeb-b945aa4794b1`.
- Pasta padronizada: `operacao/clientes/arquivos/Romana Loznjakovic - Sunbite.ch/`.
- Docs: `SUNBITE-PROJETO.md` + `SUNBITE-TIMELINE.md`.
- Skill por-cliente do site: `sunbite-site` (já existia).

## Exemplo resolvido — Fabiano / O Maná'h (02/07/2026) — caso "lead de prospecção"
- Felipe trouxe o lead de uma visita presencial à loja (conversou com o Arthur, funcionário — o dono Fabiano não estava). Não veio de print do VisionFlow.
- Query por "fabiano"/"maná"/"assunção" → 0 resultados. Felipe confirmou: é lead novo de verdade (não erro de busca) → seguiu seção 3.1.
- Pré-voo rodado (`git status` no VisionFlow) → criado registro em `clients` com `status_pipeline = 'lead'` → id `175a78b4-d81b-4518-ba5f-6cfd1b5a5fb0`.
- Pasta: `operacao/clientes/arquivos/Fabiano - O-Manahh/`.
- Docs: `MANAHH-PROJETO.md` + `MANAHH-TIMELINE.md` + `FICHA-CLIENTE.md` + `BRIEFING-REUNIAO-15MIN.md` + `SCRIPT-AUDIO-WHATSAPP.md` (os 2 últimos porque ainda não tinha call marcada).
- Skill por-cliente: `manahh`.
- Skills ativas nessa fase: só `realvision` + `rv-novo-cliente` — nenhuma skill de execução (tour, site, SEO) antecipada.
