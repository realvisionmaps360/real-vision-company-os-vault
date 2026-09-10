---
title: Plano de Arquitetura — Portal do Projeto Vila dos Corais
tipo: plano-tecnico
status: aguardando-decisoes-do-felipe
cliente: "[[FICHA-CLIENTE]]"
criado_em: 2026-09-09
pertence_a: ["[[FICHA-CLIENTE]]"]
---

> **Documento de arquitetura.** Escrito numa sessão Opus em 09/09/2026 para ser **executado
> numa sessão Sonnet**. Contém a auditoria técnica exigida pelo §37 do PRD já feita — quem
> executar **não refaz a investigação**, só segue as fases.
>
> Produto: [[PRD-PORTAL-PROJETO-2026-09-09]] · Comercial: [[PLANO-EXECUCAO-TRAFEGO-PAGO-2026-09-09]]
> · Cliente: [[FICHA-CLIENTE]] · Histórico: [[Vila-dos-Corais-TIMELINE]] · LBOS: `PRJ-2026-005`

---

## 1. Auditoria técnica — o que realmente existe hoje

Feita em 09/09/2026 sobre o repositório local e o Supabase de produção. **Este é o resultado
do §37 do PRD.** O repositório real venceu o documento em três pontos, marcados com ⚠️.

### 1.1 Repositório

| Item | Realidade |
|---|---|
| Repo | `github.com/realvisionmaps360/viladoscorais` |
| Local | `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/site/` |
| Stack | Vite 5 + React 18 + TypeScript + Tailwind 3 + shadcn/ui (Radix completo) |
| Roteamento | `react-router-dom` v6 |
| Dados | `@tanstack/react-query` v5 |
| Animação | `framer-motion` v12 |
| Deploy | Vercel |
| Origem | Lovable (`lovable-tagger` ainda no devDependencies) |

⚠️ **O clone local está 5 commits atrás do `origin/main`.** O `HEAD` local é `097a4a3`
("Add Google Analytics"). O remoto já tem, entre outros, `794b0ab` (correção do loop de
login) e `b80ebf8` (troca do Supabase para o projeto próprio). **Primeira ação da
implementação é `git pull`** — sem isso a sessão trabalha sobre um site que não existe mais.
Há também um `.gitignore` modificado sem commit no working tree; conferir antes.

### 1.2 Rotas atuais (`src/App.tsx`)

```
/           Index        pública — home + calculadora
/secure     SecurePage   login
/admin      AdminPage    protegida por <ProtectedRoute> (exige role admin)
*           NotFound
```

Após o pull devem existir também `/redefinir-senha` e `/primeiro-acesso`
(`DefinirSenhaPage.tsx`, commit `794b0ab`). Confirmar.

### 1.3 Design system — reutilizar inteiro, não criar nada

Tokens HSL em `src/index.css`, mapeados no `tailwind.config.ts`. **Não introduzir o dark/âmbar
da Real Vision** (PRD §9.3).

| Token | Valor | Papel |
|---|---|---|
| `--background` | `38 35% 97%` | areia clara |
| `--primary` | `175 35% 32%` | teal oceano profundo |
| `--accent` | `15 45% 55%` | coral |
| `--whatsapp` | `142 40% 42%` | verde refinado |
| `--calendar-available` / `--occupied` / `--selected` | — | estados de data |
| `--radius` | `0.375rem` | |
| Serif | Cormorant Garamond | títulos |
| Sans | Inter | corpo |

47 componentes shadcn já instalados (`card`, `accordion`, `progress`, `badge`, `tabs`,
`sheet`, `dialog`, `form`, `sonner`, `skeleton`…). **Tudo que o portal precisa já está lá.**
Componentes próprios reaproveitáveis: `WhatsAppButton`, `MenuOverlay`, `NavLink`, `Footer`,
`admin/AdminHeader`.

### 1.4 Supabase

| Item | Valor |
|---|---|
| Projeto ativo | `xcymehoyqppdgvrhytfj` — "viladoscorais", sa-east-1, `ACTIVE_HEALTHY` |
| Conta | Real Vision (migrado do Lovable em 01/09/2026) |
| Acesso via MCP nesta máquina | ✅ confirmado |
| Projeto antigo | `zilfvhgeqniddxskpgdp` — Lovable, sem acesso ao painel, **não usar** |

⚠️ O `.env` do clone local ainda aponta para o projeto **antigo**. Isso é sintoma do atraso
de 5 commits — o `b80ebf8` corrige. Reconferir o `.env` depois do pull; se continuar antigo,
corrigir (variáveis `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`, nunca hardcoded).

**Tabelas existentes — só três:**

| Tabela | Linhas | RLS | Papel |
|---|---|---|---|
| `house_settings` | 1 | ✅ | preço base da diária |
| `date_settings` | 210 | ✅ | bloqueio e preço por data |
| `user_roles` | **1** | ✅ | papel do usuário |

**RLS já implementada:** leitura pública (`anon, authenticated`) em `house_settings` e
`date_settings`; escrita só via `has_role(auth.uid(), 'admin')`. Função `get_current_user_role()`
(`SECURITY DEFINER`, `LIMIT 1`) é o que o front consulta.

**Nenhuma tabela do portal existe.** Tudo em "Modelo de dados conceitual" (PRD §26) é novo.

### 1.5 ⚠️ O achado que muda a arquitetura: não existe modelo de dois papéis

O PRD §8 pede uma matriz onde Flávia e Felipe têm capacidades diferentes. Na prática:

- o enum `app_role` tem **um único valor: `'admin'`**;
- `user_roles` tem **uma única linha** — a conta da Flávia (`administracao@clisam.com.br`);
- **Felipe não tem conta neste Supabase**;
- `ProtectedRoute` só pergunta `isAdmin`, sem granularidade;
- `get_current_user_role()` usa `LIMIT 1` — se um usuário ganhar dois papéis, o retorno vira
  imprevisível.

Ou seja: a frase do PRD "Flávia usa o acesso que já possui" **se sustenta**, mas
"Felipe possui identidade própria" **não existe ainda e precisa ser construída**. Essa é a
decisão de arquitetura mais importante do projeto — ver §3.

### 1.6 Calculadora e disponibilidade — o isolamento pedido pelo PRD já é natural

`usePricingData` e `useBookingCalculation` leem `house_settings` e `date_settings` com a chave
anônima, sem passar por autenticação. O `BookingCalendar` / `HeroBookingCard` monta o link do
WhatsApp no cliente.

**Consequência boa:** se o portal usar tabelas novas e não tocar nessas duas, o requisito
crítico do PRD §11 ("a calculadora não pode depender do portal") é atendido por construção,
não por disciplina. **Regra fixada: nenhum arquivo em `hooks/usePricingData`,
`hooks/useBookingCalculation`, `BookingCalendar`, `HeroBookingCard` ou as duas tabelas de
preço/data é alterado por este projeto.**

### 1.7 Tracking

- GA4 `G-8P07EHPVYR` via `gtag.js` no `index.html` (14/08/2026).
- **Nenhum evento customizado implementado** — não existe evento de clique no WhatsApp.
- Google Ads ainda não vinculado ao GA4 da cliente.
- Sem PostHog.

⚠️ A tela Campanha (PRD §17) depende de um evento que **ainda não existe**. Criá-lo é
pré-requisito da Fase 2, não da Fase 1.

### 1.8 PWA

Sem `manifest.json`, sem service worker. Adicionar manifest é trivial e não introduz cache —
service worker fica **fora de escopo** (PRD §22: "não criar cache que possa afetar a
calculadora").

---

## 2. Arquitetura proposta

### 2.1 Princípio que governa tudo

> O portal é **aditivo**. Ele acrescenta uma rota, tabelas novas com prefixo próprio e um
> papel novo. Não altera nenhuma linha do caminho público de reserva.

### 2.2 Rotas

```
/                      pública (intocada)
/secure                login (intocada)
/admin                 gestão de datas (intocada)  ← o portal linka pra cá
/projeto               PORTAL — Início            ← novo
/projeto/informacoes   Informações                ← novo
/projeto/campanha      Campanha (Fase 2)          ← novo
*                      NotFound
```

`/admin` **não é reconstruída** (PRD §11). O portal oferece o botão "Gerenciar datas"
apontando pra ela, e a `AdminHeader` ganha um link de volta pro portal.

### 2.3 Papéis — a decisão a tomar

Duas opções reais. Recomendo a **A**.

**Opção A — estender o enum `app_role` (recomendada).**
Adicionar o valor `'gestor'` (Felipe). Flávia continua `'admin'` — nada quebra, o login dela
não muda, `/admin` segue funcionando exatamente igual.

- ✅ menor mudança possível; nenhuma migração de dados
- ✅ `has_role()` e `get_current_user_role()` continuam servindo
- ⚠️ exige trocar `LIMIT 1` por um retorno determinístico, ou garantir um papel por usuário
- ⚠️ o nome "admin" fica semanticamente estranho pra cliente — mas é mecanismo interno, não
  conceito de produto (PRD §8 autoriza explicitamente isso)

**Opção B — tabela `project_members` com capacidades por ação.**
Mais fiel à letra do PRD §8, e mais trabalho: nova tabela, novas policies, novo hook, e a
`/admin` passaria a ter dois caminhos de autorização convivendo.

- ✅ granularidade real por ação
- ❌ constrói o sistema genérico de roles que o próprio PRD §32 lista como fora de escopo

**Recomendação:** A. A granularidade que o PRD pede cabe dentro das *policies* de cada tabela
nova (quem escreve o quê), sem precisar de uma camada de permissão genérica.

**Pendência operacional:** Felipe precisa de uma conta neste Supabase. Criar via SQL com papel
`'gestor'` — mesma receita já usada pra recriar a conta da Flávia em 01/09/2026.

### 2.4 Modelo de dados — tabelas novas, prefixo `portal_`

O prefixo deixa óbvio no painel do Supabase o que é do portal e o que é do site público.
Uma única linha em `portal_project` — sem multiempresa, sem multicliente (PRD §32).

```
portal_project        id · nome · status · etapa_atual · iniciado_em · encerrado_em · updated_at
portal_info           id · chave · pergunta · valor(text) · categoria · autor_id · updated_at
portal_checklist      id · tipo(material|acesso) · titulo · descricao · ajuda ·
                      estado(pendente|cliente_confirmou|rv_confirmou) ·
                      confirmado_cliente_em · confirmado_rv_em · ordem
portal_weekly         id · semana_inicio · semana_fim · publicado_em ·
                      dados(jsonb) · origem_dados · comentario_md · autor_id
portal_history        id · acao · entidade · entidade_id · autor_id · criado_em
```

Notas de arquitetura:

- `portal_weekly.dados` como `jsonb` porque o conjunto de métricas ainda é indefinido
  (PRD §14.1). Colunas fixas agora seriam invenção.
- `portal_weekly.origem_dados` atende ao §27 — todo número exibido carrega procedência.
- Ausência de linha em `portal_weekly` ⇒ "Dados desta semana ainda não atualizados", nunca
  zero (§28).
- `portal_checklist.estado` com três valores, não booleano: é o que resolve o caso
  "Flávia marca já enviei mas esqueceu um arquivo" (§31).
- `portal_history` alimentado por *trigger*, não pelo front — o front pode ser burlado.
- **Nenhuma FK para `date_settings` ou `house_settings`.** Acoplamento zero.

**RLS por tabela (esboço; validar na implementação):**

| Tabela | `admin` (Flávia) | `gestor` (Felipe) | `anon` |
|---|---|---|---|
| `portal_project` | SELECT | SELECT, UPDATE | — |
| `portal_info` | SELECT, INSERT, UPDATE | SELECT | — |
| `portal_checklist` | SELECT, UPDATE (só campos de cliente) | SELECT, INSERT, UPDATE | — |
| `portal_weekly` | SELECT | ALL | — |
| `portal_history` | SELECT | SELECT | — |

`anon` sem acesso a nada (§29). A restrição por coluna em `portal_checklist` sai com
`WITH CHECK` na policy de UPDATE.

### 2.5 Camada de código

```
src/pages/ProjetoPage.tsx              shell + roteamento interno
src/components/portal/
  PortalLayout.tsx        cabeçalho, navegação, rodapé — reusa NavLink/Footer
  AgoraSection.tsx        "Agora" (§15.1)
  JaFeitoSection.tsx      compacto, colapsável (§15.2)
  DepoisSection.tsx       lista de etapas futuras (§15.3)
  ChecklistCard.tsx       material ou acesso, com ajuda contextual (§21)
  BriefingForm.tsx        máx. 3 campos por etapa (§20)
  InfoList.tsx            memória organizada (§16)
  WeeklyCard.tsx          dados + comentário (Fase 2)
  FunilMonitorado.tsx     fronteira de medição explícita (§12)
src/hooks/
  usePortalProject.ts     estado do projeto
  usePortalChecklist.ts   materiais e acessos
  usePortalInfo.ts        briefing e informações
  usePortalWeekly.ts      acompanhamento semanal (Fase 2)
```

Tudo via `react-query` (já instalado). Nenhuma biblioteca nova. Nenhum `localStorage` como
fonte de verdade (§23).

### 2.6 Como a Fase 2 mede o funil

O evento que falta é o clique no WhatsApp. Ordem:

1. disparar `gtag('event', 'whatsapp_click', {...})` no `WhatsAppButton` e no CTA da
   calculadora — **alteração aditiva, não muda comportamento do botão**;
2. marcar o evento como conversão no GA4;
3. vincular a conta Google Ads da cliente ao GA4 (depende do acesso dela);
4. só então a tela Campanha exibe número.

Este é o único ponto em que o projeto encosta em arquivo do fluxo público. É uma linha de
telemetria, não de lógica — mas exige teste da calculadora antes do deploy (§39).

---

## 3. Decisões que dependem do Felipe antes da implementação

| # | Decisão | Recomendação |
|---|---|---|
| D-A | Rota do portal | `/projeto` |
| D-B | Modelo de papéis | Opção A — enum `'gestor'` |
| D-C | Prefixo das tabelas | `portal_` |
| D-D | Conta do Felipe no Supabase da cliente | criar via SQL, papel `gestor` |
| D-E | Como a Flávia chega no portal | link no WhatsApp + atalho na `/admin` |
| D-F | PWA | só `manifest.json`, sem service worker |
| D-G | Nome do portal para a cliente | "Seu Projeto" ou "Projeto Vila dos Corais" |

Nada disso é irreversível, mas mudar depois de implementado custa retrabalho.

---

## 4. Fases de implementação

Ordem derivada do §38 do PRD, ajustada pelo que a auditoria encontrou.

### Fase 0 — Sincronizar antes de tocar em qualquer coisa
- [ ] `git pull` no repo da cliente (5 commits atrás)
- [ ] conferir o `.gitignore` modificado sem commit
- [ ] confirmar que o `.env` aponta para `xcymehoyqppdgvrhytfj`
- [ ] `npm install` e `npm run build` limpos antes de qualquer edição
- [ ] rodar o site local e confirmar: home, calculadora, login, `/admin`
- [ ] criar branch própria (não trabalhar direto na `main`)

**Verificar:** build verde e calculadora funcionando *antes* da primeira linha nova.

### Fase 1 — Fundação (Mês 1)
- [ ] decisões D-A a D-G aprovadas pelo Felipe
- [ ] migração SQL: enum `'gestor'`, tabelas `portal_*`, RLS, triggers de histórico
- [ ] conta do Felipe criada e login testado
- [ ] rota `/projeto` sob `ProtectedRoute` ajustado para aceitar os dois papéis
- [ ] `PortalLayout` com os tokens existentes
- [ ] tela Início: Agora / Já feito / Depois
- [ ] Briefing (3 perguntas do §20), Materiais, Acessos
- [ ] tela Informações
- [ ] botão "Gerenciar datas" → `/admin`, e link de volta na `AdminHeader`
- [ ] visão do Felipe (confirmação de recebimento)
- [ ] textos revisados contra `contexto/VOZ.md` e aprovados pelo Felipe

**Verificar:** Flávia entra com a conta que já tem, responde tudo sozinha, dá refresh e o
estado persiste. Site público e calculadora intactos.

### Fase 2 — Campanha ativa (Mês 2)
- [ ] evento `whatsapp_click` no GA4 + marcado como conversão
- [ ] Google Ads da cliente vinculado ao GA4
- [ ] definir o conjunto mínimo de métricas (só depois de ver o que existe)
- [ ] tela Campanha: estado, resumo da semana, funil monitorado, comentário da RV
- [ ] estado "sem dados" tratado explicitamente

**Verificar:** desligar a fonte de dados e conferir que a tela diz "não atualizado", não zero.

### Fase 3 — Consolidação (Mês 3)
- [ ] histórico das semanas
- [ ] visão consolidada e relatório final (usar a skill `rv-relatorio`)
- [ ] aprendizados internos → skill `rv-trafego-pago`

### Fase 4 — Encerramento
- [ ] `portal_project.status` = encerrado
- [ ] definir o que continua editável
- [ ] extrair o playbook replicável (PRD §2.2)

---

## 5. Travas de produção

Reproduzidas do §39 do PRD, com os três itens que a auditoria acrescentou:

- [ ] repo sincronizado com `origin/main` antes de começar (**novo**)
- [ ] `.env` confirmado no projeto Supabase certo (**novo**)
- [ ] nenhum arquivo do fluxo público alterado além do evento de telemetria (**novo**)
- [ ] calculadora testada · bloqueio de datas testado · autenticação testada
- [ ] permissões testadas nos dois papéis · persistência testada · mobile testado
- [ ] textos revisados · nenhum dado de campanha exibido sem origem validada

---

## 6. O que este plano deliberadamente NÃO faz

Reafirmando o §32 do PRD, porque é onde projetos como este descarrilham:

sem multicliente · sem sistema genérico de roles · sem CMS · sem upload de mídia
· sem dashboard completo do Ads · sem reescrever a gestão de datas · sem nova
identidade visual · sem service worker · sem chat interno.

A V1 pertence à Vila dos Corais. O que se replica depois é o **processo**, não o código.

---

## Relacionados
- Produto: [[PRD-PORTAL-PROJETO-2026-09-09]]
- Comercial e fases anteriores: [[PLANO-EXECUCAO-TRAFEGO-PAGO-2026-09-09]]
- Cliente: [[FICHA-CLIENTE]]
- Histórico: [[Vila-dos-Corais-TIMELINE]]
