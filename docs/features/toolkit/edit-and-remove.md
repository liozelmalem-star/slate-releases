# Edit and remove

Part of [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md). Click a row to open its file.

## Edit a file

A markdown file opens drawn: its header fields on top, its text below, with a **Preview** / **Markdown** switch. A rule, subagent, command or output style shows the same fields as its New form.

- A choice saves at once. Text saves when you stop typing, on ⌘S, or when you quit. A failed save says **Not saved** with the reason.
- Only the keys a field writes change. Other keys, comments and their order stay.
- A header that does not parse hides the fields until you fix it in the text.
- A config file that would no longer parse for its agent is not saved.
- A file Slate generates from `.slate/` opens **Read-only**: edit `.slate/` instead.
- A file that is a link out of the project is neither shown nor saved.

## A `.slate/` skill

A `.slate/` skill opens with its name, the agents that read it, and a **More** (⋯) menu: **Rename…**, **Duplicate…**, **Copy to project…**, **History** (restore the file from any commit) and **Remove…**. A skill can hold more than one file; **Add a file** adds one.

The agents control says **Published to 3 of 5**. It opens **Choose the agents that read this**: **All installed agents**, then **Installed** and a folded **Not installed** group, with a search box. An agent with no skills folder is greyed and says so. A new skill goes to every installed agent.

When two agents keep different files under one skill name, the row says **2 copies**. Open it to compare them, then press **Use this copy for all agents**.

## Remove an item

The trash button asks first: **Remove {name}?**, with **Keep it** or **Remove {name}**, and names the files and agents it reaches.

| Kind | Removing it |
| --- | --- |
| Skill | Removes it from every agent folder that keeps it, links included. A `.slate/` skill can be brought back with **Discard** in **Projects → Code → Changes** until you commit |
| Subagent, rule, output style, command | Removes its file |
| MCP server | Removes its entry from every agent's file; the files stay |
| Hook | Removes every hook with that name; the file stays |
| Plugin | Turns it off |
| Instructions, Config files | Never removed here |

## An MCP server's dialog

An **MCP servers** row opens a dialog that lists every agent with the server, with **Remove from {agent}**, and every connected agent without it, with **Add to {agent}**. It also says when a server will not load yet: Claude Code waits for your approval, and Codex reads it only in a project it trusts. Slate never approves a server for you. When the other agent has no place for a setting, the copy says which ones it left out. Environment variables and headers never show on screen.

## User

**User** `~` lists what your agents keep in your home folder and load in every project, on the same tabs.

- Chips at the top of each tab pick one profile, such as `~/.codex`, or one plugin, with its count.
- **New skill** goes into the skills folder of the Claude Code profile this workspace uses, into `~/.agents/skills` (read by Codex, Gemini, OpenCode and Cursor), or both.
- **+** adds to the picked profile on every tab where its agent keeps that kind.
- Removing an item says that every project on this computer stops seeing it. A removed file goes to the Trash.
- A skill or command that a plugin supplies has no trash button: remove the plugin.

Toolkit reads only the profiles the workspace uses, or every profile on this computer when it names none. Claude Code's own user MCP servers live in a file that also holds its sign-in, so Toolkit never opens it; add them with `claude mcp add --scope user`.
