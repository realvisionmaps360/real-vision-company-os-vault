---
name: rv-contrato
description: Real Vision Contract Manager — gera o contrato de prestação de serviços (Service Agreement) de um cliente em PDF, a partir do template oficial aprovado, com os Termos e Condições Gerais sempre anexados (Anexo A). Use SEMPRE que o Felipe disser "We have a new client" / "temos um novo cliente", "gerar contrato", "fechar contrato", "monta o contrato do cliente X", "contrato de prestação de serviços", ou for transformar uma proposta aprovada em contrato. NÃO usar para consultar cláusulas dos Termos (use rv-termos) nem para criar proposta comercial (use proposta-comercial, que vem ANTES do contrato).
---

# RV Contrato — Gerador de contratos de cliente

Skill para gerar o **Contrato de Prestação de Serviços / Service Agreement** da Real Vision em **PDF A4 retrato**, no estilo documento jurídico limpo: **capa azul-marinho** + miolo branco legível + filetes laranja marcando as seções. Os **Termos e Condições Gerais** vão **sempre anexados** ao final (Anexo A) — nunca só referenciados.

> Primeiro ative `realvision` (regra: carregar o contexto da empresa antes de skills de negócio). Idioma do **documento**: PT-BR para cliente brasileiro, EN para internacional. A conversa com o Felipe é sempre em PT-BR.

## Regras duras (inegociáveis)

1. **Nunca criar contrato do zero.** Sempre partir do template oficial.
2. **Nunca remover seções** do template aprovado. As 15 seções existem sempre, na ordem.
3. **Só os serviços selecionados** entram na Seção 4 (sem os "Examples:").
4. **Condições especiais entram SÓ na Seção 12** — nunca espalhadas em outras seções.
5. **Termos sempre anexados** (Anexo A), no **mesmo idioma** do contrato (EN↔EN / PT↔PT).
6. **Sem inventar dados.** Preencher apenas com o que o Felipe fornecer. Faltou campo → **perguntar antes de gerar**.
7. **Checkpoint humano:** mostrar o resumo dos campos e **esperar o OK do Felipe** antes de gerar o PDF.
8. **Carimbar a versão dos Termos** dentro do contrato (ex.: "Versão 1.1 — Junho 2026").

## Fontes oficiais (não recriar)

| Item | Caminho |
|---|---|
| Template do contrato (PT) | `operacao/comercial/CONTRATO-PRESTACAO-SERVICOS-TEMPLATE-v1.0-PT.md` |
| Template do contrato (EN) | `operacao/comercial/SERVICE-AGREEMENT-TEMPLATE-v1.0-EN.md` |
| Termos (PT) — Anexo A | `operacao/comercial/TERMOS-E-CONDICOES-GERAIS-v1.1-PT.md` |
| Termos (EN) — Anexo A | `operacao/comercial/GENERAL-TERMS-CONDITIONS-v1.1-EN.md` |
| Template visual (HTML) | `~/.claude/skills/rv-contrato/assets/contrato-template.html` |
| Render HTML→PDF | `~/.claude/skills/rv-contrato/assets/render.ps1` |
| Logos | `~/.claude/skills/rv-contrato/assets/brand/` (white/black/mark) |

## Fluxo

### 1. Gatilho
Ao ouvir **"We have a new client" / "temos um novo cliente"** (ou pedido de contrato), iniciar a **coleta** — não gerar nada antes de ter os dados + o OK.

### 2. Coletar os campos (perguntar só o que faltar)
Agrupar e pedir de forma objetiva. Se a proposta já existe (proposta-comercial), reaproveitar os dados de lá.

**Contrato**
- `CONTRACT_ID` — formato `RV-AAAA-NNN` (NNN sequencial; conferir a pasta `operacao/comercial/contratos/` ou confirmar com o Felipe).
- `CONTRACT_DATE` — data de hoje, por extenso.

**Real Vision (constantes — confirmar 1x; NÃO inventar)**
- `RV_CNPJ`, `RV_ADDRESS`, `RV_REPRESENTATIVE`, `RV_SIGNATORY`.
  > Esses dados ainda não estão no Company OS. Na 1ª geração real, **pedir ao Felipe** e sugerir salvar para reuso.

**Cliente**
- `CLIENT_NAME`, `CLIENT_DOCUMENT` (CPF/CNPJ), `CLIENT_ADDRESS`, `CLIENT_REPRESENTATIVE`, `CLIENT_EMAIL`, `CLIENT_PHONE`, `CLIENT_SIGNATORY`, `CLIENT_POSITION`.

**Projeto**
- `PROJECT_NAME`, `CLIENT_INDUSTRY`, `START_DATE`, `DELIVERY_DATE`, `PROJECT_MANAGER`.

**Escopo**
- `SERVICES_LIST` (selecionar do menu do template), `DELIVERABLES`, `REVISION_LIMIT`.

**Prazo**
- `TIMELINE_DESCRIPTION`, `MILESTONES`.

**Investimento**
- `PROJECT_VALUE`, `CURRENCY`, `PAYMENT_STRUCTURE`, `PAYMENT_METHOD`.

**Deslocamento**
- `TRAVEL_TERMS`.

**Mensal (se houver)**
- `MONTHLY_SERVICES`, `MONTHLY_VALUE`, `BILLING_FREQUENCY`, `MONTHLY_START_DATE`. Se não houver, Seção 11 = "Não aplicável."

**Especiais (opcional)**
- `SPECIAL_CONDITIONS`. Se vazio, Seção 12 = "Não aplicável." (texto padrão do template).

**Validar antes de gerar:** CPF/CNPJ no formato certo; `DELIVERY_DATE ≥ START_DATE`; moeda definida. **Travar a geração se faltar campo crítico** — nunca deixar `{{...}}` aparecer no PDF.

### 3. Revisão pré-contrato (checkpoint)
Apresentar ao Felipe um **resumo em texto** dos campos preenchidos (partes, serviços, valores, prazos, condições especiais) e perguntar: *"Está tudo certo? Posso gerar o PDF?"* Só avançar com o **OK explícito**. Se pedir ajustes, corrigir e reapresentar.

### 4. Gerar o PDF
1. Escolher **idioma** pelo cliente (internacional → EN; brasileiro → PT) e usar o template `.md` **e** os Termos **do mesmo idioma**.
2. Localizar/criar a pasta do cliente: `operacao/clientes/arquivos/<Cliente>/`.
3. Copiar `assets/contrato-template.html` + os 3 logos para a pasta do cliente.
4. **Preencher a capa** (placeholders) e **montar o corpo** copiando os blocos da paleta de componentes do HTML, na ordem:

   **a) Capa** (`.cover`) — placeholders da capa.

   **b) Resumo Executivo** (`.exec-page`) — dashboard 2×2 obrigatório, aparece como pág. 2. Preencher os novos placeholders:
   - `{{EXEC_SERVICE_ITEM}}` — um `<li>` por serviço contratado (mesmos da Seção 4).
   - `{{EXEC_DELIVERABLE_ITEM}}` — um `<li>` por entregável condensado (mesmos da Seção 5, versão curta).
   - `{{START_DATE_SHORT}}` — data de início curta (ex.: "25 jun").
   - `{{DELIVERY_DATE_SHORT}}` — data de entrega curta (ex.: "25 ago").
   - `{{EXEC_DURATION}}` — texto de duração (ex.: "60 dias corridos").
   - `{{PROJECT_VALUE}}` e `{{PAYMENT_STRUCTURE}}` — já coletados para a Seção 9, reusar aqui.
   - Faixa "Próximos Passos" está hardcoded PT. Para contrato EN: trocar os textos dos `.exec-step-text` para "Sign the contract → Pay the deposit → Schedule the start".

   **c) Corpo** (Seções 1–15) — só os serviços selecionados na Seção 4, condições especiais só na Seção 12.
5. **Anexo A:** ler o `.md` dos Termos do idioma certo e injetar as 16 cláusulas nos blocos `.tc` do HTML; preencher `{{TERMS_VERSION}}` ("Versão 1.1 — Junho 2026" / "Version 1.1 — June 2026") e o parágrafo de aceite final.
6. **Render direto a PDF — sem PNG de preview:**
   ```powershell
   & "C:\Users\Computador\.claude\skills\rv-contrato\assets\render.ps1" `
     -Html "<pasta-cliente>\<arquivo>.html" -Out "<pasta-cliente>\<Cliente>_Contrato_<DD-MM-AA>.pdf"
   ```
   A capa é sempre navy (o parâmetro `-Cover` é ignorado por este template). O Chrome costuma retornar exit code 1 mesmo gerando o arquivo — **confie no `Test-Path`**, não no exit code.

### 5. Salvar nos dois lugares
- Pasta do cliente: `operacao/clientes/arquivos/<Cliente>/<Cliente>_Contrato_<DD-MM-AA>.pdf`
- Registro central: copiar o PDF para `operacao/comercial/contratos/<Cliente>_Contrato_<DD-MM-AA>.pdf`

### 6. Pós-geração
- Confirmar ao Felipe os **dois caminhos** salvos.
- Atualizar o `TIMELINE.md` do cliente com uma entrada datada ("Contrato gerado — <CONTRACT_ID>").
- Oferecer salvar aprendizados (regra ativa do Felipe).

## Render (Chrome headless no Windows)
Sempre via `assets/render.ps1` (usa `--user-data-dir` com perfil temporário — senão, com o Chrome já aberto, nenhum arquivo é gerado). PDF direto, sem PNG.

## Skills relacionadas
- **proposta-comercial** — vem **antes**: a proposta aprovada vira contrato aqui.
- **rv-termos** — consulta de cláusulas dos Termos (problema com cliente, citar cláusula). Os Termos que esta skill anexa são os mesmos da `rv-termos`.
- **rv-relatorio** — relatórios de cliente; este contrato reusa o pipeline visual dela.

## Fora de escopo (registrado)
- Melhorias jurídicas do contrato (multa/juros por atraso, rescisão/kill-fee, indenização, cláusula GDPR p/ clientes da UE/Suíça) → possível **v1.1 do contrato**, decisão à parte com o Felipe. Não alterar o template por conta própria.
