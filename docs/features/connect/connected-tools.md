# Connected MCP tools

When an agent works in Slate, on Home or in an automation, it reaches the MCP servers its own config declares, plus the apps you connected in Slate. Here, Slate reaches other servers. For the other direction, your agents reaching Slate, see [Slate as an MCP server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md).

## Servers from the agent's config

Slate keeps no server list of its own. The agent's command-line tool loads the servers in its config, for the profile it runs under and the project's folder, and reports which ones connected. [Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#agents) sets the profile; an agent's dialog lists its servers and how each stands ([An agent's dialog](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/dialog.md)). Change a server in [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md) or in the agent's own config.

## Apps you connected in Slate

An app connected in [Connect → Integrations](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/integrations.md), such as Linear, Notion or Jira, can be read from every session, even when the agent's config has no server for it, while Slate is open. Slate's `connected_tools` tool lists the apps and their reading tools, and `read_connected` reads through one with Slate's own sign-in. Tools that change anything are never offered ([MCP tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)).
