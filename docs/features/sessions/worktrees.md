# Worktrees

A worktree is a second checkout of a project on its own branch, so an agent works without touching your main folder. Every session started on a git project starts in a new worktree of its own, however you start it. A folder that is not a git repository runs in place, and so does a worktree you pick on purpose.

## Start in a new worktree

On a git project, [New session](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md#new-session) asks two things, then **Create and start**:

- **Name** names the branch and the folder. Left empty, it is `session-<today>`, such as `session-2026-11-18`, with `-2`, `-3`… when that branch exists. The branch starts from the project's trunk; the folder sits beside the project's folder.
- **Carry over** lists what the project ignores at its top level, such as `node_modules` or `.env`. Tick what the new folder needs. git copies only tracked files, so without this a fresh worktree has no dependencies or build output. On a Mac each folder is cloned copy-on-write: it costs no disk until a file changes, and changes never reach the original.

**Carry over** is saved on the project when you press **Create and start**, and every other start uses it. If a ticked path could not be carried, New session names it and offers **Start anyway**.

## The project's worktree commands

A project's **Settings** has a **New worktrees** section with three commands:

| Setting | Runs |
| --- | --- |
| **Set up** | In the new folder once its files are there: a build, codegen, a submodule fetch. Empty is normal |
| **Preview** | When you press **Run preview** ([below](#run-preview)) |
| **On remove** | In the folder just before the worktree is removed: stop a server, drop a local database. If it fails, the worktree stays and the error shows its output |

Commands run in `/bin/sh` with your login shell's `PATH` and environment.

If carry-over or **Set up** fails, the new worktree is removed again and the error shows the command's output. Fix the cause and press **Create and start** again with the same name.

## Ports

Each worktree Slate makes gets a free port from 4100 to 4999, kept until the worktree is removed. It is `SLATE_PORT` in **Set up**, **On remove** and every session terminal in that folder, so two worktrees can each run `vite --port $SLATE_PORT`. The row shows it as `:4101`.

## Run preview

**Run preview** starts a checkout's dev server, such as `yarn dev`. Find it on a branch's row or map node.

1. Its terminal opens beside the session, so a failure says why.
2. When the server prints a local address, such as `http://localhost:5173`, it opens as a **Preview** tab.
3. The tab can **Reload**, **Open in your browser** or **Stop the preview**, which ends the server.

The first run on a project asks for the command; **Save and run** stores it.

**Pick an element** (the crosshair) turns the preview into a picker. Point at anything, click, and its description is pasted at the prompt of the session in that folder: the address it is on, a CSS selector, its size and position, its styles and its HTML. Nothing is sent: add what to change and press Enter. Click the crosshair again (**Stop picking**) to leave.

## A session's worktree ends with it

When a session that started in a new worktree ends (you exit the agent or press **End**; closing its tab is not an end), Slate cleans up:

| State | Result |
| --- | --- |
| Nothing uncommitted, branch merged or empty | Folder and branch are removed |
| Commits not merged | Folder is removed, the branch stays |
| Uncommitted changes | Slate asks once: **Keep worktree** or **Delete forever** |

First, the processes Slate started in that worktree (a dev server, a watcher, a test run) are stopped. A process you started elsewhere is never touched. A message says what was freed, such as **Cleaned up · stopped :3000 · 11.2 GB freed**.

Slate never removes a worktree it did not make for a session.

**Remove a worktree yourself** with the trash icon on a branch row in New session's list. It asks before discarding uncommitted work, and can delete the branch too.

To review and merge a finished branch, see [Review the branch](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md).
