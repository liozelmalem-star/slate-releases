# The doc tree

The Docs tree nests groups and projects with docs as leaves; any doc can hold children to any depth. With a project picked it starts inside it; on All projects it shows every group and project. For Code see [Files and Changes](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/code.md).

## Nothing open

Projects with no doc open shows one quiet line in the main area: **Open a doc from the list** (on Code, **Open a file from the list**). Groups and projects are folders in the list, never screens of their own ([Groups and projects are folders](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md#groups-and-projects-are-folders)). Until 2026-11-15 this was an Overview of project cards.

## Docs or Code

The tabs under the picker choose what the side panel lists. **Show code** on a project's ⋯ menu in Docs switches the panel to Code → Files with that project's files open. On Code, the doc icon at the end of a project's row returns to Docs with its folder open. The choice lasts while the app is open; every launch starts on Docs.

## Add a doc or project

The side panel's **+** (title row, Docs and Code) makes a **new project**, at once.

A doc is made where it goes:

- The **+** on a project's row lists the types (Plan, Design, Review, Bug, Note): an empty doc of the one you pick, in that project. A project holds any number of each.
- The **+** on a type folder (Plans, Designs, …) in the tree: an empty doc of that type. A doc's type is fixed once made ([Typed Docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md#doc-types)).
- A doc row has no **+**: a doc is never made inside another doc.
- **⌘N**: a blank note, caret in the title.
- **⌘K**: New doc, New Plan and each other type, or **Generate a doc** (⌘⇧G), where an agent drafts from your description.

A doc goes in the picked project. On All projects ⌘N makes nothing and says why (a doc lives in a project; pick one first). With no project, a top line says: *A workspace holds your projects. A project is a folder you open. A group collects related projects.* Each row's icon shows its type, which is fixed once the doc is made ([Typed Docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md#doc-types)).

## What the tree shows

- **Breadcrumbs**: where the doc sits, as the tree shows it: `Group / Project / Plans / Title`. The type folder (Plans, Designs, Reviews, Bugs, Notes) comes after the project, with the tree's icon and name. The crumbs are text, not links: they say where the doc is, and the tree is where you go elsewhere. **Icon**: the tree shows a doc's type icon, or the icon a doc already carries (a [Lucide](https://lucide.dev) name or an emoji); a doc's icon is no longer picked in the doc.
- **Captured sessions are not rows**; [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md) lists them.
- **Notes are counted**: a doc an agent wrote as a note is not a row. A doc holding some shows a **Notes** row with the count; it lists them in the main area, newest change first, with a title filter. They open, link and edit like any doc. A note holding docs stays a row.
- **Decisions are not in Docs**: each is a memory listed in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md). A decision holding docs stays a row.
- **Same-named projects** show folder ends: `lq  Documents/lq`, `lq  Private/lq`.
- **No branch is a doc**: a branch is a label on docs, sessions and memories made on it; the project holds them. Its worktree is read from git, and Sessions can start a session in it.

## Order, move and group

- **Order**: docs keep your order.
- **Drag to reorder** rewrites one row (fractional `position`); after about 52 drops into one gap, that parent's children are renumbered once. `position` is local, never pushed.
- **Move**: drag onto a new parent, or **Move to project…** on a doc's ⋯ (**Move to…** on a group's or project's). A doc goes only into another project, and its type keeps it in that project's folder for its type; it never goes inside another doc or a group. A project goes into a group or to the top; a group stays at the top. A drop anywhere else draws no target.
- **Not to another workspace**: no doc, project or memory moves between workspaces. To work on a project in a shared workspace, open its folder there.
- **Group projects**: shift-click two or more standalone projects, **Group…** on ⋯ or right-click, name it; they move in.

## Trash

**Move to Trash** keeps the doc recoverable: "Moved “Title” to Trash." with **Undo**; the open tab closes.

**Trash** lists each doc with when and from where ("Moved to Trash 2 days ago · from slate"), with a title filter.

- Row: **Restore**, **Delete forever…** icon, shown on hover or focus.
- Tick rows: **Restore (N)**, **Delete forever (N)**. Nothing ticked: **Empty Trash**, or **Delete forever · N shown** while the filter hides some. Delete forever always asks.
- Widgets in Trash have their own **Widgets** heading with **Restore** and **Delete forever…**.
- Click a doc to read it, read-only, with a **Restore** bar. A link to a vanished doc says so and offers **Open Trash**.
- Unreadable Trash: **Try again**.

## Branches and worktrees

- **Removed worktree**: worktrees are made beside the git repository as `<repo>-<branch>` (Slate's tooling: `<repo>.noindex/`). A session captured after its folder is removed files under its project; a folder that still exists keeps its own name.
- **Ended branch**: nothing changes; docs stay in the project's type folders and sessions in **Sessions**, labelled with the branch.

## A project's docs by type

Docs and Code share one skeleton: groups you made holding projects, and standalone projects. In Docs an open project has one folder per doc type it holds, with a count, in order: Plans, Designs, Reviews, Bugs, **Notes**. A plain doc is a note, so it is listed under Notes.

- **One project open at a time**, in Docs and in Code: opening a project closes the one that was open. The groups above it stay open, and inside a project its folders (and in Code its worktrees and file folders) stay as you left them.
- Folders start closed and stay as left.
- A type folder's **+** (on hover) makes an empty doc of that type in that project and opens it. Notes have none: agents write them.
- Inside, newest first: the ten most recent, then **Show N older**.
- The doc on screen is always shown in the list, however it was opened (the list, ⌘K, a link, a tab, app start). Its group, project and type folder open (and the project that was open closes), the type folder lists its older docs when the doc is one of them, and its row is marked and scrolled into view. This happens once each time a different doc opens, so a folder you close afterwards stays closed. Nothing takes the keyboard focus.
- Every doc written in the project is there, whichever branch, whether or not git still has it. Hover a doc for its branch.
- Code keeps **Files** and **Changes**, with a group's projects under its row.

## Settings

A group or standalone project has **Settings…** on its row's ⋯ menu (a project in a group uses its group's). One sheet:

- its folder; the agents and accounts it uses;
- worktree commands: **Set up**, **Preview**, **On remove**, **Carry over**;
- the **Check** command that decides a task is done; **Autopilot**; a **Memory** section.

Fields save on leaving; tools save with **Save agents**. Settings stay on this computer (they name local accounts and commands) and never travel with a shared workspace; only the Memory section is saved in the workspace. Accounts and models are set in Connect → Agents. A group's or project's tools override the workspace's; a new project asks for none.

## A refused action

A failed move, rename, duplicate, Move to Trash or restore (doc gone, workspace read-only, someone else's doc) shows a bottom message naming the doc and reason; the tree stays as it was. It closes after 8 seconds (waits while pointed at) or with ✕. The same message reports what you did elsewhere, with **Undo** when possible.
