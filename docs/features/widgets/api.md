# Widget API

This is what a [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) can import from Slate. Your agent gets the same API as TypeScript declarations from `get_widget`, and Slate type-checks every save against them, so a wrong call is an error at its file and line before the widget runs.

## Contents

- [The tools and the files](#the-tools-and-the-files)
- [Permissions and errors](#permissions-and-errors)
- [Reading](#reading) · [The tab it reads](#the-tab-it-reads) · [Lists from outside Slate](#lists-from-outside-slate) · [Your MCP tools](#your-mcp-tools)
- [Acting](#acting) · [Its own data and events](#its-own-data-and-events)
- [`@slate/sdk/react`](#slatesdkreact) · [`@slate/sdk/format`](#slatesdkformat) · [`@slate/ui`](#slateui)
- [The checks each version passes](#the-checks-each-version-passes)

## The tools and the files

An agent builds a widget with two MCP tools, both taking `widget_id`:

- `get_widget` returns the files, the `playbook` (the rules for building a widget), `sdk` (the whole API as declarations), `examples` (4 whole widgets: a sessions chart, a tasks list that adds a task, notes kept with `useStore`, a doc written from commits) and the workspace's other widgets by id and title.
- `publish_widget` sends the files and returns `render` ([below](#the-checks-each-version-passes)).

A widget is `index.html` with one `<script type="module" src="./App.tsx"></script>`, plus files ending in `.tsx .ts .jsx .js .css .json .md .svg`, in any folders, at most 300. It may import its own files and `react`, `react-dom/client`, `lucide-react`, `@slate/sdk`, `@slate/sdk/react`, `@slate/sdk/format` and `@slate/ui`.

`slate.json` says what it is and what it asks for:

```json
{
  "name": "Reviews",
  "place": "home",
  "sdk": 1,
  "permissions": [{ "use": "tasks.write", "why": "Move a review to tomorrow" }],
  "tools": [{ "tool": "linear__list_issues", "why": "Show my open issues" }]
}
```

- `place` is `"home"`, `"activity"` or `"sessions"`: the tab it shows on.
- `sdk` is the API version it was made for, now `1`. Within a version Slate only adds calls and parts.
- Every call that needs a permission must have it listed, and every listed permission must be used by a call. Either mistake is a build error at its line.

## Permissions and errors

| Permission | On screen |
| --- | --- |
| `workspace.read` | Read your workspace |
| `tasks.read` | Read your Tasks |
| `tasks.write` | Change your Tasks |
| `github.read` | Read your GitHub |
| `github.act` | Act on your GitHub |
| `memories.write` | Save memories |
| `docs.write` | Write docs |
| `routines.run` | Run automations |
| `sessions.start` | Open AI sessions |

A refused call throws `SlateError` with a `code`:

| Code | Means |
| --- | --- |
| `not_allowed` | `slate.json` does not list the permission, or the call needs the person's OK where no card can show |
| `not_granted` | Listed, but the person has not allowed it yet, or an MCP tool changed |
| `bad_request` | The arguments are wrong, or the target is not one the widget may touch |
| `failed` | Slate could not do it |
| `no_answer` | No answer came |
| `too_often` | Past a rate limit (toasts, GitHub actions) |
| `declined` | The person pressed **Not now** on the card |
| `busy` | Another card is waiting for the person's answer |

A call that needs the person's OK each time (`memories.save`, `docs.create`, `docs.append`, `routines.run`, `sessions.start` and every `github.*` action) shows Slate's card above the widget, on its tab and in the Widgets preview, and waits for the answer. It runs only on the person's yes. Where no card can show (a thumbnail, the render check), it is refused with `not_allowed`. A call needing a permission not yet allowed is refused with `not_granted`. Each message says what to do, so show it.

## Reading

Every read stays inside the widget's workspace. `since` is `"1d"`, `"7d"`, `"30d"` or `"90d"`. Lists come newest first, at most `limit` rows (default and maximum 5,000); pass the last row's time as `before` to read on.

| Call | Returns | Needs |
| --- | --- | --- |
| `slate.place.get()` | What the widget's tab shows now ([below](#the-tab-it-reads)) | — |
| `slate.project.get()` | Where the widget was made: a project, or the workspace (`kind`) | `workspace.read` |
| `slate.docs.list({ limit })` | The workspace's docs, each with its kind | `workspace.read` |
| `slate.docs.get(id)` | One doc with its text | `workspace.read` |
| `slate.memories.list({ limit })` | The workspace's memories, without those kept away from widgets | `workspace.read` |
| `slate.memories.search(text)` | The best matches, ranked like recall | `workspace.read` |
| `slate.sessions.list({ since, limit })` | AI sessions: tool, date, title, summary | `workspace.read` |
| `slate.sessions.count({ days })` | Sessions per day (default 7, at most 90) and per tool | `workspace.read` |
| `slate.sessions.live()` | Sessions running now; `status` is `working`, `needs_you` or `idle` | `workspace.read` |
| `slate.usage.list({ since, limit })` | Tool, model, time, prompts, tokens and cost per session (default 30 days) | `workspace.read` |
| `slate.receipts.list({ since, limit })` | Sessions that ran a check, changed a file or made a commit (default 7 days) | `workspace.read` |
| `slate.activity.list({ since, kinds, limit })` | Git activity (default 7 days); `kind` is `commit`, `branch.created`, `branch.switched`, `branch.deleted`, `staged` or `files.touched` | `workspace.read` |
| `slate.artifacts.list({ limit })` | The workspace's artifacts, each with a link | `workspace.read` |
| `slate.routines.list()` | The workspace's automations | `workspace.read` |
| `slate.tasks.list({ section, open })` | Items in Tasks; `open` defaults to true | `tasks.read` |

## The tab it reads

`slate.place.get()` takes no arguments; Slate fills in what the tab shows. Read again on `slate.on("place")`.

- **`activity`**: `{ place, from, to, days, project, sessions, memories }`. The sessions that started in the range and project picked in Activity, and the memories learned in the range (not narrowed to the project).
- **`home`**: `{ place, project, running, tasks, finished }`. Sessions running now, your open tasks, and receipts of sessions that finished in the last day. `tasks` is empty unless the widget lists `tasks.read` and the person allowed it.
- **`sessions`**: `{ place, session }`. The session open beside it, or `null`. `session` holds `tool`, `title`, `branch`, `status`, `lastActiveAt`, `project`, `githubRepo` ("owner/name" or `null`), and from the last week's usage `model`, `startedAt`, `activeMs`, `prompts`, `tokens` and `costUsd`, each `null` when not measured. To show the issues of the session's project, read `slate.sources.tasks({})` and keep rows whose `key` starts with `githubRepo` and `#`, ignoring case.

## Lists from outside Slate

A widget has no network. Slate reads outside lists itself, keeps the rows, and answers at once with `{ rows, fetchedAt, status, detail }`. `status` is `"ok"`, `"stale"` (Slate is reading again) or `"failed"` (`rows` are the last good ones). Hidden characters are removed from the rows. Read a source with `useSource` and show `SourceStatus` beside it.

| Call | Returns | Needs |
| --- | --- | --- |
| `slate.sources.tasks({ section, open })` | Items in Tasks, with when they last synced. `section` is `solve`, `review`, `reply` or `todo` | `tasks.read` |
| `slate.sources.reviews()` | Open pull requests waiting for your review, at most 50 | `github.read` |
| `slate.sources.pulls()` | Your own open pull requests | `github.read` |
| `slate.sources.repoPulls()` | Open pull requests in the workspace's projects, anyone's, at most 50. Slate picks the projects | `github.read` |
| `slate.sources.checks({ repo, number })` | The checks on one pull request from `reviews` or `pulls`; any other is `bad_request` | `github.read` |

GitHub is read with the workspace's `gh` sign-in. Slate keeps rows for 2 minutes, does not ask again within 20 seconds, and starts at most 12 GitHub reads a minute across all widgets; past that a read answers `"failed"` with the last rows.

## Your MCP tools

| Call | Returns |
| --- | --- |
| `slate.tools.list()` | The tools this widget may read through now: name, server, description, input schema |
| `slate.tools.read({ tool, args })` | One tool's answer as a source: `rows` holds one `{ text, truncated }` |

List each tool under `tools` in `slate.json` as `<server>__<tool>`, at most 20. The person allows each one, as read-only, with its switch in Widgets. A tool whose name says it writes (`create`, `update`, `send`…), or whose server marks it `readOnlyHint: false` or `destructiveHint: true`, is refused with `not_allowed`. If the tool's name, description, input schema or hints change, calls are refused with `not_granted` until the person allows it again.

`args` must match the tool's input schema and be at most 4,000 characters as JSON, or the call is `bad_request`. The answer is cut at 20,000 characters (`truncated: true`). Slate keeps an answer for 1 minute, does not repeat a call within 10 seconds, and allows each server 20 requests a minute from all widgets.

## Acting

| Call | Does | Needs |
| --- | --- | --- |
| `slate.tasks.create({ title, remindAt })` | Adds an item of your own; title at most 200 characters | `tasks.write` |
| `slate.tasks.remind(id, when)` | `"tomorrow"`, `"next-week"` (both 9:00) or an ISO time, for an item this widget made | `tasks.write` |
| `slate.tasks.done(id)` | Marks an item this widget made as done | `tasks.write` |
| `slate.memories.save({ text, kind })` | Saves a new memory, held until the person releases it | `memories.write` |
| `slate.docs.create({ title, text })` | A new doc in the widget's project (markdown) | `docs.write` |
| `slate.docs.append(id, text)` | Adds markdown to a doc in the widget's project | `docs.write` |
| `slate.routines.run(id)` | Runs an automation | `routines.run` |
| `slate.sessions.start({ prompt })` | Opens a session with the prompt typed in | `sessions.start` |
| `slate.github.approve({ repo, number })` | Approves a pull request waiting for your review | `github.act` |
| `slate.github.changes({ repo, number })` | Requests changes on one | `github.act` |
| `slate.github.comment({ repo, number })` | Comments on one from either list | `github.act` |
| `slate.github.label({ repo, number, label, remove })` | Adds an existing label, or removes one | `github.act` |
| `slate.ui.open(link)` | Opens `slate://doc?id=…`, `slate://task?id=…` or `slate://artifact?id=…` | `workspace.read` |
| `slate.ui.toast(text)` | A short note, at most one a second, 200 characters | — |

The calls that need the person's OK wait for their card ([above](#permissions-and-errors)). `sessions.start` opens on the project the tab shows and fails without one. A GitHub action is limited to 5 an hour per widget and 20 for all widgets, and the words are always the person's, never the widget's. Text a widget writes is `bad_request` if it holds invisible characters such as zero-width or direction-changing ones.

## Its own data and events

`slate.store.get(key)`, `set(key, value)`, `delete(key)` and `keys()` keep the widget's data on this computer, never synced, at most 1 MB in all.

`slate.on(area, fn)` calls `fn` when data changes in `"docs"`, `"memories"`, `"tasks"`, `"sessions"` or `"activity"`, or `"changed"` for any change. `"place"` fires when the tab shows another range, project or session. It returns a function that stops listening.

## `@slate/sdk/react`

| Hook | Does |
| --- | --- |
| `useQuery(load, deps, { on })` | `{ data, loading, error, refresh }`, keeping the last answer while it reads again. Rereads on `docs`, `memories` and `tasks` by default; `on` replaces that list |
| `useSource(load, deps, { on })` | For `slate.sources.*` and `slate.tools.read`: `{ rows, fetchedAt, status, detail, loading, error, refresh }`. While `"stale"` it asks again every 1.5 seconds, up to 8 times |
| `useStore(key, initial)` | `[value, setValue]` for one value of its own data |

## `@slate/sdk/format`

`dayOf(at)` and `lastDays(n)` give "YYYY-MM-DD" days, the keys `sessions.count` uses. `dayLabel(day)` gives "Mon 12". `duration(ms)` gives "45s", "12m", "3h 20m". `compact(n)` gives "940", "12.4k", "1.2M". `money(usd)` gives "$3.10" or "<$0.01". `count(n, "session")` gives "1 session" or "3 sessions". `timeZone()` gives the person's time zone.

## `@slate/ui`

### The card

The root is always `<Widget>`. It takes the look of the tab it sits on, so a widget never styles its own card. Lay it out with these; each takes `hideBelow="medium"` or `"wide"`:

- `Widget`: the root; `gap` is 1 to 4.
- `Stack`: parts one under another (`grow`, `gap`, `align`, `justify`). `Inline`: side by side (`wrap`).
- `Panel`: a quiet section. `Divider`: a line (`vertical` in an `Inline`).
- `Fit`: the focal element, scaled to the room left. Give its child a size (`<svg width={120} height={120} viewBox="0 0 100 100">`).
- `Metric` (`size` `md`, `lg`, `xl`), `Label` and `Caption`: all text.
- `useCard()`: the card's `width`, `height` and `size` (`"small"` under 260 px, `"wide"` from 420 px, else `"medium"`).

### Colours

`color` holds the theme's colours: `text`, `muted`, `surface`, `bg`, `border`, `hover`, `accent`, `accentText`, `ok`, `attention`, `bad`, and `chart` (5 colours). As CSS: `var(--text)` … `var(--bad)`, `var(--accent-text)`, and `var(--c1)` to `var(--c5)`. They follow light and dark.

### Parts

- Rows: `Card`, `Row`, `Header`, `SectionLabel`
- A read's state: `QueryView` (for `useQuery`: waiting, error with Retry, empty, or your view) and `SourceStatus` (for `useSource`)
- Charts: `BarList`, `Sparkline`, `StatCard`, `RankedList`
- Controls: `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Segmented`
- Display: `Badge`, `Chip`, `Avatar`, `Kbd`, `When`
- States: `Callout`, `EmptyState`, `ErrorState`, `Loading`, `Spinner`, `Skeleton`, `SkeletonLines`

## The checks each version passes

**The build** refuses, at its file and line: a colour, text size or font written by hand (hex, `rgb()`, a colour name, a raw palette step like `var(--n-500)`), a size read from the window (`vh`, `vw`, `h-screen`, `window.innerWidth`), `position: fixed`, `Page`, `Section` or `Grid`, and a root that is not `<Widget>`.

**The render check** then runs the version once, hidden, with no network. Writes and outside reads get no answer. It fails when the widget throws, when a call is refused with `not_allowed`, `bad_request` or `failed`, or when nothing shows within 10 seconds. `not_granted` does not fail it. A widget that drew is run again in 3 boxes at its height (480 px while its height follows it): its own width, the narrowest its tab allows, and the whole row. It fails as `clipped` if its content is taller or wider than a box, or cut off inside it. So lay it out with `Stack` and `Inline`, and put the focal element in `Fit`.

`render.status` is `ok`, `failed` or `pending` (no window has run it yet; call `get_widget` later). On `failed`, each of `problems` has `kind` (`threw`, `refused`, `blank` or `clipped`), `call`, `code`, `errorClass`, `file` and `line`, and for `clipped` a `fit` with `span`, `width`, `height`, `what` (`height`, `width` or `inside`), `measured` and `allowed` in px. `next` says the fix in one line.

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

This example needs `workspace.read` in `slate.json`.
