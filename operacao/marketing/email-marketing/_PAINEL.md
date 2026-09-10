---
id: PRJ-email-marketing
tipo: painel
painel_versao: 1
visualizacao: campanha-cadencia
nome: Email Marketing — Projeto Hermes
resumo: "Cadência de 12 emails para a base de 24 contatos. Ciclo 1, Fase 1 em curso."

o_que_e: "A campanha de email da Real Vision para quem já é cliente. São 12 emails escritos numa ordem pensada, disparados de 5 em 5 dias, cada um construindo em cima do anterior."
para_que_serve: "Manter relação com quem já comprou e abrir espaço para os serviços que aquele cliente ainda não tem. É mais barato vender de novo para quem já confia do que buscar cliente novo."
como_funciona:
  - "A base de contatos vive numa tabela no Supabase, com o registro de quem autorizou receber."
  - "Os 12 emails são divididos em 3 fases: primeiro a oportunidade, depois a transformação, por último a oferta."
  - "Cada email é escrito com antecedência, Felipe aprova o texto, e só então ele é agendado."
  - "O disparo sai pelo Resend, no domínio realvisionmaps.com, um email a cada 5 dias."
  - "Um webhook grava de volta entrega, abertura, clique e falha. Quem dá bounce ou marca spam sai da lista ativa sozinho."
area: marketing
prioridade: alta
destaque: true

status: ativo
saude: atencao
proximo_passo: "Escrever a Fase 2 (emails 5 a 8) — sem ela a cadência quebra."
proximo_passo_prazo: 2026-09-16
atualizado_em: 2026-09-07
atualizado_por: claude
proxima_revisao: 2026-09-11

canal: email
publico: "Contatos ativos com consentimento registrado"
tamanho_publico: 24
inicio: 2026-08-27
fim_previsto: 2026-10-26

metricas:
  - rotulo: Contatos ativos
    valor: 24
    formato: numero
    tendencia: caindo
    fonte:
      tipo: banco
      descricao: "Tabela email_contatos no Supabase do VisionFlow, contando status = ativo"
      conjunto: email-contatos-ativos
    apurado_em: 2026-08-28
    ajuda: "24 com status ativo: 20 clientes, os pais do Felipe, a Romana e o próprio Felipe. Nenhum contato de teste restante na lista."
  - rotulo: Fase 1 enviada
    valor: "3 de 4"
    formato: texto
    ajuda: "A Fase 1 tem 4 emails (E1 a E4). E1, E2 e E3 já saíram pra lista real; E4 teve teste visual reenviado em 09/09, aguardando aprovação do Felipe pra disparar pra lista."
  - rotulo: Cadência
    valor: "5 em 5 dias"
    formato: texto
    ajuda: "Intervalo entre um email e o próximo. Espaçado assim de propósito: mais denso cansa a lista e derruba a reputação do domínio."
  - rotulo: Falhas no envio
    valor: 0
    formato: numero
    ajuda: "Erros técnicos no disparo, gravados pelo webhook do Resend. Não confundir com bounce, que é o email existir e recusar a entrega."
    apurado_em: 2026-08-28

itens:
  - id: c004-01
    ordem: 1
    titulo: "E1 — Seu site foi lido hoje, só não por gente"
    estado: enviado
    data: 2026-08-27
    gancho: "Autoridade"
    ativo: "post site-maior-ativo-era-ia"
    metricas:
      enviados: 28
      falhas: 0
    nota: "Disparado 11h32 UTC, variante A. Texto reescrito pelo Felipe antes do envio."
  - id: c004-02
    ordem: 2
    titulo: "E2 — 3 coisas que matam seu Google Meu Negócio"
    estado: enviado
    data: 2026-09-01
    gancho: "Reciprocidade"
    ativo: "post google-meu-negocio-guia-completo"
    metricas:
      enviados: 25
    nota: "Disparado 16:23 UTC via function temporária hermes-batch-004-02, já desativada. Painel só foi atualizado em 07/09 — checar sempre o banco, não só este arquivo."
  - id: c004-03
    ordem: 3
    titulo: "E3 — Tour virtual 360° aplicado a eventos"
    estado: enviado
    data: 2026-09-07
    gancho: "Prova social"
    ativo: "portfólio + blog post Universo Paralello 18°"
    metricas:
      enviados: 47
      falhas: 0
    nota: "Disparado pra lista real em 07/09/2026 (47 enviados, 0 falhas, 0 duplicados). Texto final: Universo Paralello 18°, 81 panoramas, DJ Alok. Arquivo antigo (004-03-ilha-do-contrato.html) mantido no disco, não usado. CTA aponta direto pro post; link da assinatura vai pra realvisionmaps.com/links-uteis/."
  - id: c004-04
    ordem: 4
    titulo: "E4 — Do Brasil à Suíça"
    estado: agendado
    data: 2026-09-11
    gancho: "Autoridade internacional"
    ativo: "portfólio + post Solarium Aarau"
    nota: "P.S. removido no reescrito do Felipe de 07/09/2026 (pendência antiga já resolvida, corrigida aqui em 09/09). CTA aponta direto pro post do blog; link da assinatura vai pra realvisionmaps.com/links-uteis/. Último teste: resend_id a432000d-1a1c-40a6-bda5-b1debc99f291. Falta só aprovação do Felipe pra disparar pra lista."
  - id: c005
    ordem: 5
    titulo: "Fase 2 — Transformação (emails 5 a 8)"
    estado: rascunho
    data: 2026-09-16
    nota: "Não escrita. É o próximo passo do projeto."
  - id: c006
    ordem: 6
    titulo: "Fase 3 — Posse e oferta (emails 9 a 12)"
    estado: rascunho
    data: null
    nota: "Não escrita."

pendencias:
  - texto: "Felipe aprovar o E4 (teste reenviado pro email de teste em 09/09) pra disparar pra lista"
    prazo: null
  - texto: "Escrever a Fase 2 (emails 5 a 8)"
    prazo: 2026-09-16
  - texto: "Reclassificar os 20 contatos de relação comercial com tag de nicho"
    prazo: null
    ajuda: "Sem nicho marcado, toda campanha vai para a lista inteira. Precisa do Felipe revisar cliente a cliente: nicho não dá para inferir sozinho."
  - texto: "Apagar as functions hermes-campanha, hermes-test-send e hermes-batch-004-02 no Supabase"
    prazo: null
    ajuda: "As três já estão neutralizadas (corpo esvaziado, respondem 410, sem acesso a segredo), mas continuam listadas como ACTIVE no painel do Supabase. Sem ferramenta de delete disponível no Claude Code — Felipe apaga direto no painel."
  - texto: "Publicar em produção a captura de lead do blog (capture-community-lead)"
    prazo: null

documentos:
  - titulo: Hub da pasta
    caminho: operacao/marketing/email-marketing/README.md
    papel: principal
  - titulo: Estratégia
    caminho: operacao/marketing/email-marketing/00-ESTRATEGIA.md
    papel: referencia
  - titulo: Timeline
    caminho: operacao/marketing/email-marketing/02-TIMELINE.md
    papel: timeline
  - titulo: Calendário editorial
    caminho: operacao/marketing/email-marketing/04-CALENDARIO-EDITORIAL.md
    papel: referencia
  - titulo: Índice de campanhas
    caminho: operacao/marketing/email-marketing/campanhas/INDICE-CAMPANHAS.md
    papel: referencia

pertence_a: ["[[Real Vision]]"]
depende_de: ["[[PRJ-blog-pipeline]]"]
tags: [painel, painel/marketing]
---

# Painel — Email Marketing (Projeto Hermes)

Arquivo de contrato lido pelo VisionVault. **Não editar à mão** — quem mantém é o agente ao fim de
cada sessão de trabalho no email marketing, junto com o [[02-TIMELINE]].

O conteúdo humano está no [[README]]. Aqui só mora o estado que o painel precisa ler.

## Relacionados

- [[README]] · [[04-CALENDARIO-EDITORIAL]] · [[INDICE-CAMPANHAS]] · [[02-TIMELINE]]
- Skill: `skills/rv-email`

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-27 | Arquivo criado | Fase 0 do VisionVault — contrato de dados do painel |
| 2026-08-28 | Bloco de compreensão e `ajuda` nas métricas | As telas do painel não se explicavam sozinhas |
| 2026-08-28 | Contatos ativos: 28 → 24, com `fonte` e `apurado_em` | O 28 vinha de um snapshot de 22/07. Limpeza da base tirou 3 endereços de teste e 1 bounce já tinha saído sozinho |
| 2026-09-07 | E2 marcado como enviado (estava "agendado"); teste visual de E3 e E4 registrado | Confirmado direto no banco (`email_sequencias`, `email_envios`) que o E2 saiu em 01/09 sem que este painel fosse atualizado. Felipe pediu teste do E3 e E4 pro email de teste |
| 2026-09-07 | E3 aprovado (texto Universo Paralello); CTA de E3 e E4 trocado pra realvisionmaps.com/links-uteis/ | Felipe decidiu que todo CTA de email aponta pra essa página em vez de ir direto pro post — regra gravada em `skills/rv-email/SKILL.md` pra valer em todo email novo |
| 2026-09-09 | Corrigidas duas divergências: E3 estava marcado "agendado" mas já tinha sido disparado pra lista real em 07/09 (47 enviados); pendência "ajustar P.S. do E4" seguia aberta mas o P.S. já tinha sido removido no reescrito de 07/09 | Achado ao criar [[../../../LBOS/02-Projetos/prospeccao-conecta-negocios/PROJETO|PRJ-2026-008]] no LBOS, aplicando a trava de conferir painel contra o arquivo real antes de declarar algo pronto | Painel agora reflete o estado real: 3 de 4 emails da Fase 1 enviados, só E4 pendente de aprovação |
