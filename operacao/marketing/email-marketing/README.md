# Email Marketing da Real Vision — Projeto Hermes

> Hub da pasta. Começa por aqui. Cada documento numerado tem um dono claro e não repete o do lado.

**Estado em 27/08/2026:** campanha 004 email 1 **disparada** (28 contatos, 0 falhas). Emails 2, 3 e 4
escritos e agendados. Emails 5 a 12 ainda não escritos.

---

## Os documentos

| # | Documento | Para quê |
|---|---|---|
| 00 | [[00-ESTRATEGIA]] | Princípios de email da Real Vision. **Fonte única da estratégia.** Não duplicar em outro lugar |
| 01 | [[01-PLANO-EXECUCAO]] | Infra: Resend, Supabase, domínio, funções |
| 02 | [[02-TIMELINE]] | O que aconteceu, em ordem. Registro histórico |
| 03 | [[03-SEGMENTACAO-CONTATOS]] · [[03-CLIENTES-REATIVACAO - Corrigido]] | Quem é quem na lista |
| 04 | [[04-CALENDARIO-EDITORIAL]] | **Estado editorial canônico.** Que email sai, quando, com qual post e qual gancho |
| 05 | [[05-SISTEMA-RESPOSTA-PERSONALIZADA]] | Proposta de arquitetura pro 1:1 depois da resposta. Nada implementado |
| 06 | [[06-MANUAL-APRENDIZADO]] | A escola do Felipe, em 6 níveis |
| 07 | [[07-COMO-ADICIONAR-CONTATOS]] | Processo fixo de entrada de contato novo |
| — | [[LEITURA-NARRADA-EMAILS]] | Todos os emails em texto corrido, pra ler em voz alta antes de aprovar |
| — | [[PROCESSO-EDITORIAL-EMAIL-BLOG-CHATGPT-VOZ]] | Como blog post vira email. Veio do ChatGPT/LBOS, mergeado em 27/08 |
| — | `campanhas/` | Os HTMLs disparados + [[INDICE-CAMPANHAS]] |
| — | `referencias/` | Os 4 mestres: Walker, Korpershoek, Hormozi, Lead Gen Jay |
| — | `scripts/` | `disparar-campanha.ps1` (não versionado — ver aviso abaixo) |

---

## Regras que não mudam

1. **Todo email parte do `skills/rv-email/assets/template-newsletter.html`.** Nunca de uma cópia de
   campanha antiga. O modelo correto é o da campanha 002: masthead em imagem, CTA como link
   sublinhado, sem hero solta, assinatura com foto.
2. **Antes de qualquer teste visual, comparar contra um email real já disparado.** Não confiar de
   memória em qual template está ativo. Foi assim que o erro de 21/08 aconteceu.
3. **Nenhum email consolidado sem ler o conteúdo real do post** em `real-vision-core`,
   `src/data/blog-posts.ts`. Título e memória não bastam.
4. **Descadastro em todo email.** É a `hermes-send` que injeta, e é inegociável.
5. **Ninguém entra na lista sem ter dito que quer.** Ver [[07-COMO-ADICIONAR-CONTATOS]].
6. **Nada é disparado sem aprovação explícita do Felipe.**

---

## Como disparar (pipeline oficial)

A função `hermes-send` no Supabase (`ghwjetvazmdlaqidgxqi`) é o pipeline oficial. Ela exige o header
`x-hermes-key` com o `HERMES_SECRET`, envia por `contato@realvisionmaps.com`, recusa contato que não
esteja `ativo`, injeta o link de descadastro e grava em `email_envios`.

O `scripts/disparar-campanha.ps1` roda a lista inteira por cima dela, lendo o segredo de um `.env`
local que nunca vai pro git.

As métricas voltam sozinhas pelo webhook do Resend (`resend-webhook`), que atualiza entrega,
abertura, clique e bounce em `email_envios`. Métrica confiável só existe **a partir de 20/08/2026**.

---

## Pendências abertas

- [ ] Escrever a Fase 2 (emails 5 a 8) **antes de 16/09** — senão a cadência quebra
- [ ] Ajustar o P.S. do email 4 antes de 11/09 (promete conteúdo que hoje é o email 9)
- [ ] Limpar os 3 contatos de `origem_consentimento = teste` da lista, que sujam a métrica
- [ ] Apagar pelo painel do Supabase as funções `hermes-campanha` e `hermes-test-send` — já estão
      desativadas (respondem 410, sem acesso a segredo), mas continuam listadas
- [ ] Publicar em produção a captura de lead do blog (`capture-community-lead`), que é o único
      caminho que faz a lista crescer sem trabalho manual

---

## ⚠️ Aviso sobre versionamento

O `.gitignore` do vault só versiona `.md`. Isso já custou caro: em 21/08 foram criados o
`04-CALENDARIO-EDITORIAL.md`, este `README.md` e o `INDICE-CAMPANHAS.md`, e **os três sumiram sem
nunca terem sido commitados**. O 04 e os outros só voltaram porque existia cópia em
`TEMP/pacote-email-marketing-2026-08-21/`. Este README e o índice tiveram que ser reescritos do zero.

Consequência prática: os HTMLs em `campanhas/` e o script em `scripts/` **não estão no git**. Vivem
só nesta máquina. Vale decidir se entram no versionamento.

---

## Relacionados

- [[04-CALENDARIO-EDITORIAL]] · [[07-COMO-ADICIONAR-CONTATOS]] · [[02-TIMELINE]]
- Skill: `skills/rv-email`

## Histórico

| Data | O que mudou | Motivo |
|---|---|---|
| 2026-08-21 | Versão original criada | Sessão `email1` |
| 2026-08-27 | **Reescrito do zero** | O original se perdeu sem cópia. Reconstruído com o estado real de hoje, depois do disparo da campanha 004 |
