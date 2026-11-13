# Integrations

The **Integrations** tab in [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) holds this workspace's apps. Press **Connect**, approve Slate on the app's own sign-in page, and what you owe there shows in Tasks. No agent is involved.

## The list

One row per integration: its logo and name. A connected app in its normal state is that one line and one small green dot. **Disconnect** shows when you point at the row, and the hover text says what Slate reads and when it last synced. A second line shows only when something differs: **Sign in again so Slate can keep reading it.**, **Slate could not reach it.**, or a note that your admin may have to allow Slate first. A tool's own error text stays out of the row. Connectable apps come first, then **Coming soon**.

* **Official-server sign-in:** **GitHub** (through your `gh`), **Jira**, **GitLab.com**, **Notion**, **Trello**, **ClickUp**, **Linear**, **Mattermost** (your own server), **monday.com**, **Basecamp**, **Plane** (Plane Cloud), **Shortcut**, **Todoist**.
* **Pasted token:** **Bitbucket Cloud**, **Gitea** (and Forgejo), **Gerrit**, **YouTrack**, **Zulip**, **Rocket.Chat**.
* Order: most used first by the Stack Overflow Developer Survey's share, then apps it omits, A to Z.
* **Coming soon**, each with its reason: Slack, Microsoft Teams, Discord, Google Chat, Gmail, Outlook and Asana say *Needs Slate's own* app of that vendor (not registered). Azure DevOps and Zoom say *No server Slate can sign in to yet*.
* **Issues**, **Reviews** and **Messages** narrow the grid to apps shown in that group of Tasks (mail is under Messages), with counts. **Find an integration** searches.
* An app hidden from Tasks sits under the grid as **Hidden from Tasks**, with **Show**.
* **Another app**, the last tile, connects any MCP server: name, https address, sign in.

## States and behaviour

| Case | What happens |
|---|---|
| GitHub | **Connect** turns on reading through `gh`. A signed-in `gh` alone reads nothing. |
| Sign-in ended (new password, admin removed access) | **Needs sign-in**, **Sign in again**. The sign-in is Slate's own, stays on this computer, and survives restart and update. An agent's server reading the same app never makes it look signed in. |
| App refuses reads by a setting | **Unavailable** with the change needed or the app's words. GitLab: "GitLab blocks Slate until you turn on “Allow connection to GitLab” in a GitLab group you own." |
| Slate cannot read it yet | **Not read yet**; a logo under **Not reading yet** in Tasks, not a 0. Slate teaches itself once: **Learning how to read your tasks in Notion…** while your agent works it out through Slate's connection; the answer is kept. If nothing is found: **Could not find your tasks in Notion.** with **Try again**. This is how Notion is read: each workspace keeps tasks in its own database. |
| **Disconnect** | Forgets the sign-in or token. Tasks leave at the next sync, unless an agent's declared server still reads the app. |
| Same app via an agent's server | Read here only, so a task never comes from two places. |

## Per-app notes

* **Jira**, **Trello:** their admin may have to allow Slate before it connects (Atlassian controls which apps connect; Trello follows).
* **Mattermost:** **Connect** asks for the server address (`https://chat.example.com`) and signs in at the Agents plugin's MCP server, `/plugins/mattermost-ai/mcp-server/mcp`. The admin must first enable that server and OAuth dynamic client registration (Enterprise plan up). The tile then shows the address and replaces the plain tile.
* **Pasted-token apps:** **Connect** opens a form with the server address (not Bitbucket), the account name the app wants (Zulip email, Gerrit username, Rocket.Chat user ID) and the token, with where to make it and which read-only permissions to tick. Slate asks the app who owns the token before keeping it; a refused token is not kept and the form says why. The token stays on this computer in a file only your user can read. If refused later: **Needs sign-in**, **Paste a new token**. Zulip and Rocket.Chat show only messages naming something this workspace works on.

## Agents read what you connect

An app connected through its own server (not a pasted token) is readable from any AI session in this workspace, with no setup: `connected_tools` and `read_connected` use Slate's sign-in while Slate is open. Only reading tools are offered. See [Connected MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/connected-tools.md).
