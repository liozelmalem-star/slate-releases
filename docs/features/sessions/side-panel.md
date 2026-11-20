# The side panel

The panel on the right of Sessions shows what the session in your active column did and changed, so you can follow it without reading the terminal. It is open by default and follows the column with the blue line on top.

- **⌥⌘B**, or the button at the end of the tab row, hides and shows it. The choice is remembered.
- Drag its left edge to resize it, from 280 px to 640 px and never past 60% of the window. Double-click the edge for 320 px.

It has a tab for each view:

| Tab | Shows |
| --- | --- |
| **Details** | Where the session runs, what it made, how far it has got. **⌥⌘I** opens it, and so does a click on the status line above the terminal |
| **Changes** | What the branch holds that its base lacks, with commit and sync. Its icon counts the files waiting to commit. See [Source control](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#source-control) |
| **Turns** | Every prompt, newest first |
| A widget | Only while a widget is made for Sessions ([Widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md)). It reads the session open beside it |

## Details

Details has these sections, top to bottom. A section with nothing to show is left out.

| Section | Shows |
| --- | --- |
| **Workers** | The session's [workers](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/workers.md): how many are done, and a row per worker with its step |
| **Environment** | The agent, project, branch and folder, and how many other agents work there |
| **Outputs** | What the session published in Slate, newest first, as cards with a picture |
| **Progress** | The session's [flow](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/status.md#flow): its step, such as **Check · 4 of 5**, the time it has run, and a bar |
| **Context** | How much of the agent's context window is used, such as *120k of 200k tokens* |
| **Links** | What the branch is attached to: its pull request, an issue, and its doc in Slate |

**Outputs** shows eight cards, the rest behind **Show N more**. A card opens the artifact beside the session, at half the window, while the session stays where it is. Its header has **Open in Artifacts** and **✕**, which goes back to Details. **Escape** closes it too.

**Links** reads `PR #142 · #138` when closed. Open it for a row per link; click one to open it. The pull request's number comes from your remote with no sign-in. Its title, checks (**checks passing**, **checks failing**, **checks running**), reviews and state are read with your own `gh` once you connect GitHub in Connect. A branch named for a Jira or Linear key (`SLT-138-…`) links that item from Tasks.

## Turns

**Turns** lists every prompt the session was given, newest first, with when. Click one to scroll the conversation to it, or find it in the terminal's scrollback. A prompt that changed files shows how many; open it to list the files, and click one to see what that turn changed.

Before each prompt, Slate takes a checkpoint of the session's folder: its tracked and untracked files, but not what the project ignores. Checkpoints never move your branch, staged changes or stash, and are hidden from `git log` and `git push`. The newest 100 are kept for each branch and worktree. A turn that changed nothing takes none.
