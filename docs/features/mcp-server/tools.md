# Tool Reference

Slate's MCP server exposes 25 tools, each belonging to one place in Slate (listed with the reason in `packages/catalog/src/en/mcpCoverage.json`, ADR 0127). An app that draws views gets two more ([Views](#views-in-apps-that-draw-them), ADR 0129). Rules for workspace resolution and what an agent may not do: [Tool Rules](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md).

Almost every tool takes an optional **`cwd`** (your working directory), resolved to the workspace that owns the folder; only `slate_capabilities` takes none. Every tool carries the standard MCP labels (title, read-only, whether a write can replace). Claude Code loads `recall` and `remember` at session start, the rest on demand.

## Docs

| Tool | Purpose |
| --- | --- |
| `create_doc` | Create a typed doc: `title`, `doc_type`, `user_approved:true`, `markdown`, optional `parent_id`, `source_ref`. Without `parent_id` it files under the project holding `cwd`, labelled with the checked-out git branch. Refused without `markdown` or unless the user said yes first. A second call for the same type on the same branch rewrites that doc. |
| `get_doc` | Read one doc by `id` or `target`: title, icon, breadcrumb path, Markdown body. An `id` this workspace does not hold is looked up in the workspaces you belong to: a doc shared there comes back with `shared: true`, its author and `updated_at` (needs a cloud sign-in). Old name `workspace_doc` still answers for one release. |
| `append_to_doc` | Append Markdown to a doc, by `id` or `target`. Replies with id, title and path. |

Find docs with `recall` and `kind: "docs"`. Plain docs, rename, move and trash are app-only ([why](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md#what-an-agent-cannot-do-over-mcp)).

## Memory

| Tool | Purpose |
| --- | --- |
| `remember` | Save one typed memory (`kind`: `decision`, `preference`, `state`, `fact`, `lesson`), filed by `cwd`. With `kind: "decision"` it also takes `rejected` (the options turned down) and `confidence` (`high`, the default, `medium`, `low`: 0.95, 0.8, 0.6), and writes a decision doc with the full reasoning under the project; the reply's `id` is that doc. Old name `record_decision` (`title`, `reasoning`, `alternatives`, `confidence`, `outcome`) still answers for one release. A near-duplicate strengthens an existing memory; a new claim on the same slot replaces the old. `replaces`: refs this corrects and retires. `when` makes a lesson fire on a matching tool call: `{tool: "shell", match}` or `{tool: "read" \| "edit", path}` (a match-everything pattern is refused). `index: true` pins it into the project index; `unindex` removes refs. Reply: `saved`, `memory`, up to 3 `neighbours`. Refused, with reason, when: the text is passing status, a git snapshot or a tool call's markup; a `decision` has no reason; an agent memory holds 3+ numbers (put them in `reason`); a `state` has no `subject`; the project's [memory settings](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#what-a-project-keeps) turn off that writer, kind or word; AI memory care is on and `reason` is under 4 words; or the workspace is read-only for you. A title-like line is kept with a `warning`. A claim contradicting a firmer memory waits for review in Memory. |
| `recall` | The one search. When the query is about the branch (names it, or asks what is open or in progress) the first result is the branch brief, with the `target_doc_id` writes file under. Then memories (BM25 over sentence, tags, citation, reason, plus small recency and confidence lifts), then docs whose text matches (not title-only matches or captured session docs). A memory under 0.7 of the best memory's score is left out. Each memory is a line with `ref` (`m:7f3a2b1c`) and citation, marked `weak` for a thin match and `citation: changed` or `gone` when its code moved. Default 8 results, max 25, at most half memories. `scope: "all"` searches every project. `scope: "workspaces"` searches what others shared across your workspaces instead (see below). `also`: up to 3 other phrasings, merged by rank. Then up to 2 artifacts matching every word (`artifact_id`, title, snippet, `link`). `kind: "docs"`: docs only, up to 20 hits with snippets. `as_of` (`2026-08-01`): memories only, as believed at the end of that day, later-replaced ones marked `until`. |
| `get_memory` | Read memories in full by `refs` (max 20): claim, reason, `citation` (`same`, `changed`, `gone`, `unchecked`), `evidence` (tools that confirmed it), `history` (what it replaced and was replaced by). Unknown refs return under `unknown`. |
| `list_memories` | For a tidy the person agreed to: the project's memories, oldest first, max 100 per call from `offset`, each with ref, kind, text, whether resting. Memories hidden from sessions are left out. |
| `propose_memory_change` | Propose a `merge` (2–50 `refs` into one `text`), a `retire`, a `lesson` (`refs` into one lesson `text` with its `when`), or a `skill` (a lesson as a skill file in the project folder; Slate offers these itself). Nothing changes until the person accepts it in Memory → Needs review, or in the [Review view](#views-in-apps-that-draw-them) of an app that draws views. `proposal_refused`: ref outside the project (unplaced refs under `unknown`), merge or lesson with no text, lesson with no `when`, or text the save rules refuse. |
| `log_mission_progress` | Report a session's work on its branch: `cwd`, `summary`, optional `branch` (if the work was on another git branch), `goal`, `open_items`, `decisions`. The summary becomes a session entry, goal and open items feed the branch's next brief, each decision becomes a memory, all labelled with the branch. Each item passes the memory policy and admission rules; refusals come back in `refused`. Makes no doc. |

## Workspaces

`recall` with `scope: "workspaces"` searches what others published across your workspaces: `memory` (one sentence each, with author) and `docs` (title, doc type, author, excerpt). Default 8 each, max 25. `get_doc` reads one of those docs in full by its `id`. Both read the [cloud](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md), need a cloud sign-in and are read-only. For a workspace you are not in, Row Level Security returns an empty result. Signed out, they say so. Old name `recall_workspaces` still answers for one release.

## Activity

| Tool | Purpose |
| --- | --- |
| `activity` | What you did across tools and projects. `view: "recent"` (default): sessions newest first over `days` (default 1, max 90); one session is one conversation the tool gave an id; each row has a `docId` (its session doc, else its project's). `view: "parked"`: branches left with UNCOMMITTED changes and not revisited; `stale_after_hours` default 48. `limit` default 10, max 50. |

## Your Tasks list

| Tool | Purpose |
| --- | --- |
| `my_tasks` | Your [Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md) list. `view: "today"` (default): your overdue or due-today to-dos, grouped as the Tasks tab does, plus the first 10 open items from your tools, each with its key (`PROJ-12`, `acme/api#412`). `view: "all"`: every open to-do and up to 100 items. Omitted counts: `more_tasks`, `more_items`. No meetings. Old name `my_work` still answers for one release. |
| `update_my_task` | Add a line to your list (no `id`, with `title`) or change one (`id`): tick (`done: true`), reopen (`done: false`), rename, or set/clear a reminder (`in_minutes` or `at` ISO instant; `clear_reminder: true`). Pass one of the three: two at once is refused, not resolved. A reminder notifies when due. Jira, Linear and GitHub items are refused, naming where to change them. Old name `update_my_work` still answers for one release. |

## Apps you connected in Slate

| Tool | Purpose |
| --- | --- |
| `connected_tools` | Apps this workspace connected in [Connect → Integrations](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#integrations) (Linear, Notion, Jira…) and each one's read-only tools. `app` lists one. An app whose tools cannot be listed says why (for example, sign in again). |
| `read_connected` | Read through an app: `tool` is `<app>__<tool>` as `connected_tools` lists it, `args` are its own. Slate calls with its own sign-in, so your agent needs no MCP server for the app. Reads only; writing tools are refused. The answer is the app's text, marked `trust: "outside"`, cut at 20,000 characters; the same read within a minute answers from the last call. |

Both need Slate open (else `slate_not_running`) and read only the apps of the folder's workspace. Your rules treat a read through Slate as a call to the app: a Deny of `mcp__linear__*` holds here too.

## Other agents

| Tool | Purpose |
| --- | --- |
| `handoff` | Leave one note for the other agents in the project, or for one with `to`. Each sees it once at the start of its next turn. Notes that only narrate work in progress are refused, with the reason. |
| `live_sessions` | Every AI session running now: tool, status (working / needs_you / idle), project, git repository, branch, title, last thing said, last active, goal and next unchecked item, doc id (`targetDocId`), folder (`cwd`). Read a session's doc by passing that doc id and `cwd` to `get_doc`. `cwd` limits to your project; your own `sessionId` leaves you out. |

When another agent works in the same project, Slate says so once at the start of a turn, with that session's own words and a doc id. Agents talk by notes: `handoff` with a `to` is a message, and a reply is another `handoff` addressed back. A note with no `to` is for everyone working here. There is no channel, inbox or queue.

## Artifacts and widgets

| Tool | Purpose |
| --- | --- |
| `publish_artifact` | Publish a doc in the **Artifacts** tab. Send `content` (whole doc), `file_path` (a file the tool wrote, inside its `cwd` or the system temp folder) or `edits` (`{old, new}` changes to the newest version; each `old` must appear exactly once). Dot files, files in dot folders below home (such as `.ssh`) and a `cwd` of home or `/` are refused. A new artifact needs `title` and `kind` (`html` or `markdown`); a new version passes the earlier `artifact_id` and keeps both unless given. Optional `description` and `live: true` (the artifact reads this workspace with `slate.query`: docs, a doc, memories, sessions of its project, read-only, up to 5,000 rows each; served with no network, scripts only from cdnjs, jsDelivr, unpkg). Changing `live` adds a version; identical content adds none. Returns `artifact_id`, `version`, `link` (a `slate://` address). `invalid_artifact`: empty title or content, over 5,000,000 characters, file outside the two folders, dot file, too-wide `cwd`, or an edit whose old text is missing or repeated. |
| `get_artifact` | Read before changing: `artifact_id`, optional older `version`. Returns title, kind, description, version read, newest version number and full `content`. Without `artifact_id`: every artifact, newest first. Unknown id: `artifact_not_found`. |
| `publish_widget` | Build and publish a [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) (React files Slate builds and runs in **Widgets**). New: `files` (`[{path, content}]`) and `title`. New version: `widget_id`, only changed files (the rest kept), `delete_paths` to remove. A build error answers `build_failed` with each error's file, line, text and saves nothing. Optional `description`. Returns `widget_id`, `version`, `built_ms`, `published` (false if no file changed), `link`, and `render`: whether the window ran the new version without error (`status` `ok`, `failed`, `pending`; on failure `problems` and a one-line `next`). |
| `get_widget` | Read before changing: `widget_id`, optional older `version`. Returns title, description, version read, newest version, `files`, `render`, `playbook` (build steps and rules), `sdk` (TypeScript declarations every build is checked against) and `examples`: `curated` (Slate's) and `yours` (other widgets in the workspace as `{ widget_id, title, description }`, quoted as data). Without `widget_id`: every widget. Unknown id: `widget_not_found`. |

A widget's id given to `get_artifact` or `publish_artifact` answers `is_a_widget` ("This is a widget. Use get_widget / publish_widget."); a doc's id given to the widget tools answers `not_a_widget`, naming the artifact tools. `get_app` and `publish_app` still answer for one release as deprecated aliases; they take `app_id`.

## Project setup

| Tool | Purpose |
| --- | --- |
| `propose_setup_change` | Suggest a change to the project's AI setup: `kind` (`fix`, `copy`, `create`, `improve`, `remove`), `item_kind` (`skill`, `command`, `subagent`, `mcp`), item name, `evidence` (the sentence the person reads). Optional `tool` (for `copy`), `file`, `draft` (whole file, for a skill or subagent `create`). Waits in Toolkit › Suggestions; writes nothing until accepted. Refused: `not_a_project` (`cwd` not a folder here); `invalid_proposal` (a `copy` without `tool`, a `draft` on anything but a skill or subagent `create`, a name not lower-case letters, digits, `-`, `_`); `already_offered` (same suggestion waiting or answered). |

## Automations

| Tool | Purpose |
| --- | --- |
| `run_automation` | Without `id`: this workspace's [automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md), each with `id`, `name`, `description`, `trigger`, `enabled`, `last_run`, `last_error`. With `id`: start that automation now, as **Run now** does, and get `run_id`; a run already going is joined (`started: false`). The run shows in Slate and asks before it acts, as any run does. Needs Slate open (else `slate_not_running`); an automation that cannot start answers `run_not_startable` with the reason. Making or changing an automation is done in Slate. |

## Agent runs

Only for a session a Slate agent run started (first prompt "Slate task … (token)"). Listed in every session; outside a run `get_agent_run` answers `no_task`.

| Tool | Purpose |
| --- | --- |
| `get_agent_run` | The run's current step, attempt and instructions; on the first step, the task's [card](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md#a-session-started-from-a-task). Takes `cwd` and the `token` from the first prompt, or a `task_id`. A blocked run returns why and tells the agent to wait. |
| `report_agent_run_step` | Report the step `get_agent_run` gave: `task_id`, `step`, `attempt`, an `outcome` (done, blocked, needs_input, failed), a short `summary`, optional `body` as JSON text. A report for an old step is refused and names the current one. |

## Views in apps that draw them

Some apps can draw a small view inside their chat: Claude Desktop and VS Code today, and Cursor and Goose by their own docs (the MCP Apps standard). When an app says so at connect time, three answers are drawn as a view in Slate's own look, light or dark:

* `live_sessions` as **Needs you**: the sessions waiting on you, and a count of the rest.
* `my_tasks` as **Tasks**: your list, with a box to tick a line done (it calls `update_my_task`).
* `memory_proposals` as **Review**: the memory proposals waiting for you, drawn as Memory's own review.

Only such an app also gets these two tools:

| Tool | Purpose |
| --- | --- |
| `memory_proposals` | The memory proposals waiting for you: merges, retirements and lessons, with the memories each one touches. No arguments. Says so in a sentence when none wait. |
| `resolve_memory_proposal` | Accept or reject one proposal: `id`, `accept`. Only the Review view calls it, when you click. The app keeps it from the model, so an AI cannot accept a proposal by itself. |

A terminal cannot draw a view. It gets the same tools and the same text as before, and neither of the two above. A view loads nothing from the network; it reaches Slate only through the tools the app calls for it.

## Contract

| Tool | Purpose |
| --- | --- |
| `slate_capabilities` | Contract version, every place in Slate with its tools (or `view`: the person decides it in Slate, or `app-only`) and why, each tool's access level and approval policy, schema hash. Read-only, no arguments. A tool's access level is its `readOnlyHint`, so they cannot disagree. |

## See also

* [Tool Rules](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tool-rules.md): workspace resolution, secrets, targets
* [Slate as an MCP Server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md)
* [Connecting Your Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/connecting.md)
* [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md) — the memory tools in depth.
