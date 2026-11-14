# Automations

An **automation** works without being driven: a standup at 7:00, a debrief when a coding session ends, a plan per assigned ticket. Automations holds yours and everything they write, plus what Slate runs itself ([Built-in](#the-automations-place)).

## Make an automation

An automation is **a job, a trigger and steps**, held to **rules**.

1. Click **+** in the side panel's title row.
2. Pick **From a template**, **Set it up yourself** (empty editor) or **Describe it to AI…** (an agent writes it).
3. Write the **Job** in your words ("Every weekday morning, tell me where each project stands and what to focus on"). Every step reads it first; with none, steps run as written.
4. Pick what starts it, and a project.

## What starts it

| Starts | When |
| --- | --- |
| **By hand** | **Run now**. You can type a starting text. |
| **On a schedule** | **How often**: *every day*, *every weekday*, *every week* or *every month*, at an hour and minute :00, :15, :30 or :45. Weekday = Monday to Friday (a weekend run moves to Monday, same time). Monthly takes day 1 to 28. Listed as "Weekdays · 7:30 AM". |
| **When a session ends** | After an AI coding session is captured. With **Scheduled automations** off in [Automations › Built-in](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) these do not start, nor later for sessions that ended meanwhile. |
| **When a task arrives** | When Tasks pulls in a new integration item, such as an assigned ticket. One read hands the run up to 5 new items. If already running, new items wait and start one run together afterwards. A just-connected tracker starts nothing (its first read brings everything). Your own to-dos never start one. Tasks reads integrations on opening and on returning to the window after over a minute. |

Starts on its own only while **Runs on its own** (under **Starts**) is on. A line under the schedule says "Next: Mon 7:30 AM" or "Off, so it will not run on its own." Any automation can be run by hand. Your agent can run one too, from whichever tool you are in ("run my morning report"): its `run_automation` tool lists your automations and starts one, as **Run now** does, while Slate is open. That run asks before it changes anything, like any other. Making or changing an automation stays here ([Tool Reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md#automations)).

- **Asleep at due time**: runs once on wake. For time-bound reports switch on **Skip a run that is more than two hours late** ("· skips late runs").
- **One at a time**; never started twice. **Slate stops mid-run**: marked failed; a scheduled one reruns minutes after return.

An automation belongs to the workspace it was made in and runs on this computer while Slate runs, in every workspace, with or without a window. An automation in a shared workspace runs only on the computer of the person who made it: automations do not sync, so teammates never have a copy to run. One that runs when a session ends starts for a session in its workspace's folders. It needs a project:

- New ones open in the project Automations is narrowed to and cannot be saved without one. With none picked, **Runs in** says **Pick a project**, listing only groups and projects.
- The six seeded ones have no project: **Run now** and **Turn on** ask, save, then go on. **Turn off** never asks.
- No scheduled run without a project. If the project was removed: editable and can be switched off, not on, until you pick one.
- Moving a group or project to another workspace takes its automations along.

## Its steps

Run in order; each reads what came before:

- **`@context`**: what the run started with: text typed at Run now, "A coding session just ended.", or today's date for a scheduled run. After Recent tasks, that step's report.
- **`@prev`**: previous step's answer.

A step can name its own agent (one on Claude, next on Gemini); none named uses the automation's tool, with the account from the group or project. Each run writes **one report**: last step's answer first, earlier steps after under their labels.

The first step can be **Recent tasks**: [Recent tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/loop/recent-tasks.md).

## What it follows

**Follows**, in the editor under **Runs in**:

- **Slate's own steps**: as written (default).
- **A skill of its project** (**Skills in** *project*): the skills [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) shows.
- **A subagent of its project** (**Subagents**).
- **+ New skill in Toolkit…**: opens Toolkit's New skill form on the project with name and purpose filled. **Create** writes it, sets the automation to follow it, returns you. Only for a saved automation with no unsaved changes.

Every step opens the skill's or subagent's file first and follows it, so runs count as that skill's use. The file is found in the project's folder at run start. If the skill left the project, the editor says so and runs follow Slate's own steps until you pick another. Moving the automation to another project clears the choice.

## The thread

Opens on its **Thread**: every run, oldest first; typed words above the answer they started; under each run a line of what it used ("Used jira ×2, github · 1 call waiting for you"). A report over 1,600 characters shows its opening; **Read the whole report** opens it.

To answer the last run, type in the box under the thread and press **Send**: one more short run (not the steps) on the same agent and folder, reading the last four turns and your words, each earlier report cut to its first 3,000 characters. The box is off while the automation runs or cannot run (for example, no project). Before the first run it is the run's starting text and the button says **Start**; **Run now** runs with nothing typed.

## What it may do

An automation uses the tools its agent reaches: your MCP servers (Jira, GitHub, Slack…). **Setup → May do**:

- **Reading goes on without asking**: searching, listing, opening a ticket or pull request.
- **A call that changes something asks first**: posting, commenting, creating an issue.
- **Merging, removing and writing files are refused.**

It also reads apps connected in [Connect → Integrations](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#integrations) with no MCP server needed (`connected_tools`, `read_connected`, using Slate's sign-in). Setup shows each at the head of the **Allowed** row with its logo; click opens Connect. Excluded: token-connected apps, and an app the automation's Deny covers whole (`mcp__linear__*`). The report names the app (*linear · list_issues*) and the lists below treat that read as a call to it.

Three lists adjust this per automation, the same as an agent run: **Allow**, **Ask first**, **Deny**. One call per line as the agent names it; trailing `*` covers a server (`mcp__jira__*`). Slate's rules hook enforces them when the agent is connected in [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) with hooks on; without hooks the tool is not held and Setup says so.

### When it asks first

A held call lets the run carry on, saying what it wanted. When the run ends it waits as an **Ask first** card ("Standup's rules held a call: …") in the thread under that run and on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md). **Yes, do it** starts one short run allowed exactly that call; the card then says "Done: Posted to #acme-dev." or "Not made: …". **No** closes it. Each is answered once. **Later** (Home) sets it aside.

## What it knows

**What it knows** lists memories the automation wrote (replaced or retired ones stay, crossed out) and previews those it is given before a run, each with a pin and a keep-out. Each run reads: its job, sessions and memories of its project or group, its last three reports, your replies.

## Where an automation works

It runs **in its group's or project's directory** (the watched checkout, else the folder), loading project-scoped MCP servers for every step; fixed once per run. Without a group or project it does not run by itself and **Run now** asks you to choose.

Background runs have limits:

| Limit | Value |
| --- | --- |
| Spend per run | $5 shared; each turn gets what is left; none starts at zero |
| Turns, tool not reporting spend | 12 |
| Claude Code agent turns inside each turn | 30 (other tools have no such flag) |
| Silence before a step gives up | 4 minutes (any word, tool call or result restarts the clock) |

## The ceremonies

Six seeded automations, each one Recent tasks step, organised **by project**. All start **switched off** with no project; **Run now** or **Turn on** asks which project, saves, goes on.

| Automation | Starts | Looks back | Produces |
| --- | --- | --- | --- |
| **Standup** | daily, 07:00 | 3 days | Where each project stands, today's focus |
| **Shutdown** | daily, 18:00 | 1 day | What moved, loose ends, tomorrow's first move |
| **Planning** | Monday 08:00 | 7 days | What to commit to this week, per project |
| **Weekly review** | Friday 17:00 | 7 days | Shipped, in flight, blocked |
| **Retro** | Friday 17:00 | 7 days | What went well, what dragged, one change |
| **Monthly review** | day 1, 09:00 | 30 days | Trajectory, decisions that mattered, one change |

Standup, Shutdown, Weekly review and Retro also write decisions to memory (up to five per run); Planning and Monthly review do not. None skips a late run. Each is ordinary: change the time, scope it, or add a step after Recent tasks ("turn this into three Slack-ready bullets").

**Memory pass** template: daily 08:30; reads yesterday's sessions and the group's or project's memories; adds at most five (a correction, a confirmed approach, a decision and why); proposes merges and retirements for review. Does nothing until saved, scoped to a group or project, and switched on. Runs on its agent and account.

**Memory care**: turning on **AI memory care** in Memory adds it (daily 03:00, skips a missed night). See [AI memory care](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md#ai-memory-care).

## The Automations place

Opens on **Overview**:

- **Latest**: newest report per automation, plus a live card for a run in progress.
- **History**: every report by automation, newest first. The find box matches automation name, a word in a report's title or opening, or a date ("Oct 8", "2026-10-08"); every word must match. A renamed automation keeps its history. A report opens only when picked. Unreadable reports: **Try again**; **No reports yet** only when none exist.

Under Overview is **Built-in**: what Slate runs itself, each with a switch (`/loop?view=built-in`); see [Built-in automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md). Below are yours, grouped by trigger: **Running**, **On a schedule**, **When a session ends**, **When a task arrives**, **By hand**. Pick one for tabs **Thread**, **Setup** (job, start, where it works, what it may do, steps) and **What it knows**; **Run now**, **Edit** and the on/off switch sit above. **Edit** opens the editor; **Overview** returns.

Reports **go for good, not to Trash**: **Delete forever…** asks once ("Delete forever?"); the automation can run again. Deleting an automation forever keeps its reports. **⌘K** searches reports (title and body), under **Reports** (at most four) then **Artifacts**.

**When a run finishes**: an OS notification with the report's opening line (cut at 180 characters) and a **Report ready** toast. A failure shows an **Automation failed** toast, and the error stays under **Last run**. If your agent's own sign-in lapses you get one notification, on the first run failing that way. A report opens **in Automations**, beside earlier runs, from anywhere.

See also: [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md), [Built-in automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md), [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md).
