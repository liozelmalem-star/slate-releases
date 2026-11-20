# Integrations

The **Integrations** tab in [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md) connects the apps you work in to this workspace. Press **Connect**, approve Slate on the app's own sign-in page, and what waits for you there shows in [Tasks](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md). No agent is involved.

## Connect an app

Under **Connect an integration**, the chips **All**, **Issues**, **Reviews** and **Messages** narrow the list with their counts, and **Find an integration** searches it.

- **Sign in on the app's sign-in page**: **GitHub** (through your `gh` sign-in), **Jira**, **GitLab**, **Notion**, **Trello**, **ClickUp**, **Linear**, **Mattermost** (on your own server), **monday.com**, **Basecamp**, **Plane**, **Shortcut** and **Todoist**.
- **Paste a token**: **Bitbucket**, **Gitea** (Forgejo too), **Gerrit**, **YouTrack**, **Zulip** and **Rocket.Chat**. The form says where to make the token and which read-only permissions to tick. Slate checks the token with the app before keeping it.
- **Another integration**: any MCP server, by its https address.
- **Coming soon**: Slack, Microsoft Teams, Discord, Google Chat, Gmail, Outlook and Asana, each "Needs Slate's own" app; Azure DevOps and Zoom, "No server Slate can sign in to yet".

A sign-in or token stays on this computer, in a file only you can read, and survives restarts and updates.

## Read a row

A connected app that works is one line with a green dot. Point at it to see what Slate reads and when it last synced. Every action sits in the row's **⋯** menu: **Connect**, **Sign in again**, **Paste a new token**, **Choose what Tasks shows** and **Disconnect**.

A second line shows only when something needs you:

| The row says | What it means |
| --- | --- |
| **Needs sign-in** | The sign-in ended, for example after a new password. Choose **Sign in again** |
| **Unavailable** | Slate could not reach it, or the app blocks reads until you change a setting. The line says which |
| **Not read yet** | Slate has not found your tasks in it yet. Tasks shows its logo, never a 0 |
| **Learning** | Slate is working out where your tasks are, for an app like Notion that keeps them in its own database. If it fails: "Could not find your tasks in Notion." with **Try again** |
| Your admin may need to allow Slate first | Jira and Trello can require an admin to allow new apps |

An app you hide from Tasks moves under **Hidden from Tasks**, with **Show**.

## Notes per app

- **GitHub**: **Connect** turns on reading through your `gh` sign-in. A signed-in `gh` alone reads nothing.
- **Mattermost**: **Connect** asks for your server's address, such as `https://chat.example.com`. Your admin must turn on its AI plugin's MCP server first.
- **Zulip** and **Rocket.Chat** show only messages that name something this workspace works on.
- **Disconnect** forgets the sign-in or token. Its tasks leave at the next sync.

## Your agents read it too

An app connected by sign-in (not a pasted token) can be read from any session in this workspace while Slate is open, with no setup in the agent: Slate's `connected_tools` and `read_connected` tools use Slate's sign-in. Only tools that read are offered. See [Connected MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/connected-tools.md).
