# Workspace Sharing, Precisely

Sharing does nothing until you switch a workspace to shared. This guide says what then leaves, what never does, and how to take it back. Other exceptions: [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).

## Rules

- While no workspace is shared, sync costs one local query, no network calls, and does not renew your sign-in.
- A shared workspace is a separate SQLite file. A store you never shared has no cloud counterpart, so nothing in it can leak.
- Personal starts unshared. It holds your projects and the sessions and memories captured in them; a session in a folder no project holds is not recorded. Personal can be shared on the Team plan. The switch counts what it would publish before you agree. The rail always shows the workspace you are in.

## What a shared workspace sends

Assume everything is shared: docs, memories, git activity, a record that a session happened (branch and time), and artifacts.

| Withheld | Detail |
| --- | --- |
| Machine-specific | The `properties` bag with a project's folder path; the absolute path on a commit (the normalised git remote goes instead); per-file path lists from a filesystem watch or `.git/index`; your local sibling ordering |
| Content | Transcript content; the reasoning body behind a memory |
| Never sent | The doc of a captured AI session; a memory that belongs to no doc (global); a memory you hid from sessions; a memory a widget saved |

Full list: [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md#what-actually-leaves-your-machine). Postgres enforces activity kinds with a `CHECK` constraint.

> **Warning:** **Text is not filtered.** A doc body and a memory sentence go up as written, so a path you typed travels with the row. Exception: Slate replaces keys, tokens and passwords it recognises with `[secret]` in every memory before storing it, and in docs an agent writes. A doc you type yourself is not checked.

## Artifacts and widgets

**Live artifact.** A tool-published `live` artifact asks the Slate window for docs, memories and sessions of its own project, read-only. Its policy blocks every connection, image, form and window to any address, and WebRTC is removed. One route remains: a script from cdnjs, jsDelivr or unpkg, whose host sees the address the doc asks for. A teammate's live artifact never reads your store. See [Artifacts](https://liozelmalem-star.github.io/slate-releases/docs/features/artifacts.md#live-artifacts).

**Widget.** A widget runs with no origin and no network (no requests, images, fonts, scripts, WebRTC, resource hints or frames) and reads what its tab shows. A write needs a permission you granted once; a memory or doc write shows its words each time before saving. A memory a widget saves is held until you release it and is never shared with a team. What a widget wrote reaches an agent quoted as data. Its data stays on this computer, and a teammate's widget never reads your store.

| Permission | What it allows | Limits |
| --- | --- | --- |
| `github.read` | Read-only GitHub reads with your own `gh` sign-in, from four fixed kinds of address; the widget never sees the token | 12 a minute |
| MCP read | A tool you allowed for that widget and ticked read-only. Pinned to its definition (a changed tool asks again); arguments checked against its schema; only servers of the widget's own workspace. The widget never sees an address, token or the server's error words | 20 a minute per server |
| `github.act` | Only ask to approve, request changes on, comment on or label a pull request in your own lists, with words you type yourself. A card names the account that will act, every time; writes go through a fixed list of four GitHub addresses; each action is written down | 5 an hour per widget, 20 for all widgets |

Every release tests the no-network claim in the built Slate app: a hostile widget tries every way out, and listeners on the release Mac must hear nothing. See [Widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md).

## Who can see and write

- **One author per doc**, enforced in the database and at local write paths. Teammates read, never modify.
- **Postgres decides who sees what.** Row Level Security is the whole access boundary; a non-member gets an empty result. An isolation test suite must pass before anything built on it ships.
- **Your machine keeps your teammates' names.** To verify their docs offline, each shared workspace's member list (display name, email, picture link) is stored in `machine.db`, only for people you already share with. Leaving removes it; an export does not carry it.

## Switching off and erasing

- **Switch off:** **Settings → Workspaces** → the workspace's **Sharing** switch. It asks, stops publishing and withdraws what was published; your store is untouched. Cloud rows are blanked and every member's copy drops them at the next sync. Switching on again republishes.
- **Move out:** moving a doc back to Personal takes it off the server at the next pass.
- **Erase my work** tombstones every row you authored there (blanked, final). Members' copies drop them at the next sync, and sharing again does not bring them back. This is the Article 17 request.

> **Warning:** Withdrawal removes the doc from the cloud, not from anyone's memory of it. Reversible, but not retroactive.
