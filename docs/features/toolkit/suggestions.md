# Suggestions

**Suggestions** in [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md) lists changes to a project's AI setup, drawn from what your sessions did in the last 30 days, worst first. Nothing changes until you click.

Each suggestion says what was counted and has one button, plus **Dismiss** (**Keep** for a removal). A dismissed suggestion never comes back. An accepted **Fix** or **Improve** can come back after 30 days.

Toolkit's **Overview** (under **All projects**) shows how many suggestions wait in each project, and Toolkit's rail entry shows the total.

## The five kinds

| Kind | Suggested when | The button |
| --- | --- | --- |
| **Fix** | An MCP server failed 3 of its last 5 calls. It shows the last error | **Open server** |
| **Copy** | A skill or MCP server ran here, and an agent you used in 3 or more sessions here cannot see it | **Add for {agent}** links the skill into a folder that agent reads, or copies the server into its file |
| **New** | You gave a general subagent the same task in 3 sessions, or typed a `/command` with nothing behind it in 3 sessions | **Create it** opens the New form |
| **Improve** | You typed a skill's `/name` 3 times and the agent never picked it by itself, or you stopped it 3 times | **Open it** |
| **Remove** | It did not run in 20 or more sessions of the agents that load it, counted from when its file was made | **Remove** takes it out of every folder and file that keeps it |

A lesson that Memory proposes as a skill also waits here, as **New**, with **Make it a skill**. Accepting it in either place writes it once.

## How it counts

- Slate counts when you open Suggestions, at most once an hour per project, and adds at most 3 new suggestions a day. No model runs.
- **Remove** shows only when every agent that loads the item records when it runs, so an item an agent cannot measure is never called unused.
- **Copy** and **Remove** of a skill are not suggested in a project with `.slate/`, which decides each skill's agents.

## From an agent

An agent can propose a change with Slate's `propose_setup_change` tool: a fix, copy, new item, improvement or removal of a skill, command, subagent or MCP server, with a reason. It waits here beside Slate's own, outside the 3-a-day limit, and nothing is written until you accept it. An instructions file such as `CLAUDE.md` is never removed by a suggestion.
