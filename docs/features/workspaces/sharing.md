# Working in a Shared Workspace

Everything in a shared workspace is the team's; there is no "publish this doc" button. Keep work private in a workspace you have not shared.

A doc you create there is shared at once, as is a decision your AI records, and a commit in a git repository the workspace owns lands in its activity feed. A captured AI session's doc is never published, and neither is a plan captured from a session in plan mode: it stays on this Mac. Sharing needs **Team** (coming soon); accounts that already shared keep it free until Team ships.

## Getting existing work in

Groups and projects are moved, not copied. Right-click in the sidebar or use ⋯ in the header, **Move to <workspace>**; Slate first says how many docs move and who can read them. Moving out works the same.

- **Whole subtree**: a group takes its projects; a project takes its branches and their plans and designs.
- **Ids kept**: a published doc keeps its cloud rows.
- **Properties come**: the folder path routes the git repository to the workspace.
- **Memory comes**: memories anchored to the moved docs. A move refuses to carry one anchored to no doc.
- **Lands at top level**; its old parent stays behind.
- **Refuses what is not yours**: a subtree with anyone else's docs, memory or activity, or a move where either workspace is read-only for you. Nothing is copied or removed.

Order is read, write, remove. No transaction spans two SQLite files, so a failure between write and remove leaves the docs in both workspaces; re-run.

**One folder, one workspace.** A folder decides where the work done in it goes, so it belongs to one workspace on your Mac. Adding a folder that another workspace already holds is refused, and the message names that workspace: move the project instead. If two workspaces still both have a project on the same folder, the one holding it keeps it, and Personal always wins, so the work stays private.

## Read-only, and why there is no merge

Each doc has one writer, its author. A teammate's doc opens with a read-only editor and a line giving the reason:

| Reason | Meaning |
| --- | --- |
| **Another author** | A teammate wrote it (named). Their edits reach you; yours would not reach them |
| **Workspace is read-only** | Removed upstream, or you were removed. Everything stays readable and exportable |

With one writer per row there are no version columns, 409 handling or conflict resolution. Your manual sibling order is not published; on a teammate's machine your docs arrive in pull order.

**You on two Macs.** Each Mac remembers the version of your doc it last saw in the workspace. When your other Mac published a newer version, this one takes it, and never sends its older copy over it. If you edited the same doc on both Macs before either synced, the later edit wins (by when you made it, not when it reached the cloud) and the other is kept beside it as "<title> (copy from this Mac)". Docs, memories and artifacts all work this way. One exception: a doc or memory whose published copy has words of a hidden memory blanked out is not taken, so the words this Mac holds are never replaced; it stays as it is until you edit it here.

**Who wrote what** (shared workspaces only):

- Sidebar: a teammate's doc shows their picture at the row end; yours show none.
- Under the title: "Written by you" or "Written by Sam".
- Memory: a teammate's shows their name where yours shows "you".

Names come from member profiles, kept locally and refreshed at app start and when you open Members in Settings, so docs stay signed offline. An unlooked-up member shows as "A teammate".

## Removals travel as tombstones

A removal is a **tombstone**: a row saying "gone", and when. When a teammate's doc is removed, the pull re-parents your surviving children to the workspace root first; **Sync now** reports that count as `reparented`. A tombstone removes only its author's row: Trashing your doc leaves a teammate's doc under it; deleting yours forever moves theirs, with everything under it, up to your doc's parent.

## Memory

A memory (decision, `fact`, preference or state saved by `remember`) is anchored to a doc; if that doc is in a shared workspace, the memory is the workspace's. What travels: [What actually leaves your machine](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md#what-actually-leaves-your-machine). Superseding a decision withdraws the old one on the next pass.

## Artifacts

An artifact published in a shared workspace belongs to it and every member sees it in **Artifacts**. Only you can publish a new version, rename or delete it forever; a teammate's shows who wrote it and its menu offers only Copy and Open in browser. Only the newest version travels; members keep versions they received. Removal withdraws it from everyone on the next sync.

## Finding a teammate's memory from your checkout

You and a colleague clone one git repository to different folders, and their memories hang on docs recording a path missing on your machine. So Slate identifies a git repository by its **git remote**, normalised to `host/owner/repo`; when recall finds no stored path for your checkout it finds the doc recording the same remote.

- Only the remote counts; a checkout with no fetchable remote gets nothing.
- Never by name: two unrelated git repositories called `site` share nothing.
- Any clone form: `git@github.com:Acme/Site.git` and `https://github.com/acme/site` are one git repository (key lower-cased, credentials stripped).

See also: [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md), [Workspaces & Invites](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/workspaces-and-invites.md), [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
