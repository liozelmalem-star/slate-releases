# Import

Slate can bring in what you already have, so Projects, Memory and Artifacts do not start empty. Each brings in its own: the **Import** button (a down arrow) sits in the header of each, before the **+**.

- **Projects › Import** has two tabs, like Projects itself: **Docs** brings in the docs you keep in other apps, as docs in a project; **Code** brings in the folders your editors opened, as projects. It opens on the tab Projects is showing.
- **Memory › Import** brings in what other tools remember, as memories.
- **Artifacts › Import** brings in HTML files and decks you made elsewhere, as artifacts.

Past chats from ChatGPT or Claude.ai are not imported: those apps keep their own memory, and Slate's comes from your coding sessions.

## The Import dialog

The dialog shows one tile per source, with its logo. A tile shows one short line: what was found, or how it stands. The button under the tiles is for the tile picked. The dialog picks the first source found; click another tile to pick it.

| A tile says | Meaning | The button |
|---|---|---|
| A count, such as *4 projects* | Found on this Mac | **Preview** what it would add |
| *Already in Slate* | Everything it holds is in Slate already | None |
| *Not on this Mac* | Slate can read it, and it is not here. The tile is drawn quieter | None |
| *Soon* | Slate cannot read it yet. The tile is drawn quieter | None |

## The editors

| Editor | Where Slate reads it |
|---|---|
| **VS Code**, **Cursor**, **Windsurf** | Each editor's list of folders you opened lately |
| **WebStorm**, **IntelliJ IDEA**, **PyCharm**, **GoLand**, **Rider**, **CLion**, **PhpStorm**, **RubyMine**, **RustRover**, **DataGrip** | Each IDE's `recentProjects.xml`, one tile per JetBrains IDE found. With none here, one **JetBrains IDEs** tile |
| **Zed** | Soon |

## Docs from other apps

On the **Docs** tab, each source asks for its folder or file, says how many docs it would make, and asks which project they go into. The files are never changed.

| Source | What you pick |
|---|---|
| **Markdown folder** | A folder of `.md` files; its folders become folders |
| **Obsidian** | A vault's folder |
| **Notion** | Its export: **Settings › Export**, Markdown & CSV (a `.zip`) |
| **Google Docs** | A Google Takeout Drive folder, or `.docx` files |
| **Excel and CSV files** | `.xlsx` or `.csv` files; each sheet becomes a table in a doc |

An export imported into a project once adds nothing the second time.

## Artifacts from elsewhere

| Source | How |
|---|---|
| **HTML files** | Pick a folder. Each `.html` file becomes an artifact: one whose body is a deck of slides (one `<section>` per slide) becomes **Slides**, any other an HTML page. Each keeps its file's date. A file already in Slate, same title and content, is left out |
| **claude.ai** | Slate cannot reach claude.ai itself. The dialog gives a prompt to copy into your agent (Claude Code), which lists your claude.ai artifacts, reads each (a deck from its slide files), and publishes it into Slate with its real date |

A project's own rules, skills and MCP servers are not imported here: open the project's [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) and use its offer to bring them into `.slate/`.

## Projects from an editor

An editor's **Preview** lists the folders that editor opened, with a box to tick. Slate lists the folders it opened lately that are still on your Mac, are git projects, and are not a project in Slate yet, in any workspace. Folders you removed from Slate are not listed. Nothing becomes a project until you pick it. Adding one works the same as adding a folder anywhere else in Slate.

**Setup**'s **Project** step lists the same folders in its own folder list.

## Memory from other tools

| Tool | What Slate reads |
|---|---|
| **Claude Code** | Its memory files, one per memory. Most are in Slate already: Slate reads them on its own for every project you add ([Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md)) |
| **Codex** | Its memory notes |
| **Gemini CLI** | The memories saved in its `GEMINI.md` |
| **claude-mem** | Its observations and session summaries, read-only |
| **agentmemory** | An export file you pick (make one with its `memory_export` command) |
| **Basic Memory**, **Cline Memory Bank** | Their markdown notes |
| **mem0** | A JSON file of your memories you pick: download it from mem0's dashboard (**Memory Exports**). Its memories have no folder, so they go where the dialog says |

**Where memories go.** At the top of the dialog, **Memories with no folder go to** picks a project, or this workspace's global memory. It starts on the project Memory shows.

- A memory kept in a project's folder goes to that project.
- A memory from a folder that is not a project in this workspace is **left out**. Add the project, then import again.
- A memory with no folder goes where the dialog says.

**Preview** counts each kind before anything is written: new, needs review (it says the same as a memory you have), already here, already read by Slate, and left out. Imported memories start less sure than a session's own, so a memory you wrote wins a disagreement.

## Nothing is read until you choose

Slate first looks only for whether each source is on your Mac and how much it holds. It reads a source only after you pick it, and shows what it would add before anything is added. Slate never writes into another tool's files.
