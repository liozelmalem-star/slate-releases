# Curated MCP commands

A curated command sends a request in Home straight to one of Slate's own tools, such as creating a doc, searching memory or asking the shared workspaces, without the model choosing the tool. That is why Home works well on a small model.

## How a request runs

1. Slate matches your words to one command.
2. It fills in the arguments it already knows, such as the project and the doc type.
3. The model fills in only what is missing, such as a title.
4. Slate makes one tool call.

"Create a plan about retries" becomes `create_doc` with the type set to plan; the model writes only the title.

A command that only reads runs at once. A command that writes asks you first. Under **Auto-edit** and **Full auto** it runs without asking, except **Create an automation** and **Run an automation**, which always ask, because they spend your agent's tokens. See [Approvals](https://liozelmalem-star.github.io/slate-releases/docs/features/home/approvals.md).

## What matches

* A command that writes, such as a doc, a project, an automation or a memory, matches only when your message starts like it: "new project for…", "draft a plan…", "remember that…", after an optional "please" or "can you". "What's new in this project" is never a command.
* Anything that does not match goes to your agent, which works with its own tools.

## Your memory and your team's

**Recall what Slate remembers** searches this workspace's memory. **Ask the shared workspaces** searches what colleagues shared in every workspace you belong to, even ones this Mac has not added. "What does the team know about retries" or "has anyone solved this before" go to the shared workspaces; "what do I know about…" stays in yours. A shared answer names its author.

Naming a workspace sends the question to that workspace: "what data do I have in my Apollo workspace". The name counts only beside a word such as *workspace*, *team* or *shared*, so "fix the Apollo timeout bug" stays an ordinary request.

Your other agents reach the same two through MCP, as `recall` with `scope: "workspaces"` and `get_doc`. See the [tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md). **Run an automation** is `run_automation` there. **Create an automation** has no MCP tool.

See also: [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home.md), [Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/agents.md).
