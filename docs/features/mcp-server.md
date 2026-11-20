# Slate as an MCP server

Slate runs an MCP server, so every agent you connect works from the same workspace and the same memory: what one agent saves, the next one recalls. All 16 [agents](https://liozelmalem-star.github.io/slate-releases/docs/features/agents.md) can connect. To connect one, see [Connecting your agents](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/connecting.md).

## What an agent is asked to do

Every connected agent gets one short standing instruction. The details are in each tool's own description.

* **At the start of a task**, call `recall` with the question *current branch goal and context* and the working folder. It returns the brief for the branch, the project's conventions and its memories. An agent that Slate already briefed skips this.
* **During the task**, save a decision with `remember`, with its reason and what it turned down. Ask you before saving a plan, review, bug report or design with `create_doc`. If a memory's citation says `changed`, read the code first, and correct the memory if it is wrong.
* **At the end**, call `log_mission_progress` once, and save at most two memories: only what will change how a later agent works.

To check the connection, an agent calls `slate_capabilities`. It only reads, so it changes nothing. How `recall` ranks results and how `remember` avoids duplicates is in [Search and save](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).

## Your workspace and your team's

`recall` searches the workspace that holds the agent's working folder, on this Mac. In a shared workspace, that includes your teammates' work your copy holds.

`recall` with `scope: "workspaces"` searches what was shared in every workspace you belong to, read from the cloud, including workspaces this Mac has not added. `get_doc` reads a shared doc whose id is not on this Mac. Both only read, and a shared result is marked `shared: true`, so your own knowledge and your team's never mix. See [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).

## What an agent can and cannot do

Each part of Slate is one of three kinds:

* **The agent does it** with a tool: recall and save memory, read and add to docs, publish artifacts and widgets, read your Tasks list, start workers.
* **You decide it in Slate**: accepting a memory proposal or a suggested setup change. An agent can propose; only you accept.
* **Only in the app**: Home, Trash, Settings and your account.

The [tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md) lists all 27 tools and their arguments. [Tool rules](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md) says which workspace a call reaches and what an agent may not do.

## See also

* [Connected MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/connected-tools.md): the other direction, where Slate reads the MCP servers your agents already have.
