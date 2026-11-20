# Choose what Tasks shows

Each tool sends Tasks a few lists, such as the reviews asked of you or the issues assigned
to you. Slate picks sensible ones at first. This panel shows what a tool sends and lets you
change where it looks and what it brings.

## Open the panel

Click a tool on the Overview to open **From <tool>**, such as **From GitHub**. In Connect,
point at a working app and use **Choose what Tasks shows**. The first line says what the
tool sends, such as **Sends 11 issues and 2 reviews to Tasks.**

## 1. Where

One tick per git repository, project, channel or kind of mail:

| Kind | Step 1 lists | Slate ticks at first |
| --- | --- | --- |
| **Code**: GitHub, GitLab, Bitbucket, Gitea, Forgejo, Gerrit | **Git repositories** | The ones this workspace works in |
| **Tracker**: Jira, Linear, ClickUp, monday.com, Notion and the others | **Projects** | The ones your current tasks come from |
| **Mail**: Gmail | **Which mail**: **From people** you work with, each label, and **Anything else that names a project** | The first and the last |
| **Chat**: Slack, Zulip, Rocket.Chat, Mattermost | **Channels** | The ones your current messages come from |

Until you change a tick, Slate works its choice out at each sync, so a new git repository
or project still comes in. Untick them all and the tool sends nothing.

## 2. What to bring

One tick per list Slate reads from the tool, with its count, such as
**Reviews asked of you** or **Issues assigned to you**. Below them are the lists you can
add, each a sentence with a word to fill in, such as **Issues in <project> labelled
<label>**. Tick it and fill the word to add it. You can add up to 5 per tool. **Remove**
takes away one you added; Slate's own are turned off, never removed. A list that failed
says **Did not answer: <reason>** and keeps its last tasks.

## Other ways

For GitHub, Jira and Gmail: type your own search, see how many items are open and how
many are already in Tasks, then **Add to Tasks**.

The footer says **As <login> · checked <time> · read only**. A change starts a sync at
once.

Until you open a tool's panel, a line under the Overview says
**Slate chose what Tasks takes from <tools>. Click a logo to change it.** **Hide** dismisses
it.
