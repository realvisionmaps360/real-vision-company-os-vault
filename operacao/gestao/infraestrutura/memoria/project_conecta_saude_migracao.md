---
name: conecta-saude-migracao
description: "Estado da migração do site do cliente Conecta Saúde (Alessandro Furtado) de Lovable pro Vercel, com ativação do Google Analytics — em andamento"
metadata: 
  node_type: memory
  type: project
  originSessionId: ae89b8dc-1f82-487b-bd12-c2d46c3e3e30
---

Cliente: Alessandro Furtado — Associação Beneficiente Conecta Saúde. Pasta: `operacao/clientes/arquivos/Alessandro Furtado - Associação Beneficiente Conecta Saúde/`. Detalhes completos na `FICHA-CLIENTE.md` dessa pasta, sessão 01/07/2026.

**Por quê:** cliente pediu teste da integração GA4 antes de montar o template dos relatórios mensais atrasados (Etapa 1). Teste revelou que o site publicado ainda estava no Lovable, não no repositório GitHub que ele achava que era o site real.

**Status ao fim da sessão de 01/07/2026:** DNS trocado na Locaweb (A record `@` → `216.198.79.1`, IP da Vercel), propagando (Cloudflare já resolve certo, Google ainda com cache antigo). Retomar amanhã: confirmar propagação total + testar GA4 em tempo real no domínio de produção + voltar pra Etapa 1 (template do relatório).

**Como fazer isso de novo com outro cliente:** ver [[project_lovable_para_vercel_migracao]] (playbook geral) e [[reference_diagnostico_hospedagem_real]] (como diagnosticar hospedagem real antes de mexer em qualquer coisa).
