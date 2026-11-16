# Artifacts

An **artifact** is something an agent made for you to look at: an HTML page (a dashboard, chart or report) or a deck of slides. Any connected tool publishes one with the `publish_artifact` MCP tool; it is stored in your workspace on this computer and listed in **Artifacts** in the rail. Writing in Markdown belongs in a [doc](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md), not an artifact.

A [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) is different (`get_widget`, `publish_widget`); given a widget, the artifact tools refuse and name those.

## Make or change one

You ask; you never edit by hand.

1. **Ask for one**: "make me a dashboard of this data as an artifact". Every connected tool is also told to show a chart, table or report this way unprompted.
2. **Ask for a change**: "make the bars blue", to the **AI helper** (the lime circle at the bottom right of an open artifact) or to any tool.
3. **Open it**: click the `slate://artifacts` link the tool gives; it names the workspace, so Slate switches first.
4. **Bring in what you made elsewhere**: **Import** in the side panel's header takes a folder of HTML files, or gives your agent a prompt that brings your claude.ai artifacts in with their real dates ([Import](https://liozelmalem-star.github.io/slate-releases/docs/features/import.md)). A tool can pass `made_at` to `publish_artifact` for the same.

Details:

- The tool sends the HTML with a title, or writes a file and sends its path. Files are read only from the working folder or a temp folder, never a file or folder whose name starts with a dot below your home or the working folder (`.env`, `.ssh`). A working folder that is your home folder or wider is not trusted.
- Beside an open artifact the AI helper's **Context** is that artifact, and it works in the project the artifact was made in. Each message tells the agent which artifact is open; it reads the HTML with `get_artifact` and sends only the changed parts. That adds a **version**; older stay. Republishing the same HTML adds none.

## The Artifacts screen

- **Side panel**: **Filter artifacts** (title and description), then **Overview**, and each type with its count: **Pages** and **Slides**. Artifacts belong to the workspace, so no project picker.
- **Types**: an **HTML page** scrolls and fits your window (a report, a finding, a plan). **Slides** are a deck: fixed 16:9 slides, shown one at a time. The tool says which when it publishes; left out, it is an HTML page. A new version keeps its type.
- **Overview**: **Recent**, the four newest as cards, HTML pages and decks together, with **All 194 pages** and **All 2 slides** beside it (your own counts); then **Earlier**, the next ten as one line each.
- **Pages** or **Slides**: every artifact of that type as a card, newest first, 24 at a time and 24 more as you reach the end. A card's picture is 16:9: an HTML page shows its top, in a script-free frame in Slate's look and the current theme (script-drawn charts show only what the markup holds); a deck shows its first slide.
- **Open artifact**: it fills the space beside the side panel, with no byline or title over it; the toolbar keeps Preview, Code, the versions and **⋯**.
- **A deck**: one slide at a time, scaled whole to fit; **‹ 3 / 12 ›** or the arrow keys move; the strip under it shows every slide; the slide's speaker notes show under the strip; **Present** fills the screen.
- **Preview | Code**: the HTML or its read-only source (HTML laid out one block per line, indented; only spacing changes). **Copy HTML** copies the HTML as published.
- **‹ v2 of 3 ›**: steps versions. An older one says "You are looking at v2. The newest is v3." with **Restore this version** (republishes it as a new version; nothing in between is lost).
- **⋯**: **Copy HTML**, **Open in browser**, **Rename**, **Delete forever** (asks "Delete every version forever?"). A failed rename or removal keeps the menu open with the reason.

## Finding one

- **⌘K**: title or description, under **ARTIFACTS** after reports. The HTML itself is not searched.
- **The doc it was made on**: **Artifacts made here**. A branch shows its own; a project every one made inside it.
- **Inside a Design**: an agent publishes a mockup with `target_doc_id` set to the Design and places it in the text as an image line whose address is `slate://artifacts?id=<artifact_id>`. The doc draws it there, live, in a script-free frame with its version, who made it and **Open**. A mockup made on a Design but not placed in its text shows under the words. `get_doc` lists a doc's artifacts, so an agent reading the Design sees them.
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

HTML runs its own scripts, served from your workspace on a private local address apart from Slate and your data; it cannot steer the Slate window and nothing is copied to disk. It may load internet scripts and fonts. A deck's slides run no scripts: each is drawn as it is written. A teammate's artifact has no storage of its own (scripts, forms, downloads, popups kept) and cannot read the browser storage of your own artifacts, which keep theirs.

In a shared workspace every member sees artifacts. One writer, the publisher: a teammate's has no Rename or Delete forever. Their new versions reach you on next sync, newest only; you keep versions received; later joiners start at the newest. Moving a group or project to another workspace takes its artifacts along.

## Limits

One HTML document per artifact, up to 5,000,000 characters. A deck needs at least one top-level `<section>`; an `<aside>` inside a section is its speaker notes.
