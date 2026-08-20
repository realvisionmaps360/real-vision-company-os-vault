# Drone & Digital Unterentfelden — handoff

> Campanha de prospecção da Real Vision 360. Estado em **19.08.2026**.
> Este documento existe para uma sessão nova continuar de onde parou, sem contexto prévio.
>
> **⚠️ A campanha mudou de modelo em 19.08.2026.** Deixou de ser venda e virou **validação de
> mercado gratuita** — ver [[DEC-2026-004]] e o
> `PLANO-REESTRUTURACAO-2026-08-19.md` desta pasta, que tem o detalhe frente a frente.
> Tudo que este documento diz sobre preço, variantes de pagamento ou publicação no perfil do
> Google **está revogado**.

---

## 1. O que é a campanha

Entregar **de graça** a foto 360° aérea do bairro para os negócios que aparecem nela, e pedir em
troca — de forma **voluntária** — a resposta de 4 perguntas que decidem se existe operação suíça
para a Real Vision.

- **Nome:** Drone & Digital Unterentfelden
- **Preço:** nenhum. Oferta gratuita, nomeada como piloto datado ("Pilotphase, August 2026")
- **O que o negócio recebe:** o arquivo da foto 360° para download, o link navegável, e o direito
  de usar livremente. Nada é publicado por nós no perfil de ninguém
- **O que a Real Vision recebe:** as respostas do questionário (voluntárias) e uma base de email
  só com quem marcou o opt-in explícito
- **Idioma:** alemão suíço (o bairro é 100% germanófono). A landing é construída em alemão, não traduzida
- **Canal:** email, com rascunhos revisados um por um pelo Felipe antes de enviar

**Por que mudou:** o Felipe, brasileiro sem status de residência na Suíça, não tem como receber
por esse trabalho de forma legal e simples
(`operacao/gestao/juridico-fiscal/PESQUISA-PAGAMENTOS-SUICA-2026-08-14.md`). Sem dinheiro
envolvido, some a metade fiscal inteira do problema, e a rodada vira o portão de validação de
mercado novo que o `ACQUISITION-OPERATING-SYSTEM.md` já mandava fazer na 1ª abordagem de um
mercado novo.

**Critério de sucesso, travado antes do envio:** 6 ou mais respostas dos 24 = sinal positivo, vale
ir atrás da autorização de trabalho. 2 ou menos = a resposta é não.

**Linha vermelha:** nenhum voo novo — Oberentfelden, resto de Aarau, qualquer bairro — até o
Amt für Migration responder.

O gancho real da oferta, descoberto no levantamento: **quase nenhum negócio do bairro tem foto aérea**,
e **23 dos 64 perfis do Google não estão nem reivindicados pelos donos**.

---

## 2. Onde a campanha está agora

| Etapa | Estado |
|---|---|
| Área alvo delimitada e convertida em polígono | ✅ feito |
| Nome da campanha | ✅ Drone & Digital Unterentfelden |
| Ferramenta de scraping configurada | ✅ Apify, conta `vann_gghost` |
| Levantamento e contagem dos negócios | ✅ 69 lugares, 64 negócios, 30 com email |
| Planilha de elegíveis | ✅ `dados/Drone-Digital-Unterentfelden-levantamento.xlsx` |
| Decisão do modelo novo | ✅ [[DEC-2026-004]] gravada em 19.08 |
| Landing page reescrita em alemão | ✅ feito em 19.08 — sem preço, sem variante, 4 perguntas, opt-in desacoplado, seção "Was Sie damit machen können" |
| Arquivo do download | ✅ `landing/site/public/unterentfelden-luftaufnahme-360-13-08-2026.jpg` — panorama equiretangular, XMP GPano verificado e íntegro |
| Analytics | ✅ PostHog cookieless instalado e testado (`$pageview`, `download_click`, `tour_open` confirmados chegando) |
| Edge Function | ✅ **versão 3** no ar — 4 perguntas + gravação condicional por consentimento. Testada ponta a ponta em 19.08 |
| Gerador de emails | ✅ reescrito, lê o CSV direto (o `eligible.tsv` foi eliminado) |
| Texto dos 24 emails | ✅ **gerados em 20.08** em `emails/emails-24-gerados-2026-08-19.json`. Guarda-corpo verde: zero vestígio de preço, zero `ß` |
| 24 rascunhos criados no Gmail do Felipe | ⚠️ ainda com o texto ANTIGO **e com preço**. Precisam ser regravados |
| Subdomínio próprio | ⚠️ `unterentfelden.realvisionmaps.com` já adicionado no Vercel; falta o registro `A` na Hostinger — ver seção 10 |
| Landing page em produção | ⚠️ o Vercel ainda serve a versão ANTIGA (em português, com preço). **Falta `npx vercel --prod`, que depende do OK do Felipe** |
| Tour 360° de Unterentfelden | ✅ gravado — `https://tour.realvisionmaps.com/unterentfelden01/`, embutido na página |
| Carta ao Amt für Migration | 🔜 rascunho a escrever |
| Envio dos emails | 🔜 só depois de tudo acima |

---

## 3. A área alvo

**Não é Aarau.** Todos os 64 negócios têm endereço **5035 Unterentfelden**, o município vizinho.
Isso foi descoberto durante o levantamento e mudou o nome da campanha, que antes era "Drone & Digital Aarau".

- Centro: `47.372320, 8.044592`
- 942 m leste-oeste × 631 m norte-sul, raio máximo 514 m
- Bairro Distelberg / Gönhard, delimitado por floresta a oeste e norte, pela Hauptstrasse e a A1 a leste,
  e por campo aberto ao sul

Método completo de medição, incluindo a ancoragem e a verificação de erro:
`dados/area-COMO-FOI-MEDIDA.md`. Polígono pronto para uso: `dados/area-poligono.geojson`.

---

## 4. Os números do levantamento

| | |
|---|---|
| Lugares mapeados dentro do polígono | 69 |
| Pontos não comerciais (paradas de ônibus, horta comunitária) | 5 |
| **Negócios reais na área** | **64** |
| Permanentemente fechados | 0 |
| Com website | 45 |
| **Com email localizado — os elegíveis** | **30** |
| Perfis do Google não reivindicados pelo dono | 23 |
| Tier A, prontos para envio | 24 |
| Tier B, revisar antes | 6 |

### Critérios de elegibilidade, definidos pelo Felipe

Recebe email quem cumprir todos:

1. Tem email localizável
2. Está dentro da área alvo
3. Tem perfil no Google Meu Negócio
4. É empresa pequena ou média — grandes ficam fora

Home office e loja física entram igualmente, não faz diferença.

### Os 6 do tier B e por que foram separados

| Estabelecimento | Motivo |
|---|---|
| Naturfreunde Oberentfelden | Associação (Verein), não empresa |
| Skiclub Belp | Clube esportivo com sede em Belp (BE); endereço local é só secretariado |
| Beratung für Schwerhörige und Gehörlose AG/SO | Instituição cantonal com 5 escritórios, não é PME |
| Aargauer Sehhilfe | Ligada à instituição Landenhof, não é PME independente |
| Midland Tankstelle | Rede de postos do grupo Oelbrack, fora do critério de porte |
| Riba Elektro AG | Porte médio-grande, 7 emails corporativos; confirmar se cabe |

---

## 5. Como o levantamento foi feito (para repetir em outro bairro)

Ferramenta: **Apify**, actor `compass/crawler-google-places`. Conta `vann_gghost`, plano FREE
com US$ 5/mês. Este levantamento custou **US$ 1,03**, sobraram US$ 3,97 no mês.

Configuração exata, preços por evento e as quatro varreduras: `dados/apify-config.json`.

### Duas lições que valem para a próxima área

**Uma varredura só não cobre.** O modo OCR sozinho retornou 23 lugares e perdeu o GOMO GmbH,
que está dentro do polígono e tem perfil ativo. Foi o sweep por 58 termos de categoria que fechou
a cobertura, chegando a 69. Sempre combinar OCR + mouse + categorias e deduplicar por `placeId`.

**Descoberta barata, enriquecimento caro só no fim.** Rodar as varreduras de descoberta com
`scrapePlaceDetailPage: false` e `scrapeContacts: false`, deduplicar, e só então rodar uma passada
de enriquecimento sobre a lista única passando os `placeIds`. Evita pagar detalhe e contato de
duplicata.

### Restrição de ambiente que vai reaparecer

`api.apify.com` está **bloqueado** tanto no sandbox da nuvem quanto no `device_bash` do VM local
(o proxy libera `api.github.com` mas não o Apify). A chamada à API precisa sair de um **navegador
autenticado**: `fetch` a partir de uma aba em `console.apify.com`, que tem CORS liberado para
`api.apify.com`. Detalhes em `dados/apify-config.json`.

Dois efeitos colaterais dessa rota, para não perder tempo redescobrindo:

- O `javascript_tool` do navegador corta em **45 s** por chamada. Polls de run precisam ser curtos.
- A saída do `javascript_tool` trunca por volta de **1000 a 1400 caracteres**, e base64 é bloqueado
  por filtro de segurança. Transferir dados em blocos pequenos de texto puro, ou fazer o filtro
  dentro do navegador e transferir só o resultado final.

---

## 6. ✅ Resolvida: os "ângulos" por ramo de negócio

**O erro:** cada email tinha uma frase explicando por que aquele ramo específico se beneficia da
foto (o "ângulo"), na função `angle()` do `emails/gerador-emails.py`. Alguns prometiam o que a
foto não mostra — "ver onde é a entrada", "ver onde dá pra parar o carro". A captura é de
altitude alta, cobrindo o bairro inteiro: mostra telhados, quarteirões e o traçado das ruas, mas
não porta de entrada nem vaga de estacionamento.

**A correção (13/08, texto escrito pelo próprio Felipe):** os 8 ângulos por ramo foram removidos
e substituídos por **um parágrafo único e verdadeiro**, igual para todos os 24:

> Die Aufnahme zeigt deutlich, wo Ihre Adresse im Quartier liegt und wie die Umgebung aussieht.
> Da die Aufnahme ein grosses Gebiet abdeckt, gibt sie Ihren Kundinnen und Kunden einen guten
> Überblick über die Lage Ihres Betriebs im Quartier.

A função `angle()` foi removida do script e substituída pelas constantes `FIXED_DE`/`FIXED_PT`.
O `emails/BRIEFING-PARA-IA-EXTERNA-angulos.md` continua na pasta como registro do problema, mas
**não precisa mais ser usado** — a correção já foi aplicada.

A lição virou nó de conhecimento no LBOS: `LBOS/05-Conhecimento/landing-de-campanha-com-captura-propria.md`
(CON-2026-005), seção "A lição de copy que quase passou batido".

Resolvido também: o link `https://drone-unterentfelden.vercel.app` nos 24 rascunhos já bate com a
URL real da landing page (coincidência de nome de projeto). Só revisitar quando o subdomínio
próprio entrar.

Ainda em aberto: nenhum dos 24 emails menciona o tour 360° diretamente no corpo. A landing page
já mostra a imagem, então não é bloqueio. Avaliar se vale colocar o link direto também.

---

## 7. O que tem em cada pasta

```
drone-digital-unterentfelden/
├── HANDOFF.md                              ← este arquivo
├── PROMPT-CLAUDE-CODE.md                   ← mensagem pronta para colar no Claude Code
├── dados/
│   ├── Drone-Digital-Unterentfelden-levantamento.xlsx   3 abas: Resumo, Elegíveis, Sem email
│   ├── elegiveis-30.csv                    os 30 com email, separador ";"
│   ├── sem-email-34.csv                    os 34 sem email, para follow-up por telefone ou visita
│   ├── area-poligono.geojson               polígono da área, ordem [lng, lat]
│   ├── area-medicao-bruta.json             mesmo polígono em 96 vértices, centro e raio
│   ├── area-COMO-FOI-MEDIDA.md             método, ancoragem e verificação de erro
│   ├── apify-config.json                   config exata das 4 varreduras, preços, restrições
│   └── gerador-planilha.py                 script que monta o xlsx
├── emails/
│   ├── revisao-emails.md                   os 24 emails completos, com índice
│   ├── emails-24-gerados.json              os mesmos em JSON (to, subject, body)
│   ├── gerador-emails.py                   gerador; mudar a constante URL/DATA_CAPTACAO e rodar de novo
│   └── BRIEFING-PARA-IA-EXTERNA-angulos.md ← pendência aberta, ver seção 6. Documento pronto pra IA externa
└── landing/
    ├── BRIEFING-LANDING.md                 ← o que construir, lido antes de codar
    ├── referencia-v1-alema.html            versão descartada, em alemão e mais longa. Só referência.
    └── site/                               ← a landing page, no ar em produção
        ├── index.html, src/style.css, src/main.js
        └── README.md                       como rodar, formulário (Edge Function) e re-deploy
```

---

## 8. Estrutura do email (para manter consistência se mudar o texto)

Alemão, tratamento `Sie`, fecho `Freundliche Grüsse`. Suíço não usa `ß`, sempre `ss`.
Tom conforme `contexto/VOZ.md`: direto, técnico, consultivo, sem hipérbole.

1. `Guten Tag` — nominal só quando pessoa e gênero estão confirmados pelo email ou pelo nome do negócio
2. Abertura: quem sou, que fotografei este bairro em 13.08.2026, e o nome do negócio com a rua
3. Observação concreta e verificável: quantas fotos o perfil tem hoje
4. Parágrafo fixo e verdadeiro sobre o que a imagem mostra (localização no bairro + entorno)
5. **A imagem é dele, de graça**, e pode ser usada livremente
6. **Warum kostenlos:** a RV está entrando no mercado suíço e quer entender antes de oferecer.
   Nomeado como `Pilotphase` de agosto de 2026, para o grátis colar no piloto e não no serviço
7. O pedido: 4 perguntas curtas, uns dois minutos
8. Link da landing page
9. Fecho + `P.S. Die Aufnahme bekommen Sie in jedem Fall. Die Fragen sind freiwillig.`

**Saíram na revisão de 19.08:** preço, as duas variantes de pagamento, a promessa de publicar no
perfil do Google e o parágrafo condicional do perfil não reivindicado. O script
`emails/gerador-emails.py` tem um guarda-corpo que **falha em voz alta** se qualquer um desses
voltar ao texto alemão.

Cada rascunho tem, **abaixo de uma linha de `=` com o aviso `APAGAR DAQUI PARA BAIXO ANTES DE ENVIAR`**,
um resumo em português do que o email diz, mais os dados do perfil e notas de risco. Felipe lê,
confere e apaga esse bloco antes de enviar.

---

## 9. Fontes de verdade da Real Vision que este projeto usa

| Assunto | Arquivo no vault |
|---|---|
| Identidade visual, paleta, fontes | `contexto/DESIGN.md` |
| Tom de voz | `contexto/VOZ.md` |
| O que a empresa vende | `contexto/EMPRESA.md` |
| Regras gerais e workflows | `AGENTS.md` |
| Regras de copy | `skills/rv-copy/SKILL.md` |
| Nó do projeto no LBOS | `LBOS/02-Projetos/real-vision/PROJETO.md` |
| Tarefa desta campanha no LBOS | `LBOS/02-Projetos/real-vision/TAR-2026-005.md` |
| Decisão original da campanha | `LBOS/08-Decisoes/DEC-2026-002.md` |
| Decisão do modelo comercial anterior (revogado) | `LBOS/08-Decisoes/DEC-2026-003.md` |
| **Decisão do modelo atual — gratuito** | `LBOS/08-Decisoes/DEC-2026-004.md` |
| **Plano frente a frente da reestruturação** | `PLANO-REESTRUTURACAO-2026-08-19.md` (nesta pasta) |
| Impedimento legal que causou a mudança | `operacao/gestao/juridico-fiscal/PESQUISA-PAGAMENTOS-SUICA-2026-08-14.md` |
| Método da landing + lição de copy | `LBOS/05-Conhecimento/landing-de-campanha-com-captura-propria.md` |

Não copiar conteúdo dessas fontes para cá. Referenciar e ler na hora.

---

## 10. Próximos passos, na ordem

1. ~~Felipe grava o tour 360° de Unterentfelden e obtém o link público~~ ✅ feito
2. ~~Construir a landing page no Claude Code conforme `landing/BRIEFING-LANDING.md`~~ ✅ feito,
   no ar em `https://drone-unterentfelden.vercel.app`
3. ~~Ativar o envio do formulário~~ ✅ feito — Edge Function própria (Supabase + Resend), sem Web3Forms
4. ~~Corrigir os "ângulos" por ramo de negócio~~ ✅ feito (seção 6) — parágrafo único no lugar dos 8
5. ~~Email de teste pro Felipe e pra Romana revisarem~~ ✅ enviado e aprovado em 13/08

6. ~~Traduzir a landing para alemão~~ ✅ feito em 19.08 — reescrita direto em alemão, não traduzida
7. ~~Instalar analytics~~ ✅ PostHog cookieless, 5 eventos, testado
8. ~~Atualizar a Edge Function~~ ✅ versão 3, testada ponta a ponta

**A partir daqui é a próxima sessão:**

9. ~~Instalar o Python~~ ✅ feito em 20.08 — Python 3.12.10.
   **Armadilha:** o `python` do PATH ainda é o atalho da Microsoft Store e falha. Chamar pelo
   caminho completo: `%LOCALAPPDATA%\Programs\Python\Python312\python.exe`
10. ~~Rodar o gerador~~ ✅ feito em 20.08 — 24 emails em
    `emails/emails-24-gerados-2026-08-19.json`, guarda-corpo verde nos dois testes
11. Enviar o modelo para o email de teste **`smarthomefg@gmail.com`** (confirmado pelo Felipe em
    19.08, só ele, sem a Romana) e esperar o OK
12. **Deploy da landing:** `npx vercel --prod` de dentro de `landing/site/` — **só depois do OK
    explícito do Felipe.** Hoje o Vercel ainda serve a versão antiga, em português e com preço
13. Repetir o teste do formulário **na URL de produção** (o CORS só libera o domínio real)
14. **Regravar os 24 rascunhos no Gmail** com o texto novo
15. Felipe revisa email por email, apagando o bloco em português de cada um
16. Enviar
17. **Rascunhar a carta ao Amt für Migration** (`arbeitsbewilligungen.mika@ag.ch`, ou
    +41 62 835 18 60). A pergunta agora é fácil: "posso distribuir gratuitamente uma imagem que já
    capturei?"
18. Triar as respostas pela pergunta 3 (`score_remote`) e medir contra o critério de 6/24

**Opcional, não bloqueia nada:** registro DNS na Hostinger para o subdomínio próprio — hPanel →
Domínios → `realvisionmaps.com` → Editor de Zona DNS → registro `A`, nome `unterentfelden`,
valor `76.76.21.21`. **Confirmar o IP no painel do Vercel na hora**, nunca de memória — o Vercel já
mudou o IP recomendado antes. Se entrar, atualizar o CORS da Edge Function e o link dos 24 emails
**no mesmo movimento**, senão o formulário quebra em silêncio.

Manter a instrução do projeto "Projeto 360 Drone Aarau" atualizada conforme isso evoluir —
é uma regra explícita do Felipe.
