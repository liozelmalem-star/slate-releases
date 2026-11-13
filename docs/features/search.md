# Search & Command Palette

Press **⌘K** anywhere. One input runs a command, jumps to a doc, or searches your workspace: doc titles and bodies, tasks, memories, reports, artifacts and captured AI sessions ([Session Capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md)).

Search uses **SQLite FTS5**, an index in the same local file as your content; it never leaves the machine.

⌘K searches **your** workspace only. What others shared is searched by opening [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md), or by an agent calling `recall` with `scope: "workspaces"`. The palette never blends private and shared results.

### What ⌘K lists

With nothing typed: **Open tabs**, **Live sessions**, **Recent**, **Favorites**, then five places under **Quick navigation**.

Typed, the order is: **Actions** (commands whose name holds the text), open tabs, **Go to** (places and a few Settings sections), sessions, files, **Docs**, **Tasks** (to-dos and tickets; open in Tasks), **Memories** (open in Memory), **Reports**, **Artifacts**. Loose command matches come last, under **More actions**.

Files come from the open workspace's projects only. When git does not answer for a checkout (a large checkout read cold, past the 5 s limit), the palette names that checkout under the results instead of showing **No matches**; the other checkouts still answer, and a checkout read before keeps its last file list. A doc row shows its parent path. A doc in Trash is marked **In Trash** and opens read-only, with **Restore**.

### Text inside files — ⌘⇧F

**⌘⇧F** (*Search docs and files*) searches doc bodies, then the text inside files of every project and worktree in the open workspace. A file hit is the matching line with file and line number, grouped by checkout and branch; Enter opens the file read-only at that line.

The query starts at three characters. It is plain text, not a pattern, and ignores case. Ignored and binary files are skipped; uncommitted files an agent wrote are included. At most 200 lines are found, and the palette shows the first 30. A checkout git could not search is named under the results, as in ⌘K.

### Sessions in ⌘K

Every live AI session on the machine is a row. With nothing typed, up to five show under **Live sessions**, those waiting on you first. Typed, up to four match by title, project, branch or tool (`fix/` finds the agent on that branch). Enter opens it as a chip in the Sessions tab strip: the live terminal where Slate can attach or branch, the transcript where it cannot. On a doc that stands for a folder, **Start a session here** launches on the project's default tool. **Second session here**, **Continue in a copy**, Stop and the resume command are on the session's own header.

### Web pages in ⌘K

Type a web address and the first row is **Open in Slate**, which opens it in Slate's own browser as a tab. It accepts a full address (`https://example.com/docs`), a local server with port (`localhost:3000`), a bare domain (`example.com`, opened over https) and the full path to an HTML file (`/srv/site/index.html`). Ordinary words, file names such as `index.html` and versions such as `v1.2` go to normal search.

The tab is read-only: back, forward, reload, an address bar, a button to open the web page outside Slate. Back and forward follow addresses typed in the bar, not clicked links. Sites that refuse to show inside another app get a note and your browser. Your browser's sign-ins do not carry over.

A local HTML file is served from its folder on a private local port, so scripts, styles and images load; dot-names (`.env`, `.git`) below it are never served, and the HTML page may connect nowhere but that folder. Slate keeps the 16 most recently used folders served; an older one is closed and served again when you open it again. A local server address in a session's messages or terminal opens here too, beside the session.

## The cheatsheet

Press **`?`** for the shortcuts of the current context. The palette opens it too, as **Keyboard shortcuts**. Tooltips read the same list, so they follow a key you rebind. Every key is in [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md).

## Rebindable shortcuts

**Settings → Keyboard** lists every command the palette knows; click a key to record a new one. See [Rebind a shortcut](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#rebind-a-shortcut).

## The sidebar

The icons down the left edge are always there; beside them is the sidebar, the list for the current section, pinned or hidden (remembered). With it hidden, resting the pointer on an icon floats that section's list over the doc without moving it; another icon changes the list; moving away, Escape or a click elsewhere slides it back. With it pinned, an icon shows only its name.

Choosing a section never pins or hides the sidebar. Three things do: clicking the icon of the section you are already in, **⌘\\**, and the sidebar button at the top of the list. While a list floats, **⌘\\** and that button pin it and take you to its section.

Every icon with a list works this way, Activity's panel (project picker, range, saved views) included. Picking a conversation from the floating Home list opens it in Home. Trash has no list, so it shows only its name.

### The rail

Top to bottom: **Sessions** first, on its own tile: every AI session on this computer as an orbit, one dot per session: lime while it works, amber while it waits on you. When a session starts, stops, or starts or stops waiting on you, the dots go once round. A working dot breathes; a waiting one grows and stays larger; otherwise they hold still.

A short line separates Sessions from **the workspace**: its tile (the workspace's mark in grey with a small dot in its colour, name on hover), then Home, Projects, Tasks and the rest, with **Connect** and **Trash** as round buttons at the foot. A second short line sets **Settings** last. Outside the lines, items are the same in every workspace; between them, all belong to the open one. Account, sign-in and docs are in Settings.

Where you are sits on a filled tile and is the only icon in colour: Slate's green, in a few tones. Every other icon is grey. The workspace tile is grey too, with one small dot in the workspace's colour. In a short window, overflow folds into **More**.

## Tabs

The main area is one strip of tabs in every world: docs, sessions, terminals, files, a branch's changes and previews.

**A click opens a temporary tab** (italic title) that the next thing you open replaces: a doc in the sidebar, or a row, file or branch in the Sessions list. A tab is kept when you:

* edit the doc (body, title, icon, cover or status)
* double-click the tab, or the doc in the sidebar
* choose **Keep open** or **Pin** from its right-click menu
* open it beside the current tab (⌘-click)

A doc you create or duplicate opens kept, and so does a session you launch.

Tab keys (⌃⇥ by recency, ⌘1‥⌘9, ⌘W, ⌘⇧T, ⌘⇧J, ⌥⌘←/→, ⌘⇧D, ⇧⌘\\) and mouse gestures (double-click, drag, middle-click, right-click, ⌘-click) are in [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#tabs-and-the-mouse). Every close spares **pinned** tabs, and **⌘W** on a pinned tab refuses until you unpin it.

Two open tabs with one title (two projects each with a doc called **README**) each also show their parent doc's name in grey. ⌘K lists open tabs first, most recently shown first, without duplicates.

Closing a hosted session's tab asks whether to end it or keep it running ([Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md)). The neighbouring tab of the same kind takes over, so closing a session never leaves the Sessions world. A session that ends takes its tab with it.

Open tabs return after a restart, in order, with pinned and kept state, **per workspace** (each keeps its own strip). Up to twenty come back. A session tab returns only while its session still runs. A strip too wide for its box gets a chevron at the end listing everything open; the tab you switch to scrolls into view.

## See also

* [Docs & the Block Editor](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md): the docs that search jumps to and indexes.
* [Sessions — the Live Tracker](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md)
