# Worktrees

A worktree is a second checkout of a project on its own branch, so an agent works without touching your main folder. Use **New worktree** on a project or in the **New session** tree; a session then starts inside it.

## The form

Fields: **Branch**, **From** (local branches only, nothing fetched) and the **Folder** it will make, always a sibling of the project.

**Carry over** makes the folder usable: `git worktree add` copies tracked files only, so a fresh worktree lacks dependencies, `.env` and build output. The form offers what the project ignores at top level as chips; tick `node_modules`, skip `.DS_Store`.

- Mac: each folder is cloned copy-on-write (no disk cost until a file changes; changes never reach the original). Elsewhere: hard links. Nothing carried is tracked.
- A missing ticked path or failed copy: the worktree is made, the form names the path, holds the start and offers **Start anyway**.

| Setting | Meaning |
| --- | --- |
| **Then run** | One command in the new folder once files are there (build, codegen, submodule fetch). Empty is normal |
| **On remove** | One command in the folder just before the worktree is removed, however it is removed: stop a dev server, drop a local database, free a port. If it fails the worktree stays and the error shows its output (up to 60 seconds) |
| Shell | `/bin/sh -c` on macOS and Linux, with your login shell's `PATH` and environment; PowerShell on Windows (`cmd` if missing); untranslated, so write for your shell |

**Carry over**, **Then run**, **On remove** and **Run preview** are saved on the project (so on its group for later worktrees) only when you press **Create and start**. Closing the form or **Back** saves nothing.

**A failed worktree is rolled back.** If carry-over or **Then run** fails, the folder, git's record and the port are removed and the error shows with the command's output. The branch goes too if Slate made it for this worktree and nothing moved it since; an existing branch stays. Fix the cause and press **Create and start** again with the same name.

## Ports and temp folders

Each worktree Slate makes gets a free port from 4100 to 4999, kept until removal and stored on this computer only. It is `SLATE_PORT` in **Then run**, **On remove** and every session terminal in or under that folder, so two worktrees can each run `vite --port $SLATE_PORT`. The row shows `:4101`. A hand-made worktree has none. Sessions there also get a temp folder outside the worktree (`TMPDIR`, `TMP`, `TEMP`), removed with it.

## Run preview

**Run preview** is the command that starts a checkout's dev server, such as `yarn dev`, offered in a session row's **⋯**.

1. Its terminal opens beside the session, so a failure says why.
2. When the server prints a local address (`http://localhost:5173`), it opens as a **Preview** tab in the strip.
3. The preview can reload, open in your browser, or **Stop**, which ends the server's terminal and closes the tab (the tab also closes when the terminal ends).

The first run on a project with no command asks for it; **Save and run** stores it. A checkout with no project runs it once and saves nothing.

**Pick** (crosshair) turns the preview into a picker. Point at anything to outline it, click, and its description is pasted at the prompt of the session in that folder: the doc it is on, a CSS selector, size and position, deciding styles, its HTML. Nothing is submitted; add the change and press Enter. No screenshot (other origin). The web page is framed through a small proxy on Slate's loopback port that adds one script and serves only a local dev server; hot reload works. Slate keeps proxies for the 16 most recently used dev servers; an older one is closed and starts again when you pick there again. Click the crosshair again for the plain preview.

## A worktree made for a session ends with it

When the session started in a new worktree ends (you exit the tool or press Stop; closing its tab is not an end), the worktree is removed:

| State | Result |
| --- | --- |
| Nothing uncommitted, branch merged or empty | Folder and branch go |
| Commits not merged | Folder goes, branch stays |
| Uncommitted changes | Asks once: **Keep worktree** or **Delete forever** |

First, what the session left running there is stopped: every process Slate started for that worktree whose working folder is still inside it (dev server, watcher, test run) gets a polite stop, then a forced one after 3 seconds. Slate knows its own by a mark it gives each session, setup and teardown line for that worktree, never by name or port. A process you started elsewhere is never touched, and shells, multiplexers (`tmux`, `screen`, `zellij`), editors and apps are spared even when Slate started them. macOS hides the environment of its own system programs, so one of those (`tail`, `ruby`) is left running. Windows cannot see another process's folder, so it stops processes whose command line names a path inside the worktree or that listen on its port.

A message at the window's bottom says what was returned, **Cleaned up · stopped :3000 · 11.2 GB freed**, and what happened to worktree and branch. It waits while another session still works in the folder. It never touches a worktree not made for a session: hand-made, another tool's, or one whose session was running when Slate quit. The folder is renamed aside at once and removed in the background.

**Removing a worktree by hand** is under the trash icon on a branch row in **New session**. It stops no processes and counts nothing. It refuses a checkout with uncommitted work unless you choose to discard it, and can remove the branch too. A dirty branch is marked before the click; a worktree whose folder is gone says **missing**, and one git did not answer for says **not read**, never clean.

Reviewing and merging a finished branch: [Review the branch](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#branches-waiting-for-review).
