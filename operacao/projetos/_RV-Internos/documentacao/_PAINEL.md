---
id: PRJ-blog-pipeline
tipo: painel
painel_versao: 1
visualizacao: pipeline-conteudo
nome: Pipeline de Blog
resumo: "Backlog de posts do blog da Real Vision, da ideia à publicação."

o_que_e: "A fila de posts do blog da Real Vision. Cada post aparece aqui desde o momento em que é só uma ideia até estar publicado no site, e esta tela mostra em que estágio cada um está."
para_que_serve: "O blog é o que traz gente do Google para o site e o que alimenta os emails da campanha. Sem uma fila única, ideia boa vira conversa esquecida e o blog fica meses sem post novo."
como_funciona:
  - "A ideia entra na coluna Ideia já com tema, objetivo e para onde ela manda o leitor."
  - "Antes de escrever, pesquisa de intenção de busca: descobrir o que as pessoas realmente digitam no Google sobre aquele tema."
  - "O post é escrito e revisado seguindo o processo oficial, com título, metadados, imagem de capa e as fontes no final."
  - "Publicação: o post entra no código do site e vai para o ar num deploy."
  - "Depois da publicação vem a tradução para inglês e alemão, sempre separada, nunca junto com o post original."
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

colunas:
  - id: ideia
    ajuda: "Tema decidido, mas nada escrito ainda. Só existe o título, o objetivo e para onde o post manda o leitor."
  - id: rascunho
    ajuda: "Texto sendo escrito. Já passou pela pesquisa de intenção de busca e tem título definido."
  - id: design
    ajuda: "Texto pronto, faltando imagem de capa, metadados e a revisão final antes de publicar."
  - id: publicado
    ajuda: "No ar em realvisionmaps.com. A tradução para inglês e alemão vem depois e é controlada à parte."

metricas:
  - rotulo: Na fila
    valor: 6
    formato: numero
    ajuda: "Ideias registradas que ainda não viraram texto. É o estoque de post do blog."
  - rotulo: No painel
    valor: 2
    formato: numero
    ajuda: "Posts publicados que este arquivo conhece. Está errado de propósito: o site tem 21. A diferença é o alerta no topo da tela."
    fonte:
      tipo: documento
      caminho: operacao/projetos/_RV-Internos/documentacao/BLOG-POSTS-PIPELINE.md
    apurado_em: 2026-08-27
  - rotulo: No site
    valor: 21
    formato: numero
    ajuda: "Posts realmente no ar. A verdade sobre publicação vive no código do site, não neste arquivo."
    fonte:
      tipo: banco
      descricao: "Arquivo src/data/blog-posts.ts no repositório real-vision-core, que é o que o site publica de fato"
    apurado_em: 2026-08-27
  - rotulo: Sem tradução
    valor: 2
    formato: numero
    ajuda: "Posts publicados só em português. Cada um deles perde o tráfego de busca em inglês e alemão enquanto não for traduzido."

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
    ajuda: "Publicado só em português. Enquanto não for traduzido, não aparece para quem busca em inglês ou alemão."
  - texto: "Traduzir EN o post Elon Musk"
    prazo: null
    ajuda: "Mesmo caso do anterior, faltando só a versão em inglês."
  - texto: "Reconciliar este pipeline com os 21 posts publicados no site"
    prazo: null
    ajuda: "É o que mantém este projeto marcado como risco. Enquanto o arquivo conhecer 2 posts e o site tiver 21, o painel está mostrando uma realidade que não existe."

documentos:
  - titulo: Pipeline de blog posts
    caminho: operacao/projetos/_RV-Internos/documentacao/BLOG-POSTS-PIPELINE.md
    papel: principal
    ajuda: "A lista completa em texto, com o detalhe de cada post. Esta tela é o resumo dela."
  - titulo: Processo oficial de blog post
    caminho: operacao/projetos/_RV-Internos/documentacao/PROCESSO-BLOG-POST-REFINADO.md
    papel: referencia
    ajuda: "O passo a passo de como um post sai da ideia e chega no ar. É o documento que o agente segue a cada post novo."

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
| 2026-08-28 | Bloco de compreensão (`o_que_e`, `para_que_serve`, `como_funciona`), `ajuda` nas métricas, colunas, pendências e documentos, `fonte` nas métricas de posts | A tela era ilegível para quem não escreveu este arquivo. `objetivo_final` fica em aberto por decisão do Felipe |
