# Usage counts, changes and sync

Part of [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md).

## How often each item ran

**Skills**, **Commands**, **Subagents** and **MCP servers** rows show runs in this project's sessions over 30 days: **ran 4× · 3h ago**, then **1 failed** or **1 stopped by you**. Hover for runs by tool.

| Row says | When |
|---|---|
| **not run in 30 days** | Unused. |
| **not recorded yet** | No session in the project has ended. |
| **not run since** (a date) | Fewer than 30 days recorded. |
| **not measured** | No tool that reads the item records runs. |

| Kind | Tools whose sessions show it |
| --- | --- |
| Skills | Every agent: a slash command, a `Skill` call, or a read of the skill's `SKILL.md` |
| Commands | Claude Code |
| Subagents | Claude Code: the subagent type each `Task` call names |
| MCP servers | Claude Code and Codex, which name each call `mcp__<server>__<tool>` |

When a turn ends, Slate reads the transcript and stores one row per use, with the session's receipt, in this computer's workspace database. Rereading replaces a session's rows. A worktree session counts for the main checkout. No model call.

**Failed** is a call that returned an error (Cursor and skills record no results, so never fail). **Stopped by you** is an interrupted turn while the item ran (Claude Code interrupt, Codex aborted turn); it is not counted as failed.

After you accept an **Improve**, Slate keeps the 30 days before (runs, runs stopped). Thirty days later, hover shows: **The 30 days before: ran 6×, 4 stopped by you. The 30 days after: ran 4×, 1 stopped by you.** Until then it gives the end date. Only the latest Improve per item shows.

## The changes chip

With Toolkit changes the header shows **N changes to commit in Code** (opens Changes on that project). It counts every file Toolkit writes, live. Your agents has none (not in git). Files that can hold secrets or local paths (`.mcp.json`, `.cursor/mcp.json`, `.claude/settings.json` and the like) are listed unticked with a note; tick one only to commit it.

## The sync pill

With `.slate/`, the toolbar pill (**In sync**, **1 agent behind**) is the only place Toolkit shows whether agents match. Click for a popover listing only agents needing sync, with what is off (e.g. **Skills changed**), **Check again** and **Sync now**.

Slate watches `.slate/`, `AGENTS.md` and `CLAUDE.md` and syncs shortly after any change, from Slate, a terminal, an agent or `git pull`. Editing a skill needs no sync (tools read through links); adding, removing or renaming one, or changing `config.toml` or the rules file, does. This sync writes only inside the project, and runs only in a project you chose: one you added, one you adopted Slate in, or one on its own. A project Slate only found in a group's folder (one you cloned there, say) is synced only when you press **Sync now**, until you add it or adopt Slate in it. **Sync now** and `yarn studio sync` also write MCP servers machine-wide ([Generated adapters](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md#generated-adapters)). A Toolkit step (a sync, a check, a skill change) that has not finished after 2 minutes is stopped, with whatever it started, and a message names the step.
