[[../README|← Gestão]]

# Controle de Repositórios — Real Vision 360

> Catálogo mestre de todos os repositórios git instalados nesta máquina
> (`Desktop\Real Vision\`). Serve pra responder rápido: "quantos repos a
> gente tem?", "onde fica o código do cliente X?", "qual é o remote
> certo?". Atualizar **sempre** que um repositório for criado, movido,
> renomeado ou removido — regra combinada com o Felipe em 02/08/2026.

**Regra de organização (fixada 02/08/2026):**
- Repo **interno** da Real Vision (site próprio, ferramenta, template) → dentro de `operacao/projetos/_RV-Internos/sites/`
- Repo de **cliente** → dentro da pasta do próprio cliente em `operacao/clientes/arquivos/[Nome-do-Cliente]/`, geralmente numa subpasta `site/`
- Nunca deixar repo solto direto em `operacao/projetos/` fora dessas duas regras

**Legenda de status:** ✅ ativo, em produção · 🟡 em construção/pendente · ⚪ entregue, sem trabalho ativo · 🔴 problema conhecido

---

## Repositórios internos (Real Vision)

Todos em `operacao/projetos/_RV-Internos/sites/`.

| Pasta | Repo GitHub | Branch | Descrição | Status |
|---|---|---|---|---|
| `real-vision-site` | `realvisionmaps360/real-vision-core` | `main` | Site oficial [[project_site_url\|realvisionmaps.com]] | ✅ |
| `visionflow` | `realvisionmaps360/visionflow-crm-48fe197a` | `main` | CRM interno — ver [[project_visionflow_migracao]] | ✅ |
| `site-template-rv-01` | `realvisionmaps360/site-template-rv-01` (privado) | `main` | Template e-commerce reutilizável, derivado do projeto BrazilComp/Dorival (dados de cliente removidos, histórico squashado) | ⚪ |

## Repositórios de cliente

| Cliente | Pasta | Repo GitHub | Branch | Status |
|---|---|---|---|---|
| Alessandro Furtado (Conecta Saúde) | `clientes/arquivos/Alessandro Furtado - Associação Beneficiente Conecta Saúde/site` | `associacaoconectandosaudecombr` | `main` | ✅ |
| Dorival Martins (Brazilcomp) | `clientes/arquivos/Dorival  Martins - Brazilcomp/entrega-final/site-versao-1` | `brazilcomp-visual-guide` | `main` | ⚪ — 2 versões entregues, checar qual é a ativa |
| Dorival Martins (Brazilcomp) | `clientes/arquivos/Dorival  Martins - Brazilcomp/entrega-final/site-versao-2` | `brazilcomp-2-97cf7219` | `main` | ⚪ — 2 versões entregues, checar qual é a ativa |
| Eduardo Barqueiro (Cartão Digital Paraty) | `clientes/arquivos/Eduardo Barqueiro/Cartão Digital/rv-cartaodigital-paraty-onboard` | `rv-cartaodigital-paraty-onboard` | `master` | 🟡 |
| Flávia Andrade (Vila dos Corais) | `clientes/arquivos/Flávia Andrade - Vila dos Corais/site` | `viladoscorais` | `main` | ⚪ |
| Gabriel Iberg ([[project_solarium_aarau\|Solarium Aarau]]) | `clientes/arquivos/Gabriel Iberg - Solarium Aarau/site` | `solariumaarau-12006307` | `main` (produção) / `lp-willkommen` (LP tráfego pago, ver [[project_solarium_branches]]) | ✅ |
| Hallan Costa (Lavanderia Magnólia) | `clientes/arquivos/Hallan Costa - Lavanderia Magnólia/site` | `lavanderia-magnolia` | `master` | 🟡 |
| MSV-Aarau | `clientes/arquivos/MSV-Aarau/site` | `msv-aarau-site` | `master` | ⚪ |
| Romana (Sunbite) | `projetos/sunbite-site` | `sunbite-site` | `main` | 🟡 — ver [[reference_pasta_sunbite_canonica]]. **Pendente:** mover pra `clientes/arquivos/Romana Loznjakovic - Sunbite.ch/site` na próxima sessão que mexer nele, pra seguir a regra de organização |

## Outros / a investigar

| Pasta | Situação |
|---|---|
| `operacao/projetos/_RV-Internos/instagram-mcp` | Repo git iniciado (`master`) mas **sem nenhum commit** — órfão. Confirmar com Felipe se segue em uso ou pode ser removido |

---

**Última varredura completa:** 02/08/2026 (14 repos mapeados). Pra revarrer do zero:
```bash
find operacao/clientes operacao/projetos -maxdepth 6 -type d -name ".git"
```

**Histórico de mudanças:**
- 02/08/2026 — varredura inicial + reorganização: apagada duplicata de `rv-cartaodigital-paraty-onboard` em `operacao/projetos/`; criada pasta `_RV-Internos/sites/`; movidos `real-vision-site`, `visionflow` e `site-template-rv-01` pra dentro dela; movido repo do Solarium pra dentro da pasta do cliente Gabriel.
