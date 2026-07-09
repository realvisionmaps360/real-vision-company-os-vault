---
name: permissao-push-main-dns
description: "O classificador automático de segurança do Claude Code bloqueia push direto pro main de repo de cliente e mudanças de DNS/domínio, mesmo com plano já aprovado — precisa de confirmação literal e específica no momento exato da ação"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ae89b8dc-1f82-487b-bd12-c2d46c3e3e30
---

Descoberto em 01/07/2026 durante a migração [[project_lovable_para_vercel_migracao]] do cliente Conecta Saúde.

**O que aconteceu:** mesmo com o plano geral aprovado via ExitPlanMode (incluindo o passo de "commit direto no main" e "repontar domínio"), o classificador automático de segurança bloqueou essas ações na hora de executar. Motivo dado: aprovação geral do plano não conta como autorização explícita pra esse tipo de ação específica (git push pro main de repo de cliente, mudança de DNS em domínio de produção).

**Por quê:** essas são ações de alto risco (afetam sistemas compartilhados/produção de cliente), então o sistema exige confirmação literal e no momento exato — não aceita "aprovei o plano inteiro" como suficiente.

**Como aplicar:**
- Ao chegar numa etapa de push pro main ou mudança de DNS/domínio, mesmo que já esteja no plano aprovado, parar e pedir confirmação de novo, ali na hora
- Se o comando for bloqueado mesmo após confirmação simples ("opção 1", "pode"), pedir uma frase mais literal e específica nomeando a ação exata (ex: "sim, pode mandar (dar push) essa mudança pro main")
- Não tentar contornar via outra ferramenta — é bloqueio intencional, não bug
- Explicar pro Felipe em linguagem simples o que está travado e por quê (ver [[feedback_felipe_nao_tecnico]]) antes de pedir a confirmação de novo

Ver também: [[feedback_analise_antes_executar]] e [[feedback_felipe_nao_tecnico]] — esse padrão de "confirmar de novo, na hora, com linguagem simples" é consistente com como o Felipe já pediu pra trabalhar.
