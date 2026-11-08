# Welcome to Slate

Slate is one home for every AI coding tool you use. It shows every AI coding session on your Mac, live, and gives all 16 tools one memory, one set of skills and rules (Toolkit) and one set of connections (Connect).

Around them sit Projects, Tasks, Automations, Artifacts, Widgets and Activity, all in SQLite files on your Mac, one per workspace.

New here? [Getting Started](https://liozelmalem-star.github.io/slate-releases/docs/overview/getting-started.md) installs Slate and runs your first request. [Core Concepts](https://liozelmalem-star.github.io/slate-releases/docs/overview/concepts.md) is the mental model.

* **Every session, live.** [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md) lists every AI coding session on this Mac, from any of the 16 tools. It shows who is working and who needs you.
* **One memory for all 16 tools.** Slate is an [MCP server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md). Every connected [tool](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md) calls `recall` to load context and `remember` to save what it learned. A [filesystem watcher](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md) captures the sessions in your projects, so memory grows as you work. See [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md).
* **Skills and rules once.** [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) writes one set of skills and instructions into each tool's own config. [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md) says which tools it reaches today.
* **Sign in once. Your work never leaves your Mac.** You sign in with Google or GitHub at first launch, and the app then runs offline. The account holds your name, email and plan. Nothing of your work leaves your Mac unless you take an explicit action. See [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md).
* **Your own tools, no API keys.** Slate drives the CLI of any of [16 tools](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md) you already installed and signed in to. The first six are measured end to end. The ten newest are marked *unverified* where nobody has run a feature yet ([Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md)).
* **An agent inside Slate.** [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md) reads and writes your workspace. [Curated MCP commands](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/mcp-commands.md) resolve a tool and prefill its arguments, so it runs well on a light model.
* **A real block editor.** [Docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md) are nested, drag-reorderable and keyboard-first. [Typed docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md) (plan, design, review, meeting…) give structure to real work.
* **Share a whole workspace, or none.** [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md) are containers. Everything in a workspace you share or join is read by its members, and other people's docs are read-only.

Free for individuals. Team plans are coming. See [Licensing & Updates](https://liozelmalem-star.github.io/slate-releases/docs/features/licensing.md).

> **Note:** Slate is in active development. It runs on macOS, with one app for Apple Silicon and one for Intel. Linux and Windows have early builds: see [Platform & Availability](https://liozelmalem-star.github.io/slate-releases/docs/features/platform.md).
