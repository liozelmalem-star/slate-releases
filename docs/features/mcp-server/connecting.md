# Connecting Your Agents

Any MCP-capable tool can connect and share Slate's memory. What it can then do: [Tool Reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md).

## From the app: Connect → Agents

In **[Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md)**, pick the tool and account and switch Slate on. It registers for that config directory, so it holds for every project here. [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) can also project MCP configs to every tool.

Every session talks over HTTP to the running Slate app (`http://127.0.0.1:47366/mcp` for the first account on the Mac; each other Mac user gets the next port, 47367 and up). The entry carries a private key in a header, so Slate writes it into the tool's config file and makes the file readable by you only. Existing setups switch over on the next launch of Slate. The key opens Slate's MCP server and nothing else. Slate does not write it into a config file that is a link (for example into a dotfiles folder): connecting that tool shows an error, and you replace the link with a plain file.

**Another program on Slate's port.** If something else holds the port when Slate starts, Slate shows a red line at the top of the window with the port number: agents cannot reach Slate. Run `lsof -i :<port>` to see which program it is, quit it, then restart Slate. Two Mac users whose ids are 64 apart share a port, which shows the same line for the second one.

**Slate must be running.** With it closed, the tool lists `slate` as failed and the session-start hook says so. Open Slate and start a new session (Claude Code: `/mcp` also reconnects).

## By hand

The app's entry is the supported way. To write it yourself, read the key from `slate-mcp-token` beside your workspace database and `chmod 600` the config. Claude Code, `~/.claude.json`:

```json
{
  "mcpServers": {
    "slate": {
      "type": "http",
      "url": "http://127.0.0.1:47366/mcp",   // your port: 47366 for the first account, one more for each next user
      "headers": { "x-slate-token": "<the key>" }
    }
  }
}
```

Other tools spell it their own way: Cursor `{url, headers}`, Gemini `{httpUrl, headers}`, OpenCode `{type: "remote", url, headers}`, Codex `url` and `http_headers` under `[mcp_servers.slate]`.

### Claude Desktop and other stdio-only clients

Run the binary inside the app bundle, with no args:

```
command: /Applications/Slate.app/Contents/MacOS/slate-mcp
args:    []
```

That is one process per client, so the agents use the HTTP entry.

## Verify it works

Ask your agent:

> "Use the slate_capabilities tool to check the Slate contract, then use recall with query 'test' to check if Slate is connected."

An answer mentioning your workspace means it works; empty results are fine.

## The contract

Generated from the MCP tool registry and checked by `packages/mcp/test/tools/contract.test.ts`.

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
| `record_decision` | write | — |
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
| `my_tasks` | read | — |
| `update_my_task` | write | — |
| `connected_tools` | read | — |
| `read_connected` | read | — |
| `recall_workspaces` | read | — |
| `workspace_doc` | read | — |
<!-- slate-contract:end -->

A tool can save a typed document and add to a doc, and nothing else. Saving a document of a type the project already has on that branch rewrites that doc. Every tool carries the standard MCP labels, so a client can skip asking before a read. See [Tool Rules](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md).

A failed call answers JSON with `error.code` and `error.message`:

* `invalid_arguments` — an argument the tool's schema rejects (a missing `id`, a wrong type).
* `unknown_tool` — a tool name this server does not have.
* `approval_required` — `create_doc` without `user_approved:true`.
* `content_required` — `create_doc` for a typed doc with no `markdown`.
* `target_not_found`, `target_archived`, `ambiguous_target` — a doc, or a project and branch label, that does not resolve to exactly one live doc.
* `invalid_request`, `not_found` — a bad `update_my_task` call (such as both `in_minutes` and `at`, or a time with `clear_reminder`), or an item that is not there.
* `proposal_refused` — a `propose_memory_change` the project's memories cannot take.
* `not_a_project`, `invalid_proposal`, `already_offered` — a `propose_setup_change` for a folder that is not there, a change that could never apply, or one the project already had.
* `artifact_not_found`, `invalid_artifact`, `is_a_widget` — the artifact tools.
* `widget_not_found`, `invalid_widget`, `build_failed`, `not_a_widget`, `version_conflict` — the widget tools (`version_conflict`: someone published a newer version while this one built; publish again).
* `wrong_workspace` — the `cwd` belongs to another workspace than the session's ([Tool Rules](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md#which-workspace-a-call-reaches)).
* `no_task` (`get_agent_run` outside an agent run); `stale`, `closed`, `invalid` — a refused `report_agent_run_step`.
* `slate_not_running` — `connected_tools` or `read_connected` while Slate is closed.
* `store_unavailable` — the workspace file is behind this build, so this process cannot change it.
* `internal_error` — anything else, with its message.

A refused `remember` or `record_decision` is not an error. The answer says `saved: false` with the reason.

Memory lands in the workspace the call's `cwd` belongs to (Personal unless the folder belongs to a shared one). Read, edit or retire entries under **Memory**.

## Troubleshooting

- **"command not found" / "no such file".** Slate is not in `/Applications`: install per [Getting Started](https://liozelmalem-star.github.io/slate-releases/docs/overview/getting-started.md#1-install), or from source `bash scripts/install.sh`.
- **Tools appear but calls fail.** The workspace database may not exist yet: open the app once; it creates `~/Library/Application Support/app.slate.workspace/workspace.db`. If you moved Personal, the server opens the moved file.
- **From a git clone.** Run `node packages/mcp/dist/index.js`, built by `yarn workspace @slate/mcp build`.

## See also

* [Slate as an MCP Server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md)
* [Tool Reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)
* [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) — the screen that installs Slate, and what it writes.
* [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md)
