---
name: project-infra-tours-redirect
description: Arquitetura de redirect de tours virtuais — Vercel redireciona /tour/* para Hostinger via subdomínio tour.realvisionmaps.com
metadata: 
  node_type: memory
  type: project
  originSessionId: 032138d8-9f69-4839-b246-88287dbefd8d
---

Tours virtuais ficam na Hostinger (`/public_html/tour/`), site principal na Vercel. O subdomínio `tour.realvisionmaps.com` aponta para essa pasta via DNS A record (`185.173.111.51`). A Vercel tem uma Routing Rule com Regex `^/tour/(.*)$` redirecionando para `https://tour.realvisionmaps.com/$1` (status 307).

**Why:** Após migrar o domínio para Vercel, os links antigos `/tour/barraclub/` quebraram porque a Vercel não tem os arquivos físicos. Solução: manter arquivos na Hostinger e redirecionar via Vercel — sem precisar reenviar links para clientes.

**How to apply:** Novos tours só precisam ser enviados para a Hostinger em `/public_html/tour/nome/`. Não é necessário mexer na Vercel para cada tour novo — a Routing Rule já cobre tudo. Documentação completa em `operacao/projetos/real-vision-site/INFRA-TOURS-REDIRECT.md`.
