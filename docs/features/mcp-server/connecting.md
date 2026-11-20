# Connecting your agents

Any agent that speaks MCP can connect to Slate and share its memory. What it can then do is in the [tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md).

## From Connect

Open **[Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md)**, pick the agent and its account, and switch Slate on. Slate adds itself to that account's setup, so it holds for every project. [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/toolkit.md) can also write MCP setups for every agent.

The entry starts `slate-mcp`, a program inside the app. It opens your workspace itself, so the agent has Slate's tools whether or not the Slate window is open. The entry holds no key.

Three tools need the Slate app open: `connected_tools` and `read_connected` (Slate holds those integrations' sign-ins) and `run_automation`. With Slate closed they answer `slate_not_running`. Every other tool works.

**Sessions Slate starts itself**, from Sessions or Tasks, reach the running app over a port on this computer instead: 47366 for the first user account on the Mac, then 47367 and up. If another program holds that port when Slate starts, a red line at the top of the window names the port. Run `lsof -i :<port>` to find the program, quit it, and restart Slate.

## One click in VS Code or Cursor

Install Slate first. These links only add an entry that runs the app's `slate-mcp`, so they do nothing without the app.

[Install in VS Code](vscode:mcp/install?%7B%22name%22%3A%22slate%22%2C%22command%22%3A%22%2FApplications%2FSlate.app%2FContents%2FMacOS%2Fslate-mcp%22%2C%22args%22%3A%5B%5D%7D) · [Install in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=slate&config=eyJjb21tYW5kIjoiL0FwcGxpY2F0aW9ucy9TbGF0ZS5hcHAvQ29udGVudHMvTWFjT1Mvc2xhdGUtbWNwIiwiYXJncyI6W119)

## By hand

Connect is the supported way. To write the entry yourself, run the program inside the app, with no arguments. For Claude Code, in `~/.claude.json`:

```json
{
  "mcpServers": {
    "slate": {
      "type": "stdio",
      "command": "/Applications/Slate.app/Contents/MacOS/slate-mcp",
      "args": []
    }
  }
}
```

Other agents spell it their own way: OpenCode `{type: "local", command: [path]}`, Codex `command` and `args` under `[mcp_servers.slate]`. Claude Desktop, VS Code and other clients take the same command.

A client started with no folder, such as Claude Desktop's chat, is asked to call `recall` with the conversation's topic, naming the project if there is one, instead of with a working folder.

## Check that it works

Ask your agent:

> "Use the slate_capabilities tool to check the Slate contract, then use recall with query 'test' to check if Slate is connected."

An answer that mentions your workspace means it works. Empty results are fine.

## The contract

Each tool, whether it reads or writes, and where a write lands:

<!-- slate-contract:start -->
| Tool | Access | Write target |
|---|---|---|
| `slate_capabilities` | read | — |
| `create_doc` | write | — |
| `get_doc` | read | — |
| `append_to_doc` | write | id, target.kind:branch, target.kind:knowledge_doc; ambiguity=refuse |
| `remember` | write | — |
| `recall` | read | — |
| `get_memory` | read | — |
| `log_mission_progress` | write | — |
| `list_memories` | read | — |
| `propose_memory_change` | write | — |
| `get_artifact` | read | — |
| `publish_artifact` | write | — |
| `get_widget` | read | — |
| `publish_widget` | write | — |
| `activity` | read | — |
| `handoff` | write | — |
| `live_sessions` | read | — |
| `propose_setup_change` | write | — |
| `get_agent_run` | read | — |
| `report_agent_run_step` | write | — |
| `start_agent_run` | write | — |
| `wait_for_runs` | read | — |
| `run_automation` | write | — |
| `my_tasks` | read | — |
| `update_my_task` | write | — |
| `connected_tools` | read | — |
| `read_connected` | read | — |
<!-- slate-contract:end -->

A tool can save a typed doc and add to a doc. Saving a doc of a type the branch already has rewrites that doc. Every tool carries the standard MCP labels, so a client can skip asking before a read. See [Tool rules](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md).

A refused `remember` is not an error: the answer says `saved: false`, with the reason. Memory lands in the workspace that holds the call's working folder: Personal, unless a shared workspace holds it.

## Error codes

A failed call answers with `error.code` and `error.message`:

| Code | When |
| --- | --- |
| `invalid_arguments` | An argument the tool's schema refuses, such as a missing `id` or a wrong type |
| `unknown_tool` | A tool name Slate does not have |
| `approval_required` | `create_doc` without `user_approved: true` |
| `content_required` | `create_doc` for a typed doc with no `markdown` |
| `target_not_found`, `target_archived`, `ambiguous_target` | A doc target that does not resolve to exactly one live doc |
| `invalid_request`, `not_found` | A bad `update_my_task` call, or an item that is not there |
| `proposal_refused` | A `propose_memory_change` the project's memories cannot take |
| `not_a_project`, `invalid_proposal`, `already_offered` | A refused `propose_setup_change` |
| `artifact_not_found`, `invalid_artifact`, `is_a_widget` | The artifact tools |
| `widget_not_found`, `invalid_widget`, `build_failed`, `not_a_widget`, `version_conflict` | The widget tools. `version_conflict`: someone published a newer version meanwhile; publish again |
| `wrong_workspace` | The working folder belongs to another workspace than the session's ([Tool rules](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md#which-workspace-a-call-reaches)) |
| `no_agent_run` | `get_agent_run` outside an agent run |
| `stale`, `closed`, `invalid` | A refused `report_agent_run_step` |
| `slate_not_running` | A tool that needs the app, while Slate is closed |
| `run_not_startable` | A `run_automation` id that names no automation, or one with no steps |
| `store_unavailable` | The workspace needs an update that only the Slate app makes. Open Slate once |
| `internal_error` | Anything else, with its message |

## If it does not work

- **"command not found" or "no such file"**: Slate is not in `/Applications`. Install it as in [Install and first ten minutes](https://liozelmalem-star.github.io/slate-releases/docs/overview/getting-started.md#install).
- **The tools appear but calls fail**: open the Slate app once, so it creates your workspace.
