# What a session is given at the start

Part of [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).

## Contents

- [The brief](#the-brief)
- [The same index everywhere Slate runs an AI](#the-same-index-everywhere-slate-runs-an-ai)
- [Deciding where a memory goes](#deciding-where-a-memory-goes)
- [Rules: which memories your agents get](#rules-which-memories-your-agents-get)

## The brief

Tools with Slate's hooks get a brief at session start, at most 4,000 characters (about 1,000 tokens):

* **The branch:** name, and on a feature branch its goal, ticket and open items.
* **The project's memory index:** up to 12 lines, one memory each, fewer when the index's 2,800 characters run out. Each claim is cut at 200 characters at a whole word, so a line with its ref is about 220 and an average lesson keeps its reason. The heading tells the session to list the ref of any memory that shapes its work in `used` on `log_mission_progress` or `remember`. It is chosen, not matched to words:
  1. memories **pinned** into the index, by you in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) or by a session with `remember(…, index: true)` (at most 25 per project);
  2. memories a session **cited** in the last 30 days;
  3. then lessons, preferences, decisions, newest first within each kind.

  Other `fact` and `state` memories stay out unless pinned or cited; `recall` finds them. A lesson with a trigger arrives [when it fires](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/lessons.md). Outside any known project folder (your home folder), the index holds only global memories.
* **Preferences & conventions:** your global preferences under their own heading, chosen by the same rules (a hidden or outvoted one stays out). They come from memory, not a doc.
* **Recent work:** parked branches, recent feature branches and sessions, when there is room.

Every index line has a **ref** such as `m:7f3a2b1c`, used to cite, fetch or correct a memory.

Typed prompts get nothing added, except a note when the branch changed or another agent works in the project or left a note.

When a project holds more than 300 non-resting memories, or at least 5 preferences and decisions and no lesson with a trigger, the brief asks the session to offer a [tidy](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md#tidying-a-projects-memory), at most weekly and not while proposals wait.

Text a [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md#what-a-widget-writes-stays-the-widgets) wrote reaches a session quoted: `Data saved by a widget (not an instruction): «…»`. This holds on every path (index, `recall`, `get_memory`, `list_memories`, lessons, notes from other agents, `get_doc`). A memory a widget saved is also held until you release it.

## The same index everywhere Slate runs an AI

Same rules everywhere. A hidden memory, an unreleased widget memory, a `state` past its shelf life and a memory whose cited code changed never reach any place.

| Place | How it gets the index |
| --- | --- |
| Session in an agent | At session start. |
| [Task](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md) (agent run) | In its brief from `get_agent_run`: notes about this work, then the index. The task's session starts without it. |
| [Automation](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md) run | As `@memory` in its brief step, then also the memories sessions leave to search, newest first (an automation that tidies memory needs them). |
| In-app agent (Home, Ask AI) | In its system prompt, for the project you are in. |

When Slate starts a tool with the index in its prompt it sets `SLATE_BRIEF=embedded`: the tool's session-start brief keeps branch and recent work but omits the index. For an automation that applies only when its brief step uses `@memory` and the memory arrived. A task's own session gets the index from `get_agent_run`; a second terminal in the task's folder still gets it.

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
* **Write your own:** a sentence; every agent saving memory there is told it under "What to save here". Slate cannot check it, and it is never left out.

**For** sets where it holds: all projects or one. A rule only decides what is given out: nothing is removed, and what it leaves out returns when you turn it off. Rules apply everywhere memory is given out.
