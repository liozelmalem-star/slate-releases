# Import

Slate can bring in what you already have, so Memory, Docs and Projects do not start empty.

## The Import tab

**Connect › Import** groups its sources by where they land in Slate: **Memory**, **Docs**, **Projects** and **Chats**. Each group shows its sources as tiles with their logos, and says how many were found. A tile shows one short line: what was found, where it is read from, or how it stands.

Each group has one button, for the tile picked in it. A group picks its first source found, or else the first it can read. Click another tile to pick it.

| A tile says | Meaning | The group's button |
|---|---|---|
| A count, such as *478 memories* | Found on this Mac | **Preview** the source |
| *From a folder*, *From its export (.zip)*… | Read from a file or folder you pick | **Import from** the source |
| *Already in Slate* | Everything it holds was imported already | None |
| *Nothing to bring in* | It is here and holds nothing to import | None |
| *Not on this Mac* | Slate can read it, and it is not here. The tile is drawn quieter | None |
| *Soon* | Slate cannot read it yet. The tile is drawn quieter | None |

## The sources

| Group | Source | What comes in | Where Slate reads it |
|---|---|---|---|
| Memory | **Claude Code memory** | Each memory file Claude Code saved, in its project | `~/.claude/projects/*/memory/*.md`, and the same under every account folder you set up |
| Memory | **Codex memory** | Each note Codex saved, as global memory | `~/.codex/memories/*.md` |
| Memory | **Gemini memory** | Each memory Gemini CLI saved, as global memory | The *Gemini Added Memories* section of `~/.gemini/GEMINI.md` |
| Memory | **claude-mem** | Session summaries, and observations long enough to act on | `~/.claude-mem/claude-mem.db`, read-only |
| Memory | **agentmemory** | Its memories and session summaries | A JSON export you make with its `memory_export` command |
| Memory | **Basic Memory** | Each note, as global memory | `~/basic-memory`, or the folders its `config.json` lists |
| Memory | **Cline Memory Bank** | Each Memory Bank file, in its project | `memory-bank/*.md` in each project of the workspace |
| Memory | **mem0 / OpenMemory**, **Cursor memories** | Soon | |
| Docs | **Markdown folder**, **Obsidian vault** | Every markdown file, as docs | A folder you pick |
| Docs | **Notion** | Each of its docs, and each database as a table | Its *Markdown & CSV* export (.zip) |
| Docs | **Google Docs** | Each document's text and headings | A Google Takeout folder, or `.docx` files |
| Docs | **Excel and CSV files** | Each sheet as a table | `.xlsx` or `.csv` files |
| Projects | **VS Code**, **Cursor**, **Windsurf** | Git folders you opened lately that are not a project yet | Each editor's recent list |
| Projects | **WebStorm**, **IntelliJ IDEA**, **PyCharm**, **GoLand**, **Rider**, **CLion**, **PhpStorm**, **RubyMine**, **RustRover**, **DataGrip** | The same, one tile per JetBrains IDE found. With none here, one **JetBrains IDEs** tile | Each IDE's `recentProjects.xml` |
| Projects | **Zed** | Soon | |
| Chats | **ChatGPT**, **Claude.ai** | Each past chat as a doc | Your data export (.zip) |

Docs and chats go into a project you pick in the dialog. Importing the same export twice makes its docs twice, as dropping the same folder twice does. Google Docs are read from Takeout because Slate's Google sign-in does not read your Drive.

A project's own rules, skills and MCP servers are not imported here: open the project's [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) and use its offer to bring them into `.slate/`.

## How an import runs

1. **Preview** opens what an import would do. Nothing is written yet.
2. **Import** brings it in. While it runs, the button shows that it is working.
3. A line says what came in: *Imported 1,460 memories. 13 wait under Needs review.* When some wait, **Open Needs review** takes you to [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md#needs-review).

**Setup** offers the memory sources it found at the end of its **Project** step, as a short list. One line names it, such as *Found on this Mac: 1,200 observations in claude-mem, 4 projects in Cursor.* Each memory tool found has a row there. Add your projects first, so each memory goes to its project. Projects from your editors are already in the step's own folder list. The step can be skipped like every other.

The rules below hold for every import.

## Nothing is read until you choose

Slate first looks only for whether each tool is on your Mac and how much it holds. To say *Already in Slate*, it counts what earlier imports put in Slate's own store. It reads what a source holds only after you pick it. Then it shows what the import would do before it writes anything: how many memories are new, how many wait for review, how many are already here, and which project each goes to.

Slate never writes into another tool's files, and never moves or removes them.

## Where imported memories go

- **To their project.** A memory goes to the project whose folder it was learned in. When the source kept no folder, it goes to the project with the name the source kept.
- **Otherwise to global memory.** A memory outside every project is global. Slate makes no project for it.
- **Duplicates wait under Needs review.** A memory that says the same as one you already have, or nearly the same, waits under **Needs review** in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md#needs-review), beside the memory it repeats. Agents are not given it until you choose.

Each imported memory ends with a line saying where it came from: the source, its id there and the file. Imported memories count as less sure than ones your sessions save, so a memory you already have wins a disagreement.

## Importing again

Importing the same source again adds only what is new since the last time. A memory you retired after an import stays retired.

## agentmemory needs an export

agentmemory keeps its memory in its own engine's format, which Slate cannot read. Export it with agentmemory's `memory_export` command, then pick the file.

## Projects from an editor

An editor's **Preview** lists the folders that editor opened, with a box to tick. Slate lists the folders it opened lately that are still on your Mac, are git projects, and are not a project in Slate yet, in any workspace. Folders you removed from Slate are not listed. Nothing becomes a project until you pick it. Adding one works the same as adding a folder anywhere else in Slate.
