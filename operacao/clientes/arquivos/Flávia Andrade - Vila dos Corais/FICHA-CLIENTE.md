---
title: Flávia Andrade — Vila dos Corais
tags:
  - cliente
  - ativo
status: ativo
data_inicio: 2026-01-06
servicos: [Site Institucional, Perfil Google Meu Negócio, Instagram]
---

# Flávia Andrade — Vila dos Corais

Timeline: [[Vila-dos-Corais-TIMELINE]]

## Contexto
A cliente possui a Casa Estrela do Mar, uma casa dela dentro do Condomínio Vila dos Corais, em Algodões, Península de Maraú, Bahia. Ela não tinha site nem qualquer presença digital estruturada quando procurou a Real Vision — o site institucional (`viladoscorais.com.br`) foi **construído do zero pela Real Vision** (usando Lovable/React como ferramenta de criação), deploy na Vercel, domínio registrado na Locaweb. Repo local em `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/site/`.

**Correção registrada em 17/08/2026:** uma versão anterior deste documento e do case de portfólio descreveu o projeto como "resgate de um site quebrado pré-existente" — isso está errado. O site nasceu com a Real Vision; o que foi corrigido em 13-14/08/2026 foi um problema técnico de hospedagem (domínio nunca apontado pro Vercel), não a origem do projeto.

## Serviços contratados
Pacote confirmado por Felipe em 17/08/2026 (primeira etapa da proposta, os demais itens da proposta — tráfego pago, gestão recorrente — não foram contratados):
- **Website Institucional** — R$1.300 (proposta em `Porposta Comercial Flávia Andrade 2 (1).pdf`). Não é um site institucional simples — inclui:
  - Calculadora de reservas na home (datas, hóspedes, valor por sazonalidade), estilo Airbnb
  - Checkout via WhatsApp: ao confirmar as datas, redireciona pro WhatsApp da cliente com mensagem pré-preenchida (datas, hóspedes, valor) — sem intermediário, sem taxa de plataforma
  - Painel administrativo protegido por login (`/secure`, e-mail exclusivo da cliente) — ela abre/fecha datas e ajusta preços por sazonalidade sozinha
  - Fotos profissionais da casa: Real Vision coordenou com fotógrafo local (cliente não mora na propriedade)
- Perfil Google Meu Negócio — R$300
- Instagram — R$600
- **Total: R$2.900** — R$1.200 pago 09/01/2026 + R$1.000 pago 10/03/2026 (registrados no VisionFlow) + R$700 cobrados em 13-14/07/2026 e confirmados como pagos por Felipe em 17/08/2026 (ainda **não lançado no VisionFlow** — inserção direta via SQL bloqueada pelo gatilho de auditoria, precisa ser lançado manualmente na interface).

## Entregas realizadas
- **20/02/2026** — Site pronto (conversa e planejamento começaram em 06/01/2026, data confirmada por Felipe como início real do projeto).
- **14/08/2026** — Verificação da propriedade `viladoscorais.com.br` no Google Search Console concluída (método Tag HTML). Causa raiz do bloqueio anterior: certificado SSL do domínio na Vercel estava "Failed To Generate Cert" (timeout na checagem de CAA via nameservers da Locaweb) — resolveu sozinho após um refresh/retry da Vercel, sem precisar trocar nameservers.
- **14/08/2026** — `sitemap.xml` criado e publicado no site (`public/sitemap.xml`, só a rota `/`), enviado no Search Console (conta `smarthomefg@gmail.com`, status "Processado") e indexação da home solicitada manualmente via Inspeção de URL.
- **14/08/2026** — GA4 instalado do zero: propriedade "Vila dos Corais" criada na conta `realvisionmaps360@gmail.com` (measurement ID `G-8P07EHPVYR`), tag `gtag.js` adicionada no `index.html` do site, deploy confirmado em produção.
- **17/08/2026** — Perfil Google Meu Negócio: bloqueio do vídeo de verificação no local (Flávia nunca ia até a propriedade) foi resolvido, segundo Felipe. Listagem confirmada ativa no Google Maps (5.0, 9 avaliações, telefone e site corretos) — falta confirmar quais itens do escopo original (post inicial, link de avaliação, categorias) já foram finalizados.
- **17/08/2026** — Página de avaliação criada (`Vila-dos-Corais-Avaliacoes.html`, na pasta da cliente): link direto de avaliação do Google + QR code + botão de copiar, pra Felipe/cliente mandar pros hóspedes.
- **17/08/2026** — Case de portfólio da Real Vision escrito (local, pendente push pro site em produção) e rascunho do contrato de prestação de serviços gerado em HTML.
- **19/08/2026** — Case publicado no portfólio do site em produção (`realvisionmaps.com/portfolio/vila-dos-corais`). Imagens convertidas pra WebP antes do commit (redução de ~70% no peso). Build e preview local testados sem erro antes do push. Commit `7a4ccaf` no repo `real-vision-core`, branch `main` — Vercel faz deploy automático.

## Próximos passos
- Site: nenhum pendente técnico (sitemap, indexação e GA4 concluídos).
- Lançar manualmente no VisionFlow o pagamento de R$700 confirmado por Felipe (ver `## Serviços contratados`).
- Finalizar os itens restantes do Perfil Google Meu Negócio (ver acima) — VisionFlow ainda mostra a entrega como "em_andamento".
- Formalizar contrato de prestação de serviços — rascunho gerado em 17/08/2026 (`ViladosCorais_Contrato_17-08-26.html`), falta preencher CNPJ/endereço/representante da Real Vision e confirmar o número do contrato.
- Portfólio da Real Vision: Felipe decidiu em 17/08/2026 **não pedir autorização prévia da cliente** — os Termos e Condições Gerais (cláusula 8.4) já cobrem isso ("Real Vision poderá exibir projetos concluídos... salvo proibição expressa por escrito do Cliente"). Regra fixada: **nunca expor o nome pessoal da cliente** em material público (portfólio, case, redes) — usar só "Vila dos Corais" / "a proprietária". **Case publicado em 19/08/2026** — item concluído.

## Tráfego pago (em aberto, 18/08/2026)
Cliente ativou sozinha uma Campanha Inteligente (Smart Campaign) dentro do Perfil da Empresa, com R$200 de orçamento, e perguntou pro Felipe qual o próximo passo — ela já queria fazer tráfego pago desde o início. Pesquisa completa (o que é o produto, por que o Google está descontinuando criação de campanhas novas desse tipo, como a Real Vision assumiria a gestão) em [[LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa]]. Nada foi executado — decisão fica pra sessão "corais 2".

## Visão de futuro
Felipe quer manter isso registrado para retomar depois: o sistema (calculadora de reservas + WhatsApp + painel próprio) foi construído pensando em crescer — a cliente é dona de só uma casa (Casa Estrela do Mar) dentro do Condomínio Vila dos Corais, mas a estrutura permite no futuro replicar o mesmo sistema pros donos das outras casas do condomínio, cada um virando cliente Real Vision com o mesmo modelo integrado.

## Observações
- Stack do site: deploy Vercel + domínio Locaweb (NS: ns1/ns2/ns3.locaweb.com.br) — **não é Hostinger nem Cloudflare**, não sugerir troca de provedor sem necessidade real.
- Sem MX/TXT configurados no domínio hoje — nenhum email depende do DNS atual.
- Search Console desse cliente está na conta Google `smarthomefg@gmail.com`; o GA4 está na `realvisionmaps360@gmail.com` — contas diferentes.
- `data_inicio` corrigido em 17/08/2026: estava `2026-06-16` (data de um PDF de situação enviado à cliente, não o início real), corrigido para `2026-01-06` conforme confirmado por Felipe.
