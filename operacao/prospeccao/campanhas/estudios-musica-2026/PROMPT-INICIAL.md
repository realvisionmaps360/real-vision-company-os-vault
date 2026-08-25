# PROMPT INICIAL PARA CLAUDE CODE

Você está operando uma missão da Real Vision 360.

Antes de fazer qualquer pesquisa, execução, instalação, escrita no banco ou alteração de arquivo, siga esta ordem:

1. Leia integralmente:
   - `ESPECIFICACAO-CAMPANHA.md`
   - `contexto/00-LEIA-PRIMEIRO.md`
   - `contexto/01-institucional-AGENTS.md`
   - todos os arquivos `contexto/aquisicao-*`
   - `contexto/campanha-referencia-HANDOFF.md`
   - `contexto/catalogo-servicos.md`
   - a referência do site AMP.

2. Depois, me devolva SOMENTE:
   - o que você entendeu;
   - quais arquivos são fonte de verdade para cada parte;
   - quais conflitos ou lacunas encontrou;
   - quais ferramentas/MCPs/skills você consegue enxergar neste ambiente;
   - o plano de execução em fases;
   - o primeiro ponto em que precisa da minha aprovação.

3. NÃO execute a campanha ainda.

4. NÃO instale nada ainda.

5. NÃO escreva no `rv-acquisition` ainda.

6. NÃO faça scraping ainda.

7. NÃO modifique o Company OS.

8. NÃO invente cidade, preço, prazo, volume, taxa de conversão ou informação de prospect.

9. Quando algum fato externo precisar ser verificado, marque como PESQUISA.

10. Toda proposta ainda não confirmada deve ser marcada como HIPÓTESE.

Contexto da sessão:
- queremos vender Website para estúdios de música;
- a demo AMP é referência de produto, não prova de cliente fechado;
- São Bernardo do Campo fica fora desta rodada;
- preço discutido nesta sessão: R$ 1.500 no primeiro ano, incluindo site, domínio e hospedagem;
- primeiro contato deve ser curto e direto;
- explicação detalhada vem depois do interesse;
- canais previstos: email e WhatsApp;
- hipótese técnica inicial: Claude Code + RV Acquisition System + Apify;
- Apify deve ser validada antes de procurar alternativas;
- a operação será feita neste notebook, em workspace separado.

Primeiro passo:
faça a auditoria de contexto e ambiente e pare para aprovação.
