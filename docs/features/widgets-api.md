# Widget API

What a [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) can import from Slate. Your agent gets this as TypeScript declarations from `get_widget`. Slate checks every save against them, so an unlisted call is an error before the widget runs.

## Contents

- [`@slate/sdk`](#slatesdk)
  - [Reading](#reading) · [Lists from outside Slate](#lists-from-outside-slate) · [Your MCP tools](#your-mcp-tools)
  - [Acting](#acting) · [Acting on GitHub](#acting-on-github) · [Its own data](#its-own-data)
- [`@slate/sdk/react`](#slatesdkreact)
- [`@slate/sdk/format`](#slatesdkformat)
- [`@slate/ui`](#slateui)
  - [The card](#the-card) · [Its colours](#its-colours) · [Slate's parts](#slates-parts)

```tsx
import { createRoot } from "react-dom/client";
import { slate } from "@slate/sdk";
import { useQuery } from "@slate/sdk/react";
import { BarList, Label, QueryView, Widget } from "@slate/ui";

function Week() {
  const week = useQuery(() => slate.sessions.count({ days: 7 }));
  return (
    <Widget>
      <Label>AI sessions this week</Label>
      <QueryView query={week} isEmpty={(d) => d.total === 0} empty="No AI sessions this week.">
        {(d) => <BarList rows={d.byDay.map((x) => ({ label: x.day, value: x.count }))} />}
      </QueryView>
    </Widget>
  );
}

createRoot(document.getElementById("root")!).render(<Week />);
```

Every build first checks the files against Slate's look ([The card](#the-card)): a colour, a text size or a font written by hand, a size read from the window, `position: fixed`, `Page`, `Section` or `Grid`, or a root that is not `<Widget>` is a build error at its file and line that says what to use instead. These rules hold for each new version; a version built before 2026-11-07 that breaks them still shows where it fits.

After each build Slate runs the new version once, hidden, to check it renders. It fails on an uncaught error or rejected promise, on a call refused with `not_allowed`, `bad_request` or `failed`, or when nothing shows within 10 seconds. A widget (one with a `place`) that drew is then run in three boxes, in its tab's column as the window draws it now, each at the height the person chose for it (or 480 px while its height follows what it draws): its own width, the narrowest its tab allows (a third of Home's column, half of Activity's side column) and the whole row. The person can resize it to any even run of its row's twelve columns and any height from 96 to 480 px, and the window can change, so lay it out with `Stack` and `Inline` and put the focal element in `Fit`. A version shows on its tab only at a size it was seen to fit there: after a resize or a new column, Slate runs it again at the new size, and the tab keeps the last size that fitted until then ([Widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md#showing-one)). It fails as `clipped` when its content is taller than the box, wider than it, or hidden by a box inside it. `not_granted` does not fail it. In that run, writes and outside reads (`sources.reviews`, `pulls`, `repoPulls`, `checks`, `tools.*`) get no answer. Your agent reads the result as `render` in `publish_widget` and `get_widget`: `status` is `ok`, `failed` or `pending` (Slate has not run it yet, for example because it is closed; call `get_widget` later). On `failed`, `problems` lists `kind` (`threw`, `refused`, `blank` or `clipped`), `call`, `code`, `errorClass`, `file` and `line`, and for `clipped` a `fit`: the `span` (columns), the card's `width` and `height`, `what` (`height`, `width` or `inside`), and the px the content needs (`measured`) against the px it has (`allowed`). `next` says it in one line.

`get_widget` also returns the **widget playbook** (steps and rules for building a widget) and four example widgets from `packages/shared/widget-examples/`: a chart, a tasks list that adds a task, notes kept with `useStore`, and a doc written after you approve it.

## `@slate/sdk`

By default a widget reads only what its tab shows ([below](#a-widgets-tab)). The calls that read more, or act, need a permission it asks for in `slate.json` and you allow. Everything reads and acts inside the widget's own workspace (every project, no other workspace). `since` is `"1d"`, `"7d"`, `"30d"` or `"90d"`. Lists come newest first, at most `limit` rows (default and maximum 5,000); to read on, pass the last row's time as `before`.

### Reading

| Call | What it returns |
|---|---|
| `slate.project.get()` | The project the widget was made in (id, name), or the workspace's for a widget made in none; `kind` is `"project"` or `"workspace"`. |
| `slate.docs.list({ limit })` | The workspace's docs, each with its `kind` (group, project, branch, document, session). |
| `slate.docs.get(id)` | One doc with its text. |
| `slate.memories.list({ limit })` | The workspace's memories. Memories kept away from widgets, or from this widget, are left out. |
| `slate.memories.search(text)` | The best matches for `text`, best first, ranked like recall ("deployed" finds "deploys"), with the same exclusions. |
| `slate.sessions.list({ since, limit })` | AI sessions: tool, date, title, summary. |
| `slate.sessions.count({ days })` | Sessions per day (default 7, at most 90) and per tool, for a chart. |
| `slate.sessions.live()` | AI sessions running now: `status` is `working`, `needs_you` (waiting on you) or `idle`. `needs_you` was `waiting` until 2026-11-06, so a widget that tested for `waiting` must test for `needs_you`. |
| `slate.usage.list({ since, limit })` | Agent runs (default last 30 days): tool, model, time, prompts, tokens, cost. |
| `slate.receipts.list({ since, limit })` | [Receipts](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md#receipts) of sessions that ran a check, changed a file or made a commit (default last 7 days). `flagged` is true for one that wants a look. |
| `slate.activity.list({ since, kinds, limit })` | Git activity in the workspace's folders (default last 7 days). `kind` is `"commit"`, `"branch.created"`, `"branch.switched"`, `"branch.deleted"`, `"staged"` or `"files.touched"`; pass `kinds` to take some. At most 50 files a row. |
| `slate.artifacts.list({ limit })` | The workspace's artifacts, this widget included, each with a link to open it. |
| `slate.routines.list()` | The automations in the workspace. |

### Lists from outside Slate

A widget has no network. Slate reads outside lists (Tasks from Jira, your GitHub pull requests), keeps the rows, and answers at once from what it holds. Every answer is `{ rows, fetchedAt, status, detail }`. `status` is `"ok"`, `"stale"` (old; Slate is reading again) or `"failed"` (the last read failed; `rows` are the last good ones). Other people wrote the words in rows, so Slate removes hidden characters and marks the call as outside text.

| Call | What it does | Permission |
|---|---|---|
| `slate.sources.tasks({ section, open })` | Items in Tasks, with when Tasks last synced them and whether the last sync failed. `section` is `"solve"`, `"review"`, `"reply"` or `"todo"` (your own to-dos). `"mine"`, the old name of `"todo"`, is still accepted when you ask. `open` is true unless you pass `false`; with `false` the done items come back too. | Read your Tasks |
| `slate.sources.reviews()` | Open GitHub pull requests that wait for your review: git repository, number, title, link, author, draft, updated. At most 50. | Read your GitHub |
| `slate.sources.pulls()` | Your own open GitHub pull requests, in the same shape. | Read your GitHub |
| `slate.sources.repoPulls()` | The open GitHub pull requests in the git repositories that this workspace's docs name as their remote, whoever opened them (a bot's too), in the same shape. At most 50. `author` says who. Slate picks the git repositories; a widget cannot name one. | Read your GitHub |
| `slate.sources.checks({ repo, number })` | The check runs on one pull request that `reviews` or `pulls` lists: name, status, result, link. Any other pull request is refused with `bad_request`. | Read your GitHub |

GitHub is read with the `gh` sign-in this workspace uses, by `GET` requests to four fixed kinds of address. Slate keeps rows for two minutes and does not ask GitHub again within 20 seconds of the last try, even after a failure. Across all widgets and workspaces it starts at most 12 GitHub refreshes a minute (one pull request's checks take two requests); past that a read answers `"failed"` with the last rows. A link that is not a plain `https://github.com/` address, or a time that is not ISO, comes back as `""`. A link in a Tasks row must be `http` or `https`, or it is `""`.

Read a source with `useSource` and show `SourceStatus` beside the list.

### Your MCP tools

A widget can read through MCP tools your workspace reaches. Each tool is allowed on its own, for one widget, as a read only. The screens and rules are in [Widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md#reading-through-your-mcp-tools).

| Call | What it does | Permission |
|---|---|---|
| `slate.tools.list()` | The tools this widget may read through now: name, server, description and input schema. At most 20. | — |
| `slate.tools.read({ tool, args })` | Calls one tool and answers `{ rows, fetchedAt, status, detail }`, like a source. `rows` holds one `{ text, truncated }`, or none before the first good read. | You allow each tool |

A widget lists the tools it wants in `slate.json`, as `<server>__<tool>`, at most 20:

```json
{ "tools": [{ "tool": "linear__list_issues", "why": "Show my open issues" }] }
```

The first `tools.read` of a tool shows a card. You allow it only by ticking that the tool only reads; its `readOnlyHint` never ticks the box. A tool whose name says it writes (`create`, `update`, `send`...), or whose server marks it `readOnlyHint: false` or `destructiveHint: true`, is refused with `not_allowed` and never shown.

Your allowance is pinned to a SHA-256 of the tool's name, description, input schema and annotations. If any changes, the next call is refused with `not_granted` and the card returns, marked **Changed since you allowed it**. Slate rereads each server's tool list at most once a minute.

`args` must match the input schema (types, required fields, enums, bounds, no unnamed field) and be at most 4,000 characters as JSON, or the call is refused with `bad_request` before the server hears it. So is a call to a tool whose schema uses a keyword Slate does not check (`not`, `if`, `prefixItems` and the like) at a field the call reaches, or is too large to check. `pattern` and `format` are not run; the server checks its own arguments. The answer is the tool's typed JSON if it gave one, else its text, with hidden characters removed and cut at 20,000 characters (`truncated: true`). Slate keeps an answer for a minute, does not repeat the same call within 10 seconds, and allows each server 20 requests a minute from all widgets (tool lists included); past that a read answers `"failed"`. A failure speaks in Slate's words, never the server's.

```tsx
const issues = useSource(() => slate.tools.read({ tool: "linear__list_issues", args: { state: "open" } }));
```

### Acting

| Call | What it does | Permission |
|---|---|---|
| `slate.tasks.list({ section, open })` | Items in Tasks: the open ones, or with `open: false` every item, done ones included. `section` narrows it. | Read your Tasks |
| `slate.tasks.create({ title, remindAt })` | Adds an item of your own. The title is one line, 200 characters at most. | Change your Tasks |
| `slate.tasks.remind(id, when)` | Reminds you later about an item this widget made: `"tomorrow"` or `"next-week"` (both at 9:00) or an ISO time. | Change your Tasks |
| `slate.tasks.done(id)` | Marks an item this widget made as done. | Change your Tasks |
| `slate.memories.save({ text, kind })` | Saves a new memory, after showing you its words and its kind. It never changes a memory you already have. | Save memories |
| `slate.docs.create({ title, text })` | Makes a doc in the project the widget was made in (at the top of the workspace for a widget made in none), after showing you its words. The title is one line, 200 characters at most. | Write docs |
| `slate.docs.append(id, text)` | Adds text to a doc in the project the widget was made in (any doc of the workspace for a widget made in none), after showing you its words and naming the doc. | Write docs |
| `slate.routines.run(id)` | Runs an automation; Slate asks you each time. | Run automations |
| `slate.sessions.start({ prompt })` | Opens a session with the prompt typed in; you press Send. | Open AI sessions |
| `slate.ui.open(link)` | Opens one doc, task or artifact in Slate. The link is exactly `slate://doc?id=<id>`, `slate://task?id=<id>` or `slate://artifact?id=<id>`, with an id of up to 64 letters, digits, `_` or `-`. The `link` that `artifacts.list` returns (`slate://artifacts?id=<id>`) works too. Any other link is refused. A widget cannot call it. | — |
| `slate.ui.toast(text)` | A short note at the bottom of the window, one a second at most, with the widget's name in front. | — |

A widget can only finish or remind items it made; any other id answers "No task has that id". Text a widget writes (titles, memories, doc text, session prompts, toasts) is refused with `bad_request` if it holds invisible characters: zero-width ones, variation selectors and fillers outside an emoji, direction overrides, the hidden tag block, control and private-use characters. Ordinary text, new lines, tabs, accents, other scripts, emoji and the joiners Persian, Urdu and Indic scripts need inside a word are fine. Titles and toasts are at most 200 characters.

### Acting on GitHub

A widget may act on a pull request in your own lists (`sources.reviews` or `sources.pulls`) with **Act on your GitHub** (`github.act`). Every action shows a card first, every time, with no "always allow". Slate builds the card from what it reads from GitHub, not from the widget: account, git repository, number, title, author and exact words.

| Call | What it does |
|---|---|
| `slate.github.approve({ repo, number })` | Approves a pull request waiting for your review. GitHub approves the commit the card showed. |
| `slate.github.changes({ repo, number })` | Requests changes on a pull request waiting for your review. |
| `slate.github.comment({ repo, number })` | Comments on a pull request in either list. |
| `slate.github.presets()` | Your words for this widget: `[{ id, text }]`. |
| `slate.github.label({ repo, number, label, remove })` | Adds a label the git repository already has, or with `remove: true` takes off one the pull request has. |

- **The words are yours.** A widget never sends words. You type them on the card.
- **Only your pull requests.** A git repository or number outside your lists is `bad_request`. Approving and requesting changes need the review list.
- **The card must still be true.** Slate rereads the pull request when you press the button. If anything changed (commit, title, words, account), nothing is sent and the widget hears `bad_request`.
- **5 actions an hour per widget, 20 for all widgets**, failed ones included. Past that the call is refused with `too_often`, with no card.
- **The yes waits.** The button works 0.6 seconds after the card appears; an earlier press restarts the wait.

A widget asks for a permission in its `slate.json`:

```json
{ "permissions": [{ "use": "tasks.write", "why": "Move a review to tomorrow" }] }
```

Permissions: `workspace.read` (Read your workspace: docs, memories, sessions, projects, activity, artifacts, automations and usage), `tasks.read`, `tasks.write`, `github.read`, `github.act`, `memories.write`,
`docs.write`, `routines.run`, `sessions.start`. MCP tools go under `tools` (above). A refused
call throws a `SlateError` whose `code` is one of: `not_allowed` (the widget did not ask),
`not_granted` (not allowed yet, or a tool changed), `too_often`, `bad_request`, `failed`,
`no_answer`.

### Its own data

`slate.store.get(key)`, `set(key, value)`, `delete(key)` and `keys()` keep the widget's data on
this computer, never synced, up to 1 MB.

`slate.on(area, fn)` calls `fn` when data changes in `"docs"`, `"memories"`, `"tasks"`, `"sessions"` or `"activity"`, or `"changed"` for any change. An area also hears a change Slate cannot name. A widget also hears `"place"` when its tab shows another range or project.

### A widget's tab

A widget's `slate.json` names a `"place"`. It makes one read, `slate.place.get()`, with no arguments. Slate fills in the range and project; read again on `slate.on("place")`.

- `"activity"` answers `{ place, from, to, days, project, sessions, memories }`: the range and project in Activity's side panel, the AI sessions that started in that range and project (each with usage and `project`), and the memories learned in the range, without those kept away from widgets. Memories are not narrowed to the project.
- `"home"` answers `{ place, project, running, tasks, finished }`: the AI sessions running now (working, waiting for you or idle) in this workspace's projects, your open tasks, and the receipts of sessions that finished in the last day. With a project picked, all three hold only that project and the docs under it; a session in a folder no project claims is never in `running`. `tasks` is empty unless the widget lists `tasks.read` in `slate.json` and you allowed it; a Home widget that calls `slate.place.get()` may ask for `tasks.read` with no other call using it. A task's title is its author's words.

Any call that needs a permission the widget did not ask for fails the build. `slate.ui.open` opens a doc, so it needs `workspace.read` like the other workspace reads.

Slate shows no card for a widget, on its tab or in Widgets. A call that would need one is refused at once: a permission or tool you have not allowed with `not_granted`, a write's words, a session, an automation or a GitHub action with `not_allowed`. The message says what to allow in Widgets, so show it.

## `@slate/sdk/react`

| Hook | What it does |
|---|---|
| `useQuery(load, deps, { on })` | Returns `{ data, loading, error, refresh }` and keeps the last answer while it rereads. It rereads when docs, memories or tasks change. `on` replaces that list, for example `on: ["pages", "sessions", "activity"]` for a live view; the default leaves sessions and activity out because they change often. |
| `useSource(load, deps, { on })` | Reads a source (`slate.sources.*` or `slate.tools.read`); returns `{ rows, fetchedAt, status, detail, loading, error, refresh }`. Held rows come at once. While `"stale"` it asks again every 1.5 seconds, up to 8 times. `status` is `"loading"` before the first answer. |
| `useStore(key, initial)` | One value of the widget's own data, as `[value, setValue]`, saved as it changes. |

## `@slate/sdk/format`

`dayOf(at)` and `lastDays(n)` give days as "YYYY-MM-DD", the days `sessions.count` counts by. `dayLabel(day)` gives "Mon 12" in the person's language. `duration(ms)` gives "45s", "12m", "3h 20m". `compact(n)` gives "940", "12.4k", "1.2M". `money(usd)` gives "$3.10" or "<$0.01". `count(n, "session")` gives "1 session" or "3 sessions". `timeZone()` gives the person's time zone.

## `@slate/ui`

### The card

Slate owns the frame; the widget fills it. The root of every widget is `Widget`, and these lay it out. Each takes `hideBelow="medium"` (dropped on a small card) or `"wide"` (shown only on a wide one).

- `Widget`: the root, the whole card: Slate's padding, surface, radius and text, clipped at its edge. `gap` is 1 to 4 (4 to 16 px).
- `Stack`: parts one under the other; `grow` takes the room left, `gap`, `align`, `justify`.
- `Inline`: parts side by side on one line; `wrap` lets them wrap.
- `Panel`: a quiet section inside the card.
- `Divider`: a thin line; `vertical` in an `Inline`.
- `Fit`: the focal element, scaled to the room left with its shape kept. Give its child a size of its own (`<svg width={120} height={120} viewBox="0 0 100 100">`). While the card's height follows the widget, `Fit` counts at that size, so the card never grows with its width.
- `Metric`: the number or word the card is about, 20, 24 or 40 px (`size` `md`, `lg`, `xl`).
- `Label`: what a number or part is, 12 px, one line.
- `Caption`: a quiet line, 11 px.
- `useCard()`: the card's `width`, `height` and `size` (`"small"` under 260 px, `"wide"` from 420 px, else `"medium"`), live, for drawing of your own.

Text is written in `Metric`, `Label` and `Caption`; the build refuses a text size or font set by hand. An SVG `<text fontSize>` inside `Fit` is fine.

### Its colours

`color` holds Slate's theme colours as CSS values, for a `style` or an SVG `fill` and `stroke`: `text`, `muted`, `surface`, `bg`, `border`, `hover`, `accent`, `accentText`, `ok`, `attention`, `bad`, and `chart` (five colours for categories). The same as CSS variables: `var(--text)`, `var(--muted)`, `var(--surface)`, `var(--bg)`, `var(--border)`, `var(--hover)`, `var(--accent)`, `var(--accent-text)`, `var(--ok)`, `var(--attention)`, `var(--bad)`, `var(--c1)` to `var(--c5)`. They follow the light and dark theme. A colour written by hand, or a raw palette step like `var(--n-500)`, fails the build.

### Slate's parts

Slate's own parts, in its light and dark themes:

- **Rows and groups:** `Card`, `Row`, `Header`, `SectionLabel`
- **A read's state:** `QueryView` takes what `useQuery` returned and shows the wait, an error with Retry, your words when empty, or your screen. `SourceStatus` takes what `useSource` returned and says when rows are from, that Slate is rereading, or that the last read failed.
- **Charts and numbers:** `BarList`, `Sparkline`, `StatCard`, `RankedList`
- **Controls:** `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Segmented`
- **Display:** `Badge`, `Chip`, `Avatar`, `Kbd`, `When` (like "3h ago")
- **States:** `Callout`, `EmptyState`, `ErrorState`, `Loading`, `Spinner`, `Skeleton`, `SkeletonLines`

`Page`, `Section` and `Grid` laid out a whole screen; a widget is a card, so a new version may not use them.

`react`, `react-dom/client` and `lucide-react` (every icon) are there as usual.
