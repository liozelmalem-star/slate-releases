# Tasks

**Tasks** lists what you owe: issues assigned to you, pull requests to review, messages to answer, and lines you write. Any can carry a reminder. It sits in the rail after Home and belongs to the workspace the switcher picked.

## Today's meetings

If a connected work gateway carries a calendar (Google Calendar or Outlook), a **Today** row sits above the Overview:

- **Next meeting**: "in 25 min", "in 8h 12m" or "now", its name, **Join** if it has a video link.
- **Day line**: 08 to 19 (wider if needed), one mark per meeting. Dashed = unanswered or maybe. Red tick = now.
- **Sums**: meetings, all-day events, free time left (gaps of 45 minutes or more).

Point at a meeting for its card: title, times, length, your answer, **Join**, **Open in** your calendar. Click to keep it open. A title naming a task key ("Sync on PROJ-123") or a pull request number ("Review #412", if only one task has it) lists that task under **About**.

Declined and cancelled meetings are left out; none counts. The calendar is read with each Tasks sync through the Jira/Slack/Gmail gateway, at no token cost. If it needs sign-in the row shows **Sign in** (checks every few seconds, gives up after three minutes). No calendar, no row.

## The four sections

| Section | Holds | Tools |
| --- | --- | --- |
| **To-dos** | Lines you wrote | none |
| **Issues** | Issues and tasks assigned to you; unassigned issues on your projects | Jira, Linear, GitHub, GitLab, Azure DevOps, Asana, ClickUp, monday.com, Notion, Trello, Shortcut, YouTrack, Basecamp, Todoist, Plane |
| **Reviews** | Reviews asked of you, pull requests assigned to you, your open ones, unclaimed ones on your projects | GitHub, GitLab, Bitbucket, Azure DevOps, Gitea, Gerrit |
| **Messages** | Chat and email awaiting your answer | Slack, Microsoft Teams, Discord, Google Chat, Zoom, Mattermost, Zulip, Rocket.Chat, Gmail, Outlook |

**Reviews** groups by pull request state:

1. **To review**: asked of you or assigned to you. Only a review asked of you counts as needing you.
2. **Changes asked**: yours; a reviewer asked for changes.
3. **Checks failing**: yours.
4. **Ready to merge**: yours; checks pass, no conflicts, no review owed (approved, or none required). If the review state was never read: **No review asked for**, with no merge run.
5. **Checks running**: yours.
6. **Waiting on review**: yours. Also where a pull request of unknown state goes (only GitHub is read for it today).
7. **On your projects**: nobody's, on projects your account owns.

**Issues** groups by each tool's status names; Jira "In Progress" and ClickUp "in progress" share a group. Each task shows its tool's logo (initials tile for Outlook and Azure DevOps).

Sources: GitHub, apps connected in Connect → **Integrations**, and Jira/Slack/Gmail through an agent gateway; others are learned ([Teach Slate](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/learning.md#teach-slate)). Unreadable apps say **Not read yet**. See [Where tasks come from](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/sources.md).

## To-dos

1. Click **+** in the side panel's title row.
2. Type the line ("call the accountant"), press Enter. The box stays open for more lines. Set a reminder first if needed.
3. The list shows To-dos with the new line selected.

Nothing you write lands in Issues, Reviews or Messages, and no tool writes to To-dos. They never sync and never vanish. On the Overview their source is **Slate**.

Groups by **when**: Overdue, Today, Tomorrow, This week, Later, No time. **Done today** sits at the bottom, struck through, until tomorrow.

- **Tick the box** to finish; again to undo.
- **Double-click the title** to rename (a ticket's title belongs to its tool).
- **Run with AI…**: **Feature** (default), **Bug**, **Investigate only**. With no ticket the agent reads the title and your note and ships a pull request with no ticket update.

## Reminders

**Remind me…** (beside **Done** on a to-do; in **⋯** on a tool's task) offers in an hour, this evening, tomorrow morning, next week, or a picked time. When due, a notification rings with the title and the task moves to **Needs you** until done. A new time snoozes; **Clear the reminder** removes it.

- Slate must be running. A reminder due while it was shut rings once on next open and says its time. One due while the computer slept rings within five minutes of waking.
- **Reminders** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) turns it off; set times stay.

Agents set one with **remind\_me** ([MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)); for repeats use an [automation](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md).

## The side panel

Opens on **Overview**; the title row has **+**. Under it:

- **Overview**: its number is what needs you now (a review asked of you, a direct message, a reminder that rang).
- **To-dos**, **Issues**, **Reviews**, **Messages**: each with a count (only tools that answered). Dimmed when nothing waits.
- **Agent runs**: runs started from Tasks in the last 14 days with their session's receipt; the number is unreviewed flagged receipts. A session you ran yourself is not here (see **Details** in [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md)).

Drag the line between list and item to widen the list (320 to 640 px; item keeps 420 px minimum); double-click resets. Above the list: one chip per tool with items, most first, extras fold into **+N**; no row with one tool.

**Sync** reads your tools now. Its label says when the last read finished, which tool failed, or which needs sign-in ("Jira needs sign-in"). Greyed while reading.

A chip filters to one tool; **⋯** beside the chips:

- **Disconnect** (apps connected from Slate): remove the sign-in.
- **Hide from Tasks** (any app): removes its count and tasks, leaves the tool alone. Hidden integrations are listed on Connect → Integrations, each with **Show**.
- An unreachable tool keeps its old tasks, last, under **Can't reach GitHub**, outside the count.

A tool your agents already reach is offered above the list as **Use from your agents**. On a first day the Overview gives way to the six most used apps, as rows of Connect's own list, and **See all {count} integrations in Connect →**; the panel says nothing more then, and the sync line shows once something is connected or found.

**Sign in** opens the tool's sign-in page. Tasks shows "Waiting for you to sign in…", checks every 4 seconds, then **Signed in to Jira**; after 3 minutes it asks you to retry. For GitHub it says to run `gh auth login`. A sign-in link from Teach Slate opens directly.

## The Overview

Left to right: **your tools** (logo and name, a number for what waits, **Sign in** if needed, **You wrote** feeding To-dos, **Connect an integration** last), **the four kinds of work** (dots with counts or "nothing waiting"), **Slate** (the shared memory, with how much needs you) and **the agents at work** (past two, the second becomes a count). Click any logo, dot or name to open its list.

## A task

Click a row to open it beside the list:

- Origin ("GitHub assigned this to you"), comment count, project.
- **Slate remembers**: up to three memories naming the task by key (`ECL-18747`) or pull request number (`#140`). None for To-dos and Messages.
- **Run with AI…** leads (a to-do also keeps **Done**). **⋯**: **Open in GitHub** (when the tool gave a link), **Remind me…**, **Hide from Tasks** (this list only; **Undo**; the task returns if the tool reports a newer change). Each section has a folded **Hidden (N)** line with **Unhide**.
- **Run button**: shows Slate's mark, the skill (`fix-bug`) and the agent (Claude Code). Its chevron picks the agent for this run only, and the skill, which changes the project's rule for that kind. Once started it says **Running** and opens the run. With nothing to run yet (your pull request waits on review or checks), one line says so.
- It says **Run it** or **Open a session**; a blocked start (a folder that is not a git repository) is explained in the footer. See [the start dialog](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md#the-start-dialog).

Description and comments are read in the tool; terminal and changes are in the task's session ([Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md)).

## Agent runs (beta)

A run takes a task through Read it, Plan, Build, Check, Draft, Ship with two stops for your approval, in a visible session. On as **agent runs (beta)** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md); off, the card offers only **Just open a session**. Six kinds each run **one skill per project**, changed from the run button's menu, the start dialog or the folded **Workflow** box atop Issues and Reviews. See [Agent runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md) and [Workflow](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/workflow.md).

### Workflow

The kinds (**Bug**, **Feature**, **Someone else's PR**, **My PR**, **My PR, checks failing**, **My PR, ready to merge**) and their skills: [Workflow](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/workflow.md).

## Receipts

A receipt is what an AI session ran, checked against what it said, written from the transcript at turn end. See [Receipts](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/receipts.md).

See also: [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md), [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md), [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
