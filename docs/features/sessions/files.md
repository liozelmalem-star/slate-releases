# Files, memories and editing

A file a session changed opens as a tab beside it. Read it with blame and history, see the memories citing its lines, send comments to the agent, or edit it.

## Open a file beside the session

**Changed**, at the foot of **Details**, lists every file the session's own tool calls wrote, read from its transcript. Another agent in the same folder never appears on it. Each file opens as a tab beside the session (icon by kind and language); the rail stays on Sessions. A path printed in the terminal opens at that line.

**⌘P finds a file by name in every checkout.** After two letters it lists, beside matching docs, files from every tracked project and each of its worktrees, grouped by checkout and branch (`FILES · acme · main`, `FILES · acme-feat-x · feat/x`).

- Uncommitted new files count; ignored ones (`node_modules`, build output) do not. A worktree outside every tracked folder is not searched.
- ⌘K lists the same files; **⌘⇧F** searches text inside them ([Search](https://liozelmalem-star.github.io/slate-releases/docs/features/search.md)).
- Picking a file opens it in its code: side panel to Projects → Code → Files, unfolded to the file.

Code opens highlighted, numbered, ⌘F-searchable and editable. Markdown opens rendered; **Read** is one click away. Images are drawn; SVG is picture and text. A view re-reads when a session moves; an **updated** pill says the text changed under you.

**Comment on changes, then send them.** In **Show changes**, put the cursor on a line (or select several), click **Comment on line 88** (*lines 90-93*), write, press **Add** or ⌘Enter. Notes collect under the header in line order. **Send to the session** pastes them as one message (`Review comments on <file>:`, then each note with its lines) at the prompt of the session in that file's folder (the deepest, if several); nothing is submitted. With no session in Slate there, the message is copied. Comments never change the file.

## Reading a file

The tab shows the file's name. The bottom bar shows the branch, **worktree** if the file is in one, and its path from the project folder.

| Control | Shows |
| --- | --- |
| Margin marks | Branch changes: green added, blue changed, red notch for removed lines. Click opens the change |
| Cursor line | After the line: when it last changed and in which commit; click for that change |
| **Blame** (end of bar) | Every line, down the left: commit age as the strength of one blue, time and subject once per run of lines. Pointing at a line lights its commit's lines |
| **Show changes** | Appears when the file differs from where its branch began; long unchanged stretches fold. **against**: where the branch began (default) or the last commit. **Back to the file** or Esc leaves |
| **Now** pill | File history: this branch's commits, a line where the branch left its base, earlier commits. Pick one for the file at that commit, read-only, with its change (pill turns amber); **Back to now** or Esc returns |

**[** and **]** step through changes; ⌥H opens the history.

## What agents know about the file

**A margin dot marks each line a memory cites**: any memory, decision or lesson whose `source_ref` names the file with a line range (`src/export/csv.ts:10-22`) or a symbol. The dot takes its kind's colour; point at it to read the claims. Moved code is found and the dot follows. A whole-file citation has no dot. Dots show at Now only.

**The header counts them**: *4 memories · 2 told to agents who touch it*, or *No memories yet*. The second number is the lessons and decisions given to an agent reading or editing this file ([lessons](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md)). Click it, or a dot (that line first), to open the card above the text.

Each memory in the card shows its claim, kind, lines (click to go), ref (`m:7f3a2b1c`), use count and tools, and a check: *Matches the code*, *The code changed since — still true?*, or *Not checked against the code* (written before fingerprints).

| Action | Does |
| --- | --- |
| **Confirm** | Still true: counted as confirmed by you; fingerprint retaken from the file as it reads now; a moved line citation is re-pointed |
| **Correct** | Edit the claim in place; the new words replace the old memory (kept in history) and cite the same lines as they read now |
| **Retire** | Stops reaching sessions, as in Memory |
| **Remember line 7** (*lines 7–9*) | Card head. Type what agents should know; saved as your own project memory citing those lines, so it gets a dot and later a *changed* mark |
| **Ask an agent about line 7** | Card head. Pastes the lines and every memory on them (with ref) at the prompt of the session in the file's folder; add your question, press Enter. No session: copied. Over 200 lines are cut. Unsaved lines in that folder are saved first |

**Your acts teach the memory.** **Merge into main** of a reviewed branch confirms each memory its sessions cited; **Revert hunk**, **Revert file** and **Discard** contradict them (once per branch per memory). The branch's sessions are those captured in that checkout on that branch; acts on `main` blame nobody. **Saving an edit on cited lines** asks once on the card, *You edited these lines: still true?* (**Confirm** = yes; **Correct** or **Retire** = no). Each act shows on the card, here and in Memory, with branch or file and date; **×** undoes it. No single act retires a memory. Everything stays in your store; only what you paste at a session leaves the computer.

## Editing

**At Now, Read is editable**, no edit mode, as in VS Code. Changed lines are amber in the margin, the tab wears a dot, the bar counts unsaved lines with **Revert** and **Save** (⌘S). The agent is a second writer, so:

- **Save waits while an agent works in that folder** (*Waiting for Claude Code*); keep typing. It works when the turn ends.
- **Every save takes a checkpoint first**, so **Turns** can undo it. The *Saved* line also offers **Undo**.
- **A disk change under unsaved lines is merged.** Different lines are all kept, and a line says so. Same lines: each place shows *Yours* beside theirs; choose **Keep yours**, **Keep theirs** or **Keep both**. If the agent writes again before you choose, the merge is made again from what you typed; **Revert** drops your side and closes the choice. Nothing is written until Save.

**The editor uses VS Code's keys** ([list](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#files-and-the-editor)). Brackets and quotes close themselves; typing one over a selection wraps it. Matches of the selected word are lit; words in the file are offered as you type (Enter or Tab takes one); the margin arrow folds a block.

**Saved as written:** line endings (LF, CRLF, even mixed), indentation (tabs, or the spaces in use; four if none) and a leading byte-order mark are kept. No autosave, format, trailing-space trim or final newline. In Diff, **Revert** puts a change back as an ordinary edit you then save.

**The agent reads the disk, not your screen:** with unsaved lines and an agent in the folder, a line says it cannot see them yet. Review comments Slate sends save your unsaved files there first, and say if one failed.

**Unsaved text survives closing the tab and quitting**, in the app's own storage (never the file), and returns through the same merge, so an unanswered choice comes back as that choice. A past commit, Diff and Blame are never editable. No rename, new file or removal.

**Where files open.** Only inside a folder Slate has business in: a group, project or branch folder, or one a live session runs in. A file a live session changed opens wherever it is (a `/tmp` scratchpad too), since its Changed list names it. Up to 1 MB of text or 8 MB of image opens. Larger, a non-image binary, a file that is not UTF-8 text (Latin-1, Windows-1255), or a file outside those folders shows a sentence saying why and **Open in Finder**, which shows the file in Finder and never opens it. The small system icon on a file opens it with the system, except a program, script or installer, which Slate shows in Finder instead.
