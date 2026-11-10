# Privacy & Security

**Sign in once. Your work never leaves your Mac.** Nothing of your work leaves the machine without an action you take.

Your workspace lives in SQLite files on your machine: `workspace.db` (Personal), one file per shared workspace, and `machine.db` (what describes this computer). You sign in once at first launch, with Google or GitHub; the account holds who you are and your plan, not your work. After that Slate works offline; when online it checks your sign-in at each launch.

## Contents

- [Your account](#your-account)
- [What leaves your Mac](#what-leaves-your-mac)
- [How long the cloud keeps it](#how-long-the-cloud-keeps-it)
- [Reporting a problem](#reporting-a-problem)
- [Reporting a vulnerability](#reporting-a-vulnerability)
- More: [Workspace sharing](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md), [Where data lives](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/where-data-lives.md), [Security details](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/security-details.md)

## Your account

Sign-in sends your name, email and picture link from Google or GitHub to Supabase Auth in Slate's own Supabase project, which also records which of the two you used. Slate's cloud keeps that profile and an account row with your plan. **Tell me when it's ready** (Team) adds one row: that you asked, and from which screen. The session lands in a `0600` file on your Mac, so later launches need no network. When you are online, Slate contacts its Supabase project at each launch and whenever the sign-in token renews: it renews the token, makes sure your account exists and reads which workspaces you belong to. Those requests carry your account id and your IP address, and no workspace content. Supabase Auth also keeps sign-in logs with your IP address.

Slate's cloud holds only: accounts and plans, opt-in telemetry, problem reports you send, Team interest, invitations (the invitee's email and role, until accepted or declined; Slate sends no email, the invite opens in your own mail app), the update service, and the rows of a workspace you chose to share.

**Removing your account.** Settings → Account → **Delete my account forever** removes your Slate account from the cloud: your identity, name, email, plan and Team interest, your memberships, what you authored in shared workspaces, and any account only you were in. Type your email to confirm. You are signed out, and everything on this Mac stays. If other people are in your account or its workspaces, remove them first; Slate says so and keeps everything. See the [Privacy Policy](https://liozelmalem-star.github.io/slate-releases/docs/legal/privacy-policy.md#your-control-export-and-deletion) for what lives outside the database.

## What leaves your Mac

Four exceptions run without a click each time: the agent CLIs, sharing, the update check and opt-in telemetry. A problem report, the requests you start and the connections you set up come after them.

| Exception | What leaves | When |
| --- | --- | --- |
| Agent CLIs | Your prompt and context, sent by the CLI to its model. For a [cloud session](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md#cloud-sessions), also the project's code | An [agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md) (any of the 16) runs a CLI you installed, under its own sign-in, for Home, Sessions, agent runs and automations: when you ask it to, or on a schedule you set |
| [Workspace sharing](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) | Everything in a shared or joined workspace, except what [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md#what-actually-leaves-your-machine) lists as never sent | Only after you switch a workspace (Personal too) to shared, or join one |
| Update check | App version, system, CPU, prerelease flag and an **install id**. Reveals your IP and that you run Slate | 8 seconds after the window opens, then every 4 hours, and on **Check now** in Settings → About. Turn off with Automatic updates in [Automations › Built-in](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md); the manual check still works |
| Telemetry | Opt-in counts, three events: Slate launched, a session saved, a memory recalled. A saved session and a recalled memory carry the tool's name (one of the 16, or `other`). Crash reports are a separate opt-in: error type and call stack (function, file names, line numbers) | Off until you turn it on in **Settings → About**. Never doc, session or file content, never the error's own text |

- **Agents.** Slate brokers no tokens and runs no web-search proxy. Rust starts the CLI as a child process, so credentials never reach the webview.
- **Install id.** 16 random bytes made once, kept in the `install-id` file in Slate's data folder. It holds nothing about you or your machine and is not the telemetry id. It places your copy in a stable group when a release goes out in steps. Before an update installs, Slate sends only the version to ask whether it was stopped. A newer version (on a Mac, a small patch) downloads from GitHub Releases. The update service keeps no table of ids, but the id is part of the request, so it appears in the request logs its host (Supabase) and the release host (GitHub Releases) keep for a short time. Remove `install-id` and Slate makes a new one. With Automatic updates on, updates download in the background and install when you next quit.
- **Telemetry id and consent** are per machine, in `machine.db`; removing a workspace does not touch them. "New id" replaces the id; turning both switches off withdraws consent.
- **Cloud session.** **Start in cloud**: Claude Code clones your project's GitHub remote (or uploads the code if there is none) to Anthropic's computer. Codex runs in the environment you set up at chatgpt.com. Each uses your sign-in; Slate holds no vendor key and sends nothing. It records the task in `machine.db`: what you asked, your messages, where the task came from.
- **On my phone.** [On my phone](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md#on-my-phone) makes Claude Code connect the session to claude.ai, and Anthropic keeps that conversation. The session still runs here; Slate only types `/remote-control` into its terminal.
- **No model is shipped or downloaded.** Recall is keyword matching on your device.

**Connections you set up yourself** start when you connect and stop on **Disconnect**. None sends a doc, session or memory.

- Pasted-token apps (Bitbucket, Gitea, Forgejo, Gerrit, YouTrack, Zulip, Rocket.Chat): read requests with that token to the address you gave, and no link that leaves it.
- A web-address tool gateway, or an app connected from Slate: the token that server issued to Slate, sent only to that server.
- GitHub: read through your own `gh` sign-in, after you press Connect on its card.
- MCP servers your agents already have: a toolkit entry already in an agent's config is asked for its tool list at its own address, with the key its config holds, when Tasks syncs and when you let a widget use one of its tools.

**Requests you start.** Git and `gh` fetch, pull, push and open pull requests against your own remote when you press the button. A widget's GitHub action (approve, comment, label) runs only after you confirm its card. A [live artifact](https://liozelmalem-star.github.io/slate-releases/docs/features/artifacts.md#live-artifacts) can load a script from cdnjs, jsDelivr or unpkg, and that host sees the address it asks for.

When an agent calls `read_connected`, Slate reads an app you connected from Slate with its own sign-in, in the workspace of the session's folder, and returns the answer. The sign-in never leaves Slate; nothing is written.

## Reporting a problem

A report leaves only when you press **Send report**. Open it from **Report this** on an error notice, **Help → Report a Problem…** in the Mac menu bar, ⌘K (**Report a problem**), or **Report…** in Settings → About, under Logs. The dialog lists everything that leaves:

- what you wrote under **What happened?**;
- **Where** you were (such as `Tasks` or `Projects › slate · main`, so it can name a project and a branch) and, from an error, its words;
- one line: Slate version, macOS version, chip (`Slate 0.1.54 · macOS 26.6 · Apple Silicon`);
- the last 40 lines of the app log, if ticked (default). **Show** reveals them. File paths become `~/…` before they are shown, so what you read is what leaves. That is the only change: the log lines and the error's words are not otherwise cleaned, so read them, and untick the log if it holds something you would not send.

A report carries no doc, conversation, file, account or install id. It goes to Slate's Supabase project, where anyone can write and only the Slate team can read, whether or not usage counts and crash reports are on. What you wrote, the screen, the error and the version are then copied to a private GitHub issue so the team can track it; the log lines stay in Supabase. A crash's type and stack may be copied to a private GitHub issue the same way. The About row then shows the time and a reference such as `R-7F3A`.

## How long the cloud keeps it

| What | Kept |
| --- | --- |
| Usage counts and crash reports | 180 days, then removed by a daily job |
| Problem reports | 12 months, then removed by a daily job. The GitHub issue copy is removed on request |
| Your account, its profile and sign-in logs | Until you remove it with **Delete my account forever** |
| Invitations | Until accepted or declined |
| Request logs of the update service and the release host | A short time, set by Supabase and GitHub, not by Slate |

To remove usage counts already sent, email your telemetry id (Settings → About) to the contact below before you press **New id**; otherwise they are removed after 180 days.

## Reporting a vulnerability

Email **slate.ai.app@gmail.com** (privacy, security and support) with a description, steps to reproduce and the attacker's gain. Expect a reply within 72 hours and a fix inside 7 days for anything critical. Good-faith research under the safe-harbour terms is authorised: stay within what shows the issue, do not degrade the app for others, allow a reasonable window before disclosure.

Highest severity: a cross-account read through the cloud layer (Row Level Security is its whole access boundary). Out of scope: social engineering, upstream dependency issues, vulnerabilities in the agent CLIs, and theoretical issues with no realistic attack path. Full policy: `.github/SECURITY.md` in the source.

See also: [Your Data & Export](https://liozelmalem-star.github.io/slate-releases/docs/features/data-and-export.md), [Agents & Model Providers](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md), [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).
