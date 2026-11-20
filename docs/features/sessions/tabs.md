# Tabs, columns and names

Every session you open is a tab, in the same strip as your docs and files. Columns put several side by side, and a name makes one easy to find.

## Tabs

A session's tab shows its status dot and name. Files, a branch's changes and previews open as tabs in the same strip. Every open tab stays alive, so switching tabs never stops a terminal.

Clicking a row in the list opens a **temporary** tab (in italics) that the next click replaces. A session you start gets a tab that stays. A session whose temporary tab was replaced keeps running and reads **In Slate · no window** in the list; click its row to bring the tab back.

**Escape** returns to the map without closing anything. Tab keys and gestures: [Search and command palette](https://liozelmalem-star.github.io/slate-releases/docs/features/search.md#tabs).

## Close a session's tab

Closing an agent's tab ends the session, after asking. The ×, a middle-click, ⌘W and Ctrl+C in its terminal all ask **End \<name>?**:

| Choice | Does |
| --- | --- |
| **End session** | Stops the agent, closes its terminal and takes it off the list |
| **Close tab only** | Closes the tab; the session keeps running as **In Slate · no window** |
| **Cancel** | Keeps the tab |

**Close others**, **Close to the right** and **Close all**, in a tab's right-click menu, ask once, naming every session they would end. A session in your own terminal is not Slate's to end: closing its tab leaves it running. Closing a Terminal's tab asks **Close this Terminal?**, because anything running in it stops.

## Columns

**⌘-click** a tab, or choose **Open beside** in a row's **⋯** menu, to open it in a new column beside yours. The main area holds up to **4 columns**; with four, Open beside adds a tab to the column next to yours.

- Each column has its own tabs. The column you work in has a blue line on top; click another to work there. The list marks each session on screen with its column: **left**, **middle**, **right**, or **column 1** to **column 4**.
- Drag the line between two columns to widen one; double-click it to make all equal. Widths are saved per workspace.
- **Unsplit**, at the top of the last column, or **⇧⌘\\**, returns to one column and keeps every tab.

## Name a session

Right-click a session's tab and choose **Rename…**. **Enter** or a click away keeps the name; **Escape** keeps the old one. A name is one line of up to 80 characters, and shows on the tab, the row and the session's doc.

A session with no name shows **\<Agent> session in \<project>**.

Slate passes the new name to the agent, so its own resume list shows it too:

| Agent | How |
| --- | --- |
| Claude Code, Codex, Cursor | Slate types `/rename <name>` when the session is free: the last turn ended and nothing is half-typed |
| OpenCode | Slate asks OpenCode's own server |
| Gemini | Gemini keeps no names; Slate keeps it |

Until it lands, the tab is dimmed, and pointing at it reads *Renaming in \<agent> when the session is free*. A `/rename` you type in one of these agents renames the tab and row too.

A Terminal can be renamed the same way. Slate keeps the name while the Terminal runs; clear it and the tab shows what runs in it again (`npm · Nimbus`).

## Agents that know about each other

With two or more sessions in one project, Slate tells each agent once, at the start of a turn, that the others are there: their agent, branch, state, what each was asked and its last message. The list says so under the group: **Told about 1 other session here**.

An agent can leave a note for the others, or for one of them; they see it once, on their next turn. Slate assigns no work: the agents decide.
