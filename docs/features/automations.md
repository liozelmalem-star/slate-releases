# Automations

An **automation** is a process you define once and let run without you: a morning brief at 8:30, a fix for an issue, a review of a pull request. Automations holds yours, the reports they write, and the things Slate runs on its own.

## The Automations place

The side panel lists, from the top:

- **Overview**: **Latest**, the newest report of each automation and every run on an item from the last 14 days, newest first. A report opens that automation's thread at that run; a run on an item opens on its task.
- **Built-in**: what Slate runs on its own, each with a switch ([Built-in automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/built-in.md)).
- **Running**: automations working now.
- **On a schedule**: automations that take nothing, each with its time ("Daily 3 AM") or **By hand**.
- **Flows**: automations that take an item, each with what it takes ("A pull request").

With no automation yet, the main area shows **Start with Slate's automations**: the [starters](#the-starters), each with **Add**. When the project has skills that match a starter, a line offers **Use them**.

## Make an automation

1. Click **+** in the side panel and pick **From a template**, **Set it up yourself** or **Describe it to AI…**. The template gallery opens with **Describe it** first, then 15 templates such as **Standup**, **Weekly review** and **PR review prep**.
2. Fill the three parts: **When**, **Do** and **In**.
3. Press **Save**. Nothing is saved before that.

| Part | You set |
| --- | --- |
| **When** | **Takes**: **Nothing**, **A pull request**, **An issue**, **A ticket**, **A question** or **A message**. Then **Runs**: for nothing, **When you run it**, **Daily** or **Weekly**; for an item, **When you run it** or **On every new one**. |
| **Do** | The **Job** in your words, then the steps as plain lines (**Step** adds one). Type **@** to add a doc, session, memory, task, artifact, file or report. |
| **In** | The **Project** (a group or a project), the **Agent**, and which connected apps it **May use**. |

A schedule reads as one sentence: "Runs every weekday at 8 AM :30". Choose every day, every weekday (Monday to Friday), every week or every month (day 1 to 28), at :00, :15, :30 or :45. A line under it says the next run, such as "Next: Mon 7:30 AM".

An automation cannot run without a project: the project gives it its folder, account and model. Until you pick one, **In** says **Pick a project**.

## The starters

Slate offers 8 starters. Each is plain steps any agent can follow, and you can change them.

| Starter | Takes | Does |
| --- | --- | --- |
| **Code Review** | A pull request | Reads it, checks the project's rules, runs the checks, writes the review |
| **Fix a bug** | An issue | Reproduces it, finds the cause, writes a failing test, fixes it, opens a pull request |
| **Implement** | A ticket | Plans, builds in small steps, tests each step, opens a pull request |
| **Research** | A question | Looks it up in the code and docs, writes a finding, changes nothing |
| **Answer review** | Your pull request | Changes the code or replies to each comment, runs the checks, pushes |
| **Draft a reply** | A message | Looks up what it needs, drafts a reply, sends only when you approve |
| **Morning brief** | Nothing | Every weekday at 08:30: what moved yesterday and what waits for you |
| **Tidy memories** | Nothing | Every night at 02:00: merges repeated memories and retires stale ones |

A run on an item stops for you at **Approve plan** and **Approve to ship** where its steps have them. No starter merges by itself.

### Defaults stay

The first automation you add from each of the six item starters is a **default**: Tasks runs it. You can edit a default, but it has no **Delete forever**. A second copy of the same starter is your own and has **Delete forever**, and so do **Morning brief** and **Tidy memories**.

You do not have to add the defaults first. A task's **Run** menu offers the starters that take it, and the first run adds that starter here ([Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md)). An edited starter says **Slate's starter · edited by you**.

### A project skill can replace the steps

If the project keeps a skill for the same work (for example `fix-bug` or `code-review`), the automation can follow it instead of Slate's steps. Under **Do**, press **Use a skill instead** and pick it. Every step then opens the skill's file and follows it. **Use Slate's steps** switches back. If the skill leaves the project, the plain steps run until you pick another.

## What starts a run

| Starts | How |
| --- | --- |
| **By hand** | **Run now** on an automation that takes nothing. You can type what it starts with first. |
| **On a schedule** | At its time, while Slate runs. A computer asleep at that time runs it once on waking. |
| **On an item** | **Run** on a task in Tasks or Home, or your agent naming the item. |
| **On every new one** | New items arriving in Tasks, of the kind the automation takes: a pull-request automation does not start on a new issue. |

A flow (an automation that takes an item) runs only on an item. It has no **Run now** and no on/off switch. Opened, it shows its steps with their stops, the skill it follows, and **Runs**: each run with its item, where it stands and when.

Your agent can also start an automation from any tool, with Slate's `run_automation` tool ([MCP tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)). Making or changing one happens only here.

An automation runs on the computer where it was made, in its project's folder. Automations do not sync, so in a shared workspace a teammate has no copy to run. One automation runs one run at a time.

## The preflight check

Before **Save** and before every run, Slate checks that the run can start: it has a project, its agent is added in Connect, the project's folder exists, and you allowed the project's own hooks. When something blocks, one sentence and a button that fixes it show in the editor and under **Run now**, and the run does not start.

## What it may do

An automation uses the tools its agent reaches, such as your Jira, GitHub or Slack MCP servers, and the apps you connected in [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/integrations.md).

- **Reading goes on without asking**: searching, listing, opening a ticket or pull request.
- **A call that changes something asks first**: posting a message, commenting, creating an issue.
- **Merging, removing things and writing files are refused.**

### When it asks first

A held call does not stop the run: the run carries on and says what it wanted. When the run ends, the call waits as an **Ask first** card under that run and on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home.md). **Yes, do it** starts one short run allowed exactly that call, and the card then says "Done: …" or "Not made: …". **No** closes it. On Home, **Later** sets it aside.

Next: [The thread and reports](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/thread.md) · [Recent tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/recent-tasks.md) · [Built-in automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/built-in.md)
