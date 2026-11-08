# Agents & Model Providers

Slate calls its model providers **agents**: thin drivers over AI CLIs you already installed and signed in to. There is **no API key to paste into Slate**; the CLI makes the model calls with its own auth.

| Agent | Label | Env | Models |
| --- | --- | --- | --- |
| `claude-cli` | Claude Code | `CLAUDE_CONFIG_DIR` | `claude-sonnet-4-6` (default), `claude-opus-4-8`, `claude-haiku-4-5-20251001` |
| `codex-cli` | Codex | `CODEX_HOME` | `gpt-5.3-codex` (default), `gpt-5.2`. A fallback only: Slate asks the CLI and lists what the account can reach |
| `gemini-cli` | Gemini | `GEMINI_CLI_HOME` | `gemini-2.5-flash` (default), `gemini-2.5-pro`, `gemini-2.0-flash`. **Needs an API key or a Code Assist licence**, see below |
| `cursor-cli` | Cursor | `CURSOR_CONFIG_DIR` | What your Cursor account offers (`cursor-agent --list-models`). If the CLI cannot be asked: `auto`, `gpt-5.3-codex`, `composer-2.5` |
| `opencode-cli` | OpenCode | — | The providers you are logged into (`opencode models`) |
| `copilot-cli` | GitHub Copilot | `COPILOT_HOME` | What your Copilot plan offers, listed when a session starts. If the CLI cannot be asked: `gpt-4.1`, `claude-haiku-4.5`. Sign in with `copilot login` in a terminal |
| `antigravity-cli` | Antigravity | — | `auto` |
| `cline-cli` | Cline | `CLINE_DIR` | If the CLI cannot be asked: `anthropic/claude-sonnet-5.5`, `anthropic/claude-opus-5.5`, `google/gemini-4-argon` |
| `grok-cli` | Grok Build | `GROK_HOME` | `grok-4.6`, `grok-4.5` |
| `kiro-cli` | Kiro | `KIRO_HOME` | `auto` |
| `qwen-cli` | Qwen Code | `QWEN_HOME` | `coder-model`, `qwen3-coder-plus`, `qwen3-coder-flash` |
| `droid-cli` | Droid | `FACTORY_HOME_OVERRIDE` | `gpt-6.1-sol` |
| `hermes-cli` | Hermes Agent | `HERMES_HOME` | `anthropic/claude-opus-4.6` |
| `goose-cli` | Goose | `GOOSE_PATH_ROOT` | `gpt-4o` |
| `kilo-cli` | Kilo Code | — | `kilo/kilo-auto/balanced`, `kilo/kilo-auto/free`, `kilo/kilo-auto/frontier` |
| `auggie-cli` | Auggie | — | `claude-sonnet-4-6` |

The table follows the order Connect lists the tools. [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md) shows which tool has which feature.

**The first six tools are measured end to end; the ten newest are not.** Antigravity, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code and Auggie were checked on 2026-11-06 for version, help, MCP setup and the Agent Client Protocol handshake. Unrun features (Home turn, interrupt, asking, token use) are *unverified* or *not yet* in [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md). They read **Beta** beside their name in setup and in Connect → Agents until their Agent driver cell is "yes". A short model list is a fallback; Slate asks the CLI first.

[Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) sets each tool's account and default model; a group or project may override. OpenCode has no config-directory variable, so one account and no profile picker (`OPENCODE_CONFIG_DIR` only adds agents, commands, modes and plugins).

**Gemini needs paid access since 2026-06-18.** Google stopped serving Gemini CLI for Code Assist for individuals, Google AI Pro and Google AI Ultra. It still works on an API key or a Code Assist Standard or Enterprise licence. On a consumer account `gemini` exits with `IneligibleTierError` before reaching Slate, so the Gemini tool cannot answer. Other tools are unaffected.

## Transport

Rust runs the model calls (`packages/desktop/src-tauri/src/ai/`; `driver.rs` picks the driver from the tool's record in `agentsAndHosts.json`), which keeps auth out of the renderer.

- **Warm process.** Each tool keeps one across Home turns and is sent only your new message. A fresh process (first turn, after restart, after resuming) gets the history first. Resuming always starts fresh, so connected tools may sign in once more.
- **Protocols.** Claude Code and Codex speak their own. Cursor, OpenCode, Gemini, GitHub Copilot and the ten newest speak the Agent Client Protocol (`cursor-agent acp`, `opencode acp`, `gemini --acp`, `copilot --acp`, `grok agent stdio`, `droid exec --output-format acp`, …) in `ai/acp/`. Through it Stop keeps the process, the model can change mid-conversation, and approval cards appear ([Approvals](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/approvals.md#what-differs-by-agent)).
- **Fallback.** A tool silent on the protocol for 20 seconds runs one process per message for the rest of that app session (an automation's unattended Gemini turn too). No card can be answered, so an ask is a refusal (OpenCode's rule: [Approvals](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/approvals.md#what-differs-by-agent)). Cursor runs pre-approved. GitHub Copilot (`copilot -p`) runs every tool only on Full auto, otherwise only what your Copilot settings allow.
- **Automations** run unattended, one process per run. Claude and Codex reach your connected MCP tools and the automation's rules decide each call: reads go on, a call that changes something is held for your answer, and merging, removing, file changes, commands and anything needing more access are refused ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#what-it-may-do)).
- **Timeout.** Every turn is bounded at 10 minutes; a CLI that connects then goes quiet (say, waiting on an auth callback) ends with a readable timeout.

## Who runs the tool loop

The agent does. A request that is not a [curated command](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/mcp-commands.md) goes whole to the tool's CLI, which loops over its own MCP tools. A Home turn has **no step cap in Slate**. An automation makes a fixed set of turns: a pass per place its brief checks, one to write the report, one per prompt step.

A run with nobody watching has **one $5 spend ceiling for the whole run**: Slate adds up the cost the tool reports and gives each new turn only what is left; at zero the run stops with a message. Only Claude Code gets it as a flag, with a cap of 30 tool turns per process and the rest of the Claude catalog as **fallback models** for when the primary is overloaded. A tool that reports no cost is limited to 12 turns per run. These limits apply to automations, skill steps and grounding passes, not Home.

A step is bounded by silence: each token, tool call, tool result or usage report restarts a 240-second clock.

Generating a skill also passes a **JSON schema**. Claude Code, Codex and OpenCode enforce it (`--json-schema`, `turn/start`'s `outputSchema`, `opencode serve`'s `session.prompt`); Gemini and Cursor get the shape in prose and their reply is parsed from text.

## Which account an agent runs under

A CLI keeps its config and login in a directory, and you may have several (work and personal Claude). **The workspace decides which one a tool uses**: set it in Connect → Agents; a group or project may override. It also governs terminal sessions you start and what Slate captures ([Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/cli-profiles.md)).

See also: [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md), [Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/cli-profiles.md), [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
