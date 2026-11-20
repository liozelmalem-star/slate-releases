# Ask Slate

**Ask Slate** is one box for work when you do not want to pick a project first. Type what you want done; Slate starts a session on your own agent, and that session finds the right project and starts the work there.

## Ask

1. Click Slate Bot beside Search in the top bar or at the centre of the Sessions map, or press ⌘K and choose **Ask Slate…**.
2. Type what you want done. **Shift+Enter** adds a line; **Esc** closes.
3. Press **Enter**. Slate starts a new session on the workspace's default agent, under its account, with your words as the first prompt, and opens it in Sessions.

Each Enter starts a new session, so several can run at once. Sessions lists them under **Slate**. Slate adds no AI of its own: the session is your agent.

## What the session does

Slate tells the session that it coordinates work across your projects, which projects Slate knows in every workspace, and where each one's folder is. Then:

- **Work in a project** is done by a [worker](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/workers.md) the session starts in that project. The session never changes a project's files itself.
- **A question** that changes no project, such as "what is running?" or "what is on my plate?", it answers itself with Slate's tools.
- **Two projects that could fit**: it asks you which one.

The session runs in a folder Slate makes for each ask. That folder holds no code, never becomes a project and gets no worktree.

## Which agents

| Agent | Your words | On my phone |
| --- | --- | --- |
| Claude Code | Passed at launch | On, when the account allows it |
| Codex, Cursor, OpenCode | Passed at launch | Not offered |
| Gemini, Copilot and the other agents | Typed into the terminal once it is up; press Enter there | Not offered |

## A Terminal instead

At the box's top left, **Session | Terminal** switches what the box starts. It opens on **Session** each time. On **Terminal**, **Enter** opens a new [Terminal](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md#a-terminal) in your home folder and runs your words as its first command. An empty Enter opens a plain shell.

## Limits

- A worker starts only in a git project.
- A session has at most 3 workers at once.
- Every worker's plan and ship still wait for your approval.
