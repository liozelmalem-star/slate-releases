# Where Each Piece of Data Lives

No server holds your workspace, only the docs you hand it. A model sees only what you send it in a turn.

| What | Where |
| --- | --- |
| Personal workspace | Local `workspace.db`; syncs only if you switch sharing on ([Your Data & Export](https://liozelmalem-star.github.io/slate-releases/docs/features/data-and-export.md)) |
| Each shared workspace | Its own local SQLite file, same schema, mirrored to and from Postgres |
| Docs, sessions, memories, decisions | Inside that file |
| Which workspaces this machine has | A local registry (names, colours, your role) so the switcher reads offline |
| [Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md) from other tools | One line per task in the workspace file. Never description, comment or message text; never shared. For a tool learned by Teach Slate: how to read it (tool name, arguments, field paths), never its answer |
| [Agent run](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md#agent-runs-beta) drafts | PR text, ticket update, review comments or reply, so Approve to ship shows them word for word. In the owning store, removed 30 days after the run closes, never shared. The task description is never stored |
| [Receipts](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md#receipts) | One per session, in the file of the workspace holding its folder: last reply's first paragraph, each run's command and result counts, edited paths, commit ids and subjects. Read from the transcript with no model. Never a run's full output; never shared |
| Agent run rules file | Small JSON in the run worktree's own git folder (never committed), or in the run's folder under app data for a reply |
| [Activity](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md#where-the-numbers-come-from) | Per session and model response: times, token counts, model, the tool's own cost. Never prompt or reply text. In `machine.db`, so never shared |
| Slate's own cost | One line every 15 minutes in `slate.log` (`~/Library/Logs/app.slate.workspace/` on a Mac): CPU, memory and wake counts for server, app and web view. Numbers only, never sent; telemetry switches do not reach it |
| Export | A one-click copy of the SQLite file |
| Agent credentials | None stored; the CLIs hold their own |

Credential files, all `0600`:

| File | Holds |
| --- | --- |
| Cloud session (app-data root) | The cloud sign-in; never in a database, so an export cannot contain a live token |
| `slate-server-token` (beside the database) | The credential every local caller presents to the server, capture port included ([how](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/security-details.md#the-local-server)). Persists across launches. No agent's config holds it |
| `slate-mcp-token` (beside it) | A copy sits in each connected agent's MCP entry, in a config made owner-only and never passed on a command line (ADR 0106). It opens Slate's MCP server only, not the rest of the server. Slate will not write it through a config file that is a link |
| `work-gateway-auth.json` | The token a web-address work gateway, or an app connected from Slate, issued to Slate; sent only to that server |
| `work-token-auth.json` | The token you pasted for Bitbucket, Gitea, Gerrit, YouTrack, Zulip or Rocket.Chat, with the account name, keyed by workspace and server. Sent only to that server, never logged, removed on **Disconnect** |
| `oauth-pending.json` | A sign-in in progress; dropped when used and after 15 minutes |

Back to [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
