# Widgets

A **widget** is a small card your agent builds for you and Slate shows on a tab: tokens per project on Activity, a review queue on Home, a session's cost beside it in Sessions. You describe it, your agent writes it, and you change it by asking again. A widget reads only what you allow, and never reaches the internet.

## Make one

1. Open **Widgets**. With no widget open you see the **Overview**: a box at the top, then **Your widgets** as cards.
2. Under **Show it on**, pick the tab: **Home**, **Activity** or **Sessions**.
3. Describe the widget ("Describe a widget for Activity…") and press Enter. The box names the agent that builds it, your workspace's agent from [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md); click it to pick another.

A card appears at once, marked **Building**. The widget then opens with its chat beside the preview, so you can watch it being built. When the build ends, the card shows its age, or **Failed**.

Your agent works in a session Slate keeps in the background, under your own account. It does not show in Sessions. If it asks something the chat cannot show as buttons, the chat says "needs an answer Slate cannot show here" with **Open in Sessions**.

## Where it shows

A widget shows only on the tab it was made for, because its code reads that tab's data. To show the same idea on another tab, make another widget.

| Tab | Widgets at most | How it looks |
| --- | --- | --- |
| **Home** | 3 | On a card like the cards that need you, with no title |
| **Activity** | 2 | In the side column, under its name |
| **Sessions** | 1 | One more tab in an open session's side panel, beside **Details**, **Changes** and **Turns** |

When a tab is full, a new widget is still built but waits off the tab until you move another to Trash. **Show it on** says "Home is full — 3 of 3. Take one off or move one to Trash first."

A version shows on its tab only after it built, passed its check, and was seen to fit at its size. Until then the version before stays. A widget that does not draw within 10 seconds says "This widget did not draw." Pointing at a widget on its tab shows one button, which opens it in Widgets.

You choose where it sits and how big it is on its **Preview** in Widgets, never on the tab: [Place and size a widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets/placing.md).

## Change one

An open widget has **Preview** and **Files**, the chat on the left (**Hide chat** / **Show chat**), the versions **‹ v2 of 3 ›** and **⋯**.

- **The chat**: ask in your own words, such as "make the buttons green". The header says **Working**, **Asking you** or **Done**. Your agent's steps show as quiet lines under its reply. **Discuss** talks a change through and changes nothing; **Build it** then makes it. Each answer ends with up to 3 ideas you can click.
- **Questions**: with Claude Code, a question or a permission request shows as a card with buttons. Other agents show **Open in Sessions** instead.
- **Preview**: the widget on its tab, live. **Reload**, **Full size**, and **Point at it**, which lets you click a part of the widget to ask the chat about it. A line says what it reads, such as "Reads Personal. No internet."
- **Files**: the widget's files in an editor. Save with **Save 2 changes** or ⌘S; **Discard** undoes your edits. **Diff** compares with the version before. Slate checks types and builds before it saves; if either fails, nothing is saved and each error opens at its line.
- **Fix with AI**: shows when a version fails its check, does not fit, or stops on an error. It sends your agent only the file, line and kind of error, never the widget's own words. **Quote it** puts the widget's error text in the chat box for you to read first.
- **Versions**: every version stays. **‹ v2 of 3 ›** steps through them, and **Restore** brings an older one back as the newest.
- **⋯**: a switch for each permission and MCP tool the widget asked for, and **Move to Trash**. Trash keeps every version; **Restore** there brings it back.

A teammate's widget opens read-only, with **Preview** and **Files** only.

## What it can read and do

By default a widget reads only its tab: on Activity, the sessions and memories for the range and project picked there; on Home, the sessions running now and receipts from the last day; on Sessions, the session open beside it. It can also keep up to 1 MB of its own data on this computer and show a toast.

Anything more needs a permission the widget names in its setup, with a reason. A new widget's first version shows one card in its chat with what it asks for and why: **Allow** or **Not now**. Later, use the switches in **⋯**. Reading always stays inside the widget's own workspace.

| Permission | What it allows |
| --- | --- |
| **Read your workspace** | Your docs, memories, sessions, usage and automations in this workspace |
| **Read your Tasks** | Every open item in Tasks, from every connected app |
| **Change your Tasks** | Add your own items, set reminders and mark them done |
| **Read your GitHub** | Your open pull requests, the ones waiting for your review, and their checks |
| **Act on your GitHub** | Approve, request changes on, comment on or label your pull requests |
| **Save memories** | Save memories in this project |
| **Write docs** | Make docs and add text to docs in this project |
| **Run automations** | Run one of your automations |
| **Open AI sessions** | Open a session with a prompt typed in |

The last five also need your OK for each call. Slate shows a card above the widget, on its tab or in the Widgets preview, with the exact words it would save, the doc it adds to, the prompt or automation, or the GitHub action and the account it acts as. The button names what it does, such as **Save memory** or **Approve on GitHub**, and works a moment after the card appears. **Not now** refuses, and nothing is written. A comment or review on GitHub posts only words you type on the card. A session opens on the project the tab shows, with the prompt typed in for you to send. One card shows at a time.

A widget can also read through an MCP tool your workspace reaches, such as Linear's, one tool at a time. Its card shows the server, the tool and the reason, and **Allow** works only after you tick "This tool only reads. It changes nothing." If the tool changes later, the card asks again, marked **Changed since you allowed it**.

## What a widget writes stays the widget's

A memory a widget saves is held: no session, teammate or agent receives it until you release it in Memory, and it is never shared with a team. When an agent does read one, it gets it as quoted data, never as an instruction. A doc a widget writes to is marked as written by a widget, and agents see its text quoted the same way.

## What it cannot do

- Reach the internet. If it tries to leave its web page, Slate closes it.
- Read another workspace, or anything of a teammate's.
- Change anything through an MCP tool.
- Type into a session, approve, or stop one.

The reference for building one is [Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets/api.md).
