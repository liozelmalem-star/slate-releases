# Features by Agent

Slate works with sixteen agents, and they do not offer the same things. Slate keeps one table of which tool has which feature. Every control that depends on a tool reads it. If a tool cannot do something, the control is hidden or disabled with a reason, never shown doing nothing.

Each cell is one of four answers:

- **yes** — Slate does it on this tool today.
- **not yet** — the tool can do it and Slate does not use it yet.
- **unverified** — it may already work. Nobody has run it to check.
- **no** — the tool has no way to do it. Slate records what was measured and when.

Measured on 2026-09-19 against Claude Code 2.1.278, Codex 0.142.3, Gemini 0.58.0, Cursor's `cursor-agent` 2026.09.15 and OpenCode 1.18.31, on 2026-11-01 against GitHub Copilot CLI 1.0.28, and on 2026-11-06 against Antigravity's `agy` 1.5.1, Grok Build 1.0.77, Kiro CLI 3.1.0, Droid 1.4.1, Auggie 0.37.0, Cline CLI 3.0.74, Qwen Code 0.26.8, Kilo CLI 7.8.27, Hermes Agent 0.23.0 and Goose 1.57.0. The CLIs change often, so a "no" is a dated measurement, not a permanent limit.

<!-- matrix:start -->
| Feature | Claude Code | Codex | Gemini | Cursor | OpenCode | GitHub Copilot | Antigravity | Grok Build | Kiro | Droid | Auggie | Cline | Qwen Code | Kilo Code | Hermes Agent | Goose |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Agent driver | yes | yes | yes | yes | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified |
| Transcript capture | yes | yes | yes | yes | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | yes | yes |
| Skills and MCP projection | yes | yes | yes | yes | yes | yes | unverified | yes | yes | yes | yes | unverified | yes | yes | unverified | yes |
| MCP connect | yes | yes | yes | yes | yes | yes | yes | yes | unverified | yes | yes | yes | yes | yes | yes | yes |
| Hooks installed | yes | yes | yes | yes | yes | yes | unverified | yes | unverified | yes | yes | unverified | unverified | unverified | yes | no |
| Live model list | yes | yes | yes | yes | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | unverified | yes | unverified | unverified |
| Persistent Home session | yes | yes | unverified | yes | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | not yet | not yet |
| Interrupt a turn | yes | yes | unverified | yes | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | not yet | not yet |
| Change model mid-session | yes | yes | unverified | yes | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified |
| Ask before acting | yes | yes | unverified | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified |
| Save enforced at end of turn | yes | yes | yes | yes | no | yes | unverified | yes | no | yes | unverified | no | unverified | unverified | unverified | no |
| Agent run rules answer tool calls | yes | yes | yes | yes | yes | yes | unverified | yes | unverified | yes | yes | unverified | unverified | unverified | yes | no |
| Token usage | yes | yes | yes | yes | yes | not yet | unverified | not yet | unverified | unverified | unverified | not yet | not yet | not yet | not yet | yes |
| Context in use | yes | yes | unverified | yes | yes | not yet | unverified | not yet | unverified | unverified | unverified | unverified | not yet | unverified | not yet | yes |
| Native memory import | yes | yes | yes | no | no | unverified | unverified | not yet | unverified | unverified | unverified | not yet | not yet | unverified | not yet | not yet |
| Multiple accounts | yes | yes | yes | yes | no | yes | not yet | yes | unverified | unverified | not yet | yes | yes | no | unverified | unverified |
| Project account for automations | yes | yes | yes | yes | no | yes | not yet | yes | unverified | unverified | not yet | unverified | unverified | no | not yet | not yet |
| Session id known before launch | yes | no | yes | yes | no | unverified | unverified | not yet | unverified | unverified | unverified | unverified | not yet | unverified | unverified | unverified |
| List running sessions | yes | no | no | yes | no | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified | unverified |
| Name a session | yes | yes | no | yes | yes | unverified | unverified | unverified | unverified | unverified | unverified | not yet | unverified | not yet | not yet | not yet |
| Background start and stop | yes | no | no | yes | no | unverified | unverified | unverified | unverified | unverified | unverified | not yet | unverified | unverified | unverified | unverified |
| MCP health and sign-in | yes | yes | yes | yes | yes | not yet | not yet | not yet | not yet | not yet | not yet | not yet | not yet | not yet | not yet | not yet |
| Resume command in Sessions | yes | yes | yes | yes | yes | yes | not yet | not yet | not yet | not yet | not yet | not yet | not yet | not yet | not yet | not yet |
| Structured output (schema) | yes | yes | no | no | yes | no | not yet | not yet | unverified | no | no | no | not yet | unverified | no | unverified |
| Budget cap and fallback model | yes | no | no | no | no | no | no | no | no | no | no | no | not yet | no | not yet | unverified |
| Unattended plugin install | yes | yes | yes | yes | yes | not yet | not yet | not yet | not yet | not yet | unverified | not yet | not yet | unverified | not yet | not yet |
| Cloud sessions | yes | yes | no | unverified | no | unverified | not yet | unverified | not yet | unverified | unverified | no | no | not yet | no | no |
| Phone control | yes | not yet | no | no | no | not yet | not yet | unverified | unverified | not yet | unverified | not yet | not yet | not yet | not yet | not yet |
<!-- matrix:end -->

## Beta agents

An agent whose **Agent driver** cell is "unverified" reads **Beta** beside its name, in setup's Agents step and in Connect → Agents. Today that is ten: Antigravity, Grok Build, Kiro, Droid, Auggie, Cline, Qwen Code, Kilo Code, Hermes Agent and Goose. Slate works with them, but nobody has run a real session on them yet to check every part. The label reads this table, so an agent loses it on the day its Agent driver cell turns "yes". The other six read no label.

Gemini is not Beta, but its row says *Needs a Gemini Code Assist licence or an API key*. Since June 2026, Gemini CLI refuses personal Google sign-ins with `IneligibleTierError` and sends them to Antigravity. Checked again on 2026-11-07 with Gemini CLI 0.58.0.

## Why some cells are "no"

Every "no" was checked against the tool's official documentation or the tool itself, and the code records the day. A cell stays "no" only when those sources offer no way to do it.

- **Budget caps and fallback models** exist only in Claude Code. Gemini has a turn cap and switches from Pro to Flash on its own when rate-limited, but none of the others has a spend cap. Qwen Code has a fallback-model flag, which Slate does not use yet. Slate still bounds an unwatched run on every tool by counting turns for a tool that reports no cost: at most 12 per run (see [Agents & Model Providers](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md#who-runs-the-tool-loop)).
- **Background sessions** that keep running after you close them: Codex, Gemini and OpenCode have no local way to detach a session. Codex's `cloud exec` runs on OpenAI's servers, so it is a cloud session.
- **Cloud sessions** (work on the vendor's computer, see [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md#cloud-sessions)): Claude Code and Codex have them. Gemini, OpenCode, Cline, Qwen Code, Hermes and Goose have none. Kilo has `kilo cloud`, which Slate does not use yet. Cursor's CLI has a cloud command behind a flag that is off for ordinary accounts, so it is "unverified". Checked 2026-10-07.
- **Structured output**: Gemini, Cursor, Cline and Hermes print a fixed JSON shape only.
- **Choosing a session's id before it starts**: Codex and OpenCode always create the id themselves.
- **Listing running sessions**: Codex, Gemini and OpenCode list saved sessions or history, not running ones.
- **Naming a session**: Gemini keeps no session name, so Slate keeps the one you give.
- **Several accounts**: OpenCode and Kilo have no config-folder variable, so each has one account. Only `XDG_CONFIG_HOME` and `XDG_DATA_HOME` together move them.
- **Native memory**: Cursor's Memories live only in the editor's settings. OpenCode has no memory feature.
- **OpenCode's end-of-turn save check**: its plugin events all fire after the turn ends, so nothing can hold the turn open.
- **Goose has no hooks**, so Slate cannot check the save at the end of a turn or answer a tool call with an agent run's rules. Its sessions are still captured, from its own database.

Hermes and Goose were measured without a model account: each was installed with its own installer, answered an ACP `initialize`, and ran one turn against a local stand-in for a model, which wrote a real session to its database. Their "unverified" cells need a real model turn. Hermes checks the save only at its `pre_verify` event, which fires on a turn that edited code, so its save check stays "unverified". Hermes runs a hook only once it is approved, so Slate writes its approval into `shell-hooks-allowlist.json` beside the config.

Antigravity, Grok Build, Kiro, Droid and Auggie were measured signed out. Each one answered the ACP handshake Slate starts a session with, and each but Kiro added Slate's MCP server through its own `mcp add`. Kiro's `mcp add` refuses to run signed out, so Slate writes its entry to `~/.kiro/settings/mcp.json` itself. Everything that needs a model turn is "unverified" for these five, because none of them runs a turn without an account.

- **Hooks on Antigravity and Kiro** are "not yet": each keeps its hooks in a file shape of its own, which Slate does not write yet.
- **Kiro's end-of-turn save check** is "no": Kiro's hook docs name only the before-tool hook as able to block in the CLI.
- **Auggie's sessions** are one JSON file each, `~/.augment/sessions/<id>.json`. Slate reads them, and finds the session's folder where Auggie itself does: the workspace folder a turn's IDE state names. Capture stays "unverified" until a signed-in session is seen.
- **Grok Build also runs Claude Code's hooks** from `~/.claude/settings.json` unless `[compat.claude] hooks = false` is set in `~/.grok/config.toml`. With both connected, Slate's hooks can run twice in one Grok session.

Cline, Qwen Code and Kilo were added on 2026-11-06 from their CLIs alone: each answered the ACP handshake, and its `mcp add` wrote the file Slate reads. Cline and Qwen Code ask for sign-in before a session starts, so every cell that needs a real turn is "unverified". Kilo is built on OpenCode and keeps its plugin model and its session database, which Slate reads like OpenCode's. Cline's hooks are one script per event in `~/.cline/hooks`, which Slate does not write yet, and its sessions are JSON files the watcher does not read yet.

Every one of the ten tools added on 2026-11-06 runs a turn in Home through the same ACP driver as Cursor, Gemini and GitHub Copilot, read from its record. Its "agent driver" cell stays "unverified" until one real turn has run on it.

Gemini cells marked "unverified" may already work. On a consumer account Gemini stops before any turn with `IneligibleTierError` (see [agents](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md)), so they cannot be checked there.

The table lives in `packages/shared/src/agents/features.ts`, with the evidence for every "no". A test fails if this doc and the code disagree.
