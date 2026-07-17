---
id: KNOWN_ISSUES
title: Problemas Conhecidos & Riscos — Real Vision Academy
type: known_issues
status: active
project: real-vision-academy
phase: planning
owner: master-visionair
created: 2026-07-17
updated: 2026-07-17
related:
  - ARCHITECTURE
---

# Problemas Conhecidos, Limitações e Riscos

> Lista centralizada. Atualizar quando surgir novo risco ou quando um item for resolvido.

## Técnicos (base atual)
- **KI-01 — Auth do blog no Supabase errado.** `src/lib/supabase.ts` aponta hoje pro Supabase do
  VisionFlow. A unificação (D-002) exige migrar auth/likes do blog pro banco novo sem quebrar os
  likes/comentários existentes. Risco na Fase 1.
- **KI-02 — Sem Google OAuth.** Só e-mail/senha + magic link hoje. Habilitar no painel Supabase novo.
- **KI-03 — Sem AuthContext global.** Cada componente usa `useAuth` isolado; área de membros precisa
  de provider único de sessão (a criar na Fase 1).
- **KI-04 — Login do blog incompleto.** Felipe iniciou o login (botão de like) e parou; "não está 100%
  funcional". Auditar o estado real antes/durante a Fase 1.

## Operacionais / pendências de acesso
- **KI-05 — Credenciais do Supabase novo.** Falta a anon key (front) e confirmar Google OAuth
  habilitado. Necessário só na implementação (Fase 1). Nunca colar segredo em texto aberto sem
  necessidade.

## Metodologia
- **KI-06 — Obsidian CLI exige Obsidian aberto.** O comando `obsidian` está instalado, mas só opera
  com o app aberto. Fallback: edição direta dos `.md` (mesma estrutura). Ver [[master-visionair]].

## Decisões em aberto (não são problemas, mas travam fases)
- Gateway de pagamento → [[pagamento]].
- Hospedagem de vídeo → [[video-hosting]].

## Documentos relacionados
- [[ARCHITECTURE]]
- [[CONTEXT]]
