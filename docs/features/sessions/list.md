# The map and the list

Sessions draws the same sessions twice: as a map in the main area and as a list on the left. Read on to tell a node, a row or a colour apart.

## The map

The map is a tree with this computer at the centre: **group → project → branch → session**. A session with no project hangs from **No project**. A node shows the most urgent state of the sessions under it. Pointing at a node lights its rows in the list, and pointing at a row lights its node.

- Click a group or project to centre it. The list narrows to its sessions, and a trail of names above it takes you back up.
- **All**, a click on empty space, or **Escape** returns to the whole computer.
- Click Slate Bot at the centre to [Ask Slate](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/ask-slate.md).
- Drag a node to reorder it; **Reset layout** undoes it.
- In a window narrower than about 1024 px the map is hidden and the list shows everything.

## The list

Sessions are grouped under their group or project. One outside every project goes under its git repository's name, or else **No project**. Sessions that need you come first, then working ones, then idle ones. The order holds still while the pointer is in the list.

A session is listed where its edits land. If an agent edits another worktree of the same project, its row moves under that worktree's branch and says *from \<folder>*.

## A row

| Part | Shows |
| --- | --- |
| Title | The branch checked out in the session's folder, with its checkout marks and pull request (`ui/hotfixes ↑4 #118`). With no branch: the session's name, else what it was asked |
| Second line | The question when it waits on you; what it said it is doing when it works; the next plan item when it went quiet with work left |
| Third line | The agent's mark, time since it moved, how it runs, context fill, and its [flow](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/status.md#flow) step (**Build**, **Check**, **Waiting**) |

A terminal glyph means Slate runs the session; an eye means it runs in your own terminal and Slate follows. Context fill reads `8% of 258k` when the agent states its window, else a count (`323k`).

**Colours.** Amber: needs you. Green: working. Grey: idle. Red: failures. Blue: live subagents.

**Checkout marks.**

| Mark | Means |
| --- | --- |
| `↑3` | Commits the branch has that its base lacks |
| `↓1` | Commits the base gained since |
| Grey ring | Uncommitted work |
| **missing** | git lists the worktree, but its folder is gone |
| **not read** | git did not answer in time |
| **owed** | The session did real work and saved nothing to memory yet |
| **Review · n files** | A branch waiting for you ([Review the branch](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#branches-waiting-for-review)) |

A worktree with nothing running in it reads *checked out, nothing running*. One where a subagent works reads *working · subagent of fix/login*.

A [Terminal](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md#a-terminal) is a row too, always grey, titled by what runs in it now (`zsh`, `npm`), with its folder under it.

## Row actions

Click a row to open the session in a temporary tab, which the next click replaces. Double-click keeps the tab. Pointing at a row shows two buttons: **End**, which ends the session on a second click, and **⋯**, the menu:

| Item | Does |
| --- | --- |
| **Open beside** | Shows the session in a column beside yours (⌘-click does the same) |
| **PR #118** | Opens the pull request in your browser |
| **Hand back to my terminal** | On a Claude Code session Slate runs ([Your terminal and Slate](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/take-over.md)) |
| **Review & merge** | Opens the review of a waiting branch |
| **New session** | Starts a session in a new worktree of the project |
| **Copy path** | Copies the folder's path |
| **Make a project** | On a row under **No project**: makes its folder a project |
| **Copy resume command** | Copies the agent's resume command, such as `claude --resume <id>` |

A branch or project, on the map or as a heading, offers **New session** (+), **Branch changes** ([what the branch changed](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#reviewing-the-whole-branch)) and, on a checkout, **Run preview** ([Run preview](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md#run-preview)).

**Park** hides a worktree that reads *checked out, nothing running*. It moves to a **Parked · n** line at the end of its project, with **Unpark** beside each. Nothing on disk changes, and the choice is kept on this computer only.

## Finished and past sessions

**Just finished** sits at the foot of the list for ten minutes after a session ends. A tick means its last turn finished; *Stopped before it finished* means it was stopped mid-turn. Click one to open its record.

**Earlier today in \<workspace>** folds the rest of today's sessions. **All past sessions in \<workspace> →** opens the whole history, newest first; **Resume** on a row continues it on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home/ask.md#resume-a-past-session).

Drag the list's edge to resize it. **⌘B** hides it.
