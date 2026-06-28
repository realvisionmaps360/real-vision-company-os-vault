# Mission 3 — Construção do Banco (Kickstart)

> **Pré-requisito:** Mission 2 (arquitetura) aprovada em 20/06/2026 ✅
> **Referência de arquitetura:** [`ACQUISITION-SYSTEM-ARCHITECTURE.md`](ACQUISITION-SYSTEM-ARCHITECTURE.md)
> **Papel do agente:** [`ACQUISITION-CLAUDE.md`](ACQUISITION-CLAUDE.md)

---

## Objetivo

Transformar o desenho da Mission 2 em sistema funcionando. Ao final desta missão, todo lead de aquisição nasce, vive e morre no banco — e os agentes têm um contrato único de acesso.

---

## Checklist completo (ordem de execução)

### Fase 1 — Banco ✅ CONCLUÍDA (25/06/2026)

- [x] Criar novo projeto no Supabase (conta do Felipe) — **separado** do VisionFlow (`ghwjetvazmdlaqidgxqi`)
  - Nome: `rv-acquisition` · Project ID: `gexacmtkjqectfqwhunv` · Região: `sa-east-1`
  - URL: `https://gexacmtkjqectfqwhunv.supabase.co`
  - Anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (ver Supabase dashboard)
  - Service role key: **nunca commitar — pegar no Supabase dashboard → Settings → API**
- [x] Rodar SQL das 8 tabelas:
  - `services` (catálogo de 12 serviços — pré-populado)
  - `prospects` (ficha canônica, índice único nome_normalized+city_normalized, pg_trgm fuzzy)
  - `prospect_events` (append-only, nunca UPDATE/DELETE)
  - `campaigns`
  - `campaign_prospects` (join muitos-para-muitos)
  - `prospect_services` (oportunidades por lead)
  - `report_snapshots` (memória do relatório semanal)
  - `prospect_contacts` (decisores adicionais)
- [x] RLS ativo em todas as 8 tabelas — política `service_role_only`
- [x] Dedup testado: tentativa de inserir mesmo `name_normalized+city_normalized` → erro `23505` (bloqueado corretamente)

### Fase 2 — Contrato de acesso ✅ CONCLUÍDA (25/06/2026)

- [x] Arquivo [`ACQUISITION-CONTRACT.md`](ACQUISITION-CONTRACT.md) criado com: dedup 3 camadas, tipos de evento, regra de nunca escrever no VisionFlow, regra de `do_not_contact`, queries do relatório semanal.

### Fase 3 — Atualizar as skills ✅ CONCLUÍDA (25/06/2026)

- [x] `clarisso` — Passo 4 adicionado: dedup + INSERT prospects + score + `prospect_services` + `campaign_prospects`
- [x] `rv-prospeccao` — Etapa 3 e Etapa 6 atualizadas: banco registrado antes do arquivo de contatos; envio confirmado gera evento
- [x] `ACQUISITION-CLAUDE.md` — banco referenciado como fonte única; Anexo substituído por referência ao banco + contrato

### Fase 4 — Migração do histórico ✅ CONCLUÍDA (25/06/2026)

- [x] Campanha `paraty-pousadas-2026-06` criada no banco
- [x] 35 pousadas importadas como prospects (sem duplicatas)
- [x] Eventos registrados: 35 `encontrado` · 35 `qualificado` · 25 `abordado_wa` · 15 `abordado_email`
- [x] 3 prospects com `pesquisa_pendente` (Arte Colonial, Ouro, Apple House — sem contato direto)
- [x] `prospect_services`: 35 × `360_tour` (oferecida) + `website` e `google_business` (identificada) para os 11 de alta prioridade

### Fase 5 — Relatório semanal via banco

- [ ] Contrato de acesso (os agentes precisam saber as regras)
- [ ] Escrever um arquivo `ACQUISITION-CONTRACT.md` na pasta `operacao/prospeccao/` com o contrato que todos os agentes seguem:
  - Antes de criar prospect: fazer dedup (nome_normalized+city; fallback phone/email/domain)
  - Se existe: registrar evento em vez de criar linha nova
  - Toda ação gera evento com campo `agent` (clarisso / rv-prospeccao / acquisition-claude / felipe / romana)
  - Nunca escrever no VisionFlow — handover é sempre manual
  - `potential_services` sempre preencher com todas as oportunidades identificadas, não só a da campanha atual

### Fase 3 — Atualizar as skills

- [ ] `clarisso` — após qualificar um prospect, registrar no banco (dedup + `found` event) em vez de só listar
- [ ] `rv-prospeccao` — ao criar arquivo de campanha, sincronizar com o banco; marcar envio de WA/email como evento `abordado_wa` / `abordado_email`
- [ ] `ACQUISITION-CLAUDE.md` — referenciar o banco como fonte única; substituir o "Anexo — Arquivo de rastreamento" (hoje markdown) pela consulta ao banco

### Fase 4 — Migração do histórico

- [ ] Criar campanha `paraty-pousadas-2026-06` no banco
- [ ] Importar as 35 pousadas do arquivo `paraty-pousadas-contatos.md` como prospects (dedup pelo nome)
- [ ] Para os ~48 que receberam WA/email, registrar evento `abordado_wa` / `abordado_email` com data 16/06/2026
- [ ] Status de cada um: verificar o arquivo e atribuir o status atual
- [ ] Verificar: nenhum duplicado, todos com `potential_services` preenchido

### Fase 5 — Relatório semanal via banco

- [ ] Construir a consulta de 7 partes (equivalente ao relatório semanal da Mission 1) direto no banco
- [ ] Documentar a query em `ACQUISITION-CONTRACT.md` para o Acquisition Claude usar

---

## Credenciais a guardar (após criar o banco)

```
Supabase projeto: rv-acquisition
Project ID: [preencher após criar]
URL: [preencher após criar]
Anon key: [preencher após criar]
Service role key: em .env local — nunca commitar
```

---

## Decisões que ainda não foram tomadas

Estas questões surgirão durante a construção — não precisam ser resolvidas antes de começar:

1. **`potential_services` como array de texto ou tabela separada?**
   - Array de texto (simples): `["Website", "360 Tour"]` — suficiente para fase 1.
   - Tabela `prospect_services` com status por serviço (ex: 360 Tour = "vendido"): só se Felipe quiser rastrear o andamento de cada serviço dentro do mesmo lead. Começar com array e migrar se pedir.

2. **Trigger de backup automático?**
   - Supabase tem backup automático no plano pago. Confirmar se a conta cobre.

3. **Export periódico pro Company OS?**
   - Opcional: um script CSV/JSON que roda manualmente quando quiser um snapshot dos leads. Pode ficar para depois.
