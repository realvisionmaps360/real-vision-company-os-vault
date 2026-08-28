---
id: PRJ-email-marketing
tipo: painel
painel_versao: 1
visualizacao: campanha-cadencia
nome: Email Marketing — Projeto Hermes
resumo: "Cadência de 12 emails para a base de 28 contatos. Ciclo 1, Fase 1 em curso."
area: marketing
prioridade: alta
destaque: true

status: ativo
saude: atencao
proximo_passo: "Escrever a Fase 2 (emails 5 a 8) — sem ela a cadência quebra."
proximo_passo_prazo: 2026-09-16
atualizado_em: 2026-08-27
atualizado_por: claude
proxima_revisao: 2026-09-05

canal: email
publico: "Contatos ativos com consentimento registrado"
tamanho_publico: 28
inicio: 2026-08-27
fim_previsto: 2026-10-26

metricas:
  - rotulo: Contatos ativos
    valor: 28
    formato: numero
    tendencia: estavel
  - rotulo: Fase 1 enviada
    valor: "1 de 4"
    formato: texto
  - rotulo: Cadência
    valor: "5 em 5 dias"
    formato: texto
  - rotulo: Falhas no envio
    valor: 0
    formato: numero

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
    estado: agendado
    data: 2026-09-01
    gancho: "Reciprocidade"
    ativo: "post google-meu-negocio-guia-completo"
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
  - texto: "Limpar os 3 contatos de origem_consentimento = teste"
    prazo: null
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
