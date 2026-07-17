# Google Drive API — Upload/Download via REST (Linux/Hermes WebUI)

> Como subir e baixar arquivos do Google Drive quando o browser tool não está disponível.
> Usa OAuth2 com refresh token armazenado em `/home/hermeswebui/.hermes/google_token.json`.

## Refresh token → novo access token

```bash
curl -s -X POST "https://oauth2.googleapis.com/token" \
  -d "client_id=$(cat ~/.hermes/google_client_secret.json | python3 -c 'import sys,json; print(json.load(sys.stdin)["installed"]["client_id"])')" \
  -d "client_secret=$(cat ~/.hermes/google_client_secret.json | python3 -c 'import sys,json; print(json.load(sys.stdin)["installed"]["client_secret"])')" \
  -d "refresh_token=$(cat ~/.hermes/google_token.json | python3 -c 'import sys,json; print(json.load(sys.stdin)["refresh_token"])')" \
  -d "grant_type=refresh_token"
```

O token tem validade de 1 hora. Guardar em variável para usar nas chamadas seguintes.

## Listar arquivos de uma pasta

```bash
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://www.googleapis.com/drive/v3/files?q='FOLDER_ID'+in+parents&fields=files(id,name,mimeType,size)"
```

## Baixar arquivo

```bash
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://www.googleapis.com/drive/v3/files/FILE_ID?alt=media" -o output.ext
```

## Upload de arquivo (multipart) — pronto para copiar/colar

```python
import requests, json, uuid, os

# ── Config ──────────────────────────────────────────────
token_data = json.load(open(os.path.expanduser('~/.hermes/google_token.json')))
r = requests.post('https://oauth2.googleapis.com/token', data={
    'client_id': token_data['client_id'],
    'client_secret': token_data['client_secret'],
    'refresh_token': token_data['refresh_token'],
    'grant_type': 'refresh_token'
})
TOKEN = r.json()['access_token']
headers = {'Authorization': f'Bearer {TOKEN}'}

FOLDER_ID = '106cD2dAliHPLsKeYYmTfFp6Z7CCvGJSe'  # pasta Wood Art (exemplo)
LOCAL_PATH = '/workspace/real-vision-company-os-vault/operacao/clientes/arquivos/William - Wood Art/PROPOSTA-COMERCIAL-WOOD-ART_09-07-2026_v2.html'
# ────────────────────────────────────────────────────────

file_name = os.path.basename(LOCAL_PATH)
with open(LOCAL_PATH, 'rb') as f:
    file_content = f.read()

boundary = uuid.uuid4().hex

body_parts = [
    f'--{boundary}',
    'Content-Type: application/json; charset=UTF-8',
    '',
    json.dumps({'name': file_name, 'parents': [FOLDER_ID]}),
    f'--{boundary}',
    'Content-Type: text/html',
    '',
    file_content.decode('utf-8'),
    f'--{boundary}--'
]

body = '\r\n'.join(body_parts).encode('utf-8')

resp = requests.post(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    headers={**headers, 'Content-Type': f'multipart/related; boundary={boundary}'},
    data=body
)
print('Status:', resp.status_code)
print('File ID:', resp.json().get('id'))
print('Web view:', f"https://drive.google.com/file/d/{resp.json().get('id')}/view")
```

## Deletar arquivo

```bash
curl -s -X DELETE -H "Authorization: Bearer $TOKEN" \
  "https://www.googleapis.com/drive/v3/files/FILE_ID"
```

## Renomear arquivo

```bash
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"new-name.html"}' \
  "https://www.googleapis.com/drive/v3/files/FILE_ID"
```

## Mover para outra pasta

```bash
curl -s -X POST \
  "https://www.googleapis.com/drive/v3/files/FILE_ID?addParents=NEW_FOLDER_ID" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Casos reais de uso (Wood Art — 09/07/2026)

- **Pasta no Drive:** `106cD2dAliHPLsKeYYmTfFp6Z7CCvGJSe` (nome: "Wood Art")
- **Upload v2 (com foto honeycomb):** `1hFhcfF9mZwCvKrkgzc1AVU02zCp9L_sv` → `PROPOSTA-COMERCIAL-WOOD-ART_09-07-2026_v2.html`
- **Upload v1 (sem foto):** `1bs5VizydlOIDkszyCB7Z6i5Dtt_8QDJi` → `PROPOSTA-COMERCIAL-WOOD-ART_08-07-2026.html`
- **Markdowns de apoio:** `1Rue6LzaAP1mAaQULhDAZ0KkiI9xA8t9f` (01-PROPOSTA-ATUAL) e `10JdC5-vU22A1x_jcj8Jx_SmdyRcM3YRh` (02-PROPOSTA-REVISADA)

> **Dica:** ao subir nova versão de um arquivo já existente no Drive, **não sobrescrever** — subir com nome novo (`_v2`, `_v3`) pra manter histórico e evitar cache no navegador do cliente.