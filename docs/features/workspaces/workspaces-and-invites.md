# Workspaces & Invites

Sign-in, plans, roles, invitations, creating a workspace, deleting it forever, and removing people.

## Signing in

1. **Settings → Account**.
2. Sign in with **GitHub** (the only provider). Your system browser opens.
3. After approval the provider returns to a loopback address on Slate's local server, which does the code exchange: no code, token or password passes through the UI.

The session is in `cloud-session.json`, a `0600` file in the app-data folder, never in a database, so exporting a workspace cannot hand over a refresh token. First sign-in creates a **personal account** (everyone signs in on first launch, ADR 0103). After that Personal works offline and never syncs until shared.

**Settings → Account** shows who you are and **Sign out**, then **Plan**:

- **Free**: everything Slate does on this Mac; your plan unless you have early access.
- **Team**: sharing a workspace with your team; coming soon, no price. **Tell me when it's ready** records interest; the button then reads **We'll email you**. With early access: **Early access**.

Work stays on this Mac on every plan; the account holds only who you are and your plan.

**Another account on the same Mac.** Each shared workspace belongs to the account that joined it on this Mac. Signed in with a different account, Slate does not list or sync it, and does not mark it read-only. Sign in with its account again and it is back as you left it. Personal belongs to the Mac, whoever is signed in.

**Sharing is Team.** On Free a new workspace is local only: the switch is off and disabled with **Team · coming soon** and the same button. An already-shared workspace can still be turned off. With early access sharing works.

## Two tiers

| Tier | Meaning |
| --- | --- |
| **Account** | Billing and organisation: a company or one person. Roles: `owner`, `admin`, `member` |
| **Workspace** | One store, one audience, inside an account. Roles: `owner`, `editor`, `viewer` |

Workspace membership is independent of account membership (a contractor gets one workspace, not the company). An account owner reaches a workspace in the account without being added. Settings → Workspaces lists every workspace you belong to, across accounts.

## What a role controls

| Role | Read | Write docs | Invite, remove, rename | Grant owner, delete workspace forever |
| --- | --- | --- | --- | --- |
| `owner` | yes | yes | yes | yes |
| `editor` | yes | yes | no | no |
| `viewer` | yes | **no** | no | no |

The account's owner can do all a workspace owner can; account admins can invite, remove and rename only. Only a workspace owner or the account's owner can make, change or remove an owner, or delete the workspace forever; an account admin cannot make themselves owner (database-enforced). A role does not decide whose docs you may edit: author-only for everyone.

> **Note:** **A viewer's replica is read-only on their machine too.** The role is stored locally and writes (including a memory you or an agent saves) are refused where made, with a line saying an editor or owner can change it; a viewer's machine does not push. Accepting an invitation fetches the role at once. Until fetched (offline, signed out, a machine that joined earlier) the workspace counts as writable, so offline use works; the cloud has the last word. **A role change reaches the machine on the next sync pass, not the next launch.** A demoted editor stops pushing at once. The workspace shows "You can only read this workspace now." It is not a failure, so syncing does not slow down and teammates' work still arrives.

## Inviting someone

1. **Settings → Workspaces**, click the workspace's row.
2. **Members**: type an email, **Create invitation** (editor role).
3. Tell them (below); Slate sends no email.

An invitation is a membership addressed by email (a user id exists only after someone signs in). The address is stored lower-cased and trimmed, database-enforced, so it matches a login. It matches only an address the sign-in provider confirmed; Google and GitHub confirm it when the account is made. Pending invitations are listed with members and can be revoked before claimed.

**Accepting is explicit.** A banner at the top of the app, on any screen, names the workspace, inviter and role with **Accept** and **Decline**. Accepting sets up the replica and the workspace appears in the switcher. A declined invitation stays declined until re-invited. The only way into a workspace is an invitation the person accepts; the database refuses an admin who tries to add someone directly, to a workspace or to its account.

**Telling them.** Each pending row has:

| Action | Does |
| --- | --- |
| **Email** | Opens your mail app with the invitation addressed and written; you send it |
| **Copy** | Copies the same message for Slack, Teams or elsewhere |

The message names the workspace and inviter, links to where Slate installs from, and states the exact address the invitation is tied to (membership is claimed by email, so another account would find nothing).

## Creating a workspace, and deleting one forever

**New workspace** (Settings → Workspaces): name, colour, whether to share. **Create workspace**. Sharing starts on and needs sign-in; off, it is a local file, shareable later. A shared one belongs to your account, you are first member, its replica is set up on creation. **Sync now** sits beside it and reports what moved; results show as a status note under the buttons.

**Colour** is used for its mark in the switcher's list and in its settings, always beside its name. Nine, in the order new workspaces get them: Cobalt, Lagoon, Iris, Silver, Orchid, Fjord, Heather, Wisteria, Graphite. The rail's tabs and the Sessions screen wear Slate's own green, not a workspace's colour. Stored on your machine, not the shared row: everyone keeps their own and anyone can recolour whatever their role.

**Delete workspace forever** (**General** in the workspace dialog) removes every doc everyone put there, for every member, without notice; authors keep what they moved back out. Only a workspace owner or the account's owner; asks twice; nothing for anyone else. Every member's Mac learns of it on its next sync and removes what teammates published there; what a person wrote themselves stays on their Mac, and the store is marked read-only and stops sharing, so you can copy your own work out. A person who was removed before it was deleted forever keeps the read-only copy described below: only people who were members when it was deleted forever are told.

## Removing someone

Read access ends on their next request (Row Level Security decides every query). Their machine checks membership on every sync pass, about every two minutes. It marks the replica read-only on the next pass: they can read and export what is on disk; nothing goes up or arrives. Docs they authored stay. If the workspace is deleted forever later, their Mac is not told, because they were no longer a member: the copy stays read-only. **Erase my work** no longer works for them: the cloud refuses a former member, and Slate says so instead of reporting the work erased. The workspace owner removes it for them.

See also: [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md), [Working in a Shared Workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md), [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
