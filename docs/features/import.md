# Import

Slate can bring in the projects you already work in, so Projects does not start empty.

Your agents' memory needs no import: Slate reads Claude Code's and Gemini CLI's own memory files on its own for every project you add, and keeps them up to date (see [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md)). Importing notes, docs and past chats from other apps is not offered yet.

## The Import tab

**Connect › Import** shows one tile per editor, with its logo. A tile shows one short line: what was found, or how it stands. The button under the tiles is for the tile picked. Import picks the first editor found; click another tile to pick it.

| A tile says | Meaning | The button |
|---|---|---|
| A count, such as *4 projects* | Found on this Mac | **Preview** the editor's folders |
| *Already in Slate* | Every folder it lists is a project already | None |
| *Not on this Mac* | Slate can read it, and it is not here. The tile is drawn quieter | None |
| *Soon* | Slate cannot read it yet. The tile is drawn quieter | None |

## The editors

| Editor | Where Slate reads it |
|---|---|
| **VS Code**, **Cursor**, **Windsurf** | Each editor's list of folders you opened lately |
| **WebStorm**, **IntelliJ IDEA**, **PyCharm**, **GoLand**, **Rider**, **CLion**, **PhpStorm**, **RubyMine**, **RustRover**, **DataGrip** | Each IDE's `recentProjects.xml`, one tile per JetBrains IDE found. With none here, one **JetBrains IDEs** tile |
| **Zed** | Soon |

A project's own rules, skills and MCP servers are not imported here: open the project's [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) and use its offer to bring them into `.slate/`.

## Projects from an editor

An editor's **Preview** lists the folders that editor opened, with a box to tick. Slate lists the folders it opened lately that are still on your Mac, are git projects, and are not a project in Slate yet, in any workspace. Folders you removed from Slate are not listed. Nothing becomes a project until you pick it. Adding one works the same as adding a folder anywhere else in Slate.

**Setup**'s **Project** step lists the same folders in its own folder list.

## Nothing is read until you choose

Slate first looks only for whether each editor is on your Mac and how many folders it lists. It reads the list only after you pick the editor, and shows it before anything is added. Slate never writes into an editor's files.
