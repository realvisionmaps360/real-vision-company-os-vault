---
name: project-visionflow-migracao
description: "Migração do VisionFlow concluída em 15/06/2026 — Supabase próprio ghwjetvazmdlaqidgxqi, Google OAuth ativo, 35 clientes importados"
metadata: 
  node_type: memory
  type: project
  originSessionId: 26428b90-2d9f-447f-a3bd-7180ab60fed3
---

Migração do VisionFlow (CRM) de Lovable Cloud para Supabase próprio **concluída em 15/06/2026**.

## Infra atual

| Item | Valor |
|------|-------|
| Supabase Project ID | `ghwjetvazmdlaqidgxqi` |
| Supabase URL | `https://ghwjetvazmdlaqidgxqi.supabase.co` |
| Anon key | `sb_publishable_bQF2RD0bgWllmjsnGHyX0g_bivuf4Po` |
| Vercel projeto | `visionflow-crm` (Felipe's projects — Hobby) |
| Repo GitHub | `realvisionmaps360/visionflow-crm-48fe197a` |
| Domínio | `visionflow.realvisionmaps.com` |
| GCP projeto OAuth | `visionflow-494611` |
| Google Client ID | `258542151140-4au7uv67ed0ug5vp1ad29od117j1ccr7.apps.googleusercontent.com` |

## Estado atual

- ✅ 35 clientes importados com todas as 7 abas
- ✅ Login com email/senha funcionando
- ✅ Login com Google funcionando
- ✅ Felipe com papel `admin` em `user_roles`
- ✅ Código limpo (sem dependências da Lovable)

## Armadilhas conhecidas

1. **Triggers de auditoria bloqueiam bulk inserts via service_role** — ao fazer qualquer import em massa, desabilitar os `trg_log_*` antes e reabilitar depois.
2. **user_roles não tem coluna email** — só `user_id uuid` e `role app_role`. Para adicionar admin: `INSERT INTO public.user_roles (user_id, role) SELECT id, 'admin' FROM auth.users WHERE email = '...'`
3. **Romana ainda não tem role** — quando ela logar pela primeira vez, rodar o INSERT acima com `romana.loznjakovic@gmail.com`.
4. **PDFs e logos ficam como base64 no banco** — não em bucket Storage. A exportação/importação cobre tudo.

## Documentação completa

`operacao/projetos/visionflow/docs/MIGRACAO-SUPABASE.md` — contém todo o processo, SQLs e credenciais não-sensíveis.

**Why:** Lovable foi abandonado (conta banida em mai/2026); VisionFlow agora roda 100% independente.

**How to apply:** Migração encerrada. Se precisar reimportar dados: script em `scripts/importar_dados.py` é idempotente. [[feedback-lovable-abandonado]]
