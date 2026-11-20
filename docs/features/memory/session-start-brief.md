# What a session is given

Every session starts knowing where it is and what matters most in this project, without
reading all of memory. The rest it looks up for its task with `recall`
([Search and save](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md)).

## The brief

Agents with Slate's hooks get a short brief when a session starts, in this order:

1. **Scope**: the project, the branch, and the branch's goal when one was written down.
2. **Open**: the branch's open items, the pull requests and issues waiting on you in this
   project (from [Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md)), and on the main branch the other branches
   that still hold uncommitted work.
3. **Others**: other sessions working in this project now.
4. **Rules**: up to 5 of your own rules for this project ([Rules](#rules)).
5. **Memory index**: up to 12 memories, each with its ref (such as `m:7f3a2b1c`). First the
   ones you pinned, then the decisions and lessons sessions here used most. A session
   outside any project gets no index.
6. One line telling the session to call `recall` once it knows its task.

Agents with no start hook get the same index from Slate's MCP server when they connect.

A hidden memory, a status note past its shelf life and a memory whose cited code changed
never reach a session ([Kinds of memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#shelf-life-and-resting)).

## Look it up first

- **The first prompt** asks the session to call `recall` with its task before it starts,
  unless the request is trivial.
- **Before its first read or edit**, a session that got that ask and has not called
  `recall` is held: the call is refused with one line asking it to look first. After one
  `recall`, nothing is held again. A session that cannot reach Slate's tools is never
  held.
- **At the end of a turn**, a session that changed files without calling `recall` is sent
  back once to look. A session that did look but did not say which memories it used is
  asked once to name them.

**One session in four is held out.** It gets the brief without the memory index, and none
of these asks, so Slate can compare sessions with and without memory
([Does memory help?](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md#does-memory-help)).

Text a widget wrote reaches a session in quotes, marked as data and never as an
instruction.

## A session started from a task

**Run <automation>** on a task starts a session whose goal Slate knows from the start
([Agent runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md)). Instead of the brief it gets a card of up to 4,000
characters:

- **Scope**: the task's title, the note you typed when you started it, the project and the
  branch.
- **Open** and **Others**: as in the brief.
- **Connected**: the integrations connected for this workspace, by name only, such as
  *GitHub (acme/app)*. Never what they hold, and never a token.
- **Rules**: up to 5 of your rules for this project.
- **Memory**: up to 5 memories. First those that cite a file the task names, then the ones
  you pinned. A line points at `recall` for more.

## Where else memory is given

| Place | What it gets |
| --- | --- |
| An [automation](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) run | The memory index as `@memory` in its first step |
| Home's AI and Ask AI | The memory index of the project you are in |

## Choose what each one gets

- **What it gets from memory**, on an automation's **What it knows** tab and in Home's
  composer, lists the lines the next run gets and why. **Always give this here** puts one
  first. **Not relevant here** keeps it out.
- A memory's card in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) lists every such choice, each with an undo.

## Rules

A rule decides which memories your agents get. Open **Rules** in Memory's side panel to
see them; pick one to edit it, turn it off or remove it. The **+** in the panel's title
row opens **Add a rule**: choose **For** (all projects or one), then a **Ready rule** or
**Write your own**.

| Ready rule | What it does |
| --- | --- |
| **Leave out what nobody used for a while** | Leaves out memories not used for N days (60 to start) |
| **Keep only lessons that proved useful** | Keeps only memories used in at least N sessions (2 to start) |
| **Keep only decisions from work that shipped** | Keeps only memories from agent runs whose pull request merged |
| **Drop what came from work that was undone** | Leaves out memories from work reverted after it merged |

A ready rule shows how many memories it would leave out. **Write your own** is a sentence
every agent that saves memory here reads under "Rules". Slate cannot check it.

A rule only decides what is given out. Nothing is removed, and what a rule leaves out comes
back when you turn the rule off.
