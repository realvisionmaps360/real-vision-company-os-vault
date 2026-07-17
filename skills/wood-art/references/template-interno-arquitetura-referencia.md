# Wood Art — Referência Técnica: Template Interno Real Vision

> Base técnica para adaptação. Repo: `https://github.com/realvisionmaps360/brazilcomp-2-97cf7219`
> Extraído de `WOOD-ART-PROJETO.md` em 2026-07-08.

---

## O que é o Template Interno Real Vision
Projeto de site + painel administrativo desenvolvido como **arquitetura de referência interna da Real Vision** (repo `brazilcomp-2-97cf7219`). Arquitetura completa pronta para reaproveitamento em projetos de e-commerce com Mercado Pago + Correios + Supabase.

---

## Stack técnico (do repo)
- **Frontend:** React + TypeScript + Vite
- **Backend/DB:** Supabase (PostgreSQL + Auth + Storage)
- **Pagamentos:** Mercado Pago API (integração via API na conta do cliente)
- **Logística:** Correios API (cálculo de frete + rastreamento)
- **Admin:** Painel administrativo próprio (gestão produtos, estoque, pedidos, clientes)
- **Deploy:** Vercel

---

## Funcionalidades já implementadas (reaproveitáveis)
| Módulo | Status | Observação |
|--------|--------|------------|
| Autenticação (Supabase Auth) | ✅ | Login, registro, recuperação senha |
| Catálogo de produtos | ✅ | CRUD completo no admin |
| Gestão de estoque | ✅ | Controle de quantidade, variantes |
| Carrinho + Checkout | ✅ | Integração Mercado Pago |
| Cálculo de frete (Correios) | ✅ | API oficial, CEP + dimensões/peso |
| Painel admin (pedidos) | ✅ | Listagem, status, detalhes |
| Painel admin (clientes) | ✅ | Histórico, dados |
| Webhooks Mercado Pago | ✅ | Confirmação automática pagamento |
| SEO básico (meta tags, sitemap) | ✅ | |

---

## Adaptações NECESSÁRIAS para Wood Art
| Item | Descrição | Esforço |
|------|-----------|---------|
| **Configurador de placas personalizadas** | Feature NOVA — cliente escolhe tamanho, texto, fonte, visualiza preview, define gravação | **Alto** — core differentiator |
| **Catálogo/copy refeitos** | Produtos Wood Art (placas, tábuas) vs. template (peças industriais) | Médio |
| **Design system** | Cores, tipografia, identidade visual Wood Art | Médio |
| **Fluxo B2B (restaurantes)** | Orçamento rápido, pedido em volume, faturamento posterior | Médio-Baixo |
| **Integração produção interna** | App placas → sistema interno de produção (etiquetas, fila, status) | Médio |
| **Multi-loja?** | Wood Art + Usinagem (separadas ou unificadas?) | A decidir |

---

## Decisões pendentes (arquitetura)
1. **Monorepo vs. repos separados:** Um repo para Wood Art + Usinagem, ou dois deployments?
2. **Banco compartilhado:** Mesma instância Supabase (schemas separados) ou projects diferentes?
3. **Autenticação:** Cliente final (B2C) + Clientes B2B (restaurantes) + Admin William/equipe — roles diferentes
4. **Pagamentos:** Mercado Pago na conta do William (já tem conta) — webhook aponta para domínio Wood Art
5. **Domínio:** `woodart.com.br` (ou similar) — SSL, DNS, Vercel

---

## Próximos passos técnicos (quando escopo for aprovado)
1. **Clone do repo do Template Interno Real Vision** → novo repo `wood-art-ecommerce`
2. **Limpeza de código específico do template** (copy, imagens, configurações)
3. **Setup Supabase project** novo (ou schema no existente)
4. **Implementar configurador de placas** (MVP: tamanho + texto + preview canvas)
5. **Adaptar admin** para catálogo Wood Art + produção
6. **Testes de integração** Mercado Pago + Correios na conta William
7. **Deploy staging** → validação William → produção

---

## Riscos conhecidos
- Template foi feito para **peças industriais** (dimensões/peso padrão) — placas personalizadas têm **dimensões variáveis** → impacto no cálculo de frete
- Configurador precisa gerar **arquivo de produção** (vetor/imagem para gravação a laser/router) — não só dados do pedido
- William não tem equipe técnica — admin precisa ser **muito simples** (ou Real Vision gerencia)
- Supabase indisponível em 03/07/2026 — validar conexão antes de iniciar