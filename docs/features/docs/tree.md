# The doc tree

The Docs tree nests groups and projects with docs as leaves; any doc can hold children to any depth. With a project picked it starts inside it; on All projects it shows every group and project. For Code see [Files and Changes](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/code.md).

## Overview

Under the project picker, above the Docs and Code tabs, **Overview** shows a card per project, grouped as the tree: **On their own**, then each group by name (empty groups hidden).

- Card picture: the project's README (first heading and paragraph), else its doc; with neither, the card has no picture.
- Below: name, folder's branch, worktree count if more than one (still one card), last worked time. Green dot = a session is working in it.
- Click a card to pick that project on Docs and Code: Overview keeps its one card, drawn larger; the side panel lists only it. Click that card to open the project's doc. The picker narrows Overview the same way.
- Projects with no doc open lands here. No project: one sentence with a **New project** button; the side panel says nothing more.

## Docs or Code

The tabs under the picker choose what the side panel lists. A project opens on its doc. **Code** on the doc switches the panel to Code → Files with that project's files open. On Code, the doc icon at the end of a project's row returns to Docs. The choice lasts while the app is open; every launch starts on Docs.

## Add a doc or project

The side panel's **+** (title row, Docs and Code):

- **Blank doc** (⌘N, caret in title).
- **Write it with AI…** (⌘⇧G): an agent drafts from your description.
- **New project…**.

A doc goes in the picked project. On All projects **Blank doc** is off and says why (a doc lives in a project; pick one first). The tooltip names the destination: "New doc in slate". With no project, a top line says: *A workspace holds your projects. A project is a folder you open. A group collects related projects.* Each row's icon shows its type, changeable later ([Typed Docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md#doc-types)).

## What the tree shows

- **Breadcrumbs**: `Grandparent / Parent / Title`. **Icon**: a [Lucide](https://lucide.dev) name or an emoji.
- **Captured sessions are not rows**; a project lists them under **Sessions · N**; [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md) lists all.
- **Notes are counted**: a doc an agent wrote as a note is not a row. A doc holding some shows a **Notes** row with the count; it lists them in the main area, newest change first, with a title filter. They open, link and edit like any doc. A note holding docs stays a row.
- **Decisions are not in Docs**: each is a memory listed in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md). A decision holding docs stays a row.
- **Same-named projects** show folder ends: `lq  Documents/lq`, `lq  Private/lq`.
- **No branch is a doc**: a branch is a label on docs, sessions and memories made on it; the project holds them. Its worktree is read from git, and Sessions can start a session in it.

## Order, move and group

- **Order**: docs keep your order.
- **Drag to reorder** rewrites one row (fractional `position`); after about 52 drops into one gap, that parent's children are renumbered once. `position` is local, never pushed.
- **Move / nest**: drag under a new parent. A group goes at the top; a project at the top or in a group; other drops are refused with the reason and nothing moves. Other docs go anywhere.
- **Group projects**: shift-click two or more standalone projects, **Group…** on ⋯ or right-click, name it; they move in.

## Trash

**Move to Trash** keeps the doc recoverable: "Moved “Title” to Trash." with **Undo**; the open tab closes.

**Trash** lists each doc with when and from where ("Moved to Trash 2 days ago · from slate"), with a title filter.

- Row: **Restore**, **Delete forever…** icon.
- Tick rows: **Restore (N)**, **Delete forever (N)**. Nothing ticked: **Empty Trash**, or **Delete forever · N shown** while the filter hides some. Delete forever always asks.
- Widgets in Trash have their own **Widgets** heading with **Restore** and **Delete forever…**.
- Click a doc to read it, read-only, with a **Restore** bar. A link to a vanished doc says so and offers **Open Trash**.
- Unreadable Trash: **Try again**.

## Branches and worktrees

- **Removed worktree**: worktrees are made beside the git repository as `<repo>-<branch>` (Slate's tooling: `<repo>.noindex/`). A session captured after its folder is removed files under its project; a folder that still exists keeps its own name.
- **Ended branch**: nothing changes; docs stay in the project's type folders and sessions in **Sessions**, labelled with the branch.

## A project's docs by type

Docs and Code share one skeleton: groups you made holding projects, and standalone projects. In Docs an open project has one folder per doc type it holds, with a count, in order: Plans, Designs, Meetings, Reviews, Test Plans, Bug Reports, **Notes**, General Docs.

- Folders start closed and stay as left; the open doc opens its folder.
- Inside, newest first: the ten most recent, then **Show N older**.
- Every doc written in the project is there, whichever branch, whether or not git still has it. Hover a doc for its branch.
- Code keeps **Files** and **Changes**, with a group's projects under its row.

## Settings

A group doc or standalone project has a **Settings** button in its header (a project in a group uses its group's). One sheet:

- its folder; the agents and accounts it uses;
- worktree commands: **Set up**, **Preview**, **On remove**, **Carry over**;
- the **Check** command that decides a task is done; **Autopilot**; a **Memory** section.

Fields save on leaving; tools save with **Save agents**. Settings stay on this computer (they name local accounts and commands) and never travel with a shared workspace; only the Memory section is saved in the workspace. Accounts and models are set in Connect → Agents. A group's or project's tools override the workspace's; a new project asks for none.

## A refused action

A failed move, rename, duplicate, Move to Trash or restore (doc gone, workspace read-only, someone else's doc) shows a bottom message naming the doc and reason; the tree stays as it was. It closes after 8 seconds (waits while pointed at) or with ✕. The same message reports what you did elsewhere, with **Undo** when possible.
