# Recent tasks

**Recent tasks** is a first step for an [automation](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md). Before writing it gathers what happened and checks it against your live tools. Only the first step can be one, since later steps read its report.

## Context it sees

| Source | Brings in |
| --- | --- |
| Sessions | Up to 80 newest captured AI sessions in the look-back window, tagged with group or project; one-line summary cut at 280 characters |
| Memories | Up to 30 memories picked by pin, recent use and kind (not date), each with kind (`decision` / `preference` / `state` / `fact` / `lesson`), ref and reasoning; list stops at about 5,600 characters; memories whose cited code changed are left out. Scoped to a group or project: that doc's own memory (a group's includes its projects'), plus global |
| Docs | Titles of up to 100 docs, newest change first, in the automation's group or project |
| Prior runs | Its own three latest reports, each's opening 600 characters |

**Look back**: days of sessions read, 1 to 365, starting at 7.

**Write decisions back to memory**: the report may end with a `memories` block, saved as memory (at most five per run) and removed from the report you read. The same switch lets a `memory-proposals` block propose merges and retirements of the memories shown, by ref; each waits in Memory under **Needs review** until accepted. Only an automation scoped to a group or project can file one.

It can also search the workspace and your connected tools; what it may change follows the automation's rules ([What it may do](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#what-it-may-do)).

## Grounding on live tools

Stored records show what was true when written, so Recent tasks checks live tools first. It takes the distinct **working contexts** (directory and CLI config) of the period's sessions, drops folders under `/tmp` and similar, ranks the rest (git checkouts first, then work done), keeps the top three, and names the others as skipped. For each, one short pass runs the agent *in that directory under that config* (so project-scoped MCP servers load), checking:

1. Jira or Linear: your issues, not Done (defines your work).
2. GitHub: your pull requests for those tickets: state, CI, who the review waits on.
3. Calendar: today's meetings (skipped if the calendar was already read).
4. Slack: who waits on what for those tickets and pull requests, last three days.

Passes ask only for identifiers, states, names and times. Ticket bodies, comments and message text are never requested or stored.

## The report

Opens with three columns: **Assigned to me**, **Pull requests**, **Today's meetings**.

- A source needing sign-in shows a sign-in button (same account and directory as the pass), then reruns the automation.
- An unreachable source says so, never "Nothing assigned".

The text then lists what was **verified this run** and which sources **could not be reached** (the agent said so, or its CLI reported the server failed, pending, unknown or needing sign-in). If no project had sessions in the window nothing is checked, and the report says so. A ticket or PR status may be stated as current only if a tool returned it this run. Seeded Standup and Shutdown end with **Not verified**; a gallery template adds none unless its prompt does.

## Prompt variables

Filled just before it runs; only Recent tasks reads them (the editor warns if a later step uses one and points to `@context`):

| Variable | Expands to |
| --- | --- |
| `@sessions` | Recent captured sessions |
| `@memory` | Memories the run is given: up to 30, each with kind, ref and reason. Never a hidden memory or a stale `state`. If Slate's server is not running, the line says no memory |
| `@docs` | The doc titles above |
| `@date` | Today's date |
| `@prior_outputs` | Recent reports of this automation |
