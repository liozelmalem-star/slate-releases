# Project environments

Each agent keeps a config directory (auth, settings, history). The one a session uses decides whose account touched the code. Slate sets the account per **workspace**, with an override on a group or on a project that stands on its own.

* A project inside a group uses its group's.
* A project that joins a group drops its own and takes the group's.
* A project that leaves a group keeps a copy of the group's, so it runs under the same account.
* A new group takes the settings of its first project that has its own.

## How it works

In **Connect → Agents** choose, per tool, the account this workspace runs it under. A group or project can override it (most never need to). There is one account per tool per group or project; what runs picks a tool and its place supplies the account. Automations, Home turns and skill steps store no login, and moving a skill re-points it.

The same switch installs Slate into that account, which gets its sessions captured. A config directory exists once per machine, so workspaces naming it share the sign-in.

## Which folders it covers

A group or project covers its own folder and the folder of every project in it. A session is judged by the **deepest** folder containing it.

## What it governs

* **Sessions started from Slate.** A session runs as the workspace its place belongs to, whichever workspace the window shows. A work project started from Personal runs on the work account.
* **Home**, when scoped to the group or project.
* **Automations and skills** that belong to it, including scheduled runs nobody watches.
* **Sessions you start in a terminal.** Slate installs hooks into each account, through the tool's own plugin or config file. They refuse the first prompt of a session running under an account the group or project does not use.

A group or project with no tools of its own (most of them) is judged by its workspace's accounts, in the terminal and in Slate. One limit: only an account that another workspace or project on this computer uses is refused. A Personal login in a work folder is stopped. A third login no workspace names still runs. A tool the workspace does not list is never refused.

A model is a starting point, not a limit. A group or project can set a default model per tool, and any model may still be used.

## What it cannot govern

* **OpenCode.** It has no documented config-directory variable, so it cannot be pinned. `CLAUDE_CONFIG_DIR`, `GEMINI_CLI_HOME`, `CODEX_HOME` and `CURSOR_CONFIG_DIR` are the four that exist. OpenCode is captured, not governed, and its row says so.
* **A group or project with no folder.** A terminal session is matched by working directory.
* **A broken Slate.** Enforcement fails open: an unreadable setting or a crashed hook lets the prompt through.

## How you know it's working

A group's doc, and the doc of a standalone project, shows one line above its tabs: "3 captured sessions ran under the accounts this project assigns." When some did not: "1 of 3 captured sessions ran under an account this project does not assign." **Review** lists up to five, each with the account it ran under and the one expected. The line appears once the group or project has an environment and one captured session.

## See also

* [Agents & Model Providers](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md): the tools these environments configure.
* [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md): the screen this is set on.
* [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md): the wider "configure once, use everywhere" story.
