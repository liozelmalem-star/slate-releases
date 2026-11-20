# The doc tree

The **Docs** tab lists your groups and projects, and inside each project its docs, one
folder per type. Use it to find a doc, add one where it belongs, or reorganise projects.

## Nothing open

Projects never opens on an empty screen. With nothing open, it opens, for the picked
project (on **All projects**, the first project in the tree):

1. the doc you read last there; on **Code**, the file you opened last;
2. the first time, the project's doc titled README, or else its newest doc; on **Code**,
   the `README.md` at the root of its folder;
3. when there is nothing to open, one action: **New doc** for a project with no docs,
   **New project…** for a workspace with none, **Link a folder** on **Code** for a project
   with no folder on this computer.

A link that names a project, such as a breadcrumb, opens that project's README rather than
the doc read last.

## A project's docs

An open project shows one folder per doc type it holds, with a count, in this order:
**Plans**, **Designs**, **Reviews**, **Bugs**, **Notes**. A folder appears once it holds a
doc.

- Inside a folder, the 10 newest docs, then **Show N older**.
- One project is open at a time. Opening a project closes the one that was open. Folders
  inside it stay as you left them.
- The doc on screen is always shown in the tree, however you opened it: its folders open
  and its row is marked. A folder you close afterwards stays closed.
- Hover a doc to see the branch it was written on. Every doc written in the project is
  there, whichever branch, even after the branch is gone.
- Notes an agent wrote are not rows. A **Notes** row with a count lists them in the main
  area, newest first, with a filter.
- Captured sessions are in [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md), and decisions are in
  [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md). Neither is a row here.
- Two projects with the same name show the end of each folder path, and a hint:
  **Another project has this name**.
- A project that holds docs from an older version of Slate may show one more folder
  for its oldest kind of doc. No new ones are made.

The breadcrumb above an open doc says where it sits, such as
`Group / Project / Plans / Title`. It is text, not links.

## Add a doc

A doc is always made inside a project, and its type is fixed once made
([Doc types](https://liozelmalem-star.github.io/slate-releases/docs/features/projects/typed-docs.md)).

- The **+** on a project's row lists Plan, Design, Review, Bug and Note.
- The **+** on a type folder, on hover, makes an empty doc of that type. **Notes** has
  none.
- **⌘N** makes a note in the picked project. On **All projects** it makes nothing and
  says: **A doc lives in a project. Pick one at the top of Projects first.**
- **⌘K** offers **New doc**, a command for each type, and **Generate a doc** (⌘⇧G), where
  an agent drafts from your description.

A doc row has no **+**: a doc is never made inside another doc.

## Order, move and group

- **Reorder**: drag a row. Docs keep your order.
- **Move**: drag onto a new place, or **Move to project…** on a doc's ⋯ menu
  (**Move to…** on a group's or project's). A doc goes only into another project. A
  project goes into a group or to the top. A group stays at the top. A drop anywhere else
  shows no target.
- **Group**: shift-click two or more projects that are in no group, choose **Group…** on
  the ⋯ menu, and name it. They move into the new group.
- Nothing moves to another workspace. To work on a project in a shared workspace, open its
  folder there.

**Move to Trash** on a doc's menu closes its tab and says so, with **Undo**. Restore it
from [Trash](https://liozelmalem-star.github.io/slate-releases/docs/features/trash.md).

A move, rename or Move to Trash that fails (the doc is gone, the workspace is read-only for
you) shows a message at the bottom naming the doc and the reason. The tree stays as it was.
The message closes after 8 seconds, or with **✕**.
