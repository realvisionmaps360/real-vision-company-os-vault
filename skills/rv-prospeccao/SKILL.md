# rv-prospeccao — Playbook de Prospecção "Oferta de Entrada 360°"

Skill para replicar a campanha de foto 360° aérea em qualquer cidade. Baseada na campanha real executada em Paraty (junho 2026): 35 pousadas pesquisadas, 31 WhatsApps enviados, 17 e-mails enviados.

---

## O que é a oferta

**Tripwire:** publicar uma foto 360° aérea navegável (igual Street View) no perfil do Google Meu Negócio do cliente por **R$25**.

- Objetivo real: **não é lucrar R$25** — é abrir a porta para upsell (site, tour completo, GMB, automações)
- Publicação via **Pano2VR / Street View Studio** — Felipe publica sozinho, **não precisa de acesso do cliente**
- Cliente só precisa dar: **autorização verbal + Pix**

**PIX fixo:** CPF 389.729.498-25 · Felipe Garcia · Nubank

---

## Quando usar esta skill

- Felipe está em uma nova cidade e quer captar clientes locais rapidamente
- Alvo: pousadas, restaurantes, atrações turísticas, comércio local — qualquer negócio com perfil no Google Maps
- Não usar para clientes já cadastrados no VisionFlow

---

## Fluxo completo

### Etapa 1 — Definir alvo

Perguntar ao Felipe:
- Qual cidade?
- Qual segmento? (pousadas, restaurantes, bares, etc.)
- Quantos contatos quer tentar? (recomendado: 30-50 por rodada)

### Etapa 2 — Pesquisar contatos

**Método: WebSearch + Instagram** (melhor para negócios locais pequenos)

Queries que funcionam:
```
pousada [cidade] WhatsApp telefone contato [ano]
restaurante [cidade] WhatsApp reservas site
[nome do negócio] Paraty WhatsApp Instagram
```

Para cada contato, levantar:
- Nome do negócio (exato, como aparece no Google Maps)
- WhatsApp (prioridade) — verificar se parece número de celular (9 dígitos)
- E-mail (secundário — alguns são inválidos, verificar se parece real)
- Se não achar: Instagram + site oficial como fallback

**Lições aprendidas em Paraty:**
- Muitos números fixos (ex: 3371-XXXX) NÃO têm WhatsApp — não vale tentar
- E-mails de domínio `.com.br` antigos às vezes já não existem
- Números com `99XXX-XXXX` ou `98XXX-XXXX` (celular) = mais confiável para WA
- Fontes mais confiáveis: site oficial do negócio > booking.com/TripAdvisor > Google Maps
- Prioridade alta: negócios no centro histórico / área turística principal

### Etapa 3 — Criar o documento de contatos + registrar campanha no banco

**Banco primeiro:** antes de criar o arquivo de contatos, registrar a campanha e os prospects no banco `rv-acquisition` (`gexacmtkjqectfqwhunv`). Seguir o contrato em `operacao/prospeccao/ACQUISITION-CONTRACT.md`:

1. INSERT em `campaigns` com o código `[cidade]-[segmento]-[ano-mes]`
2. Para cada negócio: dedup + INSERT em `prospects` + evento `encontrado` + score + `prospect_services`
3. INSERT em `campaign_prospects` vinculando prospect ↔ campanha

**Arquivo de contatos** é a camada humana de trabalho — gerada após o banco:

Arquivo em: `operacao/prospeccao/[cidade]-[segmento]-contatos.md`

Estrutura por pousada:
```markdown
#### [N]. [Nome do Negócio]
**WhatsApp:** [(XX) XXXXX-XXXX](https://wa.me/55XXXXXXXXXXX) · **E-mail:** [email] · ☐ WA · ☐ Email

```[mensagem WA pronta]```
```

### Etapa 4 — Gerar mensagens personalizadas

**WhatsApp — template padrão:**
```
Oi! Aqui é o Felipe, da Real Vision 360. Somos Guias Locais do Google e contribuidores do Street View — andamos pelo Brasil atualizando imagens de cidades e regiões no Google Maps.

Nossa equipe esteve em [CIDADE] esses dias atualizando as imagens aéreas da região. Aproveitamos pra oferecer também pro comércio local: incluir uma dessas fotos 360° diretamente no perfil do Google do negócio.

Quase nenhum[a] [SEGMENTO] de [CIDADE] tem foto 360° no perfil — a maioria fica com a galeria vazia. Com a imagem, toda vez que alguém abre o perfil d[a/o] [NOME DO NEGÓCIO] no Google vai se deparar com uma panorâmica aérea de [CIDADE] a 500 metros de altura, navegável tipo Street View. Bonito e ainda ajuda o visitante a se localizar antes de sair de casa.

Conheça nosso trabalho: realvisionmaps.com/sobre

Se quiserem a foto no perfil de vocês, é R$25. Só precisamos da sua autorização e do Pix — CPF 389.729.498-25 (Felipe Garcia, Nubank). Eu publico automaticamente e fica online em alguns dias e fica lá pra sempre.

Se não tiver interesse no momento, não precisa responder. Abraço!
```

**E-mail — template padrão (sem assinatura — Felipe coloca a própria):**
```html
<p>Olá!</p>
<p>Sou o Felipe, da Real Vision 360. Somos Guias Locais do Google e contribuidores do Street View — percorremos o Brasil atualizando imagens de cidades e regiões diretamente no Google Maps.</p>
<p>Nossa equipe esteve em [CIDADE] recentemente atualizando as imagens aéreas da região. Aproveitamos para oferecer também para os negócios locais: a possibilidade de incluir uma dessas imagens 360° no perfil do Google do estabelecimento.</p>
<p>Quase nenhum[a] [SEGMENTO] de [CIDADE] tem fotos 360° anexadas ao perfil — a galeria fica vazia para a maioria. Com a imagem, toda vez que alguém abrir o perfil da <strong>[NOME]</strong> no Google vai se deparar com uma panorâmica aérea a 500 metros de altura, navegável tipo Street View. Além do visual, ajuda o visitante a se localizar e entender onde o negócio está antes de sair de casa.</p>
<p>Veja nosso trabalho completo em: <a href="https://realvisionmaps.com/sobre">realvisionmaps.com/sobre</a></p>
<p>Se quiserem a foto no perfil de vocês, é <strong>R$25</strong>. Só precisamos da sua autorização e do Pix — <strong>CPF 389.729.498-25 (Felipe Garcia, Nubank)</strong>. Eu publico automaticamente e a imagem fica online em alguns dias e fica lá pra sempre.</p>
<p>Se não tiver interesse no momento em nada do que oferecemos, não precisa responder a esta mensagem.</p>
```

**Assunto do e-mail:** `Foto 360° aérea no perfil do Google — [Nome do Negócio]`

### Etapa 5 — Criar rascunhos no Gmail

Via Gmail MCP (`mcp__3b883ec3-7452-4663-a499-28426f40bc8f__create_draft`):
- Usar `htmlBody` (não `body`) para evitar que links virem URLs longas do Google
- **NÃO incluir assinatura** — Felipe coloca a própria assinatura do adm@realvisionmaps.com
- Remetente: Felipe troca para `adm@realvisionmaps.com` antes de enviar
  - Como trocar: abrir rascunho em tela cheia (↗) → clicar na linha "De:" → selecionar alias

### Etapa 6 — Felipe envia manualmente

- WhatsApp: copia do documento e manda um a um
- E-mail: abre cada rascunho no Gmail, muda "De:" para adm@realvisionmaps.com, envia
- Marcar checkbox ☑ no documento conforme envia
- **Após cada envio confirmado:** registrar no banco evento `abordado_wa` ou `abordado_email` + atualizar `last_contacted_at` + setar `next_followup_date` (+4 dias) + `current_status = 'abordado'`

### Etapa 7 — Follow-up (3-4 dias depois)

Se não respondeu, WhatsApp simples:
```
Oi! Passei aqui pra ver se tinham visto minha mensagem sobre a foto 360° no perfil do Google. Qualquer dúvida estou à disposição. Abraço!
```

### Etapa 8 — Quando responder positivamente

1. Confirmar autorização + PIX recebido
2. Buscar perfil do negócio no Google Maps pelo nome
3. Publicar via Pano2VR / Street View Studio
4. Avisar cliente quando ficar online
5. Registrar no VisionFlow (status "Entregue")
6. Retomar em 2-3 dias para upsell (site, tour completo, GMB)

---

## Priorização de alvos

**Alta prioridade:**
- Centro histórico / área turística principal
- Perfil Google Maps com galeria vazia ou fotos de baixa qualidade
- Negócio sem site profissional (ainda mais potencial de upsell)

**Média prioridade:**
- Negócios perto do centro, com contato direto

**Baixa / pular:**
- Hotéis grandes (100+ quartos) — provavelmente têm fotógrafo profissional
- Redes / franquias — decisão não é local
- Negócios de altíssimo padrão (R$1000+/noite) — provavelmente já têm tudo

---

## Gmail — configuração do remetente

`adm@realvisionmaps.com` já está configurado como alias em `realvisionmaps360@gmail.com`:
- SMTP: smtp.hostinger.com · Porta 465 · SSL
- Para usar em novos e-mails: abrir compose em tela cheia → clicar em "De:" → selecionar alias
- Para definir como padrão: Configurações → Contas e importação → "usar como padrão" ao lado do alias

---

## Resultados da campanha Paraty (junho 2026)

| Canal | Enviados | Obs |
|---|---|---|
| WhatsApp | 31 | Alguns números fixos sem WA |
| E-mail | 17 | Alguns endereços inválidos/inexistentes |
| Total alcançado | ~48 | De 35 pousadas pesquisadas |

**Lições operacionais:**
- Números com 8 dígitos (fixo) raramente têm WhatsApp — priorizar celulares
- E-mails de domínio customizado antigo (.com.br) têm maior taxa de bounce
- Construir lista de 35 + rascunhos no Gmail + mensagens WA prontas levou ~1 sessão
- Fluxo funciona: documento único com tudo junto (WA + email + checkboxes) é o formato certo

---

## Segmentos a expandir na Fase 2

Para aplicar o mesmo playbook em outros segmentos da mesma cidade ou nova cidade:
- Restaurantes e bares
- Pousadas e hotéis (já testado)
- Atrações turísticas (passeios de barco, trilhas, cachoeiras)
- Lojas e boutiques de artesanato
- Espaços de eventos

Adaptar: trocar "pousada" por segmento na mensagem, e o gancho ("quase nenhum restaurante de [cidade] tem...").

---

## Como ativar esta skill

```
/rv-prospeccao
```
ou mencionar "prospecção", "campanha nova", "nova cidade", "oferta de entrada 360°".

Sempre carregar `realvision` primeiro.
