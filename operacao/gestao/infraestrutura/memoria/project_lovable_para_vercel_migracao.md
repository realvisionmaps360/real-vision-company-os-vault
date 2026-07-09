---
name: lovable-para-vercel-migracao
description: "Passo a passo completo pra migrar um site de cliente que ainda está preso no Lovable pro padrão atual (Claude Code + GitHub + Vercel), incluindo troca de DNS"
metadata: 
  node_type: memory
  type: reference
  originSessionId: ae89b8dc-1f82-487b-bd12-c2d46c3e3e30
---

Playbook validado em 01/07/2026 no cliente [[project_conecta_saude_migracao]] (Alessandro Furtado — Associação Beneficiente Conecta Saúde). Usar sempre que aparecer outro cliente antigo ainda "preso" no Lovable (ver [[feedback_lovable_abandonado]] — vários clientes antigos podem estar nessa situação sem o Felipe saber).

## Passo a passo

1. Diagnosticar hospedagem real primeiro — ver [[reference_diagnostico_hospedagem_real]]. Não pular essa etapa
2. Clonar o repositório GitHub do cliente pra `operacao/clientes/arquivos/[Cliente]/site/`
3. Fazer as edições de código necessárias (ex: tag do GA4 no `index.html`)
4. `npm install && npm run build` local pra validar antes de subir
5. **Cuidado com `package-lock.json`:** o `npm install` local pode reescrever esse arquivo por causa de diferença de versão do npm — sempre `git diff --stat package-lock.json` antes de commitar, e reverter (`git checkout -- package-lock.json`) se for só ruído de versão, não mudança de dependência de verdade
6. Commit **separado** do push (não encadear `git commit && git push` num só comando) — o classificador de segurança automático do Claude Code bloqueia pushes direto pro `main` de repositório de cliente sem confirmação explícita e literal do Felipe no momento exato. Ver [[feedback_permissao_push_main_dns]]
7. Importar o repo na Vercel via `vercel.com/new` (framework Vite é auto-detectado)
8. Testar no domínio `*.vercel.app` antes de mexer em DNS — confirmar que tudo funciona ali primeiro (ex: rodar teste de GA4 em tempo real)
9. Adicionar o domínio customizado no projeto Vercel (Settings → Domains → Add). **Atenção:** desmarcar "Redirect apex domains to www" se o site original usava o domínio raiz sem www (senão muda o comportamento que já existia)
10. Vercel mostra o registro DNS exato necessário (geralmente `A` @ `216.198.79.1`, mas pode mudar — sempre conferir o valor mostrado na hora, não usar de cabeça)
11. Trocar esse registro no provedor de DNS do cliente (pode ser Locaweb, Registro.br, etc. — **atenção:** o registrador do domínio `.br` é sempre o Registro.br, mas quem hospeda o DNS de verdade pode ser outro provedor; checar via `nslookup -type=NS <dominio>` antes de procurar o painel certo)
12. Propagação não é instantânea — testar em múltiplos resolvedores públicos (`nslookup <dominio> 8.8.8.8` e `nslookup <dominio> 1.1.1.1`) pra ver o andamento. TTL antigo (geralmente 3600s = 1h) determina o tempo máximo de espera
13. Confirmar no painel da Vercel que o domínio virou "Valid Configuration" antes de considerar a migração concluída

## Erro raiz que motivou esse playbook

Cliente tinha plano Pro do Lovable vencido, mas o domínio customizado continuava conectado e servindo o site antigo — ele nem sabia mais onde o site "morava" de verdade, e um repositório GitHub sincronizado dava a falsa impressão de que já tinha migrado.
