# Your Data & Export

Everything (docs, captured sessions, memories, decisions, automations, settings) lives in SQLite files on your machine: `workspace.db` (Personal), one per shared workspace, and `machine.db` (this computer). There is no proprietary container and no cloud copy unless you share a [workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) or join one. Sharing publishes what is in that workspace, except what [Workspace Sharing, Precisely](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md) says is never sent.

## Where the file lives

| Platform | Path |
| --- | --- |
| macOS | `~/Library/Application Support/app.slate.workspace/workspace.db` |
| Linux | `$XDG_DATA_HOME/app.slate.workspace/` (`~/.local/share/` when unset) |
| Windows | `%APPDATA%\app.slate.workspace\` |

To keep Personal elsewhere (an external drive or another folder on this computer), move it in **Settings → Workspaces → (the workspace) → Storage**. Slate restarts by itself and makes the copy at the next launch, before anything has the file open, checks it (integrity check, row counts, write-ahead mode) and only then points at it. While the move waits, agents and hooks refuse to open the workspace, so nothing writes between the two files. Backups go with it; the app, MCP server and capture hooks follow. Slate refuses a folder that a sync service owns (iCloud Drive, including Desktop and Documents when iCloud syncs them; Dropbox, OneDrive and Google Drive roots) and a network drive: the database cannot run safely there. If the drive is not connected, or the file that records where Personal went cannot be read (empty after a power cut, for example), nothing opens a different empty workspace in its place: the app shows its missing-workspace screen (also when the drive goes away while Slate is open), hooks skip quietly and agents are told the workspace is not connected. If the folder is there but macOS will not let Slate open it (Documents or Desktop with access turned off in System Settings → Privacy & Security → Files and Folders), the screen says so and names that setting instead, with no **Start empty here**: the workspace is most likely still there, and agents are told the same. **Start empty here** sets the old copy at the default location aside, dated, and starts a really empty workspace; when the moved one is back, **Use a workspace from another folder** in Storage points Slate at it. The local API tokens stay in the app-data folder. `SLATE_DB_PATH` points one launch at another file (for testing).

## Where to find all of this

Open **Settings → Workspaces**, click the workspace, then **Storage**. The dialog has up to three tabs: **General** (sharing, name, colour, the remove buttons including **Delete workspace forever**), **Members** (shared workspaces) and **Storage**. Only Personal can be relocated; shared workspaces are replicas in Slate's data folder. **Delete workspace forever** leaves no copy: the store and its upgrade backups are removed, with no way back. Export it first if you may want it.

## How big it is

The row under the path shows size on disk and the dead space removed rows left. SQLite never shrinks a file itself, so Slate rewrites it at launch when enough is worth returning. **Reclaim** does it now (shown only when enough can be returned).

## Exporting

**Settings → Workspaces → (the workspace) → Storage** exports in one click a copy of the file (`workspace.db` for Personal, `workspaces/<id>.db` for a shared one), with no conversion. The same screen opens the folder.

## The format is open

Open `workspace.db` in any SQLite browser:

| Table | Holds |
| --- | --- |
| `page` | The universal unit: docs, documents, `mission` docs, captured sessions |
| `memory` | Persistent knowledge with status and text |
| `routine` | Automations: what runs on a schedule or on an event, with its steps |
| `artifact`, `artifact_version` | Published docs and widgets, with every version |
| `task`, `task_step` | Agent runs and their steps |
| `task` | The lines on your Tasks list |
| `setting` | Workspace settings |
| `activity` | Commits, branch events and session records captured for this workspace |
| `audit` | The append-only log of workspace events |

Doc bodies are block JSON, and Slate converts docs to and from Markdown.

## Durability

* **WAL mode.** Reads continue while the server writes.
* **Pre-migration backup.** Slate backs up the database before any schema migration.
* **A way back from an update.** The backups sit in a `backups/` folder next to the workspace file, named like `workspace-pre-v170.db`. Slate keeps the last three per workspace. To go back to an older version of Slate, restore one in **Settings → Workspaces → (the workspace) → Storage → Restore a backup**, then install the older version. Without that, an older version refuses to open a workspace a newer one has changed, and says so.
* **No backup, nothing lost.** If Slate cannot write the backup (a full disk, for example), it holds back any update step that could lose data. It tells you, and finishes the update at the next launch that can make the backup.
* **Stray workspace files are moved, never removed.** At startup Slate moves an empty `workspaces/<id>.db` that belongs to no workspace you joined into `backups/`, only when it holds nothing beyond a brand-new database. Any other file stays.

The file is standard SQLite at a known path, so you can back it up, move it or read it years from now with other tools.

## What the export does not contain

**Your cloud session** sits outside the database, in a `0600` file in the app-data folder that stays there when you move Personal, so an export never carries a live refresh token.

Everything else is in the file. Before you share an export, know that:

* **A shared workspace's export contains your teammates' work too.** Sync pulls their docs, memories, activity and artifacts into your copy.
* **Moving a doc into a shared workspace is a move, not a copy.** It leaves your Personal file.
* **A project's memory settings travel with it.** They, and where you said a memory goes, are in the same file.

## See also

* [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
* [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md)
