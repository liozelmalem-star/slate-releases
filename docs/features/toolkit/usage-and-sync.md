# Usage, changes and sync

Part of [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md).

## How often each item ran

Rows on **Skills**, **Commands**, **Subagents** and **MCP servers** show how often the item ran in this project's sessions in the last 30 days, such as **ran 4×**, then **1 failed** or **1 stopped by you**. Point at it to see the runs per agent.

| The row says | When |
| --- | --- |
| **not run in 30 days** | Nobody used it |
| **not run since** a date | Slate has fewer than 30 days of sessions |
| **not recorded yet** | No session in this project has ended since |
| **not measured** | The agents that read it do not record when it runs |

| Kind | Counted for |
| --- | --- |
| Skills | Every agent |
| Commands | Claude Code |
| Subagents | Claude Code |
| MCP servers | Claude Code and Codex |

Slate counts from each session's transcript when the session ends, on this computer, with no model call. A session in a worktree counts for its project.

After you accept an **Improve** suggestion, pointing at the row compares the 30 days before with the 30 days after, such as "The 30 days before: ran 6×, 4 stopped by you."

## The changes chip

When Toolkit changed files that are not committed, the toolbar says **3 changes to commit in Code**. Click it to open **Projects → Code → Changes** on that project. Files that can hold secrets or local paths, such as `.mcp.json` or `.claude/settings.json`, are listed unticked; tick one only to commit it. **User** has no chip, because your home folder is not in git.

## The sync pill

In a project with `.slate/`, the toolbar pill says whether every agent matches it: **In sync**, or **1 agent behind**. Click it for the agents that need a sync and what is off, such as **Skills changed**, with **Check again** and **Sync now**.

Slate syncs by itself shortly after `.slate/`, `AGENTS.md` or `CLAUDE.md` changes, whoever changed it: you, an agent, a terminal or `git pull`. Editing a skill needs no sync, because the agents read it through links. Adding, removing or renaming a skill, or changing the config or the instructions, does.

This automatic sync writes only inside the project, and only in a project you added or set up with `.slate/`. A project Slate only found inside a group's folder syncs when you press **Sync now**. **Sync now** also writes `.slate/`'s MCP servers into the Claude Desktop and Cursor configs every project shares.

A sync or check that has not finished after 60 seconds is stopped, with everything it started, and Toolkit says it timed out.
