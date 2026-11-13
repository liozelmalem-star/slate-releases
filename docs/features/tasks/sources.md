# Where tasks come from

A normal read uses no agent and no tokens. This guide lists the source for each tool, how often it is read, and how Messages is limited to the workspace.

## GitHub

Read through the **GitHub CLI** (`gh`) once you press **Connect** on its card in Connect → Integrations or setup. A signed-in `gh` alone reads nothing.

- Several `gh` accounts: Slate asks `gh` who is signed in, in every `gh` config folder, including several logins in one folder (`gh auth login` twice, `gh auth switch`). Each workspace reads as the account owning its git repositories (for an organisation's, the one that can see them). A workspace no account reaches shows no GitHub; switching accounts drops the old one's tasks.
- A remote cloned through an SSH host alias (`git@github.com-work:acme/app`) counts as GitHub: the alias is resolved with `ssh -G`.
- Every AI session started in a project runs `gh` as the sign-in reaching that project. An agent run shows GitHub connected only when one of your sign-ins reaches the project.
- A write made in your name (an app's card) runs as exactly the login shown, with that login's token for that one call. If `gh` cannot confirm that login, the write is refused and asks you to sign in.
- Read on opening Tasks, and on returning to the window after a minute. Each read first asks GitHub whether anything changed; a full read follows a change, a last read over ten minutes old, or **Sync**.
- Six lists: reviews asked of you, pull requests assigned to you, your open pull requests, issues assigned to you, and on git repositories your account owns, pull requests nobody reviewed or took (**On your projects**) and unassigned issues. A task on several lists shows once.
- One more read gets your open pull requests' state (review decision, checks, can merge). If it fails they show under **Waiting on review**.
- No `gh`: **Unavailable**. Signed out, or no sign-in sees the workspace's git repositories: **Sign in** (`gh auth login`). A workspace whose docs name no GitHub git repository shows no GitHub row.

## When a source is down, or goes away

An outage, a rate limit or a settings file an agent is rewriting never removes tasks: the row says **Unavailable** and the last tasks stay until the next good read. This holds for every source above: GitHub (a rate limit is a skipped read, never "cannot see"; a `gh` sign-in that cannot be told is kept as it was, and a "cannot see" answer is asked again after ten minutes) and the tools read through your agents (an empty, half-written or just-removed settings file is not "no tool").

When a source really goes away (you disconnect GitHub, switch `gh` accounts, or remove an app's token connection), its tasks leave the list. Items you **dismissed** or set a **reminder** on are not forgotten: they stay hidden, with their title and link erased, and come back with the same dismissal or reminder if the source returns. Reconnecting a source is a first import, so it starts no automation for the tasks it brings back.

## Apps connected from Slate

GitLab, Jira, Linear, ClickUp, monday.com, Notion, Trello, Plane, Mattermost, Shortcut, Basecamp, Todoist, or any server added by address are read through the app's official server, signed in as Slate. Once signed in, Slate reads first and an agent's server for that app is left alone; until then that server keeps reading, so a personal Jira never stops a company Jira syncing. Other trackers are [learned](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/learning.md#tools-slate-learns-on-its-own); a chat app such as Mattermost by [Teach Slate](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/learning.md#teach-slate).

**Read card.** Where a server cannot list what is assigned to you (monday.com), the app-list entry has a **read card**: one read-only call and how to keep your unfinished items. monday.com: your 25 most recently used boards, 100 items each. A changed answer shape is flagged on the row.

## Jira, Slack and Gmail through your agents

Read through your agents' MCP servers after you press **Use from your agents** once. Slate scans the settings of Claude Code, Cursor, Gemini CLI, Codex and OpenCode, only for accounts **this workspace** runs under, and keeps:

- **A tool gateway** carrying many tools (one declared several times, or as local server and web address, counts once).
- **A server for one integration** (`linear`, `atlassian`), skipped if a gateway or Slate already reads that tool.

Either is a **local server** (started and kept running; turning integrations off stops it unless another workspace still has them on) or a **web address** (streamable HTTP or SSE). A web address uses the key in its settings; with none, **Sign in** opens the server's sign-in page and Slate signs in as itself, one per workspace, kept on this machine. Your agent's sign-in is never read.

Only [read-only tools](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/learning.md#teach-slate) are called. If a gateway is unreachable (expired sign-in) its tools say **Unavailable** or **Sign in** and last tasks stay until the next good read. Tasks from a tool no gateway reads any more are removed.

| Tool | Read |
| --- | --- |
| Jira | Issues assigned to you, not done, by Jira status |
| Slack | Direct messages and mentions from the last 7 days you have not answered |
| Gmail | Unread emails from the last 7 days, up to 30, by subject and sender; at most 15 new opened per read, the rest later. A row opens in the Google account the gateway reads; when no email names that account, the row says so and opens your first signed-in account. Outlook is not read this way |

## Apps read with a pasted token

Six apps have no usable sign-in; connect with a token (Connect → **Integrations**). Read-only web API, finished items left out:

| App | Read |
| --- | --- |
| **Bitbucket Cloud** | Open pull requests where you review and have not approved or asked for changes. No such list exists, so each git repository you are a member of is asked, up to 200 |
| **Gitea**, **Forgejo** | Open pull requests whose review was asked of you |
| **Gerrit** | Open changes whose attention set holds you. Someone else's: a review; your own back in your attention: yours to act on |
| **YouTrack** | Unresolved issues assigned to you, with state and priority |
| **Zulip** | Unread direct messages and mentions, one row per conversation |
| **Rocket.Chat** | Rooms with unread direct messages or mentions, one row per room |

A read that worked is not repeated for three minutes unless **Sync**. Two servers of one app are read together; one failing never hides the other's tasks.

## Messages stay in this workspace

A message stays when it names something the workspace works on: a group or project in your tree (`thunderbolt`, `acme/api`), or a project key, name or git remote from your Issues and Reviews tasks.

- **Gmail**: filtered in its own search, on the subject only.
- **Slack**: checked on its text as read (a link or channel name alone does not count; text not kept). Also stays if from someone in your Issues or Reviews tasks.
- **Learned tools, tools Claude reads for you, Zulip and Rocket.Chat via token**: checked on title, channel and sender.

A workspace with no groups, projects, Issues or Reviews shows everything.
