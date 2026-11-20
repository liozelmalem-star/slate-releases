# Your data and export

Each workspace is one SQLite file on your Mac, and it holds everything in that workspace: docs, sessions, memories, automations and settings. You can copy it, move it, back it up and open it with any SQLite tool. There is no copy in the cloud unless you share the workspace. See [Workspace sharing, precisely](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md).

## Find the file

Personal is at `~/Library/Application Support/app.slate.workspace/workspace.db`. Each shared workspace has its own file in the same folder.

Everything below is in **Settings → Workspaces**: click the workspace, then the **Storage** tab. It shows where the file is, with **Open** to show it in Finder, and how big it is.

## Export

**Export** saves a copy of the workspace's file anywhere you choose. It works while Slate is open, and for a workspace that has gone read-only. The copy is the same SQLite file, with no conversion.

## Move Personal to another folder

**Move…** moves Personal to another folder or an external drive. Slate restarts to finish the move. It copies the file, checks the copy, and only then uses it. The old file stays where it was, as a backup; move it to the Trash yourself once everything has arrived. Your agents and Slate's backups follow the move.

Only Personal can move. A shared workspace stays in Slate's data folder. Slate refuses a folder that iCloud Drive, Dropbox, OneDrive or Google Drive syncs, and a network drive: the database cannot run safely there.

If the folder is not there when Slate starts, for example a drive that is not plugged in, Slate shows *Slate cannot find your workspace* and opens nothing in its place. You can choose another location, or **Start empty here**. When the moved workspace is back, **Use a workspace from another folder…** in Storage points Slate at it. **Go back to the default location** returns Personal to the data folder.

## Shrink the file

The **Storage** tab shows the file's size and how much of it is space left by removed items. SQLite does not give that space back by itself. **Reclaim** returns it to the disk now; Slate also does it at launch when enough is worth returning.

## Restore a backup

Before an update changes a workspace's format, Slate copies it aside and keeps the last three copies. **Restore a backup** in Storage lists them. The restore runs when Slate next starts, and the workspace it replaces is kept as a backup too, so it can be undone. Quit every agent connected to Slate first: if one still has the workspace open, the restore does not run.

To go back to an older version of Slate, restore the backup taken before the upgrade, then install the older version. An older Slate refuses to open a workspace a newer one has changed.

## Delete a workspace forever

**Delete workspace forever**, in the workspace's **General** tab, removes the file and its backups. Nothing is kept. Export first if you may want it back. Personal cannot be removed.

## What an export leaves out

* **Your sign-in.** It is in its own file, never in a database, so an export cannot hand anyone a live credential.
* **Images in docs.** They are files beside the database, in the `files` folder of Slate's data folder. Copy that folder with the export to keep them.

And what an export carries that you may not expect:

* **A shared workspace's export holds your teammates' work too**, as your copy has synced it.
* **A project's memory settings** are inside the file.

## Read the file yourself

The file is standard SQLite, so you can read it years from now with other tools. The main tables are `doc` (docs and projects), `memory`, `routine` (automations), `task` (your Tasks list), `agent_run`, `artifact`, `activity` and `setting`. Doc content is stored as JSON blocks.
