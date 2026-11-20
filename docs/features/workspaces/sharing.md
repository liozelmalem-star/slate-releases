# Working in a shared workspace

Everything in a shared workspace belongs to its members. There is no "publish this doc" button: a doc you create there is shared at once, and so is a decision your agent saves there. Keep private work in a workspace you have not shared. A captured AI session's doc is never published.

## Bring work in

Nothing moves between workspaces. A doc, project or memory stays in the workspace it was made in, so private work never lands in a shared workspace by a menu click. To work on a project in a shared workspace, switch into it and open the project's folder there. Its sessions, docs and memories from then on belong to that workspace.

**One folder, one workspace.** A folder decides where the work done in it goes, so it belongs to one workspace on your Mac. Adding a folder another workspace already holds is refused, with the workspace's name: open it there, or move its project to Trash there first.

## A teammate's doc is read-only

Each doc has one writer, its author. A teammate's doc opens read-only, with a line that says why:

* *{Name} wrote this doc, so only they can change it.* Their edits reach you on the next sync.
* *This workspace is read-only*: it no longer exists, or you were removed from it. You can still read and export everything in it.

Who wrote what shows in three places: a teammate's picture at the end of their doc's row in the sidebar, *Written by you* or *Written by Sam* under a doc's title, and the author's name on a memory. A member Slate has not looked up yet shows as *A teammate*.

**You on two Macs.** Each Mac takes the newer version of your doc from the workspace and never sends an older copy over it. If you changed the same doc on both Macs before either synced, the later change wins, and the other is kept beside it as *{title} (copy from this Mac)*. Memories and artifacts work the same way.

## Removals

When you move your doc to Trash, it leaves every member's copy on their next sync. A teammate's doc under yours stays where it is. When you delete yours forever, theirs moves up to your doc's parent.

## Memory

A memory is filed under a doc. If that doc is in a shared workspace, the memory belongs to the workspace. What travels with it is in [Workspace sharing, precisely](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md).

## Images

An image in a shared doc goes to the workspace's private storage in Slate's cloud, once. A teammate's Mac fetches the images its docs name. Until an image has arrived, its block shows no image. Only members can read the images; only owners and editors can add one, and nobody can change one.

## Artifacts

An artifact published in a shared workspace belongs to it, and every member sees it in **Artifacts**. Only its author can publish a new version, rename it or delete it forever. Only the newest version travels.

## Find a teammate's memory from your own copy

You and a colleague clone one git project into different folders. Slate matches the two by the project's git remote address, so your sessions find the memories your colleague's sessions saved.

* Only the remote counts: a folder with no remote matches nothing.
* Two unrelated projects with the same folder name share nothing.
* Every way of writing the address matches: `git@github.com:Acme/Site.git` and `https://github.com/acme/site` are the same project.

See also: [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md), [Workspaces and invites](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/workspaces-and-invites.md).
