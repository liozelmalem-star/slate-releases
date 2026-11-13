# Widgets

A widget is a small card that Slate runs for you: tokens per project, a review queue, a form that files tasks. You describe it, your agent writes it, and it shows on a tab: today [Activity](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md), [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md), or the side panel of a session open in [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md). Change it by asking again, or by editing its files.

A widget is a small folder of React files, built on `@slate/sdk` and `@slate/ui`. It is an [artifact](https://liozelmalem-star.github.io/slate-releases/docs/features/artifacts.md) with its own **Widgets** item on the rail. Every version is kept. The starter Slate makes a new widget from ("Your agent is building this widget…") is not one: your agent's first build is version 1, and a new version comes only when you ask for a change. There is one kind of widget. Decisions: ADR 0077, ADR 0089 and, for GitHub, ADR 0080.

## Contents

- [Making one](#making-one)
- [Showing one](#showing-one)
- [Using and changing one](#using-and-changing-one)
- [What it can read](#what-it-can-read)
- [What it can ask for](#what-it-can-ask-for)
- [Reading through your MCP tools](#reading-through-your-mcp-tools)
- [What a widget writes stays the widget's](#what-a-widget-writes-stays-the-widgets)
- [What it cannot do](#what-it-cannot-do)
- [When Slate updates](#when-slate-updates)
- [For the agent building it](#for-the-agent-building-it)
- [Limits](#limits)

## Making one

1. Open **Widgets**. With no widget open you see the **Overview**: a box at the top, then your widgets as cards, two to a row. Before your first widget, "What should Slate show you?" stands above the box.
2. Pick the tab under **Show it on** (it starts on the first tab with room), then describe the widget ("Describe a widget for Activity…") and press the arrow (or Enter). The box names the agent that builds it, your workspace's tool from Connect → Agents; press it to pick another.
3. A card and a list row appear at once, marked **Building**: "Claude Code is writing App.tsx" while a file is written, else "Building…". When done, the card shows the widget's age, or **Failed** if the last build did not pass. Once its AI session starts, the widget opens, with the chat beside its preview, so you watch it being built.

Each card shows a still picture of the widget, kept for the 24 widgets shown most recently. While your agent works on a widget it already built, the card keeps showing it, with the **Building** line over the picture. Without one for the current version, Slate runs the widget once, unseen, in the sealed Preview frame (nine cards at most at once). A pulsing doc shape shows meanwhile, then the widget's glyph after 12 seconds.

The work runs in a session Slate keeps in the background, under your own agent and account. You never see its terminal: the chat shows the conversation in Slate's own words. It does not open in Sessions. Your next message goes on in the same conversation, for Claude Code, Codex, Cursor, OpenCode, Gemini CLI and Copilot CLI, which each continue a conversation by its id. With any other agent, a message after its session ended starts a new conversation; the widget's own folder (its `WIDGET.md` and code) tells it what was built. If your agent no longer has the conversation (its transcript is gone, or it cannot resume it), Slate starts a new one with the same message, once.

A widget belongs to the workspace, not a project. The rail lists every widget in the workspace. Each gets a work folder on this computer (`sessions/<workspace>/widgets/<widget id>`), never synced; the tool writes the widget through Slate, not into it. **Delete forever** removes that folder. Slate marks it trusted so tools skip "trust this folder?".

If your agent asks something the chat cannot turn into buttons (a sign-in, a question with no card yet), the header says **Asking you** and the chat shows one line: "Claude Code needs an answer Slate cannot show here." (your tool's name), with **Open in Sessions**. If no session shows up within 30 seconds of your message, the line says it has not started yet, with the same button. A turn that ended is **Done**, never **Asking you**.

## Showing one

Slate owns the card; the widget only fills it. A widget shows on its tab only at a size it was seen to fit:

- **A few per tab.** Home shows at most 3 widgets, Activity at most 2, and a session's side panel 1, as one more tab beside Details, Changes and Turns. Each widget runs in its own sealed frame, a whole web page of its own, so each one costs memory and a render. Home is for the one thing that needs you, and a wall of widgets would bury it. Only ready widgets count, oldest first. A widget made for a full tab is still built: it waits off the tab, not drawn and taking no room, until you move one of the others to the Trash. Under **Show it on**, a full tab says "Full — 3 of 3", and picking it shows "Home is full — 3 of 3. Take one off or move one to Trash first." The waiting widget's own Preview says so in one line, in place of the **Move here** bands, and it cannot be placed until there is room. The tab itself shows no warning.

- **No pass, no show.** A version shows once it is built, is not the starter Slate makes it from ("Your agent is building this widget…"), passed its check ([The chat](#the-chat)), and was run at the size it sits at now and fitted. A version that waits for its check, failed it, or was never checked does not show. While a newer one waits or failed, the one before stays. Until the first fits, the widget is not on its tab at all and takes no room there; its own Preview shows it all along, and it can be placed before it shows.
- **A new size is checked first.** When you resize it, or your window draws its tab's column at another width, Slate runs it once, unseen, at the new size. Until it fits there, the tab keeps drawing the last size it fitted, scaled to its place if the column is narrower. If it does not fit, its Preview says "Doesn't fit at this size." with **Fix with AI**, which only you press.
- **A hard box.** On the tab and in the Preview the widget's frame is exactly its card: the width of its columns, and the height you set or, while its height follows the widget, what it draws, at most 480 px. That height is measured with the widget laid out at its width and no height of its own, so a face sized from the width cannot make the card grow and grow. Nothing it draws can paint outside the card.
- **Widgets made before 2026-11-07** keep showing where they are only if they fit: the first window that draws their tab runs each once at its size. The build rules below apply to new versions only, so an older version that breaks them is not hidden for it; your next ask to the agent gets the build errors.

Where it sits and how big it is are set only in the widget's own setup, never on the tab: a tab has no Add widget, no menu and nothing that moves a widget. Where it shows is said in grey: "On Activity", "On Home" or "On Sessions" in the Widgets list, and the tab's icon on its card.

You place it on the **Preview** when your widget is open. The preview is the real tab, laid out at the width it has in your window right now and at the height of its own content, then drawn small enough to show the whole tab at once, centred, from the greeting to the last widget. It never scrolls. Its columns and your widget's card are the ones you will see on the tab. Nothing of the tab itself can be clicked there. Your widget shows live, marked in blue. One line above it says "Point at the widget to size or move it".

- **Where it can go**: every gap between the tab's own parts. On Home the parts are the greeting, the resume notice, what needs you, what is running, Back to chat and the box. On Activity they are the cards of the side column. A widget sits only in a gap, never on a part. Each gap is rows of twelve columns, and a widget takes a run of them anywhere in a row: at the left, in the middle, at the right. Widgets in one row never overlap.
- **Moving it**: drag the widget. While you drag, every row and band shows its columns faintly, and a blue outline shows where it would go, snapped to the column nearest its left edge. Let go to put it there, in any gap. Columns already taken in that row move it to the nearest free ones, else to a new row under it. A dashed **Move here** band sits in every gap it is not alone in: in a gap with no widget, or under the last row of a gap, for a row of its own. Click a band and it moves there, at the same columns. **Esc** cancels a drag.
- **Its height**: until you set one, the card is as tall as what the widget draws. Drag its bottom edge or its corner to set one; from then on that height wins. The bar's height button lets it follow the widget again.
- **Resizing it**: drag its right edge for the width, its bottom edge for the height, or its corner for both. The width snaps two columns at a time, so it always fits the middle of a row exactly. The height is any px. While you pull, an outline shows the new size and a label says it, for example "8 cols × 200 px". **Esc** keeps the old size.
- **The bar**: point at the widget, or focus it, and a small bar shows on it, centred, above it (under it when there is no room above), never past the preview's sides. It has **⅓**, **½** and **Full** for the width; its size now ("6 cols × 144 px", or "6 cols × auto" while its height follows the widget), with a button that lets a set height follow the widget again; **To the left**, **To the middle** and **To the right** in its row; and **Move to the spot above** or **below**. Each applies at once. The keyboard mark says what the keys do. The bar hides while you drag or resize.
- **Keyboard**: focus the widget (Tab). ← and → move it a column; ↑ and ↓ move it to the gap above or below. With Shift, ← and → make it two columns narrower or wider, ↑ and ↓ 8 px shorter or taller. Tab then reaches the bar.
- **Limits**: at least 160 px wide, so it stays usable: a third of Home's column (216 px, four columns) and half of Activity's side column (174 px in the preview, six columns). At most the whole row. Between 96 and 480 px tall: at 480 a widget is about half of a 14-inch window, so the tab's own parts stay one short scroll away.
- **A new widget** sits in a row of its own, as tall as it draws: under the box on Home, half the column wide; at the top of Activity's side column, the whole column wide.
- **A narrow column**: in a column under 352 px wide every widget takes the whole width, one under the other, each at its own height. This follows the column, not the window, so the preview and the tab always agree.

Each change saves at once. A widget always shows on its tab once it is ready; moving it to the Trash is how it leaves. When a part is not on the tab for a while (no card waits, nothing runs), a widget after it sits after the nearest part above it, in rows after that gap's own. On Activity with nothing captured yet, the widgets still show, beside the empty board.

On its tab a widget looks like the tab's own parts, as tall as you made it, or as tall as it draws:

- **Home:** on the same card as the cards that need you, with the same corners, border and ground, and no title.
- **Activity:** like the cards in the board's side column: its name on top, in the same small heading as "Last 13 weeks", and the widget under it, with no card round it.
- **A session's side panel:** one more tab, named for the widget, built like Details: a section headed with its name, and the widget under it.

On Home and Activity, pointing at it shows one button, which opens its setup in Widgets. While a widget draws, its card shows the loading mark. A widget that fails to draw within 10 seconds says "This widget did not draw." Open it in Widgets to see why.

Its tab is fixed when you make it: its code reads that tab's data. To show the same idea on another tab, make another widget. Its gap, row, columns and height can change any time. Placement lives in the workspace's own store, with the widget, and goes with it on **Delete forever**.

## Using and changing one

A widget opens as a builder under the same header every place has. It reads **Widgets /** and the widget's name; pressing **Widgets** goes back to the Overview. Then the tabs **Preview | Files**, and on the right the chat button, **‹ v2 of 3 ›** (from two versions) and **⋯**. **⌘\\** shows or hides the Widgets list. The chat stays open on the left in every view; **Hide chat** / **Show chat** toggles it, remembered per widget.

- **Preview**: the widget on its tab, updating as the chat works. A widget for Sessions shows in the session's side panel, with the panel's tabs along its top and **Widgets** picked. Drag it, resize it by its edges, or use the bar that shows on it, and a **Move here** band sits in every gap it can go to ([Showing one](#showing-one)). Also **Reload** and **Full size** (Esc returns). A line under it says what it can reach: "Reads Personal. No internet." **Point at it**, then click a part of the widget on the tab, to ask the chat about that part.
- **Files**: the widget's folder as a tree and an editor. Add a file (a path like `lib/format.ts` makes its folder) or remove one. The save button counts changes ("Save 2 changes", ⌘S); **Discard** puts your edits back.
  - **Diff** shows the open file against the version before and puts a change back as an edit. Select lines and press the speech bubble to ask the chat about them.
  - Slate checks types and builds. If either fails, nothing is saved, your edits stay, and each error opens its file at its line. Only the newest version of your own widget is editable.
- Versions: **‹ v2 of 3 ›** steps through them. **Restore** brings an older one back as the newest.
- Permissions: the **⋯** menu has one switch for each permission the widget asked for, and one for each MCP tool it names. On means allowed. Off takes it back. A widget that asks for nothing shows no switches.
- **Trash**: **⋯ → Move to Trash** keeps every version and asks nothing. A widget your agent has not built yet (still its starter) was never made, so its menu has **Delete forever** instead, which asks first and keeps nothing in the Trash. In **Trash**, **Restore** brings it back and **Delete forever** asks first. A trashed widget does not run, and search and agents cannot find or change it. In a shared workspace teammates lose it until you restore it.

A teammate's widget has Preview and Files only, read-only. The chat is the author's.

A link to a widget under Artifacts (from ⌘K, Activity or a tool) opens it in Widgets.

### The chat

Ask for anything: "make the buttons green", "add a filter for this week". Your messages and your agent's replies show as a conversation, the way Slate's own agent shows one. **New chat** starts over. The header names your agent and its state: **Asking you**, **Working** or **Done**. The agent's work shows as quiet lines under its reply, each as it happens ("Read `App.tsx`", "Edited `App.tsx` +18 −4", "Ran `yarn tsc --noEmit`, no errors") with its time. A finished run of more than three steps folds to one line, "12 steps", that opens it. **Stop** sends Esc to the terminal and can be pressed again after 3 seconds, because two quick Esc presses open Claude Code's rewind list.

- **Questions are cards.** A question shows numbered options; one click answers. **Something else** lets you type. For a command or file edit, the card shows the exact command or file with **Allow once** and **Deny**. Answered cards fold to "You answered …".
- **A click is a key press for the question you saw.** Slate rereads the terminal first; if the question changed, nothing is sent and the chat says so. A new card ignores clicks for half a second. Text the session printed never becomes a card.
- **Which tools get cards.** Claude Code: steps with times, question and permission cards. Codex: steps with times; its questions and permissions show the one line with **Open in Sessions**. Gemini CLI and OpenCode: steps without times; Cursor: steps without times or what they printed. Copilot CLI: what you asked and what the tool said, no steps. Anything these four ask shows that line.
- **Every version stays in the chat** as one quiet line, with who made it, and **Restore** brings an older one back.
- **Ideas and Discuss.** Each answer ends with up to three ideas, each a button that asks for it. **Discuss** talks a change through and changes nothing; **Build it** then asks for what it planned.
- **Each new version is built to Slate's look.** The build refuses, at the file and line, with what to use instead: a colour written by hand (hex, `rgb()`, `hsl()`, a colour's name, a raw palette step), a text size or font written by hand, a size read from the window (`vh`, `vw`, `h-screen`, `window.innerWidth`), `position: fixed`, a whole screen's layout (`Page`, `Section`, `Grid`), and a root that is not `<Widget>`. The agent fixes them in its own turn.
- **Each new version is checked.** After a build, Slate runs it once, hidden, with no network, in the Preview frame. Writes and outside reads (GitHub, MCP tools) get no answer and show no card. The version fails if it throws, if Slate refuses a call, or if nothing shows within 10 seconds. A widget that drew is then run in three boxes, in its tab's column as your window draws it, all at the height you gave it (or 480 px, the most a card grows to, while its height follows it): its own width, the narrowest its tab allows, and the whole row. You can resize it to any width between, so it must fit them all. It fails if its content is taller than the box, wider than it, or cut off or scrolled inside its own box. The chat then names the box and the px, for example "at 4 columns (216 px wide, 240 px tall) its content is 412 px tall, so the bottom is cut off". Asking for a permission does not fail it. The chat says: "Version 3 built, but did not render: docs.get was refused (bad_request)." with file and line when known. The last good version stays on screen until a new one renders, and a note says which you see.
- **Slate asks the tool to fix it.** The failure is in the answer to `publish_widget`, so the tool usually fixes it in the same turn. If the tool has finished, Slate types one message into the session with only what it checked (call, code, kind of error, file, line), never the widget's words. The step ends "Asked Claude Code to fix it." At most twice per ask. After that, or for a version you saved, the step has **Fix with AI**.
- **Fix with AI** also appears when the widget stops type-checking or stops on an error. It sends only the file (if the widget's own), line and kind of error (a `TypeError`, say), never the widget's error text, because a widget's words are not trusted as instructions. **Quote it** puts that text in the chat box as an editable quote. Invisible characters are removed from anything the widget wrote.

## What it can read

By default a widget reads only what its tab shows, and follows what you pick there. Slate, not the widget, decides the range and project.

- **On Activity:** the AI sessions that started in the range and project picked in Activity's side panel, and the memories learned in that range. Memories follow the range only, not the project. It reads again when you pick another. Memories kept away from widgets are left out.
- **On Home:** what is live now, for the project picked on Home (or every project): the AI sessions running in this workspace's projects, and the receipts of sessions that finished in the last day. Your open tasks come too, but only for a widget that asks for `tasks.read` and that you allowed; without it the list is empty.
- **On Sessions:** the one session open beside it, whichever tool runs it: its tool, title, branch, state, project, model, and what it used so far (prompts, active time, tokens, cost). It reads again when you open another session, and as the session works. A session outside this workspace's projects reads as none. The transcript is not part of it. It only shows; it cannot type into the session, approve, or stop it.

A widget keeps its **own data** (up to 1 MB) on this computer, never synced, and can show a toast. Everything else needs a permission. Every call is in [Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md).

## What it can ask for

A widget may ask for more in its `slate.json`, each with a reason. Reading stays inside its own workspace (every project, no other workspace; Personal widgets never read a shared workspace, nor the reverse). When a new widget's first version asks for more than its tab shows, its chat shows one card with what it asks and why, with **Allow** or **Not now**. **Allow** grants exactly what the card lists. After **Not now**, or for a permission a later version adds, turn it on with the switches in the widget's **⋯** menu. On its tab a widget never asks you: a call that needs your OK is refused at once, and the widget shows a line that says what to allow in Widgets. You can take any permission back with the same switches.

| Permission | What it allows |
|---|---|
| Read your Tasks | The open items in Tasks, and with `open: false` the done ones too. |
| Change your Tasks | Add your own items, set reminders, mark items done. |
| Read your GitHub | Your open pull requests, the ones waiting for your review, and their checks. Read only, as the GitHub account this workspace uses. |
| Act on your GitHub | Ask to approve, request changes on, comment on or label your pull requests. Slate shows each action first, every time. |
| Save memories | Save memories in the project the widget was made in, or the workspace. Each is held until you release it. |
| Write docs | Make docs and add text to docs in the workspace. |
| Run automations | Run an automation. Slate asks each time, naming it. |
| Open AI sessions | Open a session with a prompt typed in. You press Send. |

Even when allowed, a memory or doc write shows its words on a card first: the whole text in a scrolling box with its length, a flag for invisible characters, and the doc or memory kind. Slate's server writes the card's words and gives the window a one-time ticket. The write runs only when the ticket comes back for the same widget, call and words within 5 minutes. The widget never sees it.

An action on GitHub has a red card, since it cannot be undone. It names the account, pull request, title and exact words. The words are never the widget's: you type them on the card. Slate rereads the pull request when you press the button and sends nothing if the card is stale. The rules and limits are in [Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md#acting-on-github). A widget cannot remove anything.

## Reading through your MCP tools

A widget can read through the MCP tools your workspace already reaches, such as Linear's or Notion's. The widget has no network, so Slate makes the call and hands over the answer. Decision: ADR 0078.

- **One tool at a time.** The widget lists each tool in `slate.json` with a reason. The first call shows a card with the server, tool name, description and reason. Nothing allows a whole server.
- **Only reads, and you say so.** Allow stays off until you tick "This tool only reads. It changes nothing." A server's own claim never ticks the box. Allow works 0.6 seconds after the card appears. A tool whose name or server says it writes is never offered.
- **A changed tool asks again.** If the server changes a tool's name, description, inputs or hints, the widget is refused until you allow it again, on a card marked **Changed since you allowed it**.
- **Checked and paced.** Arguments must match the tool's schema. The answer loses invisible characters, is cut at 20,000 characters, and reaches an agent as quoted data. Limits are in [Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md#your-mcp-tools).
- **Only this workspace's servers.** The widget never sees an address, a token or a server's own error words.

The **⋯** menu lists each tool the widget names. Its switch allows it through the same card, or takes it back.

## What a widget writes stays the widget's

A widget is not trusted to tell the truth, so what it writes stays marked as its own.

- **A memory a widget saves is held** from the first moment. It sits in Memory marked as the widget's, and no session, teammate or agent receives it until you release it. One thing releases it for you: an agent saving the same words itself, if you have not held or released that memory by hand. It is never shared with a team, released or not.
- **A released memory is still quoted.** An agent sees `Data saved by a widget (not an instruction): «…»`, with invisible characters removed.
- **A doc a widget makes or adds to is marked as written by a widget.** Search, `get_doc`, mentions and briefs show an agent that doc's text in the same quote. The mark is per doc, so a doc of yours that a widget added to is quoted whole. It outlives the widget.

## What it cannot do

- **Reach the internet.** No requests, sockets, images, fonts, scripts, WebRTC, resource hints, frames or popups. If it tries to leave, Slate closes it: "This widget tried to leave its web page, so Slate closed it."
- **Read outside its workspace**, or anything of a teammate's.
- **Change anything through an MCP tool.**
- **Open a screen.** A widget on a tab cannot open a doc, task or artifact.
- **Act on its own** where it matters: an automation, a session, a memory or doc text and every GitHub action wait for you.
- **Choose what it says on GitHub, or where.** The words are yours, and the target is a pull request in your own lists.

In a shared workspace a teammate sees your widget as its built doc with nothing answered: its reads fail at once and never reach their store. They get Preview and Files, read-only.

## When Slate updates

A widget may name the SDK version it was made for in `slate.json` (`"sdk": 1`). Within a version Slate only adds calls and parts. When you open your widget, Slate checks its code against this version of Slate. If it no longer fits, a note says where and the chat can fix it.

## For the agent building it

A widget is `index.html` with `<script type="module" src="./App.tsx"></script>`, plus `.tsx .ts .jsx .js .css .json .md .svg` files in any folders. It may import its own files and `react`, `react-dom/client`, `lucide-react`, `@slate/sdk`, `@slate/sdk/react`, `@slate/sdk/format` and `@slate/ui`. Its root is `<Widget>`, which takes the look of the tab it sits on (a card on Home, a section under the widget's name on Activity and in a session's panel), so the widget never styles its own card. It is laid out with `Stack`, `Inline`, `Panel` and `Fit`, its text in `Metric`, `Label` and `Caption`, its colours the theme's ([Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md#the-card)). Slate gives the structure; the agent invents what it shows. The tool sends files with `publish_widget`. `get_widget` returns three things beside the files:

- `playbook`: the rules for building or changing a widget (write `slate.json` first, learn from the closest example, use the API exactly, build the card from `@slate/ui`'s structure and the theme's colours, never call the network, fix every error Slate reports). Slate's prompts carry only your ask and the widget's id, so every agent follows the same rules.
- `sdk`: the whole API as TypeScript declarations, which every build is checked against. See [Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md).
- `examples`: four whole widgets that build, and your other widgets in this workspace by id and title.

Both tools take the argument `widget_id`. `get_app` and `publish_app` still answer for one release, as deprecated aliases that take `app_id`.

Every publish checks the code against `slate.json`. A call without its permission listed (such as `slate.tasks.create`) is a build error at its line, and so is a permission no call uses. The check reads source text, so it misses a call made through another name (`const s = slate`); Slate still refuses at run time any call you have not allowed.

`publish_widget` and `get_widget` return `render` (`ok`, `failed` or `pending`); fields are in [Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md).

## Limits

300 files per widget. 1 MB of its own data. 20 MCP tools per widget. Other limits are in [Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md).
