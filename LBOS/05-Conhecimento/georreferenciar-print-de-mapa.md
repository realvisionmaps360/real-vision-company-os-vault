---
id: CON-2026-003
tipo: conhecimento
nome: Converter área desenhada à mão num print do Google Maps em polígono geográfico
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-13
atualizado_em: 2026-08-13
proxima_revisao: 2026-11-13
confiabilidade: alta
fonte: Experiência própria — campanha Drone & Digital Unterentfelden, 13/08/2026
pertence_a: ["[[LBOS]]"]
referencia: ["[[prospeccao-google-maps-apify]]"]
tags: [lbos/entidade, lbos/conhecimento]
---

# Converter área desenhada à mão num print do Google Maps em polígono geográfico

## O que é

Técnica para transformar um círculo rabiscado à mão sobre um screenshot do Google Maps em coordenadas reais utilizáveis por ferramenta de scraping, com erro abaixo de 1 metro. Resolve o problema de "eu desenhei a área que quero, agora me dá os negócios dela".

## Contexto

Serve sempre que a área alvo é comunicada como desenho num print, que é a forma natural de uma pessoa apontar um território. Evita a alternativa ruim, que é estimar coordenadas no olho e trabalhar com uma área que não é a pedida.

Não serve se o print não tiver **nenhum ponto de coordenada conhecida** dentro dele. É esse ponto que fecha a conta.

## O procedimento

1. **Detectar o traço** por filtro de cor nos pixels, restrito ao viewport do mapa. Para traço vermelho: `R>150 & G<90 & B<90`. Guardar as coordenadas de pixel.

2. **Conseguir um ponto de âncora geográfico.** Precisa de um lugar dentro do print cuja coordenada real seja conhecida. O jeito prático: pedir o link do Google Maps de um negócio que aparece ali. O link redirecionado carrega a coordenada em `!8m2!3d<lat>!4d<lng>`.

3. **Resolver escala e centro juntos.** A URL do Maps dá o centro geográfico (`@lat,lng,...`), mas o centro em pixels do canvas não é óbvio, porque a barra lateral desloca o mapa. Com o âncora e o centro da URL há duas equações; resolver escala e posição do centro ao mesmo tempo em vez de assumir que o centro é o meio da imagem. **Mercator é isotrópico**, então metros por pixel é igual em x e y na mesma latitude — é isso que fecha o sistema.

4. **Verificar antes de usar.** Reprojetar o âncora com os parâmetros achados e comparar com a coordenada verdadeira. Se o erro passar de poucos metros, os parâmetros estão errados e não vale seguir.

5. **Contorno radial** em N ângulos a partir do centroide dos pixels do traço, pegando o pixel mais distante em cada fatia.

6. **Buffer para fora**, uns 25 m, para não cortar negócio de borda. Errar por generosidade é melhor que perder um endereço.

## Números do caso real

Print de 1366×768 do Google Maps em modo satélite. Âncora: um negócio conhecido dentro da área. Resultado: escala **1,70 m/px**, centro do canvas no pixel **(688, 413.5)**, erro de reprojeção do âncora **abaixo de 1 m**. Área final: 942 m × 631 m, polígono de 29 vértices.

## Armadilha que quase passou

Assumir que o centro do canvas é o centro da imagem dá escalas diferentes em x e y — e escala diferente nos dois eixos é o sinal de que a conta está errada, não de que o mapa é anisotrópico. Quando isso aparecer, o erro está na posição do centro, não na escala.

## Onde a implementação mora

Company OS: `operacao/prospeccao/campanhas/drone-digital-unterentfelden/dados/area-COMO-FOI-MEDIDA.md`, com o polígono em `area-poligono.geojson`. Ordem das coordenadas no GeoJSON do Apify é `[lng, lat]`, não o contrário.

## Fontes

Experiência própria, 13/08/2026. Confiabilidade alta porque tem verificação numérica embutida no passo 4.

## Relacionados

- Pertence a: [[LBOS]]
- Referencia: [[prospeccao-google-maps-apify]]
- Aplicado em: [[TAR-2026-005]]

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-13 | Nó criado | Técnica desenvolvida para delimitar a área da campanha na Suíça | Área desenhada à mão passa a virar dado utilizável, sem estimativa no olho | Sempre verificar reprojetando o âncora antes de usar o polígono |
