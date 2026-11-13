# A tool's dialog: MCP servers, profiles and models

Click a tool in [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) to open its dialog.

## MCP servers

The dialog lists the servers the tool declares, read from the profile this workspace runs it under. A tool this workspace does not run lists nothing and says to turn it on. With none, it says *Nothing besides Slate itself.* and **Add an MCP server** opens Toolkit's New dialog.

* A **gateway** (one server, many integrations) is one row. Its chevron opens what it carries. It has one **Sign in** and says when they stopped together.
* **Your Claude account**'s connectors are one row under Claude Code, the only tool that can use them.
* A server declared for every directory says **every workspace**.

| Server | States | Buttons |
|---|---|---|
| Read by Slate | **Live**, **Needs sign-in**, **Not turned on**, **Unavailable**, **Not read yet** (a failure says when it last worked) | **Turn on**; **Let an agent read it**, or **Read with Claude Code** when only your Claude account reaches it |
| Not read by Slate | What the tool last reported: **Connected in Claude Code**, **Needs sign-in in Claude Code**, **Claude Code could not connect**. Neither spoke: **Set up, not checked** | none |

**Sign in** uses the sign-in Tasks uses for a tool Slate reads. For a server only an agent reaches, it runs that tool's own login. **Refresh** and any waiting sign-in sit above the list.

## Profiles

A tool's servers, sign-in and history live in a **config directory**, set by `CLAUDE_CONFIG_DIR`, `GEMINI_CLI_HOME`, `CODEX_HOME`, `CURSOR_CONFIG_DIR`, `COPILOT_HOME` or the variable in each newer tool's record. Antigravity, Auggie, Kilo Code and OpenCode have none, so no profile to choose.

Pick the **Profile** this workspace uses, or **Add** one by naming it and its config folder.

* For Claude Code, Codex and Cursor, the add form offers config folders already in your home folder (such as `~/.claude-work`) as buttons under **Found here**. Gemini offers none: its variable names a replacement home folder.
* **Choose folder…** picks any other. A missing path is fine: the tool creates it on sign-in.
* Pick before connecting: the profile decides where Slate is installed.
* **Its own default** is the tool's built-in folder (`~/.claude`, `~/.codex`, …). A `CLAUDE_CONFIG_DIR` or `CODEX_HOME` set in your shell is not followed for it: name that folder as a profile instead. Slate does follow `XDG_CONFIG_HOME`, `XDG_DATA_HOME` and `OPENCODE_CONFIG`.
* A tool kept only under a profile or its own variable's folder counts as installed. Gemini CLI and Antigravity share `~/.gemini`; each is told apart by the files only it writes.
* **Cursor:** `CURSOR_CONFIG_DIR` moves only its sign-in. `cursor-agent` reads servers, hooks and plugins from `~/.cursor` and writes history there (or where `CURSOR_DATA_DIR` says) for every profile. Slate writes them once for all Cursor profiles. Turning one profile off leaves them while another connected Cursor profile uses them.

Why two workspaces on one profile share its sign-in: [Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/cli-profiles.md).

## Models

The model list shows once this workspace runs the tool. On **Its own default**, Slate passes no model and the CLI picks. **Make default** marks the tool used when nothing more specific is named, with a **default** badge. A group or standalone project can override any of it.
