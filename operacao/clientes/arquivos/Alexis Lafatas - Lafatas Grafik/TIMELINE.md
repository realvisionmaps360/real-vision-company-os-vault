# Timeline — Alexis Lafatas / Lafatas Photography & Print

> Dados do cliente e proposta: [[BRIEFING]]

**Status atual:** ✅ Cliente ativo — aguardando credenciais de acesso
**Orçamento aprovado:** CHF 300 (24/06/2026)
**Meta:** Site Wix 100% otimizado para SEO local em Aarau

---

## Histórico

| Data | Evento |
|---|---|
| 27/05/2026 | Cliente criado no VisionFlow — status: prospecção |
| 28/05/2026 | Contato inicial via formulário do site pelo Felipe |
| 31/05/2026 | Alexis responde via WhatsApp — interesse em SEO/Google; não quer mexer no design |
| 31/05/2026 | Felipe analisa necessidades e prepara resposta |
| 02/06/2026 | Alexis levanta preocupação com privacidade (GBP e Drive no mesmo Google) |
| 02/06/2026 | Felipe explica: acesso apenas como Manager do GBP, sem acesso ao Drive |
| 04/06/2026 | Alexis confirma: link do GBP está correto ✅ |
| 11/06/2026 | Proposta montada em HTML (capa colmeia clara, alemão) |
| 24/06/2026 | Alexis aceita via áudio WhatsApp (via Romana) — CHF 300 (arredondou de CHF 275) ✅ |
| 24/06/2026 | Status atualizado: prospecção → cliente ativo |
| 25/06/2026 | Auditoria técnica do site via Playwright — lista de problemas documentada |
| 25/06/2026 | Pasta do cliente organizada — subpastas assets/, docs/, entregaveis/ |
| 25/06/2026 | Wix MCP instalado no Claude Code (gratuito, oficial da Wix) |
| 25/06/2026 | Skill `rv-lafatas` criada — gerencia todo o projeto, auto-melhora a cada sessão |
| 25/06/2026 | Workflow revisado: Arvow (pago) substituído por Wix MCP gratuito para o escopo contratado |
| 27/06/2026 | Alexis confirma acesso a todas as plataformas via WhatsApp ✅ |
| 27/06/2026 | Estratégia atualizada: novos públicos-alvo confirmados pelo cliente (hotéis, arquitetura, imobiliário) |
| 27/06/2026 | Decisão: criar variante da página /clients como bônus para o cliente |
| 04/07/2026 | Romana revisou o alemão do relatório (tom "du", correções gramaticais) — comparado ao original, achado: seção de Schema/GEO estava tecnicamente imprecisa |
| 04/07/2026 | Felipe ativou a foto 360° aérea de Aarau no perfil GBP (era o único item pendente da lista de próximos passos) |
| 04/07/2026 | Relatórios finais regerados (DE + PT-BR): seção GEO reescrita com precisão (llms.txt, NLWeb/ASK, IndexNow explicados em linguagem simples) + nova seção com prints antes/depois da foto 360° no perfil; versões antigas (28-06 e 02-07, HTML+PDF) apagadas — mantidos só `Lafatas_Bericht-SEO_04-07-26.html` (DE) e `Lafatas_Relatorio-SEO_04-07-26.html` (PT-BR) |
| 04/07/2026 | Rodada 2 de ajustes no relatório (mesmos 2 arquivos, patch via script Python direto no HTML já finalizado): (1) H1 da seção 02 trocado por 2 prints lado a lado mostrando a decisão de deixar o H1 em branco/invisível (preserva visual, funciona pro Google); (2) todas as imagens do documento reduzidas (`.shot-img` max 480px, `.compare-photos` max 260px/coluna); (3) print do perfil GBP trocado pela imagem correta enviada pelo Felipe; (4) lista "o que organizamos no perfil" virou grid com ticks (mais destaque); (5) título da seção GEO trocado de "o que foi feito de verdade" (linguagem interna) para "como sua empresa aparece para as inteligências artificiais" (client-facing); (6) bloco final do Google Merchant Center removido e substituído por aviso ⚠️ sobre lock-in do Wix — conteúdo do Merchant Center preservado em [docs/proximos-passos-pendente.md](docs/proximos-passos-pendente.md) para entrar num documento futuro de expansão |
| 04/07/2026 | Rodada 3 (ajuste fino de tamanho): comparação antes/depois (H1, 360°) aumentada 30% (260px→338px); prints de página inteira (Search Console, Analytics) ganharam classe nova `.shot-img.wide`, 25% maiores (480px→600px); item "Monitoramento mensal" ganhou frase sobre migrar pra plataforma própria no futuro. Felipe travou esses 3 tamanhos como padrão definitivo pra todo relatório novo — regra salva em [[feedback_rv_relatorio_tamanhos_imagem]] e embutida no `template.html` da skill `rv-relatorio`; este documento agora é a referência oficial citada no SKILL.md |
| 04/07/2026 | Teste de publicação de foto 360° (`aarau 360.jpg`) no GBP via desktop — Fotos → Adicionar fotos → Selecionar imagens e vídeos (upload genérico, sem botão dedicado "Foto 360°" pelo navegador). ✅ Confirmado: foto aprovada e navegável em esfera após ~5min de revisão |
| 04/07/2026 | Documento novo criado: **"Próximo Passo — Conteúdo & Site Próprio"** (`docs/proximos-passos-blog-PT-BR.html`), só versão PT-BR por enquanto — aguardando validação do Felipe antes de gerar a versão DE. Conteúdo: (1) metodologia de conteúdo por intenção de busca (o que é/pra que serve/como funciona) com 5 perguntas reais já pesquisadas em alemão via pipeline próprio (Google Autocomplete); (2) explicação do conceito de lock-in, retomando a isca já plantada no relatório anterior (linha 238 do Bericht 04-07); (3) bloco de Google Merchant Center reaproveitado de `docs/proximos-passos-pendente.md`; (4) oferta em duas opções: CHF 400 (blog dentro do Wix) ou CHF 500 (site próprio + hospedagem RV no 1º ano + blog), ambas com os mesmos 5 primeiros artigos. HTML reaproveita exatamente o CSS/JS de `entregaveis/lafatas-proposta.html`, corrigido para usar o padrão `hive-source` (evita o bug de capa não embutida). |

---

## Próximas Etapas

### 🔑 Pré-execução ✅ CONCLUÍDA (27/06/2026)

| # | Ação | Responsável | Status |
|---|---|---|---|
| 1 | Enviar mensagem WhatsApp pedindo acesso Wix + GBP + confirmar Search Console/Analytics | Felipe | ✅ Feito |
| 2 | Alexis adiciona Felipe como colaborador no Wix | Alexis | ✅ Feito |
| 3 | Alexis adiciona Felipe como Manager no Google Business | Alexis | ✅ Feito |
| 4 | Confirmar status do Search Console e Analytics | Alexis | ✅ Feito |

### ⚙️ Fase 1 — On-Page SEO Wix (Est. 2–3 dias após acesso)

| # | Tarefa | Prioridade |
|---|---|---|
| 1 | Adicionar H1 em todas as 5 páginas | CRÍTICO |
| 2 | Corrigir o JSON-LD (zero-width space + `&amp;`) | CRÍTICO |
| 3 | Adicionar og:image | CRÍTICO |
| 4 | Escrever meta descriptions para /offer, /store, /about, /clients | ALTA |
| 5 | Adicionar alt text descritivo em todas as imagens da galeria | ALTA |
| 6 | Corrigir link do LinkedIn (aponta para /admin/dashboard/) | ALTA |
| 7 | Otimizar títulos das subpáginas com keywords em alemão | MÉDIA |
| 8 | Corrigir email de `(at)` para `mailto:` | MÉDIA |

### 📍 Fase 2 — Google Business Profile (Est. 1–2 dias)

| # | Tarefa |
|---|---|
| 1 | Otimizar categorias e subcategorias |
| 2 | Reescrever descrição do perfil com keywords locais |
| 3 | Atualizar horários e informações de contato |
| 4 | Adicionar WhatsApp button |
| 5 | Ativar funções novas do perfil (produtos, serviços, posts) |

### 📊 Fase 3 — Search Console + Analytics (Est. 1 dia)

| # | Tarefa |
|---|---|
| 1 | Instalar Google Analytics 4 no Wix |
| 2 | Verificar site no Google Search Console |
| 3 | Submeter sitemap.xml |
| 4 | Configurar relatórios básicos |

### 🤖 Fase 4 — Schema.org + GEO (Est. 1–2 dias)

| # | Tarefa |
|---|---|
| 1 | Corrigir JSON-LD existente (já identificado na auditoria) |
| 2 | Adicionar markup Photography + PrintShop |
| 3 | GEO: preparar conteúdo para indexação em IAs (ChatGPT, Gemini, Perplexity) |

### 🎓 Entrega Final

| # | Tarefa |
|---|---|
| 1 | Gerar relatório PDF com todas as mudanças realizadas |
| 2 | Sessão de entrega: mostrar ao Alexis como ler o Google Analytics |
| 3 | Receber 2ª parcela: CHF 150 |
| 4 | Atualizar VisionFlow: status → Entregue |

---

## Arquivos do Projeto

```
Alexis Lafatas - Lafatas Grafik/
├── BRIEFING.md          ← dados do cliente, análise, proposta
├── TIMELINE.md          ← este arquivo
├── assets/              ← imagens e logos
│   ├── _cover.png
│   ├── _preview.png
│   ├── aare.png
│   ├── lafatas imagem capa.png
│   ├── lafatas360.png
│   ├── mark.png
│   ├── rv-logo-black.png
│   ├── rv-logo-white.png
│   └── visionflow.png
├── docs/
│   └── Alexis Lafatas PLAN.md   ← transcrição vídeo Arvow SEO workflow
└── entregaveis/
    └── rv lafatas angebot.pdf   ← proposta enviada ao cliente
```

---

## Auditoria do Site (25/06/2026)

**Plataforma:** Wix | **URL:** https://www.lafatas.ch/

### Problemas Críticos
- Nenhuma página tem H1
- og:image ausente (sem preview ao compartilhar)
- JSON-LD com bug: zero-width space no nome + `&amp;` no lugar de `&`

### Problemas Importantes
- Meta descriptions ausentes em /offer, /store, /about, /clients
- ~50% das imagens sem alt text (galeria principal)
- Hierarquia de headings inconsistente (usa H5, H6 sem H1)
- Link do LinkedIn aponta para `/admin/dashboard/` — URL quebrada
- Email em formato `(at)` — não reconhecido como mailto

### O que já existe (positivo)
- Structured Data (LocalBusiness + WebSite) — presente, mas com bug
- Canonical tag correta
- OG tags básicas presentes
- Twitter Card configurado
- HTML lang="de" correto
- Imagens em AVIF/WEBP (otimizadas)
- Robots: index (correto)
