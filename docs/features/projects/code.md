# Files and changes

The **Code** tab shows the code of every project with a folder on this computer (the picked
project, or all). Use it to read a file, see what changed, and commit. It has two views on
its left edge: **Files** and **Changes**. **Changes** carries a count of the files waiting
to be committed (99+ past 99).

Open it from the panel's **Code** tab, or with **Show code** on a project's ⋯ menu in
**Docs**. The doc icon at the end of a project's row in **Code** goes back to its folder in
**Docs**.

## Files

A tree like an editor's file explorer.

- A project with one folder is one row, its name and branch, with its files under it.
  With one project picked, the files start at the top under a bar with the branch.
- A project with two or more git worktrees is a group, such as **slate · 2 worktrees**,
  with a row per worktree named by its branch. Hover a row for its folder. One project and
  one worktree are open at a time.
- Files changed since the last commit show **M**, **A** or **D**, with a dot on their
  folders. Find a file by name with ⌘K.
- Hover a folder's row for **New file**, **New folder**, **Refresh** and **Collapse all**.
- Right-click a file, a folder or the space below for **New file**, **New folder**,
  **Open a Terminal here**, **Start session here**, **Copy path**, **Reveal in Finder**,
  **Rename** and **Move to Trash**. Names are typed in place. These wait while an agent
  works in that project. **Start session here** in a git project starts in a new worktree,
  in the same subfolder ([Worktrees](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md)).
- A rename or a move to Trash can be undone from its message. A trashed file also goes to
  the system Trash (the Recycle Bin on Windows). A file on another disk than the Trash, or
  on a Windows network share or removable drive, is refused and stays where it was.

## Changes

One source-control panel for each folder with files waiting to be committed. Each is named
by where it is, `group / project / worktree`, then the branch it commits on.

1. Type a one-line message.
2. Untick any file you want to leave out. Every file listed is committed unless unticked.
3. Press **Commit**, or **Commit & Push** in its ▾ menu.

It works the same as a session's Changes ([Review the branch](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#source-control)).
A worktree removed in a terminal leaves the list within about half a minute, or at once
when you return to the window.

## A file in a tab

A file opens in a tab, and the rail stays on Projects. A file picked in ⌘K opens here with
its folders unfolded.

- The line under the cursor shows, after its end, when it last changed and in which commit.
  **Blame** shows this for every line.
- **Show changes** appears when the file differs from where its branch began.
  **Back to the file**, or Esc, leaves.
- The bottom bar shows the branch, **worktree** when it is one, and the path from the
  project's folder.

A branch waiting for review opens here too, from Sessions: its worktree is selected in
**Files** and the whole branch opens in a tab with **Merge into <base>**, **Keep** and
**Discard** above it ([Branches waiting for review](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#branches-waiting-for-review)).
