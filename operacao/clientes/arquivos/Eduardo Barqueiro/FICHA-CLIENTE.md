---
title: Eduardo Barqueiro — Paraty Onboard
tags:
  - cliente
  - entregue
  - ativo
status: ativo
data_inicio: 2026-06-16
servicos:
  - cartao-digital
  - dominio-proprio
  - canal-youtube
id: CLI-004
tipo: cliente
pertence_a: ["[[operacao/clientes/README]]"]
atualizado_em: 2026-08-28
---

# Eduardo Barqueiro — Paraty Onboard

Wiki: [[eduardo-barqueiro]]

## Contexto

Eduardo Barqueiro é dono/gestor da Paraty Onboard, passeios de barco em Paraty (RJ). Felipe conheceu o Eduardo pessoalmente em Paraty (achou o WhatsApp dele pelo Google, buscando um passeio) e ofereceu um tour virtual 360° em troca do passeio de barco — permuta aceita, virou cliente.

## Serviços contratados

- **Site/landing page** (entregue, evoluiu do "cartão digital" original — hoje é uma landing page completa com roteiros, preços e reserva)
- **Tour Virtual 360°** com imagens de drone e 360° dos principais pontos do passeio de barco (permuta pelo passeio, sem cobrança em dinheiro)
- **Opção 3** (em andamento, paga em 16/08/2026 — R$550): Domínio Próprio (`paratyonboard.com.br`) + Canal do YouTube + vídeo de drone da experiência

## Entregas realizadas

- **16/06/2026** — Site entregue em `paraty.realvisionmaps.com` (subdomínio Hostinger via CNAME)
  - Stack: Vite + React + Tailwind + glassmorphism
  - Repo privado no GitHub → deploy Vercel → CNAME Hostinger

- **31/07/2026** — Site tirado do ar (domínio `paraty.realvisionmaps.com` removido do projeto Vercel) por falta de pagamento

- **17/08/2026** — Site reconectado na Vercel (`paraty.realvisionmaps.com`, projeto `paraty-onboard`), voltou ao ar exatamente como estava. DNS já configurado, sem necessidade de mudança na Hostinger.

- **17/08/2026** — Domínio `paratyonboard.com.br` comprado e registrado por Felipe (CPF próprio, não do Eduardo) na Locaweb, conta `realvisionmaps360`. Fatura R$26,90, paga via boleto. Registro anual (~365 dias), renovação por volta de agosto/2027.
  - DNS configurado na Locaweb: registro A no `@` (`216.198.79.1`) e CNAME no `www` (`291be029e1851ae4.vercel-dns-017.com`), exatamente conforme pedido pela Vercel no projeto `paraty-onboard`
  - Propagação confirmada no mesmo dia: `paratyonboard.com.br` redireciona (308) para `www.paratyonboard.com.br`, que responde 200 — site migrado e funcionando

- **17/08/2026** — Vídeo de drone do passeio publicado no canal do YouTube da Paraty Onboard. O canal já era do Eduardo (Gmail e conta próprios, credenciais enviadas por ele) — Felipe apenas configurou/vinculou o vídeo na conta existente, não criou conta nova.

- **17/08/2026** — Contrato de Prestação de Serviços gerado (`RV-2026-002`), template oficial da Real Vision (capa navy + Resumo Executivo + 15 cláusulas + Termos e Condições Gerais v1.1 anexados como Anexo A).
  - Salvo em `operacao/clientes/arquivos/Eduardo Barqueiro/EduardoBarqueiro_Contrato_17-08-26.pdf` e em `operacao/comercial/contratos/`
  - Sem CNPJ/CPF de nenhuma das partes (a pedido do Felipe). Investimento: R$550,00 via PIX (1º ano incluso); renovação anual de R$250,00 a partir de 17/08/2027
  - Pendente: enviar por WhatsApp e por e-mail (`021vs024@gmail.com`)

## Pagamentos

- **R$550, pago em 16/08/2026** — cobre a Opção 3 completa (domínio próprio + canal do YouTube) já incluindo o 1º ano de manutenção/hospedagem. Não há débito anterior pendente: o valor de referência de ~R$1.000 do tour virtual foi permuta pelo passeio de barco que o Eduardo ofereceu à equipe — ficou quitado por igual, nunca foi cobrança em dinheiro.
- Domínio (R$26,90/ano) pago pelo Felipe direto na Locaweb, fora do R$550.
- **Renovação anual, a partir do 2º ano (~ago/2027): R$250/ano.**

## Próximos passos

- [x] Comprar/registrar o domínio `paratyonboard.com.br`
- [x] Confirmar propagação DNS e migrar `paraty.realvisionmaps.com` para o domínio próprio
- [x] Publicar o vídeo de drone no canal do YouTube da Paraty Onboard (canal já era dele)
- [x] Gerar o contrato de prestação de serviços (`RV-2026-002`)
- [ ] Enviar o contrato por WhatsApp e por e-mail (`021vs024@gmail.com`)
- [ ] Follow-up pós-entrega: satisfação com o pacote completo
- [ ] Corrigir `status_pipeline` no VisionFlow (está como "recusado", desatualizado)

## Observações

- Primeiro cliente com esse pacote completo entregue pela Real Vision (caso de referência)
- Contato via WhatsApp (campanha de prospecção)
- Localização: Paraty, RJ
