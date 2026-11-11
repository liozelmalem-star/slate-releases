# Workspaces

A workspace is one SQLite file on your machine holding its own docs, memory, activity, artifacts and search. Switch into one and the whole app is in it. Every workspace starts private; share one and everything in it belongs to its members (nothing is marked per doc).

## Personal, and the ones you share

**Personal** is the starting workspace and the only one that fills by itself: captured sessions, git repositories with no project doc, cross-project notes. It cannot be left or removed.

Any workspace, Personal included, can be shared:

1. Click its row in **Settings → Workspaces**.
2. Use its **Sharing** switch.
3. Agree to the count shown: docs, memories, activity rows and artifacts to publish.

Switching off withdraws them (they were readable in between).

**Sharing needs the Team plan** (coming soon); all else is free, including any number of private workspaces. On Free the switch is refused with a message saying so. Accounts that already shared keep sharing free until Team ships. Turning sharing off is always allowed.

**The switcher** is at the top of the rail: Slate's mark, grey on the rail; in the open switcher each workspace's mark wears its own colour, beside its name. Shared = small people mark, failed sync = warning, read-only = padlock. Open rows say **Shared** or **Private**.

**⌘\`** next workspace, **⌘~** previous; with only Personal, nothing. Switching back restores the same doc, tab strip and rail section. A workspace not yet opened in this window opens on Home. Nothing carries over.

## What follows a switch

Per workspace: open tabs, favourites, recents, expanded sections, what Home is scoped to, automations (they belong to a group or project doc). What you were still typing when you switched, a title or a doc's text, is saved in the workspace you left. The same everywhere, kept in `machine.db`: theme, sidebar and rail widths, running AI sessions, the CLI accounts your tools use.

## Using it

- **Sign in**: **Settings → Account**, GitHub. **Make, share, rename, recolour, leave, remove**: **Settings → Workspaces** (a private one renames at once; inviting needs it shared; Personal keeps its name; a workspace you belong to but have not set up here shows **Add here**). **Switch**: the switcher, whose last row **Manage workspaces…** opens Settings → Workspaces.
- **Move a doc in**: right-click or ⋯, **Move to <workspace>** ([sharing](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md)). Others' docs sit in your tree with their avatar, read-only.
- **Ask your AI**: [`recall_workspaces` and `workspace_doc`](../mcp-server/tools.md) search every workspace you belong to, including ones not set up here; `recall` stays in the working directory's workspace.

## How a shared workspace stays in step

Sync runs every 2 minutes and at startup. **Sync now** (Settings → Workspaces) runs it at once and reports what moved. After a failure the retry waits 2, 4, 8… minutes up to 1 hour; a success resets. With no shared workspace it does nothing.

- Only changed rows are sent (hash of exactly the published fields); nothing new costs one query.
- The same comparison **withdraws**: a row the cloud holds that your replica lacks (in Trash, removed for good, moved to another workspace) is tombstoned upstream and every member's copy goes on their next pull. A store's first pass (new Mac, reinstall) withdraws nothing and pulls your rows down first. A doc you moved to Trash on one Mac is not published again by your other Mac. The withdrawal records which Mac wrote it, and your other Mac moves just that doc to its own Trash on its next sync (a doc inside it that you moved elsewhere stays). It does this once per withdrawal: if you then restore the doc from the Trash on that Mac, it stays restored and is published again. Memories and artifacts follow the same rule. A withdrawal that names no Mac (from Stop sharing, or older than this rule) is sent again after you turn sharing on again, or when you restore a doc that this Mac had already seen gone; a doc restored before that Mac's first sync after the update is not sent until then. A sync pass checks again, right before each write, that the workspace is still shared, so pressing Stop sharing while a pass runs cannot put the work back.
- Offline works: you are the only writer of your rows, so queue order does not matter.

## What actually leaves your machine

Everything in a shared workspace is for its members, except what is specific to your machine:

| Sent | Not sent |
| --- | --- |
| Doc title, block content and plain text for the cloud index, as written. A captured AI session's doc is never sent | `properties` (typed and captured metadata, including a project's folder path) |
| `doc_type`, parent link, your timestamps | `position`, the sibling order |
| Memories anchored to a doc in the workspace: sentence, kind, subject, confidence, a lesson's trigger, the doc learned on | A memory's reasoning body and source reference. Also never: a memory hidden from sessions, a global memory (no doc), one Slate no longer believes, one an app saved |
| Git activity: commits and branch events with branch, commit subject and normalised git remote (so a teammate's checkout at another path matches) | The activity payload (file paths, diff stats, counts) and `activity.repo`, the absolute path |
| Artifacts: title, kind, description, agent, the doc made under, newest version | Older versions |
| That a session happened, with branch and time | Everything else: transcript, tool, session id, summary |
| Your display name, email, avatar from the sign-in provider | Anything in a workspace you have not shared |

Postgres enforces the activity kind list with a `CHECK` constraint, not the client.

> **Warning:** The right column withholds fields, not words. A doc body and a memory's sentence go up as written; a path typed in a doc or recorded by an agent in a decision goes up with the row. Withheld are the structured places a path is held: `properties` and the absolute git repository path on a commit.

Every workspace, Personal included, keeps an append-only log in its own store: docs created, renamed, moved, trashed, removed; joins; syncs that moved something; withdrawals. Two SQLite triggers block change or removal for 400 days; startup then removes it and activity rows that old.

## Leaving, erasing, and being removed

| Action | What happens |
| --- | --- |
| **Stop sharing** | Publishing stops; everything you authored is withdrawn from the cloud and every member's copy on their next sync. Slate first counts docs, memories, activity rows and artifacts; the button reads **Stop sharing and erase my work**. The store stays here and keeps working. Your other Macs stop sharing it too, on their next sync, and withdraw anything they had sent meanwhile; on those Macs it stays off until you share it there. Share again and the next sync publishes it as it then stands. The cloud keeps a blank row per item saying it existed; as sole member, Slate removes those too |
| **Leave** | Shared: **Leave “…” and end my access** removes your seat in the cloud workspace first, then this Mac's copy (a copy is kept in `backups/`, named `left-…`). You can no longer read what the workspace holds, and what you published stays for its members; **Erase my work** takes it back. If you are the only owner, Leave is refused: make someone else an owner first. If you are offline or signed out, Leave is refused and nothing changes. **Remove from this Mac** keeps your seat and only removes the copy here. Never shared (no other copy): **Delete workspace forever**, confirm **Delete “…” forever, with everything in it**; export from **Storage** first. If the copy fails or a connected agent still has it open, nothing is removed. Personal cannot be left |
| **Erase my work** | Every row you authored is tombstoned upstream and every member's replica drops it on next pull. Final: sharing again does not restore it (the Article 17 request). Editors and the owner only; a viewer or former member is refused with the reason |
| **Someone removes you, or the owner removes the workspace for good** | Row Level Security stops answering; your replica becomes read-only. What you read stays readable and exportable; removing it is your decision |

Personal is never marked read-only (every window falls back to it). If it is shared and its cloud side goes away, sync fails; **Stop sharing** is the way out.

See also: [Working in a Shared Workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md), [Workspaces & Invites](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/workspaces-and-invites.md), [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
