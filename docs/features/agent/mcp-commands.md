# Curated MCP Commands

A curated command routes a request straight to one of Slate's **own** workspace tools (create a doc, search notes, ask a shared workspace) without the model choosing, so a small model works.

## The pipeline

```
request → keyword routing → resolve the tool → prefill known args → model fills the rest (structured output) → one tool call
```

"Create a plan about retries" resolves to `create_doc` with `doc_type` set; the model supplies only the title. The model returns JSON for the missing fields only, and the app merges it with the arguments it injected.

A read tool runs at once. A write asks first, except under Auto-edit and Full auto, where only **Create an automation** and **Run an automation** still ask ([Approvals](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/approvals.md#autonomy)).

## What matches

- A command that writes (doc, project, agent, memory) matches only when your message opens like it ("new project for…", "draft a plan…", "remember that…", after an optional "please" or "can you"). "What's new in this project" is never a command.
- Anything unmatched goes to the agent's own CLI, which loops over its own MCP tools. A turn is one Slate tool call or a CLI handoff.

## Both halves of memory

Home reads this workspace's memory (`recall_memory`) and what colleagues wrote in every [workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) you belong to, even ones this machine has not materialised (`recall_workspaces`, then `workspace_doc`). Questions like "what does the team know about retries" or "has anyone solved this before" reach the shared half; "what do I know about…" stays local. A shared answer names its author.

Naming a workspace routes to the shared tools, scoped to it, with no MCP connection needed ("what data do I have in my Apollo workspace"). The name counts only beside a team word (*workspace*, *team*, *shared*), so "fix the Apollo timeout bug" stays ordinary.

See also: [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md), [Connected MCP Tools](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/connected-tools.md), [Agents & Model Providers](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md).
