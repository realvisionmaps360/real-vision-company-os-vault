---
id: PRJ-blog-pipeline
tipo: painel
painel_versao: 1
visualizacao: pipeline-conteudo
nome: Pipeline de Blog
resumo: "Backlog de posts do blog da Real Vision, da ideia à publicação."
area: marketing
prioridade: alta
destaque: true

status: ativo
saude: risco
proximo_passo: "Reconciliar o pipeline com o repo do site — ele conhece 2 publicados, o site tem 21."
proximo_passo_prazo: null
atualizado_em: 2026-08-27
atualizado_por: claude
proxima_revisao: 2026-09-10

alerta: "A verdade sobre publicação vive em real-vision-core (src/data/blog-posts.ts), não neste arquivo. O calendário editorial do email marketing conta 21 posts publicados; este pipeline só registra 2."

colunas: [ideia, rascunho, design, publicado]

metricas:
  - rotulo: Na fila
    valor: 6
    formato: numero
  - rotulo: No painel
    valor: 2
    formato: numero
  - rotulo: No site
    valor: 21
    formato: numero
  - rotulo: Sem tradução
    valor: 2
    formato: numero

itens:
  - id: post-socio-digital-planilhas
    titulo: "Como pequenas empresas estão substituindo planilhas e tarefas manuais por um Sócio Digital"
    coluna: ideia
    tema: "Lançamento Sócio Digital"
    objetivo: "SEO + tráfego frio + introdução ao conceito"
    cta: "/socio-digital"
  - id: post-10x-menos-estagiario
    titulo: "Por que ter um Sócio Digital custa 10x menos que contratar um estagiário"
    coluna: ideia
    tema: "Lançamento Sócio Digital"
    objetivo: "Comparação direta de custo, conversão alta"
    cta: "Calculadora de economia + agendamento"
  - id: post-20h-semana
    titulo: "O fim das tarefas repetitivas: economizei 20h/semana"
    coluna: ideia
    tema: "Lançamento Sócio Digital"
    objetivo: "Case próprio — Real Vision como primeiro cliente"
    cta: "Briefing"
  - id: post-vision-cloud
    titulo: "Vision Cloud: a hospedagem premium da Real Vision"
    coluna: ideia
    tema: "Vision Cloud"
    objetivo: "Introduzir a marca Vision Cloud"
    cta: "/vision-cloud"
    nota: "Publicar depois do lançamento Sócio Digital, no mesmo ciclo."
  - id: post-itacare-suica
    titulo: "De Itacaré à Suíça: todos os lugares que a Real Vision já mapeou"
    coluna: ideia
    tema: "Tour Virtual & Portfólio"
    objetivo: "Brand awareness + SEO internacional"
    cta: "Portfólio Solarium Aarau"
  - id: post-comunidade
    titulo: "Faça parte da nossa comunidade"
    coluna: ideia
    tema: "Comunidade"
    objetivo: "Captura de leads + comunidade WhatsApp"
    cta: "Formulário → grupo WhatsApp"
  - id: post-riscos-ia-hack
    titulo: "Riscos da IA: o que o hack da OpenAI na Hugging Face revela"
    coluna: publicado
    tema: "Reflexões / Atualidade"
    data_publicacao: 2026-07-24
    url: https://realvisionmaps.com/blog/riscos-inteligencia-artificial-hack-openai-hugging-face
    idioma: pt
    nota: "Pendente tradução EN/DE."
  - id: post-donos-dos-robos
    titulo: "Elon Musk diz que o trabalho será opcional. Mas quem será dono dos robôs?"
    coluna: publicado
    tema: "Reflexões / Atualidade"
    data_publicacao: 2026-07-24
    url: https://realvisionmaps.com/blog/trabalho-opcional-elon-musk-donos-robos
    idioma: pt
    nota: "Pendente tradução EN."

backlog:
  - "Como o Google Meu Negócio bem otimizado triplica o número de ligações da sua empresa"
  - "Tour Virtual 360°: por que pousadas em Itacaré fecham mais reservas com Street View"
  - "Drone + foto profissional: o ROI de uma sessão de captação para hospedagem"

pendencias:
  - texto: "Traduzir EN/DE o post Riscos da IA"
    prazo: null
  - texto: "Traduzir EN o post Elon Musk"
    prazo: null
  - texto: "Reconciliar este pipeline com os 21 posts publicados no site"
    prazo: null

documentos:
  - titulo: Pipeline de blog posts
    caminho: operacao/projetos/_RV-Internos/documentacao/BLOG-POSTS-PIPELINE.md
    papel: principal
  - titulo: Processo oficial de blog post
    caminho: operacao/projetos/_RV-Internos/documentacao/PROCESSO-BLOG-POST-REFINADO.md
    papel: referencia

pertence_a: ["[[Real Vision]]"]
afeta: ["[[PRJ-email-marketing]]"]
tags: [painel, painel/marketing]
---

# Painel — Pipeline de Blog

Arquivo de contrato lido pelo VisionVault. **Não editar à mão** — quem mantém é o agente ao fim de
cada sessão de trabalho no blog, junto com o [[BLOG-POSTS-PIPELINE]].

O conteúdo humano está no [[BLOG-POSTS-PIPELINE]]. Aqui só mora o estado que o painel precisa ler.

> A saúde está marcada como `risco` de propósito: este pipeline diverge da realidade do site.
> Enquanto a reconciliação não acontecer, o painel mostra o alerta.

## Relacionados

- [[BLOG-POSTS-PIPELINE]] · [[PROCESSO-BLOG-POST-REFINADO]]
- Skill: `skills/rv-blogpost`

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-27 | Arquivo criado | Fase 0 do VisionVault — contrato de dados do painel |
