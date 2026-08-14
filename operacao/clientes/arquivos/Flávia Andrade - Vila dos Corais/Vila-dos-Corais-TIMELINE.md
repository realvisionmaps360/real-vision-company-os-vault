# Vila dos Corais — Linha do Tempo do Projeto

> Ficha de contexto em [[FICHA-CLIENTE]].

## 2026
### 16/06/2026 — Situação inicial documentada
- `VilaDosCorais_Situacao_16-06-26.pdf` registrado na pasta do cliente.

### 14/08/2026 — Verificação no Google Search Console
- Tentativa inicial via Tag HTML falhou ("Não foi possível encontrar seu site").
- Diagnóstico: certificado SSL do domínio `viladoscorais.com.br` na Vercel estava com erro de emissão (CAA check deu timeout nos nameservers da Locaweb).
- Confirmado que HTTP respondia normal mas HTTPS falhava no handshake — por isso o GSC (que exige HTTPS) não conseguia validar.
- Vercel resolveu sozinha após retry (sem precisar trocar nameservers/DNS provider).
- Propriedade verificada com sucesso via Tag HTML.
- `viladoscorais.com.br/sitemap.xml` retornou 404 — sitemap ainda não configurado no projeto.

## Tempo investido
| Data | Sessão | Duração estimada |
|---|---|---|
| 14/08/2026 | Diagnóstico SSL/DNS + verificação GSC | ~1h |

## Próximos marcos
- Configurar `sitemap.xml` no projeto (Vite/React).
- Enviar sitemap ao Search Console e solicitar indexação da home.
- Confirmar vínculo do GA4.
