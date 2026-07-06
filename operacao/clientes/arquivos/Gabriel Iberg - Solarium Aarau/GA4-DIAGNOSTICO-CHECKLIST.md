# Diagnóstico GA4 — Solarium Aarau

**Data criação:** 06/07/2026  
**Status:** Pendente (checklist a preencher)  
**Cliente:** Gabriel Iberg  
**Property GA4:** `G-7SZVNPKT6L`  
**Site:** https://aarau-solarium.ch

---

## CHECKLIST: Acesso e Configuração

### 1. MCP Google Analytics conectado?
- [ ] Verificar em Claude Code > Settings > MCP
- [ ] Status: conectado / desconectado / erro
- **Resultado:** `_____`

### 2. Acesso à propriedade `G-7SZVNPKT6L` liberado?
- [ ] Gabriel/Romana adicionou a conta de serviço da Real Vision no GA4?
- [ ] Permissão: **Read & Analyze** (mínimo)
- [ ] Como confirmar: tentar uma query de teste ao MCP
- **Resultado:** acesso ✓ / acesso ✗ / erro

**Ação se acesso negado:**
- Pedir a Gabriel (via Romana): adicionar email de serviço em Admin > Acesso e conformidade > Gerenciar Acesso
- Esperar confirmação de Gabriel
- Reteste

### 3. Dados históricos — quando o GA4 foi criado?
- [ ] Logar em Google Analytics > Configuração > Propriedades > Data de criação
- [ ] Data de criação do GA4: `________`
- [ ] Primeira data com dados: `________` (pode ser bem recente)
- [ ] A propriedade tem tráfego registrado? SIM / NÃO

**Nota:** Se GA4 foi criado há menos de 1 semana, os primeiros números serão baixos — isso é normal, não reflete performance real.

### 4. Google Tag Manager conectado?
- [ ] Acessar https://aarau-solarium.ch
- [ ] Abrir Console do navegador > Network
- [ ] Procurar por `gtag` ou `GA_MEASUREMENT_ID`
- [ ] Resultado: GTM implementado / não implementado / erro

**Nota:** Não é obrigatório para o relatório mensal básico — apenas melhora rastreamento de eventos customizados.

### 5. Teste prático — rodar uma query de relatório
**Comando MCP a testar:**
```
google-analytics__run_report
  property_id: "G-7SZVNPKT6L"
  date_range_start: "YYYY-MM-01" (primeiro dia do mês anterior)
  date_range_end: "YYYY-MM-DD" (hoje)
  metrics: ["activeUsers", "sessions", "engagementRate"]
  dimensions: ["date"]
```

- [ ] Query executada com sucesso?
- [ ] Resultado: `_________` (copiar resumo da resposta)

**Se falhar:** copiar mensagem de erro completa e reportar.

---

## DADOS COLETADOS (preencher após diagnóstico)

| Item | Valor |
|---|---|
| **GA4 Property ID** | `G-7SZVNPKT6L` |
| **Data de criação do GA4** | `________` |
| **Primeira data com dados** | `________` |
| **MCP Status** | conectado / erro / ✗ |
| **Acesso da RV ao GA4** | ✓ / ✗ / pendente |
| **Tráfego detectado?** | SIM / NÃO |
| **Primeira query bem-sucedida?** | SIM / NÃO |

---

## PRÓXIMOS PASSOS (após diagnóstico)

Se tudo passar ✓:
1. Definir **data-âncora do relatório mensal** = primeira data com dados em GA4
2. Preencher dados reais em `relatorio-mensal-modelo.md`
3. Gerar HTML via skill `rv-relatorio`
4. Revisar + enviar email ao Gabriel

Se algo falhar:
1. Registrar erro aqui
2. Contactar Gabriel (via Romana) pra resolver acesso/configuração
3. Reteste após resolução

---

## NOTAS E OBSERVAÇÕES

_Espaço para anotações durante o diagnóstico_

```
[anotações aqui]
```
