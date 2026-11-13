# Connect

**Connect** (base of the rail, beside Trash and Settings) has three tabs, **Agents**, **Integrations** and **Import**. It is **per workspace**. What Slate runs on its own is in **Automations › Built-in** ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md)).

## Contents

- [Agents](#agents)
- [Integrations](#integrations)
- [Import](#import)
- [What is not here](#what-is-not-here)

## Agents

**Connect an agent** heads the tab. Under it: filters **All 16**, **On this Mac**, **Connected**, and **Find an agent** (by name). Each tool is a row: logo, name, and on the right one mark or button. A second line shows only when something differs from normal: a warning, a tool not on this Mac, or a profile or model you chose. Click the logo or name for the tool's dialog, which shows the profile it runs under (one login of the tool: its config folder) and its model. Your **account** is your Slate sign-in, in Settings.

Order, always: Claude Code, Codex, Cursor, GitHub Copilot, Antigravity, OpenCode, Gemini, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code, Auggie. The first six are measured end to end. The ten newest show *unverified* in [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md) where no feature has run.

**A row never moves.** Turning a tool on or off changes only its mark and button; under **Connected** it keeps its row until you pick another filter.

| The tool is… | Mark or line | Button |
|---|---|---|
| Connected (Slate installed, workspace runs on it) | a small green dot at the right edge | **Disconnect**, on hover |
| On this Mac, not connected | none | **Connect** |
| Not on this Mac | none (greyed out) | **Install** |
| Slate installed, nothing runs on it | a grey line, *Not turned on · sessions not recorded* | **Remove Slate**, **Connect** on hover |
| Running here, Slate not installed, or last session used another Slate install | a grey line with an amber dot in front | **Connect** or **Disconnect** |
| Config could not be read | a grey line with an amber dot in front | **Connect** |

A state that needs you is said once: a small amber dot in front of a grey line. No pill repeats it, and every row is one height, so the dots line up.

### A tool that is not installed

The row reads *Not on this Mac* and has no **Connect**. **Install** shows the command with a copy button, a second way where there is one, how to sign in, what the account needs, and the vendor's guide link. Paste the command into Terminal, then press **Check again**; once Slate finds the CLI the row gets **Connect**. Slate never runs the command.

| Tool | Install | Sign in |
|---|---|---|
| Claude Code | `curl -fsSL https://claude.ai/install.sh \| bash` | run `claude` (needs a Pro, Max, Team, Enterprise or Console account) |
| Codex | `brew install --cask codex` | run `codex`, then **Sign in with ChatGPT** |
| Gemini | `brew install gemini-cli` | `GEMINI_API_KEY`, or a Gemini Code Assist licence. Personal Google accounts moved to Antigravity CLI |
| Cursor | `curl https://cursor.com/install -fsS \| bash` | `agent login` |
| OpenCode | `curl -fsSL https://opencode.ai/install \| bash` | run `opencode`, then `/connect` |
| GitHub Copilot | `brew install --cask copilot-cli` | `copilot login` (needs a GitHub Copilot plan) |
| Antigravity | `curl -fsSL https://antigravity.google/cli/install.sh \| bash` | run `agy` (personal Google accounts sign in here) |
| Cline | `npm install -g cline` | `cline auth` |
| Grok Build | `curl -fsSL https://x.ai/cli/install.sh \| bash` | `grok login` |
| Kiro | `curl -fsSL https://cli.kiro.dev/install \| bash` | `kiro-cli login` |
| Qwen Code | `npm install -g @qwen-code/qwen-code` | run `qwen`, then `/auth` (needs a model provider) |
| Droid | `curl -fsSL https://app.factory.ai/cli \| sh` | run `droid` (needs a Factory account or `FACTORY_API_KEY`) |
| Hermes Agent | `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash` | `hermes setup` |
| Goose | `curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh \| CONFIGURE=false bash` | `goose configure` |
| Kilo Code | `npm install -g @kilocode/cli` | `kilo auth login` |
| Auggie | `npm install -g @augmentcode/auggie` | `auggie login` (needs Node.js 20 or later and an Augment account) |

A turn that cannot find a tool's CLI names the same command.

### What Connect does

**Connect** installs Slate into the tool's config directory (sessions captured, workspace readable and writable) and records that this workspace runs on the tool (Home, automations and skills use it). **Disconnect** undoes both ([how](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/how-slate-installs.md)).

* If only one half is true the row says so, behind an amber dot, and **Connect** repairs it: *Not turned on · sessions not recorded* (in grey: Slate records only the agents a workspace turns on, so this one is a leftover), or *Runs here, but Slate is not installed — sessions are not captured*.
* **Remove Slate** removes Slate from a tool this workspace does not run, leaving the workspace as is. The dialog names the config file Slate writes. Nothing is written until you connect, on first launch too.
* **Capture** switch (Claude Code, Codex, Gemini; the ten newest have none yet): off stops recording that tool's sessions, and it stays connected. Cursor has **Capture sessions** / **Stop capturing**; OpenCode has none. **Auto-capture** in Automations › [Built-in](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) stops all.
* **A profile exists once per computer.** If another workspace runs the same tool on the same profile, the row says *Slate is installed here for Work* and offers no **Remove Slate** (it would break that workspace); disconnecting only stops this workspace, and says so first.
* **Claude Desktop** is connected with Claude Code, if installed; turning Claude Code off leaves it (one machine-wide setting). The **Codex** desktop app follows the Codex CLI's config.

**With no tool, a workspace cannot chat on Home, run automations, build widgets, learn memories or record activity.** The Automations, Memory, Activity, Widgets and Toolkit icons stay dimmed (hover says why; a click does nothing); Memory, Activity and Widgets open once they hold something. Home opens as a doc: the agents, what connecting one unlocks, **Open Connect**, and what works without AI (Tasks, Projects, Artifacts). Set a tool and all works with no reload.

**One place decides which tool runs.** Connect sets the workspace's tool; a group or project can override it. Home, the ⌘J panel, New session and automations show the tool that will run, linking here. With several tools in a project, Home and New session let you pick per turn. Sessions lists every AI session on the computer.

More: [MCP servers, profiles and models](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/dialog.md); [checking it works](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/how-slate-installs.md#checking-it-actually-works).

## Integrations

The **Integrations** tab holds this workspace's connected apps. Press **Connect**, approve on the app's sign-in page, and what you owe there shows in Tasks. List, states and per-app notes: [Integrations](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/integrations.md).

## Import

The **Import** tab brings in the projects your editors already know: one tile per editor, with one button for the tile picked. **Preview** lists the folders before anything is added. See [Import](https://liozelmalem-star.github.io/slate-releases/docs/features/import.md).

## What is not here

Settings holds **Account**, **Workspaces**, **Appearance**, **Terminal**, **Keyboard** and **About**. Moving, exporting and restoring a workspace file: **Settings → Workspaces**.

## See also

- [Connecting Your Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/connecting.md): connecting by hand, and the MCP contract
- [Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/cli-profiles.md): profiles and how a session is judged
- [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md): the boundary all of this turns on
