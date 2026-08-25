# ESPECIFICAÇÃO TÉCNICA — Campanha Estúdios de Música

## 1. Objetivo

Preparar, validar e depois operar uma campanha de aquisição da Real Vision para oferecer Website a estúdios de música no Brasil, usando como referência visual a demo criada para o AMP Estúdio.

A primeira fase NÃO é disparo de prospecção. É validação de infraestrutura, coleta de dados, critérios de elegibilidade, deduplicação e fluxo de registro no RV Acquisition System.

## 2. Ambiente de execução decidido

Executar no notebook da Romana, em um workspace separado do Company OS.

Estrutura recomendada:

```text
campanha-estudios-musica/
├── CLAUDE.md
├── PROMPT-INICIAL.md
├── ESPECIFICACAO-CAMPANHA.md
├── contexto/
│   ├── 00-LEIA-PRIMEIRO.md
│   ├── 01-institucional-AGENTS.md
│   ├── 02-institucional-EMPRESA.md
│   ├── 03-institucional-VOZ.md
│   ├── 04-institucional-TIME.md
│   ├── campanha-referencia-HANDOFF.md
│   ├── aquisicao-claude.md
│   ├── aquisicao-contract.md
│   ├── aquisicao-data-model.md
│   ├── aquisicao-operating-system.md
│   ├── aquisicao-system-architecture.md
│   ├── aquisicao-timeline.md
│   ├── prospeccao-indice.md
│   ├── catalogo-servicos.md
│   └── alvo-site-AMP-referencia.md
├── pesquisa/
├── dados/
├── scripts/
├── relatorios/
├── .env
├── .env.example
└── .gitignore
```

### Regra

O workspace pode ler e produzir dados da campanha, mas não deve modificar o Company OS original durante a fase de pesquisa.

Toda alteração destinada ao vault deve ser apresentada primeiro ao Felipe.

## 3. Documentos que precisam acompanhar a missão

### Obrigatórios

1. `00-LEIA-PRIMEIRO.md`
2. `01-institucional-AGENTS.md`
3. `02-institucional-EMPRESA.md`
4. `03-institucional-VOZ.md`
5. `04-institucional-TIME.md`
6. referência do site AMP
7. handoff da campanha Drone & Digital Unterentfelden
8. `ACQUISITION-CLAUDE`
9. `ACQUISITION-CONTRACT`
10. `ACQUISITION-DATA-MODEL`
11. `ACQUISITION-OPERATING-SYSTEM`
12. `ACQUISITION-SYSTEM-ARCHITECTURE`
13. `ACQUISITION-TIMELINE`
14. índice de prospecção
15. catálogo oficial de serviços
16. esta especificação
17. `PROMPT-INICIAL.md`

### Não é necessário copiar para esta missão

O LBOS inteiro, templates de pessoa, receita, despesa, ativo etc. não são necessários para a pesquisa inicial da campanha.

Só devem entrar se a missão passar a registrar entidades no LBOS.

## 4. Fonte de verdade

O Company OS é a fonte de verdade.

O Claude Code deve:

1. ler os documentos antes de propor arquitetura;
2. apontar conflitos em vez de resolvê-los silenciosamente;
3. nunca inventar preço, prazo, taxa de conversão, número de leads ou informação comercial;
4. nunca disparar mensagens;
5. nunca modificar produção sem aprovação;
6. registrar prospects apenas depois do dedup obrigatório.

## 5. Oferta atualmente discutida

FATO DA SESSÃO:

- oferta principal: Website;
- primeiro ano: R$ 1.500;
- inclui site, domínio e hospedagem;
- o modelo AMP serve como demonstração/base;
- ele pode ser adaptado ou outro desenho pode ser criado;
- o primeiro contato deve ser curto;
- a explicação completa vem somente se houver interesse;
- canais planejados: email e WhatsApp.

O Claude Code deve tratar esses pontos como informação da sessão atual e confrontar qualquer conflito com o Company OS antes de transformar isso em campanha oficial.

## 6. Região

São Bernardo do Campo deve ser evitado nesta rodada para não criar conflito comercial local com o AMP/Saulo.

Nenhuma outra cidade está decidida.

O Claude Code deve pesquisar e comparar regiões antes de recomendar uma.

## 7. Arquitetura inicial a validar

```text
Claude Code
    │
    ├── documentos / skills da Real Vision
    │
    ├── fonte de descoberta
    │      └── hipótese inicial: Apify
    │
    ├── enriquecimento
    │
    ├── análise de presença digital
    │
    ├── deduplicação obrigatória
    │
    ├── Opportunity Score
    │
    └── rv-acquisition
```

A Apify é hipótese inicial porque já foi usada pela Real Vision.

Não assumir que é a melhor solução sem teste.

## 8. Missão 1 — Auditoria do ambiente

Antes de coletar qualquer empresa:

- confirmar versão e funcionamento do Claude Code;
- listar skills locais relevantes;
- listar MCPs configurados;
- verificar como o Supabase `rv-acquisition` será acessado;
- verificar possibilidade de integrar Apify;
- confirmar `.env` no `.gitignore`;
- criar `.env.example` apenas com nomes de variáveis;
- não exibir segredos em terminal, relatório ou markdown.

Entregável: `relatorios/01-auditoria-ambiente.md`.

## 9. Missão 2 — Pesquisa de ferramentas

Testar primeiro Apify.

Identificar Actors adequados para:

- Google Maps / Google Places;
- busca por categoria;
- busca por área/cidade;
- website;
- telefone;
- reviews;
- quantidade de reviews;
- endereço;
- Place ID;
- email ou enriquecimento de contato quando disponível.

Documentar:

- input;
- output;
- custo;
- cobertura;
- limitações;
- integração;
- facilidade de automação pelo Claude Code.

Só comparar outra plataforma se existir deficiência objetiva.

Critérios de comparação:

1. cobertura;
2. qualidade;
3. campos necessários;
4. custo por negócio útil;
5. estabilidade;
6. integração;
7. risco de lock-in.

Entregável: `relatorios/02-ferramentas.md`.

## 10. Missão 3 — Pesquisa geográfica

Objetivo: descobrir onde iniciar no Brasil sem usar São Bernardo do Campo.

Não escolher uma cidade pela fama.

Criar um método comparativo baseado em dados.

Para cada região candidata, medir pelo menos:

- quantidade aproximada de estúdios relevantes;
- densidade;
- presença ou ausência de website;
- qualidade aparente do website;
- atividade no Google;
- canais de contato;
- porte aparente;
- sinais de operação real;
- possibilidade de atendimento remoto.

Produzir shortlist e explicar os trade-offs.

Entregável: `relatorios/03-mercados.md`.

Nenhuma região vira campanha oficial sem aprovação do Felipe.

## 11. Missão 4 — Amostra pequena

Depois da aprovação da região:

1. executar uma amostra pequena;
2. deduplicar;
3. enriquecer somente registros únicos;
4. verificar presença digital;
5. calcular Opportunity Score conforme o Acquisition System;
6. NÃO iniciar a campanha completa;
7. apresentar qualidade e custo da amostra.

O tamanho da amostra deve ser proposto ao Felipe antes da execução.

## 12. Elegibilidade

O objetivo não é achar "os melhores estúdios".

É achar os negócios com maior probabilidade de precisar e comprar Website.

Priorizar sinais combinados:

- operação real;
- capacidade aparente;
- presença digital insuficiente;
- ausência de site ou site claramente fraco;
- contato acessível;
- fit remoto.

Redes, franquias e negócios fora do ICP devem ser rebaixados conforme o Operating System.

## 13. Deduplicação

Antes de qualquer criação em `prospects`, seguir integralmente o `ACQUISITION-CONTRACT`.

No mínimo:

1. nome normalizado + cidade;
2. telefone;
3. email;
4. fuzzy match quando aplicável.

Se existir prospect, não criar outro.

## 14. Coleta em duas etapas

Preferência arquitetural:

### Descoberta barata
Encontrar o maior conjunto possível com o mínimo de campos necessários.

### Enriquecimento posterior
Depois do dedup, gastar recursos apenas nos registros únicos e potencialmente elegíveis.

Essa lógica deve ser testada e comparada com o aprendizado da campanha Unterentfelden.

## 15. Mensagem comercial

Não escrever a copy final nesta fase.

Direção já definida na sessão:

Primeiro contato:
- curto;
- humano;
- direto;
- mostra que existe uma solução;
- preço pode aparecer;
- objetivo é gerar uma resposta de interesse.

Segundo contato, somente se houver interesse:
- o que está incluído;
- como funciona adaptação do modelo;
- domínio;
- hospedagem;
- processo;
- próximos passos.

Nunca misturar Website com chatbot, 360 ou outro produto no primeiro contato.

## 16. Portões humanos

Parar e pedir decisão do Felipe antes de:

- escolher a cidade final;
- definir amostra paga relevante;
- inserir campanha oficial;
- iniciar coleta em escala;
- criar dezenas/centenas de prospects;
- definir copy final;
- criar rascunhos;
- enviar qualquer mensagem;
- alterar preço;
- modificar Company OS;
- mudar arquitetura do Acquisition System.

## 17. Separação FATO / PESQUISA / HIPÓTESE

Todo relatório deve usar:

### FATO
Confirmado pelos documentos ou pelo Felipe.

### PESQUISA
Verificado externamente.

### HIPÓTESE
Proposta ou inferência ainda não validada.

## 18. Resultado final esperado

Ao fim da fase de validação, o Felipe deve receber:

1. ambiente validado;
2. stack recomendada;
3. custo conhecido;
4. fonte de leads recomendada;
5. shortlist de regiões;
6. critérios de qualificação;
7. desenho de coleta;
8. integração com `rv-acquisition`;
9. riscos;
10. proposta da primeira amostra;
11. nenhuma ação irreversível executada sem aprovação.
