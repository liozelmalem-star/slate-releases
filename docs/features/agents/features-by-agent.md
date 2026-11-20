# Features by agent

The 16 agents do not all offer the same things, so this table says which agent has which feature in Slate. Every control that depends on an agent reads it: where an agent cannot do something, the control is hidden or disabled with the reason, never shown doing nothing.

Each cell is one of four answers:

- **yes**: Slate does it on this agent today.
- **not yet**: the agent can do it, and Slate does not use it yet.
- **unverified**: it may already work. Nobody has run it to check.
- **no**: the agent offers no way to do it, as measured on the date below.

Measured on 2026-09-19 for Claude Code, Codex, Gemini, Cursor and OpenCode, on 2026-11-01 for GitHub Copilot, and on 2026-11-06 for the other ten. The agents change often, so a "no" is a dated measurement, not a permanent limit.

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

An agent whose **Agent driver** cell is "unverified" reads **Beta** beside its name, in setup and in Connect → Agents. Today that is ten: Antigravity, Grok Build, Kiro, Droid, Auggie, Cline, Qwen Code, Kilo Code, Hermes Agent and Goose. Slate works with them, but nobody has run a real session on them yet to check every part. An agent loses the label when its Agent driver cell turns "yes".

Gemini is not Beta, but its row reads *Needs a Gemini Code Assist licence or an API key*: Gemini no longer signs in personal Google accounts. Its "unverified" cells cannot be checked on a personal account. See [Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/agents.md#gemini-needs-paid-access).

## Why some cells are "no"

Each "no" was checked against the agent's own documentation or the agent itself.

- **Budget cap and fallback model**: only Claude Code has a spend limit and fallback models. On every other agent, Slate bounds an unattended run by counting turns instead (see [Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/agents.md#limits-on-unattended-runs)).
- **Background start and stop**: Codex, Gemini and OpenCode have no local way to keep a session running after you close it.
- **Cloud sessions**: Claude Code and Codex have them. Gemini, OpenCode, Cline, Qwen Code, Hermes Agent and Goose have none.
- **Structured output**: Gemini, Cursor, GitHub Copilot, Droid, Auggie, Cline and Hermes Agent cannot be held to a fixed reply shape.
- **Session id known before launch**: Codex and OpenCode always choose the id themselves.
- **List running sessions**: Codex, Gemini and OpenCode list saved sessions, not running ones.
- **Name a session**: Gemini keeps no session name, so Slate keeps the one you give.
- **Multiple accounts**: OpenCode and Kilo Code have no account-folder setting, so each has one account.
- **Native memory import**: Cursor keeps its memories only in the editor's settings. OpenCode has no memory feature.
- **Save enforced at end of turn**: OpenCode, Kiro, Cline and Goose cannot hold a turn open at its end.
- **Goose has no hooks**, so Slate cannot check the save at the end of a turn or answer a tool call with an agent run's rules. Its sessions are still captured.
- **Grok Build also runs Claude Code's hooks** unless you turn that off in Grok's own settings. With both connected, Slate's hooks can run twice in one Grok session.
