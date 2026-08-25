# Drone & Digital Unterentfelden — landing page

Página estática (Vite, sem framework). No ar em: **https://drone-unterentfelden.vercel.app**

## Estrutura

```
site/
├── index.html          conteúdo e estrutura da página
├── src/style.css        design system Real Vision (contexto/DESIGN.md)
├── src/main.js          constante TOUR_URL + lógica do card 360° + envio do formulário
└── src/assets/           logo-header.png, logo-footer.png (copiados do site oficial)
```

## Formulário — o questionário de 4 perguntas

Chama direto a Edge Function pública `drone-unterentfelden-lead` (**versão 9**), deployada no mesmo
projeto Supabase do Hermes (`ghwjetvazmdlaqidgxqi`), que:

1. **Grava a resposta em `unterentfelden_respostas` SEMPRE**, com ou sem opt-in — as 4 perguntas
   mais a identificação e um campo `optin`. É o dado da pesquisa, e é sobre ele que o critério
   6/24 é contado. Adicionado na v7 (21.08.2026); antes, quem não marcava o checkbox não existia
   em lugar nenhum além do email no Gmail
2. **Grava em `email_contatos` SÓ se `consentimento === true`.** Quem responde o questionário sem
   marcar o checkbox de opt-in **não entra** na base de email marketing. É isso que torna o
   desacoplamento real e não decorativo — testado ponta a ponta em 19.08.2026 e de novo na v7
3. Manda a notificação por email pro Felipe via **Resend**, com as 4 respostas e um selo dizendo se
   a pessoa entrou ou não na base. `reply_to` aponta pro respondente. **Isso acontece sempre**, com
   ou sem opt-in, porque é o dado da pesquisa

**v8/v9 (21.08.2026):** o template do email de notificação ainda tinha os rótulos e a decodificação
do questionário **anterior** à reescrita de 19.08 — a pergunta 3 (hoje texto livre) era decodificada
como se ainda fosse o vocabulário fixo antigo (`ja`/`nein`/`kommt-darauf-an`), então qualquer resposta
real virava "(não respondeu)" no email mesmo estando salva certa no banco. Corrigido: rótulos
re-sincronizados com `src/main.js`, limite de 40 caracteres da pergunta 3 removido (cortava resposta
de texto livre), e opt-in de contato que já existia em `email_contatos` passou a acrescentar a tag da
campanha em vez de ser ignorado em silêncio.

As duas tabelas são coisas diferentes e continuam separadas: `unterentfelden_respostas` é pesquisa,
`email_contatos` é base de contato. Falha na gravação da primeira **não derruba** a resposta ao
usuário — loga e segue, porque o email ao Felipe é a rede de segurança.

O placar da campanha sai pela view `unterentfelden_resumo` (`total`, `total_optin`, `hoje`,
`ultima_em`, `faltam`, `alvo`), lida pela rotina diária do Hermes —
ver `operacao/gestao/infraestrutura/hermes-rotina-unterentfelden/README.md`.

Campos enviados: `estabelecimento`, `nome`, `email`, `pergunta_1..4`, `consentimento` (bool),
`botcheck` (honeypot). Os campos `endereco` e `pagamento` **não existem mais**.

Endpoint (constante `LEAD_ENDPOINT` em `src/main.js`):
```
https://ghwjetvazmdlaqidgxqi.supabase.co/functions/v1/drone-unterentfelden-lead
```

Rate limit de 5 tentativas/10min por IP (tabela `lead_capture_rate_limit`).

Código da função: gerenciado via MCP Supabase (não vive neste repo — mesma prática das outras
Edge Functions da RV, ver `operacao/gestao/infraestrutura/telegram-alertas/README.md`).

## Analytics — PostHog cookieless

Roda em `persistence: "memory"`: **nenhum cookie, nenhum localStorage**. Por isso a página não tem
banner de consentimento — numa amostra de 24 negócios, quem recusa o banner inviabiliza a leitura.

Variáveis de ambiente (mesmos nomes do site RV, para não inventar convenção nova):

```
VITE_POSTHOG_PROJECT_TOKEN=
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

`.env` está no `.gitignore`; `.env.example` tem os nomes vazios. **Sem token, o PostHog não
inicializa e a página funciona igual** — nada quebra.

Eventos medidos: `$pageview` (automático), `tour_open`, `download_click`, `form_submit`,
`newsletter_optin`. Autocapture ligado, então clique não previsto também é registrado.

## Trocar o arquivo do download

Constante em `src/main.js`, mesmo padrão de degradação do tour:

```js
const DOWNLOAD_URL = "/unterentfelden-luftaufnahme-360-13-08-2026.jpg";
```

O arquivo vive em `public/` (o Vite serve `public/` na raiz). Se a constante ficar vazia (`""`),
os botões de download simplesmente **não renderizam** — nunca apontam pra `#`.

O arquivo entregue é o **panorama equiretangular**, não uma foto plana: os metadados XMP GPano
foram verificados e estão íntegros, então o dono consegue arrastar direto pro Google
Unternehmensprofil. Se trocar o arquivo, **conferir o XMP de novo** — sem ele o Google trata como
foto comum esticada.

## Trocar o link do tour 360°

Uma constante só, em `src/main.js`:

```js
const TOUR_URL = "https://tour.realvisionmaps.com/unterentfelden01/";
```

Se ficar vazia (`""`), a seção do tour degrada sozinha para o estado "em breve" — sem link morto.

## Rodar localmente

```bash
npm install
npm run dev
```

Também tem entrada no `.claude/launch.json` da raiz do vault (`drone-unterentfelden`), pro preview
abrir direto no Claude Code.

## Deploy (Vercel)

```bash
npm run build
npx vercel --prod
```

Projeto já existe na conta `realvisionmaps360-9299`, vinculado a esta pasta via `.vercel/` (não vai
pro git). Rodar `npx vercel --prod` de dentro de `site/` atualiza a mesma URL.

## Domínio próprio

Ainda não conectado — decisão do Felipe fica para depois. Quando definir, é um passo no painel do
Vercel (Settings → Domains) apontando para este mesmo projeto. **Atenção**: se o domínio mudar, o
CORS da Edge Function (`drone-unterentfelden-lead`) está travado em `https://drone-unterentfelden.vercel.app`
— precisa atualizar a lista de origens permitidas junto.

## Idioma

A página é **só em alemão suíço** (`lang="de-CH"`), reescrita direto em 19.08.2026 — não é tradução
de uma versão portuguesa. Regras: tratamento `Sie`, sempre `ss` nunca `ß`, datas absolutas.

Para o Felipe conferir o sentido sem ler alemão, existe
`../TRADUCAO-PT-LANDING-2026-08-19.md` — é documento de conferência, não uma versão do site.

## Modelo comercial

**Não existe preço nesta página.** A campanha virou validação de mercado gratuita em 19.08.2026
([[DEC-2026-004]]). Se aparecer "CHF", "Preis", "bezahlen" ou promessa de publicar no perfil do
Google de alguém, é regressão — conferir contra o `PLANO-REESTRUTURACAO-2026-08-19.md` da campanha.
