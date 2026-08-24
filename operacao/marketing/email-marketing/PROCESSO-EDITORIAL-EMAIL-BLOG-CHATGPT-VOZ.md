# Processo Editorial — Blog → Email | Real Vision

> Documento vivo do processo de criação e refinamento de emails da Real Vision a partir dos blog posts oficiais.

## Status
- Tipo: processo vivo
- Área: Real Vision → Marketing → Email Marketing
- Origem: sessões de voz no ChatGPT da Romana, dentro do projeto **Life & Business Operating System (LBOS)**
- Data de consolidação inicial: 24/08/2026
- Responsável humano pela validação: Felipe
- Agente participante nesta consolidação: ChatGPT

---

## 1. Objetivo

Transformar blog posts reais da Real Vision em emails curtos, úteis e curiosos o suficiente para levar a pessoa ao artigo completo.

O email não deve resumir o post inteiro. Ele deve:
1. entregar uma ideia que já tenha valor por si só;
2. despertar curiosidade real;
3. abrir uma lacuna natural para o clique;
4. preservar a voz da Real Vision;
5. nunca inventar fatos, histórias, números, casos ou promessas.

Princípio central:

**Entregar o ouro, mas não entregar a mina inteira.**

---

## 2. Fontes oficiais

### Blog
Fonte oficial dos artigos da Real Vision:

`realvisionmaps360/real-vision-core`

Arquivo atual que centraliza os blog posts:

`src/data/blog-posts.ts`

Antes de trabalhar qualquer email baseado em um artigo, o agente deve ler o conteúdo real do post nessa fonte. Não trabalhar apenas a partir de título, memória, resumo ou inferência.

### Estratégia, voz e operação
Fonte oficial para contexto operacional, estratégia do Hermes e regras da Real Vision:

`realvisionmaps360/real-vision-company-os-vault`

Pasta principal de email marketing:

`operacao/marketing/email-marketing/`

O agente deve cruzar o conteúdo do artigo com a documentação existente do Hermes/Real Vision antes de consolidar uma proposta.

---

## 3. Contexto do ambiente e dos agentes

Este processo foi refinado em conversas de voz no **ChatGPT da Romana**, dentro do projeto **LBOS**.

Esse ChatGPT é apenas um dos agentes que interagem com o ecossistema da Real Vision. Existem outros ambientes e agentes, incluindo ferramentas e agentes executados em outros computadores, VPSs e fluxos internos.

Regra de rastreabilidade:

**Nenhum agente deve assumir que possui sozinho todo o contexto do sistema.**

Sempre que um documento, decisão ou processo for criado, deve ficar claro:
- qual agente participou;
- em qual ambiente a decisão foi tomada;
- qual foi a fonte oficial consultada;
- quais decisões foram aprovadas por humano.

Neste documento, o agente participante é explicitamente **ChatGPT**.

---

## 4. Particularidade importante: voz vs. texto

As sessões de voz são especialmente úteis para:
- conversar;
- testar ideias rapidamente;
- rejeitar opções ruins;
- perceber reações espontâneas;
- calibrar tom;
- descobrir padrões de gosto e decisão;
- consolidar critérios editoriais.

O modo texto é preferível quando o trabalho exige:
- criação ou atualização de documentos;
- leitura estruturada de repositórios;
- execução com ferramentas/agentes;
- escrita longa;
- operações no GitHub;
- consolidação formal de decisões.

Portanto:

**Voz = refinamento e decisão.**  
**Texto = execução e registro.**

Essa diferença deve ser considerada em futuras sessões para evitar prometer ou simular uma execução que o ambiente atual não permita.

---

## 5. Fluxo operacional

### Etapa 1 — escolher o artigo
Trabalhar um blog post por vez.

### Etapa 2 — ler a fonte real
Abrir o post no `real-vision-core` e ler o conteúdo completo em português antes de propor o email.

### Etapa 3 — identificar o “ouro”
Perguntar:

> Qual é a ideia deste artigo que faz alguém pensar “porra, nunca tinha pensado assim” ou “isso é útil pra mim agora”?

O ouro não precisa ser a conclusão do post. Pode ser:
- uma observação inesperada;
- uma dor bem nomeada;
- uma inversão de perspectiva;
- um dado relevante;
- um contraste;
- um erro comum;
- uma consequência que o leitor ainda não percebeu.

### Etapa 4 — transformar em gancho de email
O email deve ser menor do que o artigo e não pode parecer uma aula.

Estrutura preferida:
1. abrir com algo humano ou interessante;
2. entregar uma pequena verdade/sacada;
3. criar uma pergunta ou tensão natural;
4. apontar para o blog post.

### Etapa 5 — validar em conversa
Gerar uma proposta curta e submetê-la à reação humana.

Se Felipe disser que ficou:
- genérico;
- abstrato;
- “cara de IA”;
- motivacional demais;
- distante do conteúdo real;
- palestrinha;

então a ideia deve ser descartada e reconstruída, não apenas maquiada.

### Etapa 6 — consolidar
Quando uma direção for aprovada, registrar:
- artigo;
- ideia central escolhida;
- gancho aprovado;
- motivo pelo qual funcionou;
- observações úteis para emails futuros.

### Etapa 7 — atualizar o documento vivo
Sempre que surgir um novo padrão recorrente de aprovação ou rejeição, atualizar este documento.

---

## 6. Critérios editoriais aprovados até agora

### Fazer
- Ser curto.
- Soar humano.
- Dar valor antes do clique.
- Criar curiosidade sem clickbait vazio.
- Usar uma ideia específica do artigo real.
- Preferir dores, observações e situações que o leitor reconhece na própria vida ou negócio.
- Fazer a pessoa pensar antes de tentar vender.
- Deixar o blog completar a ideia.
- Usar linguagem simples e direta.

### Evitar
- Conselhos genéricos de IA.
- “Você precisa pensar diferente.”
- “Use IA para automatizar tarefas” como ideia central por si só.
- Frases motivacionais que poderiam estar em qualquer empresa.
- Resumir todo o artigo no email.
- Explicar demais.
- Inventar relação entre um assunto e IA quando o post não pede isso.
- Criar uma abertura que parece palestra, guru ou LinkedIn genérico.
- Forçar venda antes de gerar interesse.

---

## 7. Padrão de curiosidade desejado

A curiosidade deve nascer de uma **informação real**, não de esconder artificialmente a resposta.

Exemplo de estrutura boa:

> “Muita gente acha que perdeu o cliente pelo preço. Às vezes, ele só passou mais confiança.”

Por que funciona:
- fala de uma situação real;
- é curta;
- não parece publicidade;
- entrega uma interpretação útil;
- abre naturalmente a pergunta “como essa confiança é construída?”.

O artigo responde o restante.

---

## 8. Exemplos aprovados nesta sessão

### Linha humana sobre sobrecarga
> “Se você sente que tá sempre apagando incêndio, esse cansaço não é só falta de tempo.”

Aprovado porque:
- começa numa sensação real;
- não menciona tecnologia à força;
- cria uma pergunta imediata;
- não entrega a solução inteira.

### Linha sobre delegação / Sócio Digital
> “Talvez você não precise de mais horas no dia, só pare de tentar fazer tudo sozinho.”

Aprovado porque:
- conversa com uma dor concreta;
- não começa vendendo IA;
- leva naturalmente para o tema de delegação;
- o artigo pode revelar a ferramenta e o processo depois.

### Linha sobre site e confiança
> “Muita gente acha que perdeu o cliente pelo preço. Às vezes, ele só passou mais confiança.”

Aprovado como direção porque:
- tira o foco do “você precisa de site”;
- conecta presença digital com decisão real;
- gera curiosidade;
- permite que o artigo explique como site, presença e credibilidade se relacionam.

---

## 9. Sinais de fraqueza (“weak links”)

Este processo deve marcar pontos frágeis em vez de escondê-los.

Weak links atuais:

1. **Gancho genérico**  
   Se servir para qualquer artigo, está fraco.

2. **Gancho desconectado da fonte**  
   Se a frase não nasce do conteúdo real do blog post, deve ser descartada.

3. **Excesso de explicação no email**  
   Se o leitor já entendeu tudo sem clicar, o email matou o próprio blog post.

4. **Curiosidade artificial**  
   Se o texto apenas esconde informação sem entregar valor, vira clickbait.

5. **“Cara de IA”**  
   Frases abstratas, equilibradas demais, motivacionais ou genéricas devem ser tratadas como falha de voz.

6. **Perda de contexto entre agentes**  
   Como vários agentes trabalham no mesmo ecossistema, toda decisão relevante deve ser registrada e referenciada.

7. **Confusão entre conversa e execução**  
   A sessão de voz pode consolidar uma decisão sem necessariamente ter executado alterações em arquivos. O documento precisa distinguir claramente decisão, proposta e execução real.

---

## 10. Relações com o LBOS

Este documento deve funcionar como um **documento vivo**.

Ele se relaciona com:
- Real Vision / Marketing / Email Marketing;
- Hermes;
- blog posts oficiais do site;
- voz da Real Vision;
- calendário editorial;
- decisões de copy;
- aprendizados das campanhas;
- futuros agentes que produzirem emails.

Princípio LBOS aplicado:

**Informação entra uma vez, é conectada e depois atualizada no ponto certo.**

Não criar versões paralelas deste processo sem necessidade. Atualizar esta fonte quando houver aprendizado real.

---

## 11. Regra de atualização

Atualizar este documento quando:
- Felipe aprovar um novo padrão;
- Felipe rejeitar repetidamente um tipo de abordagem;
- um email real gerar aprendizado relevante;
- uma nova fonte oficial entrar no processo;
- mudar a capacidade de algum agente ou ambiente;
- houver alteração no fluxo Hermes → email → blog;
- surgir um weak link novo.

Toda atualização relevante deve registrar contexto suficiente para que outro agente entenda **por que** a regra existe.

---

## 12. Regra final para futuros agentes

Antes de escrever um email baseado em blog:

1. leia o post real;
2. consulte o contexto da Real Vision/Hermes;
3. identifique uma única ideia forte;
4. escreva curto;
5. entregue valor;
6. deixe uma lacuna natural;
7. valide com humano quando necessário;
8. registre o aprendizado.

Se estiver inventando uma “boa frase” sem conseguir apontar de onde ela nasceu no conteúdo real, pare e volte para a fonte.

---

## Histórico

### 24/08/2026 — versão inicial
Documento consolidado a partir de sessão de voz no ChatGPT da Romana, projeto LBOS, após leitura do repositório oficial `real-vision-core` e alinhamento com o Vault da Real Vision.
