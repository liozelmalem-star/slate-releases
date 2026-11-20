# Memory

Memory is what Slate remembers from your agents' work: decisions, lessons, preferences,
lasting knowledge and where things stand. Every agent you connect shares it, so what one agent learns
reaches the next session in any agent.

## How memory fills

- **Agents save it.** A session saves one memory at a time with Slate's `remember` tool
  ([Search and save](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md)).
- **Slate captures sessions.** It reads the conversation files your agents already write
  and keeps each session ([Session capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md)).
- **Slate reads your agents' own memory.** Claude Code and Gemini each keep a memory
  folder the other agents do not read. Slate reads them for the folders you added as
  projects, so one agent's learning reaches the rest.
- **You import it.** **Import**, the down arrow in the Memory panel's title row, reads
  Claude Code, Codex, Gemini, claude-mem, agentmemory, mem0, Basic Memory and Cline
  Memory Bank. It shows what it would add before it adds anything. A memory from a folder
  that is no project in this workspace is left out ([Import](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/import.md)).

## How memory reaches a session

1. **At the start**, a session gets a short brief with the project's most useful memories
   ([What a session is given](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md)).
2. **While it works**, it searches with `recall` for what its task needs
   ([Search and save](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md)).
3. **On a tool call**, a lesson about that command or file arrives with the call
   ([Lessons](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md#lessons)).

When the session uses a memory, it names it. That is how Slate learns which memories help.

## Read and fix it

The **Memory** place shows every memory on a map of the files it is about, with a list
beside it to read, search, correct and retire ([The Memory screen](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md)). Fix a wrong
memory there and the next session reads the correction.

## Where it is kept

Memory lives in the workspace on this computer that holds the project. `recall` reads it
there and does not leave the computer. What you put in a
[shared workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) is readable by its members and their agents.

## In this section

| Read | What it covers |
| --- | --- |
| [The Memory screen](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) | The map, the list, a memory's card, review and rules |
| [Session capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md) | How Slate keeps your agents' sessions |
| [What a session is given](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md) | The brief, the index, and choosing what agents get |
| [Search and save](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md) | `recall`, `remember`, lessons and citing |
| [Kinds of memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md) | The five kinds, decisions, shelf life, and what a project keeps |
| [Tidying memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md) | Tidy proposals, AI memory care, lessons from what you decline |
