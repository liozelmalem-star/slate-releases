# Sessions — the Live Tracker

The **Sessions** tab lists every AI-CLI session on this machine, live, for the 16 agents. It shows who is working, who needs you and where each runs.

Nothing to install: any tool whose transcripts the capture watcher sees (non-default config directories too) is tracked. Claude Code lists its own sessions (`claude agents --json`), so its rows carry the real session id, the process and whether a background job finished. Other tools are read from transcripts and the process table. Measured on Codex, Cursor, GitHub Copilot, OpenCode, Gemini, Hermes Agent and Goose; unverified on the rest ([Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md)). A row shows the session's [name](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/tabs.md#naming-a-session) when it has one.

**Sub-agents are not sessions.** The parent's row counts the live ones and expands to name them; on the map each is a pip around its session. Only recently active ones show, and none can be stopped (they run in the parent's process).

## What you see

The list shows live sessions on the whole computer. An ended session folds into **Just finished** and **Earlier today**. Each live session has one state:

| State | Meaning |
| --- | --- |
| **Needs you** | The tool finished a turn and is blocked on you. **⌘⇧J** goes to the one waiting longest, then the next. The tab header shows the count. Kinds: **Needs permission** (a tool call waits for your yes), **Asks you** (the turn ends on a question), **Finished** (the turn is a report) |
| **Working** | The transcript is being written now |
| **Idle** | Quiet, and you spoke last. A session that only waits is idle too, however fresh its transcript: its newest call is a loop on the gate lock (`slate-heavy.lock`), a running `sleep`, or a ScheduleWakeup. The wait must be the whole command: `sleep 5 && yarn test` is work. Grey dot, no pulse, flow word **Waiting** |

When a session starts waiting on a permission or question and Slate is not in front, macOS shows one notification with the question, once per wait (never for waits already there when Slate opened). A finished turn posts nothing; it waits on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md#what-home-shows). **Tell me when a session needs me** in Automations › Built-in turns it off. See [How status works](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/status.md).

## In the menu bar

A Sessions icon shows a count while a session needs you. Its panel lists sessions working or waiting on you, waiting first in Home's order (permission, question, finished), each with kind and tool, and its workspace (a small dot and the name) when they span more than one workspace. Click one to open it. The panel also has **Keep the computer awake**, **New session**, **Open Slate** and **Quit Slate**.

Closing the window only hides it; ⌘Q quits. A hidden window stops reading sessions and all timers and catches up on opening; the count, notification and keep-awake come from the server and keep working. A visible but unused window shows changes within 5 seconds, other timers at a quarter pace. Automations › Built-in has **Show Slate in the menu bar** (on) and **Start Slate at login** (off).

## Narrowing to a workspace or a project

The **workspace picker** under the side panel's title starts on **All workspaces** each time the tab opens. Pick one to keep only its sessions, in list and map. A session no workspace claims counts as Personal's. A **project picker** then appears (**All projects**); a project keeps sessions in it or in its git repositories and branches. Changing the workspace drops the project. The choice lasts while the window is open. **Just finished** and **Earlier today** follow both. Opening one of their docs, or **All past sessions**, from another workspace switches the window to it first.

## The map and the list

The map shows the machine as a radial tree, **group → project → branch → session**, in Slate's own greens, not a workspace's colour. The **rail** reads it out: a row per session with status dot, title, live line and meta line. Hovering one lights the other. Click a row to open the session in a temporary tab; **double-click** keeps it. Map, row, menu, parking and past sessions: [The map and the list](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/list.md). With nothing selected, the main area shows the map.

## A session's pull request

Slate reads `refs/pull/*` on origin, asking once a minute, and shows **#118** on the row once one points at the branch's tip. The trunk never shows one. The number may belong to a merged or closed pull request (refs cannot tell); a branch sharing its tip with another on origin shows none. Slate opens no pull requests: push and open one on the code host.

## The keyboard

Tab reaches the rail's rows (cloud rows included); Enter opens one. ↑/↓ or **j**/**k** move, **Home** and **End** jump to the ends (no wrap), **Escape** returns focus to the terminal; ↑ or **k** from outside enters at the last row. On the focused row **f** starts a second agent in its folder and **s** stops it (second press within four seconds); on a cloud row both do nothing, and **f** does nothing on a row with no folder. These letters act only with focus inside the rail and never in a text field; modified chords (⌘⇧J, ⌘K) pass through. From anywhere, ⌘K → **Focus the sessions list** focuses the first row (listed only while a row is on screen). All keys: [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#sessions).

## Stopping a session

Each row whose session can end has a **Stop** button. The first click arms it (*Click Stop or press s again to end it*); the second click, or **s**, ends it. Mouse and keyboard share one arm, which resets after four seconds.

| Session | Stop does |
| --- | --- |
| Backgrounded Claude | `claude stop <handle>`: **keeps the conversation**, so you can attach again |
| Everything else | `SIGTERM`, so the CLI closes its own MCP subprocesses; the conversation ends |

A signal is refused when the process is no longer the reported tool (pids are recycled). It works on sessions Slate never started, such as a forgotten CLI in a distant terminal.

**Quitting Slate** ends the sessions it hosts. First, a Claude session not yet a background job gets its detach input and 1.2 seconds (one wait for all), so it lives on as a job; an existing job keeps running.

## More about sessions

- [The map and the list](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/list.md): map, rows, row menu, parking, past sessions.
- [Start a session](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md): from the list or a doc, open a folder, chat, plain shell, take over, hand back.
- [Worktrees](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md): the form, ports, run preview, Pick, cleanup.
- [Cloud sessions and phone](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md)
- [The terminal and the side panel](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/terminal.md): terminal, Conversation, Details, Turns, timeline.
- [Tabs, columns and names](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/tabs.md): side by side, naming, agents that know each other.
- [Review the branch](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md): waiting branches, source control, whole-branch review, rewinding.
- [Files, memories and editing](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md)
- [Session flow](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/flow.md): Overview, Plan, Build, Check, Land.
- [How status works](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/status.md): how a state is decided and kept current.
