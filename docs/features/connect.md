# Connect

**Connect** decides which agents a workspace runs on and which apps it reads your work from. It sits at the bottom of the rail and has two tabs, **Agents** and **Integrations**. Each workspace keeps its own choices.

## Agents

The tab opens with **Connect an agent**, the filters **All**, **On this Mac** and **Connected** with their counts, and **Find an agent**. Below is one row for each of the 16 agents, always in the same order, starting with Claude Code, Codex, Cursor and GitHub Copilot. A row never moves when you click it.

A row shows the agent's logo and name, and **Beta** for an agent nobody has yet checked end to end with Slate. A second line shows only when something is not normal, or when you chose a profile or model. A warning has a small amber dot in front of it.

| The agent is… | The row shows | Its **⋯** menu offers |
| --- | --- | --- |
| Connected | A small green dot | **Disconnect** |
| On this Mac, not connected | "not connected" | **Connect** |
| Not on this Mac | "Not on this Mac", greyed | **Install** |
| Slate installed, but not turned on here | "Not turned on · sessions not recorded" | **Connect**, **Remove Slate** |
| Turned on here, but Slate not installed | "Runs here, but Slate is not installed — sessions are not captured" | **Connect** |
| Installed for another workspace on the same profile | "Slate is installed here for Work" | **Connect** |
| Config could not be read | "Slate could not read this agent's config" | Nothing until it can be read |

Every action sits in the row's **⋯** menu, so the right edge of every row stays still. The agent marked **default** is the one used when nothing more specific is named.

**Install** shows the command to paste into Terminal, a second way when there is one, how to sign in, and the vendor's guide. Then press **Check again**. Slate never runs the command for you.

Click an agent's logo or name to open its dialog: its MCP servers, the profile it runs under, and its model ([An agent's dialog](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/dialog.md)).

## What Connect does

**Connect** does two things: it installs Slate into the agent's config folder, so its sessions are captured and it can use Slate's memory and tools, and it records that this workspace runs on that agent. **Disconnect** undoes both ([How Slate installs into an agent](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/how-slate-installs.md)).

- **Remove Slate** takes Slate out of an agent this workspace does not run.
- **Capture**: most agents have a switch in their dialog. Off, that agent's sessions are not recorded, and it stays connected. Cursor has **Capture sessions** / **Stop capturing** instead. OpenCode, Cline, Kilo Code and Auggie have no switch yet. **Auto-capture** in [Built-in automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/built-in.md) stops capture for all.
- **A profile exists once per computer.** If another workspace runs the same agent on the same profile, disconnecting only stops this workspace, and the row offers no **Remove Slate**.
- **Claude Desktop** connects together with Claude Code: it gets Slate's tools and instructions, but nothing is captured from it. The Codex desktop app follows the Codex config.
- **VS Code chat** is captured through the GitHub Copilot connection, and shows in Sessions as **VS Code**.

## With no agent connected

A workspace with no agent cannot chat on Home, run automations, build widgets or learn memories. **Memory**, **Activity**, **Widgets**, **Automations** and **Toolkit** are dimmed on the rail, and pointing at one says why. Memory, Activity and Widgets open anyway once they hold something. Tasks, Projects and Artifacts work without an agent. Connect one and everything works at once, with no restart.

## Which agent runs

The workspace's agent runs everything, unless a group or a project on its own picks another. Home, Ask AI, New session and automations show which agent will run. With several agents in a project, Home and New session let you pick one per turn. **Make default** in an agent's dialog sets the one used when nothing else is named. The account each agent runs under is set the same way: [Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/project-environments.md).

## Integrations

**Integrations** connects the apps you work in, such as GitHub, Jira, Linear or Notion. Press **Connect** and approve Slate on the app's own sign-in page, and what waits for you there shows in Tasks. Your agents can read these apps too, through Slate ([Integrations](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/integrations.md)).

Importing projects, docs, memories and artifacts happens in Projects, Memory and Artifacts, from their **Import** button ([Import](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/import.md)).
