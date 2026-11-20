# Activity

**Activity** shows your agent sessions over time: what you did today, which projects you
worked in, and how your work is trending. It is built from data already on this computer.

With no sessions yet it says **No activity yet** and offers **New session**.

## The side panel

- the **project picker**: **All projects**, or one;
- **Range**: **7d**, **30d**, **90d**, **1y** or **All**;
- **Saved views**: a range, a filter and a project kept under a name. The view on screen
  is marked. **Remove view** offers **Undo**.

## The summary

One sentence sums up the range, such as **You ran 12 sessions over 6h, mostly in slate
(8 of 12). Busiest at 14:00.** "Mostly in" shows only when one project holds half the
sessions or more. A second line names the change worth a look, such as
**Look at: more sessions than the 30 days before (21) …**.

Four cards compare the range with the same number of days before it: **sessions**,
**session time**, **memories learned** and **active days**. **All** has no days before it,
so it shows no change.

## The board

At first the board holds:

| Card | What it shows |
| --- | --- |
| **Timeline** | The last 7 days, newest first: sessions, memories learned, finished agent runs, automation reports and artifacts. Today and yesterday are open; older days are one line. An open day lists up to 6 sessions and 4 memories, then **+N more** |
| **Sessions over time** | The trend over the range. Drag across it to zoom |
| **Last 13 weeks** | A calendar of your activity, always 13 weeks whatever the range. Click a day to see it in the Timeline. Arrow keys move between days; Enter opens one |
| **Time of day**, **Weekday** | When you work. **Peak** names the busiest hour |
| **By agent**, **By project**, **By branch** | Sessions ranked. Project and branch show the top 8. Click a row to filter the board to it |

**Show records**, under the Timeline, adds your busiest day, best week, longest focus,
favorite agent and top model. **Hide records** removes them.

Your [widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) made for Activity join the board once built, in the side
column. A widget not drawn within 10 seconds says so, with a link to Widgets.

## Arrange the board

Click **Arrange the board**, the grid icon in the side panel's title row.

1. A dashed spot at the top of each column lists the cards you can add: the ones you took
   off, and **Sessions** (the full list), **Momentum**, **By model**, **Memories**,
   **Quick stats**, and four readings of memory: **Do sessions save memory?**,
   **Is memory used?**, **Does memory help?** and **Are memories reachable?**
   ([Tidying memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md#does-memory-help),
   [Kinds of memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#is-memory-still-reachable)).
2. Move cards up or down, or **Hide widget**. **Reset layout** restores the first board.
3. Press **Done**.

**Momentum** lists up to 6 projects with their sessions in the range and the change
against the days before, such as **+3**. It shows nothing on **All**.

Agent runs have no card of their own. They are listed in
[Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md), and the Timeline shows a finished run on the day it
ended.

## Where the numbers come from

Slate reads each agent's own files: the transcripts of Claude Code, Codex, Gemini,
Cursor and the others that write them, and the databases of OpenCode, Kiro, Hermes Agent,
Goose and Kilo Code ([Session capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md)).

- A session is one conversation, counted once however many files or branches it touched.
  It counts when you typed into it and the model answered. Runs nobody typed into, such as
  `claude -p`, and Slate's own runs are not sessions.
- Days are your local calendar days. Session time is the time between your turns, leaving
  out any pause over 15 minutes.

What Slate reads is kept on this computer, even after the agent removes its own files, and
is never shared, even from a shared workspace.

**History from before Slate.** Claude Code removes transcripts after 30 days but keeps the
prompts you typed. For a session whose transcript is gone, Slate reads those prompts: the
session, its day, its folder. Tokens, cost and session time are not in them, so such a
session shows **not recorded** for tokens, and **session time** compares with the days
before only when both stretches have full records.
