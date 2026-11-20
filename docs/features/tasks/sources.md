# Where tasks come from

Tasks reads each of your tools directly. A sync runs no model and spends no tokens, and
Slate only reads: it never writes to a tool while syncing.

## How each tool is read

| Tools | How Slate reads them | Connect it |
| --- | --- | --- |
| GitHub | The GitHub CLI, `gh`, as each account you signed in with | **Connect** on GitHub's card in Connect → **Integrations**. Signed out: run `gh auth login` |
| GitLab, Jira, Linear, ClickUp, monday.com, Notion, Trello, Plane, Mattermost, Shortcut, Basecamp, Todoist | The app's official server, signed in as Slate | **Sign in** in Connect → **Integrations** |
| Jira, Slack and Gmail through your agents | The MCP servers your agents already use | **Use from your agents** |
| Bitbucket Cloud, Gitea, Forgejo, Gerrit, YouTrack, Zulip, Rocket.Chat | Their web API, with a token you paste | Connect → **Integrations** |
| Any other tracker | A read Slate learned ([How Slate learns an app](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/learning.md)) | Connect it, then teach it |

**Sign in** opens the tool's sign-in page in your browser. Tasks shows
**Waiting for you to sign in to <tool> in your browser**, checks every 4 seconds, then says
**Signed in to <tool>.** After three minutes with no answer it asks you to try again.

**GitHub.** With several `gh` accounts, each workspace reads as the account that owns its
git repositories. GitHub is read when you open Tasks, and again when you come back to the
window after a minute. A workspace whose projects have no GitHub git repository shows no
GitHub row.

**Through your agents.** Slate looks in the settings of Claude Code, Cursor, Gemini,
Codex and OpenCode, only for the accounts this workspace runs under. It signs in to a web
server as itself and never reads your agent's own sign-in. Only read-only tools are called.

## Choose what Tasks shows

What each tool sends to Tasks, and from where, is yours to change
([Choose what Tasks shows](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/choose.md)).

## When a tool holds more

Slate reads up to 1,000 items from one tool. When a tool holds more, the list says so above
the rows, such as **1,000 of 3,400 from GitHub. Narrow by project or label, or open the
full list in GitHub.**, with **Open the full list in GitHub**.

A group shows its first 100 rows, then **Show 100 more of N**. A group with items from more
than one tool or project is split under a heading for each, such as
**GitHub · acme/api**. Click a heading to fold it.

## When a tool is down, or goes away

An outage or a rate limit never removes tasks. The tool's row says **Unavailable** or
**Cannot reach <tool>**, and its last tasks stay until the next good read.

When a tool really goes away (you disconnect it, or switch `gh` accounts), its tasks leave
the list. A task you hid or set a reminder on comes back with the same choice if the tool
returns. Reconnecting a tool starts no automation for the tasks it brings back.

## Messages stay in this workspace

A message is shown only when it names something this workspace works on: a group or
project in your tree, or a project key, name or git remote from your **Issues** and
**Reviews**. A Slack message also stays when it comes from someone in those tasks. A
workspace with no groups, projects, issues or reviews shows every message.

| Tool | What it reads |
| --- | --- |
| Slack | Direct messages and mentions from the last 7 days that you have not answered |
| Gmail | Unread mail from the last 7 days, up to 30 |
| Zulip | Unread direct messages and mentions, one row per conversation |
| Rocket.Chat | Rooms with unread direct messages or mentions, one row per room |
