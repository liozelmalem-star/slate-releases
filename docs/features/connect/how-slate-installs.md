# How Slate installs into an agent

Pressing **Connect** in [Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#agents) installs Slate into that agent's config folder, once. The agent then reaches Slate's memory and tools, and Slate captures its sessions. The dialog's last line names the file Slate writes into.

## What it writes

Slate goes in one of two ways, never both:

- **A plugin**, for Claude Code, Codex, Gemini (as an extension) and Cursor. The plugin carries Slate's hooks and four commands, and the agent's own uninstall removes it. The plugin needs Node 24 or newer.
- **Hooks in the agent's config**, for the other agents that take hooks, and for the four above when the plugin cannot run. These config files apply to every project on the computer. Codex takes no config hooks: without its plugin it keeps only Slate's MCP server.

Every agent also gets one `slate` entry in its MCP config, which starts Slate's MCP server inside the app. Each session starts its own copy, so Slate's tools work whether or not the Slate window is open.

Each time Slate starts, it checks every connected agent and puts back what is missing, so Slate is installed exactly one way. Only **Disconnect** keeps it off. Slate installs no plugin while it runs from the disk image; it waits until Slate is in Applications.

## What you see in a Claude Code session

Claude Code prints one line when Slate loads or saves memory, at most once per session each:

| When | What prints |
| --- | --- |
| The session starts | `Slate · <branch> · 5 memories, 1 parked branch, 3 sessions` |
| The session saves memory | `Slate · saved 3 memories from this session`, and a notification |
| The session did work but saved nothing | `Slate · this session did real work but saved nothing yet.` |
| You made a plan | `Slate · you made a plan.` The agent then asks whether to save it |

Other agents get the same reminders in the form each one reads.

## Four commands

The plugin adds these to the agent's `/` menu:

| Command | What it does |
| --- | --- |
| `/slate:brief` | What Slate knows about this project, in a few lines |
| `/slate:recall <what>` | Search your memory |
| `/slate:remember <fact>` | Save one memory, in your words |
| `/slate:open` | Open this project in Slate |

## What Disconnect puts back

Before its first write, Slate keeps what each file held. On **Disconnect**, a file only Slate changed goes back to exactly that, and a file Slate created is removed. If you or the agent edited the file since, only Slate's parts are removed.

If Disconnect fails, it says which part did not come out. For a stuck plugin it gives the command to run, such as `codex plugin remove slate@slate`.

## Check that it works

An agent whose hooks do not run looks like an agent nobody used. To check, run this in Terminal:

```
"$HOME/Library/Application Support/app.slate.workspace/hooks/slate-hook" doctor
```

It prints one line per agent:

| Line | Means |
| --- | --- |
| `3 hook(s) OK · last session <when>` | Working |
| `1 BROKEN of 3` | A hook cannot run. The lines under it say why and name the file |
| `3 hook(s) OK · no session recorded yet` | Slate's part is sound. The agent was not used since, its hooks wait for your approval, or it cannot sign in |

Two common causes of silence:

- **Codex runs no plugin hook until you trust it.** Until then `codex plugin list` says `installed, enabled` while nothing runs.
- **Gemini cannot sign in with a personal Google account.** Use an API key or a Gemini Code Assist licence.

The dialog also shows what the agent's last session ran: this Slate and when, or another Slate install, named, behind an amber dot.
