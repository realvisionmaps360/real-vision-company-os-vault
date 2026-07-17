---
name: "Session Handoff"
description: "Produce a repeatable end-of-session summary so the user can /clear and start a fresh agent without losing continuity. TRIGGER when user says: 'session handoff', 'wrap up session', 'hand off', 'handoff summary', 'let's wrap up', 'summarize before I clear', 'terminar sessao', 'encerrar sessao', 'vamos encerrar', 'resumo antes de limpar', or any near-equivalent. Also invoke proactively if the user says they're about to /clear without having run it yet."
---

# Session Handoff Skill

> **Nota de escopo Real Vision (12/07/2026):** dentro do contexto Real Vision, esta skill não é mais o ponto de entrada padrão pra "handoff"/"session handoff" — quem recebe esse gatilho primeiro é [[rv-fim-sessao]], que decide o que gravar permanentemente (FICHA-CLIENTE/TIMELINE de cliente, ou TIMELINE/playbook de projeto interno) e só invoca este bilhete efêmero como complemento, se sobrar trabalho técnico pela metade. O comportamento desta skill em si não mudou — continua chat-only, nunca grava arquivo. Fora do contexto Real Vision (outros projetos), esta skill funciona exatamente como sempre, sem essa camada.

Produce a repeatable end-of-session summary so the user can `/clear` and start a fresh agent without losing continuity. The next agent should be able to pick up by reading this summary alone.

This is a context-handoff artifact, not a status report. The audience is a future instance of you, not a stakeholder.

## How to produce the summary

1. Review the full conversation, not just the last few turns. Handoffs miss things when they only summarize recent context.
2. Pull state from these sources (in order):
   * Plan files referenced this session (check `C:\Users\Computador\.claude\plans\` if a plan was mentioned).
   * TodoWrite state — any in-progress or pending tasks.
   * Background processes you started with `run_in_background` — shell IDs are load-bearing for the next agent.
   * Files created or modified this session — you know what you touched; don't grep to re-discover.
   * Memory files written or updated (`C:\Users\Computador\.claude\projects\<project>\memory\`).
   * Unresolved questions — things you asked the user that never got a clear answer, or things the user asked that got deflected.
   * Skills loaded via the `Skill` tool this session — every one you invoked, even if only used briefly. Skills never carry over automatically after `/clear`; this list is the only way the next agent knows to reload them.
3. Do NOT audit the filesystem. This is synthesis of what happened in THIS session. No `git log`, no broad `Glob` sweeps. If you didn't touch it this session, it doesn't belong here.
4. Produce the output in chat. Do not write a file. Do not update memory. Chat-only.

## Output template — use exactly this structure, every time

```
# Session Handoff — <one-line title of what this session was about>

## Where it started
<2-3 sentences: what the user asked for, key framing or constraints that emerged>

## Decisions locked + what shipped
- <decision or change> — <why, and where it lives (absolute path if a file)>
- ...

## Key files for next session
- `<absolute path>` — <why the next agent should read this first>
- Plan file: `<path>` (if a plan drove the session)
- Memory files touched: `<paths>` (if any)

## Skills to reload next session
- `<skill-name>` — <why it's needed to continue this work> — or "none"

## Running state
- Background processes: <shell IDs + what they are + how to kill> — or "none"
- Dev servers / ports: <url + port> — or "none"
- Open worktrees / branches: <paths> — or "none"

## Verification — how to confirm things still work
- `<command>` — <expected outcome>
- ...

## Deferred + open questions
- Deferred: <item> — <why pushed to later>
- Open: <question needing the user's input> — <context>

## Pick up here
<1-2 sentences: the single most likely next action for a fresh agent>
```

## Hard rules

1. Chat output only. Never write the handoff to a file. Never update memory from this skill.
2. Never invent state. If a section has nothing to report, write "none" — do not omit the section. Structure stability is the whole point.
3. Absolute paths always. The next agent may have a different working directory.
4. If a plan file drove the session, name it first in "Key files" so the next agent reads it before anything else.
5. No emojis, no hype, no "great job" summaries. Terse and concrete — paths, commands, shell IDs, decisions. Match the tone of a seasoned engineer handing off at end-of-shift.
6. Background process IDs are critical. If you started any `run_in_background` shells, their IDs must appear in "Running state" with the kill command — the next agent cannot find them otherwise.
7. Skills do not persist across `/clear`. If this session loaded any skill via the `Skill` tool, it must appear in "Skills to reload next session" — omitting it leaves the next agent blind to work that depended on it.

## Anti-patterns — do not do these

* Summarizing the last 3 turns and calling it a handoff.
* Listing files by relative path.
* Skipping the "Running state" section because "nothing is running" — write "none" instead.
* Writing the summary to `~/.claude/handoffs/` or any file. This is chat-only by design.
* Adding a "what went well / what went poorly" retrospective. This isn't a retro.
* Recommending next steps beyond the single "Pick up here" line. The next agent decides; you just hand off.
