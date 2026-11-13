# Getting Started

This guide takes you from a fresh install to a working workspace with cross-tool memory and a running agent.

***

## 1. Install

Slate runs on macOS 13.5 or later, Apple Silicon or Intel, with one app for each. The installer picks your Mac's. Linux and Windows have early builds, attached to each release from 0.1.58: see [Platform & Availability](https://liozelmalem-star.github.io/slate-releases/docs/features/platform.md). Install on a Mac with:

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/install.sh | bash
```

The script downloads a prebuilt `Slate.app`, checks its checksum against the release's and its signature (a mismatch stops the install), quits a running Slate, installs to `/Applications` and opens it. Nothing compiles. Slate is not notarized by Apple, so a browser download would be quarantined by macOS, and `curl` avoids that.

To use [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md) or give your tools one memory, install at least one **agent**: the [CLI of any of 16 tools](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md): Claude Code, Codex, Cursor, GitHub Copilot, Antigravity, OpenCode, Gemini, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code or Auggie. Slate drives the CLI you already signed in to, so there is no API key to enter.

**Sign in once. Your work never leaves your Mac.** The first launch asks you to sign in with Google or GitHub. This needs the internet once. The account holds your name, email and plan. Your work stays on this Mac. Slate keeps the sign-in on disk, so later launches open at once, even offline. The sign-in screen fills the window, so the app cannot be reached without it.

Slate then creates your Personal workspace at `~/Library/Application Support/app.slate.workspace/workspace.db`. Each workspace is its own SQLite file. You can copy it, back it up or open it in any SQLite browser: see [Your Data & Export](https://liozelmalem-star.github.io/slate-releases/docs/features/data-and-export.md).

Capture starts before setup. Slate finds the AI CLIs on your machine and starts reading their session transcripts when the window opens. The first setup screen names what it found. Nothing on your machine changes and nothing is sent.

Then a four-step setup runs: **Welcome, Agents, Integrations, Project**. Every step has **Skip setup** at the top. It ends setup the same way **Open Slate** on the last step does, and setup does not show again on the next launch. Everything can be changed later from the rail.

- **Welcome** shows who is signed in and what Slate is.
- **Agents** lists all sixteen tools, in the same order as Connect. A tool on this Mac reads *On this Mac · uses your own sign-in*: Slate can see the program but not whether you signed in to it, so it says what it relies on rather than asking you to sign in again. It has a switch that connects it and a choice of whether it runs Slate's own AI. A tool whose CLI is missing is greyed out, reads *Not on this Mac*, and offers only **Install**, which shows how to install it; after **Check again** finds it, it gets its switch. Ten of the sixteen read **Beta** beside their name: Slate works with them, but nobody has run a session on them yet to check every part (see [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md)). Gemini reads *Needs a Gemini Code Assist licence or an API key*, because Gemini CLI no longer signs in personal Google accounts. Connecting registers Slate with the tool, which makes memory *shared*. It is the one time Slate asks before writing to another program's config. **Continue** waits until one tool is connected; **Skip setup** does not. Nothing is chosen for you. The choice is the same setting as Connect → Agents.
- **Integrations** connects the apps your work lives in, such as GitHub, Linear, Jira, Slack and Notion, with the same buttons as Connect → Integrations. You can go on without any.
- **Project** lists the git repositories in your home folder, most recently changed first, with nothing ticked. macOS may ask to let Slate see your Documents, Desktop or Downloads folder while it looks; Slate looks there only for git projects. A line says so while it looks, and another says so if it finds none. If macOS refused it a folder, a line names that folder and the setting that allows it (System Settings → Privacy & Security → Files and Folders), with **Scan again**. Tick the ones you work on, or choose another folder. Slate records only sessions that run in a project: work in other folders shows in Sessions under **No project** while it runs, where its row offers **Make a project**, and is not kept. A memory such a session writes is still saved, as global memory. Later, add a project from the project picker at the top of Projects. Under the folders, one line names what other tools keep on this Mac, such as *Found on this Mac: 1,200 observations in claude-mem, 4 projects in your editors.* claude-mem and agentmemory each get a **Preview** button there, so you can bring their memory in once your projects are added. See [Import](https://liozelmalem-star.github.io/slate-releases/docs/features/import.md).

Setup ends on **Sessions**, whether you finish it or skip it. Sessions shows every AI session on this Mac, live, even before an agent is connected. With nothing running, it offers **Connect an agent**. Every account is on the Free plan: everything Slate does on this Mac, with no card and no time limit. To hear when Team is ready, press **Tell me when it's ready** under Team in **Settings → Account**.

**Home** holds what setup skipped, in a **Set up Slate** card of three steps, each with one button:

1. **Connect an agent**: **Connect an agent** opens Connect → Agents.
2. **Start a session**: **New session** runs your tool in a folder.
3. **See your first memory**: **Open Memory** shows what a session decided or learned.

Each step ticks itself from what is in your workspace: a tool set, a session captured, a memory saved. The card shows how many are done and goes away when all three are, or when you press **Skip setup**. Under it, one line says: *A workspace holds your projects. A project is a folder you open.*

Sharing is not part of setup. It is in **Settings → Workspaces**.

## 2. Create your first docs

The left column is a permanent icon **rail**: Sessions, Home, Projects, Tasks, Memory, Activity, Artifacts, Widgets, Automations, Toolkit, Connect, Trash, Settings. Beside it is a **side panel** that switches with it. Click **Projects** for the [tree of your projects and docs](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md). The workspace mark at the top of the rail offers **New project…** and **Manage projects…**. The project picker under the Projects panel's title narrows the tree to one project, and its list ends with the same two. With no project yet, Projects' Overview says what a project is (a folder you open) and offers **New project**.

A new install starts with one doc, **Getting Started**. It lists where to start: connect an agent, start a session, add a project, and follow the **Set up Slate** card on Home.

Create a doc, give it an icon and title, and type. The editor is block-based (headings, lists, to-dos, code, quotes) with a slash menu and drag-to-reorder.

For real work use a [typed document](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md): a **group** to hold several projects, a **project** and a **branch** under it, and a **plan** or **design** doc under either. A project can stand without a group. Typed docs pre-fill a template.

Press <kbd>⌘K</kbd> any time to open the [command palette](https://liozelmalem-star.github.io/slate-releases/docs/features/search.md): jump to a doc, run an action, or search every title and body.

## 3. Connect an agent to your workspace

Open **Connect → Agents** and turn on the tools this workspace uses, choosing the account each one runs under. Every project or group inherits that and may override it. The CLIs Slate can drive, their models and defaults are on [Agents & Model Providers](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md).

Slate uses the CLI you already signed in to, so there is nothing to paste. If you keep separate work and personal CLI configs, set up a [project environment](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/cli-profiles.md) for each.

## 4. Run your first request

Open **Home**, Slate's in-app [AI agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md). It reads and writes your workspace and calls any connected tool. Try:

* "Create a plan doc under my Slate project for the onboarding flow."
* "What did I work on this week?"
* "Summarize the open decisions across my projects."

The agent uses [curated commands](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/mcp-commands.md) to resolve the right tool and prefill its arguments, so these work on a light local model.

## 5. Connect Slate to your other agents

This is where Slate becomes a shared memory. Slate is an [MCP server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md), so any of the 16 agents can read and write the same workspace:

1. Turn your tool on in **Connect → Agents**, or see [Connecting Your Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/connecting.md).
2. Connected tools call `recall` to load context and `remember` to save decisions, into the same docs you edit by hand.

The [session watcher](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md) needs nothing turned on. It has read the transcripts of the tools you turned on since the first launch. Capture is measured on eight tools and unverified on the rest, see [Session Capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md).

[Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md) then lets you write one set of instructions and skills and sync them to every tool.

***

## 6. Optional: share with a workspace

A **shared workspace** is a second store its members read. Create or join one in **Settings → Workspaces**, then switch into it from the top of the rail. The whole app follows, and everything you do there belongs to its members.

Sharing needs the Team plan, which is coming soon. Accounts that already shared keep sharing at no charge until Team ships. Every workspace has the same sharing switch, Personal included, and turning it on first counts what it would publish. A captured AI session's doc is never published. To share one project rather than a whole workspace, move it: its ⋯ menu offers **Move to <workspace>**, and the subtree goes with its memory. Nobody can edit your docs, whatever their role. See [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).

***

## Where to go next

* [Core Concepts](https://liozelmalem-star.github.io/slate-releases/docs/overview/concepts.md): docs, memory and Toolkit.
* [Slate as an MCP Server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md): the memory contract.
* [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md): what stays local and what does not.
