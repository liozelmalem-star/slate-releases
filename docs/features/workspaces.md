# Workspaces

A workspace holds projects, docs, memory, activity and artifacts, in one file on your Mac. Switch into one and the whole app works inside it. A workspace is shared or private as a whole: in a shared one, everything is readable by its members, and nothing is marked doc by doc.

## Personal

**Personal** is the workspace you start with. It starts private. It cannot be left or removed, and it keeps its name.

## Switch workspaces

The **workspace tile** at the top of the workspace's icons on the rail opens the switcher. It lists every workspace on this Mac, each with its colour, and says whether the one you are in is **Private · only you see it**, **Shared · its members read everything in it**, **Shared, but not syncing** or **Read-only**. **Manage workspaces…** at the end opens **Settings → Workspaces**.

**⌘\`** goes to the next workspace and **⌘⇧\`** to the previous one. Going back to a workspace brings back the doc, the tabs and the rail icon you left. A workspace you have not opened in this window yet opens on Home.

What stays with each workspace: open tabs, favourites, recents, and its automations. What is the same in every workspace: the theme, the sidebar width, the live sessions, and which accounts your agents use.

## Share a workspace

Sharing needs the **Team** plan, which is coming. On Free, the **Sharing** switch is off and greyed out, with **Tell me when it's ready**; private workspaces are free, as many as you want. An account with early access can share now. Turning sharing off always works.

1. Open **Settings → Workspaces** and click the workspace.
2. In **General**, turn on **Sharing**.
3. Slate counts the docs, memories, activity rows and artifacts it would publish. Press **Share it** to agree.

From then on, everything in the workspace, and everything you add later, is readable by its members. To invite them, see [Workspaces and invites](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/workspaces-and-invites.md).

## Bring a project in

Open the project's folder in the shared workspace, as you would anywhere. Its sessions, docs and memories from then on belong to that workspace. Nothing moves between workspaces: work done earlier in another workspace stays there. See [Working in a shared workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md).

Your agents can search every workspace you belong to with `recall` and `scope: "workspaces"`, and read a shared doc with `get_doc`. See [Slate as an MCP server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md).

## How a shared workspace stays up to date

Slate syncs every two minutes and at launch. It sends only what changed since the last sync. **Sync now** in Settings → Workspaces syncs at once and says what moved. You can work offline: you are the only writer of your docs, so nothing conflicts when you come back.

## What actually leaves your machine

Everything in a shared workspace goes to its members, except what describes your Mac: folder paths, the text of AI sessions, and the memories you kept private. The exact list is in [Workspace sharing, precisely](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md).

## Stop sharing, leave, or take back your work

| Action | What happens |
| --- | --- |
| **Stop sharing** | Slate counts what you published first; the button reads **Stop sharing and erase my work**. Publishing stops, and what you published is removed from the cloud and from every member's copy on their next sync. Your copy stays here. Share it again and the next sync publishes it as it is then |
| **Leave** | For a shared workspace: **Leave “…” and end my access** ends your access in the cloud, then removes this Mac's copy. What you published stays for its members; **Erase my work** takes it back. Offline or signed out, Leave is refused and nothing changes |
| **Remove from this Mac** | Keeps your access and removes only the copy on this Mac |
| **Delete workspace forever** | For a workspace that was never shared, this Mac holds the only copy: confirm **Delete “…” forever, with everything in it**. Export it from **Storage** first |
| **Erase my work** | Removes everything you published in the workspace, from every member's copy, while you stay in it. Sharing again does not bring it back. Editors and owners only |

If a connected agent still has the workspace open, Leave and Delete forever change nothing; quit the agent and try again.

If you are removed from a workspace, or its owner deletes it forever, your copy becomes read-only. You can still read and export it.

See also: [Working in a shared workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md), [Workspaces and invites](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/workspaces-and-invites.md), [Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
