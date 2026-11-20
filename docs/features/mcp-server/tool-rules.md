# Tool rules

Every call in the [tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md) follows these rules. Read them when a call is refused or reaches the wrong workspace.

## Which workspace a call reaches

**One session, one workspace.** The first call that names a working folder (`cwd`) ties the session to the workspace that holds that folder. Later calls without a `cwd` run there.

* If that folder later joins a project in another workspace, or leaves one, the session follows the folder.
* A `cwd` in another workspace is refused with `wrong_workspace` and the session's workspace name. Start a session in that workspace's folder instead.
* A folder matches its project however it is written: through a link, with `..`, or by its real path.
* Before the first `cwd`, a call goes to Personal.

Three calls cross workspaces, on purpose: `live_sessions` shows every running session on this Mac, and `recall` with `scope: "workspaces"` and `get_doc` on a shared doc read the workspaces you belong to in the cloud. An agent run's agent reaches its run by the run's token, or from inside the run's folder, wherever it lives.

## Secrets

Slate replaces keys, tokens and passwords it recognises with `[secret]` in what an agent writes through `remember`, `create_doc`, `append_to_doc`, `log_mission_progress`, `update_my_task`, and the summary of `report_agent_run_step`. It does not change `publish_artifact` and `publish_widget`, which carry code, or the `body` of `report_agent_run_step`.

## What an agent cannot do over MCP

An agent can save a typed doc and add to a doc. It cannot create a plain doc, rename, move, duplicate, move to Trash, or find and replace. Those are actions you can undo in Slate, and MCP has no undo. What an agent writes can be undone where the reverse is exact: a new doc goes to Trash, a new memory is retired.

## Find a doc by target

`get_doc` and `append_to_doc` take a **`target`** instead of an id:

| Field | Meaning |
| --- | --- |
| `kind` | `branch` for the branch's overview, `knowledge_doc` for a typed doc under it |
| `cwd` | Your working folder. It finds the project, and its current branch when `branch` is left out |
| `branch` | The branch to look in |
| `doc_type` | The doc's type, such as `plan`, `design` or `bug-report` |
| `title` | The doc's title, when `doc_type` is not enough |

Slate writes only when the target matches exactly one doc. A target that matches more than one is refused with `ambiguous_target`.

## Home has its own tools

Home calls Slate's operations directly, not over MCP, so its tool list differs a little: it has no `slate_capabilities`, and it keeps a few finer tools of its own. See [Curated MCP commands](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/commands.md).
