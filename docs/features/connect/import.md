# Import

Import brings in what you already have, so Projects, Memory and Artifacts do not start empty. Each has an **Import** button (a down arrow) in its header, before the **+**:

- **Projects › Import** has two tabs. **Docs** brings in docs you keep in other apps, as docs in a project. **Code** brings in the folders your editors opened, as projects.
- **Memory › Import** brings in what other tools remember, as memories.
- **Artifacts › Import** brings in HTML pages and decks you made elsewhere.

Slate reads a source only after you pick it, shows what it would add before adding anything, and never changes the other tool's files. Past chats from ChatGPT or claude.ai are not imported.

## The dialog

The dialog shows one tile per source, each with one short line: what Slate found, **Already in Slate**, **Not on this Mac**, or that Slate cannot read it yet. Pick a tile, then press **Preview** or **Pick folder** / **Pick file** under the tiles.

## Projects from your editors

| Editor | What Slate reads |
| --- | --- |
| **VS Code**, **Cursor**, **Windsurf** | The folders the editor opened lately |
| **WebStorm**, **IntelliJ IDEA**, **PyCharm**, **GoLand**, **Rider**, **CLion**, **PhpStorm**, **RubyMine**, **RustRover**, **DataGrip** | Each JetBrains IDE's recent projects |
| **Zed** | Not yet |

**Preview** lists the folders that are still on your computer, are git projects, and are not in Slate yet. Tick the ones you want and press **Add 3 as projects**.

## Docs from other apps

Each source asks for its folder or file and the project the docs go **Into**:

| Source | What you pick |
| --- | --- |
| **Markdown folder** | A folder of `.md` files; its folders stay folders |
| **Obsidian** | A vault's folder |
| **Notion** | Its export (Settings › Export, Markdown & CSV, a `.zip`) |
| **Google Docs** | A Google Takeout Drive folder, or `.docx` files |
| **Excel and CSV files** | `.xlsx` or `.csv` files; each sheet becomes a table in a doc |

Importing the same export into the same project again adds nothing.

## Memories from other tools

| Tool | What Slate reads |
| --- | --- |
| **Claude Code memory** | Its memory files. Most are in Slate already, because Slate reads them on its own |
| **Codex memory** | Its memory notes |
| **Gemini memory** | The memories saved in its `GEMINI.md` |
| **claude-mem** | Its observations and session summaries |
| **agentmemory** | An export file you make with its `memory_export` command |
| **Basic Memory**, **Cline Memory Bank** | Their markdown notes |
| **mem0** | A JSON file you download from mem0's dashboard (Memory Exports) |

**Memories with no folder go to** picks a project, or **Global memory**. A memory kept in a project's folder goes to that project; one from a folder that is not a project in this workspace is left out. **Preview** counts what is new, what waits for review because it repeats a memory you have, and what is left out, before anything is written. Imported memories start less sure than your own.

## Artifacts from elsewhere

- **HTML files**: pick a folder. Each `.html` file becomes an artifact, Slides when its body is a deck, an HTML page otherwise, with the file's date. A file already in Slate is left out.
- **claude.ai**: Slate cannot reach claude.ai itself. **Copy prompt** and paste it into Claude Code, which brings each artifact in with its real date.

A project's rules, skills and MCP servers are not imported here: open the project in [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md) and use **Start using .slate**.
