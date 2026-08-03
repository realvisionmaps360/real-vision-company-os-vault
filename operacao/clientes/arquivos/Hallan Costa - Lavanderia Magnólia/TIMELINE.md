# Hallan Costa — Lavanderia Magnólia — Linha do Tempo

> Dossiê completo em [[PROJETO]].

## 2026

### 12/07/2026 — Criação da pasta + Acordo de Parceria por Permuta
- Felipe trouxe o contexto: Hallan é amigo pessoal, dono da Lavanderia Magnólia (SBC), também designer e dono de lan house. Real Vision vai clonar uma landing page de referência de lavanderia ([lavobrasil.com.br/ilhabelasul](https://lavobrasil.com.br/ilhabelasul/)) para ele, em troca de 1.000 cartões de visita novos da Real Vision.
- Confirmado: a gráfica **não é do Hallan** — ele cria a arte (trabalho dele como designer) e terceiriza a impressão numa gráfica de confiança.
- Cliente já existia no VisionFlow (id `bedc91ac-8dee-40e8-9881-c9b3b36c474a`, status `lead`), mas sem pasta local — pasta criada agora como cliente novo.
- Discussão sobre justiça da troca: landing page cotada a partir de R$800; custo estimado dos cartões pro Felipe seria R$400-500 fora — decisão de não travar simetria perfeita de preço (é amigo, vai viajar com Felipe/Romana pra Suíça em breve), e sim proteger via **escopo escrito** da landing page (sem domínio, sem manutenção pós-entrega, sem suporte incluso por padrão).
- Documento "Acordo de Parceria por Permuta" produzido, reaproveitando o mecanismo visual da `proposta-comercial` (capa honeycomb, HTML autocontido), com 4 pontos deixados propositalmente em aberto para Felipe e Hallan decidirem juntos: especificação do cartão, data de entrega dos cartões, data de entrega da landing page, e política de pós-entrega (2 opções apresentadas, nenhuma pré-escolhida).
- **Correção:** documento inicial dizia "site institucional" por engano — corrigido para landing page em todos os documentos do cliente e regenerado o HTML.
- Arquivo: [[acordo-permuta-hallan-costa-2026-07-12]]

### 20/07/2026 — PRD escrito, briefing enviado e MVP da landing page codado
- PRD completo escrito em [[PRD-landing-page]]: objetivo, público, paleta extraída do logo, arquitetura de 11 seções, requisitos técnicos e riscos.
- Briefing enviado ao Hallan ([[briefing-hallan]]); dados coletados por Google Maps + Instagram enquanto ele não respondia (endereço, horário, avaliações 5.0★/23, diferenciais parciais).
- Hallan respondeu o restante nesta sessão: CNPJ, preços (R$17,90 lavagem / R$17,90 secagem, sem combo), formas de pagamento (débito, crédito, Pix QR code), confirmação do WhatsApp, autoatendimento total (30 min por ciclo), regras da loja (não lava tênis/tapete/roupa de pet), diferencial-chave para a headline ("bom e barato"), e 3 fotos reais da loja (fachada, parede de máquinas, mesa de dobra).
- **Mudança de stack:** PRD original previa Next.js; corrigido para **Vite + React + Tailwind** por ser a stack de todo o resto do portfólio de clientes RV (nenhum projeto Next.js existe no repositório) e por não haver ganho de SSR numa página única e estática.
- MVP codado do zero em `site/` (sem copiar nenhum template do repo — `site-template-rv-01` é o e-commerce do BrazilComp, sem relação com esta LP): Tailwind v4 com tokens de cor da paleta Magnólia, todas as 11 seções do PRD, conteúdo 100% real (sem placeholder) incluindo os 5 depoimentos do Google puxados via MCP com o texto completo, JSON-LD LocalBusiness com geo real (via place_id do Google Maps). `npm run build` limpo.
- Pendente: revisão visual do Felipe (ele testa localmente), deploy de preview na Vercel, e envio do link ao Hallan.

## Próximos passos
- Felipe revisa o MVP localmente (`npm run dev` em `site/`).
- Deploy de preview na Vercel.
- Enviar link de preview ao Hallan.
- Domínio: Hallan ainda não comprou — não bloqueia, conectar depois via subdomínio Vercel.
