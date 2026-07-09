---
name: feedback_whisper_transcricao
description: "Whisper é a ferramenta padrão de transcrição de áudio da Real Vision — instalado no PC, sem custo por uso"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a086a59d-a2c0-40de-b972-f507bb9ce909
---

Whisper (openai-whisper) é a ferramenta padrão para transcrever áudios do Felipe/Real Vision.

**Configuração padrão:**
- Modelo: `base` (rápido, funciona bem para PT-BR)
- **NUNCA forçar `language=`** — deixar o Whisper detectar o idioma automaticamente (forçar idioma errado causa alucinações graves)
- Sempre usar `sys.stdout.reconfigure(encoding='utf-8')` para evitar erro de encoding no Windows

**Script padrão:**
```python
import whisper, sys
sys.stdout.reconfigure(encoding='utf-8')
model = whisper.load_model('base')
result = model.transcribe(r'CAMINHO_DO_ARQUIVO')
print('Idioma detectado:', result['language'])
print(result['text'])
```

**Why:** instalado localmente, sem custo por uso, sem enviar áudio para nuvem.

**How to apply:** quando Felipe pedir transcrição de áudio (WhatsApp, gravação, etc.), usar este script diretamente via Bash.
