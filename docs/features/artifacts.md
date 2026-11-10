# Artifacts

An **artifact** is a web page an agent made for you: an HTML page, dashboard, chart, report or Markdown note. Any connected tool publishes one with the `publish_artifact` MCP tool; it is stored in your workspace on this computer and listed in **Artifacts** in the rail.

A [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) is different (`get_widget`, `publish_widget`); given a widget, the artifact tools refuse and name those.

## Make or change one

You ask; you never edit by hand.

1. **Ask for one**: "make me a dashboard of this data as an artifact". Every connected tool is also told to show a chart, table or report this way unprompted.
2. **Ask for a change**: "make the bars blue", in **Ask for a change** under the title or to any tool.
3. **Open it**: click the `slate://artifacts` link the tool gives; it names the workspace, so Slate switches first.

Details:

- The tool sends the HTML with a title, or writes a file and sends its path. Files are read only from the working folder or a temp folder, never a file or folder whose name starts with a dot below your home or the working folder (`.env`, `.ssh`). A working folder that is your home folder or wider is not trusted.
- **Ask for a change** opens a session in the artifact's project, on that project's tool. It reads the HTML with `get_artifact` and sends only the changed parts. That adds a **version**; older stay. Republishing the same HTML adds none.
- On an older version the box says so ("This change starts from v1, not the newest (v3)") and the tool sends the whole HTML as a new version (edits apply only to the newest).

## The Artifacts screen

- **Side panel**: **Overview**, then every artifact in the workspace, newest first, with an HTML or Markdown icon and last-change time. Artifacts belong to the workspace, so no project picker. **Filter artifacts** matches title and description.
- **Overview**: a card per artifact, newest first, the same cards Widgets draws. An HTML picture is the HTML in a script-free frame in Slate's look and the current theme; script-drawn charts show only what the markup holds. Markdown uses the viewer's renderer. Drawn only while on screen, at most nine at a time.
- **Open artifact**: name, who made it and when, what it is.
- **Preview | Code**: the HTML or its read-only source (HTML laid out one block per line, indented; only spacing changes). **Copy HTML** copies the HTML as published.
- **‹ v2 of 3 ›**: steps versions. An older one says "You are looking at v2. The newest is v3." with **Restore this version** (republishes it as a new version; nothing in between is lost).
- **Ask for a change** shows only on an artifact you published under a project folder (a teammate's has one writer; a folderless one has nowhere to start a session).
- **⋯**: **Copy HTML** or **Copy Markdown**, **Open in browser** (HTML only), **Rename**, **Delete forever** (asks "Delete every version forever?"). A failed rename or removal keeps the menu open with the reason.

## Finding one

- **⌘K**: title or description, and Markdown by text, under **ARTIFACTS** after reports. HTML code is not searched.
- **The doc it was made on**: **Artifacts made here**. A branch shows its own; a project every one made inside it.
- **`recall`**: returns up to 2 artifacts after memories when every word of the question matches one, so a session can find last week's dashboard and change it.

## How HTML artifacts look

Slate's look (app font, colours, plain buttons, inputs, tables, code, headings; your theme, Mint or Forest, live) comes before the artifact's own styles, which win. In your own browser: default colours and the system light or dark. Tools are told to use `var(--text)`, `var(--muted)`, `var(--surface)`, `var(--border)`, `var(--accent)`, chart colours `var(--c1)` to `var(--c5)`, and classes `card`, `badge`, `grid`, `row`, `stack`.

## Live artifacts

Published with `live: true`, an artifact reads your workspace while shown, so a dashboard stays current without republishing. Header: **Reads your workspace · no internet**. Toggling live adds a version (ADR 0070).

| Aspect | Rule |
| --- | --- |
| Reads | Docs, one doc's text, memories and AI sessions of its project (whole workspace if made under none); newest first, up to 5,000 rows each; read-only |
| Network | No fetch, WebRTC, resource hint (preconnect, prefetch), internet image or font, form, new window, frame or `document.write`. Scripts may load from cdnjs, jsDelivr, unpkg (chart libraries work). An attempt to leave for another address closes it |
| Isolation | No origin of its own; shares nothing with other artifacts, not even localStorage; talks to Slate only over a private channel opened at start |
| Yours only | In a shared workspace a teammate's live artifact is a plain HTML page and never reads your store; restored on another computer it is also plain |

## Where it runs

HTML runs its own scripts, served from your workspace on a private local address apart from Slate and your data; it cannot steer the Slate window and nothing is copied to disk. It may load internet scripts and fonts. Markdown is formatted text. A teammate's artifact has no storage of its own (scripts, forms, downloads, popups kept) and cannot read the browser storage of your own artifacts, which keep theirs.

In a shared workspace every member sees artifacts. One writer, the publisher: a teammate's shows "Written by" and their name, with no Rename or Delete forever. Their new versions reach you on next sync, newest only; you keep versions received; later joiners start at the newest. Moving a group or project to another workspace takes its artifacts along.

## Limits

One web page per artifact, up to 5,000,000 characters. HTML or Markdown only.
