# Privacy and security

**Sign in once. Your work never leaves your Mac** without an action you take. Your workspaces are files on your Mac: `workspace.db` for Personal, one file for each shared workspace, and `machine.db` for what describes this computer. Below is every case where data leaves, and how to turn each one off. The legal text is the [Privacy policy](https://liozelmalem-star.github.io/slate-releases/docs/legal/privacy-policy.md).

More detail: [Where each piece of data lives](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/where-data-lives.md), [Workspace sharing, precisely](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md), [Security details](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/security-details.md).

## Your account

You sign in with Google or GitHub. The account holds your name, email and picture link, which provider you used, and your plan. If you pressed **Tell me when it's ready** for Team, it also records that you asked, and from which screen. It holds none of your docs, sessions or memories.

The sign-in is kept in a file on your Mac that only you can read, so later launches work offline. When you are online, Slate contacts its cloud at each start and whenever the sign-in renews. Those requests carry your account id and your IP address, and no workspace content. The sign-in service also keeps logs with your IP address.

Slate downloads your picture once from Google or GitHub and keeps a copy on your Mac. Signing out removes the copy.

**Delete your account forever.** **Settings → Account → Delete my account forever…** removes your account from Slate's cloud: your name, email, plan, Team interest, your memberships and the content of everything you shared to a workspace. Your teammates' Macs remove their copies on the next sync. You are signed out, and everything on this Mac stays. If other people are in your account or its workspaces, Slate asks you to remove them first.

## What leaves your Mac

Four exceptions run without a click each time. Three of them need your choice first. The update check is on by default, and you can turn it off.

| Exception | What leaves | When, and how to stop it |
| --- | --- | --- |
| **Your agents** | Your prompt and context, sent by the agent's own program to its own provider, under its own sign-in. A [cloud session](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md) also sends the project's code. **On my phone** connects a session to claude.ai | When you use Home, a session, an agent run or an automation, or on a schedule you set |
| **A shared workspace** | Everything in a workspace you share or join, except what [sharing](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/sharing.md) lists as never sent | Only after you share a workspace or join one. Sharing needs the Team plan |
| **The update check** | Your app version, system, chip, whether you run a prerelease, and a random install id. No workspace content | 8 seconds after the window opens, then every 4 hours, and on **Check now** in Settings → About. Turn it off with **Automatic updates** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/built-in.md) |
| **Telemetry** | **Anonymous usage counts**: three events (Slate opened, a session captured, a memory recalled), with the agent's name. **Crash reports**: the error's type and where in Slate's code it happened, never its text | Only after you turn it on in **Settings → About**. Both are off by default |

The install id is 16 random bytes made on your Mac. It says nothing about you or your Mac, and it is not the telemetry id. It places your copy in a stable group when a new version goes out to part of the installed copies first. Slate's update service keeps no record of it, but it appears in the short-lived request logs of the service's host. Remove the `install-id` file from Slate's data folder and Slate makes a new one.

The telemetry id and both switches belong to this computer, not to a workspace. **New id** replaces the id.

Slate ships no model and downloads none. Memory search runs on your Mac.

## Requests and connections you start

* **Git.** When you press the button for it, git and `gh` fetch, pull, push and open pull requests against your own remote.
* **Integrations.** An app you connect is read with the sign-in you gave it, sent only to that app's address. GitHub is read through your own `gh` sign-in. **Disconnect** stops it.
* **Widgets.** A widget's GitHub action (approve, request changes, comment, label) runs only after you confirm the card that names the account.
* **Live artifacts.** A live artifact can load a script from cdnjs, jsDelivr or unpkg, and that host sees the address it asks for.

None of these sends a doc, a session or a memory of yours.

## Reporting a problem

A report leaves only when you press **Send report**. Open the dialog from **Report this** on an error, from **Report a problem** in ⌘K, or from **Report…** in Settings → About. The dialog shows everything that is sent before you send it:

* what you wrote;
* which screen you were on (this can name a project and a branch), and the error's text if you reported from an error;
* your Slate version, macOS version and chip;
* the last 40 lines of the app log, unless you untick them.

Every file path is shown as `~/…` before you see it. Nothing else is cleaned, so read the lines, and untick the log if it holds something you would not send. A report carries no doc, session or conversation content, no account details and no install id. It goes to Slate's cloud, where only the Slate team can read it. What you wrote, the screen, the error and the version are copied to a private GitHub issue so the team can track the fix.

## How long the cloud keeps it

| What | How long |
| --- | --- |
| Usage counts and crash reports | 180 days |
| Problem reports | 12 months. The GitHub issue copy is removed on request |
| Your account, profile, plan, Team interest and sign-in logs | Until you delete your account forever |
| Invitations | Until they are accepted or declined |
| Shared workspace rows you wrote | Until you withdraw them, stop sharing, use **Erase my work**, or delete your account forever |
| Request logs of the update service and the release host | A short time, set by those hosts |

To have usage counts already sent removed, email your telemetry id to the address below before you press **New id**.

## Reporting a vulnerability

Email **slate.ai.app@gmail.com** with a description, the steps to reproduce it and what an attacker gains. Expect a reply within 72 hours, and a fix within 7 days for anything critical. Good-faith research is welcome: stay within what shows the issue, do not degrade the app for others, and allow time before you disclose it.
