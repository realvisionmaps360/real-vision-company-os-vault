---
id: PRJ-email-marketing
tipo: painel
painel_versao: 1
visualizacao: campanha-cadencia
nome: Email Marketing — Projeto Hermes
resumo: "Cadência de 12 emails para a base de 25 contatos. Ciclo 1, Fase 1 em curso — 2 de 4 emails disparados."

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
proximo_passo: "Escrever a Fase 2 (emails 5 a 8) — sem ela a cadência quebra. Corrigir idioma=de faltante (Romana) e decidir versão em alemão do email 2."
proximo_passo_prazo: 2026-09-16
atualizado_em: 2026-09-01
atualizado_por: claude
proxima_revisao: 2026-09-05

canal: email
publico: "Contatos ativos com consentimento registrado"
tamanho_publico: 25
inicio: 2026-08-27
fim_previsto: 2026-10-26

metricas:
  - rotulo: Contatos ativos
    valor: 25
    formato: numero
    tendencia: subindo
    fonte:
      tipo: banco
      descricao: "Tabela email_contatos no Supabase do VisionFlow, contando status = ativo"
    apurado_em: 2026-09-01
    ajuda: "25 com status ativo: 20 clientes, os pais do Felipe, a Romana, o próprio Felipe e Mikkel (Mike), cadastrado em 01/09. Nenhum contato de teste restante na lista."
  - rotulo: Fase 1 enviada
    valor: "2 de 4"
    formato: texto
    ajuda: "A Fase 1 tem 4 emails (E1 a E4). E1 e E2 saíram; E3 e E4 estão agendados."
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
      falhas: 0
    nota: "Disparado 16h23 UTC, variante A. Só em PT (decisão do Felipe) — 4 contatos idioma=de (incluindo Romana, cadastrada como pt mas fluente em alemão) receberam em português por falta de versão em alemão."
  - id: c004-03
    ordem: 3
    titulo: "E3 — 5 negócios, 1 mapa, 1 decisão"
    estado: agendado
    data: 2026-09-06
    gancho: "Prova social"
    ativo: "portfólio Hub Ilha do Contrato"
  - id: c004-04
    ordem: 4
    titulo: "E4 — Do Brasil à Suíça"
    estado: agendado
    data: 2026-09-11
    gancho: "Autoridade internacional"
    ativo: "portfólio + post Solarium Aarau"
    nota: "⚠️ Ajustar o P.S. antes de 11/09 — promete conteúdo que hoje é o email 9."
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
  - texto: "Escrever a Fase 2 (emails 5 a 8)"
    prazo: 2026-09-16
  - texto: "Ajustar o P.S. do email 4"
    prazo: 2026-09-11
  - texto: "Reclassificar os 20 contatos de relação comercial com tag de nicho"
    prazo: null
    ajuda: "Sem nicho marcado, toda campanha vai para a lista inteira. Precisa do Felipe revisar cliente a cliente: nicho não dá para inferir sozinho."
  - texto: "Apagar as functions hermes-campanha e hermes-test-send no Supabase"
    prazo: null
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
| 2026-09-01 | E2 disparado (25 contatos, 0 falhas); contatos ativos 24 → 25 (Mikkel/Mike incluído) | Campanha 004-02 aprovada e enviada por decisão do Felipe. Achado no processo: Romana está com `idioma=pt` no banco mas é fluente em alemão — não corrigido ainda porque não existe versão em alemão do email 2 |
