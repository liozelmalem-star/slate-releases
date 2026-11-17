# Automations

An **automation** is a process you define once. It takes an **input** and runs on a schedule or on an item: a morning brief at 8:30, a fix for an issue, a review of a pull request. Automations holds yours and everything they write, plus what Slate runs itself ([Built-in](#the-automations-place)).

Tasks does not define a process. It runs one of your automations on an item ([Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md#run-an-automation-on-a-task)).

## What an automation takes

Each automation takes one kind of input:

| Takes | Runs | Example starter |
| --- | --- | --- |
| **Nothing** | On a schedule or by hand | Morning brief |
| **A pull request** | On that pull request | Code Review, Answer review |
| **An issue** | On that issue | Fix a bug |
| **A ticket** | On that ticket | Implement |
| **A question** | On that question | Research |
| **A message** | On that message | Draft a reply |

An automation that takes an item is a **flow**. It runs only on its input: from a task's **Run** button in Tasks or Home, or from your agent naming the item. It never runs now, on a schedule, or with nothing to work on; Slate refuses that and says where it runs ("Code Review runs on a pull request: start it from that pull request's Run button."). It refuses any other item and says why.

Opened, a flow shows its flow, not a thread: what it takes ("Takes a pull request"), its steps in order with the run's two stops where they happen (**Approve plan** after the plan, **Approve to ship** before it ships), the skill it follows, and "Runs from a task's Run button." It has **Edit** and **Delete forever** only: no **Run now**, no on/off switch, no **Last run**. Its runs show on their tasks.

## Make an automation

1. Click **+** in the side panel's title row.
2. Pick a **starter**, **Set it up yourself** (empty editor) or **Describe it to AI…** (an agent writes it).
3. Fill the strip **When → Do → In**. One part is open at a time.
4. **Save**. A [preflight check](#the-preflight-check) runs first.

### The strip: When, Do, In

| Part | You set |
| --- | --- |
| **When** | What it takes. With nothing: **By hand**, or **On a schedule** (*every day*, *every weekday*, *every week* or *every month*, at an hour and minute :00, :15, :30 or :45; weekday = Monday to Friday; monthly takes day 1 to 28). With an item: it runs when you run it on that item. |
| **Do** | The **Job** in your words, and the steps as plain lines. A project skill can replace the steps ([below](#a-project-skill-can-replace-the-steps)). |
| **In** | The project or group it works in, and the agent. |

A line under the schedule says "Next: Mon 7:30 AM". An automation with a schedule that is switched off does not run on its own. Any automation that takes nothing can be run by hand: **Run now** sits above its tabs and in its editor. A flow has no **Run now**.

## The starters

Slate offers 8 starters. Each is a ready automation you can change.

| Starter | Takes | Does |
| --- | --- | --- |
| **Fix a bug** | An issue | Reproduces it, finds the root cause, writes a failing test, fixes it, opens a pull request |
| **Implement** | A ticket | Plans, builds in small steps, tests each step, opens a pull request |
| **Code Review** | A pull request | Reads it, checks the project's rules, runs the checks, writes the review |
| **Answer review** | Your pull request | Answers each comment by changing the code or replying, runs the checks, pushes |
| **Research** | A question | Looks it up in the code and docs, writes a finding, changes nothing |
| **Draft a reply** | A message | Looks up what it needs, drafts a reply, sends only when you approve |
| **Morning brief** | Nothing | Every weekday at 8:30: what moved yesterday and what waits for you |
| **Memory care** | Nothing | Every night: keeps memory small and true ([AI memory care](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md#ai-memory-care)) |

You do not have to add them first. While none of your automations takes a task, its **Run** menu in [Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md) offers the starters that take it, and the first run adds that starter here. With no skill of the project's own, a run follows the starter's plain steps and Slate's built-in process; the agent does the work with its own knowledge.

A run on an item waits for you before it plans and before it ships. Merge is never a starter. A starter you added and then changed is marked as changed.

### A project skill can replace the steps

A starter's own steps are plain lines any agent can follow. If the project keeps a skill for the same work (`fix-bug`, `code-review`, `development`), the automation can follow it instead. Pick it under **Do**. Every step opens the skill's file first and follows it, so runs count as that skill's use. The skill is found in the project's folder when the run starts. If the skill leaves the project, the editor says so and the plain steps run until you pick another.

Skills are read from `.claude/skills`, `.agents/skills`, `.cursor/skills`, `.gemini/skills` and `.opencode/skills`, also in sub-packages. A folder with no `SKILL.md` is not a skill.

## What starts a run

| Starts | When |
| --- | --- |
| **By hand** | **Run now**, for one that takes nothing. You can type a starting text. |
| **On a schedule** | At its time, while Slate runs. |
| **On an item** | You run it on a task from Tasks, from Home, or from your agent. |

Your agent can run one too, from whichever tool you are in ("run my morning brief"): its `run_automation` tool lists your automations and starts one, as **Run now** does, while Slate is open. A flow needs the item it runs on ([Tool Reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md#automations)). Making or changing an automation stays here.

- **Asleep at due time**: a scheduled run starts once on wake.
- **One at a time**; never started twice. **Slate stops mid-run**: marked failed; a scheduled one reruns minutes after return.

An automation belongs to the workspace it was made in and runs on this computer while Slate runs, in every workspace, with or without a window. An automation in a shared workspace runs only on the computer of the person who made it: automations do not sync, so teammates never have a copy to run. It needs a project:

- New ones open in the project Automations is narrowed to and cannot be saved without one. With none picked, **In** says **Pick a project**, listing only groups and projects.
- No scheduled run without a project. If the project was removed: editable and can be switched off, not on, until you pick one.
- Moving a group or project to another workspace takes its automations along.

## The preflight check

Slate checks that a run can start before **Save** and before every run. It asks the question a blocked run would fail on (for example: a folder that is not a git repository, a project hook that blocks headless runs, a skill that left the project). When something blocks, it shows one sentence with the fix, in the editor and on the Run button. A run that would fail does not start.

## Its steps

Steps are plain lines under **Do**. The agent reads the job, then follows the lines. A step can name its own agent. Each run writes **one report**.

A scheduled automation can start with **Recent tasks**: [Recent tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/loop/recent-tasks.md).

In the job and steps, type **@** to name a doc, session, memory, task, artifact, file or report. A pick is a chip; on a run, its content goes before the text.

## The thread

Opens on its **Thread**: every run, oldest first; typed words above the answer they started; under each run a line of what it used ("Used jira ×2, github"). A report over 1,600 characters shows its opening; **Read the whole report** opens it.

To answer the last run, type in the box under the thread and press **Send**: one more short run on the same agent and folder, reading the last four turns and your words, each earlier report cut to its first 3,000 characters. The box is off while the automation runs or cannot run (for example, no project). Before the first run it is the run's starting text and the button says **Start**; **Run now** runs with nothing typed.

## The receipt

Every run leaves a **receipt**: what the run did, checked against what it said. Slate reads it from the run's own output, kept in Slate's data folder. The agent does not write it. A run whose output cannot be read says **No evidence**. The receipt sits under the run in the thread.

## What it may do

An automation uses the tools its agent reaches: your MCP servers (Jira, GitHub, Slack…).

- **Reading goes on without asking**: searching, listing, opening a ticket or pull request.
- **A call that changes something asks first**: posting, commenting, creating an issue.
- **Merging, removing and writing files are refused.**

It also reads apps connected in [Connect → Integrations](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#integrations) with no MCP server needed, using Slate's sign-in. The report names the app (*linear · list_issues*).

### When it asks first

A held call lets the run carry on, saying what it wanted. When the run ends it waits as an **Ask first** card in the thread under that run and on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md). **Yes, do it** starts one short run allowed exactly that call; the card then says "Done: Posted to #acme-dev." or "Not made: …". **No** closes it. Each is answered once. **Later** (Home) sets it aside.

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

## The Automations place

Opens on **Overview**. Its one list, **Latest**, holds the newest report per automation, plus a live card for a run in progress. Picking one opens that automation's **Thread** at that run. A renamed automation keeps its reports. Unreadable reports: **Try again**; **No reports yet** only when none exist.

Under Overview is **Built-in**: what Slate runs itself, each with a switch (`/loop?view=built-in`); see [Built-in automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md). Below are yours, in two groups after **Running**: **On a schedule** holds everything that takes nothing, each row with its time ("Daily 3 AM") or **By hand**; **Flows** holds what takes an item, each row with what it takes. Pick one that takes nothing for tabs **Thread**, **Setup** (the When / Do / In strip) and **What it knows**, with **Run now**, **Edit** and the on/off switch above. A flow opens on its flow ([What an automation takes](#what-an-automation-takes)).

Reports **go for good, not to Trash**: **Delete forever…** asks once; the automation can run again. Deleting an automation forever keeps its reports. **⌘K** searches reports (title and body), under **Reports** (at most four) then **Artifacts**.

**When a run finishes**: an OS notification with the report's opening line (cut at 180 characters) and a **Report ready** toast. A failure shows an **Automation failed** toast, and the error stays under **Last run**. If your agent's own sign-in lapses you get one notification, on the first run failing that way. Its **Open** goes to the automation's **Thread** at that run.

See also: [Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md), [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md), [Built-in automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md), [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md).
