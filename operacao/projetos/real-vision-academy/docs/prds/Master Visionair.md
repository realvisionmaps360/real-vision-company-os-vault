# **ADENDO — MASTER VISIONAIR E OBSIDIAN CLI**

A Skill **Master Visionair** deverá utilizar o **Obsidian CLI** como principal mecanismo de acesso, navegação e manutenção da base de conhecimento do projeto.

O Obsidian não deverá ser tratado apenas como um editor de arquivos Markdown.

Ele será a base de conhecimento viva do projeto, responsável por conectar decisões, requisitos, arquitetura, progresso, problemas, aprendizados e próximos passos.

---

# **1\. REGRA DE ATIVAÇÃO**

Sempre que a Master Visionair for ativada para trabalhar em um projeto da Real Vision, ela deverá verificar se o **Obsidian CLI** está instalado, configurado e disponível no ambiente.

A Skill não deverá presumir que abrir ou editar um arquivo `.md` ativa automaticamente o Obsidian CLI ou qualquer outra Skill.

A utilização do Obsidian CLI deverá fazer parte explicitamente do fluxo operacional da Master Visionair.

Quando a tarefa envolver documentação, recuperação de contexto, pesquisa de decisões anteriores, atualização do projeto ou navegação pela base de conhecimento, a Skill deverá utilizar o Obsidian CLI sempre que ele estiver disponível.

Caso não esteja disponível, deverá informar essa limitação e utilizar diretamente os arquivos Markdown do projeto, preservando a mesma estrutura documental.

---

# **2\. INICIALIZAÇÃO DA MASTER VISIONAIR**

Ao iniciar uma sessão de trabalho, a Master Visionair deverá seguir esta sequência:

1. Verificar a disponibilidade do Obsidian CLI.  
2. Identificar o Vault relacionado ao projeto atual.  
3. Localizar a pasta principal da documentação.  
4. Verificar se a estrutura documental obrigatória existe.  
5. Abrir o índice principal do projeto.  
6. Ler o resumo de contexto atual.  
7. Identificar os documentos relacionados à tarefa solicitada.  
8. Reconstruir o contexto antes de propor qualquer alteração.  
9. Somente depois iniciar a análise ou execução da tarefa.

A Skill não deverá depender exclusivamente da conversa atual quando o conhecimento necessário já estiver registrado no Vault.

---

# **3\. ESTRUTURA PRINCIPAL DA DOCUMENTAÇÃO**

A documentação da Real Vision Academy deverá ser organizada dentro de uma estrutura equivalente a:

docs/  
└── academy/  
    ├── PROJECT\_INDEX.md  
    ├── CONTEXT.md  
    ├── MASTER\_PRD.md  
    ├── ARCHITECTURE.md  
    ├── ROADMAP.md  
    ├── TIMELINE.md  
    ├── CHANGELOG.md  
    ├── DECISIONS.md  
    ├── KNOWN\_ISSUES.md  
    ├── IDEAS.md  
    ├── METHODOLOGY\_LEARNINGS.md  
    ├── GLOSSARY.md  
    ├── diagrams/  
    ├── prds/  
    ├── research/  
    └── references/

A localização final deverá respeitar a arquitetura existente do projeto. Não crie uma estrutura paralela sem antes analisar o repositório.

---

# **4\. PROJECT\_INDEX.md**

Crie e mantenha o arquivo:

`PROJECT_INDEX.md`

Ele será o índice central de toda a documentação.

Seu objetivo será permitir acesso rápido a qualquer área do projeto.

O índice deverá organizar os documentos por temas, como:

* visão do produto;  
* requisitos;  
* arquitetura;  
* banco de dados;  
* autenticação;  
* área de membros;  
* cursos;  
* pagamentos;  
* certificados;  
* inteligência artificial;  
* comunidade;  
* administração;  
* decisões;  
* problemas conhecidos;  
* roadmap;  
* timeline;  
* aprendizados da metodologia.

Cada item deverá apontar para o documento correspondente por meio de links internos compatíveis com o Obsidian.

Sempre que um documento relevante for criado, movido, renomeado ou removido, o índice deverá ser atualizado.

---

# **5\. CONTEXT.md**

Crie e mantenha o arquivo:

`CONTEXT.md`

Esse documento deverá apresentar um resumo executivo e atualizado do estado atual do projeto.

Ele deverá conter:

* fase atual;  
* objetivo em andamento;  
* última etapa concluída;  
* decisões recentes;  
* bloqueios;  
* riscos atuais;  
* pendências;  
* próximos passos;  
* documentos que devem ser consultados para continuar o trabalho.

O `CONTEXT.md` deverá ser curto, objetivo e atualizado ao final de cada etapa relevante.

Ele será o primeiro documento consultado pela Master Visionair ao reconstruir o contexto do projeto.

---

# **6\. INDEXAÇÃO E REFERÊNCIAS CRUZADAS**

Os documentos não deverão funcionar como arquivos isolados.

Eles deverão formar uma rede de conhecimento interligada.

Cada documento relevante deverá indicar:

* documentos relacionados;  
* documentos dos quais depende;  
* documentos que dependem dele;  
* módulo correspondente;  
* fase do projeto;  
* status;  
* data da última atualização.

Sempre que possível, utilize links internos do Obsidian para conectar os documentos.

Exemplo:

\#\# Documentos relacionados

\- \[\[MASTER\_PRD\]\]  
\- \[\[ARCHITECTURE\]\]  
\- \[\[ROADMAP\]\]  
\- \[\[PRD-001-Authentication\]\]  
\- \[\[DECISIONS\]\]

O objetivo é permitir que humanos e agentes de IA naveguem pela documentação sem depender de buscas extensas ou conhecimento prévio da estrutura.

---

# **7\. METADADOS PADRONIZADOS**

Sempre que adequado, utilize frontmatter YAML nos documentos.

Exemplo:

\---  
id: PRD-001  
title: Autenticação e identidade do usuário  
type: prd  
status: draft  
project: real-vision-academy  
phase: planning  
owner: master-visionair  
created: 2026-07-17  
updated: 2026-07-17  
depends\_on:  
  \- MASTER\_PRD  
  \- ARCHITECTURE  
related:  
  \- Members  
  \- Payments  
  \- Permissions  
\---

Os metadados deverão ser consistentes entre os documentos.

Não crie campos desnecessários apenas para aumentar a complexidade.

Use somente informações que realmente contribuam para organização, pesquisa, rastreabilidade e navegação.

---

# **8\. ATUALIZAÇÃO DA BASE DE CONHECIMENTO**

Sempre que uma mudança relevante ocorrer, a Master Visionair deverá identificar quais documentos precisam ser atualizados.

Exemplos:

* nova decisão arquitetural → `DECISIONS.md`;  
* mudança na arquitetura → `ARCHITECTURE.md`;  
* alteração de requisito → `MASTER_PRD.md`;  
* conclusão de etapa → `TIMELINE.md`;  
* alteração implementada → `CHANGELOG.md`;  
* novo risco ou limitação → `KNOWN_ISSUES.md`;  
* nova possibilidade futura → `IDEAS.md`;  
* aprendizado sobre a metodologia → `METHODOLOGY_LEARNINGS.md`;  
* mudança no estado atual → `CONTEXT.md`;  
* criação ou remoção de documento → `PROJECT_INDEX.md`.

A atualização da documentação faz parte da conclusão da tarefa.

Uma implementação não deverá ser considerada concluída enquanto os documentos afetados estiverem desatualizados.

---

# **9\. USO DO OBSIDIAN CLI**

A Master Visionair deverá utilizar o Obsidian CLI para operações compatíveis com suas capacidades, incluindo:

* localizar documentos;  
* abrir documentos;  
* pesquisar termos;  
* identificar referências;  
* navegar entre arquivos relacionados;  
* criar documentos;  
* atualizar documentos;  
* manter índices;  
* validar links internos;  
* reconstruir o contexto do projeto.

Antes de utilizar qualquer comando, deverá verificar as capacidades efetivamente disponíveis na versão instalada do Obsidian CLI.

Não invente comandos.

Não assuma que determinada operação é suportada.

Quando necessário, consulte a documentação ou a ajuda local da ferramenta antes de executar.

---

# **10\. METHODOLOGY\_LEARNINGS.md**

Crie e mantenha o arquivo:

`METHODOLOGY_LEARNINGS.md`

Esse documento será separado da documentação funcional da Academy.

Seu objetivo será avaliar o impacto real desta metodologia durante a implementação.

A Master Visionair deverá registrar:

* quais práticas melhoraram a recuperação de contexto;  
* quais índices realmente facilitaram o trabalho;  
* quais documentos se tornaram redundantes;  
* quais metadados foram úteis;  
* quais metadados geraram burocracia sem benefício;  
* quais links ajudaram na navegação;  
* quais processos reduziram erros;  
* quais processos aumentaram o trabalho desnecessariamente;  
* quais partes da metodologia devem ser reutilizadas;  
* quais partes devem ser modificadas;  
* quais partes não devem ser replicadas em projetos futuros.

O documento não deverá virar um diário genérico.

Registre apenas aprendizados concretos, observáveis e úteis para melhorar a metodologia de engenharia da Real Vision.

---

# **11\. VALIDAÇÃO DA METODOLOGIA**

Durante o desenvolvimento da Real Vision Academy, a Master Visionair deverá avaliar continuamente se essa estrutura está realmente produzindo benefícios.

Analise principalmente:

* velocidade para recuperar contexto;  
* facilidade para localizar informações;  
* redução de decisões contraditórias;  
* redução de retrabalho;  
* clareza para iniciar uma nova sessão;  
* facilidade para outra IA ou desenvolvedor assumir o projeto;  
* consistência entre documentação e implementação;  
* custo de manutenção da própria documentação.

Não preserve uma regra apenas porque ela foi definida inicialmente.

Caso algum processo seja burocrático, redundante ou pouco útil, registre o problema em `METHODOLOGY_LEARNINGS.md` e proponha uma melhoria antes de alterar a metodologia.

---

# **12\. OBJETIVO FINAL**

Ao final do projeto, a Real Vision deverá possuir:

1. Uma plataforma funcional e documentada.  
2. Uma base de conhecimento navegável pelo Obsidian.  
3. Uma Skill capaz de reconstruir o contexto de forma estruturada.  
4. Uma metodologia validada de desenvolvimento de software assistido por IA.  
5. Evidências concretas sobre quais práticas devem ser replicadas em projetos futuros.

A Real Vision Academy será o primeiro projeto de validação dessa metodologia.

A Master Visionair deverá garantir que os aprendizados obtidos não permaneçam restritos à Academy, mas contribuam para melhorar a forma como a Real Vision desenvolve todos os seus próximos sistemas.

