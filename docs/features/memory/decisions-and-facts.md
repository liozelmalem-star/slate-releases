# Kinds of memory

Every memory has one of five kinds. The kind decides how it is used: a decision explains
why, a lesson arrives on a tool call, a status note expires.

| Kind | Holds |
| --- | --- |
| `decision` | A choice and its reason: "chose X over Y because Z" |
| `preference` | How you like to work |
| `state` | Where a piece of work stands. Memory calls it a status note. Expires after 14 days |
| `fact` | Lasting knowledge about the project. Memory calls it a general memory |
| `lesson` | What to do in a situation, and why. Can arrive on a tool call ([Lessons](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md#lessons)) |

## Decisions

A decision must carry its reason, or it is refused. Saving one also writes a decision doc
with the full reasoning, the options turned down and how sure it is. `recall` ranks a
decision first for a "why" question.

**A decision learns what came of it.** When an [agent run](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md) relied on
a decision, Slate adds a line under the doc's **Outcome**:

| What happened | The line |
| --- | --- |
| The pull request merged | **Shipped in “Fix the invoice rounding” (link), 2026-10-14.** |
| It closed without merging | **Not shipped: “…” closed without merging (link), …** |
| A merged GitHub pull request was reverted within 30 days | **Reverted: “…” was undone in (link), …** |

Pull requests are checked through your own `gh`. GitLab merge requests are not checked.

## One memory replaces another

A preference or a status note has one value at a time. When an agent saves one with a
`subject`, a dotted key such as `ui.theme`, it retires the older memory with the same key.
A status note saved by an agent must have one. Decisions, lessons and `fact` memories add up instead.

## Shelf life and resting

- **Status notes expire.** 14 days after it was last confirmed, a status note is no longer
  given to any session. It stays in the list. Restating it starts the 14 days again. A
  status note about a branch that landed or was removed is retired.
- **Unused memories rest.** A memory nobody used or restated for 30 days leaves the index.
  It stays stored and searchable, and using or pinning it wakes it. Pinned memories and
  preferences never rest.

Slate also keeps one status note for each branch that holds uncommitted work, so the next
session knows about it.

## What a project keeps

Open a group's or project's **Settings…**, then **Memory**:

- **Keep**: **The workspace default**, **Decisions and lessons only**, or
  **Every kind, from every writer**.
- **Advanced**:
  - **Kinds**: which kinds are kept.
  - **Written by**: which writers may save. Agents, Slate's automations and tasks, widgets,
    and agents' own memory files.
  - **Never about**: words a memory may never mention, separated by commas, up to 50.
  - **Capture sessions**: off, and sessions in this project's folder are not saved.
- **Inherit everything** resets it.

Each setting shows where it comes from: **set here**, **from** a group, **from the
workspace**, or **default**. A word banned higher up stays banned here. A refused memory
is not saved, and the agent is told why. What you save yourself is always kept. A new
setting applies from now on; kept memories stay.

## Hide from sessions

**Hide from sessions** on a memory's card keeps it in your list but gives it to no one: no
session, no teammate (one already shared is withdrawn), no widget and no AI memory care.

- Where its words were copied into a doc (a decision doc, a note), they stay as you wrote
  them for you. Wherever the doc leaves your hands, to an agent, a widget or a teammate,
  they become `[held memory]`.
- In a shared workspace the hide reaches your other computers on the same account at their
  next sync. In a workspace never shared, it stays on this computer.
- A teammate sees a hidden memory as removed.

**Give to sessions again** undoes both.

## Is memory still reachable?

The **Are memories reachable?** card on [Activity](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md) (add it while arranging
the board) finds three faults and can repair them:

- a memory filed under a removed doc, which `recall` can no longer reach;
- a memory filed under a group when its cited file sits in exactly one project of it;
- a citation that no longer points at a file. The citation is dropped and the claim kept.

**Show what would change** lists every change before you repair. Nothing runs on its own.
