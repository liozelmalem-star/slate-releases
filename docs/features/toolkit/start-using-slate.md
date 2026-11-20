# Start using .slate

A project without `.slate/` offers **Start using .slate** at the top of its [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md) tab: "Write each skill once, for every agent." With `.slate/`, each skill is kept once and published to every agent you pick.

Press it, and Slate first says what it will do:

- create `.slate/config.toml`, listing the agents and every skill;
- move each skill from the agents' own folders, such as `.claude/skills` and `.agents/skills`, into `.slate/skills/`, and link each agent's folder back to it. Where two agents keep different copies, you pick which one stays;
- make the instructions one file:
  - with neither file, it creates `AGENTS.md`, the instructions every agent reads;
  - with `AGENTS.md` and a `CLAUDE.md` of its own, it adds `CLAUDE.md`'s text to the end of `AGENTS.md` and makes `CLAUDE.md` a link to it;
  - with only `CLAUDE.md`, that stays the real file and `AGENTS.md` becomes the link;
- leave each MCP server where it is, in its agent's own file.

Under **Publish to**, pick the agents.

## What it protects

- **Nothing is committed.** **Projects → Code → Changes** shows every file, and **Discard** brings any of them back.
- **A copy before removing.** Before it removes a skill folder or a `CLAUDE.md` that git does not track, Slate copies it to `slate-adopt/` in the project's git folder. That copy is never committed.
- **Nothing outside the project.** A link inside a skill folder is skipped and listed, never followed, so a file such as a key in `~/.ssh` is never copied in. A skill whose folder is outside the project is not moved, and a `.slate` that is a link is refused.
- **Links become files first.** An `AGENTS.md` that is a link becomes a real file with the same text.
