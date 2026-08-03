# PostHog Analytics — Solarium Aarau

## Status: 🟢 Instalado em produção (02/08/2026)

- **Criado/testado local em:** 02/08/2026
- **Instalado em produção:** 02/08/2026 — env vars adicionadas no Vercel pelo Felipe, aprovação confirmada. Verificado via bundle JS de produção (`https://www.aarau-solarium.ch/assets/index-B0utBPRK.js`): `posthog-js` + token do projeto (`phc_Bs2Pc...`) presentes.

## O que é e por que instalamos

PostHog é a ferramenta de analytics de produto usada pela Real Vision. No Solarium Aarau, o
objetivo é entender como o visitante navega o site — de onde vem, o que clica, onde trava — nos
mesmos moldes já rodando no site institucional da Real Vision (ver [[POSTHOG-ANALYTICS]] na pasta
`_RV-Internos`).

**Projeto PostHog próprio do cliente** — não é o mesmo projeto/token da Real Vision. Felipe criou
um projeto novo no PostHog especificamente para o Solarium e cadastrou cartão na organização
(agora com cota de até 6 projetos).

---

## O que foi feito

- `posthog-js` instalado em `operacao/projetos/solariumaarau/` (jeito "clássico", igual ao padrão
  já validado no site da Real Vision — sem `@posthog/react`, mesmo que a documentação oficial do
  PostHog hoje ofereça também um wizard com `@posthog/react`/`PostHogProvider`).
- `src/lib/posthog.ts` criado, réplica do modelo da Real Vision (`initPostHog`, `grantConsent`,
  `denyConsent`, `getStoredConsent`), chave de consentimento própria (`solarium-analytics-consent`,
  não reaproveita a chave `rv-analytics-consent` da RV).
- `ConsentBanner.tsx` criado com o design system do próprio Solarium (tokens `bg-background`,
  `border-border`, `Button` do shadcn/ui já existente no repo) — não copiou o visual da Real
  Vision.
- Textos do banner traduzidos em DE e EN (`src/i18n/locales/de/common.json` e
  `.../en/common.json`, chave `consent.*`) — site do Solarium só tem esses dois idiomas.
- Variáveis de ambiente (`VITE_POSTHOG_PROJECT_TOKEN`, `VITE_POSTHOG_HOST`) no `.env` local
  (adicionado ao `.gitignore`, que não tinha essa entrada ainda). **Pendente**: adicionar as
  mesmas variáveis no Vercel (Production + Preview) antes do deploy.
- Texto da Datenschutzerklärung (política de privacidade) corrigido em DE e EN — a versão antiga
  dizia "não usamos rastreamento" (`common.json`, seção `legal.datenschutz.sections`, item
  "Cookies & Analyse"), o que ficaria falso assim que o PostHog entrasse no ar. Novo texto explica
  que o PostHog só ativa com consentimento explícito no banner.
- `npm run build` rodado limpo, sem erro.
- Testado localmente (servidor de teste isolado, porta 5199) nos 3 cenários:
  1. Primeira visita → banner aparece (DE, "Ablehnen"/"Akzeptieren").
  2. Aceitar → `posthog-js` carrega com o token do Solarium (`phc_Bs2Pc...`), evento de teste
     disparado com sucesso.
  3. Recusar → PostHog não carrega (`__loaded: false`), banner não aparece de novo depois da
     escolha (reload testado).

---

## Decisões tomadas

| Decisão | Escolha |
|---|---|
| Região do projeto | US Cloud (`https://us.i.posthog.com`) |
| Padrão de instalação | Clássico (`posthog-js` puro), igual à Real Vision — não o wizard novo com `@posthog/react` |
| Banner de consentimento | Mostrado pra todo visitante, adaptado ao layout do Solarium, DE + EN |
| `person_profiles` | `identified_only` (mesmo padrão da Real Vision) |

---

## Insights e monitoramento

> Log datado — cresce conforme formos olhando os dados reais no painel do PostHog. Adicionar
> entrada nova aqui a cada análise, não sobrescrever as anteriores.

### 02/08/2026 — Instalação e testes locais
Código pronto e testado localmente. Ainda não publicado em produção — falta: variáveis de
ambiente no Vercel + aprovação explícita do Felipe pro deploy.

### 02/08/2026 — Deploy em produção confirmado
Felipe adicionou as env vars no Vercel e aprovou o deploy. Bundle JS de produção confirma
`posthog-js` + token carregados. Próximo passo real: confirmar visualmente que o banner aparece
pro visitante e que o evento de pageview chega no painel do PostHog.

---

## Próximos passos

- [x] Adicionar `VITE_POSTHOG_PROJECT_TOKEN` e `VITE_POSTHOG_HOST` nas env vars do Vercel
  (Production + Preview) do projeto `solariumaarau` — feito 02/08/2026.
- [x] Aprovação explícita do Felipe pra fazer o deploy em produção — feito 02/08/2026.
- [x] Confirmado ao vivo — banner aparece, evento de pageview chega no painel do PostHog (Felipe conferiu, 02/08/2026).
- [ ] Montar dashboard básico no painel (pageviews por página, origem do tráfego).

---

## Documentos relacionados
- [[FICHA-CLIENTE]] — ficha central do cliente Gabriel Iberg / Solarium Aarau
- [[ANALYTICS-CLARITY]] — Clarity do mesmo cliente
- [[POSTHOG-ANALYTICS]] — documento equivalente da Real Vision (modelo usado aqui)
- [[rv-posthog-setup]] — skill que orienta essa instalação
