---
name: vila-dos-corais
description: Carrega o contexto completo da cliente Flávia Andrade — Vila dos Corais (pousada/casa de temporada em Algodões, Península de Maraú, BA). Use SEMPRE que Felipe disser "Vila dos Corais", "corais", "Flávia", "viladoscorais.com.br", "Casa Estrela do Mar", ou pedir para mexer no site, no painel de reservas, na calculadora de datas/preços, no login do painel, no Perfil Google ou no tráfego pago dessa cliente. Carregar junto com `realvision`. Para mexer no login/rota protegida, carregar também `rv-portao-auth`.
---

# 🐚 Vila dos Corais — Flávia Andrade

Cliente ativa da Real Vision desde **06/01/2026**. Ficha oficial e fonte única da
verdade: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/FICHA-CLIENTE.md`
e `Vila-dos-Corais-TIMELINE.md`. Nó no LBOS: `LBOS/02-Projetos/vila-dos-corais/`.

**Esta skill não repete o conteúdo de lá — ela carrega o essencial e diz onde ler o resto.**

---

## Quem é

Flávia Andrade é dona da **Casa Estrela do Mar**, uma casa dentro do **Condomínio
Vila dos Corais**, em Algodões, Península de Maraú (BA). Ela não mora na propriedade.

⚠️ **"Vila dos Corais" é o nome do condomínio, não uma empresa dela.** Ela é dona de
uma casa só.

⚠️ **Regra fixa: nunca expor o nome pessoal dela em material público** (portfólio,
case, redes). Usar só "Vila dos Corais" ou "a proprietária". Decisão do Felipe,
17/08/2026.

Ela **não tinha nenhuma presença digital** antes da Real Vision. O site nasceu aqui —
não foi resgate de site quebrado. Essa correção já teve que ser feita uma vez; não
repita o erro.

---

## O que foi entregue

Pacote de **R$2.900**, todo pago: Website (R$1.300) + Perfil Google (R$300) +
Instagram (R$600).

O site **não é institucional simples**. Inclui:

- **Calculadora de reservas** na home — datas, hóspedes, preço por sazonalidade (estilo Airbnb)
- **Checkout via WhatsApp** — manda a mensagem pronta com datas, hóspedes e valor, sem intermediário e sem taxa de plataforma
- **Painel administrativo próprio** em `/secure` — ela abre/fecha datas e ajusta preços sozinha
- **Fotos profissionais**, coordenadas pela Real Vision com fotógrafo local

---

## Stack — decorar antes de sugerir qualquer coisa

| | |
|---|---|
| Site | `viladoscorais.com.br` |
| Repositório | `github.com/realvisionmaps360/viladoscorais` |
| Repo local | `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/site/` (ignorado no git do vault — **clonar se não existir**) |
| Hospedagem | **Vercel** |
| Domínio | **Locaweb** (NS: ns1/ns2/ns3.locaweb.com.br) |
| Banco/Auth | **Supabase, projeto `xcymehoyqppdgvrhytfj`**, região São Paulo, conta da Real Vision |
| Front | React + Vite + React Router (SPA), origem Lovable |
| Search Console | conta `smarthomefg@gmail.com` |
| GA4 | conta `realvisionmaps360@gmail.com`, ID `G-8P07EHPVYR` |

- **Não é Hostinger nem Cloudflare.** Não sugerir troca de provedor sem necessidade real.
- Sem MX/TXT no domínio — nenhum email depende do DNS atual.
- Search Console e GA4 estão em **contas Google diferentes**.

### ⚠️ O banco antigo não existe mais para nós

O projeto Supabase original (`zilfvhgeqniddxskpgdp`) foi criado pelo **Lovable** e
**ninguém da Real Vision tinha acesso ao painel** — sem backup, sem como corrigir
permissão. Migrado em 01/09/2026 para `xcymehoyqppdgvrhytfj`, na conta da Real Vision,
com backup dos dados antes (`backup-banco-2026-09-01/`).

**Qualquer referência ao projeto antigo é lixo. Use só `xcymehoyqppdgvrhytfj`.**

---

## O painel `/secure` — o ponto sensível deste cliente

Rotas: `/secure` (login) → `/primeiro-acesso` ou `/redefinir-senha` → `/admin` (protegido).

Este painel **já quebrou duas vezes**, e das duas o cliente ficou sem conseguir entrar:

1. **Sem `vercel.json`** → toda rota interna dava 404 da plataforma. Corrigido 01/09/2026.
2. **Tela de nova senha nunca existiu** → o link do email entrava sem gravar a senha, gerando loop infinito de redefinição. Corrigido 01/09/2026.
3. **Ping-pong entre `/secure` e `/admin`** → login certo, permissão certa, banco certo, e mesmo assim "Carregando..." eterno.

**Antes de tocar em `useAuth`, `ProtectedRoute`, `SecurePage` ou `DefinirSenhaPage`,
carregue `rv-portao-auth`.** Ela tem a receita de diagnóstico e o checklist.

Conta administrativa: `administracao@clisam.com.br`.

---

## Onde as coisas estão

| Assunto | Arquivo |
|---|---|
| Ficha da cliente (fonte da verdade) | `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/FICHA-CLIENTE.md` |
| Linha do tempo técnica | mesma pasta, `Vila-dos-Corais-TIMELINE.md` |
| Nó do projeto no LBOS | `LBOS/02-Projetos/vila-dos-corais/PROJETO.md` |
| Pendências | `LBOS/02-Projetos/vila-dos-corais/checklist.md` |
| Tráfego pago (pesquisa) | `LBOS/02-Projetos/vila-dos-corais/trafego-pago-pesquisa.md` |
| Fotos brutas e editadas | `Clientes/Flavia Villa dos Corais/` (fora do vault) |

---

## Pendências vivas

- **SMTP próprio** — o email de recuperação de senha ainda sai pelo serviço embutido do Supabase, limitado a poucos envios por hora.
- **R$700** confirmados como pagos por Felipe, mas **não lançados no VisionFlow** (inserção por SQL é bloqueada pelo gatilho de auditoria — tem que ser na interface).
- **Perfil Google Meu Negócio** — VisionFlow ainda mostra "em_andamento"; faltam post inicial, link de avaliação e categorias.
- **Contrato** — rascunho em `ViladosCorais_Contrato_17-08-26.html`, faltam CNPJ/endereço/representante da Real Vision e o número do contrato.
- **Tráfego pago** — a cliente ativou sozinha uma Campanha Inteligente de R$200 e delegou o assunto para **Evelin**, da equipe dela. Decisão de negócio (pegar o serviço e por quanto) ainda em aberto. Nenhum acesso à conta de anúncios dela foi pedido até hoje.

---

## Visão de futuro (guardar, não executar)

O sistema foi construído para crescer: a estrutura de calculadora + WhatsApp + painel
próprio pode ser replicada para os donos das **outras casas do mesmo condomínio**,
cada um virando cliente Real Vision. Não abrir essa frente sem o Felipe pedir.

---

## Regras de conduta com esta cliente

- **Não presumir escopo maior.** O contratado são os 3 itens entregues. Frentes novas só com pedido explícito.
- **Nunca mexer na conta de anúncios dela** sem acesso formalmente concedido.
- Ao fechar sessão deste cliente, atualizar `FICHA-CLIENTE.md` + `Vila-dos-Corais-TIMELINE.md` (skill `rv-fim-sessao`).
