# Prompt para o Claude que tem acesso ao Company OS

> Copie tudo que está dentro do bloco abaixo e cole no Claude do vault.
> O resultado vem pelo Google Drive e vai dentro de `campanha-acquisition-amp/`.

---

```text
Preciso montar um pacote de arquivos do Company OS da Real Vision 360 para uma missão que
está rodando em outro notebook, num workspace separado do vault.

Contexto: campanha de aquisição para vender Website a estúdios de música no Brasil. O
workspace já tem os 15 documentos institucionais e do Acquisition System. O que falta são
as skills operacionais e alguns arquivos de apoio que os documentos citam mas que não foram
copiados.

Monte uma pasta chamada `pacote-campanha-estudios/` com esta estrutura. Me diga também qual
a melhor forma de transferir: tenho Google Drive disponível e é o caminho mais simples pra
mim, mas se houver opção melhor, diga.

pacote-campanha-estudios/
├── skills/
│   ├── rv-prospeccao/     SKILL.md e todos os arquivos de apoio
│   ├── clarisso/          SKILL.md e arquivos de apoio
│   ├── rv-copy/           SKILL.md e arquivos de apoio
│   └── rv-relatorio/      SKILL.md e arquivos de apoio
│
├── contexto/
│   └── DESIGN.md          identidade visual: paleta, tipografia, rotas
│
├── referencia-campanha/
│   ├── apify-config.json          de campanhas/drone-digital-unterentfelden/dados/
│   │                              é a config exata das 4 varreduras. O mais
│   │                              importante deste bloco
│   ├── area-COMO-FOI-MEDIDA.md    mesmo lugar. O método de delimitação de área
│   └── paraty-pousadas-contatos.md   um exemplo do formato de arquivo de campanha,
│                                     a "camada humana de trabalho"
│
├── conhecimento/
│   └── landing-de-campanha-com-captura-propria.md
│       de LBOS/05-Conhecimento/, é o CON-2026-005, tem a lição de copy
│
├── clientes/
│   └── o export mais recente do VisionFlow que está em operacao/clientes/
│       Preciso disso para cruzar no dedup: o ACQUISITION-OPERATING-SYSTEM secao 1
│       manda rebaixar quem já é cliente Real Vision, e sem esse export não tenho
│       como checar. Se tiver dado sensível de cliente, me avise antes de incluir
│
└── amp/
    └── alvo-site-AMP-referencia.md
        SE existir no vault. O PROMPT-INICIAL da missão manda ler esse arquivo, mas
        ele não veio no pacote original. Se não existir, me confirme que não existe
        em vez de criar um. Já tenho acesso ao projeto amp-estudio em disco

Três regras para montar o pacote:

1. NENHUMA credencial. Sem service role key, sem token de API, sem senha, sem connection
   string, sem conteúdo de .env. Se algum arquivo contiver um valor desses, substitua pelo
   nome da variável e me avise qual arquivo foi.

2. Não modifique nada no vault. É só cópia de leitura. Não apague, não renomeie, não
   "melhore" nenhum arquivo original.

3. Se algum arquivo da lista não existir, não invente nem crie substituto. Escreva o que
   faltou num FALTOU.md dentro do pacote, dizendo o nome do arquivo e onde você procurou.

No fim, me devolva três listas: o que entrou, o que não existe, e se encontrou alguma
credencial que teve que remover.
```

---

## Depois que o pacote chegar

Coloque a pasta `pacote-campanha-estudios/` dentro de `campanha-acquisition-amp/` e me
avise. Eu integro as skills, confiro se elas citam algo que não existe nesta máquina, e
sigo.
