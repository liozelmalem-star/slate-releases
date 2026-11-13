# Docs & the Block Editor

A doc is Slate's one unit: a note, design doc, project and captured AI session are all rows in one `doc` table, so nesting, reordering, icons and Trash work the same. Each has an id, `parent_id`, title, icon, fractional `position`, block content and metadata (`doc_type`, `status`, `archived`, timestamps).

The line under a title ends with who can read it: **Private** in Personal, **Shared · <workspace>** in a shared one.

**The open screen stays current.** When an agent writes over MCP (appends to the doc you read, renames, files a doc, saves a memory) the screen updates within seconds. If you are typing on that doc, your text is kept and a "changed elsewhere" notice offers **Copy my text**, **Keep my version** (asks once, then overwrites the newer one) and **Reload doc**.

**A save that fails says so.** Typing saves within half a second. If a save does not reach the store (Slate's server is down, or it refused the write), the header shows **Not saved** where it shows **Edited …**. Slate tries again on your next edit, every 5 seconds while the server answers, and at once when it comes back; the word goes when a save lands. A retry never overwrites a newer copy: if the doc changed meanwhile, you get the "changed elsewhere" notice instead. Unsaved edits live in the open window only, so they do not survive quitting Slate.

While the server is down, a red strip at the top reads **Slate isn't responding**. It says your work is safe only while no doc has unsaved edits; otherwise it says some edits are not saved yet. After a minute it says **Still trying. Restart Slate if this stays.** with **Open logs**.

## The block editor

[BlockNote](https://www.blocknotejs.org); content is stored as BlockNote JSON in `content`.

Blocks: paragraph, six heading levels (and toggle headings), bullet, numbered, to-do and toggle lists, quote, code, table, image, video, audio, file, divider; plus **callout** and **doc card** (embeds another doc as a preview). A callout is a plain note; only the ⚠️ emoji draws it in the warning colour, and clicking the emoji cycles the ten offered.

- **`/`** opens the slash menu. First item **Write with AI** asks an agent to draft text; a failed draft keeps the prompt open with the reason and **Retry**. **Callout**, **Link to doc**, **Doc card** are also there.
- **@** links a doc inline; **/Link to doc** opens the same list (loose matching, recent first, arrows and Enter).
- Drag blocks by handle or move by keyboard.
- Pasted Markdown replaces a selection, fills an empty block, or splits a paragraph at the cursor.
- Right-click menus open with their corner at the pointer.

**Right-to-left.** A doc in Hebrew, Arabic or another RTL script lays out right-to-left (body, title, tab, breadcrumb, sidebar row). Direction is read from the text; nothing to set. **Words** are counted by starting script, a tie going to RTL. A doc has one direction; a title declares its own.

## Projects: made in the workspace menu, narrowed to in a feature

Click the workspace mark at the top of the rail, on any tab:

- **New project…**: choose a folder; the name comes from it.
- **Manage projects…**: the workspace's projects by group. Rename, **Open project doc** (where its agent is set), **Move to Trash**.

⌘K and the foot of every project picker's list offer both.

In Projects, Automations, Activity, Artifacts and Memory a **project picker** under the side panel's title narrows the feature to one project. It reads **All projects** at rest; a picked project shows its name with **×** to go back. Each feature keeps its own choice and opens on **All projects** (Memory remembers yours). Home and Toolkit keep their own controls. Sessions covers the whole computer and picks a workspace first ([Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md#narrowing-to-a-workspace-or-a-project)).

## A group's or project's doc

These open on a doc that holds others rather than text: name, one-line description, and tabs with counts. A project's line under its name also has **Code**, opening its files in the side panel ([Files and Changes](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/code.md)).

| Doc | Tabs |
| --- | --- |
| Group | **Projects** · Docs · Sessions · Memory |
| Project | **Docs** · Sessions · Memory · Projects (only when another project was moved under it) |

- **First tab** is what the doc holds and opens first. Empty tabs are omitted except the first. The picked tab is kept per doc kind while the app is open.
- **A project's Docs and Sessions hold everything written in it.** Docs lists the same docs and type folders as the tree, same count (Notes included), filterable by folder, status and title. Sessions lists all its sessions newest first, each with its git branch in grey; with two or more branches a select above shows one branch's. There is no Branches tab: git owns branches, and a branch is only a label on a doc or session.
- **A group's tabs list one level down**: its Docs are those directly in the group, not its projects'. Same for Sessions and Memory. Decisions are not in Docs.
- **Description**: click, write one line, Enter or click away; Escape restores. A group or project has no other doc text (text from an older version is kept in the store, not shown).
- **Memory** lists up to 20 memories saved to that doc, most used first, with a link to all in Memory.
- **Accounts line** (group or standalone project): above the tabs, how many captured sessions ran under the accounts it assigns ([Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/cli-profiles.md#how-you-know-its-working)).

Every other doc (plan, design, plain) keeps the editor.

## Markdown in, Markdown out

Pasted Markdown becomes real blocks; blocks render back to Markdown for agents and MCP tools (`blocksToMarkdown`, `markdownToBlocks`, `parseBlocks` in `@slate/shared`).

## More on docs

- [The doc tree](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/tree.md): Overview, Docs, Trash, ordering, nesting, Settings.
- [Files and Changes](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/code.md): Code view of a project.
- [Typed Docs & Hierarchy](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md): `doc_type` templates and group → project nesting.
- [Legacy work docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/missions.md): the legacy work container and branch progress.

Which workspace holds a doc decides whether it is shared. Its ⋯ menu moves it, with everything nested under it, into another workspace (a real move between two SQLite files): [Working in a Shared Workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md).

See also: [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md), [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).
