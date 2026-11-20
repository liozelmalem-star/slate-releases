# Session capture

Slate keeps every session your agents run, so you can find it later and so Activity and
Memory know what happened. It reads the conversation files your agents already write on
this computer. It sends nothing to the network.

## Turn it on

An agent is read once you turn it on, in setup or in Connect → **Agents**. Its sessions
appear within a few minutes. An agent turned on in any workspace is captured for all of
them: [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md) covers the whole computer.

## Which agents

- **From their transcript files**: Claude Code, Codex, Gemini, Cursor and GitHub
  Copilot.
- **From their own database, read-only**: OpenCode, Hermes Agent, Goose, Kilo Code and
  Kiro.

Which agents are verified is in [Features by agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agents/features-by-agent.md).

Every profile a workspace or project names is watched, wherever its folder is. Slate also
suggests any other agent that writes conversation files under your home folder.

## What a captured session holds

Each session is kept with its first request, a one-line summary, the agent and model that
ran it, the tokens it used and the git branch it ran on. Its body is a digest: every turn
you typed, where your requests and corrections live, and the final outcome.

A captured session opens read-only, with **Session — read only** under its title. It is
listed in [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md), never in the Projects tree.

**A cloud session brought back.** A [cloud session](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md) runs on the
vendor's computer, out of Slate's sight. When you bring a Claude Code cloud session back and
send a message, its whole conversation is written on this computer and captured. Nothing is
captured before that first message.

## Agents' own memory

Claude Code and Gemini each keep a memory folder of their own. Slate reads them, so one
agent's learning reaches the others:

- A file is read once its folder is inside a project or group you added.
- Each file becomes one memory written by that agent, citing the file.
- A changed file replaces its memory, and a removed file retires it.
- Slate never writes to these folders.

Codex keeps its memory per user, with no project folder, so Slate does not read it. Bring
it in with [Import](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/import.md) instead.

## Turn capture off

- **Everywhere**: **Auto-capture** in Automations › **Built-in**. Off stops capture at once
  and stays off after a restart. Capture also stops when you quit Slate; at the next launch
  it picks up the sessions run in between.
- **For one project**: in the project's **Settings…** → **Memory**, turn
  **Capture sessions** off. Sessions in its folder are not saved, the agents' memory files
  there are not read, and an import skips what it would file into that project
  ([What a project keeps](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#what-a-project-keeps)).
