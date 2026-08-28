---
id: PRJ-visionvault
tipo: painel
painel_versao: 1
visualizacao: checklist
nome: VisionVault — o painel
resumo: "O próprio painel do Company OS. v1 no ar, validada em produção."
area: produto
prioridade: alta
destaque: false

status: ativo
saude: ok
proximo_passo: "Ligar a métrica dos 28 contatos ao documento que sustenta o número."
proximo_passo_prazo: null
atualizado_em: 2026-08-28
atualizado_por: claude
proxima_revisao: 2026-09-15

metricas:
  - rotulo: Projetos no painel
    valor: 3
    formato: numero
  - rotulo: Documentos servidos
    valor: 20
    formato: numero
  - rotulo: Fases entregues
    valor: "7 de 8"
    formato: texto

itens:
  - id: fase-0
    titulo: "Contrato _PAINEL.md + schema Zod"
    estado: feito
    data: 2026-08-27
  - id: fase-1
    titulo: "Gerador em CI, publicando no branch painel-dist"
    estado: feito
    data: 2026-08-27
  - id: fase-2
    titulo: "App instalável no celular, com login"
    estado: feito
    data: 2026-08-28
  - id: fase-3
    titulo: "Leitor de markdown com wikilinks e callouts"
    estado: feito
    data: 2026-08-27
  - id: fase-4
    titulo: "Visualizações tipadas: kanban e cadência"
    estado: feito
    data: 2026-08-27
  - id: fase-5
    titulo: "Árvore de arquivos e calendário"
    estado: feito
    data: 2026-08-27
  - id: fase-6
    titulo: "Mapa do grafo de projetos"
    estado: feito
    data: 2026-08-27
  - id: metrica-procedencia
    titulo: "Métrica clicável: ligar os 28 contatos ao documento da lista"
    estado: pendente
    data: null
    nota: "Primeiro caso de métrica com procedência. O padrão vale para todas as outras."
  - id: lbos-no-painel
    titulo: "Incluir o LBOS no painel"
    estado: pendente
    data: null
    nota: "Único conjunto do vault formalmente tipado (98% com frontmatter). Menor esforço de preparação, melhor teste do formato em grafo."
  - id: google-calendar
    titulo: "Google Calendar via OAuth"
    estado: pendente
    data: null
    nota: "Adiado por decisão do Felipe. O calendário hoje lê as datas declaradas no vault."
  - id: frontmatter-vault
    titulo: "Padronizar frontmatter nos ~665 documentos vivos"
    estado: pendente
    data: null
    nota: "Fase futura. Permitiria ler qualquer documento sem depender do _PAINEL.md."

pendencias:
  - texto: "Renovar o token de leitura do GitHub antes de vencer"
    prazo: 2026-11-26
  - texto: "Resolver a cota do Supabase (aviso de grace period encerrado)"
    prazo: null

documentos:
  - titulo: Timeline do VisionVault
    caminho: operacao/projetos/_RV-Internos/visionvault/TIMELINE.md
    papel: timeline

pertence_a: ["[[Real Vision]]"]
afeta: ["[[PRJ-email-marketing]]", "[[PRJ-blog-pipeline]]"]
tags: [painel, painel/produto]
---

# Painel — VisionVault

O painel mostrando a si mesmo. Arquivo de contrato lido pelo próprio app.

**Não editar à mão** — quem mantém é o agente ao fim de cada sessão de trabalho no VisionVault,
junto com a [[TIMELINE]].

## Relacionados

- [[TIMELINE]] — registro das sessões
- Skill: `skills/visionvault`
- Nó LBOS: `LBOS/02-Projetos/visionvault/PROJETO.md`

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-28 | Arquivo criado | O painel passa a se acompanhar como qualquer outro projeto |
