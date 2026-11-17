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
| **Issues** | Issues and tasks assigned to you; unassigned issues on repositories you own | Jira, Linear, GitHub, GitLab, Azure DevOps, Asana, ClickUp, monday.com, Notion, Trello, Shortcut, YouTrack, Basecamp, Todoist, Plane |
| **Reviews** | Reviews asked of you, pull requests assigned to you, your open ones, unclaimed ones on repositories you own | GitHub, GitLab, Bitbucket, Azure DevOps, Gitea, Gerrit |
| **Messages** | Chat and email awaiting your answer | Slack, Microsoft Teams, Discord, Google Chat, Zoom, Mattermost, Zulip, Rocket.Chat, Gmail, Outlook |

**Reviews** groups by pull request state:

1. **To review**: asked of you or assigned to you. Only a review asked of you counts as needing you.
2. **Changes asked**: yours; a reviewer asked for changes.
3. **Checks failing**: yours.
4. **Ready to merge**: yours; checks pass, no conflicts, no review owed (approved, or none required). If the review state was never read: **No review asked for**, with no merge run.
5. **Checks running**: yours.
6. **Waiting on review**: yours. Also where a pull request of unknown state goes (only GitHub is read for it today).
7. **On repositories you own**: nobody's, on repositories your GitHub account owns. Slate projects play no part in it.

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
- **Run <automation>**: runs one of your [automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md) on the line. A to-do takes a question, so **Research** fits it.

## Reminders

**Remind me…** (beside **Done** on a to-do; in **⋯** on a tool's task) offers in an hour, this evening, tomorrow morning, next week, or a picked time. When due, a notification rings with the title and the task moves to **Needs you** until done. A new time snoozes; **Clear the reminder** removes it.

- Slate must be running. A reminder due while it was shut rings once on next open and says its time. One due while the computer slept rings within five minutes of waking.
- **Reminders** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) turns it off; set times stay.

Agents set one with **remind\_me** ([MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)); for repeats use an [automation](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md).

## The side panel

Opens on **Overview**; the title row has **+**. Under it:

- **Overview**: its number is what needs you now (a review asked of you, a direct message, a reminder that rang).
- **To-dos**, **Issues**, **Reviews**, **Messages**: each with a count (only tools that answered). Dimmed when nothing waits.
- A task with a run in progress shows a lime live dot and its step on its row: *Reviewing*, *Building*, *Needs you* (amber) when it waits on you, *Stopped* when it stopped. In **Overview**, the section's own dot turns lime while a run works there, amber when one waits on you, red when one stopped; pointing at it names the step. Finished runs and their receipts are in [Activity](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md#agent-runs).

Drag the line between list and item to widen the list (320 to 640 px; item keeps 420 px minimum); double-click resets. Above the list: one chip per tool with items, most first, extras fold into **+N**; no row with one tool.

**Sync** reads your tools now. Its label says when the last read finished, which tool failed, or which needs sign-in ("Jira needs sign-in"). Greyed while reading.

Every tool is read to the end, up to 1,000 items from one tool. When a tool holds more, or its rate limit stops the read, the list says so above the rows: "1,000 of 3,400 from GitHub. Narrow by project or label, or open the full list in GitHub." with **Open the full list in {tool}**. A tool that does not say its total reads "The first 1,000 from {tool}". A group draws its first hundred rows, then **Show 100 more of N**. A group with items from more than one tool or project is split under a heading for each ("GitHub · acme/api", with its count), the ones holding something of yours first, then by name, and each heading folds with a click; a fold is remembered on this Mac. In a group of more than a hundred, only the headings holding something of yours, and the first by name, start open. The hundred rows are shared by a group's open headings, and **Show 100 more** keeps its count when you fold. A fold never hides the item you have open. The note stays until a whole read replaces it, through a "nothing changed" sync and through a failed one. When GitHub says to slow down, the last list stays as it was, what that read did take is kept, the next sync goes on from where it stopped, and the sync line does not report an outage. When GitHub needed more than one read a search for your items, the next syncs for 30 minutes ask only for what changed (with one minute of overlap); an item that left the list is noticed by the full read after that, or at the end of a full read that took several syncs, which keeps every item it saw along the way. It is never noticed by a read that stopped early or asked only for changes. Items that only now came into reach (the first 1,000 after an upgrade) are not "arrived": an automation on a new task starts only for items updated after the previous read.

A chip filters to one tool; **⋯** beside the chips:

- **Disconnect** (apps connected from Slate): remove the sign-in.
- **Hide from Tasks** (any app): removes its count and tasks, leaves the tool alone. Hidden integrations are listed on Connect → Integrations, each with **Show**.
- An unreachable tool keeps its old tasks, last, under **Can't reach GitHub**, outside the count.

A tool your agents already reach is offered above the list as **Use from your agents**. On a first day the Overview gives way to the six most used apps, as rows of Connect's own list, and **See all {count} integrations in Connect →**; the panel says nothing more then, and the sync line shows once something is connected or found.

**Sign in** opens the tool's sign-in page. Tasks shows "Waiting for you to sign in…", checks every 4 seconds, then **Signed in to Jira**; after 3 minutes it asks you to retry. For GitHub it says to run `gh auth login`. A sign-in link from Teach Slate opens directly.

## Choose what Tasks shows

Click an integration on the Overview to open **From <app>**, for example **From GitHub**. It says what the integration sends to Tasks and asks two things: where to look, then what to bring. Drag its left edge to make it wider (290 to 640 px); the width is remembered on this Mac, and a double-click on the edge puts it back. Connect's working apps open the same panel from a hover link, **Choose what Tasks shows**.

The panel has one layout per kind of integration, named by a small tag beside the title:

| Kind | Apps | Step 1 asks |
| --- | --- | --- |
| **Code** | GitHub, GitLab, Bitbucket, Gitea and Forgejo, Gerrit | **Git repositories**. Slate ticks the ones this workspace works in ("this workspace") |
| **Tracker** | Jira, Linear, ClickUp, monday.com, Notion, YouTrack, Trello, Plane, Shortcut, Basecamp, Todoist, and apps Slate learned to read | **Projects**. Slate ticks the projects your current tasks already come from |
| **Mail** | Gmail | **Which mail**: "From people" you work with, each of your labels, and "Anything else that names a project". The first and last are ticked, which is the filter Gmail had before |
| **Chat** | Slack, Zulip, Rocket.Chat, Mattermost | **Channels**. Slate ticks the channels your current messages come from |

- **Summary.** A sentence such as "Sends 11 issues and 2 reviews to Tasks." or "Sends nothing to Tasks right now." It follows the ticks.
- **1. Where.** One tick per git repository, project, kind of mail or channel, the hint in grey at the right. Past the first three the rest fold into "{count} more …", with a filter when the list is long. Untick them all and the app sends nothing; the panel says so. Until you change it, Slate's choice is worked out each time and never saved, so a new git repository of the workspace is ticked on its own. For a tracker or a chat app Slate's ticks narrow nothing until you change one, so a new project still comes in. An app with nothing to list skips this step.
- **2. What to bring.** One tick per way Slate asks the app, with its count, then the ways you can add, unticked. A way with a word to fill ("Issues with a label…") is an unticked line with its words inline; tick it and fill the words, and it is added. You can add at most 5 for each integration. Ways with nothing right now fold into one line, "{count} more, empty right now". A way that failed says "Did not answer: {reason}" and keeps its last tasks. **Remove** takes away a way you added; Slate's own are turned off, not removed.
- **Other ways.** At the bottom, for GitHub, Jira and Gmail: type your own search text, see how many are open, three titles and how many are already in Tasks ("{count} open, {already} already in Tasks"), then **Add to Tasks**.
- **Footer.** "As <login> · checked <time> · read only". Slate only reads.

A change to either step starts a sync at once; the tasks and the Overview's counts follow when it lands.

Until you open them, one quiet sentence under the Overview names the integrations still sending Slate's defaults, and their logos wear the same dashed circle as "Connect an integration" ("Slate chose what Tasks takes from GitHub and Gmail. Click a logo to change it."). **Hide** marks them all as seen. Which lines each tool offers is in [Where tasks come from](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/sources.md#what-tasks-takes-from-each-tool).

## The Overview

Left to right: **your tools** (logo and name, a number for what waits, **Sign in** if needed, **You wrote** feeding To-dos, **Connect an integration** last), **the four kinds of work** (dots with counts or "nothing waiting"), **Slate** (the shared memory, with how much needs you) and **the agents at work** (past two, the second becomes a count). Click any logo, dot or name to open its list.

## A task

Click a row to open it beside the list:

- Origin ("GitHub assigned this to you"), comment count, project. The task's **…** menu holds **Change what <integration> sends**, which opens that integration's panel beside the Overview's map, and **Stop showing these** (it names the line), which turns the line off and says "Stopped showing <name>", with **Undo**. The task itself never says which line found it. A task from a line you added has no assigned, asked or authored claim; it only names the line.
- **Slate remembers**: up to three memories. First those naming the task by key (`ECL-18747`) or pull request number (`#140`); then, inside the project the task's work belongs to, those about the same topic: a memory naming one of the title's names ("Windows", "Asana"), or, for a title with no names, sharing two of its distinctive words (common words, numbers and the project's own name left out). An entry that only repeats the task's key and title, or repeats another entry, is not shown. None for To-dos and Messages. Slate's own lines to a run's agent are never shown as one.
- **Run <automation>** leads (a to-do also keeps **Done**). **⋯**: **Open in GitHub** (when the tool gave a link), **Remind me…**, **Hide from Tasks** (this list only; **Undo**; the task returns if the tool reports a newer change). Each section has a folded **Hidden (N)** line with **Unhide**.
- **The Run button** says **Run <automation>**, for example **Run Fix a bug**. Its menu lists only the automations whose input matches the item (an issue shows the ones that take an issue). With none of your own that take it, the menu lists Slate's [starters](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#the-starters) that do, the one made for this kind of item first (**Draft a reply** before **Research** for a message). The first run of a starter adds it to Automations, with no project of its own. The chevron picks the agent for this run only; **Default** marks the one used when you pick none. Once started it says **Running** and opens the run. With nothing to run yet (your pull request waits on review or checks), one line says so.
- **Where it runs**: the project is picked only when it is certain: the item's own git repository, the project a line you wrote names, the project you said its source works in, or your only project. Pressing **Run** starts the run in one click when the project is certain and nothing blocks. Otherwise a small dialog asks **Which project does Jira PROJ work in?** once and remembers the answer on the project, or shows the block and its fix ([The start dialog](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md#the-start-dialog)).
- Before it starts, a [preflight check](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#the-preflight-check) runs. A blocked start (a folder that is not a git repository, for example) opens the dialog with the reason and its fix.

Description and comments are read in the tool; terminal and changes are in the task's session ([Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md)).

## Run an automation on a task

Tasks runs automations and defines no process. The process is in the automation ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md)).

An automation takes one kind of input, and a task has one kind of input:

| The task is | Automations that fit (starters) |
| --- | --- |
| A pull request asked of you | Code Review |
| Your pull request | Answer review |
| An issue | Fix a bug, Research |
| A ticket | Implement |
| A question | Research |
| A message | Draft a reply |

The run happens in a session you can see, with two stops for your approval: before it plans and before it ships. On as **agent runs** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md); off, the card opens only a plain session. See [Agent runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md) and [Which automation runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/workflow.md).

## Receipts

A receipt is what an AI session ran, checked against what it said, written from the transcript at turn end. A run of an automation leaves one too, read from its own output; one that cannot be read says **No evidence**. See [Receipts](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/receipts.md).

See also: [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md), [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md), [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
