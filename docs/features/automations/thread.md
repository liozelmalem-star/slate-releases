# The thread and reports

Every run of an automation that takes nothing writes one **report**, and the reports collect in the automation's **Thread**. Open an automation under **On a schedule** to read it. Above its tabs sit **Run now**, **Edit**, **Turn off** or **Turn on**, and **Last run**.

It has three tabs: **Thread**, **Setup** and **What it knows**.

## Read the thread

The thread lists every run, oldest first. Words you typed sit above the answer they started. Under each run, one line says what it used ("Used jira ×2, github") and how many calls wait for you. A report over 1,600 characters shows its opening; **Read the whole report** opens it.

## Answer the last run

Type in the box under the thread and press **Send**. Slate runs once more on the same agent and folder, with your words, the last 4 turns, and each earlier report cut to its first 3,000 characters.

Before the first run the box holds what the run starts with, and the button says **Start**. **Run now** starts with nothing typed. The box is off while the automation runs or when it cannot run.

## The receipt

Each report carries a receipt: what the run really did, read from the run's own output, never written by the agent. It says **Proved**, with the checks, changed files and commits it counted, or **No evidence**, with the reason.

## Setup and What it knows

**Setup** shows how the automation is set up: its **Job**, when it starts and runs next, where it works, its **Agent**, what it **May do**, and its **Steps**. Change it with **Edit**.

**What it knows** shows:

- **What it wrote to memory**: the memories its runs wrote. A run writes to memory only when its first step is [Recent tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/recent-tasks.md) with writing back on.
- The memories it will be given on the next run, each of which you can pin or keep out.
- **What each run reads**: its job, sessions from the last 7 days (or the days its first step sets), the memories of its project or group, its own last 3 reports, and your replies in this thread.

## When a run ends

- A finished run sends a system notification with the report's opening line, cut at 180 characters, and a **Report ready** toast.
- A failed run shows an **Automation failed** toast, and the error stays under **Last run**.
- If your agent is signed out, the toast says so; sign in again from the automation.

Delete a report with **Delete forever**. Reports do not go to Trash. An automation removed with **Delete forever** keeps its reports in Automations. Press **⌘K** to search reports by title and text.

## Limits

Every background run keeps these limits:

| Limit | Value |
| --- | --- |
| Spend per run | $5, shared by all its turns |
| Turns, for an agent that does not report spend | 12 |
| Tool turns inside one Claude Code turn | 30 |
| Silence before a turn gives up | 4 minutes (any output restarts the clock) |

If Slate stops in the middle of a run, the run is marked failed, and a scheduled one runs again soon after.
