# Activity & Analytics

**Activity** shows your AI sessions as you work: what you did today, which projects you touched, how your work is trending. It is built from data already on your machine.

## The dashboard

The board opens on the range you picked in the side panel. One sentence sums up the range: "You ran 12 sessions over 6h, mostly in slate (8 of 12). Busiest at 14:00." "Mostly in" shows only when one project has half the sessions or more. A second line names the comparison worth a look, such as "Look at: more sessions than the 30 days before (21), and 1h 5m more time in them."

Four cards compare the range with the same number of days before it: **sessions**, **session time**, **memories learned**, **active days** ("−9 vs the 30 days before" on 30d). **All** has no earlier days, so shows no change; neither does a card whose history does not reach back that far ([see below](#history-from-before-slate-kept-it)).

Below the cards is a board of widgets. At first it holds:

| Widget | What it tells you |
| --- | --- |
| Timeline | Last 7 days, newest first: sessions, memories learned, finished agent runs, automation reports, artifacts. Empty days are left out. Today and yesterday are open, older days one line. An open day lists up to 6 sessions and 4 memories, then "+N more". A session sits under the day it was last active. Click a day in **Last 13 weeks** to see that day instead, grouped by session start day, as the heatmap counts |
| Sessions over time | The trend over the range |
| Last 13 weeks | A calendar grid of activity, one stop for Tab: arrow keys move between days, Enter opens one. The caption counts sessions this week and last. It always shows 13 weeks and ignores the range |
| Time of day · Weekday | When you work. **Peak** names the busiest hour, such as 14:00 |
| By tool, By project, By branch | Sessions ranked by tool, project and branch. Project and branch show the top 8 |

**Show records**, under the timeline, adds Records: your busiest day, best week (the best 7 days in the last year), longest focus (your longest single session), favourite tool and top model. **Hide records** removes them.

**Momentum** starts off the board. It lists up to 6 projects with their sessions in the range and the change against the days before, such as "+3". It shows nothing on **All**. Its rows are not clickable.

Your [widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) for Activity (cards described in **Widgets**) join the board once built. They sit in the side column, before its first card or after any card, in the order and at the size set on each widget's preview in Widgets, and show the panel's range and project. A new one sits at the top of the column. The board has no control that adds or moves a widget; pointing at one shows a button that opens its setup. A widget not drawn within 10 seconds says so, with a link to Widgets.

**Arrange the board.** The grid icon in the side panel's title turns on editing of the board's own cards.

1. A dashed spot at the top of each column lists the cards that can go back there; click one to add it. They are the cards you took off and the built-in cards not on the board: Sessions (the full list), Momentum, By model, Memories, Quick stats, and four readings of the memory layer: Do sessions save memory?, Is memory used?, Does memory help? and [Are memories reachable?](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#is-the-corpus-still-worth-trusting).
2. Reorder and hide widgets. **Reset layout** restores the first board.
3. **Done** ends editing.

The side panel holds the **project picker** (All projects, or one), the **range** (7d, 30d, 90d, 1y, All) and **saved views** (range, filter and project kept under a name; the view on screen is marked; **Remove view** offers **Undo**). Drag across the trend chart to zoom; click a breakdown row to filter the board to it.

## Where the numbers come from

Slate's watcher reads each agent's own files: the session transcripts of Claude Code, Codex, Gemini, Cursor and the other tools that write them, and the databases of tools that keep sessions in SQLite (OpenCode, Kiro, Hermes Agent, Goose and Kilo Code).

- A session is one conversation the tool gave an id, counted once however many files or branches it touched. It counts when you typed into it and the model answered. Runs nobody typed into (`claude -p`, `codex exec`), Slate's own runs and subagent files are not sessions.
- Days are your local calendar days. Session time is the time between your turns, leaving out any pause over 15 minutes.

What it reads is kept in `machine.db` on this computer, even after the tool removes its files (Claude Code removes transcripts after 30 days). Nothing from it is shared, even from a shared workspace. The in-app agent and the MCP `activity` tool read the same sessions.

### History from before Slate kept it

Codex and OpenCode keep sessions for good, so their history is exact from the first session. Claude Code removes transcripts after 30 days but keeps every prompt you typed in its prompt history. For a session whose transcript is gone, Slate reads that: session, day, folder and prompts. The count was within 8% of the transcript count where both existed (measured 2026-10-16). Tokens, cost and active time are not in it.

So a range reaching back before an account's first transcript still shows sessions and active days; a session known only from prompt history shows "not recorded" for tokens. The session-time card compares with the days before only when both stretches have exact records; the other cards compare while any record reaches back that far.

`yarn usage:verify` recounts every agent file still on disk, independently of the history's reader, and checks the history holds the same numbers per account.

## See also

* [Session Capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md)
* [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md)
* [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md)
