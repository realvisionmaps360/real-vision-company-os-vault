# Guia de Sincronização do Obsidian — Computador ↔ Celular

> Guia em linguagem simples. Explica como funciona a sincronização das suas notas entre o PC e o celular, e como resolver sozinho se algo parar.
> Criado em 28/06/2026. Veja também: [[REGISTRO-Tecnico]] (a parte técnica) e [[README]] (índice da base Obsidian).

---
![[CLAUDE]]
## A ideia em uma frase

Suas notas ficam no computador. Uma cópia fica guardada no **GitHub** (um "cofre" na internet). O celular pega desse cofre. Resultado: você escreve em qualquer aparelho e aparece no outro — sozinho.

```
   PC  ──envia──▶  GitHub (cofre na nuvem)  ──envia──▶  Celular
   PC  ◀──pega──   GitHub (cofre na nuvem)  ◀──pega──   Celular
```

---

## O que já está pronto (não precisa refazer)

- **Cofre na nuvem criado:** repositório privado `real-vision-company-os-vault` (conta `realvisionmaps360`).
- **Computador já ligado ao cofre:** o PC envia e recebe automaticamente.
- **O que é sincronizado:** só os arquivos de texto (`.md`) de todo o Company OS. Fotos, vídeos, PDFs e os sites de clientes **não** sobem (ficam só no PC, pra não pesar).

---

## Como ligar o celular (passo a passo)

### Parte 1 — Criar a "chave de acesso" (token) no GitHub
A chave é o que autoriza o celular a entrar no cofre. Dura **90 dias** (depois é só gerar outra — ver o fim deste guia).

1. No navegador, entre em **github.com** logado na conta `realvisionmaps360`.
2. Vá em: foto do perfil (canto superior direito) → **Settings**.
3. Desça até **Developer settings** (lá no fim do menu da esquerda).
4. **Personal access tokens** → **Tokens (classic)**.
5. **Generate new token** → **Generate new token (classic)**.
6. Em **Note**, escreva algo como "Celular Obsidian".
7. Em **Expiration**, escolha **90 days**.
8. Marque a caixa **`repo`** (a primeira, grandona — ela libera o acesso aos repositórios).
9. Clique em **Generate token** lá embaixo.
10. **Copie o código que aparece** (começa com `ghp_...`) e guarde num lugar seguro. ⚠️ Ele só aparece uma vez.

### Parte 2 — Instalar e conectar no celular
1. Instale o app **Obsidian** (Play Store).
2. Abra → instale e ative o plugin **Git** (em Configurações → Community plugins).
3. Abra a **paleta de comandos** (ícone de busca, ou puxe com dois dedos na tela de nota).
4. Digite **"clone"** e escolha **"Obsidian Git: Clone an existing remote repo"**.
   - ⚠️ **Mudou:** antigamente era um botão dentro das configurações. Hoje o clone é só pela paleta de comandos.
5. Cole a URL trocando `SEU_TOKEN` pelo código da Parte 1:
   ```
   https://SEU_TOKEN@github.com/realvisionmaps360/real-vision-company-os-vault.git
   ```
6. Quando perguntar o nome da pasta e o **depth**, deixe **em branco**.
7. Pronto: ele baixa todas as notas.

### Parte 3 — Ligar o piloto automático (no PC e no celular)
Nas configurações do plugin **Git**, seção **"Automatic"**, deixe assim:

| Configuração | Valor | Pra que serve |
|---|---|---|
| **Auto commit-and-sync interval** | `5` | A cada 5 min, salva e envia o que mudou |
| **Auto push interval** | `5` | A cada 5 min, **empurra** pro cofre na nuvem ⚠️ |
| **Auto pull interval** | `5` | A cada 5 min, **puxa** novidades do cofre |
| **Pull on startup / Pull changes on startup** | **Ligado** | Ao abrir o app, já busca o que tem de novo |

> ⚠️ **Atenção ao "Auto push interval".** No nosso primeiro setup ele veio em **0 (desligado)**. Resultado: o PC salvava as notas localmente mas **nunca mandava pro cofre**, então o celular nunca via. Se um aparelho parar de receber novidades, **a primeira coisa a checar é se esse valor está em 5, não em 0.**

---

## Duas dúvidas que já apareceram

### "Qual a diferença entre *commit* e *sync*?"
- **Commit** = embalar e etiquetar o que mudou. Fica **só no aparelho**.
- **Sync** = mandar pro cofre (push) **e** pegar do cofre (pull).
- **Commit-and-sync** (o automático) = faz os dois de uma vez. Você não precisa pensar nisso — só importa se der erro: a mensagem dirá se travou no "commit" (problema local) ou no "sync" (problema de conexão/cofre).

### "Tenho dois cofres no Obsidian, qual é o certo?"
- ✅ **"Real Vision"** → `C:\Users\Computador\Desktop\Real Vision` — **esse é o certo.**
- ❌ "Obsidian Vault" → `C:\Users\Computador\Documents` — é um cofre vazio padrão, ignore.

---

## Quando a chave vencer (a cada 90 dias)
O celular vai parar de sincronizar e pedir senha. É só gerar uma chave nova:
1. Repita a **Parte 1** (gerar token de 90 dias).
2. No celular, paleta de comandos → procure por **"edit remote"** / reconfigure a URL com o token novo (ou clone de novo numa pasta limpa).
3. No PC normalmente não precisa, porque ele usa o login do Windows. Se pedir, use o token novo.

---

## Se algo parar (guia rápido)
- **Celular não recebe o que escrevi no PC** → confira o **Auto push interval = 5** no PC e force "Git: Commit-and-sync".
- **Aparece "conflito" (conflict)** → calma. Antes de editar muito num aparelho, rode "Git: Pull". Se já deu conflito, o detalhe está no [[REGISTRO-Tecnico]].
- **Erro de senha/autenticação** → a chave (token) provavelmente venceu. Gere uma nova (acima).

> Para a explicação técnica de cada item, veja [[REGISTRO-Tecnico]].
