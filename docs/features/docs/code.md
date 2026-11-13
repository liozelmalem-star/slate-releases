# Files and Changes

**Code** lists every project with a git folder on this computer (the picked one, or all) with two views on its left edge: **Files** and **Changes**. A project with no folder here says so. Open it with **Code** on a project's doc ([The doc tree](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/tree.md#docs-or-code)).

## Files

A tree like an editor's explorer.

- One-folder project: one row (name and branch) with files under it. With one project picked the row goes: files start at the top under a bar with the branch and the row's buttons.
- Two or more git worktrees: a group headed like **slate · 2 worktrees**, a row per worktree named by branch (hover for folder). Group starts open, worktrees shut; all stays as left.
- Files changed since the last commit show **M**, **A** or **D**, with a dot on their folders. Find a file by name with ⌘K.
- Hover a checkout's row: **New file**, **New folder**, **Refresh**, **Collapse all**.
- Right-click a file, folder or the space below: **New file**, **New folder**, **Open terminal here**, **Start session here**, **Copy path**, **Reveal in Finder**, **Rename**, **Move to Trash**. Names are typed in place. These wait while an agent works in that project.
- Rename or trash can be undone from its message or from Turns; a trashed file is also in the system Trash (the Recycle Bin on Windows). A file on another disk than the Trash, or on a Windows network share or removable drive, is refused and stays where it was.

## Changes

One section per checkout with files waiting to be committed, named by project and branch (branch named once). Source control as VS Code lays it out: one-line message, full-width **Commit** with **Commit & Push** in its ▾, files waiting (each committed unless unticked), same as a session's Changes ([Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#source-control)). The icon counts all waiting files. A worktree removed in a terminal leaves the list within about half a minute, or at once on returning to the window.

## A file in a tab

A file opens in a tab; the rail stays on Projects. A file picked in ⌘K comes here with its tree unfolded.

- The line under the cursor shows, after its end, when it last changed and in which commit. **Blame** shows it for every line.
- **Show changes** appears when the file differs from where its branch began; **Back to the file** or Esc leaves.
- Bottom bar: branch, **worktree** when relevant, path from the project folder.
