---
name: diagnostico-hospedagem-real
description: Como descobrir onde um site está realmente hospedado (não onde o cliente acha que está) antes de mexer em DNS ou código
metadata: 
  node_type: memory
  type: reference
  originSessionId: ae89b8dc-1f82-487b-bd12-c2d46c3e3e30
---

Validado em jul/2026 no caso [[project_conecta_saude_migracao]] — um cliente achava que não sabia mais onde o site dele estava publicado (Lovable? Vercel? Nem no Vercel dele aparecia).

## Como diagnosticar

1. `nslookup <dominio>` — pega o IP que o domínio resolve
2. `curl -sI https://<dominio>/` — olha os headers de resposta. `Server: cloudflare` + header `x-deployment-id` é sinal de Lovable (eles rodam atrás de Cloudflare com esse header). Vercel mostra headers próprios diferentes
3. `curl -s "https://ipinfo.io/<IP>/json"` — o campo `hostname` costuma denunciar o provedor de verdade (ex: `lovable-app-cd-1-4.p.l5e.io` = infraestrutura própria do Lovable, mesmo atrás de Cloudflare)
4. Pra achar o domínio real de comparação: olhar o subdomínio nativo da plataforma (ex: `*.lovable.app`) e comparar range de IP

## Por que isso importa

Clientes migram de ferramenta (Lovable → Claude Code, por exemplo) e sincronizam o código num repositório GitHub novo, mas **isso não migra a hospedagem**. O domínio continua apontando pro host antigo até alguém trocar o DNS de propósito. Sem esse diagnóstico, dá pra passar horas editando um código que nunca vai aparecer no ar.

Ver também: [[project_lovable_para_vercel_migracao]] pro passo a passo completo de migração depois de diagnosticado.
