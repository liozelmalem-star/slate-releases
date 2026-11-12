# Slate as an MCP Server

Slate runs an MCP server that gives every agent one workspace and one long-term memory: what one tool saves, the next recalls. All 16 agents (Claude Code, Codex, Cursor, GitHub Copilot, Antigravity, OpenCode, Gemini, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code and Auggie) can connect. Connect is measured on 15 and unverified on Kiro ([Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md)).

## What it is

Agents reach it over streamable HTTP on the running app, `http://127.0.0.1:47366/mcp` (the port follows the Mac user: 47366 for the first account, then 47367 and up), with the app's private key in a header; sessions start no processes. The `slate-mcp` binary serves the same tools over stdio, for Claude Desktop and other stdio-only clients.

## The recall / remember contract

Every connected model gets a standing instruction (within Claude Code's 2,048-character limit); tool descriptions hold the detail.

* **Start.** If no brief opened the session and no direct tool answers, call `recall({ query: "current branch goal and context", cwd })` for decisions, conventions, memories and the branch brief.
* **During.** `record_decision` keeps a decision and its reason. At a milestone the agent asks whether to save a plan, review, test plan, bug report or design, and calls `create_doc` only after a yes. It lists the refs of memories that shaped its work in `used`, never in its reply. If a memory's `citation` says `changed`, it reads the code first, and calls `remember` with `replaces` if the memory is wrong.
* **End.** The agent must call `log_mission_progress` once before its final reply, and saves at most two memories, only what will change how a future agent acts.

How the two verbs rank, stay silent and dedupe is in [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).

A client never calls a mutating tool to test the connection: `slate_capabilities` is the read-only check. A write to an existing doc takes its id from a prior Slate result or from you.

## The shared half

`recall` searches the workspace owning the working folder, on this machine only (in a shared workspace, that includes teammates' work your copy holds). `recall_workspaces` and `workspace_doc` search the cloud across every shared [workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) you belong to, even ones this machine has not added. Both are read-only; Row Level Security decides what they see. They are separate verbs so private and shared knowledge stay distinguishable.

## Capability discovery

The contract id is `slate-mcp-contract/2026-11-10`; `slate_capabilities` returns version, tools, access levels, approval policies and schema hash.

## See also

* [Tool Reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md) — all 27 tools and their arguments.
* [Connecting Your Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/connecting.md) — wire a tool to Slate.
* [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) — what `recall_workspaces` reads.
* [Connected MCP Tools](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/connected-tools.md) — the reverse direction, where Home is the client.
