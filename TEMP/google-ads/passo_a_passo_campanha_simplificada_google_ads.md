# Como funciona o caminho "fazer sozinha" no Google — para explicar pra Flávia

Baseado na documentação oficial do Google (Ajuda do Google Ads e Ajuda do Perfil da Empresa no Google). Isso é o que ela veria se decidisse configurar por conta própria, sem entrar na interface completa do Google Ads.

---

## 1. O caminho mais simples de todos: botão "Anunciar" no Perfil da Empresa

Esse é o caminho que citamos na conversa sobre a Evelyn — o mesmo botão "Anunciar" que testamos e que hoje está retornando erro 404 no navegador (desktop). A documentação oficial descreve o fluxo assim, e ele é pensado principalmente para o **app Google Maps no celular**:

1. Abrir o app Google Maps no celular
2. Tocar em "Empresa" (canto inferior direito)
3. Tocar em "Anunciar" e depois em "Começar"
4. Seguir as instruções na tela

**O que o Google configura sozinho:** lances, onde o anúncio aparece (posicionamentos) e as combinações dos textos/recursos do anúncio — tudo via IA, com base nas informações que já existem no perfil.

**O que a pessoa ainda decide:**
- Os locais/lojas que quer anunciar
- O orçamento (o Google sugere um valor diário, mas ela pode mudar a qualquer momento)
- Quais "recursos" de anúncio quer usar (ex: botão de ligação)

**Pré-requisitos importantes:**
- O perfil precisa estar **verificado** antes de configurar qualquer campanha
- Nem todo perfil pode anunciar por esse caminho — empresas de serviço local e algumas categorias "sensíveis" ficam de fora
- **Se já existir uma conta Google Ads ativa vinculada, o botão redireciona para a visão geral do Google Ads** em vez de abrir a criação rápida — é exatamente o comportamento que pegamos no teste com a conta de vocês, e é a explicação mais provável para o 404: o link antigo de criação rápida (`/campaigns/new/express`) não é mais o destino padrão quando já existe conta ativa.

Fonte: [Anunciar sua empresa no Google – Ajuda do Perfil da Empresa](https://support.google.com/business/answer/7025532?hl=pt-BR)

---

## 2. O caminho equivalente dentro do próprio Google Ads: "Campanha Inteligente"

Esse é o passo a passo oficial de como criar esse mesmo tipo de campanha simplificada, mas entrando direto pelo site do Google Ads (funciona tanto no computador quanto redireciona certo, sem depender do botão quebrado do Perfil da Empresa).

### Pré-requisito
A conta do Google Ads precisa estar no **"modo inteligente"** — é um modo diferente do "modo especialista" (que temos hoje na conta de vocês, que já mostra o menu completo). Só no modo inteligente aparece a opção de criar Campanha Inteligente. A documentação do Google não detalha exatamente onde trocar de modo dentro da interface — isso costuma estar em **Configurações da conta** ou aparece automaticamente quando a conta é nova e ainda não foi usada no modo especialista.

### Passo a passo (dentro do Google Ads, modo inteligente)

1. Ir em **Campanhas → Nova campanha**
2. Escolher **"Criar campanha sem meta"** e selecionar o tipo **"Inteligente"**
3. Escolher a empresa já conectada (ou informar o nome de uma nova)
4. Informar o site do negócio — o Google analisa o conteúdo da página automaticamente
5. Escolher o **objetivo principal** (só uma opção):
   - Gerar mais ligações
   - Leads/vendas pelo site
   - Visitas à loja física
   - Visualizações/engajamento no YouTube
6. O Google gera automaticamente o anúncio (3 títulos + 2 descrições) — dá pra adicionar um botão de ligação com o telefone
7. Configurar a **segmentação**: temas de palavra-chave e localização geográfica
8. Definir o **orçamento** — aceitar a recomendação do Google ou colocar um valor próprio
9. Revisar tudo
10. Configurar o rastreamento (tag do Google) — pode fazer isso depois também
11. A campanha entra no ar na Pesquisa e no Google Maps

Fonte: [Criar uma campanha inteligente de pesquisa – Ajuda do Google Ads](https://support.google.com/google-ads/answer/7459814?hl=pt-BR)

### O que a IA decide sozinha nesse tipo de campanha
- Testa combinações diferentes de título/descrição/página de destino e vai priorizando as que performam melhor
- Gera sitelinks automaticamente (links extras abaixo do anúncio)
- Decide quando e onde exibir o anúncio entre os canais disponíveis (Pesquisa, Maps, YouTube, rede de parceiros)

### O que a pessoa ainda precisa fornecer manualmente
- Descrição da empresa
- Entre 3 e 15 títulos (máx. 30 caracteres cada)
- Entre 2 e 4 descrições (máx. 90 caracteres cada)
- O orçamento
- Os temas de palavra-chave (não palavras-chave exatas — são temas amplos)
- A URL de destino

Fonte: [Como funcionam as campanhas inteligentes – Ajuda do Google Ads](https://support.google.com/google-ads/answer/7652860?hl=pt-BR)

---

## 3. Isso confirma o ponto que você quer passar pra ela

Mesmo no caminho "simplificado", ela ainda precisa tomar decisões que afetam diretamente o resultado — orçamento, objetivo, temas de palavra-chave, textos do anúncio. A diferença real entre "ela fazer" e "a gente fazer" não é que a campanha simplificada "faz tudo sozinha": é que a Campanha Inteligente trabalha com **temas genéricos** e otimização automática ampla, enquanto uma configuração completa (modo especialista) permite:

- Escolher palavras-chave exatas (não só temas), incluindo correspondência de frase e exata
- Definir **palavras-chave negativas** (evitar gastar com buscas que não interessam) — isso simplesmente não existe no modo Campanha Inteligente
- Segmentar por horário, dispositivo, raio de distância mais preciso
- Ter controle de lance por palavra-chave, não só um orçamento geral
- Ver relatórios detalhados por termo de busca, não só o resumo simplificado

Esse é o argumento mais concreto e verificável (direto da documentação oficial) pra colocar no roteiro: a Campanha Inteligente decide por temas amplos e não tem exclusão de termos indesejados — é aí que o dinheiro "vaza" quando ela faz sozinha.

---

## Fontes consultadas
- [Anunciar sua empresa no Google – Ajuda do Perfil da Empresa no Google](https://support.google.com/business/answer/7025532?hl=pt-BR)
- [Criar uma campanha inteligente de pesquisa – Ajuda do Google Ads](https://support.google.com/google-ads/answer/7459814?hl=pt-BR)
- [Como funcionam as campanhas inteligentes – Ajuda do Google Ads](https://support.google.com/google-ads/answer/7652860?hl=pt-BR)
- [Comparar as campanhas inteligentes com outros tipos de campanha – Ajuda do Google Ads](https://support.google.com/google-ads/answer/7652853?hl=pt-BR)
