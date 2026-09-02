# Segmentação de Contatos — Hermes

> Como organizar a base de email (`email_contatos`, Supabase `ghwjetvazmdlaqidgxqi`) pra disparar campanhas por grupo em vez de sempre mandar pra todo mundo. Ligado à skill `rv-email` (Hermes).

## Por que existe este documento

Até 22/07/2026 a Real Vision só tinha disparado 2 campanhas simples (lista inteira ou filtro solto por `status='ativo'`). Com a squeeze page da campanha "SLM vs LLM" (captura de lead antes do link do grupo WhatsApp) e a entrada de leads de nicho (ex: pousada), a lista vai crescer e precisa de segmentação de verdade — sem duplicar dado que já existe em outra tabela.

## Duas formas de segmentar (não confundir)

### 1. Contato ligado a cliente (`email_contatos.cliente_id` preenchido)

Não usa tag. O dado já existe no VisionFlow — consulta via `join`, sempre atualizado, nunca duplicado.

**Tipo de serviço** (`client_services.service_name`, tabela `client_services`):
```sql
select ec.nome, ec.email
from email_contatos ec
join client_services cs on cs.client_id = ec.cliente_id
where ec.status = 'ativo'
  and cs.status = 'ativo'
  and cs.service_name ilike '%tour%'; -- ou '%site%', etc — usar o valor real cadastrado no VisionFlow
```

**Mensalidade/anuidade a vencer** (`tasks.recurrence` + `tasks.due_date`, ligado por `client_id`):
```sql
select ec.nome, ec.email, t.due_date
from email_contatos ec
join tasks t on t.client_id = ec.cliente_id
where ec.status = 'ativo'
  and t.recurrence = 'mensal'   -- ou 'anual'
  and t.status = 'a_fazer'
  and t.due_date between current_date and current_date + interval '7 days';
```

> Antes de rodar em produção, confirmar com Felipe se toda tarefa recorrente em `tasks` representa mesmo cobrança de mensalidade/anuidade (pode ter tarefa recorrente que não é financeira) — não presumir.

### 2. Contato sem cliente (leads de blog, campanha, nicho) → coluna `tags`

Adicionada em 22/07/2026: `email_contatos.tags text[]` (índice GIN). Usar quando não dá pra derivar de outra tabela — nicho do lead, origem de campanha específica.

**Convenção de nomenclatura:**
- Origem automática (preenchida pela Edge Function `capture-community-lead`): `lead-<origem>` — ex. `lead-blog-diferenca-entre-llm-e-slm`
- Nicho (preenchido manualmente, quando Felipe identificar): `nicho-pousada`, `nicho-restaurante`, etc.
- Campanha específica (quando quiser reagrupar por campanha, além da origem): `campanha-slm-llm`

**Exemplo de query por tag:**
```sql
select nome, email from email_contatos
where status = 'ativo' and tags @> array['nicho-pousada'];
```

**Combinar tags (E lógico):**
```sql
where tags @> array['nicho-pousada', 'lead-blog-diferenca-entre-llm-e-slm']
```

## Estado da base

> Cada apuração vira uma linha nova aqui, com data. Não sobrescrever a anterior: foi justamente
> um número de julho lido como se fosse de hoje que colocou "28 contatos ativos" no painel do
> VisionVault por mais de um mês.

### 22/07/2026

28 contatos. `origem_consentimento`: 22 `relacao_comercial` (21 já linkados a `cliente_id` — clientes existentes), 3 `teste`, 2 `manual`, 1 `sócia Real Vision 360`. Nenhuma tag aplicada ainda — coluna nova, começa vazia.

### 28/08/2026

28 registros na tabela, **24 com `status = 'ativo'`**. É esse 24 que o painel do VisionVault mostra.

| `status` | `origem_consentimento` | Qtd | Quem |
|---|---|---|---|
| ativo | relacao_comercial | 21 | 20 clientes + o próprio Felipe (`realvisionmaps360`) |
| ativo | manual | 2 | Pais do Felipe (Maria Luci e Acacio) |
| ativo | sócia Real Vision 360 | 1 | Romana |
| bounced | relacao_comercial | 1 | Saiu sozinho pelo webhook do Resend |
| descadastrado | manual | 2 | `smarthomefg` e `felipegarciajericoacoara`, endereços do Felipe |
| descadastrado | teste | 1 | `dronevideomakerjeri`, email de teste do Felipe |

**Clientes reais na lista: 20.** O `realvisionmaps360` continua marcado como `relacao_comercial`
e por isso é contado junto com os clientes.

O que mudou desde julho, e por quê:

- **1 bounce saiu sozinho.** O webhook `resend-webhook`, ativo desde 20/08, tira da lista ativa
  quem dá bounce ou marca spam. Funcionou como devia; o painel é que ficou parado no número velho.
- **Os 3 `teste` não eram teste de sistema.** Dois eram os pais do Felipe, que ele quis manter e
  foram reclassificados de `teste` para `manual`. O terceiro era o email de teste dele.
- **Felipe tinha 3 endereços recebendo cada disparo.** Ficou só o `realvisionmaps360`; os outros
  dois foram descadastrados em 28/08.
- **Descadastrado, não apagado.** Ninguém foi removido da tabela: sai da lista ativa e some das
  métricas, mas o registro fica caso precise voltar.

## Pendente (etapas futuras, não fazer sem Felipe revisar)

- [ ] Reclassificar os 22 contatos `relacao_comercial` com `nicho-*` — precisa Felipe revisar cliente a cliente, não dá pra inferir nicho automaticamente
- [ ] Confirmar com Felipe se `tasks.recurrence` cobre 100% os casos de mensalidade/anuidade, ou se precisa de um campo dedicado em `client_services`
- [ ] UI de tags dentro do VisionFlow (hoje só via SQL/MCP)
- [ ] Fluxo de "email geral disparado sempre que algo novo for criado pra todo mundo" — mencionado por Felipe em 22/07, ainda não desenhado

## Relacionados

- [[README]]
- [[07-COMO-ADICIONAR-CONTATOS]]
- [[08-COLETA-WHATSAPP]]
