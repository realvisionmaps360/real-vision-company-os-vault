# Índice de Campanhas

> Toda campanha disparada pela Real Vision, em ordem. O `sequencia_id` é reservado aqui antes do
> disparo pra nunca haver dois usos do mesmo número.

---

## Campanhas

| ID | Nome | Quando | Contatos | Estado |
|---|---|---|---|---|
| 001 | Primeira comunicação | — | — | disparada (antes do registro estruturado) |
| 002 | Seu site é o maior ativo digital | 20/07/2026 | 31 | disparada · **modelo visual de referência** |
| 003 | — | — | — | disparada (antes do registro estruturado) |
| 004 | Ciclo 1 · Fase 1 — Semear Autoridade | 27/08 a 11/09/2026 | 25 | **emails 1 e 2 disparados**, 3 e 4 agendados |
| 005 | Ciclo 1 · Fase 2 — Transformação | previsto 16/09 | — | ⬜ não escrita |
| 006 | Ciclo 1 · Fase 3 — Posse e oferta | — | — | ⬜ não escrita |

---

## Campanha 002 — a régua

`002-site-maior-ativo-digital.html`

Disparada em 20/07/2026 para 31 contatos. É o **modelo visual oficial** de todo email da Real
Vision: masthead em imagem (`masthead-002.png`, grid-bg com o logo embutido), CTA como link
sublinhado âmbar, sem foto de hero solta, assinatura com a foto do Felipe.

Aparece com abertura zero no banco. **Isso é ausência de medição, não ausência de leitura** — o
webhook do Resend só passou a existir em 20/08/2026 e não preenche retroativo.

---

## Campanha 004 — Fase 1

| # | Arquivo | Assunto A | Post / ativo | Data |
|---|---|---|---|---|
| 1 | `004-01-google-parou-de-mandar-cliente.html` | Seu site foi lido hoje, só não por gente | `site-maior-ativo-era-ia` | **27/08 ✅ disparado** |
| 2 | `004-02-o-que-a-gente-ve-no-seu-gmn.html` | 3 coisas que matam seu Google Meu Negócio | `google-meu-negocio-guia-completo` | **01/09 ✅ disparado** |
| 3 | `004-03-ilha-do-contrato.html` | 5 negócios, 1 mapa, 1 decisão | portfólio Hub Ilha do Contrato | 06/09 |
| 4 | `004-04-solarium-aarau.html` | Do Brasil à Suíça | portfólio + post Solarium Aarau | 11/09 |

### Disparo do email 1 — 27/08/2026, 11h32 UTC

- **28 enviados, 0 falhas.** Confirmado em `email_envios` (`variante_ab = A`)
- Assunto usado: "Seu site foi lido hoje, so nao por gente"
- Teste visual antes do disparo: `smarthomefg@gmail.com`, `resend_id 6b5db43c-0dd8-408a-b8bf-e25dcdeee3f2`,
  aprovado por Felipe com print (logo carregou, assinatura carregou, descadastro visível)
- Texto reescrito por Felipe na hora, antes do disparo: parágrafo do 51% mais direto, ponte nova
  para "é obrigatório ter site", menção à narração em áudio do post, e o P.S. trocado de "semana
  que vem" para "daqui a poucos dias" por causa da nova cadência

### Disparo do email 2 — 01/09/2026, 16h23 UTC

- **25 enviados, 0 falhas.** Confirmado em `email_envios` (`sequencia_id = 90efb3bf-daea-46fc-bc85-fd05bf474688`, `variante_ab = A`)
- Assunto usado: "3 coisas que matam seu Google Meu Negócio"
- Lista: 25 contatos ativos (24 anteriores + `Mikkel (Mike)`, `mikey.mp3@gmail.com`, cadastrado no mesmo dia, `idioma=de`)
- **Decisão de idioma (Felipe, 01/09):** disparo saiu só em PT pra lista inteira, mesmo com 4 contatos marcados `idioma=de` (Mikkel, Modular Festival, Swiss Army, e a Romana — que segue cadastrada como `pt` no banco, mas é fluente em alemão e ainda aprendendo português; ninguém corrigiu o campo dela). Não existe versão em alemão do email 2. Registrar como pendência real, não decisão definitiva de segmentação.
- **Teste visual prévio:** `smarthomefg@gmail.com`, `resend_id 73a26ee3-af30-4e1b-8750-5cc4e8c40714`, aprovado por Felipe antes do disparo geral ("pode rodar")
- **Infra usada:** sessão sem acesso ao `HERMES_SECRET` nem ao HTML de campanha local (não versionados no git — ver aviso no topo deste documento). Disparo real feito via função temporária `hermes-batch-004-02` (mesmo padrão da `hermes-test-send` de 21/08: chave própria embutida, não é o segredo de produção), invocada via `pg_net` (já instalado no projeto) para contornar bloqueio de rede do sandbox desta sessão. Função desativada (responde 410) logo após o disparo — **pendência: apagar de vez pelo painel do Supabase**, junto com `hermes-campanha` e `hermes-test-send`.

---

## Incidente de 21/08/2026 — template errado

Registrado aqui porque não pode se repetir.

O primeiro teste visual do email 1 saiu com **dois** problemas:

1. **Remetente errado** — saiu pelo Gmail pessoal em vez do domínio, porque não havia acesso ao
   `HERMES_SECRET`. Contornado com uma função temporária (`hermes-test-send`).
2. **Cabeçalho errado** — usava o `template-newsletter.html` da skill, que estava desatualizado e
   **nunca tinha sido o modelo real**. O modelo real sempre foi o da campanha 002.

Os dois `resend_id` do episódio: o teste corrigido final foi
`27ac474a-4e5b-4109-82e3-9030539464f4`.

**Regra que nasceu daí:** antes de qualquer teste visual, comparar contra um email real já
disparado. Não confiar de memória em qual template está ativo.

**Rastro que ficou:** a função `hermes-test-send` foi esquecida ativa em produção por seis dias,
com chave fraca embutida e acesso ao `RESEND_API_KEY`. Desativada em 27/08/2026.

---

## Relacionados

- [[README]] — hub da pasta
- [[04-CALENDARIO-EDITORIAL]] — o que vem depois
- [[02-TIMELINE]] — histórico completo

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-21 | Versão original criada | Sessão `email1` |
| 2026-08-27 | **Reescrito do zero** | O original se perdeu sem cópia. Reconstruído e atualizado com o disparo real da campanha 004 |
