# Security details

This guide is for anyone who checks Slate's security: what guards the local server, what Slate writes into other programs, what it does not encrypt, and how to manage it on company Macs. To report a vulnerability, see [Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md#reporting-a-vulnerability).

## Your agents' setup files

* **No API keys.** Your agents make their own model calls under their own sign-in. Slate stores no provider key.
* **Nothing is written until you connect an agent.** You connect one in setup or in [Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md). From then on Slate keeps the agents you install later connected too. Turning that off removes what Slate wrote, and it stays off.
* **Slate keeps a copy before it changes a file.** It keeps the five newest copies of each file it rewrote. Copies you made yourself are never touched.

## The local server

Slate's local server listens only on your own computer (loopback).

* **It answers only Slate.** It refuses a request that comes from any web page other than Slate's own window, and a request addressed to any host name other than this computer.
* **Every caller shows a key.** The key is in `slate-server-token`, a file only your user can read. The key is kept across launches. Another program can call the server only by reading that file.
* **Agents get a narrower key.** The sessions Slate starts reach its MCP server with a second key, `slate-mcp-token`, which opens the MCP tools and nothing else.
* **Tool arguments are checked.** Every MCP call's arguments are checked against the tool's rules first. A wrong argument is refused, never guessed.

## Sign-in

Your Slate sign-in opens your system browser and comes back to Slate's local server, which finishes it. No code, token or password passes through the app window. The sign-in is kept in a file only your user can read, never in a database.

## Workspaces stay apart

Each workspace stays in its own file, and Slate does not mix them.

* A session works in the workspace of the first folder it names. A folder from another workspace is refused.
* A file records which workspace it is, so a file in the wrong place does not open as another workspace.
* Three things cross workspaces, on purpose: Sessions and the `live_sessions` tool show every running session on this Mac; `recall` with `scope: "workspaces"` and `get_doc` on a shared doc read the workspaces you belong to in the cloud.

## What Slate does not encrypt

**Slate encrypts nothing at rest.** Your workspace files, `machine.db` and the sign-in files are not encrypted by Slate. Their safety rests on FileVault and on file permissions. Anyone who can read your user's files can read every workspace. If you need encryption inside the app, Slate does not offer it today.

The app window runs under a content security policy, so it cannot reach arbitrary addresses on the network.

## Backups and restore

* Every change is saved as one complete step, so a crash never leaves half a change.
* Before an update changes a workspace's format, Slate copies the workspace aside and keeps the last three copies.
* **Settings → Workspaces**, the workspace, **Storage**, **Restore a backup** lists them. A restore runs at the next start, and the workspace it replaces is kept as a backup too. If a connected agent still has the workspace open, the restore does not run; quit the agent and try again.

See [Your data and export](https://liozelmalem-star.github.io/slate-releases/docs/features/data-and-export.md).

## Managed Macs

For IT teams that deploy Slate with an MDM such as Jamf, Kandji or Intune.

* **Start at login is a managed setting.** Push a configuration profile for the domain `app.slate.workspace` with the key `StartAtLogin`, true or false. Slate then follows it on every Mac, and the switch in **Automations › Built-in** reads **Managed by your organization** and cannot be changed.
* **The login item** is registered by the signed app from inside its bundle, under the label `app.slate.workspace.login`. Slate writes nothing to `~/Library/LaunchAgents`. A Login Items profile (`com.apple.servicemanagement`) can allow it with a `Label` rule for `app.slate.workspace.login`, or a `BundleIdentifier` rule for `app.slate.workspace`. Slate is signed with its own certificate, not an Apple Developer ID, so there is no team identifier to match.
* **What runs at login**: the app with no window, its menu bar icon and its local server, so agents can reach Slate. A signed-out Slate opens its window to ask for sign-in.
