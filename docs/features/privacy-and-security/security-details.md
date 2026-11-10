# Security Details

Protections around Slate's local server, the files it writes and your databases, and what it does not do. To report a vulnerability, see [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md#reporting-a-vulnerability).

## Contents

- [Keys and tool configs](#keys-and-tool-configs)
- [The local server](#the-local-server)
- [Workspace isolation](#workspace-isolation)
- [Encryption and the webview](#encryption-and-the-webview)
- [Writes, backups and restore](#writes-backups-and-restore)

## Keys and tool configs

**No API keys.** Model providers are the agent CLIs (any of the 16) you already signed in to.

**Nothing is written into another tool's config until you connect one.**

- Most tools: Slate edits the tool's MCP config and, where the tool takes hooks, installs recall hooks beside it.
- Claude Code and Codex: Slate runs the tool's own plugin install, then removes its own MCP entry once the plugin supplies the server, so nothing is listed twice.
- Connect one tool yourself, from setup's **Connect** step or **[Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md)**. Then Slate keeps tools you install later registered too.
- Launch auto-connect never reaches Claude Desktop: it gets Slate when you turn Claude Code on and keeps it when you turn Claude Code off.
- Until you connect a tool, auto-connect is off and no file outside Slate's data directory is touched. Turning it off removes what Slate put there and stays off across restarts.

**Every write copies the original aside first.** Slate keeps the five newest copies of each file it rewrote and sweeps the rest at launch. Only its own go: a `<file>.bak` or `<file>.bak-20260101-120000` you made stays.

**Sign-in never touches the renderer.** Cloud sign-in opens your system browser and returns to a loopback address on Slate's server, which does the code exchange. No code, token or password passes through the UI. The session lands in a `0600` file outside the database.

## The local server

**The workspace port only answers the app.** The server listens on loopback. A web page you visit can POST to a localhost port (CORS only stops it reading the reply), so the server refuses any request whose `Origin` is not Slate's webview and any request to a non-loopback hostname (DNS rebinding). `Origin` proves nothing about a non-browser program, so every request also presents a token minted each run into a `0600` file (`slate-server-token`) in the app-data folder, never in a folder you moved the workspace to. The app window gets it from Slate; another process only by reading that file, which only your user can.

Three cases carry no header: a CORS preflight from the app window (runs nothing), the live event stream (cannot set headers, so the token is in its address), and the two sign-in redirect landings (cloud account, work gateway). Each acts only on a sign-in Slate started, once.

**The auto-capture port is authenticated.** With auto-capture on, a loopback port lets git hooks and shell scripts push a note into Memory. The server rejects requests that do not look like local tooling (which stops a browser), and anything that writes must present the server token (which stops other processes, since only your account reads the file). Captured notes are ranked by recall and can reach later AI sessions, hence the guard. To drive it yourself, send the token as an `x-slate-token` header, read from `slate-server-token`. One port and one token per machine.

**Validated tool arguments.** Every MCP argument is checked against a Zod schema first. A wrong or missing type is rejected, nothing is coerced, an undeclared argument is dropped.

## Workspace isolation

Each workspace stays in its own file and Slate refuses to mix them.

- A server request must name its workspace; one that does not is refused, not filed into Personal.
- Slate's own code cannot open a workspace file without naming it.
- An agent session works in the workspace of the first folder it names and is refused another workspace's folder.
- Each file records its workspace, so a misplaced file does not open as another workspace.
- Only Sessions shows every workspace at once.
- A test plants a marker in one workspace and asks every part of the server and every agent read for it from another. It must never come back.

## Encryption and the webview

**Slate encrypts nothing at rest.** `workspace.db`, shared workspace files, `machine.db` and their WAL sidecars are unencrypted. Confidentiality rests on your OS's full-disk encryption (FileVault, BitLocker, LUKS) and file permissions. There is no SQLCipher build, key or passphrase. Anyone with the decrypted volume and your user's read access can read every workspace. **If you need application-level encryption at rest, Slate does not meet that today.** The cloud session and work gateway sign-in files are unencrypted too, but `0600` and outside every database.

**Webview CSP.** The Tauri webview runs under an enforced Content Security Policy, so the renderer cannot reach arbitrary network origins.

## Writes, backups and restore

- **Transactions.** Every change is a SQLite transaction; WAL mode lets reads continue during writes.
- **Backups.** Slate copies a database aside before any schema migration and keeps the last three per store. Leaving or deleting a workspace forever also keeps a copy.
- **Restore.** **Settings → Workspaces → (the workspace) → Storage → Restore a backup** lists them. It applies at the next launch, and the workspace it replaces is kept too. If a connected agent still has the workspace open, the restore is refused; quit those tools and retry.
