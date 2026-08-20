---
id: BRIEFING-capa-curso-profissional-360
title: Briefing de arte — capa do curso "Profissional 360"
type: briefing
project: real-vision-academy
created: 2026-08-12
status: aguardando geração pelo Felipe (ChatGPT Plus)
---

# Briefing — capa do curso "Profissional 360"

## Por que só uma imagem resolve os dois lugares

O banco tem **um único campo** (`cover_url`) pro curso. Essa mesma imagem aparece em dois lugares:

1. **Card do curso** na Academy — proporção 16:9, é o que o aluno vê na lista de "meus cursos".
2. **Artwork do controle do sistema** (Media Session) — a foto grande atrás do player quando você
   trava o celular ou puxa a notificação. O Android recorta o centro da imagem quando ela não é
   quadrada, então uma composição **centrada**, sem elementos importantes nas bordas, funciona nos
   dois lugares sem precisar de um segundo arquivo.

**Se quiser capricho, um segundo formato ajuda** (ver opção B abaixo) — mas não é obrigatório pra
resolver o problema de hoje.

## Opção A — um arquivo só (recomendado, mais rápido)

**Proporção:** 16:9 (ex: 1600×900px)
**Regra de composição:** o elemento principal (o símbolo/pessoa/cena) centralizado num raio que caiba
num quadrado — pense "o que sobra se cortarem as bordas esquerda e direita até virar quadrado" e garanta
que a composição ainda funciona assim.

## Opção B — dois arquivos (se quiser o acabamento redondo)

- **Capa do card:** 1600×900 (16:9), como a A.
- **Artwork do player:** 1024×1024 (quadrado), composição pensada pra tela cheia quadrada.

Se for pela B, me avisa qual das duas você quer usar no campo `cover_url` — a 16:9 é a que aparece mais
(todo curso, toda vez que a lista carrega), então ela deveria ser a "oficial" e a quadrada fica reservada
só pro artwork, exigindo eu mudar o código pra usar dois campos. **Recomendo ficar só na Opção A** a
menos que você realmente queira o acabamento fino.

---

## O prompt (cole direto no ChatGPT Plus)

```
Crie uma imagem de capa para um curso online chamado "Profissional 360°" — formação de fotógrafos e
criadores de conteúdo especializados em captação com câmera 360°, drone e presença digital para
negócios locais.

Estilo: fotografia editorial de alta produção, cinematográfica, com grain sutil — não é ilustração,
não é 3D render, não é flat design. Pense em capa de curso premium tipo MasterClass, mas com
identidade própria.

Composição: uma pessoa (fotógrafo/criador de conteúdo, pode ser homem ou mulher, 25-40 anos,
expressão confiante e focada) segurando ou operando um equipamento de captação 360° (câmera 360°
tipo Insta360 X5, no formato de bastão/gimbal) ou um drone compacto, em ambiente externo — praia
tropical ao entardecer, ou terraço com vista para paisagem litorânea. Enquadramento centrado: o
assunto principal precisa estar dentro de uma área quadrada central, porque a imagem será cortada
tanto em 16:9 quanto em quadrado — nada de elemento importante nas bordas esquerda/direita.

Paleta de cor obrigatória: fundo escurecido tendendo a #0a0d14 (quase preto azulado) nas sombras e
áreas negativas, com luz quente âmbar/dourada (#F5A623) vindo de um lado — luz de golden hour ou
fonte artificial dourada — criando contraste dramático entre o escuro profundo e o brilho dourado.
Sem outras cores de destaque (nada de azul, verde ou vermelho saturado na composição).

Iluminação: dramática, contraluz ou luz lateral dourada, sombras profundas, sensação de "só o
essencial iluminado" — não é imagem clara e uniforme.

Textura: leve grain de filme, para não ficar com cara de imagem gerada por IA genérica.

Proporção: 16:9, horizontal.

Não incluir: texto, logotipo, letras, números, marca d'água, pessoas de rosto borrado ou distorcido,
mãos deformadas, elementos genéricos de "estoque de IA" (halos, partículas brilhantes flutuando,
excesso de lens flare).
```

### Se for gerar também a versão quadrada (Opção B)

Mesmo prompt acima, trocando só a linha de proporção:

```
Proporção: 1:1, quadrada.
```

---

## O que fazer com a imagem depois de gerada

1. Baixe o PNG/JPG gerado.
2. Me manda o arquivo aqui no chat (ou me diz onde salvou).
3. Eu subo pro bucket do Supabase e atualizo o `cover_url` do curso — **isso mexe em dado real do
   banco, então só faço com seu OK explícito na hora**, como sempre.

## Nota técnica — por que a imagem atual ficou "zoada"

O `mark.png` (o símbolo isolado da marca, só a lua/círculo dourado) foi usado como placeholder
temporário quando implementei o Media Session — ele nunca foi pensado pra aparecer grande, sozinho,
esticado numa tela cheia. Assim que o `cover_url` do curso for preenchido com a arte de verdade, ele
some de tudo — card do curso e artwork do player passam a usar a mesma imagem nova.
