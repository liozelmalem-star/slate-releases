# Project environments

Each agent keeps a config folder with its sign-in, settings and history. The folder a session uses decides whose account touched the code. Slate sets that account per **workspace**, and a group, or a project on its own, can override it.

## Set the account

In **Connect → Agents**, choose for each agent the account this workspace runs it under ([Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md)). A group or project can choose another; most never need to. The same switch installs Slate into that account, so its sessions are captured. A config folder exists once per computer, so workspaces that name the same one share its sign-in.

- A project inside a group uses the group's account.
- A project that joins a group takes the group's.
- A project that leaves a group keeps a copy of the group's.

A group or project covers its own folder and every project folder in it. A session belongs to the deepest folder that holds it.

## What it governs

- **Sessions started from Slate** run under the account of the workspace their project belongs to, whichever workspace the window shows.
- **Automations and skills** that belong to it, scheduled runs included.
- **Sessions you start in a terminal.** Slate installs a hook into each account that refuses the first prompt of a session running under the wrong account. The message names the right one, such as "Work runs claude under Work."

Only an account that another workspace or project on this computer uses is refused, so a Personal sign-in in a work folder is stopped. An account no workspace names still runs. An agent the workspace does not list is never refused.

A group or project can also set a default model per agent. It is a starting point; any model can still be used.

## Limits

- **OpenCode** has no setting for its config folder, so it cannot be held to one account. It is captured, not governed, and its row says so.
- **A group or project with no folder** cannot govern terminal sessions, which are matched by folder.
- **If the check itself fails**, an unreadable setting or a crashed hook, the prompt goes through.
