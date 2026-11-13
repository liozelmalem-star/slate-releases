# How Slate installs into a tool

Connecting installs Slate once, by plugin or config hooks, plus one MCP entry. See [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md).

## Contents

- [Two ways in, one at a time](#two-ways-in-one-at-a-time)
- [What Slate writes into a config](#what-slate-writes-into-a-config)
- [What you see in a Claude Code session](#what-you-see-in-a-claude-code-session)
- [Four commands in every session](#four-commands-in-every-session)
- [What turning a tool off puts back](#what-turning-a-tool-off-puts-back)
- [Checking it actually works](#checking-it-actually-works)

## Two ways in, one at a time

A **plugin** is a directory the tool owns, with five hooks (six for Claude Code) and four slash commands. The tool's own uninstall removes it all. The MCP server is separate: every tool reaches it through one `slate` entry in its config.

* OpenCode and GitHub Copilot have no plugin route, so hooks go into their config. So for Claude Code, Gemini and Cursor when the plugin cannot be installed or run.
* Codex takes no config hooks. Without its plugin it keeps only the MCP entry.

**The MCP entry** is a URL on the running app (`http://127.0.0.1:47366/mcp`; the port follows the Mac user, 47366 for the first account) with Slate's private key in a header (ADR 0106). No session starts its own process. Slate writes the entry itself, readable by you only. Claude Desktop and VS Code keep a stdio entry running `slate-mcp`. VS Code's entry goes into each of VS Code, VS Code Insiders and VSCodium that is installed, and into the own `mcp.json` of every VS Code profile; on Linux their folders follow `XDG_CONFIG_HOME`. A profile made after you connect gets the entry when VS Code is next turned on in Connect. With Slate closed the tool lists the server as failed and the session-start hook says why: open Slate, start a new session.

| Tool | Turning it on |
|---|---|
| Claude Code | installs the plugin |
| Codex | installs the plugin |
| Gemini | installs the plugin, as a Gemini extension |
| Cursor | installs the plugin, as a link in Cursor's local plugins folder |
| OpenCode | writes one plugin module and names it in OpenCode's config (OpenCode loads a module, not a directory) |
| GitHub Copilot | writes the `slate` entry into `~/.copilot/mcp-config.json` and hooks into `~/.copilot/hooks/slate.json`, a file of its own |
| The ten newest tools | write the `slate` entry into the tool's own MCP config (the file is in the tool's record in `agentsAndHosts.json`). Grok Build, Droid, Hermes Agent and Auggie also get hooks; Antigravity, Kiro, Cline and Goose get none yet |

* **Node 24 or newer** is needed for the plugin. Without it, tools with a config route use that. If Node disappears, Slate removes the plugin rather than leave a server that cannot start. Slate asks your shell once per launch where `node` is (an app opened from Finder has no shell PATH), which finds fnm, nvm, volta and asdf.
* **Only from where Slate lives.** Opened straight from the disk image, or from the temporary copy macOS runs a downloaded app from, Slate installs no plugin: that path is gone once the app moves, and the tool would keep a dead link. The config route carries capture until Slate runs from Applications (or any folder or drive it was copied to); a registration left from such a copy is recognised as Slate's and replaced then.
* **Exactly one way.** Each launch checks every tool and profile: with the plugin installed, old hooks are removed; a connected tool with neither gets back what it can have (else everything runs twice). Slate decides from its record of what it installed per profile: a matching profile gets no writes, an unrecorded one is left alone unless you connected it, and a connected profile that lost Slate is connected again. Only turning it off in Connect keeps it off. If Slate's record, or its list of connected or turned-off profiles, cannot be read (cut short, or written by a newer Slate), that launch changes nothing from it: no profile is connected again, no kept original is removed, the file stays as it is with a copy beside it (`.corrupt`), and Disconnect of a profile that shares its files with another (Cursor) is refused until the file is fixed or removed.
* **Asking the tool first.** Whether the plugin is installed, and where from, is asked of the tool's own list command when it has one: `claude plugin list --json`, `codex plugin list --json` and `gemini extensions list -o json`. Slate reads the tool's files only when the command is missing, fails, or does not name the plugin, and writes a warning to `slate.log` when one of those files is not in a form it reads. Connect re-registers a `slate` MCP entry that is already there when the tool's config file holds one; the tool's error text is not read.
* **What actually ran.** The MCP server records tool, account and Slate when a tool starts it. The tool's dialog shows what its last session ran: this Slate and when; one started before this Slate was built (the next session runs this one); or another Slate install, named (also on the row, behind an amber dot). A dev checkout's server run from its source counts as this Slate. The HTTP entry always reaches the running Slate; a host's stdio entry keeps the server it started with.

## What Slate writes into a config

On the config route, connecting writes hooks into `~/.claude/settings.json`, `~/.gemini/settings.json`, `~/.cursor/hooks.json`, `~/.config/opencode/opencode.json` and `~/.copilot/hooks/slate.json` (under a profile, that profile's folder). These files are **global**: they apply to every project on the machine.

* One entry per event: five for Gemini and GitHub Copilot, six for Claude Code and Cursor.
* Claude Code's sixth runs after a RemoteTrigger or Bash call and records a cloud session it started (see [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md#cloud-sessions)).
* Cursor's sixth is a prompt hook applying the account rule of the folder you are in.
* OpenCode gets one plugin module with two events.

Every entry names one script Slate rewrites on each launch in its data directory. If it cannot find what to run it exits 0 silently. Removing it is safe.

## What you see in a Claude Code session

Claude Code prints one line when Slate loads or captures memory. Each prints at most once per session. A session with nothing to load says nothing. The lines are Claude Code only; the interruption goes to Cursor, Gemini and others in the form each reads.

| When | What prints |
|---|---|
| Session starts | `Slate · <branch> · 5 memories, 1 parked branch, 3 sessions` (a count of 0 is left out) |
| Session saves memory | `Slate · saved 3 memories from this session · <page>`, and a desktop notification |
| Stop interrupted | `Stop hook feedback: Slate · this session did real work but saved nothing yet.` Or, after a likely correction, `Slate · this looked like a correction (“no, …”). If it was, save the lesson…`. Two lines at most, no doc id; the model then ends with one short line |
| Plan made, not saved | `Stop hook feedback: Slate · you made a plan. Ask the user whether to save it as a Plan doc in Slate…`, then the model asks you with a click |

## Four commands in every session

The plugin adds these to the `/` menu (type `/slate` in Claude Code):

| Command | What it does |
|---|---|
| `/slate:brief` | What Slate knows about this project, in a few lines |
| `/slate:recall <what>` | Search your memory, and check any code it cites |
| `/slate:remember <fact>` | Save one memory, in your words |
| `/slate:open` | Open this project in the Slate app |

## What turning a tool off puts back

Slate records what each file held before its first write. On disconnect, a file only Slate changed goes back to those bytes, and a file Slate created is removed. If you or the tool edited it after Slate, only Slate's parts are removed.

If disconnect fails it says so, naming whichever of the plugin and the old hooks did not come out (hooks first, since they keep running). For a stuck plugin it gives the terminal command, such as `codex plugin remove slate@slate`. Slate still remembers you turned the tool off, so the next launch does not put it back.

## Checking it actually works

Plugin hooks and the MCP server run the Slate the app is running (a plugin's own copy is used only without the app), so a tool that caches plugins by version (Codex) still gets today's Slate. Every release is a new plugin version, refreshed next launch. A broken tool looks like one nobody used, so run:

```
"$HOME/Library/Application Support/app.slate.workspace/hooks/slate-hook" doctor
```

One line per tool. A tool with no hooks says `not connected`. Otherwise:

| Line | Meaning |
|---|---|
| `n hook(s) OK · last session <when>` | Working. |
| `n BROKEN of m` | A hook cannot run; the lines under it say why and name the file. Slate's fault. Exits with an error code. |
| `n hook(s) OK · no session recorded yet` | Wiring is sound; something outside Slate stops it: tool unused since connecting, hooks need approving once, or the account cannot sign in. |

Two silent causes:

* **Codex runs no plugin hook until you trust it.** Until you clear the hook-trust step, `codex plugin list` says `installed, enabled` while nothing runs.
* **Gemini CLI cannot sign in on a personal Google account** (`IneligibleTierError`). Use an API key or a Code Assist licence.

For the first kind, the Activity card **Do sessions save memory?** (off by default) compares sessions the tool wrote here in the last 7 days with those Slate's hooks recorded. When the tool wrote at least 3 and fewer than half were recorded, it says so, e.g. "Codex ran 9 sessions in the last 7 days and Slate saw 1. Its sessions got no memory from Slate and saved none.", with the fix.
