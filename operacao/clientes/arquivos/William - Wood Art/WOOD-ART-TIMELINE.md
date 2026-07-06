# Wood Art — Linha do Tempo do Projeto

> Dossiê completo em [[WOOD-ART-PROJETO]].

## 2026

### 03/07/2026 — Levantamento inicial das 11 frentes de trabalho
- Felipe trouxe o histórico completo do William: app de placas personalizadas, diagnóstico do site Wix atual, ideia de loja virtual própria reaproveitando a arquitetura do Brazilcomp, chatbot IA, prospecção de leads para restaurantes, tráfego pago, dados financeiros de ML/Shopee, Google Merchant Center, mercado suíço e linha de usinagem.
- William já existe no VisionFlow, mas o Supabase estava indisponível no momento — pasta criada como cliente novo, com pendência de reconciliar duplicata quando o banco voltar.
- Pasta do cliente criada com PROJETO, TIMELINE, FICHA-CLIENTE e doc de frentes de trabalho detalhado.
- Meta acordada: proposta comercial pronta → depois, versão em slides.

> A proposta comercial tem 2 entregas separadas: **1ª App de Placas** e **2ª Website**. Cuidado para não misturar as duas.

### 06/07/2026 — 1ª entrega: spec técnica + custos do App de Placas
- Analisadas as anotações do Felipe (`TEMP/woodart store will.md`) com o detalhamento das 11 frentes.
- Produzido o documento [[WOOD-ART-APP-PLACAS-SPEC]]: jornada do cliente, comparativo PWA × app nativo (recomendação: PWA), stack, integrações e custos.
- Valor-hora definido: R$120. Estimativa de desenvolvimento recalculada: 32h / R$3.840 — **total ainda pendente**, depende do escopo do configurador que o William vai confirmar.
- Valor mensal de manutenção a cobrar do William: R$150–300/mês (separado do custo único de dev). Domínio: a confirmar se se aplica.
- Objetivo desta fase reforçado: reunir informações para a proposta, sem iniciar construção.
- Próxima frente confirmada: 2ª entrega, o site próprio + clone Brazilcomp + relatório do Wix atual.

### 06/07/2026 — 2ª entrega: diagnóstico do site Wix + avaliação do Brazilcomp + pesquisa Wix
- Navegação ao vivo em woodartstore.com.br: confirmados 4 links de rodapé mortos, página de Contato com telefone/e-mail mock do template Wix (`(11) 3456-7890` / `info@meusite.com`), e uma página órfã do template ("Inquiry Services Page", em inglês, com fotos de stock genéricas) publicada no menu principal. Fotos de paisagismo/piscina desconexas do produto na seção "Clientes satisfeitos".
- Avaliada a arquitetura do Brazilcomp (repo do cliente Dorival): stack React/Vite/Supabase idêntica à usada hoje pela RV; ~70% da infra de e-commerce (cadastro, carrinho, frete, Mercado Pago, pedidos, admin) já pronta e reaproveitável. Falta apenas o configurador de personalização, catálogo/copy/fotos e integração com a produção física do William.
- **Pesquisa feita:** Felipe tinha dito ao William que ia estudar se o Wix já é avançado o bastante para dar conta de tudo sem migrar. Pesquisado o estado do Velo (backend do Wix), integração Mercado Pago e apps de configurador de produto. Confirmado: configurador simples até dá para existir via app de terceiro (Kickflip, Zakeke), mas o Wix tem banco de dados fechado (sem Postgres/MySQL nos planos básicos), backend com recursos travados (~400MB RAM, ~200 req/min), e a própria Wix está descontinuando pagamento server-to-server em 30/09/2026 — fecha a porta para o checkout controlado que o Brazilcomp já tem pronto. **Confirma a intuição do Felipe: não vale a pena tentar construir tudo dentro do Wix.**
- Documento produzido: [[WOOD-ART-SITE-DIAGNOSTICO]]. Conclusão: migração é tecnicamente viável e recomendável; decisão final (migrar vs. corrigir o Wix vs. não fazer nada) fica para o William, na proposta.

## Tempo investido

| Data | Sessão | Horas |
|---|---|---|
| 06/07/2026 | Spec técnica + custos do App de Placas | 1h |
| 06/07/2026 | Diagnóstico do site Wix + avaliação Brazilcomp | 1h |

## Próximos marcos
**1ª entrega (App):**
- Confirmar com o William o escopo do configurador (define horas/valor final do app)
- Confirmar se domínio próprio se aplica ou se ele usa o dele

**2ª entrega (Website):**
- Confirmar com o William: migrar para site próprio vs. corrigir o Wix atual vs. não fazer nada agora

**Geral:**
- Reconciliar duplicata no VisionFlow quando o Supabase voltar
- Montar a proposta comercial (skill `proposta-comercial`) — com as duas entregas como linhas separadas
- Gerar versão em slides da proposta aprovada (skill `frontend-slides`)
