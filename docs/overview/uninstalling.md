# Uninstalling

One command removes Slate and puts back what it changed:

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash
```

**Your workspace is kept.** Removing it takes a second, explicit flag.

## See it first

`--dry-run` prints every step, lists the accounts it would clean, and changes nothing:

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash -s -- --dry-run
```

Check the line that names your workspace and its size.

## What it removes

| | |
|---|---|
| **Slate's entries in your agents** | The plugin trees, the capture hooks and the MCP registrations, in exactly the accounts Slate wrote to |
| **`/Applications/Slate.app`** | The app itself |
| **The start-at-login item** | Slate's entry in System Settings → Login Items, and the `~/Library/LaunchAgents/Slate.plist` older versions wrote |
| **Logs, cache and webview state** | Three rebuildable directories under `~/Library` |

Slate installs itself into up to eighteen other products (the 16 agents, Claude Desktop and VS Code). Dragging Slate to the Trash leaves every entry behind, pointing at an app that is gone. So the app undoes its own work first, from a record of the accounts it wrote to. **An MCP server you registered yourself is never touched**, and neither is a plugin marketplace that only shares a name.

## What it keeps

Your data folder, `~/Library/Application Support/app.slate.workspace/`:

* `workspace.db`, your Personal docs and memory
* one file for each shared workspace
* `machine.db` (settings that describe this computer, the telemetry id and your choices about it)
* your cloud sign-in file
* the backups

It is plain SQLite, and reinstalling picks the same file up. Slate also leaves what Toolkit wrote into your own project folders (skill folders, instruction files): those belong to the project.

## Removing the workspace too

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash -s -- --delete-workspace
```

**This cannot be undone.** It removes the whole data folder; no other copy exists, locally or in the cloud. A shared workspace keeps the rows you published, for its members, until you withdraw them (**Stop sharing**) or remove them with **Erase my work**. Do that first, and export what you want to keep (Settings → Workspaces → the workspace → Storage). A Personal workspace you moved elsewhere stays where you put it.

## Options

| Flag | What it does |
|---|---|
| `--dry-run` | Print every step and change nothing |
| `--delete-workspace` | Also remove the whole data folder: workspaces, `machine.db`, sign-in file and backups |
| `--keep-connections` | Leave Slate's entries in your agents alone |
| `--prefix <dir>` | Look for `Slate.app` somewhere other than `/Applications` |

The script never asks a question, so the destructive half is a flag you type.

**It removes only Slate.** The script reads the bundle id of `Slate.app` first. If the id is not `app.slate.workspace`, or cannot be read, the app may be another product with the same name. The script then stops and removes nothing.

## If you already removed the app

The script still cleans the logs, cache and webview state, and reports that it could not remove the agent entries. They are inert. To remove them, reinstall Slate and run the uninstaller again.

## Doing it by hand

```bash
# 1. Quit Slate, so the running copy cannot write back what the next step removes.
osascript -e 'tell application "Slate" to quit'

# 2. The agent entries — this is the step that needs the app.
/Applications/Slate.app/Contents/MacOS/slate --list-connections   # see them
/Applications/Slate.app/Contents/MacOS/slate --disconnect-all     # remove them

# 3. The start-at-login item: the one macOS holds for the app, then the file versions
#    before 0.1.69 wrote. The launchctl line may print an error when it is not loaded; fine.
/Applications/Slate.app/Contents/MacOS/slate --remove-login-item
launchctl bootout "gui/$(id -u)/Slate"
rm -f ~/Library/LaunchAgents/Slate.plist

# 4. The app, and the three rebuildable directories.
rm -rf /Applications/Slate.app
rm -rf ~/Library/Logs/app.slate.workspace
rm -rf ~/Library/Caches/app.slate.workspace
rm -rf ~/Library/WebKit/app.slate.workspace

# 5. Your workspace — only if you mean it.
rm -rf ~/Library/Application\ Support/app.slate.workspace
```

## See also

* [Getting Started](https://liozelmalem-star.github.io/slate-releases/docs/overview/getting-started.md)
* [Platform & Availability](https://liozelmalem-star.github.io/slate-releases/docs/features/platform.md)
* [Your Data & Export](https://liozelmalem-star.github.io/slate-releases/docs/features/data-and-export.md): get your docs out before you go
* [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md): what Slate writes into your agents, and when
