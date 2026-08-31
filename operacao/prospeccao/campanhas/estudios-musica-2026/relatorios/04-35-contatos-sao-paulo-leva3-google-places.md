# Estúdios de música em São Paulo — leva 3 (sem site, celular, ativos)

> Terceira leva da campanha [[HANDOFF]] Estúdios de Música 2026. Coletado em **27/08/2026**, via **Google Places API (MCP google-maps)** — não via Apify.
> Deduplicado contra as levas 1 (Florianópolis) e 2 (São Paulo) por telefone e por nome.

## Por que não foi Apify desta vez

**FATO:** a primeira tentativa de rodar o `compass/crawler-google-places` retornou:

```
Monthly usage hard limit exceeded
```

O crédito mensal do tier FREE (US$ 5/mês) acabou. As duas levas anteriores consumiram
792 lugares raspados (287 em Floripa + 505 em SP), a US$ 0,004/lugar no tier FREE — cerca
de US$ 3,20 — mais Actor Start e storage. O saldo exato só no painel (`console.apify.com` → Billing);
o MCP da Apify não expõe billing.

**Alternativa usada:** MCP `google-maps` (Places API), já conectado nesta máquina. Custo zero
de crédito Apify. Devolve nome, telefone, site, nota e nº de avaliações em uma chamada.

## Metodologia

1. ~34 buscas em `maps_compare_places`, cruzando 12 termos (estúdio de ensaio, estúdio de gravação,
   escola de música, produtor musical, mixagem e masterização, aula de canto/bateria/violão, estúdio
   gospel, rap/trap) com ~30 bairros de São Paulo, priorizando periferia (onde a densidade de
   negócio sem site é maior que nos bairros centrais).
2. Filtro **sem site**: campo `website` vazio no perfil do Google. Perfis cujo "site" é
   Instagram, Facebook, Linktree, `sites.google.com` ou `negocio.site` **não** entraram nesta
   lista — são candidatos de uma leva futura (ver plano).
3. Filtro **celular**: só números de 9 dígitos começando com 9. Telefone fixo foi descartado
   inteiro — é a maior causa de "não tem WhatsApp" relatada por Felipe na leva 1.
4. Filtro **relevância**: só negócio de música. Estúdio fotográfico, audiovisual, pub e
   equipamento público (CEU, Guri) foram excluídos manualmente.
5. Filtro **cidade**: só São Paulo capital. Campo Limpo Paulista, Tremembé-SP (interior),
   Penha-SC e Rio de Janeiro apareceram na busca e foram cortados.
6. **Dedup**: cruzado com os 100 contatos das levas 1 e 2. `Estúdio BG Produções` reapareceu
   e foi removido — já está na leva 2.

## O que mudou em relação à leva 2

| Critério | Leva 2 (SP) | Leva 3 (esta) |
|---|---|---|
| Fonte | Apify (`compass/crawler-google-places`) | Google Places API via MCP |
| Perfil reivindicado | exigido (`claimThisBusiness`) | **não disponível** na Places API |
| Fotos no perfil | exigido (≥1) | **não disponível** neste endpoint |
| Avaliações | ≥3 | ≥1, com o nº declarado em cada linha |
| Telefone | só celular | só celular (mantido) |

**Limitação honesta:** a Places API não expõe `claimThisBusiness` nem `imagesCount`. O proxy de
"perfil vivo" aqui é o **número de avaliações**. Por isso a lista está **ordenada por avaliações,
da maior para a menor** — comece a abordagem de cima. Os 5 últimos (1 a 3 avaliações) são os mais
arriscados; se quiser manter o padrão da leva 2, corte tudo abaixo de 3 avaliações e a lista fica
com 30 contatos.

## Resumo

- **Total:** 35 contatos, todos sem site cadastrado, todos com celular, todos em São Paulo capital
- **30** têm 3 ou mais avaliações (o critério da leva 2)
- **Top 10** vão de 50 a 874 avaliações — negócio comprovadamente ativo
- Zero sobreposição com as levas 1 e 2

## Lista

Arquivo pronto para importar: [`35-contatos-estudios-musica-sao-paulo-leva3.csv`](35-contatos-estudios-musica-sao-paulo-leva3.csv)

| # | Nome | WhatsApp | Bairro | Categoria | Nota (avaliações) |
|---|---|---|---|---|---|
| 1 | Studio Rock Together | [+55 11 98145-6315](https://wa.me/5511981456315) | Santana | Ensaio | 4,6 (874) |
| 2 | Estúdio Sonido - Ensaios | [+55 11 91903-5136](https://wa.me/5511919035136) | Sumarezinho | Ensaio | 4,7 (353) |
| 3 | Búfalo Estúdio | [+55 11 99916-1755](https://wa.me/5511999161755) | Santana | Ensaio | 4,8 (178) |
| 4 | Studio Black Box | [+55 11 94911-5668](https://wa.me/5511949115668) | Vila Mascote | Ensaio | 4,8 (157) |
| 5 | Estúdio Lanners | [+55 11 98311-8748](https://wa.me/5511983118748) | Vila Industrial | Ensaio | 4,8 (126) |
| 6 | Ronaldo Cotta Estúdios | [+55 11 98604-4833](https://wa.me/5511986044833) | Vila Carrão | Gravação | 4,9 (113) |
| 7 | A Clave Escola de Artes Cristã | [+55 11 92165-4107](https://wa.me/5511921654107) | Vila Gea | Escola | 5,0 (97) |
| 8 | Escola de Música Compasso Musical | [+55 11 95684-5385](https://wa.me/5511956845385) | Itaquera | Escola | 5,0 (86) |
| 9 | Estúdio Cardeal - Lacerda Franco | [+55 11 95284-2031](https://wa.me/5511952842031) | Pinheiros | Ensaio | 4,8 (59) |
| 10 | Estúdio do Batata | [+55 11 99242-3294](https://wa.me/5511992423294) | Vila Clementino | Ensaio | 4,9 (55) |
| 11 | Estúdio SP Áudio | [+55 11 95313-4851](https://wa.me/5511953134851) | Parque Guarani | Gravação | 4,7 (50) |
| 12 | Academia Musical - Do Quarto aos Palcos | [+55 11 99829-7681](https://wa.me/5511998297681) | Vila Ré | Escola | 5,0 (39) |
| 13 | Lumen Studios - Ensaios | [+55 11 99385-9590](https://wa.me/5511993859590) | Vila Mariana | Ensaio | 4,3 (34) |
| 14 | Estúdio Ensaio Vintage | [+55 11 99533-5533](https://wa.me/5511995335533) | Mooca | Ensaio | 4,9 (32) |
| 15 | Sound Black | [+55 11 97952-5084](https://wa.me/5511979525084) | Jardim Avenida | Gravação | 4,9 (32) |
| 16 | Live Hit Produções | [+55 11 97971-2120](https://wa.me/5511979712120) | Mooca | Produção | 5,0 (31) |
| 17 | Atmosphera Studio | [+55 11 99614-2916](https://wa.me/5511996142916) | Vila Carrão | Gravação | 4,9 (27) |
| 18 | Estúdio LP Áudio | [+55 11 99624-6671](https://wa.me/5511996246671) | Vila Jaraguá | Ensaio/Gravação | 5,0 (26) |
| 19 | Gravasampa | [+55 11 94004-4298](https://wa.me/5511940044298) | Casa Verde | Gravação | 4,9 (15) |
| 20 | Z7BusicProd | [+55 11 98473-9113](https://wa.me/5511984739113) | Vila Madalena | Produção | 4,7 (13) |
| 21 | Nebulosa Selo | [+55 11 93431-1713](https://wa.me/5511934311713) | Capão Redondo | Selo/estúdio | 5,0 (11) |
| 22 | Prof Emerson de Paula | [+55 11 94708-4618](https://wa.me/5511947084618) | Vila Brasilândia | Aulas | 5,0 (10) |
| 23 | Conservatório Musical Franz Liszt | [+55 11 94884-3836](https://wa.me/5511948843836) | Casa Verde | Escola | 4,3 (7) |
| 24 | Estúdio SP Produções | [+55 11 95941-7031](https://wa.me/5511959417031) | Jardim Guarujá | Gravação | 5,0 (7) |
| 25 | Relow Studio | [+55 11 98478-9113](https://wa.me/5511984789113) | Jd. Capão Redondo | Gravação | 5,0 (7) |
| 26 | ZOG Studio de Ensaio e Gravação | [+55 11 97561-5553](https://wa.me/5511975615553) | Vila Madalena | Ensaio/Gravação | 4,8 (6) |
| 27 | Studio Quina's Produções | [+55 11 94896-2829](https://wa.me/5511948962829) | Vila Perus | Produção | 4,5 (6) |
| 28 | JF Studio Musical | [+55 11 94703-2166](https://wa.me/5511947032166) | Jabaquara | Estúdio musical | 4,6 (5) |
| 29 | Studio Gospel Solução Music | [+55 11 91476-6186](https://wa.me/5511914766186) | Vila Rosária | Gravação | 5,0 (5) |
| 30 | BlackCubes Studios | [+55 11 99589-6677](https://wa.me/5511995896677) | Vila Moinho Velho | Gravação | 3,8 (5) |
| 31 | Aruanda Studios | [+55 11 99442-3662](https://wa.me/5511994423662) | Ipiranga | Gravação | 5,0 (4) |
| 32 | Estúdio Viela 7 | [+55 11 99463-9221](https://wa.me/5511994639221) | Heliópolis | Gravação | 5,0 (3) |
| 33 | Ágape Music | [+55 11 98573-8317](https://wa.me/5511985738317) | Santana | Estúdio de música | 5,0 (2) |
| 34 | Escola de Música Som de Cristal | [+55 11 98010-2082](https://wa.me/5511980102082) | Jd. Artur Alvim | Escola | 4,5 (2) |
| 35 | MM Studio | [+55 11 98697-6064](https://wa.me/5511986976064) | Jd. Campo Limpo | Gravação | 5,0 (1) |

## Descartados (e por quê) — para não repetir o trabalho

- **Telefone fixo, sem site:** Ziriga Music Center, Estúdios Guidon, EMBS Bom Sucesso, Trama Nacena,
  Conservatório Musical de Tucuruvi, Estúdio Casa Azul, Veredas Estúdio, Paraíso da Música, Sol Escola
  de Música, Clave de Lua, KW Centro Artístico. **São leads válidos para e-mail**, não para WhatsApp.
- **Sem site mas fora do escopo:** estúdios fotográficos e audiovisuais (Estúdio Fotográfico Vila
  Mariana, Jess Fotografia, Gabriela Albuquerque, Studio Kaf), NVS StudioPub, CEU Tremembé.
- **Fora de São Paulo capital:** Windi Studio e Toca do Groove (Campo Limpo Paulista), Escola Almeida
  Music (Tremembé-SP), Mangorra (Penha-SC), Estúdio Frenchs e Vernin (RJ), Ver-o-Som (PA).
- **Perfil sem nenhuma avaliação:** XAB Rec Studio, Gravadora Fênix Music, Quintal das Artes.
- **Telefone suspeito:** "Studio 1" (Sacomã) com número 99999-9052.

---

**Ver também:** [[HANDOFF]] · [[03-50-contatos-sao-paulo-refinado]] · [[02-50-contatos-floripa-sem-site]]
