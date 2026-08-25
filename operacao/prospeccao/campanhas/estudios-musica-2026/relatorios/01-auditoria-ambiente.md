# Relatório 01 — Auditoria de Ambiente

> Missão 1 da `ESPECIFICACAO-CAMPANHA.md` §8. Data: 18/08/2026.
> Máquina: notebook da Romana, Windows 11 Home 26200.
> Nenhum segredo aparece neste documento, por regra do `01-institucional-AGENTS.md` §3.

---

## 1. Ferramentas de base

**FATO**, verificado por execução direta:

| Item | Estado |
|---|---|
| Claude Code | 2.1.191 ✅ |
| Node / npm | v24.18.0 / 11.16.0 ✅ |
| git | 2.54.0 ✅ |
| **Python** | **não instalado** ❌ |

**Consequência do Python ausente:** os scripts da campanha Unterentfelden
(`gerador-planilha.py`, `gerador-emails.py`) não rodam aqui. Qualquer script desta campanha
precisa ser escrito em **Node**. Não é bloqueio, é uma restrição de linguagem. Instalar
Python é possível, mas só com aprovação, e não é necessário.

---

## 2. MCPs

**FATO**, verificado na configuração e na sessão:

| MCP | Escopo | Estado | Serve para |
|---|---|---|---|
| **Apify** | app | ✅ **conectado e autenticado** | Descoberta de negócios via Google Maps |
| `playwright` | global (user) | ✅ ativo | QA de site ao vivo, e rota alternativa para a API da Apify |
| `github` | projeto `C:/Users/Felip` | ✅ ativo | Repositórios |
| Browser interno, Claude in Chrome, terminal, scheduled-tasks | app | ✅ ativos | Navegação e automação de interface |
| **Supabase** | — | ❌ **ausente** | **Bloqueia todo acesso ao `rv-acquisition`** |

### Validação da Apify (feita, custo zero)

Duas chamadas de leitura, nenhuma gastou crédito:

- Busca na documentação: respondeu. Conexão viva.
- `fetch-actor-details` em `compass/crawler-google-places`: respondeu com dados da conta.
  Confirma que **o token está autenticado** e que o **tier da conta é FREE**.

Estado do actor em 18/08/2026: ativo, nota 4,71 de 1.738 avaliações, 34.790 usuários por
mês, atualizado em 17/08/2026, não depreciado.

**Descoberta relevante:** o actor migrou para cobrança **pay-per-event** desde a campanha
Unterentfelden. A tabela de preços e a armadilha dos eventos caros estão em
`pesquisa/01-boas-praticas-pesquisadas.md` §4.

**Não verificável pelo MCP:** o saldo de crédito do mês. Precisa ser lido em
`console.apify.com` → Billing.

### Supabase, o bloqueio principal

Sem MCP do Supabase não há leitura nem escrita no `rv-acquisition`
(Project ID `gexacmtkjqectfqwhunv`). Isso trava:

- o dedup obrigatório do `aquisicao-contract.md`;
- a criação da `campaign`;
- todo registro de `prospects`, `prospect_events` e `prospect_services`;
- a Missão 4 inteira.

As Missões 2 e 3 conseguem andar sem ele. A Missão 4 não.

---

## 3. Skills

| Skill | Onde | Estado |
|---|---|---|
| `mcp-install` | `~/.claude/skills/` | ✅ **criada nesta sessão** |
| `amp-estudio` | `projetos/amp-estudio/.claude/skills/` | ✅ presente, governa o produto de referência |
| `sunbite-site` | `~/.claude/skills/` | Presente, sem relação com esta campanha |
| `rv-prospeccao` | — | ❌ ausente |
| `clarisso` | — | ❌ ausente |
| `rv-copy` | — | ❌ ausente |
| `rv-relatorio` | — | ❌ ausente |
| xlsx, pdf, docx, pptx, dataviz | claude.ai | ✅ utilitárias |

**O Company OS não está nesta máquina.** Não existe o `AGENTS.md` do vault, nem
`contexto/DESIGN.md`, nem o LBOS, nem as quatro skills operacionais. Só existem as cópias
institucionais desta pasta.

Busquei no catálogo público de skills por prospecção, geração de leads, scraping e CRM:
**zero resultados**. Não há substituto pronto. As skills precisam vir do vault.

---

## 4. Segurança

**FATO**, feito nesta sessão:

- `.gitignore` criado, com `.env` bloqueado e `dados/raw/` bloqueado (dado bruto de
  raspagem pode conter dado pessoal de prospect).
- `.env.example` criado, **só com nomes de variável**, nenhum valor.
- Nenhum segredo apareceu em terminal, markdown ou chat durante a auditoria.
- A pasta **não é repositório git** ainda. Sem git, o `.gitignore` é preventivo. Vale rodar
  `git init` antes de qualquer credencial entrar no `.env`.

Variáveis previstas no `.env.example`: URL e chaves do Supabase `rv-acquisition`, token da
Apify, conta de e-mail. Todas vazias.

---

## 5. Estrutura do workspace

Reorganizada nesta sessão conforme a `ESPECIFICACAO-CAMPANHA.md` §2:

```
campanha-acquisition-amp/
├── CLAUDE.md                    criado
├── ESPECIFICACAO-CAMPANHA.md
├── PROMPT-INICIAL.md
├── PLANO-DE-EXECUCAO.md         criado
├── PARA-O-FELIPE.md             criado
├── PROMPT-PARA-O-VAULT.md       criado
├── PROXIMA-SESSAO.md            criado
├── README.md
├── .gitignore                   criado
├── .env.example                 criado
├── contexto/                    15 documentos, renomeados conforme a especificação
├── pesquisa/                    01-boas-praticas-pesquisadas.md
├── dados/                       vazio
├── scripts/                     vazio
└── relatorios/                  este arquivo
```

Nenhum arquivo foi apagado. Só movido e renomeado.

---

## 6. Lacunas e conflitos encontrados

### Bloqueios reais

| # | Bloqueio | Trava o quê |
|---|---|---|
| B1 | Company OS ausente: sem `rv-prospeccao`, `clarisso`, `rv-copy`, `rv-relatorio`, `DESIGN.md` | Método de abordagem e de copy |
| B2 | MCP do Supabase ausente | Missão 4 inteira |
| B3 | Saldo de crédito da Apify desconhecido | Dimensionar a Missão 2 |
| B4 | Export de clientes do VisionFlow ausente | O Operating System §1 manda rebaixar quem já é cliente. Sem o export, não há como checar |

### Conflitos, resolvidos pelo Felipe em 18/08/2026

Confirmados por ele nesta sessão e registrados no `CLAUDE.md`. A decisão da sessão
prevalece sobre os documentos congelados:

| # | Conflito | Decisão |
|---|---|---|
| C1 | Estúdio de música não está nos segmentos-âncora do ICP. O Operating System §6 trata "mercado novo" como portão humano | **Aprovado seguir** |
| C2 | O Operating System §3 manda usar tripwire `360_tour` em cidade não validada. A sessão quer `website` direto | **Aprovado seguir com `website`** |
| C3 | O Operating System §5 proíbe cotar preço; a especificação permite preço no primeiro contato | **Aprovado: preço pode aparecer** |
| C4 | Regra do recorrente: todo build pede gestão mensal como oportunidade secundária. Os R$ 1.500 cobrem só o ano 1 | **Em aberto.** Falta definir a renovação |

### Lacunas menores

| # | Lacuna | Impacto |
|---|---|---|
| L1 | `alvo-site-AMP-referencia.md` citado no `PROMPT-INICIAL.md` não existe nesta pasta | Baixo. O projeto real está em `../amp-estudio` com documentação completa |
| L2 | Códigos `website_management` e `domain_management` estão marcados como "a criar" no Operating System, e não constam na lista de codes do `aquisicao-contract.md` | Bloqueia gravar `prospect_services` corretamente |
| L3 | `aquisicao-mission3-kickstart.md` tem as fases 3, 4 e 5 duplicadas, uma versão concluída e outra em branco | Baixo. Inconsistência a corrigir no vault |

---

## 7. Veredito

O ambiente **serve** para as Missões 2 e 3 já na próxima sessão, desde que o saldo da Apify
seja confirmado.

O ambiente **não serve ainda** para a Missão 4, que depende do MCP do Supabase e do export
de clientes do VisionFlow.

Nada foi executado além de leitura. Nenhum prospect foi criado, nenhuma coleta rodou,
nenhum crédito foi gasto, o Company OS não foi tocado.
