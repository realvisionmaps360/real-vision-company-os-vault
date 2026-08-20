---
tipo: apoio
nome: Checklist
status: ativo
responsavel: "[[Felipe Garcia]]"
criado_em: 2026-08-13
atualizado_em: 2026-08-13
pertence_a: ["[[02-Projetos/vila-dos-corais/PROJETO]]"]
tags: [lbos/apoio]
---

# Checklist

O que falta fazer. Item concluído não se apaga, se marca.

## Favicon no Google (indexação)

- [x] Confirmar no código/site ao vivo que o favicon já é o customizado (coral, não o do Lovable) — confirmado 13/08/2026
- [x] Confirmar visualmente que o Google ainda mostra o ícone antigo do Lovable na busca (`site:viladoscorais.com.br`) — confirmado 13/08/2026, print salvo
- [x] **Causa raiz encontrada**: o domínio nunca foi migrado — DNS na Locaweb ainda apontava pro hosting do Lovable (`185.158.133.1`), o repo Vercel nunca recebeu tráfego real
- [x] Projeto criado na Vercel (`felipes-projects-26a2b9dd/site`) a partir do repo `realvisionmaps360/viladoscorais`, domínio `viladoscorais.com.br` adicionado ao projeto — 13/08/2026
- [x] Meta tag de verificação do Google Search Console adicionada ao `index.html` e publicada (commit `6d14fef`)
- [x] **Felipe**: trocar registro A na Locaweb de `185.158.133.1` para `76.76.21.21` (Vercel) — feito 13/08/2026, aguardando propagação
- [x] Depois da propagação: clicar em "Verificar" no Search Console (tag HTML já está no código) — concluído 14/08/2026, propriedade verificada
- [ ] Confirmar que o favicon novo aparece no `site:viladoscorais.com.br`

## Observações fora do pedido original (não mexer sem OK)

- [ ] `og:image` do `index.html` ainda aponta pro `lovable.dev/opengraph-image...` — afeta o preview ao compartilhar o link (WhatsApp, redes), não o favicon. Avisar Felipe antes de trocar.
- [ ] Só 1 página indexada no Google (`site:viladoscorais.com.br`) — verificar se é esperado (site de página única) ou se há mais páginas que deveriam estar indexadas.

## Prioridade 4 do handoff (17/08/2026) — formalização

- [x] Confirmar pacote contratado, data de início oficial e vigência de hospedagem — confirmado por Felipe 17/08/2026: início real 06/01/2026 (planejamento) / site pronto 20/02/2026; pacote = Website + Perfil Google + Instagram (R$2.900 total, R$700 ainda não lançado no VisionFlow). Registrado em `FICHA-CLIENTE.md` e `Vila-dos-Corais-TIMELINE.md`.
- [ ] Lançar manualmente no VisionFlow o pagamento de R$700 (inserção via SQL bloqueada pelo gatilho de auditoria — precisa ser o Felipe pela interface)
- [ ] Formalizar contrato — escopo confirmado (só os 3 itens entregues, sem os recorrentes da proposta original). Template em `operacao/comercial/CONTRATO-PRESTACAO-SERVICOS-TEMPLATE-v1.0-PT.md`. Falta o "pode gerar" explícito do Felipe antes de preencher a versão final.
- [x] Revisar Perfil da Empresa no Google — bloqueio do vídeo resolvido segundo Felipe (17/08/2026). Listagem confirmada ativa no Google Maps (5.0, 9 avaliações, telefone e site corretos).
- [ ] Confirmar itens finos do Perfil Google (post inicial, link de avaliação) — VisionFlow ainda mostra a entrega como "em_andamento", não atualizado.
- [x] Portfólio — Felipe decidiu 17/08/2026 não pedir autorização prévia da cliente (Termos §8.4 já cobre isso). Case escrito sem o nome pessoal dela, só "Vila dos Corais"/"a proprietária". Falta só o push pro repositório de produção (aprovação final do Felipe, regra do repo `real-vision-site`).

## Relacionados
- Pertence a: [[02-Projetos/vila-dos-corais/PROJETO]]
