# E-mail — Relatório Mensal (rascunho)

> **Status:** RASCUNHO/MODELO. Texto pronto para revisão e ajuste do mês/período assim que o relatório real (`relatorio-mensal-<mes-ano>.md`) estiver fechado e o PDF gerado. Idioma principal: alemão (Hochdeutsch), padrão de comunicação com o Gabriel. Resumo em português logo abaixo, só para sua conferência antes de aprovar o envio.

**Destinatário:** solariumaarau@gmail.com
**Remetente:** adm@realvisionmaps.com
**Anexo:** `Solarium_RelatorioMensal_[DD-MM-AA].pdf`

---

## Versão em alemão (pronta para envio)

**Betreff (Variante A):** Ihr monatlicher Website-Bericht – Solarium & Collarium Aarau
**Betreff (Variante B):** Wie lief der Monat für aarau-solarium.ch?
**Preview-Text:** Zahlen, Trends und die nächsten Verbesserungsmöglichkeiten für deine Website.

Hallo Gabriel,

anbei findest du den monatlichen Bericht zu deiner Website (aarau-solarium.ch) mit den wichtigsten Zahlen aus Google Analytics sowie einem kurzen Überblick über die nächsten Verbesserungsmöglichkeiten, die wir bei der letzten Analyse identifiziert haben.

Falls du Fragen zu den Zahlen hast oder eine der vorgeschlagenen Verbesserungen priorisieren möchtest, melde dich einfach — wir kümmern uns gerne darum.

Viele Grüße
Felipe Garcia
Real Vision

P.S.: Mir ist aufgefallen, dass das Solarium noch kein optimiertes Google Business Profile hat. Für ein Geschäft mit Vor-Ort-Besuchen wie deins bringt das oft zusätzliche Kundschaft, die direkt über Google Maps nach "Solarium Aarau" sucht. Sag Bescheid, wenn du sehen möchtest, wie das aussehen könnte.

---

## Resumo em português (só para sua conferência)

**Assunto A:** "Seu relatório mensal do site — Solarium & Collarium Aarau"
**Assunto B:** "Como foi o mês para aarau-solarium.ch?"
**Preview text:** "Números, tendências e as próximas oportunidades de melhoria do site."

Corpo: Oi Gabriel, segue em anexo o relatório mensal do site (aarau-solarium.ch) com os principais números do Google Analytics e um resumo rápido das próximas oportunidades de melhoria que identificamos na última análise. Qualquer dúvida sobre os números ou se quiser priorizar alguma melhoria, é só chamar. Abraço, Felipe / Real Vision.

P.S.: reparei que o Solarium ainda não tem um perfil otimizado no Google Business Profile — pra um negócio de visita física como o dele, isso costuma trazer gente que busca "Solarium Aarau" direto no Google Maps. É um gancho pra puxar assunto sobre o serviço, sem parecer venda forçada (o Gabriel decide se quer ver mais).

---

## Loop de autocrítica (skill `rv-email`/Hermes)

| Checagem | Resultado |
|---|---|
| O email paga por si em <60s? | Sim — PDF anexado + resumo direto no corpo |
| Tem 1 ideia só? | Sim — o relatório; o P.S. é gancho leve, não uma 2ª ideia central |
| Voz correta (sem hipérbole, tom consultivo)? | Sim |
| CTA claro? | Sim — "melde dich" / "é só chamar" |
| P.S. está sendo usado? | Sim — gancho de upsell (Google Business Profile, catálogo item #3) |
| Assunto + preview text têm variante B? | Sim |
| Palavras de spam no corpo? | Nenhuma |
| Gatilho Walker em jogo? | Reciprocidade (relatório grátis, de valor) + Confiança (dados transparentes) |

---

## Decisão registrada (02/07/2026)

Canal de envio: **manual**, via `adm@realvisionmaps.com` (padrão `rv-relatorio`, não a trilha do Hermes/Resend). Felipe optou por não abrir a infraestrutura do Hermes (`contato@realvisionmaps.com`, cadastro em `email_contatos`) para este cliente agora — fica registrado como opção futura, não como pendência ativa.

Fluxo de envio: PDF gerado pelo `rv-relatorio` → Felipe anexa e dispara pelo Gmail (ou eu crio o rascunho de verdade no Gmail, se ele pedir). As regras de voz/estrutura do Hermes (assunto A/B, preview text, P.S., loop de autocrítica) seguem valendo — só o canal de disparo que é manual, não a qualidade do texto.

---

## Pendências antes de enviar de verdade

1. Confirmar acesso ao GA4 do Solarium e preencher os números reais no relatório.
2. Definir o período exato coberto (primeira data com dado disponível no GA4 = data-âncora da recorrência mensal).
3. Gerar o PDF via skill `rv-relatorio` (capa a definir com você).
4. Revisar o texto em alemão com a Romana antes do primeiro envio (ela é co-responsável pela comunicação em alemão com o Gabriel).
5. Só depois disso: criar o rascunho de verdade no Gmail (ou enviar direto, se preferir) — nada disso acontece sem seu OK.
