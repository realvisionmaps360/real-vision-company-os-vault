---
name: rv-relatorio
description: Gera relatórios e documentos de cliente da Real Vision em HTML (documento final, não PDF) com identidade da marca e capa no estilo honeycomb (colmeia mascarando uma foto). Use SEMPRE que o Felipe pedir relatório de cliente, relatório de status, documento de alinhamento, relatório de projeto, "monta um relatório", "documento pro cliente X", ou apresentar status/andamento de um projeto a um cliente. **TAMBÉM serve para proposta comercial** — a arquitetura HTML (capa honeycomb, miolo, identidade, finalize.ps1) é a mesma; só muda o conteúdo e o tipo no nome do arquivo (`*_Proposta_<DD-MM-AA>.html`). NÃO usar para arte solta/pôster (use canvas-design).
---

# RV Relatório — Gerador de relatórios de cliente e propostas comerciais

Skill para produzir documentos de cliente da Real Vision (relatórios de status, alinhamento de projeto, prestação de contas, **propostas comerciais**) em **HTML** — scroll contínuo, sem paginação de papel — com a identidade da marca e a **capa honeycomb** (colmeia de hexágonos mascarando uma foto do cliente). O HTML é o documento final entregue ao cliente (anexo de email), não um PDF.

> ⚠️ **OBRIGATÓRIO:** carregar esta skill SEMPRE que o Felipe pedir proposta comercial. O template honeycomb (capa, miolo claro, identidade RV) é o padrão oficial — não gerar proposta sem ele. Carregue junto com `proposta-comercial` (que define o conteúdo/estrutura) e `realvision` primeiro.

> Primeiro ative `realvision` (regra: carregar o contexto da empresa antes de skills de negócio). Idioma sempre PT-BR.

## Princípios

- **O Felipe dita o conteúdo na hora.** Não invente dados, números, datas ou status — use só o que ele passar ou o que estiver na pasta do cliente.
- **Lê a pasta do cliente se houver** material (`TIMELINE.md`, relatórios anteriores), mas **não depende disso**. Se a pasta estiver vazia ou não existir, segue só com o que o Felipe ditar.
- **Texto do Felipe é intocável.** Formate, organize e dê design — mas não reescreva o conteúdo dele.
- **HTML direto.** Monte o HTML e finalize (embuta as imagens) imediatamente — **sem gerar PNG de preview**, isso consome tokens desnecessários. O Felipe abre o HTML no navegador e pede ajustes se precisar.

## Identidade visual (fonte: `contexto/DESIGN.md`)

- Amber `#F5A623` (accent) · BG escuro `#0a0d14` · texto escuro `#1a1d24` no miolo claro.
- Fontes: **Bebas Neue** (títulos), **Inter** (corpo), **JetBrains Mono** (labels) — via Google Fonts.

### Logos — padrão definitivo (atualizado 16/06/2026)

| Posição | Arquivo | Obs |
|---|---|---|
| Capa clara (Cover B) | `rv-logo-black.png` | |
| Capa escura (Cover A) | `rv-logo-white.png` | |
| Run-head — símbolo no topo de cada seção interna (fundo branco) | `mark.png` + CSS `filter:brightness(0)` | O mark.png é claro — **obrigatório** aplicar `filter:brightness(0)` no `<img>` para ficar preto e visível no fundo branco |

> **Regra:** nunca usar logo claro/branco em página de fundo branco. Sempre garantir contraste.

### Email em documentos de cliente

Sempre `adm@realvisionmaps.com` — nunca o Gmail.

## As duas capas (o Felipe escolhe por relatório)

| Capa | Render | Quando |
|---|---|---|
| **A — escura + âmbar** | `cover=a` | Documento premium/impactante, identidade RV forte. Gasta tinta na impressão. |
| **B — clara** | `cover=b` | Sóbrio, econômico pra impressão, fiel ao estilo "honeycomb" clássico. |

O miolo (seções internas) é sempre claro (fundo branco, texto escuro, realces âmbar) — leitura fácil, qualquer que seja a capa.

## Prints/evidências visuais no relatório (a partir de 30/06/2026)

Cada mudança relevante feita no site do cliente deve vir acompanhada de print (antes/depois, ou só depois quando não houver antes) — reduz texto técnico e deixa o resultado visualmente claro. Regra prática: 1-2 prints por bloco, não uma galeria. Prioriza o que o cliente **vê**, não o que ele teria que entender tecnicamente.

O que printar, por tipo de entrega comum na Real Vision:
- **SEO on-page** (H1, meta title/description): print do resultado aparecendo no Google (título azul + descrição cinza), não o código.
- **Google Business Profile**: print do card do perfil no Google Maps/busca, antes e depois.
- **Avaliações**: print da avaliação publicada.
- **Analytics**: print do gráfico de visitas/usuários do período (ver seção de baseline abaixo).
- **Correções técnicas** (JSON-LD, noindex, sitemap): print do resultado visível (ex. página indexada no Search Console), evitar print de código puro.
- **Site redesenhado/nova seção**: print da página nova, lado a lado com a antiga se existir.

## Analytics — baseline antes/depois

Sempre que o site do cliente já tiver GA4 rodando há tempo, puxar (via MCP `google-analytics`, quando houver acesso à conta do cliente) o histórico de antes das mudanças como baseline, e registrar num documento na pasta do cliente (ex. `docs/analytics-baseline-<mes>.md`). Isso vira a base de comparação nos relatórios seguintes (mensal ou a cada entrega), para mostrar ao cliente se o investimento valeu a pena. Se o MCP não tiver acesso à conta Google do cliente (comum quando o GA4 foi criado na conta pessoal dele), registrar isso como pendência e pedir acesso de leitura antes de reportar números.

## Linguagem técnica — metodologia flexível

Ao explicar termos técnicos no relatório (H1, meta title/description, index/noindex, etc.), não existe regra fixa de "sempre traduzir" ou "sempre esconder o termo". Julgar caso a caso:
- Às vezes usar o termo técnico junto com uma explicação breve (ex.: "H1 — o título principal que o Google e os visitantes veem primeiro").
- Às vezes omitir o termo totalmente, só explicando o efeito prático, quando isso facilita mais.
- Quando o termo ajudar o cliente a reter conhecimento (filosofia RV de "educar aos poucos"), usá-lo mesmo assim, com a explicação ao lado.
- Critério: o que deixa mais claro e fácil de absorver, não repetir sempre a mesma fórmula.

## Relatório mensal (quando o cliente tem plano mensal)

Se o cliente tiver ou puder fechar um plano mensal com a Real Vision, deixar explícito no fechamento do relatório que a Real Vision pode enviar mensalmente um relatório com os dados do Analytics, caso ele feche esse plano. Vira frase padrão no encerramento de relatórios de entrega.

## Analytics/Search Console recém-conectados — não fabricar "evolução"

Se o GA4 ou o Search Console do cliente foram conectados há poucos dias (comum em Fase 1 de projeto novo), os primeiros números são só o dia 1 — não existe "antes/depois" real ainda. Verificar isso **antes** de decidir se mostra números no relatório: puxar o histórico completo (custom date range desde antes da criação da property) e comparar com a data em que os dados começam a aparecer no gráfico. Se for tudo recente, deixar isso explícito pro cliente em vez de apresentar números que pareçam um resultado ("a partir daqui começamos a medir — o valor real vem da comparação mês a mês"), e — se o Felipe decidir que não vale apresentar números ainda — registrar a baseline só internamente (`docs/analytics-baseline-<mes>.md`), não no HTML entregue ao cliente.

## Puxar dados ao vivo do Analytics/Search Console do cliente

Quando o MCP `google-analytics` não enxerga a property do cliente (comum quando o GA4 foi criado na conta pessoal dele — ver seção de baseline acima), mas o Felipe está logado com uma conta que tem acesso pelo navegador dele, dá pra puxar os números **ao vivo, via Chrome MCP** (`mcp__claude-in-chrome__*`): navegar até `analytics.google.com`, ajustar o seletor de período pra um range customizado que cubra desde antes da criação da property, e ler a tabela do relatório (ex. "Aquisição de usuários", "Aquisição de tráfego") com `get_page_text`. Não existe MCP de Search Console instalado no ambiente — se precisar do histórico de lá, pedir export manual ao Felipe (`Exportar → CSV/Planilhas` dentro do Search Console, aba Desempenho) e ler o `.xlsx` com `openpyxl` (`pip install openpyxl` se não estiver instalado). Existem MCPs de terceiros pra Search Console (`ahonn/mcp-server-gsc`, `AminForou/mcp-gsc`) — candidatos a instalar no futuro se a Real Vision tiver acesso de leitura recorrente às contas dos clientes (ver `rv-novo-cliente`).

## Editando um relatório HTML já finalizado (arquivo grande, imagens em base64)

Um relatório já finalizado pelo `finalize.ps1` costuma passar de 1MB (imagens embutidas em base64 numa linha só) — os tools `Read`/`Edit` têm limite de tamanho de arquivo/linha e travam nele. Nesses casos, editar via **script Python**, não via Read/Edit:
1. Localizar o texto exato a trocar com `Grep` (contexto suficiente pra ser único no arquivo).
2. Escrever um script em `TEMP/` que faz `html.count(old) == 1` antes de substituir (nunca substituir sem checar unicidade — evita trocar o trecho errado num arquivo grande).
3. Pra embutir uma imagem nova nessa hora, ler o arquivo com `base64.b64encode`, sem depender do `finalize.ps1` (que é feito pra rodar uma vez só, na montagem inicial).
4. Rodar com `python "TEMP\<script>.py"` (Windows já tem Python 3.14 instalado, comando é `python`, não `python3`).
5. Apagar o script de `TEMP/` depois de confirmar que a edição funcionou.

## Conferir o HTML no navegador antes de aprovar mudança visual

Abrir o arquivo local direto (`file://...`) não funciona nem pelo Chrome MCP (a extensão bloqueia acesso a `file://`) nem pelo Playwright MCP (protocolo bloqueado por padrão). Solução: subir um servidor estático rápido na pasta do cliente (`python -m http.server <porta>`, em background) e navegar até `http://localhost:<porta>/<arquivo>.html` pelo Chrome MCP — aí sim dá pra usar `find`/`scroll_to`/`screenshot` normalmente. Derrubar o servidor (`pkill -f "http.server <porta>"`) depois de conferir.

## Tamanhos de imagem por tipo de print (padrão travado em 04/07/2026)

Depois de duas rodadas de ajuste no relatório do Lafatas, o Felipe travou os tamanhos abaixo como padrão para todo relatório novo — não reabrir essa discussão a cada vez, só aplicar:

- **Print recortado só no card/perfil** (ex.: card do perfil do Google Meu Negócio, um elemento específico da tela, não a página inteira): `.shot-img` padrão, `max-width:480px`. É o tamanho certo para esse tipo de captura — não aumentar.
- **Print de página inteira** (ex.: painel completo do Google Search Console, painel completo do Google Analytics): usar `class="shot-img wide"` (`max-width:600px`, 25% maior que o padrão) — o conteúdo é mais denso, precisa de mais espaço para ficar legível.
- **Comparação antes/depois lado a lado** (`.compare-photos`): cada figura em `max-width:338px` (30% maior que a primeira versão testada, 260px).

Essas 3 regras já estão no CSS de `assets/template.html`. Ao montar um novo relatório, escolher a classe certa por tipo de print — não usar `.shot-img` simples para uma captura de página inteira nem `wide` para um recorte pequeno.

## Logo/imagem pequena ao lado de texto num callout

Nunca espremer uma imagem/logo em tamanho de ícone (~24-26px) do lado de um título — fica desproporcional e malfeito. Quando um callout precisar de logo + texto lado a lado, usar layout de duas colunas com `display:flex`: a imagem com largura fixa proporcional ao conteúdo dela (~180-220px pra um logo horizontal), o texto fluido ocupando o resto (`flex:1`), e `align-items:center` pra alinhar verticalmente. Sempre conferir o resultado renderizado (ver seção acima) antes de considerar pronto — não aprovar só pela leitura do HTML.

## Fluxo

1. **Ativar `realvision`** e identificar o cliente.
2. **Localizar/criar a pasta** do cliente em `operacao/clientes/arquivos/<Cliente>/`. Se houver `TIMELINE.md` ou relatórios antigos, ler pra contexto.
3. **Coletar o conteúdo** (ditado pelo Felipe). Confirmar o que vai no documento.
4. **Imagem de capa:** pedir/confirmar a foto do cliente (ex.: tour 360, fachada, tiny-planet). Salvar na pasta do cliente (ex.: `<cliente>360.png`).
5. **Montar o HTML no scratchpad da sessão** (nunca direto na pasta do cliente — o rascunho é intermediário técnico até ser finalizado). Usar `assets/template.html` como base: apagar a capa que não for usada (A ou B), montar as seções copiando os blocos da paleta de componentes, e trocar cada `<img src="nome-do-print.png">`/placeholder pelo print real quando o Felipe tiver a imagem. Os `<img>` de logo/mark/capa ficam com caminho relativo (`rv-logo-white.png`, `mark.png`, `{{COVER_IMAGE}}`) nessa etapa — mais fácil de conferir no navegador. **Atenção:** no run-head de cada seção, o mark.png já vem com `filter:brightness(0)` no template — não remover. **Atenção 2:** troque `{{COVER_IMAGE}}` na tag `<img id="hive-source">` logo após `<body>` — não mexa no script da colmeia, ele lê o `src` já embutido dessa tag em vez de um caminho de arquivo dentro do JS. Isso é obrigatório: `finalize.ps1` só embute imagens em atributos `src=""`, nunca strings dentro de `<script>` (bug identificado e corrigido em 03/07/2026 — antes disso a foto de capa nunca aparecia no HTML final quando não era um dos 3 logos fixos).
6. **Finalizar** — ir direto, **sem gerar PNG de preview**. O `finalize.ps1` embute como base64 todas as imagens locais referenciadas (logos, capa, prints do cliente) e salva o `.html` definitivo na pasta do cliente:
   ```powershell
   & "C:\Users\Computador\.claude\skills\rv-relatorio\assets\finalize.ps1" `
     -Html "<scratchpad>\<arquivo>.html" -Out "<pasta-cliente>\<Cliente>_<Tipo>_<DD-MM-AA>.html"
   ```
   Nome do arquivo no padrão existente: `<Cliente>_<Tipo>_<DD-MM-AA>.html` (ex.: `BrazilComp_Alinhamento_11-06-26.html`). Confira o log do script (`N imagens embutidas`) — se aparecer aviso de imagem não encontrada, o HTML final não vai ficar autocontido.
7. **Atualizar o `TIMELINE.md`** do cliente com uma entrada datada registrando o relatório gerado (com OK do Felipe).

## Finalização (embutir imagens, sem Chrome/PDF)

Não existe mais renderização para PDF — o `.html` finalizado **é** o documento entregue (anexo de email).

### Windows (PowerShell)
```powershell
& "C:\Users\Computador\.claude\skills\rv-relatorio\assets\finalize.ps1" `
  -Html "<scratchpad>\<arquivo>.html" -Out "<pasta-cliente>\<Cliente>_<Tipo>_<DD-MM-AA>.html"
```

### Linux / Hermes WebUI (Python)
```bash
python scripts/finalize_linux.py --html <scratchpad>/<arquivo>.html --out <pasta-cliente>/<Cliente>_<Tipo>_<DD-MM-AA>.html
```

Ambos varrem o HTML em busca de `<img src="arquivo.png">` com caminho relativo, procuram o arquivo em `assets/brand/` e nas pastas do HTML de origem/destino, e substituem por `data:image/...;base64,...` — assim o arquivo final abre em qualquer navegador, mesmo movido para outra pasta ou anexado a um email, sem depender de nada no disco.

## Arquivos da skill

- `assets/template.html` — scaffold com as 2 capas (A escura, B clara — apagar a que não for usada), o builder da colmeia e a paleta de componentes em layout de scroll contínuo.
- `assets/finalize.ps1` — embute logos/capa/prints como base64 e salva o `.html` final.
- `assets/brand/` — logos oficiais (white/black/mark).

> **Nota para Linux/Hermes WebUI:** estes assets foram baixados do Google Drive em 08/07/2026 (pasta `rv-relatorio-template/` do Felipe). Os arquivos originais estão no Windows do Felipe (`C:\Users\Computador\.claude\skills\rv-relatorio\assets\`). No Linux/Hermes, ficam em `/home/hermeswebui/.hermes/skills/real-vision/operacao/rv-relatorio/assets/`. O `finalize.ps1` é PowerShell (Windows-only) — no Linux, embutir imagens como base64 via script Python manualmente.

## Referência

- Primeiro relatório feito com esta skill (formato antigo, PDF paginado): **BrazilComp — Alinhamento do Projeto (11/06/2026)**, em `operacao/clientes/arquivos/Dorival  Martins - Brazilcomp/` (`brazilcomp-relatorio.html`) — útil como referência de conteúdo/tom, mas o layout não reflete mais o padrão atual.
- Relatório de referência atual (o mais completo e revisado até agora, base para todo relatório novo): **Lafatas — Relatório de Otimização SEO**, em `operacao/clientes/arquivos/Alexis Lafatas - Lafatas Grafik/Lafatas_Relatorio-SEO_04-07-26.html` (PT-BR) e `Lafatas_Bericht-SEO_04-07-26.html` (DE) — passou por 2 rodadas de revisão do Felipe (04/07/2026): prints reais embutidos, comparações antes/depois lado a lado (360°, H1 visível/invisível), checklist com destaque visual, callout de atenção (não mais de upsell — o Merchant Center foi reservado para um documento futuro, ver `docs/proximos-passos-pendente.md` na pasta do cliente), e os 3 tamanhos de imagem travados na seção acima. Use como exemplo real e completo do documento final.
- Ao gerar uma **nova versão** de um relatório já entregue (o cliente/Felipe precisa comparar ou o navegador está com cache do arquivo antigo), salvar com sufixo `_v2`, `_v3` etc. no nome — nunca sobrescrever o arquivo original com o mesmo nome.\n\n## Skills relacionadas\n\n- `proposta-comercial` — define a estrutura de conteúdo/sequenciamento das propostas. Carregue ambas: `rv-relatorio` fornece o template honeycomb visual, `proposta-comercial` fornece a estrutura de seções e o tom educativo.\n\n## Referências técnicas\n\n- `references/drive-api.md` — workflow de download/upload de arquivos via Google Drive API (OAuth2 + REST), útil quando o browser tool não está disponível para mover relatórios entre o servidor e o Drive do cliente.\n\n## Pitfalls\n\n- ❌ **NÃO gerar proposta sem carregar esta skill** — o Felipe exige o template honeycomb para propostas. O `proposta-comercial` define o conteúdo, mas o layout visual é aqui.
