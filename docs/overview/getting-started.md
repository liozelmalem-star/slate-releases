# Install and first ten minutes

This guide takes you from nothing to a connected agent, a first session and a first memory.

## Install

Slate needs macOS 13.5 or later, on Apple Silicon or Intel. Run this in Terminal:

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/install.sh | bash
```

The script downloads the app for your Mac's chip. It checks the download against its published checksum and checks Slate's own signature, and stops if either is wrong. Then it quits a running Slate, installs to `/Applications` and opens it.

Use the script, not a browser download. Slate is not notarized by Apple, so macOS blocks an app a browser downloaded.

You also need at least one agent: the command-line program of any of the [16 agents](https://liozelmalem-star.github.io/slate-releases/docs/features/agents.md), installed and signed in. Slate uses that sign-in, so there is no API key to enter.

## Sign in

The first launch asks you to sign in with **Continue with Google** or **Continue with GitHub**. Your browser opens; approve the sign-in there. This needs the internet once. After that Slate opens at once, even offline.

The account holds your name, email and plan. Your work stays on this Mac.

## The four setup steps

Setup has four steps: **Welcome**, **Agents**, **Integrations** and **Project**. **Skip setup** at the top leaves from any step. Setup does not come back on the next launch.

1. **Welcome** shows who is signed in and a short tour of four places in Slate.
2. **Agents** (*Connect your agents*) lists all 16 agents, in the same order as Connect.
   - An agent found on this Mac reads *On this Mac · uses your own sign-in*. Its switch connects it: Slate installs itself into that agent, so it shares one memory with the others. This is the only time Slate asks before it writes to another program's setup.
   - **Runs Slate's AI** picks the agent that answers in Home and Ask AI.
   - An agent that is missing reads **Not on this Mac** and offers **Install**, which shows how to install it.
   - Ten agents read **Beta** beside their name: Slate works with them, but nobody has run a session on them yet to check every part. Gemini reads *Needs a Gemini Code Assist licence or an API key*.
   - **Connect all** connects every agent found. The line *Start Slate in the menu bar when you log in* is ticked; untick it if you do not want that.
   - **Continue** waits until one agent is connected. **I'll connect one later** lets you go on without one.
3. **Integrations** (*Connect your integrations*) connects the apps your work lives in, such as GitHub, Linear, Jira, Slack and Notion. You can go on without any.
4. **Project** (*Choose your projects*) lists the git repositories in your home folder, most recently changed first, with none ticked. Tick the ones you work on, or press **Or choose another folder**. macOS may ask to let Slate see your Documents, Desktop or Downloads folder; Slate looks there only for git projects. If another memory tool is on this Mac, such as claude-mem or agentmemory, a line says what it holds, with **Preview** to bring it in. See [Import](https://liozelmalem-star.github.io/slate-releases/docs/features/connect/import.md).

**Open Slate** adds the projects you ticked and ends setup.

## Your first session and memory

Setup ends on **Sessions**. It shows every AI session on this Mac, live, even before an agent is connected. See [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md).

**Home** holds a **Set up Slate** card with three steps:

1. **Connect an agent**
2. **Start a session**: **New session** runs your agent in a folder.
3. **See your first memory**: **Open Memory** shows what a session decided or learned.

Each step ticks itself when it is done. The card goes away when all three are done, or when you press **Skip setup**.

Slate records only sessions that run in a project. To add one later, use **New project…** in the project picker at the top of Projects.

## Connect your other agents

Turn on more agents in **Connect → Agents**, and pick the account each one runs under. See [Connect](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md). To connect an agent by hand, see [Connecting your agents](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/connecting.md).

Using VS Code or Cursor? Add Slate to it in one click: [Install in VS Code](vscode:mcp/install?%7B%22name%22%3A%22slate%22%2C%22command%22%3A%22%2FApplications%2FSlate.app%2FContents%2FMacOS%2Fslate-mcp%22%2C%22args%22%3A%5B%5D%7D) or [Install in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=slate&config=eyJjb21tYW5kIjoiL0FwcGxpY2F0aW9ucy9TbGF0ZS5hcHAvQ29udGVudHMvTWFjT1Mvc2xhdGUtbWNwIiwiYXJncyI6W119).

Once connected, an agent reads Slate's memory at the start of a task and saves what it learned at the end. See [Slate as an MCP server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md).

## Share a workspace

Sharing is not part of setup. Every account is on the Free plan: everything Slate does on this Mac, with no card and no time limit. Sharing a workspace needs the Team plan, which is coming. To hear when it is ready, press **Tell me when it's ready** in **Settings → Account**. See [Workspaces](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces.md).

## Where to go next

* [Core concepts](https://liozelmalem-star.github.io/slate-releases/docs/overview/concepts.md)
* [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md): press <kbd>⌘K</kbd> for the command palette
* [Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
