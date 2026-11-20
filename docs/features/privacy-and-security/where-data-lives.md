# Where each piece of data lives

Everything Slate keeps is on your Mac, in Slate's data folder: `~/Library/Application Support/app.slate.workspace/`. No server holds your workspace. A shared workspace sends only what [sharing](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md) lists.

## Your data

| What | Where | Shared? |
| --- | --- | --- |
| Personal workspace | `workspace.db`. You can move it: see [Your data and export](https://liozelmalem-star.github.io/slate-releases/docs/features/data-and-export.md) | Only if you share Personal |
| Each shared workspace | Its own file in the data folder | Yes, see [sharing](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md) |
| Docs, memories, sessions, automations | Inside their workspace's file | With their workspace, except what sharing withholds |
| Images in docs | Files beside the database, in the `files` folder | With a shared doc that names them |
| This computer's settings, the telemetry id and switches, and the list of workspaces on this Mac | `machine.db` | Never |
| Token use per session ([Activity](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md)): times, token counts, model, cost. Never prompt or reply text | `machine.db` | Never |
| Tasks from your integrations: one line each, never a description, comment or message text | The workspace's file | Never |
| An agent run's drafts (pull request text, ticket update, review comments), so you can read them before you approve | The workspace's file, removed 30 days after the run closes | Never |
| Receipts: per session, the last reply's first paragraph, commands with their result counts, edited files and commits | The workspace's file | Never |
| Slate's own cost: CPU, memory and wake counts every 15 minutes | `slate.log` in `~/Library/Logs/app.slate.workspace/` | Never sent |
| Your agents' sign-ins | Not in Slate. Each agent keeps its own | Never |

## Credential files

Slate keeps these files in its data folder, readable only by your user. None of them is inside a database, so exporting a workspace never hands anyone a live credential. They stay in the data folder when you move Personal.

| File | Holds |
| --- | --- |
| `cloud-session.json` | Your Slate sign-in |
| `slate-server-token` | The key every local caller presents to Slate's local server. Kept across launches. No agent's setup holds it ([how](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/security-details.md#the-local-server)) |
| `slate-mcp-token` | A second key that opens only Slate's MCP server. Slate gives it to the sessions it starts; no agent's config file holds it |
| `work-gateway-auth.json` | The token an integration you connected from Slate issued to Slate. Sent only to that server |
| `work-token-auth.json` | A token you pasted for an integration. Sent only to that server, never logged, removed on **Disconnect** |
| `oauth-pending.json` | A sign-in to an integration still in progress. Removed when used, or after 15 minutes |

Back to [Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
