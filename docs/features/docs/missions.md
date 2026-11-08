# Legacy `mission` docs, and progress on a branch

A `mission` doc was Slate's first container for a piece of work. No new ones are made; old ones still open. Work now files under its **project**: a session, plan or decision made on a git branch carries the branch as a label, and no doc stands for the branch.

An old `mission` doc (`doc_type = mission`) keeps nesting, breadcrumbs and the editor, and:

- the type chip shows its **status**: `draft`, `active`, `done`, `canceled`;
- a new empty one starts from the old outline: Goal, Checklist, Session log, Decisions, Notes;
- a list above the text shows docs filed under it; a project may hold one without a tree warning.

The **Doc ▾** menu does not offer `mission` ([Typed Docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md#doc-types)).

## Progress on a branch

The next session on a branch, yours or an agent's, starts with what the branch is for, derived from the project's records labelled with the branch and from git. No doc holds it.

The MCP tool `log_mission_progress` takes `cwd` (and `branch` when the work was on a branch other than the checked-out one, which git must know):

```
recall  →  work the task  →  log_mission_progress(summary, goal, open_items, decisions)
```

- **Goal and open items** become the branch's goal and open items, shown in the next session's brief. A newer report replaces the older; they fade after a state memory's shelf life.
- **Each decision** is saved as a decision memory labelled with the branch.
- **The summary** is a session entry of the project, labelled with the branch, in its **Sessions** tab.
- No doc is made. On a trunk branch (`main`, `master`, `develop`) the goal is not changed.

`log_mission_progress` is a memory tool exposed to every connected agent ([Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md)).

## Slate offers the doc at each milestone

At a milestone (plan, review, test plan, bug report, design) Slate has your agent ask in chat whether to keep it as a doc. It tells the tool to use its own click-to-answer question tool, so where that tool shows choices you click one; the wording is the tool's.

| Tool | Asks with | Reminded when you ask for a milestone | Sent back to ask if a plan was never offered |
| --- | --- | --- | --- |
| Claude Code | `AskUserQuestion` | yes | yes |
| Gemini CLI | `ask_user` | yes | yes |
| Codex | `request_user_input` | yes | yes |
| OpenCode | `question` | yes | yes; its end-of-turn event cannot reply, so Slate's plugin sends the ask as a new prompt when the turn goes idle |
| Cursor | `AskQuestion` | sent from Cursor's prompt event, which does not run in print mode (`cursor-agent -p`) | yes in the interactive app; its stop event does not run in print mode |

Choose save and the tool saves the doc in the project, labelled with the branch; choose not and nothing is saved. If the branch already has that doc, the choice is to add to it, keeping what is there. Every tool also carries a standing instruction to ask before saving a plan, review, test plan, bug report or design.

**A plan from plan mode is kept** as the branch's Plan doc, in the project, labelled with the branch. A later plan on the same branch replaces the one Slate made. A Plan doc you wrote is never changed.

See also: [Typed Docs & Hierarchy](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md), [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md), [Docs & the Block Editor](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md).
