# An agent's dialog

Click an agent's logo or name in [Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#agents) to open its dialog. It shows the MCP servers the agent reaches, the profile it runs under, its model, and at the bottom the config file Slate writes into.

## MCP servers

The list shows the servers the agent declares, read from the profile this workspace runs it under. An agent that is not turned on here says "Turn it on for this workspace to see the servers it reaches." With none, it says "Nothing besides Slate itself." and **Add an MCP server** opens Toolkit's form.

- A **gateway**, one server that carries many integrations, is one row. Its chevron shows what it carries.
- **Your Claude account**'s connectors are one row under Claude Code, the only agent that can use them.
- A server declared for every folder says **every workspace**.

| Server | How it stands |
| --- | --- |
| **Read by Slate** | **Live**, **Needs sign-in**, **Not turned on**, **Unavailable** or **Not read yet**, with **Turn on** and **Let an agent read it** |
| **Not read by Slate** | What the agent last said: **Connected in Claude Code**, **Needs sign-in in Claude Code** or **Claude Code could not connect**. When it said nothing yet: **Set up, not checked** |

**Sign in** uses the same sign-in as Tasks for a server Slate reads, and the agent's own login for the others. **Refresh** asks your agents again.

## Profile

A profile is one login of an agent on this computer: its config folder, with its sign-in, settings and history. Pick the **Profile** this workspace uses, or **Add** one with a name and a **Config folder**.

- The add form offers config folders it finds in your home folder, such as `~/.claude-work`, under **Found here**. **Choose folder…** picks any other. A folder that does not exist yet is fine: the agent creates it when you sign in.
- Pick the profile before you connect, because it decides where Slate is installed.
- **Its usual settings folder** is the agent's own default, such as `~/.claude` or `~/.codex`.
- Some agents, such as OpenCode, Antigravity, Auggie and Kilo Code, read a single configuration, so there is no profile to choose.

A config folder exists once on this computer, so every workspace that names it shares its sign-in ([Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/project-environments.md)).

## Model

The **Model** list shows once this workspace runs the agent. **Its usual model** lets the agent choose. **Make default** makes this the agent used when nothing more specific is named, and its row shows **default**. A group or a project on its own can choose differently.

## Capture

**Capture** turns recording of this agent's sessions on or off. Off, the agent stays connected and other agents are not affected.
