# Home

Home is the doc Slate opens on. It shows what needs you, and it has an agent built in that reads and writes your workspace (nested docs, memory, activity) and reaches any MCP tools you connect. The agent runs on whichever coding agent you point it at.

## Contents

- [What Home shows](#what-home-shows)
- [The Set up Slate card](#the-set-up-slate-card)
- [Resuming a past session](#resuming-a-past-session)
- [Scope, and dropping a file in](#scope-and-dropping-a-file-in)
- [Skills and mentions](#skills-and-mentions)
- [In this section](#in-this-section)

## What Home shows

Home shows **one thing that needs you at a time**. The headline counts the cards on the deck, the same total as the pager under it ("Seven things wait for you."). When finished sessions are among them, the line under it splits the count ("Six to answer, one finished — look when you can."). When only finished sessions wait, it says "One session finished."

Each card has a badge for its kind; the deck is ordered by it, blocking first. The dot before the badge is amber when the card blocks on you now and grey when it can wait.

| Order | Badge | What it is | What the card offers |
|---|---|---|---|
| 1 | **Needs permission** (amber) | The agent wants to run a tool call and waits for your yes | The command in a code box, **Open to allow**, **Later** |
| 2 | **Asks you** (amber) | The session's last turn ends on a question | If Slate runs the session: a **Reply** box, **Send**, **Open**, **Later**. For a terminal Slate does not own: **Open session**, **Later**, and a line saying the answer is typed there |
| 3 | **Automation asks** (amber) | A call an automation's rules held ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#when-it-asks-first)) | The call, **Yes, do it**, **No** with an optional reason, **Open the thread**, **Later** |
| 4 | **Review asked** or **Task** (grey) | A task in Tasks that needs you | **Open in Tasks**, **Open in {app}** (such as GitHub), **Later** |
| 5 | **Reminder** (amber) | A reminder you set on a task | **Open in Tasks**, **Done**, **Later** |
| 6 | **Finished** (grey) | The session's turn is a report: nothing blocks | **Open session**, **Mark seen**, **Later** |

The card title is one plain line: the question the reply ends on, or its first sentence. Below it the reply shows as markdown, about four lines; **Read the whole reply** opens the session. Only Claude Code's transcripts show a pending tool call today, so other tools are **Asks you** or **Finished**, never **Needs permission**.

- **Send** on an **Asks you** card removes it and you stay on Home. For agents not proved to send on Enter, the answer is typed into the prompt and not sent, and the card says *Typed — press Enter in the session to send it.*
- **Later** sets a card aside until you restart Slate; a session set aside returns when it says something new. **Mark seen** does the same for a finished session.
- Move between cards with the arrows, the dots, ← and →, a sideways swipe or a drag. A line under the dots says where you are ("4 of 7 · Automation asks").
- The deck's card is compact at every window size: a title line, then its buttons. A card behind the front one takes no height.
- Working sessions that need nothing show as pills that open the session, always in one row; more slide sideways, with a fade on the side that hides some. Only the open workspace's sessions are listed; one pill counts other workspaces and links to [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md).
- Every time on Home, in Sessions and in Tasks says **just now** under a minute. A card that waits on you says how long: *waiting 2 min*, *waiting 3 hours*, *waiting 2 days*.
- **A short window keeps the composer in view.** Home sizes itself to the window's height. Below about 900 px the mark hides, and the headline and the widgets get smaller. Below about 560 px the mark, date and subline hide, the widgets shrink further, the pager keeps only its dots, and the running pill under the deck hides (Sessions still shows it). While a card waits, the composer stays at the foot and only the part above it scrolls. The next card peeks in at the side and fades out, and the window edge never cuts it.
- With nothing waiting, the headline says **All clear.** and the composer moves to the middle. Past sessions are in Sessions, under **All past sessions**.
- If Home could not read what waits (tasks, agent runs or held calls), it says so under the headline, with **Try again**. With no card to show, the headline says *Could not check what waits for you.*, never **All clear.**
- A chat opens over Home. **Home** (top left of the chat) returns to Home and keeps the chat; **Back to the chat** returns. A streaming reply does not pull you back; sending a message does.
- **⌘J** opens the **Ask AI** panel beside a doc; elsewhere it shows *The AI panel opens on a doc. Open a doc first.* **Write with AI** in the slash menu drafts text straight into the doc. Waiting setup changes are in [Toolkit › Suggestions](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md#suggestions).
- Your [widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) for Home sit in the gaps between Home's parts (under the greeting, above or below the box), each at the size its setup in Widgets chose (a third, a half or the whole width). They read what Home shows (running AI sessions, for the project picked here). A new one appears below the box once built. Home has no control that adds or moves a widget: open it in Widgets and click a line on its preview.

For approvals, autonomy and Stop see [Approvals, Stop and Agent Differences](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/approvals.md).

## The Set up Slate card

In a workspace with no agent set, Home is a doc: *{workspace} is ready for an agent*. One card shows the agents and what connecting one unlocks (Ask here, Memory, Activity, Automations, Widgets), with **Open Connect** and what works without AI: Tasks, Projects and Artifacts. See [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md#agents).

Once a tool is set, Home starts with a **Set up Slate** card of three steps, each with one button:

| Step | Button | Done when |
|---|---|---|
| **Connect an agent** | **Connect an agent** (opens Connect → Agents) | This workspace has an agent set |
| **Start a session** | **New session** (runs your tool in a folder) | A session has been captured |
| **See your first memory** | **Open Memory** | A memory is saved |

Ticks come from what is in the workspace, so a step done elsewhere ticks itself. Until an agent is connected, the first step lists every agent Slate works with; once it is done, it names only the connected ones. The first open step has the main button; the header counts progress ("1 of 3 done"). The card goes when all three are done or on **Skip setup**, and does not return in that workspace (other workspaces are unaffected). A line under it reads *A workspace holds your projects. A project is a folder you open.* and names your workspace.

## Resuming a past session

1. Open [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md) and choose **All past sessions**.
2. Press **Resume** on the row (a click on the row opens its record instead).
3. Home opens with that session's transcript loaded, and the agent picks the thread back up.

The chat starts with what you first asked and, under **Summary**, what Slate saved of the session (Slate's record, not a new tool reply).

## Scope, and dropping a file in

The composer's **Scope** control (folder icon) lists your **projects** (not workspaces; the rail's switcher picks those), resting at **All projects**. The tool's searches, the memories Home hands it (**What it knows**), the tool picker and the widgets follow it. Scope is not saved.

**Drag a file onto the composer** to attach it, as a paste does. An image shows as a thumbnail; on send Slate saves it in an `attachments` folder in its app-data folder and gives the tool the path. An image unused for 30 days is removed. A text or code file is inlined under its name, cut at 20,000 characters. The same limits hold for a drop, a paste and the paperclip: an image up to 8 MB, a text file up to 1 MB. A larger file, a binary (a PDF, a zip) or a file that is not UTF-8 text is not attached, and a message names it; the other files still attach. This also works in a session's **Conversation** prompt. Dropping a file elsewhere in the app imports a folder as docs.

## Skills and mentions

**`/`** at the start of the composer lists the **skills the agent will load** here: the project's own skills from the folders that tool reads, its commands, and the personal and plugin skills of the account the project runs it as. It is read from disk, so it is there before your first message.

- Matches name first, then description; an exact name comes first.
- A pick waits as a chip; on send, the tool is told to read that skill's file and follow it.
- After Claude Code has answered, its reported commands are listed after the skills; picking one types `/name ` into the box. Only Claude Code reports commands.

**`@`** anywhere names something in the workspace: a **doc**, **session**, **memory**, **task**, **automation** or **report**. The menu shows up to five of each kind whose name holds what you typed, most recent first. A pick is a chip; on send its content goes before your message as plain text:

| Kind | Sent |
| --- | --- |
| Doc | Its text, cut at 8,000 characters and marked when cut |
| Session | Tool, folder, branch, id |
| Memory | Claim with reasoning and source |
| Task | State and link |
| Automation | Its steps |
| Report | Its text |

If Slate cannot read one, the conversation says so instead of sending without it. `/` and `@` also work in a session's **Conversation** prompt and in **Run with AI**'s *What to type in*.

## In this section

| Doc | What it covers |
| --- | --- |
| [Approvals, Stop and Agent Differences](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/approvals.md) | The approval card, autonomy, plans and questions, Stop, and what differs by agent. |
| [Agents & Model Providers](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md) | The 16 agents, each a thin driver over a CLI you already have, so no API key. |
| [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md) | Which tool has which feature, and why a gap is there. |
| [Curated MCP Commands](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/mcp-commands.md) | How Home routes a request on a light model, and the two halves of memory. |
| [Connected MCP Tools](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/connected-tools.md) | Reaching the MCP servers your tool's CLI declares. |

See also: [Slate as an MCP Server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md), [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md), [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md).
