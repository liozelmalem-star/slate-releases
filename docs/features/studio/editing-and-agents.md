# Editing, removing and Your agents

Part of [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md). A row opens its file on its own tab.

## Contents

- [Editing](#editing)
- [A `.slate/` skill](#a-slate-skill)
- [Removing](#removing)
- [Your agents](#your-agents)

## Editing

Markdown opens drawn: header fields on top, text below, a **Preview / Markdown** switch. A rule, subagent, command or output style shows the New form's fields above its text.

* A choice saves at once; text saves when you stop typing or leave the box; the rules file on leaving the box, ⌘S, closing the editor or quitting. A save that fails as the editor closes says so in a message.
* Only the keys a field writes change; other keys, comments and order stay. A model the three choices do not name (`sonnet`) stays until you pick one.
* A header that does not parse hides the fields until fixed in the text. A config that would no longer parse is not saved, parsed as its tool does: Gemini's `settings.json` and OpenCode's `opencode.json` may carry comments; Claude Code's and Cursor's JSON may not.
* With `.slate/`, editing the rules file syncs every tool.
* A rules or skill file that is a link to somewhere outside the project (or sits in a linked folder that leads outside) is neither shown nor saved; a message names the file. A link that stays inside the project, such as `CLAUDE.md` to `AGENTS.md`, works.
* A Config files row opens the file as on disk, so MCP variables show there; an MCP server's own row never shows them.

## A `.slate/` skill

It opens in a view that gives the editor the room. One row holds name, agents that read it, and a **⋯** menu: **Rename**, **Duplicate**, **Copy to project**, **History** (restore any commit; images and other binary files come back byte for byte, and a file over 16 MB is refused rather than cut), **Remove…** (the list's row menu offers the same). File name, **Preview** / **Markdown** and saved state share one row. A skill can hold more than one file.

The agents control shows marks, **N of M** and a chevron: N agents it is published to; M installed agents that can take it, plus any non-installed agent it reaches. It opens a checklist of the 16 supported agents: **Installed** first, a folded **Not installed** group, a search box, **All installed agents** on top. An agent that cannot take a skill is greyed with the reason.

A new skill goes to every installed agent. The choice is saved as the skill's `tools` in `.slate/config.toml`, omitted when equal to the project's own `tools`. A skill published to an agent outside that list still reaches it: sync, status and check cover every agent any skill names.

Two tools with different files under one skill name show **2 copies**. Open it to compare, then **Use this copy for all agents**.

## Removing

A trash icon titled **Remove <name>** asks first (**Remove <name>?**, **Keep it**, **Remove <name>**), naming files and tools reached.

| Kind | Removing it |
|---|---|
| Skill | From every tool folder that keeps it, with links. A `.slate/` skill also leaves `.slate/skills/`; discarding it in **Projects → Code → Changes** brings it back until you commit. |
| Subagent, rule, output style, command | Its file. A Codex subagent's `[agents.<name>]` table goes too. |
| MCP server | From every tool's file; the file stays. |
| Hook | All its commands; the file stays. |
| Plugin | Named in a config: turned off. A file in `.opencode/plugins`: no trash icon. |
| Instructions, Config files | Never removed here. |

A skill behind a tool folder linked to a shared folder elsewhere is not removed there; Slate names the folder.

An **MCP server** row lists each connected tool with **Remove from** (has it) or **Add to** (does not). It says when a server will not load yet: Claude Code waits for approval of a `.mcp.json` server; Codex reads `.codex/config.toml` only in a trusted project. Slate never approves a server. **Add to** keeps an SSE server SSE; Codex and Grok Build take only streamable HTTP, so an SSE server is refused there with the reason, and Suggestions never offers that copy. When the other tool has no place for a setting (`cwd`, `timeout`, a server turned off), the copy says which ones it left out. A JSON file with comments is never rewritten. Variables and headers never reach the screen. A **hook** row opens its commands, each with **Remove**. Remove checks that the command is still the one shown; if a tool or an editor changed the file since, nothing is removed and the list reloads.

## Your agents

What each agent keeps for every project, in its config folder and plugins, with the project tabs and counts. Home folders have no git and nothing to publish.

* **New skill** goes in the `skills` folder of the Claude Code account this workspace runs under (`~/.claude/skills` when it names no profile), `~/.agents/skills` (Codex, Gemini CLI, OpenCode, Cursor) or both (written once, the other folder links to it).
* Chips atop each tab pick one profile (`~/.claude-personal`, `~/.codex`) or plugin, with its count. A profile that could hold the kind has a chip even when empty.
* A row opens its file to read or edit; a config saves only if it still parses.
* **+** adds to the picked profile on every tab where its tool keeps that kind (a subagent in `~/.claude-alt/agents`, a hook in its settings file, an MCP server in `~/.codex/config.toml`). Output styles exist only in Claude Code profiles.
* A row's trash removes it from that profile after a note that every project here stops seeing it. Removed files go to the Trash. Plugin-supplied skills and commands have no trash: remove the plugin.

Only the profiles the workspace uses are read; with none named, every profile on this computer. Claude Code's user MCP servers live in `.claude.json` (it also holds sign-in data), so Toolkit never lists, opens or changes it. Add them with `claude mcp add --scope user`.
