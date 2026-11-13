# Memory

Every agent you use shares Slate's memory. It is stored as docs you can read.

- **Slate is an MCP server.** A tool that speaks MCP (Claude Code, Codex, Cursor, GitHub Copilot, Antigravity, OpenCode, Gemini, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code, Auggie) starts a session with the project's memory index, searches with `recall` and saves with `remember`. One workspace, many tools.
- **A watcher fills it in.** It reads the conversation files your agents already write and stores each session as a doc. It also reads the memory folders Claude Code, Gemini CLI and Codex keep for themselves, for the folders you added as projects.
- **Memory is your docs.** Sessions, decisions and other memories live in the same local SQLite workspace as everything else. Fix a wrong doc and the next `recall` reads the correction.

## In this section

| Doc | What it covers |
| ---- | -------------- |
| [Session Capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md) | The watcher that captures AI sessions as docs. |
| [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md) | Search and citing, with links to the session brief, lessons, saving and tidying. |
| [Decisions & Memories](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md) | Logged choices with rationale, and durable knowledge ranked for recall. |
| [Memory Graph](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) | Memories on the files they cite, coloured by use. |

The tools every AI client calls are in [Slate as an MCP Server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md).

`recall` reads the workspace on this machine that owns the working folder, and never leaves the machine. What you put in a [shared workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) is readable by colleagues and their AI through a scope of its own, `recall` with `scope: "workspaces"`, which asks the cloud.
