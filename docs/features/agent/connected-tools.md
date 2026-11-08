# Connected MCP Tools

Home reaches whatever MCP servers your agent's CLI can reach. This guide covers that direction, with Slate as the client; for the other, see [Slate as an MCP Server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md).

## Where servers come from

Home keeps no server list. The CLI loads the servers in its own config (the account's and the project directory's) and reports which connected. [Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) sets the account a tool runs under (a group or project may override it); edit its servers where the CLI keeps its config. The top bar's **tools** chip shows the count the CLI reported, names on hover, *· 1 failed* in amber, and keeps it after the turn ([details](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/approvals.md#what-home-shows-about-the-agent)).

## Apps you connected in Slate

An app connected in [Connect → Integrations](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#integrations) (Linear, Notion, Jira…) is readable from every session, even when the tool's config has no server for it, while Slate is open. `connected_tools` lists the apps and their read-only tools; `read_connected` reads through one with Slate's own sign-in. Tools that write are never offered. See [Slate's MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md#apps-you-connected-in-slate).

See also: [Curated MCP Commands](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/mcp-commands.md), [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md).
