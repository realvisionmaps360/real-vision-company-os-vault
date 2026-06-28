# BRIEFING — MSV Aarau

> **Levantamento realizado em:** 25/06/2026 via Playwright MCP (site completo)
> **Status no VisionFlow:** Swiss Army — Lead

---

## Dados do Cliente

| Campo | Valor |
|---|---|
| Nome oficial | Militär-Sanitäts-Verein Aarau |
| Sigla | MSV Aarau |
| Fundação | 1881 |
| Associação | Schweizerischer Militär-Sanitäts-Verband (SMSV) |
| Endereço | Postfach 2514, 5001 Aarau, Suíça |
| Email | info@msv-aarau.ch |
| Site atual | https://www.msv-aarau.ch/ |
| Idioma | Alemão (Hochdeutsch) |

---

## Missão e Atividades

- Formação em primeiros socorros para militares e civis
- Normas: Interverband für Rettungswesen + Cruz Vermelha Suíça + Exército Suíço
- Prestação de serviços médicos em eventos (Sanitätsdienst)
- Clube associativo com foco em camaradagem

---

## Estrutura de Navegação Atual

```
/ (News/Homepage)
├── /news/
│   ├── /news/sanitätsdienst/
│   └── /news/verein/
├── /news/jahresprogramm/
├── /über-uns/
│   ├── /über-uns/vorstand/
│   ├── /über-uns/technische-kommission/
│   ├── /über-uns/kalender/
│   └── /über-uns/mitglied-werden/
├── /angebot/
│   └── /angebot/sanitätsdienste/
│       ├── /angebot/sanitätsdienste/anfrage-sanitätsdienst/
│       └── /angebot/sanitätsdienste/referenzen/
├── /partner/
├── /kontakt/
├── /fotos/
│   ├── /fotos/sanitätsdienst/
│   ├── /fotos/kurse/
│   └── /fotos/vereinsübungen/
└── /intern/ (área restrita)
```

---

## Eventos Atendidos (Referenzen)

- Maienzug Vorabend Aarau
- Maienzug (Morgenfeier Telliring + Bankettessen)
- Wasserfest Aarburg (Pontonierfahrverein Aarburg)
- Juniorencamp (FC Aarau)
- Pferderennen Schachen Aarau (Aarg. Rennverein)
- Pferdeconcours Seon (RV Hallwil)
- Pferdeconcours Aarau (RV Aarau)
- e muitos outros eventos

---

## Problemas do Site Atual

- CMS: Joomla (antigo, genérico)
- Sem hero section — página abre direto em texto
- Sem hierarquia visual ou identidade
- Sidebar com apenas botões de Facebook/email sharing (arcaico)
- Nenhum CTA destacado
- Layout de coluna única sem grid moderno
- Sem imagens em destaque
- Não responsivo de forma adequada

---

## Objetivo do Projeto

Criar novo **frontend estático** (proposta visual) para apresentar ao cliente antes de qualquer integração com CMS.

- **Fase 1:** Mockup frontend completo — layout moderno, seções bem definidas
- **Fase 2 (futura):** Integração/migração do CMS se aprovado

---

## Stack Técnica (novo site)

- React 18 + Vite + TypeScript
- Tailwind CSS v4
- framer-motion (animações de scroll)
- Google Fonts: Outfit + Inter
- Deploy: Vercel

## Paleta de Cores

- Principal: azul confiança `hsl(220, 55%, 35%)`
- Fundo: branco limpo `hsl(0, 0%, 98%)`
- Acento: dourado premium `hsl(45, 70%, 48%)`
- Texto escuro: grafite `hsl(220, 15%, 15%)`

---

## Pasta do Projeto

`operacao/clientes/arquivos/MSV-Aarau/site/`

## Repositório GitHub

https://github.com/realvisionmaps360/msv-aarau-site (privado)

## Deploy (Vercel)

https://msv-aarau.vercel.app
