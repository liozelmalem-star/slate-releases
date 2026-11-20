# Workspace sharing, precisely

Nothing is shared until you share a workspace or join one. Then the rows you write in it are copied to Slate's cloud, where its members can read them. Here is what goes, what never goes, and how to take it back.

* A workspace you never shared has no copy in the cloud, so nothing about it is sent.
* **Personal** starts unshared. Before you share it, Slate shows how much it would publish. It holds more than you wrote there: memories saved outside every project (a session in a folder no project holds is not recorded, but a memory it saves is global).
* While no workspace is shared, Slate makes no sync requests.

## What a shared workspace sends

| What | What is sent |
| --- | --- |
| Docs | Title, content, a plain-text copy for search, the doc type, the parent link and the doc's branch label |
| Memories | The sentence, its kind, subject and confidence, a lesson's trigger, and the title of the doc it was learned on |
| Development activity | Commits (the subject line only), branch events, and a record that an AI session happened, with its branch and time |
| Artifacts | Title, kind, description, the agent that made it, the doc it was made under, and its newest version |
| Doc images | The images a shared doc names, in private storage only the workspace's members can read |
| You | Your display name, email and picture from Google or GitHub |

## What is never sent

From any workspace, shared or not:

* a project's or group's folder path, and the other details Slate keeps about a doc;
* the folder path of a commit (the git remote address is sent instead), its message beyond the subject line, its counts of files and lines, and lists of the files you touched;
* the text of an AI session, and the doc a captured session is kept in;
* the reasoning behind a memory;
* a memory that belongs to no doc, a memory you hid from sessions, and a memory a widget saved;
* your settings.

> **Warning:** **Text is sent as written.** A doc's content and a memory's sentence are not filtered. If you typed a folder path into a doc, it goes with the doc. Slate does replace keys, tokens and passwords it recognises with `[secret]` in every memory, and in docs an agent writes. A doc you type yourself is not checked, and neither is an artifact or a widget.

## Who can read and write

* **Each doc has one writer, its author.** Members read your docs and can never change them.
* **The cloud decides who sees what.** A person who is not a member of a workspace cannot read its rows.
* **Your Mac keeps your teammates' names.** To show who wrote what while offline, Slate keeps the name, email and picture of each member of your shared workspaces in `machine.db`. Leaving a workspace removes them.

## Take back what you shared

* **Stop sharing**: the **Sharing** switch in **Settings → Workspaces**, in the workspace's **General** tab. It shows a count first. Slate stops publishing and blanks what you published; every member's copy drops it on their next sync. Your own copy stays. Sharing again publishes it again.
* **Move a doc out**: it is withdrawn on the next sync.
* **Erase my work**: removes every row you wrote in that workspace, for every member, while you stay in it. Sharing again does not bring them back. Editors and owners can do this.

> **Warning:** Withdrawing removes your rows from the cloud. It cannot remove what members already read. Images are not withdrawn yet: they stay in the workspace's private storage, readable only by its members.

## Widgets and live artifacts

**A live artifact** can read docs, memories and sessions of its own project, read-only. It cannot connect to any address, except to load a script from cdnjs, jsDelivr or unpkg; that host sees the address it asks for. See [Artifacts](https://liozelmalem-star.github.io/slate-releases/docs/features/artifacts.md).

**A widget** has no network at all. It reads what its tab shows. A write needs a permission you granted once, and a memory or doc write shows its words every time before it saves. Three permissions reach further:

| Permission | What it allows | Limit |
| --- | --- | --- |
| GitHub read | Read-only GitHub requests with your own `gh` sign-in. The widget never sees the token | 12 a minute |
| MCP read | A tool you allowed for that widget, read-only, from a server of the widget's own workspace | 20 a minute per server |
| GitHub act | Ask to approve, request changes on, comment on or label a pull request, with words you type. A card names the account every time | 5 an hour per widget, 20 an hour for all widgets |

A teammate's widget or live artifact never reads your workspace. See [Widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md).
