# Search and command palette

Press **⌘K** anywhere to open the command palette. One box runs a command, jumps to a doc, a session or a file, or searches your workspace: docs, tasks, memories, reports and artifacts. Search runs on your Mac and searches only the workspace you are in.

## What ⌘K shows

With nothing typed, the palette lists **Open tabs**, **Live sessions** (up to 5, the ones that need you first), **Recent**, **Favorites**, and 5 places under **Quick navigation**.

When you type, the results come in this order:

1. **Actions**: commands whose name holds what you typed
2. **Open tabs**
3. **Go to**: places, and a few Settings tabs
4. **Sessions**: live sessions, matched by title, project, branch or agent
5. **Files** from the open workspace's projects
6. **Docs**, **Tasks**, **Memories**, **Reports** and **Artifacts**
7. **In Trash**: a doc in Trash opens read-only, with **Restore**
8. **More actions**: looser command matches

If a project's files do not answer within 5 seconds, the palette names that project under the results; the others still answer.

## Search inside files

**⌘⇧F** (**Search docs and files**) searches doc text, then the text inside the files of every project and worktree in the open workspace. A file match shows the line, with its file and line number. Enter opens the file at that line.

The search is plain text and ignores case. It skips ignored and binary files, and includes new files an agent wrote that are not committed yet. It finds at most 200 lines and shows the first 30.

**⌘P** (**Go to file or doc**) jumps to a file or a doc by its name.

## Open a web page

Type a web address and the first row is **Open in Slate**. It opens in a tab inside Slate. It takes a full address (`https://example.com/docs`), a local server with its port (`localhost:3000`), a bare domain (`example.com`) or the full path to an HTML file (`/srv/site/index.html`). Ordinary words, file names such as `index.html` and versions such as `v1.2` search as usual.

The tab has back, forward, reload, an address bar, and a button that opens it in your browser. Your browser's sign-ins do not carry over.

## The rail and the sidebar

The **rail** is the column of icons on the left edge. It is always there. From top to bottom:

* **Sessions**, on its own: every AI session on this Mac, in any workspace.
* The **workspace**: its tile, then Home, Projects, Tasks, Memory, Activity, Artifacts, Widgets, Automations and Toolkit, with **Connect** and **Trash** at its foot. All of these belong to the open workspace.
* **Settings**, then **you**. These are the same in every workspace.

Rest the pointer on an icon to see its name and shortcut. In a short window, places that do not fit fold into **More**.

Beside the rail is the **sidebar**, the list for where you are. **⌘B** shows or hides it, and so does clicking the rail icon you are already on. With the sidebar hidden, resting the pointer on an icon shows its list on top until you move away.

## Tabs

The main area is one strip of tabs: docs, sessions, terminals, files, changes and web pages.

**A click opens a temporary tab**, shown in italics. The next thing you open replaces it. A tab stays when you edit the doc, double-click the tab, choose **Keep open** or **Pin** from its right-click menu, or open it beside the current tab with ⌘-click. A doc you create and a session you start open as kept tabs.

**⌘W** closes a tab, but a pinned tab stays until you unpin it. Closing a session's tab asks whether to end the session or keep it running. Open tabs come back after a restart, up to 20, for each workspace. All tab keys: [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#tabs-and-the-mouse).

## Back and Forward

The two arrows in the top bar take you back to the screens you came from, and forward again, like a browser. **⌘[** and **⌘]** do the same, and so do a mouse's back and forward buttons.

A step is a screen you went to: one on the rail, a doc, a session or other tab, an artifact, a Settings tab. A filter or a view change on the same screen is not a step. Slate keeps the last 50 screens, and each workspace has its own list. An arrow with nowhere to go is greyed out.
