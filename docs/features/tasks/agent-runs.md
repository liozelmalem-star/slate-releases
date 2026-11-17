# Agent runs

An agent run takes a task through a fixed process in a session you can see. On as **agent runs** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md); off, the card opens only a plain session. Only your click starts one.

## Start a run

Open a task and click **Run <automation>**. The run starts at once, with no dialog, when nothing needs you: the project is certain, a runnable agent is set, and the project's folder is a git repository. The button says **Starting…** while it starts. A start the server refuses is said in one line under the button. When your agent last reported that the task's tracker or code host needs signing in, one line under the button says so (*Jira needs sign-in*) with **Sign in to Jira in Claude Code**. It never blocks the run: without it the run hands you the ticket update to copy. After you sign in, the line reads *Jira connected*.

The chevron menu has **Runs with** (the agent, for this run only; **Default** marks the one the run uses when you pick none), the automations that take this item, and **Edit in Automations**. The process, its steps and its stops are changed in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md), not here.

## The start dialog

It opens only when something needs you, and shows only that thing:

- **An unknown project.** An automation with a project of its own runs there. One with none (a starter first run from Tasks) picks a project only when it is certain, in this order:
  1. the project whose checkout is the item's own git repository (a pull request or issue from GitHub, GitLab and the other code hosts);
  2. the project a line you wrote names;
  3. the project you said the item's source works in (a source is the tool and its project, board or team: *Jira PROJ*, *monday.com 4021*);
  4. your only project, when the workspace has exactly one.

  Otherwise the dialog asks one question, **Which project does Jira PROJ work in?**, with the project picker and **Run it**, and remembers the answer when the run starts. The project's **Settings** lists its sources under **Work from**; **×** removes one, and the next task from it asks again. A run an agent starts without naming a project follows the same order, and runs with no project when none is certain.
- **A block.** The reason and its fix: *Connect an agent for this project* (with **Open Connect**), or *This folder is not a git repository* (pick another project). **Run it** stays grey until it is fixed.

A plain session (an item no automation takes) shows **What to type in**: the task's name and link (or a to-do's words), typed but not sent. `/`, `@`, Cmd+Enter work as on Home.

The check command, Autopilot and the agent run rules are the project's, in its **Settings**.

| Kind | Behaviour |
| --- | --- |
| **Research** | Reports cause and options; changes no file |
| **Your pull request** | Branch fetched from `origin` into its own folder; it is the only branch the run may push. You approve the plan, then the changes and one comment, word for word. A pull request from someone else's copy of the project is refused (its branch cannot be pushed from your project) |
| **Code Review** | You approve comments as **Post comments**, **Request changes** or **Approve**; the run posts exactly that, never picks. Head fetched from your `origin` (no remote added) into its own folder. Never pushes |
| **A message** | **Draft a reply** reads the project you pick, then drafts in a folder under Slate's data. Slate sends it when it can, or hands it to you |
| **Check** | The project's check command (its **Settings**), else one found in the project's files (`package.json` scripts, `Makefile` targets, `pyproject.toml`, `Cargo.toml`, `go.mod`), else the agent finds the tests |
| **Tracker and code host** | Reached through `gh`/`glab`, an MCP server, or a connector in claude.ai. Unreachable never blocks: the run gives the fallback (a link to open, a ticket update to copy) |

## What the run does

Starting a run:

1. Makes a branch named after the task (`fix/proj-12-short-title`) and a folder, then runs the project's setup command there in the background. A failed start removes both; failed setup blocks the run.
2. Starts your agent there with one line naming the run. Codex, Cursor and Gemini CLI are told to trust the folder.
3. The run goes on in the task's own timeline: each step the agent reports is an entry there, and while the agent works the last entry says so with a live dot (*Claude Code is reviewing…*). You never need the terminal. **Open session** shows it for whoever wants it. A tool that cannot take a first line at launch opens with it typed in.

The brief (first step) gives the agent the task's [card](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md#a-session-started-from-a-task) (Scope, Open, Others, Connected, Rules and up to 5 memories) and any earlier run for it. Then one step at a time (Read it, Plan, Build, Check, Draft), each reported. After each the run waits for **Next**, shown when the agent finishes its turn.

## Approvals

- **After the plan**: **Approve plan** or **Send back**, on a card in the task's timeline. **Save as Plan doc** keeps the plan as the branch's Plan doc, in the project, labelled with the branch; unticked, it stays in the run's steps. A Plan doc a person wrote is left as it is, and the run's trail says it was kept. A Plan doc Slate saved from an earlier plan is replaced, but its **Progress** stays.
- **Before anything leaves your machine**: **Approve to ship** shows commits, changed files, and the pull request title and body, ticket update, review comments or reply, word for word, each with **Copy**.
- Approving lets exactly what you approved through, once: the push, and the writes to the task's own tracker or chat and code host, with the verdict you chose. Other servers and other items still ask; merging, closing and removing are always refused.
- After shipping, Slate reads the pull request back and says whether it matches.
- After each decision Slate types one line into the session that names what you chose: *you approved the plan: build it as planned*, *you approved shipping: push the branch and open the pull request*, *you approved requesting changes*, *you sent the draft back with this note: …*, *you allowed … for this step*. A review's line names its verdict, never just "shipping".

A run stopped for you (step done, plan or ship to approve, held call, block) counts in **Needs you** and ⌘⇧J; Claude Code also sends a system notification.

## Autopilot

Runs steps back to back without **Next**. Still stops at both approvals, at a held call, and after a long run of steps. A failed check returns to Build up to twice, then stops.

Off for every project until turned on in the project's **Settings**; then the small switch under the run's last entry moves it between **Step by step** and **Autopilot**. On Autopilot, Claude Code skips asking for calls the rules allow.

| Tool | Autopilot and rules |
| --- | --- |
| Claude Code, Cursor (interactive), OpenCode (via Slate's plugin), Codex | Supported; Slate types and sends the next step |
| Gemini CLI | Step by step only: rules can refuse a call but never ask; Slate types the next step and you press Enter |

## Finish a run

After shipping the run waits for its merge. Every two minutes Slate reads the pull request state with `gh` or `glab`; merged, or task done, ends the run. A project on GitHub Enterprise is read the same way, through `gh` signed in to that host.

- **Mark done**: finish by hand.
- Pull request closed unmerged blocks the run, even when its task is done: **Mark done** or **Watch for the merge again**.
- Task done while the pull request is still open or cannot be read: the run ends, and no decision or lesson is marked shipped.
- A reply, a review or a drafted reply you posted yourself: **I sent it myself**.

A finished run adds one session entry to its project (labelled with the branch), keeps a lesson if the agent reported one, and records session tokens and estimated cost (all but Cursor report usage). It also shows on its pull request's task under Reviews.

A finished run stays in its task's timeline with the session's [receipt](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/receipts.md). Two or more runs in a row that ended without doing a step fold into one line (*3 earlier runs discarded*), which opens to the list. **Needs you** shows runs awaiting an answer. The last 14 days of runs, with a line summing runs started, done, pull requests and estimated cost, are in [Activity](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md#agent-runs).

A finished run cleans up after itself, as a session does: it notes its result on the project, keeps its lesson, then removes its folder and closes its session. Its branch goes too when every commit on it is on another branch or a remote; a branch holding work stays, as does your own pull request's. A folder that could not go is retried within the hour.

## Stop, pause, reopen, discard

- **Stop** (a small button with a square, on the run's live line; at a gate, on the line under it): one click, no question. It ends the run's session and keeps its folder and branch. The run's entry says **Stopped by you** and when, with **Resume** and **Discard**. A stopped run waits on nobody: its row and Overview dot stay grey, and it is never a "needs you" card on Home. **Resume** brings it back where it stopped, in a new session that continues the conversation. If the session could not be ended, the run still stops, and the entry says the session may still be open, with **Open session**.
- Typing in the run's session pauses it until **Resume**.
- **Reopen session**: reopens an ended session in the run's folder (a running background Claude Code job is reattached; else the conversation continues where the tool allows).
- An agent that ends its turn without reporting its step (it could not reach Slate, for example) stops the run at once. The task shows **Stopped**, the agent's last line and **Retry**. A session that never starts stops the run after five minutes.
- **Discard** (on a stopped run's entry, or a small link under the run's last entry): one line asks first, "Removes the run's folder. A branch with work stays.", with **Discard** and **Keep**. It stops the session, removes the folder; the branch follows the same rule as a finished run's. When the session cannot be stopped, **Discard anyway** discards it and keeps the folder. A discarded run reads **Discarded**.
- A run discarded (cancelled) from outside the window (by an agent, a script or a coordinator session) has its session stopped by the open Slate window. If Slate was closed, the stop happens when it next opens, up to a day after the cancel.

## The agent run rules

The agent keeps your tool's normal reach (shell, web, MCP servers) inside **agent run rules**:

| Area | Rule |
| --- | --- |
| **Git** | Only the run's branch. Push refused until you approve shipping. Force pushes, tags, branch removal always refused |
| **MCP** | A tool that writes elsewhere asks first. Merging, closing and removing refused |
| **Shell** | A command that sends data out asks first |
| **Files** | Writes stay in the run's folder, temp folders too (`$TMPDIR`, `$CLAUDE_JOB_DIR`); none while reading and planning. A body to post goes on stdin (a heredoc) or in a file in the run's folder |

**Writes to the code host, a tracker or a chat** (open a pull request, review, comment, push, ticket update, message):

| When | What happens |
| --- | --- |
| Before **Approve to ship** | Every write asks; a review that approves or requests changes is refused |
| After it, to the run's own item | Passes once, with no second ask: its own pull request, issue or branch, in its own project, and the tracker or chat tools the approved ship plan names. A review passes only with the verdict you chose; any other verdict is refused, and the refusal names yours |
| After it, anything else | Another number, another project, or a `GH_REPO`/`GH_HOST` that points elsewhere: asks |
| Always | Merging, closing and removing are refused: `gh pr merge`, `gh pr close`, `gh issue close`, `glab mr merge`, `glab mr close`, and the same through the API |
| Autopilot | Changes nothing here: it never skips the approval |

This covers `gh` and `glab`, their `api` command, and the same calls wrapped in `GH_CONFIG_DIR=…`, `cd … &&` or a heredoc. A body read from a file is read when the file is in the run's folder; a body the rules cannot read (piped in, or from outside the folder) asks.

Rules read every tool call and shell command, including those wrapped in `env`, `$( )`, `sh -c` strings and heredocs. A guard, not a sandbox: an unknown program can still reach the network. The push rule has a second lock, a git hook in the run's folder.

### What the rules do not stop

The rules are a guard, not a sandbox. They read the text of each call. They cannot see what a program does after it starts. These limits are known, accepted and written in ADR 0055 (`docs/internals/decisions/0055-a-task-has-full-capability-inside-task-rules.md`). Plan with them in mind.

- **Scripts and configs in the run's folder.** The rules do not read them. This covers `npm run`, `make`, `rake`, `cargo run` and the scripts in `package.json`. It also covers a script the run writes and then runs (`echo … > x.sh && sh x.sh`). The first step is a write inside the folder, so it is allowed. The second runs a file the rules cannot read in full.
- **Plugins and modules named in a command.** A reporter, plugin or `-r` module comes from the project's installed packages. It is not checked (`pytest -p` still asks).
- **What is inside a `.tar` or `.zip` file or a patch.** `tar`, `unzip` and `patch` are judged by the folder they unpack into, not by the paths inside.
- **Reading your secrets.** Reading is not guarded. `cat ~/.ssh/id_rsa` is allowed.
- **Git changes that stay in the run's own folder.** `git reset --hard`, `git stash drop`, `git reflog expire` and `git gc --prune` are allowed. They can lose work that was never pushed.
- **Paths built while the program runs.** Inline code that builds a path at run time is caught only in some forms (`'/' + 'x'` is caught, most others are not).
- **The environment the session started with.** A `GH_REPO` or `GH_HOST` set in the line asks; one set before the session started is not seen.
- **A pattern that never ends.** A decision that takes longer than one second asks you. The rules cannot interrupt a regular expression that never returns.

What still holds when the text is misread: the git hook in the run's folder holds every push before you approve shipping, and after that any push to another branch. It does not stop a force push to the run's own branch. The shell rule refuses that one. After shipping, Slate reads the pull request back and says whether it matches.

To close one of these for a project, add a **Deny** rule for the command, for example `shell:git reset --hard`.

**A held call** is refused for now and shown in the run. Answer: **Allow for this step**, **Always allow in this project**, **Deny**. An allowance names that one call (MCP tool or exact command) and only passes what a rule would have asked about.

**Your own rules**: **Rules** in the project's **Settings** lists built-in and project rules. Add **Allow**, **Ask first** or **Deny** naming a call as the held-call card does: an MCP tool (`mcp__jira__add_comment`, `mcp__jira__*`), `shell:` plus a command (`shell:npm publish`), or `file:` plus a path. **Allow** covers one exact call; **Ask first** and **Deny** also cover a command's first words and everything under a folder. **Deny** always wins.
