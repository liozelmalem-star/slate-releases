# Review the branch

When an agent finishes on its own branch, Slate lists the branch as waiting for your review. Read every changed line, comment, then merge, keep or discard it. The **Changes** tab of the side panel commits and syncs as you go.

## Branches waiting for review

A worktree branch is waiting when its agent has finished and the branch has commits `main` lacks. Its row in the list carries a tag: **Review · n files**, **behind n** when `main` has moved past it, and how long it has waited. The header of Sessions counts the branches that can merge now (**n branches not merged**); click the count to open the one that has waited longest.

A branch `main` moved past cannot merge until its session rebases. With nothing running in it, it folds into a **Behind main · n** line at the end of its project.

Click the tag, or **Review & merge** in the row's **⋯** menu, to open the review. It opens in Projects' Code, with the branch's worktree selected. Above the review:

| Action | Does |
| --- | --- |
| **Merge into main** | Moves `main` forward to the branch, then removes the worktree and the branch. No merge commit is made. Refused while the worktree has uncommitted work or an agent is mid-turn there, or when the branch gained commits since the review was drawn |
| **Ask to rebase** | Replaces Merge when `main` moved. Pastes *Rebase this branch on main and run the tests again.* at the session's prompt, without sending it |
| **Keep** | Leaves the branch, and its tag becomes **Kept**; **Unkeep** undoes it. New commits make it wait again |
| **Discard** | Lists every commit that is on no other branch and will be lost, then removes the worktree and the branch |

After Merge or Discard, the next waiting branch opens, oldest first. The project's main branch is never merged or discarded here.

## Reviewing the whole branch

Click **Branch changes** on a branch, or the branch name in the Changes tab, to read the branch as one document: every changed file's lines in turn. The header counts files and lines added and removed. Changes are counted from where the branch left its base, and include uncommitted work.

- **The file list** on the left holds every changed file; click one to scroll to it.
- **Fold** a file by its arrow, or use **Fold all** and **Unfold all**. At most 2,000 changed lines open at first; later files start folded. A binary file or a very large one is listed with a note instead.
- **Viewed** folds a file and counts it (*3/12 viewed*). If the agent changes it again, it is unmarked.
- **Comment**: click a line number, write, and press **Add**. **Send to the session** pastes all your comments as one message at the prompt of the session in that folder, without sending it.
- **Revert hunk** undoes one change; **Revert file** puts the file back as the branch found it. A checkpoint is taken first. Both are refused while an agent works in that folder.

The review reads again when a session in that folder acts, or when you come back to the window.

## Source control

The **Changes** tab works like VS Code's Source Control, and Slate runs the git. It shows the worktree of the session you work in; with no session selected, each worktree with a session is one line you can open.

| Part | Does |
| --- | --- |
| The count | Files waiting to commit, on the tab's icon and the title |
| Message box | **Message (⌘↵ to commit)** |
| Main button | **Commit N files**, with **Commit & Push** in its menu. With everything committed: **Sync changes**, which pulls, then pushes. On a branch never pushed: **Publish branch**. With nothing to do: *Nothing to commit, and up to date.* |
| A file row | Its name and git letter (M, A, D, R). Click it to see the change. Pointing at it shows **Open file** and **Discard changes** |
| Folded below | **Outgoing**, **Incoming**, and **This branch vs main** |

A commit takes every file listed, except ones you untick. Files that can hold a secret, such as `.mcp.json` and `.claude/settings.json`, start unticked.

While an agent works in the worktree, every button that writes waits: *Claude Code is working here — waits for its turn to end*.

Sync never forces. If the branch and its upstream both moved, Sync shows git's message and changes nothing; merge or rebase in the terminal. Slate fetches by itself when you open Changes and the last fetch is over five minutes old.
