# Toolkit

**Toolkit** shows everything your agents read in a project: skills, commands, subagents, rules, instructions, MCP servers, hooks, plugins, output styles and config files. Each agent keeps these in its own folders and formats. Toolkit puts them on one screen, says which agents read each one, and suggests what to fix.

## Pick what to look at

The picker at the top of the side panel offers:

- **All projects**: Toolkit's **Overview**. A card for **User** and for every project, with what its agents read and how many [suggestions](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/suggestions.md) wait there. A card opens that project.
- **User** `~`: what your agents keep in your home folder and load in every project ([User](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/edit-and-remove.md#user)).
- **Each project with a folder**: a project by its name, a group's projects under the group's name.

## The tabs

A project opens on **Suggestions** while some wait, and on **Skills** otherwise. Each tab shows its count, and an empty one keeps a **New …** button.

| Tab | Loaded when |
| --- | --- |
| **Suggestions** | Changes to your AI setup, from what your sessions did ([Suggestions](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/suggestions.md)) |
| **Skills** | The task matches what the skill says it is for |
| **Commands** | You type `/name` in a session |
| **Subagents** | A session hands work to one |
| **Rules** | The file an agent works on matches the rule |
| **Instructions** | The start of every session, always |
| **MCP servers** | One row per server, across your agents |
| **Hooks** | Your agents run them on an event |
| **Plugins** | The project turns them on |
| **Output styles** | They set how Claude Code answers |
| **Config files** | Each agent's own config file |

Slate reads each agent's own folders in the project, sub-packages included, so a skill in `.claude/skills` and one in `.agents/skills` show on one list.

## Suggestions

**Suggestions** lists changes to the project's AI setup, worst first, each with one button: a server that keeps failing, a skill one of your agents cannot see, one nobody runs. Nothing changes until you click. The rail shows how many wait. See [Suggestions](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/suggestions.md).

## Read a row

- **Agent marks**: each agent that reads the item, in the same order on every row. An agent this workspace is not connected to is greyed and says **not connected in this workspace**. **No agent reads it** shows when none does.
- **this computer only**: a personal file, such as `settings.local.json`.
- **Usage**: how often the item ran in the last 30 days, such as **ran 4×** ([Usage, changes and sync](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/usage-and-sync.md)).
- **A broken file**: a config file that does not parse is listed with the reason and what its agent does, such as "Gemini refuses to start in this project."

Click a row to open its file ([Editing and removing](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/edit-and-remove.md)). Press **+** in the side panel to add one ([Adding items](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/adding.md)).

## Write once with `.slate/`

A project can keep its skills and instructions once, in `.slate/`, and let Slate publish them to every agent you pick:

- `AGENTS.md` holds the instructions every agent reads. `CLAUDE.md` becomes a link to it.
- `.slate/skills/` holds one folder per skill. Slate links each agent's skills folder to it.
- `.slate/config.toml` lists the agents and the MCP servers to publish.

Slate writes each agent's files in its own shape, such as `.claude/skills/` and `.mcp.json` for Claude Code, or `.cursor/rules/slate.mdc` for Cursor, and lists them in a Slate block of `.gitignore`. A generated file opens read-only: edit `.slate/` instead. Its first comment says to change it in Toolkit, then press **Sync now**. The **sync pill** in the toolbar says whether every agent matches ([Usage, changes and sync](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/usage-and-sync.md#the-sync-pill)).

Slate never writes through a link that leads out of the project, and never replaces a real file where a link should go. It skips that file, names it, and still writes the rest.

When `.slate/` lists MCP servers, **Sync now** also writes them into the Claude Desktop config and `~/.cursor/mcp.json`, which every project shares. Taking a server out of `.slate/` removes it from every file on the next sync, unless you changed that entry yourself.

A project without `.slate/` offers **Start using .slate** ([Start using .slate](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/start-using-slate.md)).

Edits made in Toolkit are committed in **Projects → Code → Changes**. The accounts your agents run under are set in Connect ([Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/project-environments.md)).
