# Session Capture

A **watcher** reads the conversation files your tools already write, detects completed sessions and stores each as a doc in your workspace. A tool is read only once you turn it on, in setup or **Connect → Agents**; its sessions then appear on the next pass, a few minutes at most.

Memory you kept with claude-mem or agentmemory can be brought in as well; see [Import](https://liozelmalem-star.github.io/slate-releases/docs/features/import.md).

## Which tools

* **JSONL transcripts:** Claude, Codex, Gemini, Cursor, GitHub Copilot (one folder per session, `~/.copilot/session-state/<session id>/events.jsonl`; the folder names the session).
* **SQLite, read-only:** OpenCode (`~/.local/share/opencode/opencode.db`), Hermes Agent, Goose, Kilo Code, Kiro. Each session is rendered into the same shape.

Every tool gets the same digest, noise filtering and branch attribution. Capture is measured on Claude Code, Codex, Cursor, GitHub Copilot, OpenCode, Gemini, Hermes Agent and Goose. For the other eight it is unverified or not built: see [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md).

**New tools and other configs.** The watcher also finds any agent writing JSONL transcripts under your home directory: a hidden config folder with a subdirectory (`projects`, `sessions`, `chats`, `tmp`, …) whose files parse as a role-tagged transcript. A new tool needs no registration; a non-default config directory (Claude under `~/.claude-personal`) is read as well as `~/.claude`. Folders that never hold transcripts (`~/.config`, `~/.ssh`) are skipped.

**A cloud session brought back.** A [cloud session](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md#cloud-sessions) runs on the vendor's computer, out of the watcher's sight. When you bring it back and send a message, Claude Code writes the whole conversation to a normal transcript under the worktree, and the watcher captures it. Nothing is written before that first message, so an unused task is not captured. It arrives as a record of what was said, not saved memories (the cloud part had no Slate hooks). A Codex cloud session brings back changes, not a conversation; applying it notes the task on its project's doc with files and lines changed.

## What a captured session looks like

Each session becomes a doc with these properties:

| Property | Meaning |
| -------- | ------- |
| `prompt` | The originating request. |
| `summary` | A one-line summary. |
| `tool` | The agent that produced the session. |
| `tokens` | Fresh input, cache writes and output, each model response counted once. |
| `sessionId` | Stable id linking the doc to its conversation. |
| `kind` | `session` when a `sessionId` is present, else `note`. Derived, never asserted. |
| `model` | The model that ran. |
| `branch` | The git branch the work happened on. |

The doc **body** is the **digest**: every real human turn (asks and course-corrections, where decisions live) plus the final outcome. A session on a git branch is filed under the branch and linked from its session log. It opens read-only (**Session — read only** under the title).

`branch` comes from the transcript when the tool records it (Claude Code does); otherwise a fresh capture uses the project's current branch. Historical back-fill stays project-level.

`remember` writes each memory's doc through the same writer; with no conversation it has no `sessionId` or tool, so its `kind` is `note`.

## Other tools' own memory

Claude Code, Gemini CLI and Codex each keep a memory folder that the others do not read. The watcher reads them, so one tool's learning reaches the rest:

| Tool | Folder | Filed under |
| ---- | ------ | ----------- |
| Claude Code | `<config>/projects/<project>/memory/*.md` | The project the session transcripts beside it name. |
| Gemini CLI | `<config>/tmp/<name>/memory/*.md` | The folder `projects.json` maps to `<name>`. |
| Codex | `<config>/memories/*.md` | Not read: Codex keeps these per user, with no folder to add. |

A project's memory file is read once its folder is inside a project or group you added (skipped until then; the next pass reads it). Each file becomes one memory written by that tool, citing the file. A changed file replaces its memory; a removed file retires it. Index files (`MEMORY.md`, Codex's summaries) are skipped. Slate never writes to these folders.

## Keeping the watcher running

Capture runs inside Slate and stops when you quit; at next launch a historical scan picks up sessions run meanwhile. The switch is **Auto-capture** in **Automations › Built-in**: off stops capture at once and stays off after restart. The capture hook and the local capture port scripts can post to follow it.

> **Note:** The watcher reads files already on your machine and writes only to your local workspace. Session capture sends nothing to the network.

## Turning capture off for one project

A project's **Memory** settings can turn **Capture sessions** off: sessions in its folder are not saved as docs by any route (watcher, hook, local port) and the agents' own memory files there are not read. Turning it on resumes. See [What a project keeps](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#what-a-project-keeps).

## See also

* [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md): how captured knowledge is read back.
* [Activity & Analytics](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md): session history and stats built on captures.
* [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md): what stays local.
