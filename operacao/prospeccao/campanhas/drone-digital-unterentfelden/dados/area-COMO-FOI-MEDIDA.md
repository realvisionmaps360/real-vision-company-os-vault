# Como a área alvo foi medida

Felipe desenhou um círculo à mão num print do Google Maps (`area alvo.png`, raiz do vault).
A geometria foi extraída do próprio print, não estimada no olho.

## Método

1. Detecção dos pixels do traço vermelho por filtro de cor (R>150, G<90, B<90) restrito ao viewport do mapa.
2. Ancoragem geográfica pelo pin do **GOMO GmbH** (`47.3715454, 8.0418501`), cliente existente do Felipe
   dentro da área, cuja coordenada real veio do link do perfil que ele mandou.
3. Resolução da escala e do centro do canvas resolvendo o sistema com esse âncora:
   - escala **1,70 m/px**
   - centro do canvas do mapa no pixel **(688, 413.5)** = `47.3727564, 8.0431625` (centro da URL)
4. Verificação: reprojetar o pin do GOMO deu `47.3715423, 8.0418546`. Erro < 1 m.
5. Contorno radial em 28 ângulos a partir do centroide dos pixels vermelhos, mais **buffer de 25 m para fora**
   para não cortar negócio de borda.

## Resultado

| | |
|---|---|
| Centro | `47.372320, 8.044592` |
| Extensão | 942 m leste-oeste × 631 m norte-sul |
| Raio máximo do centroide | 514 m |
| Vértices do polígono | 29 (fechado) |
| Município | **5035 Unterentfelden** (não Aarau) |

Ruas dentro da área: Höhenweg, Obere Sonnhalde, Panoramaweg, Alpenweg, Bergweg, Sämisweidstrasse,
Erlifeldstrasse, Birkenweg, Flurweg, Quellmattstrasse, Alte Distelbergstrasse, Kirchweg, Bollweg,
Leubachweg, Bucheggweg, Sonnhaldenweg, Mattenweg, Titlisstrasse, Eigerweg, Nordweg, Burgermattweg,
Erlimattstrasse, Schützenmattstrasse, e trechos de Hauptstrasse e Neufeldstrasse.

O ponto onde o Felipe estava no momento do print: `47.37263957, 8.04737552`.

## Arquivos

- `area-poligono.geojson` — o polígono usado no Apify (ordem `[lng, lat]`, que é o que o actor exige)
- `area-medicao-bruta.json` — mesmo polígono em 96 vértices, mais centro e raio
