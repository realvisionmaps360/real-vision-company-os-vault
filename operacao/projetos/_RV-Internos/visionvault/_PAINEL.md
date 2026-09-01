---
id: PRJ-visionvault
tipo: painel
painel_versao: 1
visualizacao: checklist
nome: VisionVault — o painel
resumo: "O próprio painel do Company OS. Agora lê também o Supabase, e abre dados e documentos em camada."

o_que_e: "É este aplicativo. Um painel instalável no celular que mostra, numa tela só, em que pé estão todos os projetos da Real Vision. Este card é o painel se acompanhando como qualquer outro projeto."
para_que_serve: "O estado de cada projeto vive espalhado em centenas de documentos no vault. Sem um lugar que responda o que está rolando agora, saber isso exigia abrir arquivo por arquivo."
como_funciona:
  - "Cada projeto declara seu próprio estado num arquivo _PAINEL.md dentro da pasta dele, no vault."
  - "Quem mantém esse arquivo é o agente de IA, ao fim de cada sessão de trabalho naquele projeto."
  - "A cada alteração enviada ao vault, uma automação lê esses arquivos e publica um índice."
  - "O aplicativo lê esse índice depois de conferir que quem entrou é você. Ele nunca escreve no vault."
  - "Se um projeto muda e ninguém atualiza o _PAINEL.md, o painel avisa que aquele resumo está velho em vez de fingir que está em dia."
area: produto
prioridade: alta
destaque: false

status: ativo
saude: ok
proximo_passo: "Colocar o LBOS no painel: fechar a tipagem dos 21 arquivos sem frontmatter e escrever o LBOS/_PAINEL.md."
proximo_passo_prazo: null
atualizado_em: 2026-09-01
atualizado_por: claude
proxima_revisao: 2026-09-22

metricas:
  - rotulo: Projetos no painel
    valor: 3
    formato: numero
    ajuda: "Quantos projetos do vault já têm um _PAINEL.md. Todo o resto do Company OS ainda está de fora e não aparece nas telas."
    apurado_em: 2026-08-28
  - rotulo: Documentos servidos
    valor: 21
    formato: numero
    ajuda: "Documentos do vault que o aplicativo pode abrir. Só é servido o que algum _PAINEL.md aponta, nunca o vault inteiro."
    apurado_em: 2026-09-01
  - rotulo: Fases entregues
    valor: "7 de 8"
    formato: texto
    ajuda: "As fases do plano original de construção. A que falta é a integração com o Google Calendar, adiada por decisão do Felipe."
    fonte:
      tipo: documento
      caminho: operacao/projetos/_RV-Internos/visionvault/TIMELINE.md

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
  - id: painel-se-explica
    titulo: "Painel que se explica: o que é, para que serve, como funciona"
    estado: feito
    data: 2026-08-28
    nota: "Bloco de compreensão no contrato, glossário do vocabulário do sistema e botão de ? em cada item da tela."
    ajuda: "Antes disso, a tela só fazia sentido para quem tinha escrito o arquivo. Era o motivo de o painel não estar sendo usado para ler o estado dos projetos."
  - id: metrica-procedencia
    titulo: "Métrica com procedência: de onde vem cada número"
    estado: feito
    data: 2026-08-28
    nota: "Contrato e UI prontos. Métrica pode apontar para documento do vault (vira link) ou para banco (mostra a origem no ?)."
    ajuda: "Primeiro caso de uso já encontrou um erro: o painel dizia 28 contatos ativos, número copiado de um snapshot de julho, e o banco tinha 27."
  - id: metrica-contatos-numero
    titulo: "Aplicar a procedência na métrica de contatos do email marketing"
    estado: bloqueado
    data: null
    nota: "Espera o Felipe decidir se o número mostrado é 27 (status ativo no banco) ou 24 (descontando os 3 contatos de teste)."
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
    ajuda: "É a chave que deixa o aplicativo ler o vault. Quando vencer, o painel para de carregar dados até ser trocada."
  - texto: "Resolver a cota do Supabase (aviso de grace period encerrado)"
    prazo: null
    ajuda: "O Supabase é quem confere que quem está entrando é você. Se a conta for suspensa por cota, o login para de funcionar."
  - texto: "Subir o repositório do VisionVault para o GitHub"
    prazo: null
    ajuda: "Hoje o código só existe neste computador e o deploy sai daqui. Se a máquina morrer, o código morre junto."

documentos:
  - titulo: Timeline do VisionVault
    caminho: operacao/projetos/_RV-Internos/visionvault/TIMELINE.md
    papel: timeline
    ajuda: "O diário de bordo do projeto: o que foi feito em cada sessão, as decisões tomadas e o próximo passo."

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
| 2026-08-28 | Bloco de compreensão, `ajuda` nas métricas, pendências e documentos, `fonte` na métrica de fases | Sessão 2: as telas não se explicavam. `objetivo_final` fica em aberto por decisão do Felipe |
| 2026-08-28 | Pendência nova: subir o repositório para o GitHub | Risco que estava só na timeline da sessão 1 e não aparecia em tela nenhuma |
