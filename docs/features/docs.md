# Docs & the Block Editor

A doc is Slate's one unit: a note, design doc, project and captured AI session are all rows in one `doc` table, so nesting, reordering, icons and Trash work the same. Each has an id, `parent_id`, title, icon, fractional `position`, block content and metadata (`doc_type`, `status`, `archived`, timestamps).

**A quiet doc.** An open doc shows its title once, then the body: a body an agent opened with `# <title>` does not draw that heading (create_doc drops it from a new body; an older body keeps it stored, hidden). Under the title: what the doc links to (branch, PR, ticket), the one line its type keeps (a bug's severity and state, a review's verdict, a plan's steps done), and **Shared · <workspace>** in a shared workspace. Its type, its icon and **Private** are not repeated there: the tree and the breadcrumb name them, and a workspace is private unless it says otherwise.

**The open screen stays current.** When an agent writes over MCP (appends to the doc you read, renames, files a doc, saves a memory) the screen updates within seconds. If you are typing on that doc, your text is kept and a "changed elsewhere" notice offers **Copy my text**, **Keep my version** (asks once, then overwrites the newer one) and **Reload doc**.

**A save that fails says so.** Typing saves within half a second. If a save does not reach the store (Slate's server is down, or it refused the write), the header shows **Not saved** where it shows **Edited …**. Slate tries again on your next edit, every 5 seconds while the server answers, and at once when it comes back; the word goes when a save lands. A retry never overwrites a newer copy: if the doc changed meanwhile, you get the "changed elsewhere" notice instead. Unsaved edits live in the open window only, so they do not survive quitting Slate.

While the server is down, a red strip at the top reads **Slate isn't responding**. It says your work is safe only while no doc has unsaved edits; otherwise it says some edits are not saved yet. After a minute it says **Still trying. Restart Slate if this stays.** with **Open logs**.

## The block editor

[BlockNote](https://www.blocknotejs.org); content is stored as BlockNote JSON in `content`.

The editor is kept quiet: it offers the few things docs are written with, and the keyboard does the rest.

- **`/`** opens the slash menu with 14 items: Text, Heading 1–3, Bullet, Numbered and Check list, Quote, Code, Table, Image, **Callout**, **Check item** and **Link to doc**. The editor has no AI of its own (removed 2026-11-15); ask your agent in a session instead.
- **Selected text** gets four controls: Bold, Italic, Code and Link. Tab and Shift-Tab nest and unnest.
- **Nothing shows beside a block** or on a table's edges, and the body has no frame: a doc shows its text until you type or select. Code in a table stays on one line, and a wide table scrolls sideways.
- **An empty doc** shows one line, **Write here, or ask your agent to fill it.** The line is drawn by the editor, never stored in the doc.

Older block types stay readable. A doc that already holds a heading 4–6, a toggle heading or list, a divider, or a video, audio or file block still opens and draws it; the menus only stop offering them. A callout is a plain note; only the ⚠️ emoji draws it in the warning colour, and clicking the emoji cycles the ten offered. Markdown shortcuts (`#`, `-`, `[]`, ```` ``` ````) still turn a line into its block.

A **check item** is one line of a Review or a Test doc that carries a result: open (grey circle), pass (green tick), fail (red cross) or blocked (amber sign). Click the mark to step to the next result. The result is stored in the doc body with the block, so nothing else records it. A test case's steps, expected result and evidence go under the item (Tab nests them); a pasted screenshot is stored in the doc like any pasted image. In a doc you cannot edit, the mark only shows. `countCheckItems` in `@slate/shared` counts a body's items per result.

**Diagrams.** A code block in the `mermaid` language draws as the diagram it describes: a flowchart, a sequence, a state chart and the other kinds [Mermaid](https://mermaid.js.org) knows. Agents write one as a ```` ```mermaid ```` fence through `create_doc` or `append_to_doc`; in the editor, type ```` ```mermaid ```` and a space. The drawing uses the app's greys and follows the light or dark theme. The code button at its top right, on hover, shows the source to read or edit, and the drawing follows the edit once you stop typing. A source Mermaid cannot read stays as text, under one grey line: "This diagram did not draw. Its source is below." Mermaid loads only when a doc holds a diagram. A diagram is stored as the code block it is, so its Markdown is the fence it came from.

- **@** links a doc inline; **/Link to doc** opens the same list (loose matching, recent first, arrows and Enter).
- Move a block with ⌘⇧↑ and ⌘⇧↓, or cut and paste it. Select one and press Backspace to remove it.
- Pasted Markdown replaces a selection, fills an empty block, or splits a paragraph at the cursor.
- Right-click menus open with their corner at the pointer.

**Right-to-left.** A doc in Hebrew, Arabic or another RTL script lays out right-to-left (body, title, tab, breadcrumb, sidebar row). Direction is read from the text; nothing to set. **Words** are counted by starting script, a tie going to RTL. A doc has one direction; a title declares its own.

## Projects: made in the workspace menu, narrowed to in a feature

Click the workspace mark at the top of the rail, on any tab:

- **New project…**: choose a folder; the name comes from it.
- **Manage projects…**: the workspace's projects by group. Rename, **Show in Projects** (its folder in the tree), **Move to Trash**.

⌘K and the foot of every project picker's list offer both.

In Projects, Automations, Activity, Artifacts and Memory a **project picker** under the side panel's title narrows the feature to one project. It reads **All projects** at rest; a picked project shows its name with **×** to go back. Each feature keeps its own choice and opens on **All projects** (Memory remembers yours). Home always covers every project; Toolkit keeps its own control. Sessions covers the whole computer and picks a workspace first ([Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md#narrowing-to-a-workspace-or-a-project)).

## Groups and projects are folders

In Projects → Docs a group or a project is a folder, as a directory is in Code. Clicking its row opens or closes it; only a doc opens in the main area. With nothing open, the main area says **Open a doc from the list** (on Code, **Open a file from the list**). The welcome doc, which a new install opens on, is the one project that opens as a doc.

- **Its ⋯ menu** (or right-click) carries what its own screen used to: **Start session**, **Open a terminal here**, **Show code** (when it has a folder), **Link a folder** or **Change folder**, and **Settings…** on a group or a project on its own ([Settings](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/tree.md#settings)).
- **A link to it** (⌘K, an MCP `open` link, a tab saved by an older version) shows its folder in the tree, open, instead of a screen of its own. A tab saved on one is closed.
- Its sessions are in [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md), its memories in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md).

Changed 2026-11-15, when the owner said "everything got their tab, we dont need it here, its only docs": a group or project used to open its own screen with a description and Docs, Sessions and Memory tabs.

## Markdown in, Markdown out

Pasted Markdown becomes real blocks; blocks render back to Markdown for agents and MCP tools (`blocksToMarkdown`, `markdownToBlocks`, `parseBlocks` in `@slate/shared`).

A check item is a task line whose box holds the result: `- [pass] Sign in with Google`, or `[fail]`, `[blocked]`, `[open]` (any letter case when read, lower case when written). Lines indented under it are its children. `- [ ]` and `- [x]` stay to-dos.

## More on docs

- [The doc tree](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/tree.md): Docs, Trash, ordering, nesting, Settings.
- [Files and Changes](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/code.md): Code view of a project.
- [Typed Docs & Hierarchy](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md): `doc_type` and group → project nesting.
- [Legacy work docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/missions.md): the legacy work container and branch progress.

Which workspace holds a doc decides whether it is shared, and a doc stays in the workspace it was made in: nothing moves between workspaces. See [Working in a Shared Workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md).

See also: [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md), [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).
