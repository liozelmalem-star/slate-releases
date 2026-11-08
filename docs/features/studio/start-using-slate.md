# Start using .slate

A project without `.slate/` shows **Start using .slate** at the top of its Toolkit tab. Each skill is kept once in `.slate/skills/` and published to the tools you pick. Part of [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md).

It says first what it will do:

* create `.slate/config.toml` listing the tools and every skill;
* move each skill from `.claude/skills`, `.agents/skills` and other tools' folders into `.slate/skills/` (you pick which copy stays where two differ); `studio sync` links each folder back;
* make the instructions one file:
  * neither file exists: creates `AGENTS.md`;
  * `AGENTS.md` and a `CLAUDE.md` with its own text: that text is appended to `AGENTS.md` under **From CLAUDE.md**, and `CLAUDE.md` becomes a link;
  * only `CLAUDE.md`: it stays the real file and sync makes `AGENTS.md` the link;
* leave MCP servers in each tool's file (a server listed in `.slate/` is also written to the machine-wide Claude Desktop and Cursor configs on every sync).

## What it protects

* A skill folder that links elsewhere in the project is copied; its target is untouched. A link inside a skill folder is never followed: it is skipped and listed, so a file outside the project (a key in `~/.ssh`, say) is never copied in. A skill whose folder is really outside the project is not moved at all, and a `.slate` that is a link is refused. Same for a tool's whole skills folder linked to a shared folder outside the project.
* An `AGENTS.md` that is a link (often to `CLAUDE.md`) first becomes a real file with the same text.
* Nothing is committed: **Projects → Code → Changes** shows every file; discarding one restores it.
* Before removing an untracked skill folder or `CLAUDE.md`, Slate copies it to `slate-adopt/` in the project's git folder (never committed, kept after you commit).
