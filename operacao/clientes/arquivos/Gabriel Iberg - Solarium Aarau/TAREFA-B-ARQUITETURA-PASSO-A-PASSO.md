# Tarefa B: Mapear Arquitetura + Começar Configuração

**Data:** 06/07/2026  
**Executor:** Felipe  
**Foco:** Gabriel — sistema GA4 → Relatório → Email (mensal)  
**Infraestrutura:** Supabase Functions (cron automático)  
**Revisão:** Manual (Felipe revisa HTML + email antes de enviar)

---

## VISÃO GERAL DO SISTEMA

```
[1º do mês, 08:00 UTC]
        ↓
[Supabase Cron Job dispara]
        ↓
[Edge Function: "relatorio-mensal"]
        ├─→ Busca dados GA4 (MCP google-analytics)
        ├─→ Compara vs. baseline
        ├─→ Gera HTML (skill rv-relatorio)
        ├─→ Embute imagens
        ├─→ Envia email (Resend)
        └─→ Loga resultado em Supabase
        ↓
[Email recebido por solariumaarau@gmail.com]
```

---

## ETAPA 1: Preparar Supabase

### Passo 1.1 — Adicionar coluna `ga4_property_id` à tabela `clients`

**Acesso:** Supabase Dashboard > `ghwjetvazmdlaqidgxqi` > SQL Editor

**SQL a executar:**

```sql
-- Adicionar coluna à tabela clients
ALTER TABLE public.clients
ADD COLUMN ga4_property_id TEXT,
ADD COLUMN ga4_access_confirmed BOOLEAN DEFAULT FALSE,
ADD COLUMN relatorio_base_date DATE,
ADD COLUMN relatorio_frequency TEXT DEFAULT 'mensal';

-- Adicionar comentário
COMMENT ON COLUMN public.clients.ga4_property_id IS 'Google Analytics 4 property ID (ex: G-7SZVNPKT6L)';
COMMENT ON COLUMN public.clients.relatorio_frequency IS 'Frequência de relatório: mensal, semanal, sob-demanda';
```

**Como executar:**
1. Abrir Supabase Dashboard
2. Selecionar projeto `ghwjetvazmdlaqidgxqi`
3. Ir para "SQL Editor"
4. Colar o SQL acima
5. Clicar "Run"
6. Resultado esperado: "Success — Ran 4 queries"

**Se der erro:** copiar a mensagem de erro completa e me enviar.

### Passo 1.2 — Preencher dados de Gabriel

**SQL:**

```sql
-- Buscar o ID de Gabriel
SELECT id, nome FROM public.clients WHERE nome ILIKE '%gabriel%' OR nome ILIKE '%solarium%';
```

**Nota o UUID retornado, exemplo:** `12345678-1234-1234-1234-123456789012`

**Depois, atualizar os dados dele:**

```sql
UPDATE public.clients
SET 
  ga4_property_id = 'G-7SZVNPKT6L',
  ga4_access_confirmed = FALSE,  -- mudar para TRUE após confirmar acesso no checklist
  relatorio_frequency = 'mensal'
WHERE nome ILIKE '%gabriel%' OR nome ILIKE '%solarium%';
```

**Resultado esperado:** "Success — 1 row affected"

---

## ETAPA 2: Criar Supabase Function

### Passo 2.1 — Criar a função (Edge Function)

**Localização:** Supabase Dashboard > Functions

**Ação:**
1. Clicar "+ Create new function"
2. Nome: `relatorio-mensal`
3. Selecionar template: `HTTP request (with CORS)` ou `Database webhook`
4. Clicar "Create function"

**Código inicial (cole no editor):**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    // [1] Buscar clientes com plano_mensal = true (por enquanto: só Gabriel)
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('id, nome, email, ga4_property_id')
      .eq('ga4_access_confirmed', true)
      .eq('relatorio_frequency', 'mensal')
    
    if (clientsError) throw clientsError
    if (!clients || clients.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Nenhum cliente com acesso GA4 confirmado' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // [2] Para cada cliente, buscar GA4 + gerar relatório
    const results = []
    for (const client of clients) {
      try {
        // [AQUI ENTRA LÓGICA DE GA4 + rv-relatorio + ENVIO]
        results.push({
          client: client.nome,
          status: 'pendente', // será implementado na próxima fase
        })
      } catch (err) {
        results.push({
          client: client.nome,
          status: 'erro',
          error: String(err),
        })
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

**Como colar e salvar:**
1. Colar o código acima no editor
2. Clicar "Save" (canto superior direito)
3. Supabase vai fazer deploy automático
4. Resultado esperado: "Function deployed" com um URL tipo `https://xxxx.functions.supabase.co/relatorio-mensal`

**Copiar esse URL e guardar para próxima etapa.**

### Passo 2.2 — Testar a função manualmente

**Acesso:** Supabase Dashboard > Functions > `relatorio-mensal` > Invoke

**Ação:**
1. Clicar na aba "Invoke"
2. Clicar "Send request"
3. Verificar resposta em "Response"

**Resultado esperado:**
```json
{
  "success": true,
  "results": [
    {
      "client": "Gabriel Iberg — Solarium Aarau",
      "status": "pendente"
    }
  ]
}
```

**Ou:** mensagem "Nenhum cliente com acesso GA4 confirmado" (se ainda não confirmou o checklist).

---

## ETAPA 3: Configurar Cron Job

### Passo 3.1 — Ativar pg_cron extension

**SQL (no Supabase SQL Editor):**

```sql
-- Ativar pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Verificar se está ativo
SELECT * FROM pg_extension WHERE extname = 'pg_cron';
```

**Resultado esperado:** uma linha com `pg_cron | true`

### Passo 3.2 — Criar o job de cron

**SQL:**

```sql
-- Criar job que dispara todo dia 1º do mês às 08:00 UTC
SELECT cron.schedule(
  'relatorio-mensal-gabriel',  -- job ID
  '0 8 1 * *',                 -- 1º dia, 08:00 UTC (usar crontab.guru se quiser testar outro horário)
  $$
  SELECT
    net.http_post(
      url:='https://xxxx.functions.supabase.co/relatorio-mensal',
      headers:='{"Authorization": "Bearer seu-token-aqui"}'::jsonb,
      body:='{}'::jsonb
    ) as request_id;
  $$
);
```

**IMPORTANTE:** Trocar `https://xxxx.functions.supabase.co/relatorio-mensal` pela URL real da sua função (passo 2.1).

**Como conseguir um token válido:**
1. Ir para Settings > API
2. Copiar `service_role` key (é o token com permissão total)
3. Colocar no lugar de `seu-token-aqui`

**Resultado esperado:** "Success — job scheduled"

### Passo 3.3 — Verificar jobs ativos

**SQL:**

```sql
SELECT * FROM cron.job;
```

**Resultado esperado:** você vai ver a linha de `relatorio-mensal-gabriel` listada.

---

## ETAPA 4: Estrutura de Armazenamento

### Passo 4.1 — Onde vão os relatórios gerados?

**Opção A:** Salvar na pasta local do cliente (que você depois anexa ao email)
- Caminho: `operacao/clientes/arquivos/Gabriel Iberg - Solarium Aarau/relatorios-gerados/`
- Pro: fácil de revisar, backup local
- Contra: Supabase Function (Deno) não acessa direto o filesystem do PC

**Opção B:** Salvar em Supabase Storage
- Bucket: `client-reports`
- Caminho: `gabriel/relatorio-mensal-2026-07.html`
- Pro: acessível via URL, fácil de compartilhar
- Contra: precisa criar bucket e permissões

**Recomendação para Fase 1 (manual):** você roda a função → ela gera JSON com dados GA4 → você passa pro script de geração de HTML local → revisa → envia.

**Para Fase 2 (automático):** usar Supabase Storage ou salvar em banco (blob).

---

## PRÓXIMAS AÇÕES PARA VOCÊ

### ✅ Agora (Fase 1 — Manual):

1. **Preencher GA4-DIAGNOSTICO-CHECKLIST.md**
   - Confirmar acesso GA4
   - Coletar primeira data com dados
   - Reportar resultado

2. **Etapa 1 (Supabase):**
   - Executar SQL 1.1 (adicionar colunas)
   - Executar SQL 1.2 (preencher dados de Gabriel)

3. **Etapa 2 (Function):**
   - Criar função `relatorio-mensal`
   - Testar invocação manual
   - Copiar URL da função

4. **Etapa 3 (Cron):**
   - Ativar `pg_cron`
   - Criar job de cron (trocar URL pela sua)
   - Verificar se job aparece em `cron.job`

5. **Reportar para mim:**
   - "Etapas 1–3 concluídas, aqui está o status..."
   - Eu vou montar a lógica de integração com GA4 + rv-relatorio + envio

### ⏳ Depois (Fase 2 — Automático):

- Eu crio a integração real (GA4 fetch + rv-relatorio call + Resend send)
- Você testa com a função disparada manualmente
- Validamos o primeiro relatório de Gabriel
- Deixamos o cron rodando automático

---

## REFERÊNCIAS RÁPIDAS

| Item | Link/Comando |
|---|---|
| **Supabase Dashboard** | https://supabase.com/dashboard/projects |
| **Projeto RV** | `ghwjetvazmdlaqidgxqi` |
| **SQL Editor** | Supabase > SQL Editor |
| **Crontab.guru** | https://crontab.guru (testador de cron expressions) |
| **Skill rv-relatorio** | `~/.claude/skills/rv-relatorio/` |
| **Skill rv-email** | `~/.claude/skills/rv-email/` |

---

## CHECKLIST DE CONCLUSÃO

- [ ] Etapa 1.1: Colunas adicionadas a `clients`
- [ ] Etapa 1.2: Dados de Gabriel preenchidos
- [ ] Etapa 2.1: Função `relatorio-mensal` criada e testada
- [ ] Etapa 2.2: Invocação manual testada com sucesso
- [ ] Etapa 3.1: `pg_cron` extension ativa
- [ ] Etapa 3.2: Job de cron criado
- [ ] Etapa 3.3: Job listado em `cron.job`

**Quando tudo acima estiver ✓, me reportar o status e próximas ações.**
