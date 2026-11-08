# Core Concepts

Slate is one home for every AI coding tool: every session live on your Mac, and one memory plus one set of skills and rules for all 16 tools. Six ideas underlie it.

## 1. Everything is a doc

The [doc](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md) is Slate's universal unit. A group, a project, a design doc and a captured AI session are all rows in one `doc` table, told apart by an optional `doc_type`. Docs nest in a tree (`parent_id`), order by a fractional `position` so drag-reorder never renumbers the tree, and hold their content as block-editor JSON. The same few operations (create, read, update, move, Trash) work everywhere, by hand or by AI.

## 2. Typed documents give work structure

A doc can be [typed](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md): `group`, `project`, `branch`, `plan`, `design`, `review`, `meeting`, `test-plan`, `bug-report`, `mission` or plain `general`. The type pre-fills a template and limits where the doc can live. A `branch` sits under a `project`. A `project` sits under a `group` or stands alone. Knowledge docs (plans, designs, reviews) hang off any of them, so memory tools resolve "the plan for the branch I'm on" without an id.

## 3. One memory, shared over MCP

Slate is also a [memory server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md). It speaks [MCP](https://modelcontextprotocol.io), so any of the 16 [tools](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md), or Slate's own [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md), calls the same two verbs:

* **`recall`** at the start of a task loads the relevant context: the brief for your branch, project conventions, project memories.
* **`remember`** at the end saves a decision, result or preference, filed on the doc the hierarchy resolves to.

A [filesystem watcher](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md) captures the sessions themselves, so memory grows even when a tool forgets to write.

## 4. Agents drive your CLIs

Slate ships no model and asks for no API key. An [agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md) is a thin driver over a CLI you already installed and signed in to: **Claude Code**, **Codex**, **Cursor**, **GitHub Copilot**, **Antigravity**, **OpenCode**, **Gemini**, **Cline**, **Grok Build**, **Kiro**, **Qwen Code**, **Droid**, **Hermes Agent**, **Goose**, **Kilo Code** or **Auggie**. Slate launches it from Rust, so credentials stay in those tools. A light model works because code [resolves the tool and prefills its arguments](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/mcp-commands.md) and the model fills only the gaps.

## 5. Toolkit is one playbook for every tool

[Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) is where you write instructions and skills once, in `AGENTS.md` and `.slate/`, and project them into every agent's native config. Change the playbook, run `yarn studio sync`, and every tool picks it up. [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md) says which tools it reaches today.

## 6. A workspace is shared or private as a whole

[Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) share by **container**. A team's workspace is the team's, and everything in it is shared. Your **Personal** workspace starts unshared and syncs only if you switch its sharing on. Each shared workspace is its own SQLite file; switch from the top of the rail. Nothing is marked doc by doc: private work stays in an unshared workspace.

Sharing is one-way, and each doc has one writer, its author. That keeps merge conflicts and version columns out of the design. A teammate's doc opens read-only in the real editor, with a line saying why.
