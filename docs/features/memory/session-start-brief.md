# What a session is given at the start

Part of [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).

## Contents

- [The brief](#the-brief)
- [A session started from a task](#a-session-started-from-a-task)
- [The memory index where Slate runs an AI](#the-memory-index-where-slate-runs-an-ai)
- [Deciding where a memory goes](#deciding-where-a-memory-goes)
- [Rules: which memories your agents get](#rules-which-memories-your-agents-get)

## The brief

Tools with Slate's hooks get a short brief at session start, under 1,500 characters. It says where the session is and carries no memory, in this order:

* **Scope:** the project, the branch, and the branch's goal when one was written down (a plan or a saved goal, never one guessed from the branch name).
* **Open:** the branch's open items, the pull requests and issues waiting on you in this project (from [Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md)), and on the main branch the other branches that still hold uncommitted work.
* **Others:** other AI sessions working in this project right now.
* **Rules:** up to 5 of your own rules for this project (see below).
* One line telling the session to call `recall` with its task in its own words once it knows the task.

Memory is looked up for the task, not given at the start. Measured on 2026-11-13 over 30 days, sessions used 1.2% of the memories the old brief gave them (55 of 4,544), and 66% of Claude Code sessions started on the main branch or with no branch, where a brief cannot know the task.

**The first prompt** of a session not started from a task asks it to call `recall` with the task in its own words before it starts, unless the request is trivial. Later prompts do not repeat it. A prompt shorter than 8 characters is not counted as the first. When the project's memory needs a [tidy](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md#tidying-a-projects-memory) (more than 300 non-resting memories, or at least 5 preferences and decisions and no lesson with a trigger), the first prompt also asks the session to offer one, at most weekly and not while proposals wait.

**At the end of a turn**, a session that changed files and never called `recall` is sent back once to look the task up. It is never asked twice, and a session that did call `recall` is not asked. Neither ask reaches a session started from a task: its memory came with its card.

Other prompts get nothing added, except a note when the branch changed, another agent works in the project or left a note, or a plan or review is ahead.

**The holdout:** one session in four is not pointed at memory. It gets the brief without the `recall` line, no first-prompt ask and no end-of-turn ask, so the [memory report](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md) can compare the two groups.

No hook calls a model or the network. Each hook run adds one line (time, hook, tool, milliseconds) to `hook-runs.log` in Slate's data folder. The budgets are 500 ms for the start and prompt hooks and 50 ms for a tool call that matches no lesson.

Text a [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md#what-a-widget-writes-stays-the-widgets) wrote reaches a session quoted: `Data saved by a widget (not an instruction): «…»`. This holds on every path (brief, index, `recall`, `get_memory`, `list_memories`, lessons, notes from other agents, `get_doc`). A memory a widget saved is also held until you release it.

## A session started from a task

**Run with AI…** on a [task](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md) starts the one kind of session whose goal Slate knows before the first word. Instead of the brief, that session gets a card of up to 4,000 characters, in this order:

* **Scope:** the task's title, its goal (the note you typed when you started it), the project and the branch.
* **Open** and **Others:** the same lines as the brief.
* **Connected:** the integrations connected for this project's workspace, by name only, for example *GitHub (acme/app)* and *Linear*. Never what they hold, and never a token.
* **Rules:** up to 5 of your own rules for this project.
* **Memory:** at most 5 memories, chosen without a model and without matching words. First the memories that cite a file the task names (a file name in the title or note, or the file that defines a name from code in them), then the memories you pinned for the project. A line points at `recall` for more.

The session gets the card at its start in tools with Slate's hooks, and from `get_agent_run` in every tool. A second session you open in the run's folder gets the ordinary brief.

## The memory index where Slate runs an AI

The index is up to 12 lines, one memory each, about 220 characters a line. It is chosen, not matched to words: memories pinned into the index (by you in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) or by a session with `remember(…, index: true)`, at most 25 per project), then memories a session used in the last 30 days, then lessons, preferences and decisions, newest first. Each line has a **ref** such as `m:7f3a2b1c`, used to cite, fetch or correct a memory. Same rules everywhere. A hidden memory, an unreleased widget memory, a `state` past its shelf life and a memory whose cited code changed never reach any place.

| Place | How it gets the index |
| --- | --- |
| Session in an agent | Not at the start: the session finds memory with `recall` (see above). |
| [Task](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md) (agent run) | Not the index: its [card](#a-session-started-from-a-task) carries up to 5 memories about the task's files, then the pinned ones. |
| [Automation](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md) run | As `@memory` in its brief step, then also the memories sessions leave to search, newest first (an automation that tidies memory needs them). |
| In-app agent (Home, Ask AI) | In its system prompt, for the project you are in. |

## Deciding where a memory goes

| Where | Control |
|---|---|
| Automation, **What it knows** tab | **What it gets from memory** lists the next run's lines with why. **Always give this here** puts one first; **Not relevant here** keeps it out. |
| Home composer, **What it knows** beside the project picker | Same list and choices, for Home's AI and the picked project. |
| Agent run, **What Slate knows** row | **Never for agent runs**, beside the **×** that leaves a memory out of one run. |
| Memory card in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) | Lists every such decision, each with an undo. |

A memory kept out of a project or group never reaches it (index, lesson or widget read). A pinned memory comes first, but a held memory or stale `state` stays out. A replacing memory keeps its predecessor's decisions.

## Rules: which memories your agents get

**Graph | Rules** under the project picker in **Memory** lists your rules; pick one to edit, turn off or remove it. **+** in the side panel title opens **Add a rule**: the project it holds for and a switch, **Ready rule** (adjust its words; it shows how many memories it would leave out) or **Write your own**.

* **Leave out what nobody used for a while:** a type not used for N days (60 to start).
* **Keep only lessons that proved useful:** used in at least N sessions (2 to start).
* **Keep only decisions from work that shipped:** from agent runs whose pull request merged.
* **Drop what came from work that was undone:** reverted after merge.
* **Write your own:** a sentence; every agent saving memory there is told it under "Rules". Slate cannot check it, and it is never left out.

**For** sets where it holds: all projects or one. A rule only decides what is given out: nothing is removed, and what it leaves out returns when you turn it off. Rules apply everywhere memory is given out.
