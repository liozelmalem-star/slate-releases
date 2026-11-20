# Tasks

**Tasks** lists what you owe: the issues assigned to you, the pull requests to review, the
messages to answer, and the lines you write yourself. Open any of them and run one of your
automations on it. Tasks belongs to the workspace picked on the rail.

## The four sections

| Section | Holds | From |
| --- | --- | --- |
| **To-dos** | Lines you wrote | Slate only ([To-dos, reminders and meetings](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/todos.md)) |
| **Issues** | Issues and tickets assigned to you, and unassigned issues on repositories you own | Jira, Linear, GitHub, GitLab, Azure DevOps, Asana, ClickUp, monday.com, Notion, Trello, Shortcut, YouTrack, Basecamp, Todoist, Plane |
| **Reviews** | Reviews asked of you, pull requests assigned to you, your open ones, and unclaimed ones on repositories you own | GitHub, GitLab, Bitbucket, Azure DevOps, Gitea, Gerrit |
| **Messages** | Chat and email waiting for your answer | Slack, Microsoft Teams, Discord, Google Chat, Zoom, Mattermost, Zulip, Rocket.Chat, Gmail, Outlook |

How each tool is read, and how to change what it sends, is in
[Where tasks come from](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/sources.md).

**Reviews** is grouped by the pull request's state: **To review** (asked of you or assigned
to you), then your own: **Changes asked**, **Checks failing**, **Ready to merge**,
**Checks running**, **Waiting on review**; and last **On repositories you own**, for
pull requests nobody took. **Issues** is grouped by each tool's own status names.

## The side panel

- **Overview**: its number is what needs you now: a review asked of you, a direct message,
  a reminder that rang.
- **To-dos**, **Issues**, **Reviews**, **Messages**, each with a count.
- The **+** in the title row adds a to-do.
- The sync line says when your tools were last read (**Synced 2 min ago**), or which tool
  needs sign-in (**Jira needs sign-in**). Click it to read your tools now.

A task with an agent run working on it shows a live dot and its step on its row, such as
**Reviewing** or **Building**. **Needs you** (amber) means it waits on you, **Stopped** that
it stopped.

Above a section's list, one chip per tool filters to that tool. The **⋯** beside the chips
offers **Manage in Connect**, and **Disconnect <app>** for an app connected from Slate or
**Hide from Tasks** for any other. A hidden app is listed in Connect → **Integrations**,
with **Show**. A tool Slate cannot reach keeps its last tasks, under **Cannot reach <tool>**.

Drag the line between the list and the open task to widen the list, from 320 to 640 px.
Double-click the line to reset it.

## The Overview

The Overview draws your work as one picture: your tools on the left, each with what waits
there and **Sign in** when it needs it, **You wrote** for your to-dos, and
**Connect an integration** last; then the four sections; then Slate, with how much needs
you. Click any of them to open its list. When your calendar is connected, today's meetings
sit above it ([Today's meetings](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/todos.md#todays-meetings)). Click a tool to choose what it sends
([Choose what Tasks shows](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/choose.md)).

On a first day, with nothing connected, the Overview shows the most used integrations and
**See all N integrations in Connect →**. A tool your agents already reach is offered as
**Use from your agents**.

## A task

Click a row to open it beside the list. It shows where it came from ("GitHub assigned this
to you"), its comments and project, and:

- **Slate remembers**: up to three memories about the task, first those that name its key
  (`PROJ-123`) or pull request number, then those about the same topic in its project.
- **Run <automation>**: runs one of your automations on it ([Run an automation](#run-an-automation-on-a-task)).
- **⋯**: **Open in <tool>**, **Remind me…**, **Change what <tool> sends**,
  **Stop showing these**, and **Hide from Tasks**.

**Hide from Tasks** takes the task off this list only; nothing changes in its tool. It
comes back if the tool reports a newer change. Each section has a **Hidden (N)** line with
**Unhide**.

The description and comments stay in the tool: open the task there to read them.

## Run an automation on a task

Tasks runs your [automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md); the automation holds the process.
The **Run <automation>** button names the automation, such as **Run Fix a bug**. Its
chevron lists the automations that take this kind of item, yours first, then Slate's
starters, and the agent to use for this run. The first run of a starter adds it to
Automations.

The run happens in a session you can see, and stops for your approval before it plans and
before it ships. See [Agent runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md) and
[Which automation runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/workflow.md).

When your pull request still waits for a review or for checks, one line says there is
nothing to run yet.

## More

- [To-dos, reminders and meetings](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/todos.md)
- [Where tasks come from](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/sources.md) and [Choose what Tasks shows](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/choose.md)
- [How Slate learns an app](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/learning.md)
- [Agent runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md) and [Agent run rules](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-run-rules.md)
- [Receipts](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/receipts.md)
