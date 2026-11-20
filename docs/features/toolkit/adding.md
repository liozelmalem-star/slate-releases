# Adding items in Toolkit

Press **+** in the [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md) side panel to add an item. On a tab it opens that kind's form, such as **New skill** on **Skills**. From **All projects**, it first asks where the item goes: **User** or one project.

Where an item can live in several places, the form shows a card for each place with the agents that read it. Tick one or more. A line under the cards names every agent that will read it. **Create** writes the files; **Cancel** writes nothing.

## Skill

Give it a name (lower case letters, digits and dashes, such as `review-pr`), what it does and when an agent should use it, and where it goes.

- With `.slate/` in the project, **Every agent: written once, published to each** puts it in `.slate/skills/`, with a group and a blank file or a copy of another skill to start from. The other places are then already covered.
- Without `.slate/`, pick the agents' folders, such as `.claude/skills` or `.agents/skills`. The skill is written once and the other folders link to it.

**Who starts it**: **You or the AI**, **Only you** or **Only the AI**. Claude Code reads this; the other agents let both start a skill.

## Command, subagent, rule, output style

Each takes a name, a few fields, and the agents' folders. The **Writes** box shows each file's header in its agent's own format before you press **Create**.

- **Command**: a description, and an **Argument hint** for Claude Code.
- **Subagent**: **When to hand work to it**, a **Model** (**Same as the session**, **Fast** or **Strongest**), and **Tools it can use** (**All**, **Read only**, or picked from **Read files**, **Search**, **Edit files**, **Run commands** and **Web**). Each agent gets its own model name, such as Claude Code's haiku or opus. OpenCode keeps the session's model.
- **Rule**: **When it applies**: **Always**, **When files match** (patterns such as `packages/server/**`), **When relevant** or **Only when mentioned**. Claude Code reads a rule only always or by files, so the last two leave it out. A Codex rule is a command policy: its first words, a **Decision** (**Allow**, **Ask first** or **Forbid**) and **Why**.
- **Output style**: a description and **Keep coding instructions**. On, the style adds to Claude Code's coding instructions; off, it replaces them.

## Instructions, MCP server, hook, plugin

- **Instructions**: the instructions files the project does not have yet.
- **MCP server**: a name, a **Command or URL**, environment variables (one `NAME=value` a line), and the agents to **Add it to**. Each ticked agent shows the file it goes in. The variables are stored as plain text in files at the project's root, which are often committed, so keep real keys out of them.
- **Hook**: the **Agent** (Claude Code, Gemini, Cursor or Qwen Code), an **Event**, an optional **Matcher** such as `Bash|Edit`, the **Command**, and a timeout (seconds or milliseconds, as the agent counts). A Claude Code hook can stay **Only on this computer**.
- **Plugin**: its name as the agent names it (`name@marketplace` for Claude Code and Codex, an npm name for OpenCode), and the agents to **Turn it on for**. Installing it stays the agent's own command.
