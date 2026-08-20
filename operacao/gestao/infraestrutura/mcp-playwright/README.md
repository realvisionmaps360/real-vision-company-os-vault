# Playwright MCP — Automação de Navegador

> Voltar para o catálogo mestre: [[CONTROLE-MCPS]]

## O que é

A ferramenta que permite ao Claude Code abrir um navegador de verdade e usar
o site como uma pessoa usaria: navegar, clicar, preencher formulário, tirar
print, ler o que está na tela e ver os erros que o site solta por baixo dos
panos.

É a ferramenta **exclusiva** de navegador da Real Vision — nada de Browser
pane nativo, Claude in Chrome ou scraping quando a ação puder ser feita
aqui. E toda ação no navegador é avisada ao Felipe antes de acontecer.

## Status

✅ **Ativo e testado** (07/08/2026) — teste real: abriu a home do
realvisionmaps.com, leu o menu inteiro, o texto do herói e o banner de
cookies, e capturou print da tela.

## Cota / risco de limite

**Nenhuma.** Roda 100% na máquina do Felipe, sem chave de API e sem
serviço pago. Custo zero, sem limite de uso.

## Registro no Claude Code

Fica em `C:\Users\Felipe Garcia\.mcp.json` (global — vale em qualquer
projeto, não só neste vault):

```json
"playwright": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@playwright/mcp@latest", "--browser", "chrome"]
}
```

O `cmd /c` é o padrão que funciona neste PC para pacotes rodados via `npx`
(mesmo jeito do `claude-flow`). Sem a opção `--headless`, a janela abre
visível — foi a escolha do Felipe, para acompanhar cada ação em tempo real.

### Por que `--browser chrome` e não o navegador próprio do Playwright

Na instalação (07/08/2026), o navegador que o Playwright baixa sozinho
(**Chrome for Testing**) não abre neste Windows: dá erro de "configuração
lado a lado incorreta". Testamos as duas versões baixadas (`chromium-1234`
e `chromium-1237`) rodando direto no terminal, fora do Playwright — as duas
falham igual. O log de eventos do Windows mostra que ele não consegue
resolver o próprio manifesto do Chrome (`151.0.7922.34 ... não pôde ser
localizado`), mesmo com o arquivo presente na pasta e o Visual C++
2015-2022 instalado. É um problema do Windows deste PC com esse pacote
específico, não do Playwright.

**Solução adotada:** usar o Chrome normal já instalado no PC
(`C:\Program Files\Google\Chrome\Application\chrome.exe`, versão 151), que
funciona sem problema.

**Importante:** isso *não* usa o perfil nem os logins do Felipe. O
Playwright cria uma pasta de perfil separada e limpa
(`AppData\Local\ms-playwright-mcp\`) a cada sessão. Só o programa do
navegador é reaproveitado.

Se um dia for preciso voltar ao navegador próprio do Playwright, o comando
para baixá-lo é:

```bash
npx -y @playwright/mcp@latest install-browser chrome-for-testing
```

## Quando usar

- Testar site de cliente antes de entregar (ver [[rv-entrega]]) — abrir
  cada página, conferir se carrega, tirar print de evidência
- Diagnosticar por que um site está quebrado: ler os erros que o navegador
  registra e as chamadas de rede que falharam
- Conferir se uma mudança publicada realmente apareceu no ar
- Capturar prints para relatórios de cliente (ver [[rv-relatorio]])
- Testar formulários de contato e fluxos de cadastro
- Pesquisar em sites que exigem interação (clicar, rolar, logar) — o que o
  Firecrawl sozinho não alcança

## Achado no teste (fora do escopo desta instalação)

O teste na home mostrou vários erros repetidos de
`Permissions policy violation: accelerometer is not allowed`, vindos dos
tours em `tour.realvisionmaps.com` embutidos na página. Não quebra nada
visível, mas é sujeira no console — vale uma sessão separada no site.

## Instalado em

07/08/2026 · Catálogo geral: [[CONTROLE-MCPS]]
