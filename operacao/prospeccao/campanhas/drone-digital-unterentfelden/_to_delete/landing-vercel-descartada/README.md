# Drone & Digital Unterentfelden — landing page

Página estática autocontida (um único `index.html`, CSS e JS inline).

## Antes de subir — dois placeholders

1. **Access Key do Web3Forms** — em `index.html`, procure
   `SUA-ACCESS-KEY-DO-WEB3FORMS` e troque pela chave.
   O processo é o mesmo já documentado em `PASSO-1-CHAVE-EMAIL.md` no vault.
   Sem a chave a página funciona, mas o formulário avisa que não está ativo.

2. **Link do tour 360 de Unterentfelden** — na seção `#beispiel`, o botão
   "360°-Ansicht öffnen" está com `href="#anfrage"`. Troque pelo link do tour.
   Se preferir embutir, substitua o bloco `.demo` por um `<iframe>`.

## Deploy na Vercel

```bash
npx vercel --prod
```

Nomeie o projeto como **drone-unterentfelden** para a URL bater com a que está
nos rascunhos de email: `https://drone-unterentfelden.vercel.app`

Se usar outro nome ou domínio próprio, avise que eu regenero os rascunhos.

## Identidade

Segue `contexto/DESIGN.md`: fundo `#0a0d14`, âmbar `#F5A623`, Bebas Neue nos
títulos, Inter no corpo, JetBrains Mono nas labels. Voz conforme `contexto/VOZ.md`
(direta, técnica, sem hipérbole).

## Dados citados na página

Os números da faixa de estatísticas vêm do levantamento real feito em 13.08.2026
(`Drone-Digital-Aarau-levantamento.xlsx`): 64 negócios verificados, 23 perfis não
reivindicados. Se a área mudar, atualizar os números junto.
