# Briefing para IA externa — corrigir os "ângulos" por ramo de negócio

> Este documento existe pra você (Felipe) colar numa outra IA que escreve esse tipo de texto
> melhor. Ele tem todo o contexto necessário pra reescrever só a parte que está errada, sem
> precisar reabrir o resto da campanha.

---

## O problema, direto

O email de prospecção tem uma frase por negócio (o "ângulo") que tenta explicar por que aquele
tipo específico de negócio se beneficia da foto aérea 360°. O problema: **algumas dessas frases
inventam um benefício que a foto não entrega**, porque erraram a altura da captura.

**Exemplo do erro (categoria "Imbiss", take-away):**

> "Em take-away, muita coisa se decide se a pessoa vê de cara onde é a entrada e onde dá pra
> parar." (o carro)

Isso está errado porque **a foto é tirada de uma altura muito grande**. Dá pra ver o quarteirão,
os telhados, o formato das ruas. **Não dá pra ver a porta de entrada de um estabelecimento, nem
onde tem vaga pra estacionar.** Prometer isso no email é inventar um benefício que não existe,
e quebra a credibilidade na hora que o dono do negócio abrir o link e comparar com o que foi
prometido.

## O que a foto realmente mostra

A foto de referência (a mesma que aparece na landing page) é um drone 360° em altitude alta,
cobrindo o bairro inteiro numa única captura esférica. Pelo que dá pra ver nela:

- Telhados, formato dos quarteirões, ruas e o traçado geral do bairro
- Áreas verdes, floresta ao redor, campo aberto
- Onde um endereço fica *dentro do bairro* (orientação geral, não detalhe de rua)
- A escala aproximada de um terreno ou prédio (grande vs. pequeno)

O que ela **não mostra**, e não pode ser prometido em nenhum ângulo:

- Porta de entrada, fachada em detalhe, letreiro, vitrine
- Vagas de estacionamento, onde parar o carro
- Qualquer coisa em nível de rua/pedestre

Referência real da foto (se a IA que for reescrever tiver acesso à internet, pode conferir):
`https://tour.realvisionmaps.com/unterentfelden01/`

## O que precisa ser corrigido

O arquivo `gerador-emails.py` (nesta mesma pasta) tem uma função `angle(cat, name)` com 8
variações de ângulo, uma por família de ramo de negócio. **Precisa reescrever as 8, em alemão
e com o resumo em português ao lado**, trocando qualquer promessa de detalhe em nível de rua por
algo que a foto realmente entrega: orientação dentro do bairro, escala do terreno/prédio, contexto
do entorno (verde, vizinhança), ineditismo (ninguém no ramo tem isso ainda).

Cole a função inteira abaixo. As duas primeiras variações (Imbiss/restaurante e
Fusspflege/estética) são as que têm o erro mais claro. As demais podem estar certas, mas vale
reler todas com o mesmo filtro.

```python
def angle(cat, name):
    c = (cat or "").lower()
    if "imbiss" in c or "restaurant" in c or "caf" in c or "bar" in c:
        return ("Gerade bei einem Take-away entscheidet sich viel daran, ob Leute auf Anhieb sehen, "
                "wo der Eingang ist und wo sie kurz anhalten können.",
                "Em take-away, muita coisa se decide se a pessoa vê de cara onde é a entrada e onde dá pra parar.")
        # ERRADO: a foto não mostra entrada nem vaga de carro (altura alta demais).

    if "fusspflege" in c or "kosmetik" in c or "schönheits" in c or "schoenheits" in c or "friseur" in c or "make-up" in c:
        return ("Bei einer Praxis in einem Wohnquartier ist die halbe Arbeit, dass Kundinnen das richtige "
                "Haus auf Anhieb finden. Von oben ist das in einem Bild erledigt.",
                "Num consultório em bairro residencial, metade do trabalho é a cliente achar a casa certa de primeira. De cima isso se resolve numa imagem.")
        # SUSPEITO: "achar a casa certa" também é detalhe demais pra essa altura. Revisar.

    if "masseur" in c or "physio" in c or "alternativ" in c or "rheuma" in c or "kräuter" in c:
        return ("Patientinnen und Patienten, die das erste Mal kommen, suchen meistens nicht die Adresse, "
                "sondern den Eingang. Eine Aufnahme von oben nimmt diese Unsicherheit weg.",
                "Quem vem pela primeira vez não procura o endereço, procura a entrada. Uma foto de cima tira essa insegurança.")
        # ERRADO: mesmo problema, promete resolver "achar a entrada".

    if "bau" in c or "gips" in c or "elektro" in c or "industrie" in c or "transport" in c or "reinigung" in c:
        return ("Bei einem Betrieb wie Ihrem zeigt eine Aufnahme aus der Luft auf Anhieb Areal, Zufahrt "
                "und Grössenordnung. Das erspart im Erstkontakt einige Erklärungen.",
                "Num negócio como o seu, a foto aérea mostra de cara o terreno, o acesso e a escala. Economiza explicação no primeiro contato.")
        # PROVAVELMENTE OK: fala de terreno/escala, que dá pra ver de cima. Conferir "Zufahrt" (via de
        # acesso) — dá pra ver a rua de acesso geral, mas não o portão específico.

    if "berater" in c or "unternehmensberater" in c or "coaching" in c or "life coach" in c or "sozialarbeiter" in c:
        return ("Bei Beratung zählt der erste Eindruck des Profils fast so viel wie die Website. "
                "Ein aktuelles Bild signalisiert, dass der Betrieb aktiv ist.",
                "Em consultoria, a primeira impressão do perfil pesa quase tanto quanto o site. Imagem atual sinaliza negócio ativo.")
        # OK: não depende de detalhe visual nenhum.

    if "software" in c or "computersupport" in c or "it-" in c or "webdesign" in c or "elektronik" in c:
        return ("Auch bei einem Betrieb, der ohne Laufkundschaft arbeitet, ist das Google-Profil oft die "
                "erste Seite, die jemand über Sie sieht. Ein aktuelles Bild macht dort den Unterschied.",
                "Mesmo sem cliente de rua, o perfil do Google é quase sempre a primeira página que alguém vê sobre você. Imagem atual faz diferença ali.")
        # OK: mesma lógica, sem depender de detalhe visual.

    if "ingenieur" in c or "landvermesser" in c or "treuhand" in c or "immobilien" in c:
        return ("In Ihrem Bereich arbeiten Sie ohnehin mit Plänen und Lagen. Eine 360°-Aufnahme des eigenen "
                "Standorts ist die Visitenkarte dazu.",
                "Na sua área você já trabalha com plantas e localização. Uma foto 360° do próprio endereço é o cartão de visita disso.")
        # OK: fala de "localização", que é exatamente o que a foto mostra bem.

    if "yoga" in c or "schule" in c or "fotograf" in c or "verein" in c or "bildungs" in c:
        return ("Bei einem Ort, zu dem Leute bewusst hinkommen, hilft es enorm, wenn sie die Umgebung vorher "
                "einmal gesehen haben.",
                "Num lugar onde as pessoas vão de propósito, ajuda muito elas terem visto o entorno antes.")
        # OK: fala de "entorno" (surroundings), compatível com a altura da foto.

    return ("Ein aktuelles Bild aus der Luft zeigt auf Anhieb, wo Ihr Standort im Quartier liegt und wie man "
            "hinkommt.",
            "Uma imagem aérea atual mostra de cara onde fica o seu endereço no bairro e como chegar.")
        # SUSPEITO: "wie man hinkommt" (como chegar) pode soar como instrução de rota, que a foto não
        # dá. Trocar por algo como "onde fica dentro do bairro".
```

---

## Contexto completo da campanha (pra a IA não inventar nada)

### O que é

Campanha de prospecção da Real Vision 360 (empresa do Felipe Garcia, tours virtuais 360°/drone/
presença digital). Oferece foto aérea 360° de drone integrada ao perfil do Google Meu Negócio,
pra 24 negócios pequenos e médios do bairro Distelberg, em Unterentfelden (5035), Suíça, perto de
Aarau. Preço: **CHF 20 por estabelecimento**, pagamento único.

### O modelo de captura (importante, mudou nesta sessão)

**Não tem visita individual por negócio.** O bairro inteiro já foi sobrevoado numa captura só,
em **13.08.2026**. Cada negócio recebe um recorte dessa mesma captura, não uma visita nova.
Isso é o que torna o preço baixo (CHF 20) plausível: não tem custo de voo por cliente.

### O modelo de pagamento (também definido nesta sessão, deixado explícito pro cliente escolher)

O cliente escolhe entre duas opções, sem uma ser "a certa":

- **Opção 1:** vê o resultado antes de decidir, paga só depois de aprovar.
- **Opção 2:** paga direto, a Real Vision publica em até 24h (às vezes mais, dependendo do
  tempo de resposta do Google).

### O que o cliente recebe (3 itens)

1. Foto aérea 360° do bairro, da captura de 13.08.2026 (não precisa preparar nada, não tem
   visita).
2. Publicação dessa foto no perfil do Google Meu Negócio dele.
3. Link da versão em tour navegável, livre pra usar no site ou app dele.

### O que o email pede de volta (fechamento/CTA)

Pedir pra responder confirmando **qual é o link do perfil do Google atual** dele (existem casos de
perfil duplicado ou não reivindicado no levantamento) e **qual das duas opções de pagamento**
prefere. Não é mais "agendar uma visita" (não existe visita).

### Tom de voz obrigatório

Ver `contexto/VOZ.md` no vault (`C:\Users\Computador\Desktop\Real Vision\contexto\VOZ.md`):
direto, técnico, consultivo. Nunca hipérbole ("incrível", "sensacional"), nunca "agência criativa"
nem "fotógrafo de tour". A Real Vision fala como consultor, não como vendedor.

Regras de escrita da skill `rv-copy` (`C:\Users\Felipe Garcia\.claude\skills\rv-copy\SKILL.md`):
nunca travessão (—) ligando frases dentro da copy (soa IA), sempre ponto final ou vírgula natural.
Cada frase precisa mudar o comportamento do leitor ou sai. Especificidade só se for verdadeira,
nunca inventada.

### Idioma e formato do email

Alemão suíço, tratamento `Sie`, sempre `ss` (nunca `ß`). Saudação nominal só quando o gênero da
pessoa está confirmado pelo nome (ver dicionário `GREET` no `gerador-emails.py`); em dúvida,
"Guten Tag" puro, que é normal em email comercial suíço.

### Estrutura fixa do email (não mexer nisso, só no ângulo)

```
{Saudação}

Ich bin Felipe von Real Vision 360. Wir nehmen dieses Quartier in Unterentfelden gerade per
Drohne in 360° auf und binden die Aufnahmen in die Google-Profile der Betriebe ein, die
mitmachen wollen. {Nome do negócio} an der {Rua} ist mir dabei aufgefallen.

{Observação sobre quantas fotos o perfil tem hoje} {AQUI ENTRA O ÂNGULO — é isso que precisa reescrever}

Konkret bekommen Sie drei Dinge:

1. Eine 360°-Luftaufnahme Ihres Quartiers, aufgenommen am 13.08.2026. Sie müssen nichts vorbereiten.
2. Die Einbindung dieser Aufnahme in Ihr Google Unternehmensprofil.
3. Einen Link zur begehbaren 360°-Tour, den Sie frei auf Ihrer Website oder App nutzen können.
[+ frase condicional se o perfil não for reivindicado, oferecendo ajudar a configurar]

Der Einführungspreis für das Quartier ist CHF 20 pro Betrieb, einmalig, ohne Abo. Sie
entscheiden, was für Sie passt: zuerst das Ergebnis sehen und danach zahlen, oder gleich
zahlen, dann veröffentlichen wir meist innerhalb von 24 Stunden. Bei Google dauert es
manchmal ein paar Tage länger.

Alle Details hier: https://drone-unterentfelden.vercel.app

Antworten Sie mir kurz mit dem Link zu Ihrem aktuellen Google-Profil, damit ich Sie richtig
einbinde. Sagen Sie mir dabei auch, welche der beiden Varianten Sie möchten.

Freundliche Grüsse
Felipe Garcia
Real Vision 360
realvisionmaps.com
```

### Os 24 negócios e suas categorias (pra saber quais ramos existem)

| Estabelecimento | Categoria |
|---|---|
| Wakara Imbiss | Imbiss |
| Solenthaler Photography | Hochzeitsfotograf |
| CosmoBella / Matos Beauty Salon | Friseur |
| Mittelland Räumungen | Transportdienst |
| The Source Beratungen | Coachingservice |
| Fusspflege Entfelden Doris Marty | Fusspflege |
| Mondi Bau AG | Bauunternehmen |
| Odys Oiltec AG | Öl- und Erdgasunternehmen |
| Visagistenschule und Maskenbildnerschule Colorline | Kosmetikgeschäft |
| Erdmut – Massage & Körperarbeit | Masseur |
| GOMO GmbH | Unternehmensberater |
| Robinex AG | Berater |
| distel – raum für mehr | Yogaseminarzentrum |
| r + m baudienstleistungen gmbh | Bauunternehmen |
| FUSSNESS | Fusspflege |
| NeoRescue | Berater |
| TechKlar – IT-Services & Webagentur | IT-Dienstleistungen |
| Erne Treuhand und Immobilien | Immobilienagentur |
| Kissling Gebäudeplanung GmbH | Ingenieur |
| Läbensfreud GmbH | Alternativmediziner |
| Moro Reinigungen | Reinigungsdienst |
| Schnetzler A. AG | — |
| physiomotorik | Physiotherapeut |
| reByte GmbH | Softwareentwicklung |

### O que a IA externa deve entregar de volta

As 8 variações da função `angle()`, reescritas (alemão + resumo em português), mantendo o
mesmo formato de retorno `(hook_de, hook_pt)`, respeitando tudo acima. Não precisa mexer no
resto do `gerador-emails.py`, só nessa função.

---

## Onde estão os arquivos (se a IA externa também tiver acesso ao vault)

- Script gerador: `operacao/prospeccao/campanhas/drone-digital-unterentfelden/emails/gerador-emails.py`
- Os 24 emails atuais (revisão): `operacao/prospeccao/campanhas/drone-digital-unterentfelden/emails/revisao-emails.md`
- Handoff da campanha inteira: `operacao/prospeccao/campanhas/drone-digital-unterentfelden/HANDOFF.md`
- Landing page: `operacao/prospeccao/campanhas/drone-digital-unterentfelden/landing/site/`
- Tom de voz: `contexto/VOZ.md`
- Regras de copy: `C:\Users\Felipe Garcia\.claude\skills\rv-copy\SKILL.md`
