---
id: PRJ-2026-006
tipo: projeto
nome: Paraty Onboard
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-17
atualizado_em: 2026-08-17
proxima_revisao: 2026-08-24
prazo: continuo
pertence_a: ["[[LBOS]]", "[[02-Projetos/real-vision/PROJETO]]"]
gera_receita: ["[[REC-2026-002]]"]
referencia: ["operacao/clientes/arquivos/Eduardo Barqueiro/FICHA-CLIENTE.md"]
tags: [lbos/entidade, lbos/projeto]
---

# Paraty Onboard

## O que é

Cliente Real Vision — **Eduardo Barqueiro**, dono da Paraty Onboard, passeios de barco em Paraty (RJ). Conheceu o Felipe pessoalmente em Paraty (achado pelo Google) e topou uma permuta: tour virtual 360° pelo passeio de barco. Primeiro cliente com esse pacote completo entregue pela Real Vision (caso de referência).

Dossiê completo do cliente (proposta, repositório, ativos visuais): `operacao/clientes/arquivos/Eduardo Barqueiro/`. Este nó não repete o conteúdo de lá — só referencia.

| | |
|---|---|
| Site atual | `paratyonboard.com.br` (migrado, 17/08/2026) — `paraty.realvisionmaps.com` continua ativo em paralelo |
| Domínio próprio | `paratyonboard.com.br` — registrado por Felipe (CPF próprio) na Locaweb, 17/08/2026, renovação anual (~ago/2027) |
| Repositório | `github.com/realvisionmaps360/rv-cartaodigital-paraty-onboard` |
| Projeto Vercel | `paraty-onboard` |
| Hospedagem | Vercel + Locaweb (DNS) |

## Escopo

**Dentro (Opção 3, paga em 16/08/2026 — R$550):** manter o site no ar, migrar para domínio próprio, criar canal do YouTube e publicar o vídeo de drone.
**Fora:** qualquer coisa além disso até novo pedido do Eduardo (o Tour Virtual 360° com drone já foi entregue via permuta, não é pendência).

## Dependências

- Nenhuma pendência técnica. Contrato `RV-2026-002` já gerado — falta só enviar por WhatsApp + email.

## Documentos da pasta

- [[02-Projetos/paraty-onboard/checklist|checklist]]

## Relacionados

- Pertence a: [[LBOS]], [[02-Projetos/real-vision/PROJETO]]
- Gera receita: [[REC-2026-002]]
- Cliente: Eduardo Barqueiro — ver `operacao/clientes/arquivos/Eduardo Barqueiro/FICHA-CLIENTE.md`

## Histórico

| Data | O que mudou | Motivo | Impacto | Decisão |
|---|---|---|---|---|
| 2026-08-17 | Nó criado | Prioridade 2 do handoff de memory dump — Eduardo pagou R$550 pela Opção 3 (domínio próprio + YouTube) | Cliente passa a ter rastro no grafo pessoal/negócio | Site (`paraty.realvisionmaps.com`, tirado do ar em 31/07 por falta de pagamento) reconectado na Vercel no mesmo dia — sem débito pendente, o R$1.000 de referência anterior era permuta pelo passeio de barco, nunca cobrança em dinheiro |
| 2026-08-17 | Domínio `paratyonboard.com.br` comprado por Felipe na Locaweb (R$26,90, CPF próprio), DNS configurado (A no `@`, CNAME no `www`) | Felipe concluiu a compra em paralelo à sessão | Migração para domínio próprio fica só dependente de propagação DNS | Registrado no CPF do Felipe, não do Eduardo — nota de propriedade a considerar se o cliente pedir transferência no futuro |
| 2026-08-17 | Propagação confirmada, domínio migrado; vídeo de drone publicado no canal do YouTube do Eduardo (conta e canal já existiam, Felipe só configurou/vinculou — não criou conta nova) | Últimos itens da entrega da Opção 3 concluídos | Site 100% no ar no domínio próprio; falta só o contrato pra fechar o cliente | — |
| 2026-08-17 | Preço de renovação esclarecido: R$550 já cobre o 1º ano completo; a partir do 2º ano (~ago/2027), R$250/ano | Felipe confirmou depois de uma transcrição ambígua na sessão | Desbloqueia a geração do contrato | R$250/ano confirmado como valor oficial de manutenção recorrente |
| 2026-08-17 | Contrato `RV-2026-002` gerado — template oficial (HTML→PDF), sem CNPJ/CPF de nenhuma parte a pedido do Felipe, R$550 via PIX + renovação R$250/ano | Fecha a entrega da Opção 3 e formaliza o cliente | Cliente pronto pra liberar assim que o contrato for enviado e assinado | Investimento e datas conforme confirmado pelo Felipe na sessão |
