# Workspaces and invites

This guide covers making a workspace, inviting people, roles, and removing people or a whole workspace. All of it is in **Settings → Workspaces**.

## Create a workspace

Press **New workspace**, give it a name and a colour, and choose whether to share it. Press **Create workspace**.

* **Shared**: people you invite can read everything in it, and so can the agents they connect. Sharing needs the Team plan, or early access.
* **On this machine only**: nothing in it goes to the cloud. You can share it later.

Either way it is one file in Slate's data folder.

**Colour** marks the workspace in the switcher and in Settings, always beside its name. The colour is yours alone: each member keeps their own. See [Themes](https://liozelmalem-star.github.io/slate-releases/docs/features/theming.md#workspace-colours).

## Roles

A workspace belongs to an account: a company, or one person. Being in a workspace does not make someone part of your account; they see that workspace and nothing else.

| Role | Read | Write docs | Invite, remove, rename | Make an owner, delete the workspace forever |
| --- | --- | --- | --- | --- |
| **owner** | yes | yes | yes | yes |
| **editor** | yes | yes | no | no |
| **viewer** | yes | no | no | no |

The account's owner can do everything a workspace owner can. A role never lets anyone change someone else's doc: each doc is changed only by its author.

A viewer's copy is read-only on their own Mac too. A write there, including a memory an agent saves, is refused with a line saying an owner or editor can change the role. A role change reaches a Mac on its next sync.

## Invite someone

1. In **Settings → Workspaces**, click the workspace and open **Members**.
2. Type their email in **Invite by email** and press **Create invitation**. They join as an editor.
3. Tell them. Slate sends no email. The pending row has three buttons: email the invitation from your own mail app, copy a link that opens it in Slate, or copy it as text.

The invitation is tied to that exact email address. They join when they sign in to Slate with it and accept. Signing in with another address finds nothing.

**Accepting.** A banner at the top of the app names the workspace and offers **Accept** and **Decline**. Accepting adds the workspace to the switcher. A declined invitation stays declined until they are invited again. Nobody can be added to a workspace without accepting an invitation.

Pending invitations are listed with the members, and you can revoke one before it is accepted.

## Remove someone

Press remove on their row in **Members**. Their access ends on their next request. Their Mac marks its copy read-only on its next sync, about every two minutes: they can still read and export what they have, and nothing more arrives. The docs they wrote stay in the workspace.

## Delete a workspace forever

**Delete workspace forever** is in the workspace's **General** tab. Only a workspace owner or the account's owner can use it, and it asks twice. It removes every doc anyone shared there, for every member, without asking or telling them. Each member's Mac learns of it on its next sync: what they wrote themselves stays on their Mac, and the copy becomes read-only.

## Another Slate account on the same Mac

Each shared workspace belongs to the account that joined it on this Mac. Signed in with another account, Slate does not list or sync it. Sign in with its account again and it is back. Personal belongs to the Mac, whoever is signed in.

See also: [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md), [Working in a shared workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md).
