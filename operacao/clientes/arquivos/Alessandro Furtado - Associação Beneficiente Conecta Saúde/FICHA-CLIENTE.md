---
title: Alessandro Furtado — Associação Beneficiente Conecta Saúde
tags:
  - cliente
  - recorrente
status: recorrente
data_inicio: 2026-01-21
servicos:
  - website
localizacao: São Bernardo do Campo, SP
contato: "11 97593-7196"
email: conectandosaude.a.b@gmail.com
---

# Alessandro Furtado — Associação Beneficiente Conecta Saúde

## Contexto

Alessandro Furtado é responsável pela Associação Beneficiente Conecta Saúde, em São Bernardo do Campo (SP). Endereço: Rua Assunção 132, Bairro Assunção.

## Serviços contratados

- **Website** (entregue) — site da associação

## Entregas realizadas

- **Website** — https://associacaoconectandosaude.com.br/ (entregue)

## Próximos passos

- [ ] Verificar satisfação com o site
- [ ] Oportunidade: Tour Virtual ou outros serviços complementares
- [ ] Confirmar propagação total do DNS (checar amanhã) e validar GA4 no domínio de produção
- [ ] Retomar definição do template do relatório mensal (Etapa 1) — só depois do GA4 confirmado em produção

## Observações

- Cliente recorrente — site ativo e entregue
- Mesma pasta duplicada com variação de nome

## Sessão 01/07/2026 — Migração Lovable → Vercel + ativação do GA4

**Contexto:** cliente pediu teste da integração de Google Analytics (propriedade GA4 "Conectando Saúde", `properties/537716669`) como passo 1 pra depois montar o template dos relatórios mensais atrasados (ver `RELATORIOS.md`).

**O que foi descoberto:**
- O site em produção (`associacaoconectandosaude.com.br`) estava hospedado no **Lovable** (não no Vercel, apesar do repo GitHub já sincronizado) — plano Pro do Lovable estava vencido, mas a conexão de domínio customizado continuava ativa
- Por isso a tag do GA4 nunca funcionou: o repositório do GitHub que o Felipe tinha não era o código publicado de fato

**O que foi feito:**
1. Repo clonado pra `site/` dentro desta pasta
2. Tag do GA4 (`G-TRKT4S82ZC`) adicionada em `site/index.html`
3. Commit e push pro GitHub (`realvisionmaps360/associacaoconectandosaudecombr`, branch `main`)
4. Projeto importado na Vercel (`felipes-projects-26a2b9dd/associacaoconectandosaudecombr`) — framework Vite auto-detectado
5. Testado em `associacaoconectandosaudecombr.vercel.app` — GA4 em tempo real confirmou 1 usuário ativo ✅
6. Domínio `associacaoconectandosaude.com.br` adicionado no projeto Vercel (sem redirect pra www, mantendo o padrão do domínio raiz)
7. DNS trocado na Locaweb (painel: `painel-dns.locaweb.com.br`) — registro **A**, nome **@** (mostrado como "."), valor trocado pra `216.198.79.1` (era `185.158.133.1`, IP do Lovable)

**Estado no fim da sessão (propagação em andamento):**
- Cloudflare (1.1.1.1) já resolve pro IP novo da Vercel ✅
- Google (8.8.8.8) ainda mostra o IP antigo do Lovable (cache, deve expirar em até ~1h — TTL da Locaweb é 3600s)
- Painel da Vercel ainda mostrava "Invalid Configuration" no fim da sessão (por causa do cache acima)

**Pendências pra retomar amanhã:**
- Confirmar que `nslookup associacaoconectandosaude.com.br` já resolve pro IP da Vercel em qualquer resolvedor
- Confirmar no painel da Vercel que o domínio virou "Valid Configuration"
- Rodar `run_realtime_report` (GA4) acessando o domínio de produção pra fechar o teste
- Só depois disso, seguir pra Etapa 1 (definição do template do relatório mensal)
