# Wood Art — Diagnóstico do Site Atual (Wix) + Avaliação Brazilcomp

> Documento interno de diagnóstico. Base para a linha de item na proposta comercial.
> Cliente: William (Wood Art). Dossiê: [[WOOD-ART-PROJETO]] · Frentes: [[WOOD-ART-FRENTES-DE-TRABALHO]] · App de Placas: [[WOOD-ART-APP-PLACAS-SPEC]]
> Criado: 06/07/2026
> 🎯 **Objetivo desta fase:** reunir evidências reais do site atual e avaliar a viabilidade técnica de reaproveitar o Brazilcomp. Nenhuma construção começa ainda — decisão de migrar ou não é do William.

> ⚠️ **Este documento é a 2ª entrega da proposta ao William: o WEBSITE.** É separada da 1ª entrega, o **App de Placas Personalizadas** ([[WOOD-ART-APP-PLACAS-SPEC]]). São duas frentes distintas com escopo, horas e decisões próprias — não misturar as duas na hora de apresentar ou precificar. O app é a ferramenta de personalização/venda self-service; o website é a loja virtual própria que substitui (ou não) o Wix atual.

---

## 1. Site atual — woodartstore.com.br (Wix)

Navegação ao vivo feita em 06/07/2026. Achados confirmados com evidência (não é opinião solta):

### 1.1 Rodapé com links mortos
Os 4 links do rodapé (**Nossa história, Fale conosco, Políticas de Privacidade, Trocas e Devoluções**) não navegam para lugar nenhum — são texto estático, sem destino. Testado clique a clique, nenhum reage.

### 1.2 Página de contato com dados falsos (mock)
O item **CONTATO** do menu principal *funciona* tecnicamente (é uma página real, `/contact-10`), mas mostra dados de exemplo do template Wix, nunca preenchidos:
- Telefone: `(11) 3456-7890`
- Email: `info@meusite.com`

Ou seja: qualquer cliente que tentar ligar ou mandar e-mail pelo site cai em contato fictício. Isso é mais grave do que "informação faltando" — é informação errada publicada.

### 1.3 Página órfã do template, em inglês, no menu principal
O item de menu **"Inquiry Services Page"** (nome em inglês, destoando do resto do site em PT) leva a uma página inteira de template Wix nunca adaptada: título "Nossos serviços", 3 blocos genéricos de consultoria ("Projeto Personalizado", "Planejamento de Solução", "Pacote Orientação Especializada") com **fotos borradas/genéricas de stock**, sem nenhuma relação com placas de madeira. Está publicada e visível para qualquer visitante.

### 1.4 Imagens de stock desconexas do produto
Na seção "Clientes satisfeitos" da home, as imagens usadas são fotos de **paisagismo/arquitetura residencial** (piscina, jardim, varanda) — nada a ver com placas de madeira personalizadas. Aparenta ser imagem de banco de imagens genérica deixada pelo desenvolvedor anterior, nunca substituída pelas fotos reais do produto/cliente.

### 1.5 O que funciona bem (para não subestimar o que já existe)
- Catálogo de produtos com preços carrega normalmente (tábuas, placas, petisqueiras — 10+ itens visíveis).
- Identidade visual (logo, paleta madeira/dourado) está definida e é consistente nas páginas testadas.
- Rodapé mostra CNPJ e endereço reais da empresa (`51.320.796/0001-09`, Estrada Poney Club 1717, SBC/SP) — isso está correto, ao contrário do e-mail/telefone de contato.
- Navegação por categoria (Tábuas, Placas Rústicas) existe e filtra.

### 1.6 Leitura geral
O diagnóstico anterior ("desenvolvedor não terminou o trabalho") se confirma com evidência concreta: não é um site quebrado, é um site **publicado antes de terminar a revisão de conteúdo** — sobrou template genérico do Wix junto com conteúdo real do William. Isso prejudica a credibilidade de um negócio que hoje fatura ~R$250k/mês somando ML+Shopee (ver [[WOOD-ART-FRENTES-DE-TRABALHO]], item 7) — o site próprio é a vitrine que deveria sustentar esse volume, e hoje não sustenta.

---

## 2. Avaliação técnica — reaproveitamento do Brazilcomp

Repositório de referência: `github.com/realvisionmaps360/brazilcomp-2-97cf7219` (cliente Dorival).

### 2.1 Stack (confirmado via `package.json`)
React 18 + Vite + TypeScript + Tailwind + shadcn/ui (Radix) + Supabase (`@supabase/supabase-js`) + TanStack Query + i18next. Deploy via Vercel (`vercel.json` presente).

**Leitura:** é exatamente a stack que a Real Vision já usa em projetos recentes (Conecta Saúde, cartões digitais) — curva de adaptação baixa, sem tecnologia nova a aprender.

### 2.2 O que já está pronto e é reaproveitável (confirmado via `BRAZILCOMP-2.0-ARQUITETURA-LEGADO.md`)
- Cadastro/login (CPF/CNPJ, Google, recuperação de senha)
- Catálogo de produtos com busca, filtros e página de detalhe
- Carrinho persistente (visitante via localStorage, logado via banco) com merge automático no login
- Frete real via API (Frenet) com regra de frete grátis configurável
- Checkout completo com **Mercado Pago** (preferência de pagamento + webhook validado por HMAC + idempotência)
- Pedidos com linha do tempo de status (confirmado → pago → separando → enviado → entregue)
- E-mails transacionais via Resend (confirmação, envio, cancelamento)
- Painel admin com gestão de pedidos (mudança de status, código de rastreio)
- Suporte pós-venda (abertura de chamado vinculado ao pedido)

Isso é a base inteira de e-commerce que o William precisaria do zero — já construída, testada e rodando em produção para outro cliente.

### 2.3 O que falta construir especificamente para o William (não existe no Brazilcomp)
- **Configurador de placa personalizada** (o "brick" que falta — feature nova, é o coração do pedido do William)
- CRUD completo de produtos + gestão de estoque no painel admin (o Brazilcomp também ainda não tem isso pronto — está listado como pendência dele, ver seção "O que ainda NÃO existe" do doc de arquitetura)
- Todo o catálogo, copy, fotos e identidade visual — refeitos do zero para a marca Wood Art
- Integração com o processo de produção física da fábrica do William (ver [[WOOD-ART-APP-PLACAS-SPEC]], seção 7)

### 2.4 Conclusão da avaliação
**Tecnicamente viável e recomendável.** O Brazilcomp resolve ~70% da infraestrutura de e-commerce (conta, carrinho, frete, pagamento, pedido, admin) que o William precisaria pagar do zero. O trabalho real fica concentrado no que é específico da Wood Art: configurador de personalização, catálogo/copy/fotos, e conexão com a produção. Isso reduz a estimativa de horas do zero — mas **ainda não foi feita a estimativa de horas fechada desta frente** (fica para quando a proposta comercial for montada, junto com a decisão do William sobre migrar ou não do Wix).

---

## 3. Decisão pendente a levar ao William

A proposta comercial deve apresentar as opções, não decidir por ele:

1. **Migrar totalmente para site próprio** (reaproveitando arquitetura Brazilcomp) — resolve taxa de 1% do Wix, dá controle total, mas exige desenvolvimento e catálogo novos.
2. **Melhorias pontuais no Wix atual** — corrige o crítico (contato mock, links mortos, remover página órfã, trocar fotos de stock) sem migrar. Mais barato e rápido, mas mantém a limitação técnica do Wix (sem gateway próprio, taxas, menos controle).
3. **Não fazer nada agora** — opção do William, deve estar na mesa.

Nenhuma dessas ainda está decidida. Este documento existe para embasar a proposta, não para fechar escopo.

---

## Próximo passo

Com este diagnóstico e a spec do app de placas prontos, os dois documentos alimentam a **proposta comercial** (skill `proposta-comercial`). Antes de montar a proposta, confirmar com o William:
- Escopo do configurador do app (pendente, ver [[WOOD-ART-APP-PLACAS-SPEC]])
- Preferência entre migrar o site ou só corrigir o Wix atual (opções da seção 3 acima)
