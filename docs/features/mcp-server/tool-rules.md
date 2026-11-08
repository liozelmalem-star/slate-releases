# Tool Rules

Rules for every call in the [Tool Reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md). Read them when a call is refused or reaches the wrong workspace.

## Which workspace a call reaches

**One session, one workspace.** The first call with a `cwd` ties the session to that folder's workspace; later calls without `cwd` run there. A `cwd` from another workspace is refused with `wrong_workspace` and the session's workspace name: start a session in that workspace's folder instead. Before the first `cwd`, a call without one gets Personal. Only `live_sessions`, `recall_workspaces` and `workspace_doc` cross workspaces. An agent run's agent reaches its task by the task's token, or from inside the task's folder, wherever the task lives. No tool is marked as reaching outside Slate.

## Secrets

Slate replaces recognised keys, tokens and passwords with `[secret]` in what an agent writes through `remember`, `record_decision`, `create_doc`, `append_to_doc`, `log_mission_progress`, `update_my_task` and the summary of `report_agent_run_step`. It does not do this for `publish_artifact` and `publish_widget` (they carry code) or the `body` of `report_agent_run_step`.

## What an agent cannot do over MCP

A tool can save a typed doc and append to a doc. It cannot create a plain doc, rename, move, duplicate, trash or find-and-replace, because those are undoable gestures in Slate and MCP has no undo. An agent's MCP writes can be undone when the inverse is exact: a new doc goes to Trash, a new memory is retired.

## Resolving a target

`get_doc` and `append_to_doc` take a **`target`** instead of an id:

| Field | Meaning |
| --- | --- |
| `kind` | `branch` for the branch overview, `knowledge_doc` for a typed child under it. |
| `cwd` | Your working directory. It anchors to the project, and to its active branch when `branch` is omitted. |
| `branch` | The branch to scope to. |
| `doc_type` | The knowledge doc's type, such as `plan`, `design`, `bug-report`. |
| `title` | The doc title, when `doc_type` is not enough. |

Slate writes only when the target resolves to exactly one doc. An ambiguous target is refused.

## Two tool surfaces

Operations are exposed over MCP (your agents) and in-process (Home's commands). The lists differ on purpose: `slate_capabilities` means nothing in-process, and Home keeps a few finer tools (`recent_activity`, `search_content`, …). `packages/shared/src/tools/operations.ts` declares each concept once with its surfaces.
