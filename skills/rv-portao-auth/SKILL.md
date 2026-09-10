---
name: rv-portao-auth
description: Como construir e consertar portões de autenticação com papel/permissão em sites React (SPA) com Supabase — os painéis administrativos que a Real Vision entrega pros clientes. Use SEMPRE que o sintoma for "não consigo entrar no painel", "fica carregando pra sempre depois do login", "entra e volta pro login", "pisca e não sai do lugar", "loop de login", tela protegida que expulsa usuário legítimo, ou quando for CRIAR/ALTERAR qualquer rota protegida, checagem de admin, `ProtectedRoute`, `useAuth`, ou fluxo de senha provisória / primeiro acesso. Carregar junto com `supabase-postgres` (§4) e, se houver suspeita de instabilidade do backend, com `rv-incidente-supabase`.
---

# 🔐 RV Portão de Autenticação — Supabase + React SPA

Os painéis que a Real Vision entrega seguem sempre o mesmo desenho: site público,
uma rota de login (`/secure`), uma rota protegida (`/admin`) e uma checagem de papel
no banco. Esse desenho tem **um jeito certo e vários jeitos que parecem funcionar
até o cliente tentar entrar.**

Esta skill existe porque o mesmo defeito já apareceu em produção, num cliente real,
e custou horas para ser encontrado — apesar de senha, banco, permissão e
infraestrutura estarem todos corretos.

> Ver também: `supabase-postgres` §4 (sessão e resiliência de rede),
> `rv-incidente-supabase` (quando a suspeita é o backend, não o código).

---

## 1. A regra que resolve 90% dos casos

**Permissão nunca é um booleano. São três estados, no mínimo:**

```typescript
type Papel = 'checando' | 'admin' | 'nao-admin' | 'erro';
```

| Estado | Significado | O portão faz o quê |
|---|---|---|
| `checando` | Ainda não sei | **Espera.** Não libera e não expulsa |
| `admin` | O banco respondeu que sim | Libera |
| `nao-admin` | O banco respondeu que não | Manda pro login |
| `erro` | Não consegui perguntar | Tela honesta com "Tentar de novo" |

Um booleano `isAdmin` só tem `true` e `false` — e ele **começa em `false`**. Isso
significa que, por um instante, "ainda não sei" é indistinguível de "não é admin".
É nesse instante que o portão expulsa o usuário legítimo.

**Nunca inicialize uma permissão como negada.** Inicialize como desconhecida.

---

## 2. O defeito clássico: ping-pong entre login e painel

### Como ele se manifesta

- O cliente digita email e senha
- A tela fica em "Carregando..." e **nunca sai**
- A URL continua na página de login
- **Nenhum erro no console**
- Na aba de rede: **dezenas ou centenas da mesma requisição de permissão**, todas com status 200

### Por que acontece

1. Login dá certo → a página de login consulta o papel → descobre que é admin
2. Navega para `/admin`
3. `ProtectedRoute` monta uma instância **nova e zerada** da checagem
4. A sessão resolve primeiro (`loading = false`), mas o papel ainda não foi consultado — **efeitos do React rodam depois da renderização**
5. Naquele render: sessão existe, `isAdmin` é `false` → o portão conclui "não é admin" e redireciona pro login
6. Volta ao passo 1, para sempre

Cada volta gasta uma consulta ao banco. **É por isso que a assinatura desse defeito
é o contador de requisições, não a mensagem de erro** — não existe mensagem de erro.

### A correção

Estado de três valores (§1) **+** uma única fonte de verdade (§3). Só isso fecha a
janela do passo 4. Adicionar mais um booleano de `carregando` não fecha — porque ele
também começa no valor errado.

---

## 3. Uma sessão, um listener, uma consulta

**Errado** — cada tela chama o hook por conta própria:

```typescript
// SecurePage.tsx
const { user, isAdmin } = useAuth();     // instância 1
// ProtectedRoute.tsx
const { user, isAdmin } = useAuth();     // instância 2, estado zerado
// DefinirSenhaPage.tsx
const { loading } = useAuth();           // instância 3, estado zerado
```

Três estados independentes, três listeners de sessão, três consultas de papel para
o mesmo usuário. Toda navegação entre elas recomeça do zero — que é exatamente o
combustível do ping-pong.

**Certo** — um `AuthProvider` com Context, montado uma vez em volta das rotas:

```typescript
// App.tsx
<AuthProvider>
  <BrowserRouter>
    <Routes>…</Routes>
  </BrowserRouter>
</AuthProvider>
```

As telas passam a consumir o mesmo estado. Ao navegar, o papel **já está resolvido**
— não há janela para fechar.

Isso vale junto com a regra de singleton do `createClient()` (`supabase-postgres` §4):
um client, um provider.

---

## 4. Toda consulta de permissão precisa de guarda de tempo

Uma consulta sem limite de tempo não falha — ela **pendura**. E uma tela que espera
uma resposta que nunca chega vira spinner eterno, que é o pior estado possível:
o usuário não sabe se espera, se recarrega ou se desistiu.

```typescript
// Errado: sem catch, sem status, sem prazo
supabase.rpc('get_current_user_role').then(({ data }) => {
  setIsAdmin(data === 'admin');   // se der ruim, isso nunca roda
});
```

O mínimo aceitável:

- Ler `{ data, error, status }` — **nunca** só `data`
- Prazo máximo (~8s). Estourou → estado `erro`, não fica pendurado
- No máximo 2 tentativas em janela curta, depois para (circuit breaker)
- Limpar o estado quando o componente desmontar

E a regra que vem do `supabase-postgres` §4, que aqui é crítica:

> **Erro de rede, timeout, 5xx, 402 ou 429 nunca viram "não autorizado".**
> Isso é ausência de resposta, não uma resposta negativa. Trate como `erro`
> ("não sei"), jamais como `nao-admin`.

Tratar instabilidade como negação é o que transforma um soluço de rede em avalanche:
expulsa → reautentica → consulta de novo → falha de novo.

---

## 5. Senha provisória e primeiro acesso

Quando a conta é criada pela Real Vision, o cliente recebe uma senha provisória e a
conta fica marcada (ex: `must_change_password` no metadata). Regras:

- Quem decide o desvio para a troca de senha é **o portão**, num lugar só. Se a tela
  de login manda pro painel e o painel devolve pra troca de senha, você criou mais um
  salto — e cada salto é uma chance de ping-pong. **Mande direto.**
- A tela de nova senha precisa chamar `updateUser` **de verdade** e limpar a marca no
  mesmo passo. Já aconteceu de a tela existir, o link do email funcionar, e a senha
  nunca ser gravada — o cliente ficava pedindo redefinição infinitamente.
- Link de recuperação expirado tem que dizer "expirado", não falhar calado.
- Depois de gravar, deslogar de propósito e pedir o login com a senha nova: o cliente
  confirma na hora que funcionou.

---

## 5.1 Mais de um papel: o portão não é o único lugar a mexer

Quando um segundo papel entra em cena (ex: `gestor` da Real Vision além do `admin`
do cliente), a tentação é estender só o `ProtectedRoute`. **Não basta.** A tela de
login também decide destino, e ela costuma ter o papel antigo cravado:

```typescript
// Só o admin é levado a algum lugar. O gestor autentica e fica preso na tela.
if (carregandoSessao || papel !== 'admin' || !user) return;
navigate('/admin', { replace: true });
```

O sintoma engana: o cliente diz "volta pro login", mas na verdade **nunca saiu dele**
— e nenhum erro aparece, porque não houve erro.

Ao acrescentar um papel, varra **todos** os pontos que decidem destino:

- [ ] a tela de login navega para o destino de **cada** papel
- [ ] o portão aceita a lista de papéis daquela rota (não um papel fixo)
- [ ] o desvio de senha provisória continua acontecendo num lugar só
- [ ] rota que a pessoa tentou abrir é devolvida depois do login

E a armadilha que fecha o círculo: **papel válido em área que não é dele nunca volta
pro login.** Se o portão devolve pro login e o login manda de volta pra rota barrada,
você reconstruiu o ping-pong da §2 — agora por papel, em vez de por tempo. Mande a
pessoa para a área **dela**:

```typescript
if (!user || papel === 'sem-acesso') {
  return <Navigate to="/secure" state={{ de: location.pathname }} replace />;
}
if (!papeis.includes(papel)) {
  return <Navigate to={papel === 'gestor' ? '/projeto' : '/admin'} replace />;
}
```

**Nome de estado também envelhece.** `'nao-admin'` era claro enquanto só existia
`admin`. Com um segundo papel, ele passa a significar "não tem acesso" mas *lê* como
"não é admin" — e um gestor não é admin. Renomeie para `'sem-acesso'`: ambiguidade de
nome é a mesma doença do booleano da §1, só que mais devagar.

---

## 6. Mensagens de erro honestas no login

Mostrar "Email ou senha incorretos" para qualquer falha **esconde o problema real** e
faz o cliente tentar de novo até bater no limite de tentativas. Distinga pelo menos:

| Situação | O que dizer |
|---|---|
| `429` / rate limit | "Muitas tentativas seguidas. Espere alguns minutos." |
| `email not confirmed` | "Este email ainda não foi confirmado. Fale com a Real Vision." |
| `invalid login credentials` | "Email ou senha incorretos." |
| falha de rede | "Sem conexão com o servidor. Verifique sua internet." |

---

## 7. Diagnóstico — a receita

Quando o cliente disser "não consigo entrar", **não comece pelo código.** Meça
primeiro, nesta ordem:

1. **A senha está certa?** Chame a API de login direto:
   ```bash
   curl -s -X POST "https://<projeto>.supabase.co/auth/v1/token?grant_type=password" \
     -H "apikey: <anon_key>" -H "Content-Type: application/json" \
     -d '{"email":"<email>","password":"<senha>"}'
   ```
   200 = senha e conta OK. O problema está adiante.
2. **A permissão existe?** Com o `access_token` da resposta acima, chame o RPC de papel.
   Se responder o papel esperado, banco e RLS estão certos.
3. **Reproduza no browser** (Playwright) e **conte as requisições de permissão na aba
   de rede.** Esse número é o diagnóstico:
   - **1 ou 2** → normal
   - **dezenas/centenas, todas 200** → ping-pong de redirecionamento (§2)
   - **1 que nunca responde** → consulta pendurada, falta guarda de tempo (§4)
   - **1 que responde erro** → problema de RLS/permissão, ver `supabase-postgres`
4. Só agora abra o código.

Console limpo **não** quer dizer que está tudo bem. O ping-pong não gera nenhum erro.

---

## 8. Checklist antes de entregar um portão

- [ ] Permissão tem estado "checando", e ele é o inicial
- [ ] Um único `AuthProvider` via Context; nenhuma tela chama o hook por fora
- [ ] Nenhum caminho decide "negado" enquanto o papel está "checando"
- [ ] A consulta lê `error` e `status`, não só `data`
- [ ] Erro transiente vira "erro", nunca "negado"
- [ ] Guarda de tempo na consulta; nenhum spinner sem prazo
- [ ] Estado de erro tem tela própria com "Tentar de novo"
- [ ] Senha provisória desvia num lugar só, sem salto extra
- [ ] **Cada papel existente tem destino na tela de login** (§5.1)
- [ ] **Papel válido em área alheia vai pra área dele, não pro login** (§5.1)
- [ ] Mensagens de login distinguem os casos da §6
- [ ] **Login completo testado de ponta a ponta com screenshot de cada etapa**
- [ ] **Contagem de requisições conferida: 1 ou 2, não 200**
- [ ] Testado com a rota da consulta bloqueada: aparece a tela de erro, não spinner eterno
- [ ] Testado **em produção** depois do deploy, não só local

---

## 9. Registro

Todo incidente de portão resolvido vai para `docs/INCIDENTS.md` do repositório do
site (data, sintoma, causa raiz, ação, e o que ajustar nesta skill), como manda
`rv-incidente-supabase`. Se a causa raiz for nova, **atualize esta skill antes de
fechar a sessão.**
