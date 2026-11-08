# Built-in automations

Slate runs thirteen things on its own; **Automations › Built-in** (the row under **Overview** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md)) says what each does and what turning it off costs. Eleven have a switch. Two always run: clearing the queue a finished session leaves, and the [startup repairs](#the-repairs-at-startup).

## Switch scope

Ten switches are app-wide: off stops it in every workspace. They pause things you already choose one by one (each automation's switch, each reminder, each workspace's sharing) all at once.

**AI memory care** is per workspace: it spends your agent's tokens on that workspace's account. Its card is last in **Built-in** and says it holds for this workspace only. **Auto-capture** appears twice (top card and a list row): one switch.

## What runs

| Automation | Does | Off means |
| --- | --- | --- |
| **Scheduled automations** | Starts your automations at their times and those that run when a session ends; files each report under its group or project. Open workspace only, while Slate is open and the computer awake | Nothing runs on a schedule; automations stay listed and run by hand |
| **Shared workspace sync** | At startup, then every two minutes: pushes your docs in a shared workspace, pulls others'. Needs sign-in. After repeated failures waits longer, up to an hour | Shared workspaces stop updating both ways; **Sync now** still works |
| **agent runs (beta)** | Adds **Run with AI…** to a task (branch, folder, guided run). Every two minutes checks if a shipped run's pull request merged; for 30 days after shipping, hourly checks for a revert | Task card offers only **Just open a session**; started runs keep their rules; no merge or revert checks |
| **Reminders** | Rings when a task with a time comes due, in every workspace on this computer | Nothing rings; times stay |
| **AI memory care** (per workspace) | [Below](#ai-memory-care) | Free rules only: memories whose code is gone or whose state expired are hidden, badly shaped new ones refused; nothing spent |
| **Automatic updates** | Checks for a version, downloads in background, installs on next quit | Keep your version until you check in Settings → About |
| **Tell me when a session needs me** | One notification when a session waits on a permission or question and Slate is not in front; none for a finished turn | Sessions carry on; the amber dot and ⌘⇧J show the waiting one |
| **Show Slate in the menu bar** | Menu bar icon opens a panel of working or waiting sessions, with a count while one needs you | Icon leaves; Sessions and ⌘⇧J still show all |
| **Start Slate at login** | Opens Slate in the background at login. Off until turned on | Starts when you open it |
| **Auto-capture** | Watches agents' transcripts and your projects, files what happens into the workspace owning the folder. While Slate is open; sessions run after quitting are caught at next launch | Nothing captured on its own, at once; agents can still write through Slate's MCP server |
| **Keep the computer awake** | **Off until turned on.** While a session or automation works, stops the computer sleeping | Computer sleeps on schedule; running work pauses until wake |

**Per-agent capture.** Auto-capture is the master switch. Each agent whose transcripts Slate reads has a **Capture** switch on its row in Connect → **Agents**: off, its sessions are not recorded; it stays connected; other tools unaffected. Cursor has none: its capture is the hook on that row.

A switch applies on the next tick, not next launch: within a minute for the automation tick, two for sync and the merge check. Auto-capture applies at once.

### AI memory care

**Off until turned on.** Each night at 03:00, with the computer awake and Slate open, it reads up to 50 memories the free rules cannot judge.

- Each is read twice, separately, against the code it cites.
- Skipped: pinned or protected memories, lessons with a trigger, preferences, memories with a proposal waiting, any read in the last 90 days.
- One group or project per night: the one with the most memories, on its own agent and account.
- A memory both readings call wrong is retired (**Bring back** under the **retired** chip in Memory undoes it for 30 days). A disagreement waits in Memory → **Needs review**, at most 10 at once.
- Turning it on shows the cost and asks a monthly token cap: 1 million, 4 million or none. It stops for the month when the next night would pass it.
- Runs as an automation named **Memory care**, so **Scheduled automations** must be on.

## What reaches the network

- **Slate's own account** ([Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)): the update check (release manifest) and shared-workspace sync.
- **Through your agent's CLI, under its auth**: scheduled automations, session-end automations, agent runs, AI memory care.
- **Your own `gh` or `glab`**: agent run merge check and revert search (revert search is GitHub only).
- Everything else is local.

Turning something off removes nothing: capture off keeps captured sessions; sync off does not withdraw shared docs ([leaving a workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md)).

## Keeping the computer awake

Stops the computer sleeping before a 7:00 automation, only while there is work: a session whose status is *working*, a running automation, or a turn of Slate's own agent (a session only waiting on you does not count). Afterwards it may sleep on schedule. No effect in safe mode.

One switch, two places: the **coffee-cup button** in the top bar (green with a live dot while holding; click for the switch and what holds it, such as "Holding now — 1 session working, 1 automation running"), and the **Keep the computer awake** row in Built-in.

It never keeps the screen on, never stops you sleeping from the menu, and a Mac on battery still sleeps on lid close. It ends when Slate quits or crashes. On macOS it is `caffeinate -i`.

## The repairs at startup

Each start, Slate fixes rows earlier versions wrote wrongly (a doc indexed with empty search text, one under a vanished parent); some every start, some once. The same pass removes log entries older than 400 days. No switch.

See also: [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md), [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md), [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md), [Licensing & Updates](https://liozelmalem-star.github.io/slate-releases/docs/features/licensing.md).
