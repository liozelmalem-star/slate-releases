# How Slate learns an app

Slate can read your tasks from a tracker it was not built for, as long as the app offers
read-only tools. It learns the read once, then reads the app like any other: no model, no
tokens.

## On its own

During a sync, a connected tracker that Slate cannot read yet gets one try a day, with no
model:

1. Slate picks the app's read-only tools whose names say tasks, issues, items, tickets,
   cards or stories, and that return yours or take an assignee.
2. It finds your id in the app, through the app's own "who am I" tool where it has one.
3. It calls the best of them, at most 6 calls, and keeps the first that returns a list of
   tasks with a title and a status.

Finished items are left out, in English and in your team's language (Done, Erledigt,
Terminé, 完了). A status Slate cannot read stays open.

An app that has nothing of yours yet is tried again the next day. Connecting or
disconnecting an app, or a sync you start, tries again at once.

## Teach it

An app in Connect → **Integrations** that Slate cannot read shows **Not read yet** and
**Slate hasn't found your tasks in it yet.** Click its tile to teach Slate. It reads
**Learning how to read your tasks in <app>…** while your agent looks at that app through
Slate's tools, with no shell and no web. This takes a few minutes, and apps go one at a
time.

Slate tries what the agent found and keeps it only if it returns a list. After that, no
agent and no tokens are used. When nothing is found, the tile says
**Could not find your tasks in <app>.** Slate never retries on its own; teach it again when
you want.

## Only read-only calls

Every tool is checked when it is picked, when it is kept, and on every read. A tool is
refused when its name holds a write word (send, create, update, remove, add, move, post,
reply, comment, merge, close, assign, set, mark, upload, write and about fifty more) or
when it belongs to another app. A filter word passes: `get_assigned_issues` is read,
`assign_issue` is not.

## What Tasks keeps

- **Each task**: one line with its tool, key (`acme/api#412`), title, state, person, link,
  a few counts, its type (Bug, Story) and its reminder. Never a description, a comment or a
  message's text. Tasks are kept in the workspace on this computer and never shared, even
  in a shared workspace.
- **Calendar meetings**: never saved. They stay in memory until the day ends or Slate
  quits.
- **Each learned app**: the tool, its arguments, your id in that app, and where each field
  sits in the answer. Never the answer.

Sign-ins are kept in private files on this computer that only your user can read. A token
you paste is never logged and is sent only to its own server. **Disconnect** removes it.
