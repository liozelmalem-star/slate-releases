# The map and the list

The Sessions tab draws one list twice, as a radial map and a rail. Use this guide to read a node, row or colour.

## The map

A radial tree with this machine at the centre: **group → project → branch → session**. A project on its own sits on the first ring; one in a group, a ring out. A session with no project and no branch hangs from **No project**. With work in several workspaces, a workspace ring sits inside the group ring. Each level splits its parent's angle by the sessions beneath. The map wears Slate's own greens, not a workspace's colour; the halo is status, and a node shows the most urgent state beneath it.

Chip names are cut in the middle at 16 characters (workspace), 20 (project), 18 (git repository); a branch keeps its start, cut at 15 (`fix/sessions-gr…`). Point at a node for the whole name. Hovering map or rail lights the other; pointing at a project or branch lights every row under it. The map always fits the panel: no zoom, pan or scroll.

- Click a group or project to centre it. The rail narrows to its sessions; a crumb trail names where you are, and any crumb jumps to that level.
- **All**, empty space or Escape returns to the whole machine.
- Drag a node to reorder it among siblings; **Reset layout** undoes it.
- Below about 1024px the map is dropped and the rail shows everything.

## The rail

Two levels: **group or project**, then **sessions**. A row names its branch, and its project when the group holds several. With two workspaces running, a heading names both (*Work / Beacon*). Order is urgency, then name: most blocked first, then busiest, then longest waiting; within a level, blocked, working, idle, longest-waiting first. Order holds still while the pointer or focus is in the rail.

A session groups under the group or project its folder is filed under. One in a git repository no project holds groups under that git repository's name. Anything else (plain folder, home folder, no folder) goes under **No project**. A session outside every project is shown while it runs and not recorded.

**A session is listed where its edits land.** An agent can edit another worktree of the same project by full path. Slate lists it under the worktree of its latest edit, with that branch and *from <folder>* naming its terminal's folder. Before any edit it sits under its start folder; edits outside the project do not move it. The same rule picks its briefing branch and memory doc.

## A row

| Part | Shows |
| --- | --- |
| Title | The **branch**, with what its checkout holds and its pull request (`ui/hotfixes ↑4`); also heads the doc and tab. Tooltip: what it was asked (or its name) and the branch goal. No branch: the name, else the opening prompt. Claude Code's default name (`slate-66`) counts as none. Home cards are titled by what was asked |
| Live line | The question when it waits on you; what it said it was doing when it works; the next unticked plan item when it went quiet with work left |
| Meta line | Tool mark, time since it moved, how it runs, context fill, [flow](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/flow.md) strip with its current word ("Build", "Check", "Waiting") or plan progress (`0/4`) before any flow. Terminal glyph: Slate runs it and you can type. Eye: your own terminal, Slate only follows. **Flagged** badge: an unseen transcript flag; point at it for each flag and its run |

**Colour.** Amber: needs you. Green dot: working, pulses three times at work start, then still. Grey: idle, and everything else. Green and red: added and removed lines. Red: **missing** and failures. Blue: live sub-agent count.

**Context fill** is read from the transcript. Codex states its window: bar and `8% of 258k`, darker from 75%. Claude Code and OpenCode show the count alone (`323k`). Gemini and Cursor record nothing per turn, so show nothing. A session's **tab** shows only status dot and name.

**Checkout marks.** `↑3` commits the checkout has that its base lacks; `↓1` how far the base moved on; grey ring: uncommitted work; **missing**: a worktree git lists but cannot read. Level with base: nothing. A checkout with nothing running is listed as *checked out, nothing running*. `#118`: pull request. **owed** pill: real work, no memory recorded. **Review** tag: a branch waiting for you ([Branches waiting for review](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#branches-waiting-for-review)).

## Row actions

A click opens a temporary tab the next click replaces; **double-click** keeps it. Pointing at a row shows **⋯**, **End** (second click ends it), **what its branch changed** (the [whole review](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#reviewing-the-whole-branch), no session needed) and **+** (start a session there). **⋯** opens with the session's own acts:

- **Open beside** ([Sessions side by side](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/tabs.md#sessions-side-by-side)); ⌘-click does the same.
- **PR #118**, once origin has a pull request for the branch: opens it in your browser.
- **Hand back to my terminal**, on a Claude Code session Slate runs ([Moving a session back to your terminal](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md#moving-a-session-back-to-your-terminal)).

Below a rule: **New session**, **New worktree** (project row with several git repositories), **Copy path**, **Make a project** (row in **No project**), **Copy resume** (the tool's resume command, such as `claude --resume <id>`; first six tools only, the ten newest have none yet).

**Park** hides a *checked out, nothing running* checkout without removing it, in a **Parked · n** line at the end of its project with **Unpark** beside each. A checkout with a running session, or a [branch waiting for review](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#branches-waiting-for-review), is never hidden. Parked state is kept on this machine only.

## Finished and past sessions

**Just finished** sits dim at the rail's foot for ten minutes. A row shows tool mark and end time, with a tick only if its last turn finished; a session stopped mid-turn says "Stopped before it finished". A click opens its record, or the doc the work belongs to until the record is saved.

**Earlier today in \<workspace>** folds every other session from today (local day), minus Just finished and running ones; collapsed with its count. **All past sessions in \<workspace> →** opens the whole history, newest first, at `/sessions?past=1`, no time limit; each row has **Resume**.

A failure (failed Run preview, refused start, failed Stop) shows under its row, or at the head of the list when the row is off screen. The rail is the left side panel: drag its edge to resize; **⌘\\** hides it when a terminal wants the full width.
