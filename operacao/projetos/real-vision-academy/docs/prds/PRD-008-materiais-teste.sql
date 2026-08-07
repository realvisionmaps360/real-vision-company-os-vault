-- =====================================================================
-- PRD-008 · Materiais de teste da aula 0.1
--
-- Por que existe: o painel de Materiais do Bloco 2 está implementado com os
-- três tipos de card (prompt, link, arquivo), mas a aula 0.1 não tem nenhum
-- material cadastrado — então os cards nunca renderizaram com dado real. Este
-- SQL insere um de cada só para a verificação visual.
--
-- São materiais GENÉRICOS, de teste. Trocar ou apagar quando o conteúdo real
-- da aula existir (ver "Para remover" no fim).
--
-- Rodar no SQL Editor do Supabase, logado como o Felipe (KI-29).
-- =====================================================================

-- Aula 0.1 "O que é um Profissional 360°" do curso profissional-360.
-- id confirmado em 07/08/2026.

insert into public.materials (lesson_id, type, title, url, content)
values
  -- 1. PROMPT — aba "Prompts". Vai pro corpo em JetBrains Mono com "Copiar prompt".
  (
    '37c49e32-b60e-4716-b02b-1a90b26f78f1',
    'md_prompt',
    'Diagnóstico de presença digital de um negócio local',
    null,
    'Aja como consultor de presença digital.

Negócio: [NOME]
Cidade: [CIDADE]
Segmento: [SEGMENTO]

Analise e devolva em tópicos curtos:
1. O que já existe hoje (site, Google Meu Negócio, redes, tour virtual).
2. Os 3 buracos mais caros — o que faz esse negócio perder cliente agora.
3. A ordem de execução, do que dá resultado mais rápido para o mais lento.
4. Uma frase de abertura para falar com o dono, sem jargão.

Não invente dados. Se faltar informação, pergunte antes de responder.'
  ),

  -- 2. LINK — aba "Links". Mostra o domínio e abre em nova aba.
  (
    '37c49e32-b60e-4716-b02b-1a90b26f78f1',
    'link',
    'Perfil da Empresa no Google — central de ajuda oficial',
    'https://support.google.com/business/',
    null
  ),

  -- 3. ARQUIVO — aba "Arquivos". URL http externa abre direto; caminho do bucket
  -- privado seria assinado no client (D-010). Usamos um PDF público de teste
  -- para não depender de upload no Storage.
  (
    '37c49e32-b60e-4716-b02b-1a90b26f78f1',
    'pdf',
    'Checklist de presença digital (modelo de teste)',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    null
  );

-- Conferência: deve devolver 3 linhas, uma de cada tipo.
select type, title, url is not null as tem_url, content is not null as tem_conteudo
  from public.materials
 where lesson_id = '37c49e32-b60e-4716-b02b-1a90b26f78f1'
 order by type;

-- =====================================================================
-- Para remover depois (quando entrar material de verdade):
--
--   delete from public.materials
--    where lesson_id = '37c49e32-b60e-4716-b02b-1a90b26f78f1'
--      and title in (
--        'Diagnóstico de presença digital de um negócio local',
--        'Perfil da Empresa no Google — central de ajuda oficial',
--        'Checklist de presença digital (modelo de teste)'
--      );
-- =====================================================================
