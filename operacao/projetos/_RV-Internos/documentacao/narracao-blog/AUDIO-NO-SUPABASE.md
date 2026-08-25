# Passo a passo — tirar o áudio do repositório e servir do Supabase

> Ver também: [[ESTADO]] · [[DECISOES]] · [[NARRACAO-SINCRONIZADA-BLOG]]
>
> **Isto é a segunda metade do Bloco 4** e é a única parte do projeto que o agente não
> pode fazer sozinho: o MCP Supabase não alcança esse projeto (é o `KI-20` da Academy — o
> conector está noutra conta), e criar bucket público é mudança de infraestrutura.
> O código já está pronto e esperando — nada quebra enquanto isso não acontece.

## Onde é

| | |
|---|---|
| Conta | **`smarthomefg@gmail.com`** — não a `realvisionmaps360@gmail.com` |
| Projeto | **"realvision academy"** (`xomtfkbvathddfpbknyo`) |
| Painel | https://supabase.com/dashboard/project/xomtfkbvathddfpbknyo |

O nome engana: apesar de "academy", este é o **banco único de usuários finais do site** —
blog e Academy juntos (ver `ARCHITECTURE.md` da Academy).

## Por que fazer

Hoje o áudio de 6,6 MB mora dentro do repositório, em `public/audio/`. Isso significa que
**cada narração nova exige publicar o site de novo**, e que o repositório vai engordando
com arquivos de mídia. Com o áudio no Supabase, gravar um post novo vira: subir o arquivo,
registrar o post, pronto (D-7).

---

## O que o Felipe faz — 4 passos

### 1. Criar o bucket

Logado como `smarthomefg@gmail.com`, no projeto "realvision academy", em
**Storage → New bucket**:

| Campo | Valor |
|---|---|
| Name | `blog-audio` |
| Public bucket | **ligado** |
| File size limit | `50 MB` |
| Allowed MIME types | `audio/mpeg` |

**Público de propósito:** o blog é anônimo, não tem login, e o áudio é o mesmo conteúdo do
post que já está aberto na tela. URL assinada aqui só criaria complexidade sem proteger
nada (é o oposto da Academy, onde o áudio é de curso pago).

### 2. Subir o áudio

No bucket recém-criado, **Upload file**:

```
operacao/projetos/_RV-Internos/sites/real-vision-site/public/audio/site-maior-ativo-era-ia.mp3
```

O nome do arquivo no bucket precisa ficar **exatamente** `site-maior-ativo-era-ia.mp3` —
é o nome registrado no catálogo.

### 3. Conferir que abre

Clicar no arquivo → **Copy URL**. Deve ser algo como:

```
https://xomtfkbvathddfpbknyo.supabase.co/storage/v1/object/public/blog-audio/site-maior-ativo-era-ia.mp3
```

Colar no navegador. Se tocar, está certo. Se pedir autenticação, o bucket não ficou público.

### 4. Avisar aqui

Com a URL confirmada, o resto do lado do código é conduzido aqui.

---

## Situação (25/08/2026)

| Passo | Situação |
|---|---|
| 1. Bucket `blog-audio` público | ✅ criado pelo Felipe |
| 2. `.mp3` no bucket | ✅ subido — 6,58 MB, `audio/mpeg`, HTTP 200 sem autenticação |
| 3. URL confirmada | ✅ toca no navegador |
| 4. `VITE_BLOG_AUDIO_BASE` no `.env` local | ✅ ligada e testada — o post narra com o áudio vindo do Supabase, sincronia intacta |
| 5. **Mesma variável na Vercel** | ⚠️ **adicionada pelo Felipe, mas não chegou ao build** — ver abaixo |
| 6. Remover o `.mp3` do repositório | ⛔ trancado pelo passo 5 |

### ⚠️ A variável não chegou ao build (25/08/2026)

Depois da publicação, o pacote no ar (`BlogPost-7P3wOmBH.js`) tem `"/audio"` embutido e
**nenhuma** referência ao Supabase. Isso é prova de que `VITE_BLOG_AUDIO_BASE` não existia
no momento em que a Vercel montou o site — variável de Vite é lida no build, não a cada
visita.

O site funciona normalmente: serve o áudio do `public/audio/` do repositório.

**O que conferir na Vercel**, em ordem de probabilidade:

1. **A variável foi mesmo salva?** O formulário mostrava um aviso vermelho (tipo "Secret"
   com prefixo público). Se o Save não completou, ela não existe. Procure
   `VITE_BLOG_AUDIO_BASE` na lista de Environment Variables.
2. **Está marcada para Production?** Só Preview/Development não vale para o site no ar.
3. **É o projeto certo?** Se houver mais de um projeto Vercel, pode ter ido no vizinho.
4. **O tipo ficou "Config"**, não "Secret".

Resolvido isso, é **Redeploy** (sem cache) e conferir de novo — o endereço do áudio no
player deve começar com `https://xomtfkbvathddfpbknyo.supabase.co`. Só então o `.mp3` sai
do repositório.

### O passo 5 — a variável na Vercel

No painel da Vercel, projeto do site → **Settings → Environment Variables → Add**:

| Campo | Valor |
|---|---|
| Key | `VITE_BLOG_AUDIO_BASE` |
| Value | `https://xomtfkbvathddfpbknyo.supabase.co/storage/v1/object/public/blog-audio` |
| Environments | Production, Preview e Development |

**Sem barra no fim do valor.**

### Por que o `.mp3` ainda não saiu do repositório

Porque essa é a única rede de segurança que sobrou. Enquanto a variável não existe na
Vercel, o site publicado ainda serve o áudio de `public/audio/` — que é justamente o que
mantém o post narrado funcionando no ar hoje. **Tirar o arquivo antes da variável existir
lá deixaria a narração muda em produção.** Ele sai depois da publicação do Bloco 6, com o
áudio do Supabase confirmado no ar.

---

## O que já está pronto no código

`src/data/blog-audio/index.ts` monta o endereço do áudio a partir de `VITE_BLOG_AUDIO_BASE`.
Sem a variável, serve do próprio site como sempre fez. Isso também é a saída de emergência:
se algum dia o Supabase engasgar, apagar a variável devolve o áudio pro site — desde que o
arquivo ainda esteja no repositório, o que só deixa de valer depois do passo 4.
