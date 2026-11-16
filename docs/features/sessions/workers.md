# Workers

A session can split its work and hand pieces to **workers**. A worker is an [agent run](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md): its own branch, its own worktree, its own rules and a terminal you can see. The session that started it is its **coordinator**. Any agent can coordinate, and any can work: a Claude Code session can start a Codex worker and a Cursor worker.

Slate does not plan the work. You ask your session, in your own words ("fix these three issues, one worker each"), and it uses two tools from Slate's MCP: `start_agent_run` to start a worker, and `wait_for_runs` to wait for them ([MCP tools](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)).

## Where workers show

- **Sessions.** Workers are drawn under their coordinator, behind a line like **3 workers · 2 working · 1 needs you**. Each is a full session row, with its terminal, status and controls. A worker is listed only there, not again under its own branch. A worker whose session has not started yet shows **Starting** and its step.
- **Details.** The coordinator's Details panel starts with **Workers**: how many are done, one bar with a segment per worker, and one row per worker with its step. Amber marks the one that needs you.
- **Home.** A waiting worker's card says whose worker it is and how its siblings stand.

## Approving a worker

A worker stops for you at the same two points as any agent run: its plan, and its ship. In the coordinator's Details, the worker that needs you opens by itself: one line of what it found, **Approve plan**, **Plan** to read its steps, and **Send back** to write a note. Click another worker's row to open it. A coordinator cannot approve for a worker, and a worker's questions and permission prompts come to you, not to its coordinator.

## How a worker starts

The session asks, and Slate makes the run: branch, worktree and rules. The open Slate window then opens the worker's terminal, the same way Tasks does for a run you start. If Slate is closed, the worker waits and starts when Slate opens. If its terminal cannot open, the run shows **Resume**.

## Limits

- **Three at a time.** A session has at most 3 open workers. A fourth is refused until one finishes.
- **One level.** A worker cannot start workers.
- **The open workspace.** The window opens workers of the workspace it shows.

Workers cost what any session costs: a CLI, a worktree and the model's usage. Each is visible in Sessions while it runs.
