# Sessions

**Sessions** shows every session of your agents on this computer, live, so you see at a glance which one needs you and which is working. It covers all 16 agents and sessions in your own terminals too. Nothing to install: a session appears within seconds of starting.

With nothing selected, the main area shows the map, and the list runs down the left. Click a row to open the session in a tab. [The map and the list](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/list.md) explains each part.

## What you see

Each live session has one state:

| State | Meaning |
| --- | --- |
| **Needs you** (amber) | The agent finished a turn and waits on you: it asks permission for a tool call, asks a question, or reports that it finished |
| **Working** (green) | The agent wrote to its session in the last 45 seconds |
| **Idle** (grey) | Quiet, and you spoke last. A session that only waits (a `sleep`, a scheduled wakeup) is idle too |

The header counts each state. **⌘⇧J** opens the session that has waited longest, then the next. When a session starts to wait for permission or an answer and Slate is not in front, macOS shows one notification. A finished turn posts none; it waits on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home.md). Turn notifications off with **Tell me when a session needs me** in Automations › Built-in. How a state is worked out: [Status and flow](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/status.md).

A session that ended moves to **Just finished**, then **Earlier today**. Subagents are not sessions: the parent's row counts them.

## Narrowing to a workspace or a project

The picker above the list starts on **All workspaces**. Pick a workspace to keep only its sessions, in the list and the map. A session no workspace claims counts as Personal's. A second picker then narrows to one project (**All projects**). The choice lasts while the window is open.

## A session's pull request

Slate checks origin for pull requests, asking once a minute, and shows **#118** on the row when one points at the branch's tip. Slate opens no pull requests: push and open one on your code host.

## The keyboard

Tab reaches the list's rows and Enter opens one. With focus in the list:

| Key | Does |
| --- | --- |
| ↑ ↓ or **j** **k** | Move between sessions |
| **Home**, **End** | First or last row |
| **f** | Start a second agent in the row's folder |
| **s** | End the session (press twice within four seconds) |
| **Escape** | Back to the terminal |

From anywhere, ⌘K → **Focus the sessions list** puts focus on the first row. All keys: [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#sessions).

## Ending a session

Point at a row and click **End**. It turns red and reads **End?**; click again, or press **s**, within four seconds. A Claude Code session that runs as a background job keeps its conversation, so you can attach to it again. Any other session ends. **End** works on sessions Slate did not start, such as a CLI in another terminal.

Quitting Slate ends the sessions it hosts, except Claude Code sessions, which keep running as background jobs.

## In the menu bar

The Sessions icon in the menu bar shows a count while a session needs you. Its panel lists the sessions that work or wait on you; click one to open it. It also has **Keep the computer awake**, **New session**, **Open Slate** and **Quit Slate**. Closing the window only hides Slate; ⌘Q quits.

## More about sessions

- [The map and the list](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/list.md): the map, a row, the row menu, parking, past sessions.
- [Start a session](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md): **+**, New session, a folder, a doc, a Terminal.
- [Your terminal and Slate](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/take-over.md): continue a terminal session here, or hand one back.
- [Worktrees](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md): the new checkout every session on a git project gets.
- [Workers](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/workers.md) and [Ask Slate](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/ask-slate.md): a session that starts other agents.
- [Cloud sessions and phone](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md).
- [The terminal and Conversation](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/terminal.md) and [The side panel](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/side-panel.md).
- [Tabs, columns and names](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/tabs.md).
- [Review the branch](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md) and [Files, memories and editing](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md).
- [Status and flow](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/status.md): how a state and a step are worked out.
