# O que é este arquivo — Banco de Dados

São **dois arquivos**, um para cada versão do site (V1 e V2 têm bancos de dados separados):

- `03-banco-de-dados-versao-1.sql` — cópia completa dos dados do banco por trás da Versão 1 (a que ficou no ar em brazilcomp.com.br)
- `03-banco-de-dados-versao-2.sql` — cópia completa dos dados do banco por trás da Versão 2 (reconstrução em código próprio, nunca publicada no domínio definitivo)

Cada um contém: produtos cadastrados, pedidos, clientes e demais informações da respectiva versão da loja.

## O que fazer com eles

Um desenvolvedor técnico pode importar cada arquivo dentro de um banco de dados Postgres novo — por exemplo, criando um projeto novo e gratuito no Supabase, ou em qualquer outro serviço de banco de dados Postgres — para recuperar os dados que estavam cadastrados na respectiva versão.

## Observação

Esse arquivo, sozinho, não faz nada funcionar — ele precisa ser importado por alguém técnico e conectado ao código do site (Versão 1 ou Versão 2) para que os dados voltem a aparecer.
