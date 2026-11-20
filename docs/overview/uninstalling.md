# Uninstalling

One command removes Slate and takes back what it changed in your agents. Your workspace is kept.

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash
```

Use the command, not the Trash. Dragging Slate to the Trash leaves its entries in every agent it connected to, pointing at an app that is gone.

## See it first

`--dry-run` prints every step and changes nothing:

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash -s -- --dry-run
```

## What it removes

| What | Detail |
| --- | --- |
| Slate's entries in your agents | Its plugins, hooks and MCP entries, only in the accounts Slate wrote to. An MCP server you added yourself is never touched |
| `/Applications/Slate.app` | The app |
| Start at login | Slate's entry in System Settings → Login Items |
| Logs, cache and web view data | Three folders under `~/Library` that Slate rebuilds |

## What it keeps

Your data folder, `~/Library/Application Support/app.slate.workspace/`, stays. It holds your Personal workspace, one file for each shared workspace, this computer's settings, your sign-in and the backups. Reinstall Slate and it opens the same files.

What Toolkit wrote into your project folders (skill folders, instruction files) also stays. It belongs to the project.

## Remove your workspace too

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash -s -- --delete-workspace
```

**This cannot be undone.** It removes the whole data folder, and no other copy exists. Before you run it:

* Export what you want to keep: **Settings → Workspaces**, the workspace, **Storage**, **Export**.
* In a shared workspace, the rows you published stay for its members. Take them back first with **Stop sharing** or **Erase my work**. See [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).

A Personal workspace you moved to another folder is not in the data folder, so it stays.

## Options

| Flag | What it does |
| --- | --- |
| `--dry-run` | Print every step and change nothing |
| `--delete-workspace` | Also remove the data folder |
| `--keep-connections` | Leave Slate's entries in your agents alone |
| `--prefix <dir>` | Look for `Slate.app` in another folder than `/Applications` |

The script asks no questions, so the step that removes your data is a flag you type. It removes only Slate: if the app it finds is not Slate, it stops and removes nothing.

## If you already removed the app

The script still removes the logs, cache and web view data. It cannot remove Slate's entries in your agents without the app. They do nothing on their own. To remove them, install Slate again and run the uninstall command.
