---
name: rv-auditoria-tecnica-site
description: Auditoria técnica do site de um cliente Real Vision — site online, Google Search Console, indexação, favicon, GA4, PostHog. Use quando Felipe der o nome de um cliente e disser "audita o site dele", "confere o GSC/GA4/favicon", "roda a auditoria técnica", "vê como tá o site do cliente X" ou variações. Carrega a ficha do cliente, analisa a pasta e o código do site, checa indexação/favicon direto na busca do Google, apresenta o panorama, atualiza a ficha e o índice central, e entrega o passo a passo do que só o Felipe configura na tela.
---

# Skill: rv-auditoria-tecnica-site — Auditoria Técnica de Sites por Cliente

> Processo completo em [[METODOLOGIA]] (`operacao/gestao/infraestrutura/auditoria-tecnica-clientes/METODOLOGIA.md`).
> Índice central de clientes auditados: [[INDICE-CLIENTES]].
> Passo a passo pro Felipe: [[PASSO-A-PASSO-GOOGLE]].

Carregar sempre junto com a skill `realvision`.

---

## Quando usar

Felipe dá o nome de um cliente e quer saber o estado técnico do site: se está online, indexado, com favicon certo, GA4 e PostHog funcionando.

## Procedimento

### Passo 1 — Localizar o cliente
- Pasta: `operacao/clientes/arquivos/[Nome-Cliente]/`
- Ler `FICHA-CLIENTE.md` inteiro e demais docs da pasta (TIMELINE, PROJETO, diagnósticos anteriores se existirem).

### Passo 2 — Sincronizar e ler o código
- Se houver repositório do site: `git pull --rebase origin main` (regra fixa do AGENTS.md — nunca pular esse passo).
- Ler no código: qual favicon está referenciado, se há tags de GA4/GTM/PostHog no HTML, se existe `sitemap.xml` e `robots.txt`.

### Passo 3 — Auditoria de código/segurança
- Rodar `/improve quick` no repositório do site (mesmo padrão da skill [[rv-entrega]]) — cobre bugs, segurança, performance, SEO básico.

### Passo 4 — Checagem visual real (Browser pane)
- Abrir o site no ar e confirmar que carrega.
- Buscar `site:dominio.com` no Google:
  - Ver quantas páginas aparecem indexadas.
  - Ver se o favicon exibido é o da marca ou um genérico.
  - Ver se título/descrição da SERP batem com o esperado.

### Passo 5 — Montar o panorama
Organizar por pilar (ver [[METODOLOGIA]]):
1. Site online (sim/não + hospedagem confirmada)
2. Search Console (conectado/pendente)
3. Indexação (X/Y páginas)
4. Favicon (correto/genérico/pendente)
5. GA4 (instalado/pendente)
6. PostHog (instalado/pendente/não aplicável)

Apontar o que é **bloqueador** (impede o objetivo final) vs. **melhoria** (não urgente).

### Passo 6 — Felipe aprova
Apresentar o panorama e esperar aprovação antes de escrever em qualquer arquivo — regra de ouro do AGENTS.md (aprovação antes de agir).

### Passo 7 — Atualizar ficha e índice
- Inserir/atualizar a seção `## Saúde Técnica do Site` em `FICHA-CLIENTE.md` do cliente (ver template em [[METODOLOGIA]]) — só nesse momento, nunca preencher em massa retroativamente.
- Atualizar a linha do cliente em [[INDICE-CLIENTES]] com wikilink pra ficha.

### Passo 8 — Entregar o passo a passo do Felipe
- Copiar/adaptar de [[PASSO-A-PASSO-GOOGLE]] só as seções relevantes ao que falta pra esse cliente (não mandar o roteiro inteiro se só falta configurar GA4, por exemplo).

### Passo 9 — Fechar o ciclo
- Quando Felipe avisar que executou a parte dele, confirmar e atualizar o status pra "OK" no índice.

---

## Aprendizados

> Cada auditoria concluída alimenta esta seção. Aprendizado genérico o bastante vira ajuste direto no procedimento acima, não fica só anotado aqui.

### Auditoria 1 — Gabriel Iberg / Solarium Aarau (29/07/2026)
- **Domínios de proteção de marca são comuns e não são bug em si** — cliente pode ter comprado variações do domínio de propósito (proteção de marca), mas isso só funciona se canonical/sitemap/robots.txt apontarem consistentemente pro domínio que o servidor realmente entrega. Verificar sempre qual domínio é o final de fato via `curl -L -w "%{url_effective}"`, não assumir pelo nome do arquivo `FICHA-CLIENTE.md` ou docs antigos — eles podem estar desatualizados.
- **Confirmar indexação duplicada é possível sem MCP do Search Console**: buscar `site:dominio.com` direto no Google já revela se o Google está tratando variações de domínio como sites diferentes.
- **Repo do site pode estar numa branch de trabalho suja** (ex: landing page em andamento) quando a auditoria pede mexer em `main`. Sempre checar `git status` antes, e se houver trabalho não commitado alheio à correção de SEO, isolar com `git stash push -u` antes de trocar de branch — nunca descartar.
- **Playwright MCP, nunca Browser pane nativo** para checagem de busca/indexação — regra da casa já existente ([[feedback_browser_playwright_exclusivo]]), reforçada aqui porque é natural cair no hábito errado no meio da auditoria.
- Favicon pode aparecer certo na busca mesmo sem tag `<link rel="icon">` explícita (convenção de `/favicon.ico`) — mas a tag deve ser adicionada mesmo assim, por consistência e para não depender de convenção implícita.
- **Redirect 307 entre domínios não é bug de SEO** — confirmado na doc oficial da Vercel: tanto 307 quanto 308 "does not affect SEO, search engines will treat them as normal redirects". Não gastar tempo tentando forçar 301/308 num redirect de domínio da Vercel (a tela nem expõe essa opção) a menos que haja outro motivo além de SEO.
- **Wikilink `[[FICHA-CLIENTE]]` é ambíguo** — todo cliente tem um arquivo com esse mesmo nome. Sempre usar o caminho completo no [[INDICE-CLIENTES]]: `[[operacao/clientes/arquivos/[Nome-Cliente]/FICHA-CLIENTE|Nome de exibição]]`.
- **Antes de reportar "salvo" pro Felipe, reler o arquivo de novo** — os campos podem ter ficado desatualizados entre o momento em que foram escritos e o fim da conversa (ex: Search Console estava "pendente" na ficha mesmo depois de já ter sido confirmado ao vivo na tela).

---

## Importante

- Nunca inventar status de indexação/GA4/PostHog sem checar de fato (regra de ouro: zero invenção).
- Mudança em produção (código do site) segue fora do escopo desta skill — aqui só se diagnostica; correções de código passam pelo fluxo normal (`/improve execute`, aprovação do Felipe).
- Primeiro cliente só roda quando Felipe indicar o nome.

---

*Skill criada em 29/07/2026. Ver também: [[rv-entrega]], [[favicon-setup]], [[marketing-seo]], [[rv-posthog-setup]], [[obsidian-cli]].*
