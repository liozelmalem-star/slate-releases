# Core concepts

Slate rests on six ideas. Read them once and every screen makes sense.

## Sessions are what you see first

A session is one conversation with an agent, in one folder. [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md) shows every session on this Mac while it runs: the ones Slate started and the ones you started in your own terminal. A session waiting on your answer is marked **Needs you** and comes first.

## Agents are the tools you already have

An agent is an AI coding tool Slate connects to: Claude Code, Codex, Cursor, GitHub Copilot, Antigravity, OpenCode, Gemini, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code or Auggie. Slate runs each one's command-line program under the sign-in you already have. Slate ships no model and asks for no API key. See [Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/agents.md).

## A project is a folder you open

A **project** is one folder, usually a git repository. A **group** is a set of projects you make and name; its memory and settings reach every project in it. Slate records the sessions that run in a project's folder. A session in any other folder shows in Sessions under **No project** while it runs, and is not kept.

Inside a project you keep **docs**: plans, designs, reviews, bug reports and notes. A git branch is a label on Slate's records, never a doc of its own. See [Projects](https://liozelmalem-star.github.io/slate-releases/docs/features/projects.md).

## Memory is shared by every agent

Slate keeps one memory for all your agents. It learns from the sessions it captures, and connected agents save to it with `remember` and read from it with `recall`. Memory is filed under the project or group it belongs to, so a session gets what applies to its folder. See [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md).

## Toolkit and Connect set up every agent at once

[Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md) holds your skills, rules and instructions, and writes them into each agent's own setup. [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) holds which agents each workspace uses, under which account, and the MCP servers and integrations they reach.

## A workspace is shared or private as a whole

A **workspace** holds projects, docs, memory and activity, in one file on your Mac. **Personal** is yours and starts private. A workspace you share is shared whole: everything in it is readable by its members. Nothing is shared doc by doc, so private work belongs in a workspace you have not shared.

Each doc has one writer, its author. A teammate's doc opens read-only. See [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).
