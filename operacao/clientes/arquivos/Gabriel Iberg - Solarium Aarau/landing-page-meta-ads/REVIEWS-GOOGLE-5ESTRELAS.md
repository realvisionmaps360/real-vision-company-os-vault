# Reviews 5★ reais — Google Meu Negócio Solarium Aarau

> Fonte: https://maps.app.goo.gl/dpr5DxRDBFuU6zBR9 (SOLARIUM-AARAU, 4,8 · 51 avaliações)
> Coletado: 02/07/2026 · Para: seção de testimonials da LP `/willkommen` (template 21st.dev)
> Pesquisa: [[PESQUISA-PUBLICO-LP]] · Blueprint: [[BLUEPRINT-LP-WILLKOMMEN]]

**Regras do template (definidas pelo Felipe):** foto da pessoa + nome + **5 estrelas amarelas**
(remover a linha de "profissão" do template original). Idioma: **inglês**.

**Fotos:** URLs do avatar do Google abaixo. As URLs terminam em `=w36-h36` (36px, baixa
resolução). Na implementação (Fase 4), **baixar cada avatar** trocando para `=w120-h120` e salvar em
`src/assets/reviews/` (hotlink direto do Google expira e quebra). Quem não tem foto pública usa o
fallback de iniciais do componente Avatar (shadcn).

---

## Os 8 reviews selecionados (tradução PT→EN, nome real mantido)

### 1. Marion Joel — ⭐⭐⭐⭐⭐  *(serviço/equipe)*
> "I had a few issues, but they were solved as fast as possible. The owner even called me and gave
> me 20 francs extra because of the error. He also took care of the cabins quickly. I'm very
> grateful. I highly recommend this place to everyone."
- Foto: `https://lh3.googleusercontent.com/a/ACg8ocJOnzED3WnflQqpK5ZReSPnqeoAdfUcfoFMvD9yoy_qbxI8sg=w36-h36-p-rp-mo-br100`

### 2. Jasmina D — ⭐⭐⭐⭐⭐  *(limpeza + fácil + resultado)* — Local Guide
> "A very pleasant and clean tanning studio in a great location. The Collarium beds are excellent
> and highly recommended. Easy to use and they deliver great results."
- Foto: `https://lh3.googleusercontent.com/a-/ALV-UjVzJvgigfCzl-LTM0KVjRNXtT-abtKNLbYYoumDt_rRe7h6wqtckQ=w36-h36-p-rp-mo-ba12-br100`

### 3. Florian Bauer — ⭐⭐⭐⭐⭐  *(limpeza + primeira vez)*
> "Went there for the first time yesterday. Excellent equipment and everything very clean. I'll be
> back!"
- Foto: `https://lh3.googleusercontent.com/a-/ALV-UjUBeocW0vFaRZjqwcfbsHCdPZKqedMcPG6Fwq2Z41_1Yc5-04w=w36-h36-p-rp-mo-br100`

### 4. Izeir Hidic — ⭐⭐⭐⭐⭐  *(limpeza + resultado natural)*
> "I'm absolutely delighted with this tanning studio! The equipment is modern, clean and
> impeccably maintained. The results are fantastic after just a few visits, a natural, even tan."
- Foto: `https://lh3.googleusercontent.com/a/ACg8ocKJphnDrKekPAI_1PIPiVGGZu6TXksIeYynYl0Ep_3BSQ8zMw=w36-h36-p-rp-mo-br100`
- Obs: texto original tem mais uma frase sobre o ambiente (truncada no Maps). Frase-chave já capturada.

### 5. David Gülec — ⭐⭐⭐⭐⭐  *(limpeza)*
> "Very pleasant studio, always clean."
- Foto: `https://lh3.googleusercontent.com/a/ACg8ocJj2MRkf-BzWfqdSJKd-5l5c6xMNa7DRwhVkHa0snevPZ2WuQ=w36-h36-p-rp-mo-br100`

### 6. Melissa Dzafic — ⭐⭐⭐⭐⭐  *(limpeza + equipe)*
> "Excellent location, easy to reach by car or public transport. Always very clean and well
> maintained, and the owners are very friendly. You can tell they care about their customers'
> wellbeing. Keep it up!"
- Foto: `https://lh3.googleusercontent.com/a/ACg8ocLS9biEgnbPyfsuSG1IVkDqrGLRCBrDQM4Vf2XqvsZT-Gc-Tw=w36-h36-p-rp-mo-br100`

### 7. Tanja — ⭐⭐⭐⭐⭐  *(higiene + equipe)*  *(perfil "T." — usar fallback de iniciais)*
> "Highly recommended, now I only go here. The renovation is fantastic, very hygienic, friendly
> staff. Congrats!"
- Foto: sem foto pública → iniciais no Avatar.

### 8. Daniel Fernandes — ⭐⭐⭐⭐⭐  *(curto, positivo)*
> "It was great, I'd love to come back."
- Foto: não capturada → verificar na implementação; senão, iniciais.

---

## Cobertura das dores (checagem)

| Dor da pesquisa | Reviews que provam |
|---|---|
| Limpeza / higiene (#5) | Jasmina, Florian, Izeir, David, Melissa, Tanja |
| Equipe cordial apesar do autoatendimento (#4/#5) | Marion, Melissa, Tanja |
| Fácil de usar (#4) | Jasmina |
| Resultado natural, não "laranja" (#6) | Izeir |
| Recomendação geral / confiança | Marion, Tanja, todos |

**Status:** 8 reviews prontos. Se o Felipe quiser chegar a 10-12, dá pra puxar mais no Google (o
scroll do Maps é instável, mas viável em nova tentativa). Para o template escolhido, 8-9 já preenchem
bem o "wall of love".
