# Adding items in Toolkit

**+** in [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) opens a form for the open kind (**New skill** on Skills). Where an item can go to several places, cards show each place with the tools that read it; tick any number.

A line under the cards names every tool that will read it.

**New skill** also opens from a kind of work in Tasks' **Workflow** ([Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md#workflow)) and an automation's **Follows** ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#what-it-follows)), with name and description filled in. **Create** writes the skill, binds it to what asked, and goes back. **Cancel** writes nothing.

## Skill

Name, what it does, and where: `.slate/skills` (when the project has one: every tool, with a group and a blank doc or a copy of a skill), `.claude/skills`, `.agents/skills`. Ticking `.slate/skills` greys out the others, since `.slate/` publishes into them. In tool folders it is written once and the others link to it.

**Who starts it:** you or the AI (default), only you, or only the AI. Claude Code reads that as `disable-model-invocation: true` (only you) or `user-invocable: false` (only the AI). Other tools let both start it.

## Command, subagent, rule, output style

Each takes a name, a few fields and the tools' folders, written in each tool's shape. A **Writes** box shows each file's header before **Create**.

* **Rule:** when it applies (**Always**, **When files match** with comma-separated patterns such as `packages/server/**`, **When relevant**, **Only when mentioned**) and a description. These are Cursor's four types (`alwaysApply`, `globs`, `description` in `.mdc`). Claude Code reads only always or by files, as `paths:` in `.claude/rules/<name>.md`, so the last two choices drop `.claude/rules`. A Codex rule is a command policy: the command's first words, the decision (**Allow**, **Ask first**, **Forbid**) and why.
* **Subagent:** when to hand work to it, model (**Same as the session**, **Fast**, **Strongest**) and tools (**All**, **Read only**, or picked from read, search, edit, run commands, web):

  | Tool | Written as |
  |---|---|
  | Claude Code | `model: inherit \| haiku \| opus`, `tools:` |
  | Cursor | `model: fast`, `readonly: true` |
  | Gemini CLI | `model: flash \| pro` |
  | Codex | `model_reasoning_effort`, `sandbox_mode = "read-only"`; file `.codex/agents/<name>.toml` plus an `[agents.<name>]` table (the description) in `.codex/config.toml` |
  | OpenCode | `mode: subagent`, a `tools:` map; keeps the session's model |
* **Command:** a description and, for Claude Code only, an argument hint. Gemini's is TOML (`description`, `prompt`); Cursor's a plain file.
* **Output style:** a description and **Keep coding instructions** (on: adds to Claude Code's coding instructions; off: replaces them).

## Instructions, MCP server, hook, plugin

* **Instructions:** the instructions files the project lacks.
* **MCP server:** name, command or URL, optional `NAME=value` variables, and tools to add it to, each in its format: OpenCode's command is one list and variables are `environment`; Gemini spells HTTP `httpUrl`; Codex uses a `[mcp_servers.<name>]` table. Each ticked tool shows its file. Variables are plain text in root files often committed, so keep real keys out of shared projects.
* **Hook:** tool (Claude Code, Cursor, Gemini CLI), an event from its list, optional matcher such as `Bash|Edit`, command, timeout (seconds for Claude Code and Cursor, milliseconds for Gemini). A Claude Code hook can go in `settings.local.json` to stay on this computer. Codex hooks are not editable yet.
* **Plugin:** name and tools to enable it for: Claude Code `enabledPlugins`, Codex `[plugins."<name>"]`, OpenCode `plugin` list. Installing stays the tool's own command.
