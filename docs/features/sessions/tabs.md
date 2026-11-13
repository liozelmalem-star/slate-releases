# Tabs, columns and names

A session you open is a tab in the same strip as your docs. Columns show several at once; a name makes one easy to find.

## Several sessions at once

A session's tab shows status where a doc's icon sits, with changed lines and context fill beside the name. Files, a branch's changes and previews are tabs in the same strip. Every open tab stays mounted, so switching tears no terminal down.

While a session's tab shows, the rail stays on **Sessions**. Clicking a row opens a **temporary** tab (italic) that the next click replaces; a session you launch gets a kept tab. Tab gestures and keys: [Tabs](https://liozelmalem-star.github.io/slate-releases/docs/features/search.md#tabs).

**Closing a session's tab ends the session, after asking.** The ×, middle-click and ⌘W all ask *End qa?*, naming the tool still running.

| Choice | Does |
| --- | --- |
| **End session** | Stops the tool, closes its terminal, removes it from the rail |
| **Close tab only** | Closes the tab of a hosted terminal; the session stays on the rail as "In Slate · no window" |
| **Cancel** | Keeps the tab |

Close others, Close to the right and Close all ask once, listing every session they would end. A refused stop keeps the dialog open with the reason. A session in your own terminal is not Slate's to end: closing its view leaves it running. A session replaced in a temporary tab keeps running as **In Slate · no window**; click its row to bring the tab back. On close the neighbouring tab takes over; with none left you land on the map. Escape, or the back arrow on a transcript, returns to the map without closing anything. **Sessions** in the rail returns to the session tab you were last on.

**⌘-click any tab** to open it in its own column: two sessions, a session and its doc, an agent beside the dev server.

### Sessions side by side

**Open beside** in a row's **⋯**, or ⌘-click on the row, shows that session in a new column right after yours. The main area holds up to **4 columns**; with four, Open beside adds a tab to the column next to yours.

- **Each column has its own tabs.** Your working column has a blue line on top; click another to work there. The list marks each session on screen with its column: **left**/**right**, **middle** with three, **column 1** to **column 4** with four.
- **Drag the line between columns** to widen one; double-click a line to equalise all. Widths are saved per workspace and survive relaunch.
- **Back to one view:** **Unsplit** at the top of the last column, or ⇧⌘\\. All tabs are kept. Closing a column's last tab closes the column.

## Naming a session

**A session has one name**, shown on its tab, list row and memory doc. Right-click the tab, **Rename…**; Enter or clicking away keeps it, Escape keeps the old one. One line, up to 80 characters.

A session with no name, or one that reads as none (blank, "session", "untitled", a raw id), shows **"\<Tool> session in \<project>"** in list, tabs, map, ⌘K and the notification. A name taken from the opening prompt leaves out what the tool wrapped round it: `<pasted_content …>` around a paste, Cursor's `[Image]` and `<user_query>`, a Codex preamble; a tag you typed, like `<div>`, stays. An agent run's session is named for its run.

Renaming the tab renames the session in its own tool, so its resume list shows the new name:

| Tool | How |
| --- | --- |
| Claude Code, Codex, Cursor | `/rename <name>` typed into the session |
| OpenCode | Asked through its own server |
| Gemini | Keeps no names; Slate keeps it |

- Typed only when it cannot land in your words: the last turn ended and nothing is half-typed (if you typed and cleared, Slate waits for your next Enter or Ctrl+U).
- Cursor does not report turn ends: a running Cursor session gets the name when next opened in Slate (tab dimmed until then).
- A session in your own terminal gets it when next opened in Slate.
- `/rename` typed in any of the four CLIs updates tab, row and memory doc too.

## Agents that know about each other

With two or more sessions in one project, Slate tells each the others exist, once, at the start of a turn, in the message carrying the branch brief. The rail says so under the group: *Told about 1 other session here*, or the count of the others.

Each agent gets the other's **own words**: tool, branch, state, what it was asked and its last message, plus the doc id. The branch goal is omitted (agents on one branch share it). Slate never says a session **is running**, only *last active six minutes ago*. It asks for nothing; the agents decide.

An agent can leave one note for the others or send one to a particular agent, shown once on their next turn; **a reply is another note addressed back**. No inbox, scheduler or queue. Notes that only narrate progress are refused. Slate assigns nothing.
