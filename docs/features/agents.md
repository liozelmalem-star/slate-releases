# Agents

An agent is an AI coding tool Slate works with. Slate runs the agent's own command-line program, under the sign-in you already have, so there is no API key to enter and no model inside Slate. Turn agents on, and pick each one's account and default model, in [Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md).

## The 16 agents

The table follows the order Connect lists them. **Account folder** is the setting the agent reads to find its account, which is how Slate runs it under work or personal accounts. **Models** is the list Slate offers when it cannot ask the agent; Slate asks the agent first, so you usually see what your own account offers.

| Key | Agent | Account folder | Models |
| --- | --- | --- | --- |
| `claude-cli` | Claude Code | `CLAUDE_CONFIG_DIR` | `claude-sonnet-4-6` (default), `claude-opus-4-8`, `claude-haiku-4-5-20251001` |
| `codex-cli` | Codex | `CODEX_HOME` | `gpt-5.3-codex` (default), `gpt-5.2` |
| `cursor-cli` | Cursor | `CURSOR_CONFIG_DIR` | What your Cursor account offers (`cursor-agent --list-models`); else `auto`, `gpt-5.3-codex`, `composer-2.5` |
| `copilot-cli` | GitHub Copilot | `COPILOT_HOME` | What your Copilot plan offers; else `gpt-4.1`, `claude-haiku-4.5`. Sign in with `copilot login` in a terminal |
| `antigravity-cli` | Antigravity | — | `auto` |
| `opencode-cli` | OpenCode | — | The providers you are logged into (`opencode models`) |
| `gemini-cli` | Gemini | `GEMINI_CLI_HOME` | `gemini-2.5-flash` (default), `gemini-2.5-pro`, `gemini-2.0-flash`. Needs a Gemini Code Assist licence or an API key |
| `cline-cli` | Cline | `CLINE_DIR` | `anthropic/claude-sonnet-5.5`, `anthropic/claude-opus-5.5`, `google/gemini-4-argon` |
| `grok-cli` | Grok Build | `GROK_HOME` | `grok-4.6`, `grok-4.5` |
| `kiro-cli` | Kiro | `KIRO_HOME` | `auto` |
| `qwen-cli` | Qwen Code | `QWEN_HOME` | `coder-model`, `qwen3-coder-plus`, `qwen3-coder-flash` |
| `droid-cli` | Droid | `FACTORY_HOME_OVERRIDE` | `gpt-6.1-sol` |
| `hermes-cli` | Hermes Agent | `HERMES_HOME` | `anthropic/claude-opus-4.6` |
| `goose-cli` | Goose | `GOOSE_PATH_ROOT` | `gpt-4o` |
| `kilo-cli` | Kilo Code | — | `kilo/kilo-auto/balanced`, `kilo/kilo-auto/free`, `kilo/kilo-auto/frontier` |
| `auggie-cli` | Auggie | — | `claude-sonnet-4-6` |

An agent with no account folder has one account only. Which agent can do what in Slate is in [Features by agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agents/features-by-agent.md).

## Beta agents

Ten agents read **Beta** beside their name, in setup and in Connect → Agents: Antigravity, Grok Build, Kiro, Droid, Auggie, Cline, Qwen Code, Kilo Code, Hermes Agent and Goose. Slate works with them, but nobody has run a session on them yet to check every part. The label goes away when that check is done.

## Gemini needs paid access

Gemini no longer signs in personal Google accounts. It works with an API key, or with a Gemini Code Assist Standard or Enterprise licence. On a personal account it stops before it reaches Slate, so its row reads *Needs a Gemini Code Assist licence or an API key*. Antigravity is Google's agent for personal accounts.

## Which account an agent runs under

You may keep several accounts of one agent, such as work and personal Claude Code. **The workspace decides which one an agent uses**: set it in Connect → Agents. A group or a project can choose another. The same choice applies to the terminal sessions you start, and to what Slate captures. See [Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit/project-environments.md).

## Transport

Slate starts each agent's program itself, so your sign-ins never reach the app window. Claude Code and Codex speak their own protocol. The other fourteen speak the Agent Client Protocol, which lets Home stop a turn without ending the program, change the model mid-conversation and show approval cards. What differs by agent is in [Approvals](https://liozelmalem-star.github.io/slate-releases/docs/features/home/approvals.md).

## Limits on unattended runs

An automation runs with nobody watching, so Slate bounds it:

* **One $5 spend limit for the whole run.** Slate adds up the cost the agent reports. When nothing is left, the run stops and says so.
* **12 turns per run** for an agent that reports no cost.
* At most **3 agents run at once** for Home and automations together. A message waits for a free one.

Home has no step limit in Slate: the agent loops over its own tools until it is done. See [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md).
