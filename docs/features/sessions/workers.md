# Workers

A session can split its work and hand pieces to **workers**, so several agents work on one job at once. A worker is an [agent run](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md): its own branch, its own worktree and a terminal you can see. The session that started it is its **coordinator**. Any agent can coordinate and any can work: a Claude Code session can start a Codex worker and a Cursor worker.

Slate does not plan the work. Ask your session in your own words, such as "fix these three issues, one worker each". It starts each worker with Slate's `start_agent_run` tool and waits for them with `wait_for_runs` ([MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)).

## Where workers show

- **Sessions.** Workers are listed under their coordinator, behind a line such as **3 workers · 2 working · 1 waiting on you**. Each is a full session row, with its terminal, status and controls. A worker that has not started yet shows **Starting**.
- **The side panel.** The coordinator's Details starts with **Workers**: how many are done, a bar with one segment per worker, and a row per worker with its step.
- **Home.** A waiting worker's card says **Worker of** its coordinator.

## Approve a worker

A worker stops for you at the same two points as any agent run: its plan and its ship. In the coordinator's Details, the worker that needs you opens by itself, with one line of what it found, **Approve plan**, **Plan** to read its steps, and **Send back** to write a note. Click another worker's row to open it.

The coordinator cannot approve for a worker. A worker's questions and permission prompts come to you.

## How a worker starts

The session asks, and Slate makes the run: its branch, worktree and rules. The open Slate window then opens the worker's terminal. If Slate is closed, the worker waits and starts when Slate opens. If its terminal cannot open, the run offers **Resume**.

## Limits

- **At most 3 at once.** A fourth worker is refused until one finishes.
- **One level.** A worker cannot start workers.
- **The open workspace.** The window opens workers of the workspace it shows.

Each worker costs what any session costs: a CLI, a worktree and the model's usage.
