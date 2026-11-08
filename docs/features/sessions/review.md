# Review the branch

A finished worktree branch is listed as waiting for review. Open it, read every changed line, comment, then merge, keep or discard. The Changes panel commits and syncs; Turns rewinds.

## Branches waiting for review

A worktree branch whose agent has finished, with commits `main` lacks, is waiting. Slate checks every project it knows. A worktree whose session has a turn open is not waiting.

Its row, under the project beside the branch, carries grey tags: **Review · n files ›**, **behind n** when `main` moved past it, and the wait time. The row shows even when nothing runs in the project; with a session on the branch, the tag sits under that session's row. In a project with several git repositories the row names the git repository first (*editor · feat-x*).

A branch `main` moved past cannot merge until its session rebases. With nothing running in it, it folds into a closed line at the project's end, **Behind main · n** (named for the branch it left, such as `master`), closed on each rail redraw. Branches with a session, and kept ones, stay in view.

Click the tag, or **Review & merge** in **⋯**, to open the review ([Reviewing the whole branch](#reviewing-the-whole-branch)). The header counts waiting branches (**n to review**); click it for the one waiting longest. Actions above the review:

| Action | Does |
| --- | --- |
| **Merge into main** | Fast-forwards `main` to the branch, then removes the worktree (project's **On remove** runs first) and the branch. Grey until the review loads. No merge commit, no checkout. With no checkout holding `main` only the ref moves; with one, it moves too, and the merge is refused if that checkout has uncommitted changes to a file the merge changes. Also refused: uncommitted work in the worktree, an open agent turn there, new commits since the review was drawn |
| **Ask to rebase** | Replaces Merge when `main` moved. Pastes *Rebase this branch on main and run the tests again.* at that session's prompt (no Enter), or copies it |
| **Keep** | Leaves the branch; its tag becomes a grey **Kept**, out of the count; the button reads **Unkeep**. Kept is stored on this computer only. New commits from an agent make it waiting again |
| **Discard** | Lists every commit on no other branch that will be lost, and whether uncommitted work goes too. Confirming removes worktree and branch. Uncommitted work added after the confirm opened is refused, not removed unlisted. Also refused: open agent turn, new commits since the review was drawn |

Measure is against `origin/main` and local `main` (commits either holds are not the branch's work), in the tag, review, **Branch changes** and rail counts. The tag's count omits untracked files, so the review can list more.

After Merge or Discard the next waiting branch opens, oldest first. If `main` moved but the worktree cannot be removed (On remove failed, or it is locked), the merge counts and a notification says why. The project's main branch is never merged or discarded here.

## What the branch changed

**Changed** is one session's own work. The panel's **Changes** is everything the branch holds that its base lacks, whoever wrote it: the question before a merge. It counts from where the branch left its base (later base commits never count) and **includes uncommitted work**.

Changes shows the worktree of the agent you work in: branch once on its row, then source control. With no agent selected, each worktree with a session is a one-line section (branch, lines waiting to commit); **▸** opens it. The branch name opens the whole review. A worktree's files and search are in Projects' Code.

### Source control

Changes works like VS Code's Source Control; Slate runs the git.

| Part | Behaviour |
| --- | --- |
| Count | Files waiting to commit, on the ⇄ in the header, the panel tab and the Changes title. Unpushed commits are not counted (that is **Sync changes**) |
| Fetch | Automatic on opening Changes when the last fetch is over five minutes old. No fetch button |
| Message box | One line, grows as you type; rows are 24 px |
| Main button | Files to commit: full-width **Commit N files**, **Commit & Push** in its ▾ (the only two ways to commit). All committed: **Sync changes**, with ↑ push and ↓ pull counts; pulls, then pushes. Never pushed: **Publish branch**. Nothing to do: no button, *Nothing to commit, and up to date.* |
| Commit | Message plus every file in **Changes** except unticked ones and the agents' MCP, hook and settings files (`.mcp.json`, `.claude/settings.json`…), which can hold secrets and start unticked. Nothing is staged: a file you staged stays staged and is not committed unless ticked. ⌘↵ in the message commits |
| File row | Icon, name, folder dimmed, git letter in colour (M, A, D, R); removed files struck through. Click opens the change. On hover: **Open file**, and ↺ restores the last commit's version (checkpoint taken first; no button undoes a discard) |
| Folded below | **Outgoing · N commits**, **Incoming · N commits**, and on a feature branch **This branch vs main · N files**. Never pushed: no upstream, so commits show as **Not yet published · N commits** against the base |

**Every write waits for the agent.** While a session works in the worktree, Commit, Sync, Publish and ↺ are off (*Claude Code is working here — waits for its turn to end*). Fetch moves no file, so never waits.

**Pull is a fast-forward or nothing; push never forces.** If branch and upstream both moved, Sync reports git's message and leaves the branch alone. Merge or rebase in the terminal. The tree has no rename, new file, removal or drag.

## Reviewing the whole branch

The branch name in a worktree's section, or pointing at a rail row, opens the branch as one doc: every changed file's lines in turn, measured from the same point. The header counts files and lines added and removed.

- **File tree** (left): every changed file in its folders. A click scrolls to it and unfolds it. Viewed files are drawn quieter.
- **Fold** a file by its arrow; **Fold all** / **Unfold all** for all. At most 2,000 changed lines open: a file that would pass that starts folded, a later smaller file that fits opens, the first file always opens. Seen files keep their fold when the doc re-reads. A binary file, a file over 3,000 changed lines and a new file over 512 KB are listed with a note instead of lines.
- **Viewed** folds and counts a file (*3/12 viewed*); the agent changing it again resets it.
- **Click a line number to comment.** Notes collect across files; **Send to the session** pastes them as one message at the prompt of the session in that folder, nothing submitted. A note on a removed line says *removed line*.
- A file's name opens the whole file, against the same point.
- The doc re-reads when a session in that folder acts or you return to the window. A failed read says why and offers **Try again**.

**Revert hunk** undoes one hunk; **Revert file** restores the file as the branch found it (a file the branch created is removed). A checkpoint is taken first, so **Turns** can undo it. Refused while an agent works in that folder or if the file changed after the doc was drawn (stated at the top). Only files change: nothing staged or committed, and nothing you staged is touched. Reverts count against the branch's cited memories ([files](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md#what-agents-know-about-the-file)).

## Rewinding a turn

**Every prompt takes a checkpoint first.** When a new prompt appears in a live session's transcript, before the agent acts, Slate snapshots the session's start folder: tracked and untracked files inside it, not what the project ignores. Other folders of a larger git repository are not included.

- Works for every tool whose transcript Slate reads. Branch, HEAD, staged changes and stash never move.
- Stored under `refs/slate/checkpoints/<branch>/` (hidden from `git log` and `git push`); newest 100 per branch kept.
- A turn that changed nothing takes none; nor does a folder outside any git repository.

**Turns**, in the side panel, lists them newest first, each named by its prompt and holding the files that turn changed (from its checkpoint to the next; the newest to now). A file opens showing what changed since the turn began. **Restore** needs a second click, then resets the session's folder to that checkpoint and removes files created since, touching nothing outside it. It first checkpoints the present (*Before restoring: …*), so a restore can itself be restored.
