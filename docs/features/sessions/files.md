# Files, memories and editing

A file opens as a tab beside the session, so you can read what the agent changed, tell it what to fix, or fix it yourself.

## Open a file

- Click a file in the side panel's **Changes** or **Turns**, or a path the agent printed (`src/x.ts:42` opens at that line).
- **⌘P** finds a file by name in every project and each of its worktrees, grouped by checkout and branch (`FILES · acme · main`). Ignored files such as `node_modules` are left out. **⌘⇧F** searches the text inside them ([Search](https://liozelmalem-star.github.io/slate-releases/docs/features/search.md)).

Code opens highlighted and numbered. Markdown opens rendered, with **Read** one click away. Images are drawn. When the file changes on disk, an **updated** pill says so.

Up to 1 MB of text or 8 MB of image opens. A larger file, a binary, or a file that is not UTF-8 text says why and offers **Open in Finder**.

## Reading a file

The bar at the bottom shows the branch, **worktree** when the file is in one, and the file's path.

| Control | Shows |
| --- | --- |
| Margin marks | The branch's changes: green added, blue changed, a red notch for removed lines. Click one to see the change |
| The cursor line | When the line last changed, and in which commit |
| **Blame** | Every line's commit down the left, older commits fainter |
| **Show changes** | The file against **Where the branch began** or **The last commit** (pick under **against**). **Back to the file** or **Esc** leaves |
| **Now** | The file over time: pick a commit to read the file as it was, read-only. **Back to now** or **Esc** returns |

**[** and **]** step through changes; **⌥H** opens the file's history.

**Comment for the agent.** In **Show changes**, put the cursor on a line or select several, click **Comment on line 88**, write, and press **Add** or ⌘Enter. **Send N to the session** pastes all comments as one message at the prompt of the session working in that folder, without sending it. With no session there, the message is copied instead.

## What agents know about the file

A dot in the margin marks each line a memory cites. Point at it to read the memory. The header counts them: *4 memories · 2 told to agents who touch it*, or *No memories yet*. The second number is the lessons and decisions Slate gives an agent that reads or edits this file ([Lessons](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md#lessons)). Click it, or a dot, to open the card.

Each memory on the card shows its claim, its lines, how often sessions used it, and a check: *Matches the code*, *The code changed since — still true?*, or *Not checked against the code*.

| Action | Does |
| --- | --- |
| **Confirm** | Counts it confirmed and checks it again against the code as it reads now |
| **Correct** | Edit the claim; the new words replace the memory and cite the same lines |
| **Retire** | Stops it reaching sessions |
| **Remember line 7** | Write what agents should know about the selected lines; saved as your own memory citing them |
| **Ask an agent about line 7** | Pastes the lines and their memories at the prompt of the session in that folder; add your question and press Enter |

Your other acts count too. **Merge into main** of a reviewed branch confirms the memories its sessions cited; **Revert hunk**, **Revert file** and **Discard** count against them. If you save an edit to cited lines, the card asks *You edited these lines: still true?*

## Editing

At **Now** the file is editable, as in VS Code: changed lines are amber in the margin, the bar counts unsaved lines with **Revert** and **Save** (⌘S). The editor uses VS Code's keys ([list](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#files-and-the-editor)).

The agent writes the same files, so:

- **Save waits while an agent works in that folder** (*Waiting for Claude Code*). Keep typing; it saves when the turn ends.
- **Every save can be undone.** Slate takes a checkpoint before it writes, and the *Saved* notice offers **Undo**, which puts the file back as it was before the save, unless you have typed since.
- **A change on disk under your unsaved lines is merged.** If it touches other lines, both are kept. If it touches the same lines, choose for each place: **Keep yours**, **Keep theirs** or **Keep both**. Nothing is written until you save.
- **The agent reads the disk, not your screen.** A line says when it cannot see your unsaved lines yet.

Files are saved as written: line endings, indentation and a byte-order mark are kept, and nothing is reformatted. Unsaved text survives closing the tab and quitting Slate. A past commit, **Show changes** and **Blame** are read-only.
