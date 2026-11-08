# Suggestions

[Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) suggests changes to the project's AI setup, worst first. Nothing changes until you click.

Each says what was counted and has one button, plus **Dismiss** (**Keep** for a removal).

A dismissed suggestion never returns. An accepted **Fix** or **Improve** can return after 30 days.

| Kind | When it is suggested | The button |
| --- | --- | --- |
| **Fix** | An MCP server failed 3 of its last 5 calls. It shows the last error | **Open server** opens MCP servers |
| **Copy** | A skill or MCP server ran here, and a tool you used in 3 or more sessions here cannot see it | **Add for <tool>** links the skill into a folder that tool reads, or copies the server into its file |
| **New** | You gave a general-purpose subagent the same task in 3 sessions, or typed a `/command` with no skill or command behind it in 3 sessions | **Create it** opens the New form |
| **Improve** | You typed a skill's `/name` 3 times and the AI never picked it, or you stopped it 3 times | **Open it** opens the skill |
| **Remove** | It did not run in 20 or more sessions of the tools that load it, counted from when its file was made | **Remove** takes it out of every folder and file that keeps it. A subagent's or command's row names the file |

A lesson Memory proposes as a skill waits here as **New**; accepting in either place writes it once.

## How counts work

* Same 30 days as run counts, plus one row per session read, so a session that used nothing counts.
* Counted when you open Suggestions, at most hourly per project; at most 3 new suggestions a day. No model runs.
* **Remove** appears only when every tool that loads the item records that kind of use. A server Gemini CLI loads, or a subagent Cursor reads, is never called unused.
* A session that ended before the item's file existed does not count against it.
* **Copy** and **Remove** of a skill are not suggested in a project with `.slate/`, which decides each skill's tools.

## From an agent

The MCP tool `propose_setup_change` adds a fix, copy, create, improve or removal of a skill, command, subagent or MCP server, with a reason. It sits beside Slate's own, without the 3-a-day cap, and writes nothing until you accept. A **New** skill or subagent can carry its whole file.

Refused: a change already accepted or dismissed; a **New** for an existing name; a removal of a subagent or command naming any file but its own. Instructions files such as `CLAUDE.md` are never removed by a suggestion.
