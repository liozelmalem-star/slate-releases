# Security Policy

## Reporting a vulnerability

Please report security issues privately, through this repository's
**Security → Report a vulnerability** form:
https://github.com/liozelmalem-star/slate-releases/security/advisories/new

Do not open a public issue for a vulnerability. Include:

- what the issue is
- the steps to reproduce it
- what an attacker could do with it

Slate is maintained by one person. You will get an answer within 72 hours, and a
critical issue gets a fix within 7 days.

## Safe harbor

If you research in good faith under this policy, I consider your research
authorized, and I will not take or support legal action against you. Good faith
means you access or change no more data than you need to show the issue, you do
not harm other people's use of Slate, and you give me a fair chance to fix it
before you publish anything.

## Supported versions

Only the latest release is supported. Slate updates itself, so a fix reaches every
installed copy through the normal update.

## Scope

Slate is a local-first desktop app. Your workspaces are SQLite files on your own
machine. Slate makes network requests only for these:

- **Sign-in.** Every person signs in once, with Google or GitHub, through Supabase
  Auth. The account holds your name, email and plan.
- **The update check.** It sends the app's version, system, CPU, whether you run
  a prerelease, and a random install id, so a release can roll out in steps.
- **Opt-in telemetry, and problem reports.** Usage counts and crash reports are
  off until you turn them on. A problem report leaves only when you press
  **Send report**.
- **Your AI tool's own model calls**, under that tool's own sign-in.
- **Cloud sharing**, once you share a workspace.

In scope:

- **Local data.** The workspace files and the cloud session file in Slate's
  app-data folder. Slate does not encrypt them itself; it relies on your disk
  encryption (FileVault, BitLocker or LUKS) and your account's file permissions.
- **The account and cloud sharing.** Access between accounts is enforced by
  Postgres Row Level Security. A read of another account's data is the most serious report this
  project can get.
- **The wrong workspace.** Content that lands in a workspace its author did not
  choose is treated as a data leak.
- **The AI tools and MCP servers Slate starts.** They run as your user. A result
  from an MCP server you connected is untrusted input.
- **The updater and the installer** served from this repository.
- **The app's webview**, which runs under a Content-Security-Policy.

Out of scope: social engineering; bugs in upstream dependencies or in the AI tools
themselves (report those to their maintainers); and issues with no realistic attack.
