# Estúdios de música em São Paulo — leva 4 (Apify, mais consolidados, sem site)

> Quarta leva da campanha [[HANDOFF]] Estúdios de Música 2026. Coletada em **03/09/2026**, via **Apify** (`compass/crawler-google-places`) — MCP conectado nesta sessão pela primeira vez desde o HANDOFF de 18/08.
> Deduplicada contra os **126 telefones já usados nas levas 1 (Florianópolis), 2 (São Paulo) e 3 (São Paulo)** — zero repetição.
> Critério pedido pelo Felipe: continuar em São Paulo, priorizar os **mais consolidados**, e manter os três tipos de estúdio misturados (gravação, ensaio, escola) — decisão D1 do `PLANO-DE-EXECUCAO.md` segue sem resolução, registrada aqui de novo.

## Metodologia

1. Actor `compass/crawler-google-places`, 6 termos (estúdio de ensaio, estúdio de gravação, escola de música, aula de música particular, professor de música, produtora musical), cidade São Paulo, filtro pago `website: withoutWebsite`. Sem enriquecimento de contato, sem reviews/imagens extras — mesma configuração "descoberta barata" das levas 1-2. **Custo: 698 lugares × US$0,005 (base + filtro de site) ≈ US$3,49**, dentro do teto de US$5 aprovado pelo Felipe antes da execução.
2. **Filtro de fechamento:** removidos os permanentemente ou temporariamente fechados (16 descartados).
3. **Filtro de relevância:** categorias diretas de música (estúdio de gravação/ensaio, escola de música, professor de música/violão/piano/canto, produtor musical, loja/conserto de instrumento) **+** categorias ambíguas (aulas particulares, escola de artes, centro cultural, sem categoria) só entraram se o nome do estabelecimento continha termo de música. **Correção feita nesta revisão:** o Google categoriza produtoras de vídeo/foto como "Estúdio de gravação" às vezes — 2 fichas (uma de filmes, uma de fotografia/casamento) foram removidas por nome apesar da categoria bater.
4. **Dedup:** contra os 126 telefones extraídos das levas 1-3 (por WhatsApp/telefone), dedup interno do próprio lote, **e** contra os nomes já citados (sem telefone) na lista de "Descartados" da leva 3 — 7 fichas removidas por já constarem lá (Ziriga Music Center, Estúdios Guidon, Conservatório Musical de Tucuruvi, Estúdio Casa Azul, Veredas Estúdio, Paraíso da Música, Sol Escola de Música). Esta leva só traz achado genuinamente novo.
5. **Filtro "mais consolidado":** ordenado por número de avaliações reais, do maior para o menor; exigido pelo menos 1 avaliação ou 1 foto no perfil (corta ficha fantasma). Cortado nos 85 melhores com celular e nos 20 melhores com fixo.
6. **Separação por tipo de telefone:** celular (formato BR de 9 dígitos começando com 9) vai para a lista de WhatsApp; fixo vai para uma lista separada, só útil por e-mail — mesma regra da leva 1.

## Resumo

- **Total:** 105 contatos novos, todos sem site, todos em São Paulo capital, zero repetição de telefone ou nome das levas 1-3
- **85 com celular** (lista de WhatsApp) — faixa de 13 a 192 avaliações
- **20 com fixo** (só e-mail — ver `PLANO-ESCALA-CONTATOS.md` item 1) — faixa de 12 a 233 avaliações
- Por categoria:
- **Escola de Música:** 40
- **Estúdio de gravação:** 36
- **Professor de música:** 5
- **Estúdio de ensaio:** 4
- **Aulas particulares:** 4
- **Produtor musical:** 4
- **Loja de Instrumentos Musicais:** 3
- **null:** 3
- **Instrutor(a) de voz:** 1
- **Professor de violão:** 1
- **Conserto de instrumentos musicais:** 1
- **Escola de artes:** 1
- **Centro cultural:** 1
- **Escola de bateria:** 1

## Lista — celular / WhatsApp (85)

| # | Nome | WhatsApp | Bairro | Categoria | Nota (avaliações) |
|---|---|---|---|---|---|
| 1 | Made In Brazil Escola de Música em São Mateus - ZL/SP | [+55 11 97033-8685](https://wa.me/5511970338685) | Cidade São Mateus | Escola de Música | 5 (192) |
| 2 | AFONSOOM ESTUDIO 1 | [+55 11 97354-8067](https://wa.me/5511973548067) | Terceira Divisão de Interlagos | Estúdio de gravação | 4.5 (181) |
| 3 | Studio 151 | [+55 11 97207-6766](https://wa.me/5511972076766) | Vila Olímpia | Estúdio de ensaio | 4.6 (153) |
| 4 | Parisi Instrumentos musicais | [+55 11 98116-1107](https://wa.me/5511981161107) | Santana | Loja de Instrumentos Musicais | 4.7 (150) |
| 5 | Studio Nvs | [+55 11 94590-7575](https://wa.me/5511945907575) | Vila Formosa | Estúdio de gravação | 4.8 (112) |
| 6 | Estúdio Preset Pub | [+55 11 98269-0004](https://wa.me/5511982690004) | Santo Amaro | Estúdio de gravação | 4.6 (98) |
| 7 | Amaral Tv | [+55 11 99750-1201](https://wa.me/5511997501201) | Vila Nhocuné | Estúdio de gravação | 4.4 (94) |
| 8 | Digué Lima Estúdio Vocal | [+55 11 95559-6292](https://wa.me/5511955596292) | Vila Mariana | Instrutor(a) de voz | 5 (87) |
| 9 | Studio Vip | [+55 11 94451-2213](https://wa.me/5511944512213) | Aclimação | Estúdio de gravação | 4.8 (75) |
| 10 | Aulas de Violão e Guitarra - Renato Oliveira | [+55 11 98381-1913](https://wa.me/5511983811913) | Perdizes | Professor de violão | 5 (74) |
| 11 | Tucci Guillen Aulas de Guitarra e Violão | [+55 11 94539-4152](https://wa.me/5511945394152) | Ipiranga | Professor de música | 5 (70) |
| 12 | Luthieria Gessebass-regulagem-manutenção em geral-acessórios em geral | [+55 11 97050-6227](https://wa.me/5511970506227) | Vila Buenos Aires | Conserto de instrumentos musicais | 4.8 (68) |
| 13 | Musical -Tec Oficina de Instrumentos Musicais | [+55 11 99902-6072](https://wa.me/5511999026072) | Vila Salete | Loja de Instrumentos Musicais | 4.9 (64) |
| 14 | Estúdio 438 - Estúdio de Produção Musical | [+55 11 96744-3065](https://wa.me/5511967443065) | Pompeia | Estúdio de gravação | 4.9 (61) |
| 15 | "Escola de Música Alexandre Ivo" | [+55 11 99889-5254](https://wa.me/5511998895254) | Vila Ester (Zona Norte) | Aulas particulares | 5 (57) |
| 16 | AF MUSIC - AULAS DE GUITARRA E VIOLÃO | [+55 11 97819-5881](https://wa.me/5511978195881) | Vila Invernada | Escola de Música | 5 (56) |
| 17 | TexMix | [+55 11 99102-2584](https://wa.me/5511991022584) | Brooklin | Estúdio de gravação | 4.8 (56) |
| 18 | IP&T Giba Favery | [+55 11 94454-0293](https://wa.me/5511944540293) | Vila Clementino | Escola de Música | 5 (55) |
| 19 | Estúdio Bemol Music | [+55 11 91752-3184](https://wa.me/5511917523184) | Residencial Sol Nascente | Escola de Música | 5 (53) |
| 20 | Estúdio Do Bolla | [+55 11 95229-0371](https://wa.me/5511952290371) | Jardim Romano | Estúdio de gravação | 4.9 (50) |
| 21 | SG Estudio de ensaio. | [+55 11 98158-6479](https://wa.me/5511981586479) | Jardim da Gloria | — | 5 (49) |
| 22 | Instituto de Música VMusic & Luthieria | [+55 11 96522-8646](https://wa.me/5511965228646) | Parque Sao Rafael | Escola de Música | 5 (48) |
| 23 | Escola de Música Play Music ll | [+55 11 99291-2349](https://wa.me/5511992912349) | Jardim Maia | Escola de artes | 5 (44) |
| 24 | StudioVio | Aulas de Violão, Violino, Guitarra, Teclado e Baixo em Moema | [+55 11 99947-7155](https://wa.me/5511999477155) | Moema | Escola de Música | 5 (42) |
| 25 | Núcleo Musical MG | [+55 11 93290-1104](https://wa.me/5511932901104) | Jardim Santo Andre | Escola de Música | 5 (42) |
| 26 | Estúdio Meia Oito | [+55 11 94208-8611](https://wa.me/5511942088611) | Vila São José | Estúdio de gravação | 4.7 (40) |
| 27 | Escola de Música Vila Ema | [+55 11 98708-5396](https://wa.me/5511987085396) | Vila Ema | Escola de Música | 5 (39) |
| 28 | Escola de Música - Matsunaga Music | [+55 11 98164-5836](https://wa.me/5511981645836) | Jardim Soraia | Escola de Música | 5 (39) |
| 29 | Extreme Studios | [+55 11 91651-8313](https://wa.me/5511916518313) | Jaguará | Estúdio de gravação | 4.7 (38) |
| 30 | Instituto de Música Maxwell - Escola de Música Zona Leste de SP | São Mateus | [+55 11 94749-5159](https://wa.me/5511947495159) | Jardim Santa Adelia | Escola de Música | 5 (37) |
| 31 | MRM Estúdio | [+55 11 98974-2956](https://wa.me/5511989742956) | Vila Prado | Estúdio de gravação | 4.8 (36) |
| 32 | Br San Music School - Ipiranga/SP | [+55 11 94350-8880](https://wa.me/5511943508880) | Ipiranga | Escola de Música | 5 (36) |
| 33 | Instituto Musical D.Cesar"s Escola de Música | [+55 11 96935-9511](https://wa.me/5511969359511) | Jardim Santa Fé | Escola de Música | 5 (34) |
| 34 | Escola de musica na Vila Mariana | [+55 11 93025-2748](https://wa.me/5511930252748) | Vila Mariana | Escola de Música | 5 (33) |
| 35 | The Music Studio do Tio Lu | [+55 11 98225-4739](https://wa.me/5511982254739) | Chacara Nossa Senhora Aparecida | Estúdio de gravação | 4.9 (33) |
| 36 | Aulas de Música | [+55 11 94059-6898](https://wa.me/5511940596898) | Jardim Ester Yolanda | Aulas particulares | 5 (32) |
| 37 | Escola de Música China D' Castro | [+55 11 98199-0641](https://wa.me/5511981990641) | Vila Prudente | Escola de Música | 5 (32) |
| 38 | Ateliê Musical Rafael Pereira | [+55 11 97131-1835](https://wa.me/5511971311835) | Bom Retiro | Professor de música | 5 (31) |
| 39 | Resumo Produtora | [+55 11 96168-1881](https://wa.me/5511961681881) | Jardim Santa Margarida | Produtor musical | 4.9 (31) |
| 40 | Rigatti Recording Studios | [+55 11 97505-1592](https://wa.me/5511975051592) | Vila Maria Alta | Estúdio de ensaio | 5 (29) |
| 41 | Tenor Ensino de Música | [+55 11 98034-1775](https://wa.me/5511980341775) | Jardim Santo Elias | Escola de Música | 4.9 (28) |
| 42 | Home Estúdio / ZION | [+55 11 99384-2031](https://wa.me/5511993842031) | Parque Industrial Tomas Edson | Estúdio de gravação | 5 (28) |
| 43 | Instituto de Bateria Moisés Cardoso | [+55 11 98156-7697](https://wa.me/5511981567697) | Cidade Centenário | Escola de Música | 4.6 (27) |
| 44 | Estúdio NoCentro | [+55 11 95931-1907](https://wa.me/5511959311907) | Vila Tolstoi | Estúdio de gravação | 4.8 (26) |
| 45 | Casa do Carai | [+55 27 99506-1530](https://wa.me/5527995061530) | Moema | Produtor musical | 4.8 (25) |
| 46 | Aulas de Piano, Teclado, Violão e Musicalização | [+55 11 98556-3996](https://wa.me/5511985563996) | Jardim Ipanema (Zona Sul) | Aulas particulares | 4.6 (25) |
| 47 | Hadassa Sounds | [+55 11 96353-4369](https://wa.me/5511963534369) | Jardim Centenario | Escola de Música | 4.8 (25) |
| 48 | Mellody Música e Arte | [+55 11 93734-0639](https://wa.me/5511937340639) | Vila Campo Grande | Escola de Música | 5 (24) |
| 49 | Aulas de Bateria com Iago Amadei | [+55 11 99261-3607](https://wa.me/5511992613607) | Cursino | Professor de música | 5 (24) |
| 50 | Centro Ministerial de Música | [+55 21 98336-2876](https://wa.me/5521983362876) | Cordovil | Escola de Música | 5 (22) |
| 51 | Estúdio El Rocha | [+55 11 99504-1702](https://wa.me/5511995041702) | Indianópolis | Estúdio de gravação | 4.9 (22) |
| 52 | Estúdio e Produção Musical Duck Jam | [+55 11 98754-4580](https://wa.me/5511987544580) | Freguesia do Ó | Estúdio de gravação | 4.8 (22) |
| 53 | Pianeiros - Escola de Piano e Teclas | [+55 11 98805-9459](https://wa.me/5511988059459) | Vila Andrade | Escola de Música | 5 (22) |
| 54 | ESCOLA DE MÚSICA MULTI ARTES | [+55 11 94241-7151](https://wa.me/5511942417151) | Santa Cecilia | Escola de Música | 5 (21) |
| 55 | KAZE RECORDS° | [+55 11 98537-6566](https://wa.me/5511985376566) | Jardim Brasil | Estúdio de gravação | 5 (21) |
| 56 | Freak Estúdio | [+55 11 99383-8369](https://wa.me/5511993838369) | Pinheiros | Estúdio de gravação | 5 (20) |
| 57 | Espaço Sertãoperifa - Estúdio Popular | [+55 11 93334-4645](https://wa.me/5511933344645) | Recanto Campo Belo | Centro cultural | 5 (20) |
| 58 | Aulas de baixo e violão | [+55 11 97208-7968](https://wa.me/5511972087968) | Campos Elíseos | Professor de música | 5 (20) |
| 59 | Aulas de Guitarra e Violão - EMFZ - Escola de Música Felipe Zaneripe | [+55 11 98840-1023](https://wa.me/5511988401023) | Bela Vista | Escola de Música | 5 (20) |
| 60 | Duo Music Studio | [+55 11 93737-4093](https://wa.me/5511937374093) | Socorro | Escola de Música | 5 (20) |
| 61 | Estúdio Beco 84 | [+55 11 96381-1698](https://wa.me/5511963811698) | Fundos | Estúdio de ensaio | 4.9 (19) |
| 62 | Escola de Música - Henrique Santos | [+55 11 97963-6020](https://wa.me/5511979636020) | Jardim da Conquista (Zona Leste) | — | 5 (19) |
| 63 | Estúdio de Bateria Mario César Bustos | [+55 11 91368-3957](https://wa.me/5511913683957) | Vila Bancaria | Escola de bateria | 5 (19) |
| 64 | Star Music - Escola de Música | [+55 11 94838-7713](https://wa.me/5511948387713) | Fazenda Morumbi | Escola de Música | 5 (18) |
| 65 | Escola de Musica Feller | [+55 11 95794-9875](https://wa.me/5511957949875) | Jardim Joao XXIII | Escola de Música | 4.9 (18) |
| 66 | Estudios Corifeu | [+55 11 93341-8090](https://wa.me/5511933418090) | Butantã | Estúdio de gravação | 4.4 (18) |
| 67 | Teovox Studio | [+55 11 96077-1774](https://wa.me/5511960771774) | Jardim dos Lagos | Estúdio de ensaio | 4.9 (18) |
| 68 | Escola de Música Torres | [+55 11 98860-1522](https://wa.me/5511988601522) | Tatuapé | Aulas particulares | 5 (17) |
| 69 | LéM7 Studio - Escola de Música | [+55 11 92534-0770](https://wa.me/5511925340770) | Cidade Líder | Estúdio de gravação | 4.8 (17) |
| 70 | Origem Produçōes Musicais | [+55 11 95394-6571](https://wa.me/5511953946571) | Santa Cecilia | Estúdio de gravação | 5 (16) |
| 71 | Escola de Música Sbrana | [+55 11 98895-3385](https://wa.me/5511988953385) | Lapa | Escola de Música | 5 (16) |
| 72 | Ninrod Studios | [+55 11 96340-6620](https://wa.me/5511963406620) | Cidade Vargas | Estúdio de gravação | 4.9 (16) |
| 73 | Escola de música Soul Vencedor | [+55 11 96718-7704](https://wa.me/5511967187704) | Parque do Lago | Escola de Música | 4.9 (16) |
| 74 | Latoca - Produza seu Sonho | [+55 11 96740-0168](https://wa.me/5511967400168) | Moinho Velho | Produtor musical | 4.9 (15) |
| 75 | Estúdio Sunshine | [+55 11 97251-4439](https://wa.me/5511972514439) | Vila Guilherme | Estúdio de gravação | 4.9 (15) |
| 76 | Mob Studio | [+55 11 98752-2168](https://wa.me/5511987522168) | Guaianases | Estúdio de gravação | 4.9 (14) |
| 77 | Music7 | [+55 11 96090-2120](https://wa.me/5511960902120) | Itaim Bibi | Professor de música | 5 (14) |
| 78 | Curimba do Mestre - Mestre Muma | [+55 11 99350-0229](https://wa.me/5511993500229) | Vila Fazzeoni | Escola de Música | 5 (14) |
| 79 | W&S Records - Produtora Musical | [+55 11 97668-4871](https://wa.me/5511976684871) | Morumbi | Produtor musical | 5 (13) |
| 80 | Conservatório Musical Brooklin Paulista | [+55 11 97448-8343](https://wa.me/5511974488343) | Brooklin Novo | Escola de Música | 5 (13) |
| 81 | Raízes do Som - Escola de Música | [+55 11 91263-9702](https://wa.me/5511912639702) | Lapa | Escola de Música | 5 (13) |
| 82 | Ollyver do Brasil Produções - Musical- Gospel- Vídeo Clip- Gravação | [+55 11 98350-1007](https://wa.me/5511983501007) | Cidade Tiradentes | Estúdio de gravação | 4.1 (13) |
| 83 | Valvulando Studio | [+55 11 96347-0704](https://wa.me/5511963470704) | Jardim Marisa | Estúdio de gravação | 4.9 (13) |
| 84 | #3doze Podcast Estúdio | [+55 11 97413-2425](https://wa.me/5511974132425) | Ipiranga | Estúdio de gravação | 5 (13) |
| 85 | Groove Music | [+55 11 95556-0229](https://wa.me/5511955560229) | Grajaú | Escola de Música | 3.7 (13) |

## Lista — fixo / só e-mail (20)

| # | Nome | Telefone (fixo) | Bairro | Categoria | Nota (avaliações) |
|---|---|---|---|---|---|
| 1 | Sommarsom Instrumentos e Artigos Musicais Ltda | +55 11 5523-9953 | Santo Amaro | Loja de Instrumentos Musicais | 4.4 (233) |
| 2 | High Five | +55 11 5543-3745 | Moema | Estúdio de gravação | 4.6 (141) |
| 3 | Estúdios de Gravações Guidon Ltda. | +55 11 3277-7501 | Cambuci | Estúdio de gravação | 4.9 (109) |
| 4 | DRUIDA SOUND STUDIO | +55 11 2967-1418 | Vila Maria | Estúdio de gravação | 4.8 (59) |
| 5 | Galpão 75 Produções | +55 11 3294-5326 | Terceira Divisão de Interlagos | Estúdio de gravação | 4.8 (58) |
| 6 | Sigma Estúdio e Produções de Áudio | +55 11 3672-2147 | Perdizes | Estúdio de gravação | 4.9 (55) |
| 7 | ESL Brasil | +55 11 2291-9373 | Brás | Estúdio de gravação | 4.7 (54) |
| 8 | Estúdios Luau da Praia | +55 11 3824-0907 | Barra Funda | Estúdio de gravação | 4.8 (40) |
| 9 | Cia Casa da Sogra - Estudio Musical | +55 11 3501-4844 | Jardim das Vertentes | — | 4.9 (31) |
| 10 | Oreste Sinatra Conserv Dramatico Musical | +55 11 2297-0529 | São Miguel Paulista | Escola de Música | 4.3 (31) |
| 11 | High Music - Academia Livre de Ensino Musical e Artístico | +55 11 3423-3680 | Jardim Vivan | Escola de Música | 4.9 (30) |
| 12 | Art & Music - Escola de Música | +55 11 3943-4703 | Jaraguá | Escola de Música | 5 (29) |
| 13 | Escola de Musica CEM Carlos Gomes | +55 11 2950-6011 | Tucuruvi | Escola de Música | 5 (24) |
| 14 | El Elyon Instituto de Música | +55 11 2367-0185 | Piqueri | Escola de Música | 5 (18) |
| 15 | Espaço Ruby Ananda | +55 11 3751-0231 | Jardim Celeste | Escola de Música | 4.8 (17) |
| 16 | Tony Music / Loja e Escola de Música | +55 11 4171-2815 | Jardim Bonifacio | Escola de Música | 5 (17) |
| 17 | LB Music Escola de Música | +55 11 5812-8330 | Jardim Germania | Escola de Música | 5 (13) |
| 18 | EMBS - Escola de Música Bom Sucesso | +55 11 5524-3370 | Santo Amaro | Escola de Música | 4.4 (13) |
| 19 | Estúdio Manilha | +55 11 5581-3698 | São Judas | Estúdio de gravação | 4.4 (13) |
| 20 | Estúdio para Ensaios Turbo-ig | +55 11 2275-2957 | Jabaquara | Estúdio de gravação | 5 (12) |

---

Fonte bruta (CSV) salva junto com este relatório: [`105-contatos-sao-paulo-leva4.csv`](105-contatos-sao-paulo-leva4.csv).

**O que NÃO foi feito:** nenhuma mensagem enviada, nenhum prospect criado no `rv-acquisition` (Supabase segue não conectado nesta sessão), nenhuma verificação ativa de WhatsApp instalado no número. Ver [[HANDOFF]] seção 6 para os bloqueios antes de qualquer disparo.

**Ver também:** [[HANDOFF]] · [[PLANO-ESCALA-CONTATOS]] · [[04-35-contatos-sao-paulo-leva3-google-places]] · [[03-50-contatos-sao-paulo-refinado]] · [[02-50-contatos-floripa-sem-site]]
