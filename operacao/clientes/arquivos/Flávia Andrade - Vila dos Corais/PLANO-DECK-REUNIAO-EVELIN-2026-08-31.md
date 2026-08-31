# Plano — Reescrita do Deck "Anúncios no Google · Vila dos Corais"

Documento de trabalho. Registra o que Felipe pediu em 31/08/2026 e o plano de execução,
ANTES de qualquer alteração no arquivo. Nada implementado até aprovação.

Cliente: [[FICHA-CLIENTE]] · Histórico: [[Vila-dos-Corais-TIMELINE]]

- **Arquivo atual:** `C:\Users\Felipe Garcia\Downloads\reuniaoevelinslides.html` (21 slides, palco 1920×1080)
- **Público da reunião:** Evelin (ponte operacional) e, por tabela, Flávia (decisora)
- **Objetivo do deck:** vender a gestão de Google Ads da Real Vision — 3 meses — para atrair
  hóspede qualificado para a Vila dos Corais

---

## 1. Correções pontuais de texto (literais, já definidas)

| # | Slide | O que muda |
|---|-------|-----------|
| 1 | 03 — Resumo | Terceira condição deixa de ser "alguém cuidando toda semana" e passa a ser **"a comunicação semanal entre as partes"**. Texto: *"Uma configuração bem feita, uma medição instalada e a comunicação semanal entre as partes. Faltando qualquer uma das três, o dinheiro é gasto sem retorno. É disso que o resto deste material trata."* |
| 2 | 04 — Como o Google cobra | Etapa 2 do fluxo vira **"2. O leilão"**, com o texto: *"O Google escolhe entre os anunciantes que querem aparecer naquela busca, ele monta a ordem dos anúncios."* |
| 3 | 04 — Callout final | Substituir por: *"Um clique custa o mesmo, não importa quem clicou. Se custar R$ 2 o clique, alguém que nunca ia alugar custa R$ 2. Alguém decidido a alugar também custa R$ 2. A diferença não está no preço, está em quem a gente traz para clicar."* |

## 2. Estrutura — remoções e enxugamento

| # | Slide | O que muda |
|---|-------|-----------|
| 4 | 13 — "O que fica com você, em detalhe" (5 passos da Evelin) | **Manter, removendo o item 3** ("Ajudar a Flávia com o cartão"). Ficam 4 passos. |
| 5 | 14 — "Por que o aviso semanal importa tanto" | **Excluir o slide** e fundir a ideia dentro do slide 03, junto da terceira condição |
| 6 | 16 — "Por que três meses" | Conteúdo está certo. Só precisa de **tratamento visual melhor** (Fase 3) |
| 7 | 18 — Honorários | Tirar a linha "Google + Instagram/Facebook (R$ 800)". Fica só: implementação R$ 600 + gestão R$ 600/mês → **total R$ 2.400 nos três meses** |
| 8 | 20 — Custo total | Remover a menção a "só Google Ads" como se houvesse alternativa; passa a ser o único caminho |

## 3. Mudança de eixo — o conselho da Romana

Diagnóstico: o deck hoje abre explicando **o que a Real Vision faz**. Deveria abrir mostrando
**por que a Vila dos Corais precisa da Real Vision** — e por emoção, não por técnica.

**Nova abertura (substitui o slide 02 "Para que serve este documento"):**

1. **Slide-cena.** Casal em casa, semana de folga, decide viajar. Pergunta: "para onde a gente vai?"
   A primeira coisa que qualquer um faz é abrir o Google e digitar *pousada em Maraú*.
2. **Slide-pergunta.** Nessa busca aparecem hotéis e pousadas. **Por que a Vila dos Corais não está lá,
   e outro está?** Resposta: porque o outro investe no que ninguém vê — e é isso que a gente faz.
3. **Slide-apresentação (Real Vision + Felipe).** *"A gente faz isso para vários clientes, e é
   especializada em turismo — porque no turismo tudo passa pelo Google."* Aqui entram Felipe,
   a Real Vision, e o fato de já cuidarmos do site e do Google da própria Vila dos Corais.

Regra de escrita para o deck inteiro, vinda da Romana: **frases curtas, zero termo técnico, uma ideia por slide.**

## 4. Mensagens que precisam ficar explícitas no deck todo

- É um **projeto de 3 meses** — é assim que funciona, e termina ali.
- O serviço é **gestão de Google Ads**. Nenhuma menção a Meta Ads, Instagram ou preços alternativos.
- O objetivo é **atrair hóspede qualificado para a Vila dos Corais** (não "cliques", não "tráfego").
- Fica claro **o que a Real Vision faz e por que eles precisam da gente**.

## 5. Plano de execução

**Fase 1 — Conteúdo (agentes em paralelo)**
- Agente A: reescreve a abertura nova (3 slides da seção 3)
- Agente B: aplica as correções literais da seção 1 e as remoções da seção 2
- Agente C: revisa números/preço e a narrativa dos 3 meses de ponta a ponta
- Consolidação: um único HTML, numeração de slides e contador corrigidos

**Fase 2 — Revisão de voz**
- Passar tudo por `rv-copy` + `contexto/VOZ.md`: frase curta, sem jargão, sem em-dash

**Fase 3 — Design (só depois do conteúdo aprovado)**
- Carregar `frontend-design`
- Pesquisar referências reais: Material Design 3, decks do Google Ads / Think with Google,
  padrões de tipografia (Google Sans / Manrope), grid, cor e elevação
- Estudar os componentes um a um antes de aplicar: capa, cards, fluxo, timeline, tabela de preço
- Aplicar a nova pele mantendo o palco fixo 1920×1080 e o modo de edição inline

**Entrega:** novo arquivo HTML autocontido, nome com data (`reuniao-evelin-slides-2026-08-31.html`)

## 6. Decisões fechadas com Felipe (31/08/2026)

- Slide 13: **fica**, só sai o item 3 (cartão da Flávia)
- Slide 14: **sai**, e a ideia ("o Google só sabe o que a gente conta pra ele") entra dentro do slide 03
- Slide 16: conteúdo aprovado, só melhorar o visual na Fase 3
