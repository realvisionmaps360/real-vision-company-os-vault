# Handoff pra IA Externa — Vila dos Corais (Flávia Andrade)

> Dossiê consolidado pra colar numa IA externa (ChatGPT, Gemini, etc.) e usar como
> segunda opinião pra definir o que falta fazer no projeto Vila dos Corais.
> Gerado em 21/08/2026, a partir do Company OS (Obsidian Vault) da Real Vision 360
> + inspeção direta do repositório de código do site.
>
> Fonte no vault: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/`
> (`FICHA-CLIENTE.md` + `Vila-dos-Corais-TIMELINE.md`)

---

## 1. Quem é a cliente e o que foi vendido

- **Cliente:** Flávia Andrade
- **Negócio:** Vila dos Corais — refúgio/pousada à beira-mar em Algodões, Península de Maraú, Bahia
- **Contato:** +55 73 99156 7592
- **Início do relacionamento:** 27/04/2026
- **Status no CRM (VisionFlow):** desenvolvimento

### Escopo contratado (proposta comercial em 2 etapas)
Ela fechou só a **primeira etapa** de um pacote maior. Etapa 2 (recorrente) ainda não foi contratada.

| Item | Etapa | Valor | Status |
|---|---|---|---|
| Website (Landing Page em `viladoscorais.com.br`) | 1 | R$ 1.300 | Entregue |
| Perfil Google Meu Negócio | 1 | R$ 300 | **Travado** — precisa de vídeo de verificação gravado no local pela proprietária, e ela não vai lá tão cedo |
| Instagram | 1 | R$ 600 | Entregue (perfil criado do zero, mas ela pediu pra não usar — os criativos foram redirecionados pro Instagram de outro inquilino que vai usar o espaço) |
| Otimização perfil Google | 2 (não contratada) | — | Não vendida ainda |
| Tráfego Pago (Meta Ads) | 2 (não contratada) | R$ 800 | Não vendida ainda |
| Gestão Instagram/LinkedIn recorrente | 2 (não contratada) | — | Não vendida ainda |
| Manutenção do site | 2 (não contratada) | — | Não vendida ainda |

### Financeiro
- **Total do pacote fechado (etapa 1):** R$ 2.200
- **Pago:** R$ 1.200 (09/01/2026, referente a 50%)
- **Pendente:** R$ 1.000 — **condicionado à finalização do Perfil Google**, que está travado esperando o vídeo de verificação da proprietária
- Documento de referência (no CRM, não replicado neste vault): `Porposta Comercial Flávia Andrade 2 (1).pdf`

---

## 2. Timeline registrada

| Data | Evento |
|---|---|
| 27/04/2026 | Início do projeto no CRM; site e Instagram entregues; Google Meu Negócio em andamento |
| 16/06/2026 | Situação documentada (`VilaDosCorais_Situacao_16-06-26.pdf`, arquivado localmente na sessão da época) |
| 09/01/2026 (sic — data anterior ao início no CRM, possível inconsistência de registro) | Pagamento de R$ 1.200 |
| 14/08/2026 | Sessão de diagnóstico técnico: verificação de propriedade no Google Search Console |

> **Nota de inconsistência a esclarecer com o Felipe:** a data de pagamento (09/01/2026) é anterior à data de criação do card no CRM (27/04/2026). Pode ser erro de digitação na importação do VisionFlow (mês/dia invertido, ou ano) — não foi corrigido aqui porque não há dado adicional pra confirmar qual é a data real.

---

## 3. O que aconteceu na sessão de 14/08/2026 (diagnóstico GSC/SSL)

- Tentativa de verificar `viladoscorais.com.br` no Google Search Console via Tag HTML falhou de início ("não foi possível encontrar seu site").
- **Causa raiz identificada:** o certificado SSL do domínio na Vercel estava em estado "Failed To Generate Cert" — a checagem de CAA (Certification Authority Authorization) estava dando timeout ao consultar os nameservers da Locaweb (onde o domínio está registrado).
- HTTP respondia normal, HTTPS falhava no handshake — por isso o GSC (que exige HTTPS) não validava.
- **Resolveu sozinho** depois de um retry/refresh da Vercel, sem precisar trocar nameservers ou mexer no DNS.
- Propriedade **verificada com sucesso** no GSC via Tag HTML.
- `viladoscorais.com.br/sitemap.xml` deu **404** em produção nessa checagem.

---

## 4. O que a inspeção do código-fonte mostrou agora (21/08/2026)

Repositório: `github.com/realvisionmaps360/viladoscorais` (branch `main`, último commit `097a4a3` — "Add Google Analytics (GA4) tag", 14/08/2026). Stack: Vite + TypeScript + React + shadcn-ui + Tailwind, projeto originado no Lovable, backend em Supabase (migrations + edge function `setup-admin`), deploy na Vercel, domínio na Locaweb.

### Achados que contradizem ou atualizam o que estava registrado

1. **`sitemap.xml` EXISTE no repositório** (`public/sitemap.xml`, só com a home listada) e é referenciado corretamente no `robots.txt`. Ou seja, o 404 visto em produção em 14/08 não é falta de arquivo no código — é algo entre build e deploy (cache antigo da Vercel de antes do SSL funcionar, deploy desatualizado, ou o domínio ainda apontando pra uma versão antiga do build). **Precisa re-testar `viladoscorais.com.br/sitemap.xml` agora que o SSL foi resolvido — pode já estar funcionando.**
2. **GA4 já está implementado** direto no `index.html` (`G-8P07EHPVYR`), commitado no mesmo dia da sessão de diagnóstico. O "próximo passo" da ficha ("verificar se GA4 já está vinculado") já está tecnicamente resolvido no código — falta só confirmar que a propriedade GA4 está recebendo dados de verdade (visitas reais).
3. **`google-site-verification` meta tag já está no `index.html`** — reforça que a verificação do GSC foi feita corretamente.

### Gaps técnicos não documentados na ficha do cliente (novos achados)

| Achado | Risco/Impacto | Ação sugerida |
|---|---|---|
| **`.env` está versionado no Git** (commitado no repo, não no `.gitignore`) | As chaves expostas são `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_URL` — são chaves públicas/anon do Supabase (de uso client-side por design, não é `service_role`), então o risco direto é baixo. Ainda assim viola a convenção da RV (`.env` nunca commitado) e é sinal de possível RLS mal configurada no Supabase se alguém depender dessas chaves ficarem "escondidas" | Adicionar `.env` ao `.gitignore`, remover do histórico se for prática padrão do time, e **conferir as políticas RLS no Supabase** pra garantir que a exposição da anon key não permite leitura/escrita indevida |
| **Nenhum JSON-LD / Schema.org no código** (`LocalBusiness`/`LodgingBusiness` seria o tipo certo pra uma pousada) | Vai contra a convenção padrão da RV ("Schema.org obrigatório", GEO-ready) — impacta rich snippets e AI Overviews | Adicionar structured data `LodgingBusiness` com nome, endereço, geo, imagens, faixa de preço |
| Sem `vercel.json` no repo | Não é necessariamente problema (Vercel autodetecta Vite), mas dificulta confirmar se há alguma regra de rewrite/redirect explícita que pudesse ter causado o 404 do sitemap | Confirmar direto no dashboard da Vercel quais rewrites/redirects estão configurados, se algum |
| Painel admin (`AdminPage.tsx`, `AdminCalendar.tsx`, `SecurePage.tsx`, edge function `setup-admin`) existe no código | Não documentado na ficha do cliente — parece ser um painel de gestão de disponibilidade/preço (há `BasePriceEditor.tsx`, `DateEditModal.tsx`) | Confirmar com o Felipe se esse admin está em uso pela Flávia, se ela tem acesso/senha, e se faz parte do escopo entregue ou é resquício de desenvolvimento |

---

## 5. Perguntas em aberto (pra decidir com o Felipe antes de agir)

1. O Perfil Google Meu Negócio trava há meses esperando um vídeo que a proprietária não vai gravar (ela não pretende ir ao local tão cedo). **Existe alternativa de verificação** (foto + carta, verificação por telefone/email quando disponível para o tipo de negócio) que não dependa da presença física dela?
2. A etapa 2 (tráfego pago, gestão de redes, manutenção) nunca foi oferecida formalmente depois da etapa 1. Vale reabordar a cliente agora que o site está estável e o GSC verificado?
3. O painel admin existe no código mas não há registro de treinamento/entrega dele pra Flávia — confirmar se isso é parte do produto ou ficou solto.
4. Data de pagamento inconsistente no CRM (ver seção 2) — vale corrigir o registro?

## 6. O que pedir pra IA externa ajudar a definir

Sugestão de enquadramento pra colar junto com este documento:

> "Com base neste histórico de projeto (site entregue, Perfil Google travado há meses por falta de verificação em vídeo, etapa 2 de recorrência nunca vendida, achados técnicos de SEO/segurança abaixo), me ajuda a: (1) montar um plano de ação priorizado pra destravar o Perfil Google sem depender da proprietária ir ao local; (2) definir se/como reabordar a cliente pra vender a etapa 2; (3) apontar qualquer risco técnico que os achados da seção 4 indicam que eu não tenha visto."

---

## 7. Referências rápidas

- Site: https://viladoscorais.com.br/
- Repo: https://github.com/realvisionmaps360/viladoscorais (privado)
- Ficha do cliente: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/FICHA-CLIENTE.md`
- Timeline: `operacao/clientes/arquivos/Flávia Andrade - Vila dos Corais/Vila-dos-Corais-TIMELINE.md`
- Export CRM: `operacao/clientes/CLIENTES_VISIONFLOW_2026-05-24.md` (pode estar desatualizado — checar VisionFlow direto pra status financeiro corrente)

---

*Documento gerado como artefato temporário de trabalho — não é a fonte de verdade do Company OS (essa continua sendo a FICHA-CLIENTE.md e a TIMELINE do cliente). Descartável após o uso na IA externa.*
