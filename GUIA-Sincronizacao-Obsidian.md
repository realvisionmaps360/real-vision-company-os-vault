# Guia — Como Sincronizar o Obsidian entre Computador e Celular

Este guia explica, passo a passo e sem termos técnicos, como deixar suas anotações iguais no computador e no celular. A parte do computador **já está pronta** — falta só o celular.

> Documento técnico companheiro (para resolver problemas): [[REGISTRO-Sync-Obsidian-GitHub]]

## A ideia em uma frase

Imagine o **GitHub** como uma "nuvem cofre" no meio do caminho. O computador manda uma cópia das anotações pra lá, e o celular puxa essa cópia. Sempre que você muda algo num aparelho, ele sobe pro cofre; o outro aparelho desce a novidade. Assim os dois ficam sempre iguais.

- O **cofre** (já criado): um repositório privado chamado `real-vision-company-os-vault`.
- O **carteiro** que leva e traz: um plugin do Obsidian chamado **Git**.
- A **chave** que o celular usa pra entrar no cofre: um **token** (uma senha especial). Você vai criar a sua.

## O que já está pronto (não precisa fazer nada)

- O cofre foi criado no GitHub, **privado** (só você acessa).
- O computador já está ligado ao cofre e já mandou a primeira cópia.
- Foram enviados **só os arquivos de texto** (`.md`). Fotos, PDFs e as pastas de código dos sites **não** vão pro cofre (pra não pesar).

## Parte 1 — Criar sua chave (token) no GitHub

Faça isso uma vez, no computador (é mais fácil que no celular):

- Entre em **github.com** e faça login na conta `realvisionmaps360`.
- Clique na sua foto (canto superior direito) → **Settings**.
- Desça até o final do menu da esquerda → **Developer settings**.
- Clique em **Personal access tokens** → **Tokens (classic)**.
- Botão **Generate new token** → **Generate new token (classic)**.
- Preencha:
  - **Note** (um apelido): `Obsidian Celular`
  - **Expiration**: escolha **90 days**
  - **Select scopes**: marque a caixinha **`repo`** (a primeira, bem no topo)
- Botão verde **Generate token** no final.
- **IMPORTANTE:** copie o código que aparece (começa com `ghp_...`) e **guarde num lugar seguro**. Ele só aparece uma vez. Se perder, é só gerar outro.

## Parte 2 — Instalar e ligar no Celular (Android)

- Instale o app **Obsidian** pela Play Store.
- Abra o Obsidian → crie/abra um cofre qualquer só pra entrar.
- Vá em **Configurações** (ícone de engrenagem) → **Community plugins** → **Turn on community plugins**.
- Toque em **Browse**, procure por **Git** (o autor é **Vinzent**) e instale. Depois toque em **Enable**.
- Ainda nas configurações do plugin Git, procure a opção **Clone an existing remote repo** (clonar repositório).
- No campo da URL, cole exatamente isto, **trocando `SEU_TOKEN`** pelo código que você copiou na Parte 1:

```
https://SEU_TOKEN@github.com/realvisionmaps360/real-vision-company-os-vault.git
```

- Confirme. O celular vai baixar todas as suas anotações. Pronto: agora ele está ligado ao cofre.

## Parte 3 — Ligar o automático (nos dois aparelhos)

Pra não ter que apertar botão toda hora, ligue o piloto automático nas configurações do plugin Git:

- **Auto commit-and-sync interval**: coloque **1** (envia mudanças a cada 1 minuto).
- **Pull on startup** (ou "Pull updates on startup"): **ligado** (puxa novidades quando abre o app).

Faça isso **no celular e no computador**.

## Parte 4 — Testar se funcionou

- No **celular**, crie uma nota de teste qualquer (ex.: "teste sincronização").
- Espere 1 minuto (ou use o comando **Commit-and-sync** do plugin).
- No **computador**, abra o Obsidian e espere ele puxar — a nota de teste deve aparecer.
- Deu certo? Pode apagar a nota de teste. Está tudo sincronizando.

## Quando o token vencer (a cada 90 dias)

O token expira em 90 dias por segurança. Quando o celular parar de sincronizar:

- Refaça a **Parte 1** (gere um token novo).
- No celular, nas configurações do plugin Git, atualize a URL/credencial com o token novo. (Se ficar confuso, é só me chamar que eu te oriento na hora.)

## Se aparecer "conflito" (calma, é simples)

Conflito acontece quando você edita a **mesma** nota nos dois aparelhos ao mesmo tempo, antes de um sincronizar com o outro. Para evitar:

- **Hábito de ouro:** ao abrir o Obsidian num aparelho, deixe ele puxar as novidades (alguns segundos) **antes** de começar a editar.
- Se o plugin avisar de conflito, não apague nada com pressa — me chame que a gente resolve junto sem perder texto.

---

Relacionados: [[REGISTRO-Sync-Obsidian-GitHub]] · [[AGENTS]]
