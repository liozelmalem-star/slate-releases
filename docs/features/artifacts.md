# Artifacts

An **artifact** is something an agent made for you to look at: an HTML page, such as a dashboard, chart or report, or a deck of slides. Any connected agent publishes one with Slate's `publish_artifact` tool, and it stays in your workspace with every version. Writing you will keep editing belongs in a [doc](https://liozelmalem-star.github.io/slate-releases/docs/features/projects.md) instead.

## Make or change one

You never edit an artifact by hand. You ask.

1. **Ask for one**: "make me a dashboard of this data as an artifact". Agents are also told to publish a chart, table or report this way on their own.
2. **Open it**: click the `slate://artifacts` link the agent gives you. It names the workspace, so Slate switches to it first.
3. **Ask for a change**: "make the bars blue", to any agent, or to **Ask AI** while the artifact is open. Ask AI works on the open artifact, in the project it was made in. Each change adds a version; older versions stay.

An agent can publish HTML it wrote, or a file by its path. Slate reads a file only from the agent's working folder or a temp folder, and never a hidden file or folder such as `.env` or `.ssh`.

**Import** at the top of the side panel brings in a folder of HTML files, or your claude.ai artifacts ([Import](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/import.md)).

## Find one

- **The side panel**: **Filter artifacts** narrows by title and description. Below it, **Overview**, then **Pages** and **Slides**, each with its count.
- **Overview**: **Recent**, the 4 newest as cards with a picture, and a link to each type's full list; then **Earlier**, the next 10 as one line each.
- **Pages** or **Slides**: every artifact of that type as a card, newest first, 24 at a time.
- **⌘K** finds an artifact by title or description, under **Artifacts**. It does not search the HTML.
- **On a doc**: **Artifacts made here** lists the artifacts an agent made on that doc.
- **Your agents**: `recall` returns up to 2 artifacts whose title matches every word of the question, so a session can find last week's dashboard and change it.

## An open artifact

The artifact fills the main area. Its toolbar has:

| Control | What it does |
| --- | --- |
| **Preview** / **Code** | The artifact, or its HTML source laid out one block per line (read only) |
| **‹ v2 of 3 ›** | Steps through versions. An older one says "You are looking at v2. The newest is v3." with **Restore this version**, which publishes it again as the newest |
| **More** (⋯) | **Copy HTML**, **Open in browser**, **Rename**, and **Delete forever**, which asks "Delete every version forever?" |

A **deck** shows one slide at a time, scaled to fit. **‹ 3 / 12 ›** or the arrow keys move between slides. The strip below shows every slide, then the slide's **Speaker notes**. **Present** shows the deck full screen.

An HTML page uses Slate's fonts and colours and follows your theme, under its own styles. Opened in your browser, it uses plain colours and your system's light or dark mode.

## Live artifacts

An artifact published as live reads your workspace while it is open, so a dashboard stays current without being published again. It says **Reads your workspace · no internet**.

- **It reads**: docs, one doc's text, memories and sessions of its project (or the whole workspace when it was made in none), up to 5,000 of each, newest first. It cannot change anything.
- **No internet**: it cannot fetch, open forms, new windows or frames, or load images or fonts from the internet. It may load scripts from cdnjs, jsDelivr and unpkg, so chart libraries work. If it tries to leave its web page, Slate closes it.
- **Only yours**: a teammate's live artifact shows to you as a plain HTML page, and never reads your workspace.

## Where it runs

An artifact runs its own scripts in a frame kept apart from Slate and your data. It cannot control the Slate window. A deck's slides run no scripts. A teammate's artifact cannot read the browser storage of yours.

In a shared workspace every member sees every artifact, but only the person who published it can rename it or delete it forever. Their new versions reach you when the workspace syncs. Moving a group or project to another workspace takes its artifacts with it.

## Limits

- One HTML document per artifact, up to 5,000,000 characters.
- A deck needs at least one top-level `<section>`, one per slide. An `<aside>` inside a section is that slide's speaker notes.
- A [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) is not an artifact: the artifact tools refuse one and name the widget tools.
