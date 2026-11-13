# How Slate learns an app

Slate can read some apps it was not built for. This guide covers the automatic try, Teach Slate, the safety check on every call, and what Tasks keeps on disk.

## Tools Slate learns on its own

During a sync, a tracker app with no reader gets one try a day per workspace. No model.

| Step | What happens |
| --- | --- |
| Pick | Read-only tools whose names say tasks, issues, items, tickets, cards or stories and that are yours (`get_my_issues`) or take an assignee. Writers and tools needing unknown input are never tried |
| Identify | Your id from the app's "who am I" tool (`atlassianUserInfo`, Todoist `user-info`, Shortcut `users-get-current`). Apps with none (ClickUp) are asked to resolve "me" |
| Call | The best tools, at most 6 calls: your id as assignee, then `me` |
| Keep | The first read returning a list with a title and a status for at least one task (a done flag like `completed: true` counts). A plain list beats one narrowed to a slice, such as by date |

Then the tool is read like Jira, free, with your id as a placeholder. Finished items are left out: ones the app marks finished (`completed: true`, a completion date, a status class like Linear's `completed`), and statuses that say so in English or in the team's language (Done, Erledigt, Terminé, 完了). A negated status ("Nicht erledigt", 未完成) or a "ready for" one ("Listo para QA") stays open, as does any status Slate cannot read. Priority names are read in any case, with Urgent and P0 to P3.

- An app that reads fine but has nothing yours yet (new account): no read is kept; retried next day.
- **Sync**, connecting or disconnecting an app: learns again at once.
- A kept tool renamed or removed by the app: read removed, learned again in the same sync.
- A gateway tool that read fine in the last 3 minutes is not asked again until **Sync**; one awaiting sign-in is always asked.

## Teach Slate

A connected app in Connect → Integrations with no reader shows **Not read yet** and a button to teach it; opening the screen starts nothing. When you press it, its tile says **Learning how to read your tasks in GitLab…** for about a minute; apps go one at a time. Claude (Sonnet) is asked about that app through Slate's `connected_tools` and `read_connected`, with no shell or web. Slate tries the answer and keeps it only if it returned a list; afterwards no agent and no tokens. If nothing is found: **Could not find your tasks in Notion.** with **Try again**, and Slate never retries by itself; each lesson starts only when you press the button. A read kept later clears it.

**Write-word check.** Every tool is checked when picked, when kept and on every read. Refused: any tool with a write word in its name (send, create, update, remove, add, move, post, reply, comment, merge, close, assign, set, mark, upload, write and about fifty more), or belonging to another app. Filter words pass: `get_assigned_issues` yes, `assign_issue` no.

**Tools only your Claude account reaches** (a claude.ai connector such as monday.com): read by Claude (Haiku) only when you press **Sync** (at most every 2 minutes). Opening Tasks never starts a model call, so your Claude usage is spent only when you ask. Never a tool Slate reads itself; no background timer.

## What is stored

- **Per task**: one line with tool, key (`acme/api#412`), title, state, person, link, a few counts, the tracker's type (Bug, Story), reminder time. Never description, comment or message text. A line you wrote is the same row with no tool. In the workspace's local file, never shared, even in a shared workspace.
- **Meetings**: never on disk; in memory until the day ends or Slate quits.
- **Per project**: only the skills you picked (a name per kind), in the file of the workspace holding the project's doc. Skill text never copied.
- **Per learned tool**: name, arguments, your id in that app, where each field sits in the answer; never the answer. For an app Teach Slate found nothing in: when.
- **Receipts**: see [Receipts](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/receipts.md#what-is-stored).

Private files on this machine, readable only by your user:

| File | Holds |
| --- | --- |
| `work-gateway-auth.json` | Slate's own sign-in for a web-address gateway or an app connected from Slate; sent only to the server that issued it |
| `work-token-auth.json` | A pasted token with the account name; never logged, sent only to its server; **Disconnect** removes it |
| `oauth-pending.json` | An unfinished sign-in, kept 15 minutes so a restart mid-browser-step loses nothing |

A connected app's address is in the workspace's file; not secret, never shared. Sign-in returns to one fixed address; if another program holds it, to the app's own port.
