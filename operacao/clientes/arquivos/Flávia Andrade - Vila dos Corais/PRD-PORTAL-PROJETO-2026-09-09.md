---
title: PRD — Portal do Projeto Vila dos Corais
tipo: prd
status: aprovado-para-arquitetura
cliente: "[[FICHA-CLIENTE]]"
versao: 2.0
criado_em: 2026-09-09
pertence_a: ["[[FICHA-CLIENTE]]"]
---

> **Origem.** Escrito em ferramenta externa a partir do briefing `miniappviladoscoraisspec.md`
> gerado na sessão "flavia42" (09/09/2026). Documento de produto — o **como** técnico está em
> [[PLANO-ARQUITETURA-PORTAL-2026-09-09]]. Cliente: [[FICHA-CLIENTE]] · Histórico:
> [[Vila-dos-Corais-TIMELINE]] · Nó LBOS: `PRJ-2026-005`.


**Versão:** 2.0  
**Data:** 2026-09-09  
**Status:** pronto para revisão final do Felipe antes de implementação  
**Cliente:** Flávia Andrade — Vila dos Corais, Algodões, Península de Maraú/BA  
**Responsável Real Vision:** Felipe Garcia  
**Implementação prevista:** Claude Code, sobre o repositório existente da Vila dos Corais  
**Duração do projeto:** 3 meses, acompanhando o contrato de gestão de Google Ads

---

# 1. Visão do produto

O projeto começou como um mini-app para coletar briefing, materiais e acessos necessários para iniciar a campanha de Google Ads da Vila dos Corais.

Durante a definição, a necessidade ficou maior e mais clara.

A Vila dos Corais já possui:

- site publicado;
- repositório existente;
- identidade visual pronta;
- componentes e padrões de interface já implementados;
- Supabase integrado;
- autenticação já utilizada pela Flávia;
- área privada para bloqueio de datas;
- calculadora pública de reservas que consulta disponibilidade e leva o hóspede ao WhatsApp.

Por isso, a solução final não deve ser um mini-app separado.

A solução será o:

# **Portal do Projeto Vila dos Corais**

Uma área privada integrada ao ecossistema digital já existente da cliente, usada por Flávia e Felipe durante os três meses do contrato.

O portal será o ponto central para:

- entender em que etapa o projeto está;
- saber o que precisa ser feito agora;
- registrar informações importantes;
- consultar o que já foi definido;
- acessar a gestão de datas existente;
- acompanhar semanalmente os dados do tráfego pago;
- visualizar a evolução do projeto sem precisar procurar mensagens antigas no WhatsApp.

---

# 2. Dois objetivos diferentes

## 2.1 Objetivo para a Flávia

Para a Flávia, o portal deve ser simplesmente:

> **um lugar organizado para entender o que está acontecendo com o projeto, o que a Real Vision precisa dela e como o tráfego pago está evoluindo.**

Ela não precisa conhecer o objetivo interno de produto da Real Vision.

Ela não está participando de um teste, laboratório ou processo de desenvolvimento.

A experiência deve parecer criada especificamente para a Vila dos Corais.

---

## 2.2 Objetivo interno da Real Vision

Internamente, a Real Vision também utilizará este projeto para:

- mapear o fluxo real de um cliente de tráfego pago;
- identificar etapas que se repetem;
- validar padrões de UX;
- documentar decisões;
- testar formas simples de apresentar dados para clientes leigos;
- descobrir quais partes podem ser reutilizadas em projetos futuros;
- construir conhecimento real antes de criar qualquer solução multicliente.

O objetivo interno é **aprender e documentar um processo replicável**.

Isso não significa construir agora uma plataforma genérica.

---

# 3. Contexto comercial

Contrato de gestão de Google Ads fechado em 07/09/2026.

## Valores confirmados

- implementação: R$600;
- R$300 no início;
- R$300 quando a campanha entrar no ar;
- gestão: R$600/mês por três meses;
- total à Real Vision: R$2.400;
- verba de mídia paga diretamente ao Google;
- referência preliminar de mídia: R$1.000–1.500/mês;
- sem comissão sobre verba;
- sem garantia de número de reservas;
- ciclo de três meses;
- sem renovação automática.

O portal deve acompanhar exatamente esse ciclo.

---

# 4. Problema

Hoje parte importante do projeto pode ficar espalhada em mensagens.

Exemplo:

1. Felipe pede uma informação.
2. Flávia responde pelo WhatsApp.
3. A informação fica perdida no histórico.
4. Dias depois alguém precisa procurar novamente.
5. O estado real do projeto deixa de estar claro.

Além disso, a cliente já possui uma área privada separada para gerenciar datas.

Isso cria fragmentação.

O portal resolve essa fragmentação sem tentar substituir tudo que já existe.

---

# 5. Regra central

> **WhatsApp é conversa. O portal é estado, memória e acompanhamento do projeto.**

## WhatsApp continua sendo usado para

- conversa;
- dúvidas;
- contato humano;
- envio de fotos e vídeos na V1;
- assuntos rápidos.

## Portal passa a concentrar

- informações estruturadas;
- briefing;
- confirmações;
- acessos;
- pendências;
- etapa atual;
- histórico básico;
- dados semanais do tráfego;
- observações da Real Vision;
- acesso à gestão de datas;
- acompanhamento do projeto.

---

# 6. Experiência desejada

Ao abrir o portal, a Flávia deve sentir:

> “Eu sei onde estamos, sei o que eles precisam de mim, sei o que já foi feito e consigo entender o que está acontecendo com a campanha.”

O portal deve responder rapidamente:

1. **Onde estamos agora?**
2. **Existe alguma coisa que depende de mim?**
3. **O que já foi feito?**
4. **O que a campanha está mostrando?**
5. **Onde encontro uma informação que já ficou registrada?**

---

# 7. Usuários

Existem somente duas pessoas previstas para utilizar esta versão.

## Flávia

Pode:

- visualizar o andamento;
- responder e editar informações que pertencem a ela;
- preencher briefing;
- confirmar ações;
- consultar informações já registradas;
- acessar a gestão de datas existente;
- visualizar acompanhamento semanal da campanha.

## Felipe

Pode:

- visualizar tudo que pertence ao projeto;
- acompanhar o que foi respondido;
- atualizar o andamento;
- confirmar recebimentos;
- registrar comentários da Real Vision;
- alimentar ou validar informações de acompanhamento;
- consultar histórico;
- gerenciar a parte operacional do projeto.

---

# 8. Permissões

Não construir um sistema genérico de “cliente” e “admin” só porque isso é comum em SaaS.

O projeto tem duas pessoas conhecidas.

A regra é:

> **cada informação possui quem pode visualizar e quem pode alterar.**

## Matriz inicial

| Área | Flávia | Felipe |
|---|---|---|
| Etapa do projeto | visualiza | altera |
| Briefing | responde e edita | visualiza |
| Informações da pousada | responde e edita | visualiza |
| Materiais | confirma envio | visualiza e pode confirmar recebimento |
| Acessos | confirma realização | visualiza e pode confirmar |
| Comentário semanal da Real Vision | visualiza | cria e edita |
| Dados semanais da campanha | visualiza | valida/gerencia |
| Gestão de datas | altera pela função existente | não precisa alterar na V1 |
| Histórico relevante | visualiza quando pertinente | visualiza |
| Configuração do portal | não acessa | gerencia via implementação na V1 |

Internamente, a implementação pode utilizar identificadores de papel se isso já existir na arquitetura.

Esses identificadores são mecanismo técnico, não conceito de produto.

---

# 9. Princípios de implementação

## 9.1 Reaproveitar antes de criar

A ordem de decisão é:

1. reutilizar;
2. adaptar;
3. criar somente quando necessário.

---

## 9.2 O repositório existente é a base

Claude Code deve trabalhar sobre o projeto real da Vila dos Corais.

Antes de qualquer implementação, deve inspecionar:

- framework;
- rotas;
- componentes;
- estilos;
- design tokens;
- tipografia;
- ícones;
- autenticação;
- Supabase;
- tabelas existentes;
- políticas de acesso;
- gestão de datas;
- calculadora pública;
- analytics existente;
- tracking existente;
- deploy.

O repositório real vence qualquer suposição deste documento.

---

## 9.3 Reutilizar o design system do site

Não criar nova identidade visual.

Usar como fonte:

- cores existentes;
- tipografia existente;
- botões;
- cards;
- inputs;
- espaçamentos;
- bordas;
- ícones;
- comportamento responsivo;
- padrões de tela;
- componentes já disponíveis.

O portal deve parecer uma continuação natural do site da Vila dos Corais.

Não aplicar automaticamente o design dark/âmbar institucional da Real Vision se isso conflitar com a identidade já implementada no site da cliente.

---

## 9.4 Reutilizar conteúdo existente quando fizer sentido

Informações institucionais, nomes e elementos da pousada já presentes no site devem ser reaproveitados.

O texto operacional do portal deve ser criado especificamente para Flávia.

---

## 9.5 Cronologia antes de menu

O portal cresce conforme o projeto avança.

A tela principal prioriza:

- agora;
- já concluído;
- depois.

---

## 9.6 Uma tela, um objetivo principal

Evitar:

- muitos CTAs;
- excesso de cards;
- formulários longos;
- jargão;
- telas densas.

---

## 9.7 Integração visual não significa acoplamento técnico

Para Flávia, tudo pode parecer um único ecossistema.

Por baixo, funcionalidades críticas podem continuar isoladas.

A gestão de datas é o principal exemplo.

---

## 9.8 Não reconstruir o que já funciona sem necessidade

A área de datas não será reescrita só para “ficar dentro do portal”.

Primeiro integrar o acesso.

Depois observar.

Refatorar somente se existir ganho concreto.

---

## 9.9 Não construir um SaaS cedo demais

A V1 pertence à Vila dos Corais.

O que poderá ser reaproveitado depois é o aprendizado, o processo e os componentes que realmente provaram valor.

---

# 10. Arquitetura conceitual

```text
SITE / REPOSITÓRIO VILA DOS CORAIS
│
├── ÁREA PÚBLICA
│   │
│   ├── Home
│   ├── conteúdo público
│   └── calculadora de reservas
│        │
│        ├── datas
│        ├── hóspedes
│        ├── valor
│        └── WhatsApp
│
└── ÁREA PRIVADA
    │
    ├── autenticação existente
    │
    └── Portal do Projeto
        │
        ├── Início
        ├── Informações
        ├── Campanha
        └── Datas
```

Essa estrutura é conceitual.

A estrutura real deve seguir o que já existe no repositório.

---

# 11. Gestão de datas

A gestão de datas deve fazer parte da experiência privada, mas não deve ser reconstruída na V1.

## V1

O portal oferece um acesso simples:

> **Gerenciar datas**

Flávia entra na funcionalidade existente.

Pode ser:

- rota já existente;
- mesma tela integrada à navegação;
- adaptação mínima.

A escolha depende da auditoria técnica.

---

## Regra crítica

A calculadora pública não pode passar a depender do portal.

Arquitetura desejada:

```text
             FONTE ATUAL DE DISPONIBILIDADE
                   ↑                ↑
                   │                │
        CALCULADORA PÚBLICA     GESTÃO DE DATAS
                                     ↑
                                     │
                                PORTAL ACESSA
```

Não criar:

```text
CALCULADORA
    ↓
PORTAL
    ↓
AGENDA
    ↓
DISPONIBILIDADE
```

Se o portal tiver problema, a calculadora pública deve continuar funcionando.

---

# 12. Fronteira de medição do tráfego

A Real Vision consegue monitorar o funil até determinado ponto.

Fluxo conceitual:

```text
GOOGLE ADS
   ↓
SITE
   ↓
CALCULADORA
   ↓
CLIQUE / IDA PARA WHATSAPP
   ↓
ATENDIMENTO DA FLÁVIA
```

A partir do momento em que o hóspede entra no WhatsApp e começa a conversar diretamente com a Flávia, o atendimento deixa de estar automaticamente dentro do escopo de monitoramento do portal.

## Regra

O portal deve deixar claro o que é mensurado e o que não é.

Não atribuir à campanha:

- reserva;
- fechamento;
- receita;
- qualidade do atendimento;

quando esses dados não forem realmente rastreados.

---

# 13. Fontes de dados da campanha

O acompanhamento utilizará dados das fontes já previstas no projeto, como:

- Google Ads;
- Google Analytics;
- eventos do site quando existentes e validados;
- Supabase como camada de persistência do portal.

A Real Vision já possui conectividade/ferramentas para trabalhar com essas fontes.

A forma técnica exata de coleta e sincronização deve ser validada na auditoria antes da implementação.

## Regra

Não assumir automaticamente que todo dado será atualizado em tempo real.

A experiência da cliente será organizada em um **ritmo semanal**.

---

# 14. Atualização semanal

Durante a campanha, o portal deve receber uma atualização semanal.

Essa atualização terá duas camadas.

## 14.1 Dados

Números vindos das fontes de medição disponíveis e validadas.

O conjunto exato de métricas deve ser definido depois de confirmar:

- quais dados estão disponíveis;
- quais eventos estão implementados;
- quais números são confiáveis;
- quais números ajudam a Flávia a entender o projeto.

Não criar métrica só porque está disponível.

---

## 14.2 Explicação da Real Vision

Além dos números, Felipe deve conseguir registrar uma nota curta.

Exemplo de estrutura:

```text
Esta semana

O que aconteceu
[texto curto]

O que estamos observando
[texto curto]

O que vamos fazer agora
[texto curto]
```

A cliente não deve precisar interpretar sozinha uma tela de Google Ads.

---

# 15. Tela Início

A tela inicial é a mais importante.

Ela deve ser cronológica.

## 15.1 Agora

Mostra o que está acontecendo neste momento.

Exemplo:

```text
AGORA

Estamos preparando sua campanha.

Precisamos de você:

[ Fotos e vídeos ]
Aguardando

[ Acesso ]
Concluído

[ Perguntas da campanha ]
2 de 3 respondidas
```

---

## 15.2 Já feito

Mostra itens concluídos de maneira compacta.

A tela não deve ficar ocupada por etapas que já acabaram.

---

## 15.3 Depois

Mostra a continuidade.

Exemplo conceitual:

```text
Depois

○ Campanha preparada
○ Campanha no ar
○ Acompanhamento semanal
○ Encerramento
```

Sem datas artificiais se elas não estiverem definidas.

---

# 16. Tela Informações

É a memória organizada.

Ela responde:

> “O que já ficou definido?”

## Conteúdo inicial

### Sobre a campanha

- respostas do briefing;
- períodos importantes;
- investimento informado pela cliente.

### Materiais

- status;
- confirmação;
- data.

### Acessos

- status;
- confirmação;
- data.

### Outras informações

Novos dados importantes podem entrar conforme surgirem.

## Regra

Informação reutilizável do projeto não deve depender de uma busca no WhatsApp.

---

# 17. Tela Campanha

Essa tela ganha relevância quando a campanha estiver ativa.

Ela não precisa existir cheia desde o primeiro dia.

## Objetivo

Responder:

> “O que está acontecendo com o dinheiro que estou investindo?”

e:

> “O que a campanha está gerando até o ponto que conseguimos medir?”

## Estrutura sugerida

### Estado atual

Exemplo:

```text
Campanha no ar
Atualizado em: [data]
```

### Resumo da semana

Poucos números.

Somente métricas:

- disponíveis;
- confiáveis;
- úteis para a cliente.

### Funil monitorado

Mostrar visualmente as etapas que a Real Vision consegue observar.

Exemplo conceitual:

```text
Anúncio
  ↓
Site
  ↓
Calculadora
  ↓
WhatsApp
```

Sem afirmar resultado depois do WhatsApp se ele não estiver sendo medido.

### Comentário da Real Vision

Texto simples explicando:

- o que aconteceu;
- o que foi aprendido;
- o que será ajustado.

---

# 18. Fotos e vídeos

Na V1, o envio continua pelo WhatsApp.

O portal:

1. explica o que precisa ser enviado;
2. permite abrir o WhatsApp quando útil;
3. permite marcar **“Já enviei”**;
4. grava o estado.

Felipe pode confirmar o recebimento.

## Fora da V1

Upload direto de mídia.

---

# 19. Acessos

Nunca pedir credencial.

Estrutura:

```text
O que precisamos
Por que precisamos
Como você faz
[ Já fiz ]
```

Nunca solicitar:

- senha;
- token;
- chave;
- código secreto.

---

# 20. Briefing

Perguntas confirmadas:

- quem a pousada quer atrair;
- quais épocas/períodos importam mais;
- quanto pretende investir por mês em anúncios.

## UX

- no máximo três campos visíveis por etapa;
- salvar progresso;
- permitir edição;
- confirmar salvamento;
- linguagem comum;
- sem jargão de marketing.

---

# 21. Ajuda contextual

Cada módulo pode ter ajuda simples.

A ajuda explica:

1. por que estamos pedindo isso;
2. o que você precisa fazer.

Exemplo bom:

> “Esse acesso permite que a gente prepare os anúncios sem precisar da sua senha.”

Exemplo ruim:

> “Precisamos configurar permissões no gerenciador.”

---

# 22. Experiência no iPhone

Objetivo:

Flávia conseguir deixar o portal acessível pela Tela de Início.

Não criar aplicativo nativo.

A implementação deve aproveitar o próprio site como Web App/PWA quando a estrutura atual permitir de forma segura.

## Regras

- usar o mesmo ecossistema;
- reaproveitar autenticação;
- abrir no portal quando a sessão estiver válida;
- autenticar novamente apenas quando necessário;
- não introduzir dependência offline;
- não criar cache que possa afetar a calculadora ou disponibilidade.

A implementação exata deve ser definida depois da auditoria.

---

# 23. Persistência

Tudo que for informação oficial do projeto deve sobreviver a:

- refresh;
- fechamento do navegador;
- novo login;
- troca de aparelho;
- acesso do Felipe;
- novo deploy.

Não usar `localStorage` como fonte oficial de dados do projeto.

Reaproveitar Supabase existente, salvo impedimento técnico real.

---

# 24. Histórico

O portal precisa registrar histórico básico de mudanças importantes.

Exemplos:

- briefing alterado;
- material marcado como enviado;
- acesso confirmado;
- etapa avançada;
- atualização semanal publicada.

Não precisa virar sistema de auditoria complexo.

O objetivo é permitir responder:

> “Quando isso mudou?”

e:

> “Quem alterou?”

---

# 25. Cronologia de implementação

---

## Fase 0 — Auditoria e fundação

### Objetivo

Entender o sistema existente antes de mexer.

### Mapear

- repositório;
- design system;
- componentes;
- autenticação;
- Supabase;
- tabelas;
- RLS/políticas;
- gestão de datas;
- calculadora pública;
- tracking;
- Google Analytics;
- Google Ads;
- eventos existentes;
- deploy;
- possibilidade de PWA.

### Resultado

Plano técnico baseado no que realmente existe.

---

## Fase 1 — Preparação
**Mês 1**

### Objetivo

Centralizar tudo que precisa acontecer para iniciar a campanha.

### Entregas

- portal privado;
- autenticação reaproveitada;
- Início;
- cronologia;
- Informações;
- Briefing;
- Materiais;
- Acessos;
- persistência;
- visão do Felipe;
- acesso à gestão de datas existente;
- base para acompanhamento futuro.

### Resultado esperado

Flávia consegue resolver sozinha o que depende dela.

Felipe consegue acompanhar sem procurar informação no WhatsApp.

---

## Fase 2 — Campanha ativa
**Mês 2**

### Objetivo

Transformar o portal em acompanhamento semanal.

### Entram

- tela Campanha;
- dados reais disponíveis;
- data da última atualização;
- funil monitorado;
- comentário semanal da Real Vision;
- evolução visual da etapa.

### Regra

Não construir dashboard cheio de números.

Cada métrica precisa responder uma pergunta real.

---

## Fase 3 — Consolidação
**Mês 3**

### Objetivo

Mostrar a evolução do projeto e preparar encerramento.

### Possíveis entregas

- histórico das semanas;
- visão consolidada;
- principais aprendizados;
- relatório final;
- resumo do trabalho;
- próximos passos discutidos com a cliente.

---

## Fase 4 — Encerramento

Ao terminar o contrato:

- projeto muda para encerrado;
- novas solicitações deixam de aparecer como ativas;
- informações podem permanecer disponíveis para consulta;
- definir o que continua editável;
- registrar aprendizados internos da Real Vision;
- decidir separadamente o que pode ser reutilizado em outro cliente.

Não pressupor renovação automática.

---

# 26. Modelo de dados conceitual

A estrutura real deve respeitar o Supabase existente.

Não criar novas tabelas se uma estrutura existente já resolver.

## Projeto

- identificação;
- status;
- etapa;
- datas;
- timestamps.

## Participantes

- Flávia;
- Felipe.

## Informações

- chave/pergunta;
- valor;
- autor;
- atualizado em.

## Checklist

- item;
- estado;
- confirmado por;
- confirmado em.

## Atualizações semanais

- período;
- data de atualização;
- dados exibidos;
- comentário da Real Vision;
- origem/estado dos dados quando necessário.

## Histórico

- ação;
- autor;
- item;
- data.

## Disponibilidade

Reutilizar estrutura existente.

---

# 27. Dados da campanha: regra de confiabilidade

Nenhum número deve aparecer como verdade sem origem confiável.

O portal deve diferenciar internamente:

- dado vindo de fonte automática;
- dado calculado;
- texto/observação da Real Vision;
- informação informada pela cliente.

Se um dado deixar de sincronizar ou estiver desatualizado, a interface deve mostrar isso em vez de exibir silenciosamente número antigo como atual.

---

# 28. Estado sem dados

O portal precisa funcionar mesmo quando uma integração ainda não trouxe dados.

Exemplo:

Em vez de mostrar:

> 0 cliques

quando não existe dado carregado, mostrar:

> Dados desta semana ainda não atualizados.

Isso evita transformar ausência de informação em informação falsa.

---

# 29. Requisitos de segurança

- autenticação obrigatória para área privada;
- reaproveitar acesso existente da Flávia;
- Felipe possui identidade própria;
- autorização aplicada também no backend;
- não confiar em rota escondida;
- nenhum segredo no frontend;
- nenhuma senha armazenada;
- nenhuma `service_role` exposta;
- políticas do Supabase revisadas;
- menor permissão possível;
- dados privados nunca acessíveis anonimamente.

---

# 30. Requisitos de confiabilidade

Antes da publicação:

- site público continua funcionando;
- calculadora continua funcionando;
- disponibilidade continua correta;
- bloqueio de datas continua funcionando;
- autenticação existente continua funcionando;
- nenhum dado antigo é perdido;
- portal não vira dependência da calculadora;
- sincronização de dados não quebra o frontend se falhar;
- ausência de atualização não aparece como zero;
- Felipe e Flávia veem somente o que precisam.

---

# 31. Casos de uso inesperado que o produto precisa suportar

## Flávia marca “já enviei” mas esqueceu um arquivo

O portal deve permitir que Felipe diferencie:

- confirmação da cliente;
- confirmação da Real Vision.

---

## Flávia altera uma resposta depois da campanha começar

A alteração deve ser salva com data.

Felipe deve conseguir identificar que a informação mudou.

---

## Flávia abre pelo computador em vez do iPhone

A experiência continua funcional.

PWA é conveniência, não dependência.

---

## Flávia esquece o portal

O link continua podendo ser compartilhado pelo WhatsApp.

O portal não pode depender exclusivamente do ícone instalado.

---

## A sincronização semanal falha

Não mostrar dados antigos como se fossem atuais.

Mostrar data da última atualização e estado de atualização.

---

## Uma integração externa fica indisponível

O restante do portal continua funcionando.

Briefing, informações e gestão de datas não dependem da atualização do Google Ads.

---

## O portal apresenta erro

A calculadora pública e o fluxo de reservas continuam funcionando.

---

## Flávia tenta editar algo da Real Vision

O backend recusa a alteração, mesmo que alguém tente acessar a requisição diretamente.

---

# 32. Fora do escopo da V1

Não construir agora:

- CRM;
- gestão de leads no WhatsApp;
- registro de cada conversa com hóspede;
- pipeline comercial da pousada;
- dashboard completo do Google Ads;
- editor de campanhas;
- upload de mídia;
- chat interno;
- cobrança;
- pagamento;
- contrato;
- aplicativo App Store;
- nova identidade visual;
- novo design system;
- novo backend sem necessidade;
- nova autenticação;
- segunda agenda;
- duplicação de disponibilidade;
- multiempresa;
- multicliente;
- CMS;
- construtor de formulários;
- sistema genérico de roles;
- automação completa do atendimento da Flávia.

---

# 33. Critérios de aceitação da V1

A V1 só está pronta quando:

- [ ] foi construída sobre o repositório existente;
- [ ] reutiliza o design system do site;
- [ ] não cria nova identidade visual;
- [ ] Flávia usa o acesso que já possui;
- [ ] Felipe possui acesso próprio;
- [ ] permissões refletem as ações reais de cada pessoa;
- [ ] Flávia entende imediatamente a etapa atual;
- [ ] a tela inicial prioriza o que precisa acontecer agora;
- [ ] briefing salva e recupera respostas;
- [ ] materiais possuem estado persistente;
- [ ] acessos possuem estado persistente;
- [ ] informações importantes ficam organizadas;
- [ ] Felipe consegue ver o que Flávia registrou;
- [ ] gestão de datas existente é acessível pelo portal;
- [ ] gestão de datas não foi duplicada;
- [ ] calculadora pública não depende do portal;
- [ ] site público continua funcionando;
- [ ] nenhum campo pede credencial;
- [ ] nenhum estado importante depende apenas do navegador;
- [ ] histórico básico registra mudanças relevantes;
- [ ] o portal está preparado para receber acompanhamento semanal;
- [ ] falha de integração não derruba o restante do portal;
- [ ] ausência de dados não aparece como zero;
- [ ] todo texto da Flávia foi revisado por Felipe antes de publicar.

---

# 34. Critérios de sucesso do projeto

O projeto teve sucesso se:

1. Flávia consegue usar sem perguntar onde fazer cada coisa.
2. Ela entende o que depende dela.
3. Felipe não precisa procurar informação importante no WhatsApp.
4. O andamento do tráfego fica compreensível para uma cliente leiga.
5. A cliente consegue visualizar semanalmente o que está acontecendo.
6. O portal deixa claro até onde o funil é mensurado.
7. A gestão de datas fica mais fácil de acessar sem ser reconstruída.
8. O site e a calculadora continuam estáveis.
9. O portal consegue evoluir pelos três meses sem trocar de ecossistema.
10. A Real Vision termina o projeto com um processo documentado que pode ser analisado para futuras implementações.

---

# 35. Riscos principais

## 35.1 Transformar o portal em SaaS cedo demais

**Risco:** criar abstrações, multiempresa e infraestrutura desnecessária.

**Mitigação:** construir para Vila dos Corais e documentar padrões.

---

## 35.2 Acoplar o portal à calculadora

**Risco:** uma alteração privada afetar reservas públicas.

**Mitigação:** manter a calculadora independente do portal.

---

## 35.3 Reconstruir a agenda

**Risco:** quebrar funcionalidade já operacional.

**Mitigação:** integrar acesso antes de refatorar.

---

## 35.4 Excesso de métricas

**Risco:** cliente vê números, mas não entende nada.

**Mitigação:** poucos dados + explicação humana semanal.

---

## 35.5 Número antigo parecer atual

**Risco:** decisão errada baseada em dado desatualizado.

**Mitigação:** mostrar data da atualização e estado da sincronização.

---

## 35.6 Confundir clique no WhatsApp com reserva

**Risco:** atribuir resultado que a medição não comprova.

**Mitigação:** deixar clara a fronteira do funil.

---

## 35.7 WhatsApp continuar sendo a fonte oficial

**Risco:** portal vira decoração.

**Mitigação:** informação reutilizável deve ficar estruturada no portal.

---

## 35.8 Criar nova identidade visual

**Risco:** aumentar custo e deixar o portal desconectado do site.

**Mitigação:** usar o design system existente.

---

## 35.9 PWA virar dependência

**Risco:** experiência falhar fora do iPhone ou sem instalação.

**Mitigação:** portal funciona plenamente no navegador; instalação é atalho.

---

# 36. Decisões cronológicas

## D1 — Mini-app de coleta

Primeira ideia:

- materiais;
- acessos;
- briefing.

---

## D2 — Informação persistente

Percebeu-se que o problema não era apenas comunicação.

Informações importantes precisavam ficar organizadas e consultáveis.

---

## D3 — Portal como memória operacional

WhatsApp fica para conversa.

Portal passa a guardar estado e acompanhamento.

---

## D4 — Descoberta da infraestrutura existente

Foi identificado que já existem:

- site;
- repositório;
- Supabase;
- login;
- gestão de datas.

Criar um app paralelo deixou de fazer sentido.

---

## D5 — Evoluir o site existente

A nova solução passa a ser uma extensão privada do ecossistema da cliente.

---

## D6 — Gestão de datas integrada visualmente

Flávia deve conseguir acessar a função pelo portal.

A função não será reconstruída na primeira versão.

---

## D7 — Separação técnica da calculadora

A calculadora pública não pode depender do portal.

---

## D8 — Permissões por ação

Não construir hierarquia genérica de cliente/admin.

Felipe e Flávia possuem capacidades específicas.

---

## D9 — Design existente como fonte

Paleta, componentes, tipografia e estrutura visual vêm do site existente.

---

## D10 — UX cronológica

A experiência principal é:

- agora;
- já feito;
- depois.

---

## D11 — Crescimento mensal

O portal evolui junto com os três meses do contrato.

---

## D12 — Acompanhamento semanal

Quando a campanha estiver ativa, o portal passa a mostrar dados reais de acompanhamento e explicação da Real Vision.

---

## D13 — Limite do funil

A Real Vision monitora o caminho digital até o ponto em que o potencial hóspede chega ao WhatsApp, conforme o tracking realmente disponível.

O atendimento posterior da Flávia não vira CRM dentro deste projeto.

---

## D14 — Dados + interpretação humana

Números sozinhos não são suficientes.

A atualização semanal deve combinar:

- dados;
- comentário curto;
- próximo movimento.

---

## D15 — Processo replicável

O produto atual é específico.

O processo, as decisões e os aprendizados serão documentados para possível uso futuro em outros clientes.

---

# 37. Auditoria obrigatória antes do código

Antes de implementar, Claude Code deve responder com um diagnóstico do projeto.

Mapear:

1. repositório correto;
2. stack;
3. rotas;
4. componentes;
5. design system;
6. autenticação;
7. usuário atual da Flávia;
8. Supabase;
9. tabelas;
10. RLS/políticas;
11. gestão de datas;
12. fonte de disponibilidade;
13. calculadora;
14. tracking atual;
15. Google Analytics;
16. Google Ads;
17. eventos existentes;
18. integrações disponíveis;
19. deploy;
20. viabilidade segura de PWA.

Depois:

- propor mudanças;
- listar arquivos a alterar;
- apontar riscos;
- esperar aprovação de Felipe;
- só então implementar.

---

# 38. Ordem recomendada de implementação

Depois da auditoria aprovada:

1. definir a rota do portal;
2. reaproveitar autenticação;
3. criar shell com componentes existentes;
4. criar tela Início;
5. implementar persistência;
6. implementar Briefing;
7. implementar Materiais;
8. implementar Acessos;
9. implementar Informações;
10. integrar acesso à gestão de datas;
11. implementar visão necessária do Felipe;
12. preparar estrutura de atualizações semanais;
13. validar tracking do funil;
14. integrar dados disponíveis;
15. criar tela Campanha;
16. adicionar comentário semanal;
17. avaliar PWA/atalho no iPhone;
18. testar como Flávia;
19. testar como Felipe;
20. retestar site público;
21. retestar calculadora;
22. revisar textos;
23. publicar após aprovação.

---

# 39. Travas de produção

Não publicar se:

- [ ] auditoria não estiver concluída;
- [ ] Felipe não tiver revisado a mudança;
- [ ] calculadora não tiver sido testada;
- [ ] bloqueio de datas não tiver sido testado;
- [ ] autenticação não tiver sido testada;
- [ ] permissões não tiverem sido testadas;
- [ ] persistência não tiver sido testada;
- [ ] fluxo mobile não tiver sido testado;
- [ ] textos não tiverem sido revisados;
- [ ] alguma infraestrutura paralela tiver sido criada sem justificativa;
- [ ] algum dado de campanha estiver sendo exibido sem origem validada;
- [ ] falha de integração puder derrubar o restante do portal.

---

# 40. Pontos que continuam em aberto

Não inventar agora:

- URL final;
- nomes reais de tabelas;
- nomes reais de componentes;
- estrutura exata das políticas;
- solução exata de PWA;
- métricas exatas do acompanhamento semanal;
- eventos exatos disponíveis hoje;
- formato final do relatório do mês 3;
- tempo de acesso depois do encerramento;
- o que será reaproveitado em outros clientes.

Esses pontos dependem da auditoria técnica e do uso real.

---

# 41. Definição final

O Portal do Projeto Vila dos Corais é uma extensão privada do ecossistema digital que já existe para a cliente.

Ele acompanha o contrato de Google Ads do início ao fim.

No início, ele responde:

> **O que precisamos de você agora?**

Durante a campanha, ele responde:

> **O que está acontecendo com o projeto e com o tráfego que conseguimos medir?**

No final, ele responde:

> **O que aconteceu durante esses três meses?**

Para Flávia, o valor é simplicidade e clareza.

Para Felipe, o valor é organização e visibilidade do estado real do projeto.

Para a Real Vision, o valor adicional é transformar uma execução real em processo documentado e reaproveitável, sem transformar a primeira implementação em uma plataforma genérica antes da hora.

A regra principal permanece:

> **a cliente não precisa procurar, perguntar ou lembrar onde está cada coisa. Ela abre um lugar e entende.**
