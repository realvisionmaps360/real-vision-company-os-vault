---
name: reference_company_os_git_vault
description: A raiz do Company OS (Desktop\Real Vision) TEM git — é o vault Obsidian sincronizado com o celular; só arquivos .md têm histórico de versão
metadata: 
  node_type: memory
  type: reference
  originSessionId: 4ad1ce3b-3fa1-4f28-bfb6-973a524ffc24
---

**Correção (04/07/2026):** esta memória dizia que a raiz do Company OS não tinha git. Isso ficou desatualizado a partir de 28/06/2026, quando foi criado o repositório privado `real-vision-company-os-vault` na raiz — é o mecanismo que sincroniza o vault Obsidian entre PC e celular (auto commit/push/pull a cada 5 min via plugin Obsidian Git). Detalhes técnicos completos em `operacao/gestao/infraestrutura/obsidian/REGISTRO-Tecnico.md`.

O que continua verdade, só que com motivo diferente: **apenas arquivos `.md` têm histórico de versão** nesse git — o `.gitignore` da raiz ignora tudo por padrão e libera só `.md` (e pastas, pra navegação). Fotos, vídeos, PDFs, `node_modules` e os repositórios de código de projetos (VisionFlow, real-vision-site, solariumaarau, sunbite-site, rv-cartaodigital-paraty-onboard — cada um com `.git` próprio) ficam de fora desse vault, listados nominalmente no `.gitignore` para não virarem "repo dentro de repo".

Implicação que continua válida: dado que não é `.md` (ex: binários, ou dados que precisam de mais garantia que um arquivo solto) não tem rede de segurança nesse vault. Isso pesou na decisão de guardar dados de aquisição em banco (Supabase) em vez de arquivo markdown → [[project_acquisition_system_arquitetura]]. Para qualquer dado crítico não-textual, preferir banco com backup, não arquivo solto.
