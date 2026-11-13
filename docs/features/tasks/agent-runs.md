# Agent runs

An agent run takes a task through a fixed process in a session you can see. On as **agent runs** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md); off, the card offers only **Just open a session**. Only your click starts one.

## Start a run

1. Open a task, click **Run with AI…**.
2. Check **Where** and **What it is**.
3. Click **Run it** (or **Open a session**).

## The start dialog

- **Where**: project and agent. Default: the task's project, else the last used, else your only project.
- **What it is**: the kind ([Workflow](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/workflow.md)), plus **Investigate only** (to solve), **Draft a reply** or **Find the answer, then draft** (message), **Just open a session** (all).
- **The kind's rule**: the skill, its steps on one line with the two stops for you as an amber hand (*Stops for you after the plan, and before it ships*), and *Saved for every bug in <project>* under the skill picker.
- **What the agent run gets**: **The task**; **What Slate knows** (memories in the brief, each with **×** to leave out; none is valid, and a memory read that fails says so instead of showing none, in the dialog and in the brief the agent gets); **Your note** (closed until added).
- **What it can use**, one line (*GitHub · yarn test · Autopilot off*), opening to each tool and whether the agent reaches it, the check command, Autopilot and the agent run rules, under **Saved for every run in <project>**. **Allow Autopilot** is the project setting; **This run: Step by step / Autopilot** is per run.

**Just open a session** shows **What to type in**: the task's name and link (or a to-do's words), typed but not sent. `/`, `@`, Cmd+Enter work as on Home. A blocked start (folder not a git repository) is explained in the footer.

| Kind | Behaviour |
| --- | --- |
| **Investigate only** | Reports cause and options; changes no file |
| **Your pull request** | Branch fetched from `origin` into its own folder; it is the only branch the run may push. You approve the plan, then the changes and one comment, word for word. A pull request from someone else's copy of the project is refused (its branch cannot be pushed from your project) |
| **Someone else's PR** | You approve comments as **Post comments**, **Request changes** or **Approve**; the run posts exactly that, never picks. Head fetched from your `origin` (no remote added) into its own folder. Never pushes |
| **A message** | **Draft a reply** in a folder under Slate's data, or **Find the answer, then draft** (reads the project you pick first). The dialog says whether Slate can send it or hands it to you |
| **Check** | Command from the project's files (`package.json` scripts, `Makefile` targets, `pyproject.toml`, `Cargo.toml`, `go.mod`) or **Let the agent run find the tests**. Opens on the detected one; a pick is saved |
| **Tracker and code host** | Whether your agent reaches each (`gh`/`glab`, an MCP server, or a claude.ai connector). Unreachable never blocks: the row says the fallback (a link to open, a ticket update to copy); **Connect** goes to Connect → Integrations. If the agent reported the server needing sign-in in the last day: **Needs sign-in** and **Sign in to Jira in Claude Code** |

## What the run does

**Run it**:

1. Makes a branch named after the task (`fix/proj-12-short-title`) and a folder, then runs the project's setup command there in the background. A failed start removes both; failed setup blocks the run.
2. Starts your agent there with one line naming the run. Codex, Cursor and Gemini CLI are told to trust the folder.
3. Closes the dialog; the task shows the run (steps, last report, status). **Open session** shows the terminal. A tool that cannot take a first line at launch opens with it typed in. The run also tops **Agent runs**.

The brief (first step) gives the agent the task's [card](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md#a-session-started-from-a-task) (Scope, Open, Others, Connected, Rules and up to 5 memories) and any earlier run for it. Then one step at a time (Read it, Plan, Build, Check, Draft), each reported. After each the run waits for **Next**, shown when the agent finishes its turn.

## Approvals

- **After the plan**: **Approve plan** or **Send back**. **Save as Plan doc** keeps the plan as the branch's Plan doc, in the project, labelled with the branch; unticked, it stays in the run's steps. A Plan doc a person wrote is left as it is, and the run's trail says it was kept. A Plan doc Slate saved from an earlier plan is replaced, but its **Progress** stays.
- **Before anything leaves your machine**: **Approve to ship** shows commits, changed files, and the pull request title and body, ticket update, review comments or reply, word for word, each with **Copy**.
- Approving lets the push through, plus writes to the task's own tracker or chat and the code host. Other servers still ask; merging and removing are always refused.
- After shipping, Slate reads the pull request back and says whether it matches.

A run stopped for you (step done, plan or ship to approve, held call, block) counts in **Needs you** and ⌘⇧J; Claude Code also sends a system notification.

## Autopilot

Runs steps back to back without **Next**. Still stops at both approvals, at a held call, and after a long run of steps. A failed check returns to Build up to twice, then stops.

Off for every project until turned on in the start box or the project's **Settings**; then the panel switches a run between **Step by step** and **Autopilot**. On Autopilot, Claude Code skips asking for calls the rules allow.

| Tool | Autopilot and rules |
| --- | --- |
| Claude Code, Cursor (interactive), OpenCode (via Slate's plugin), Codex | Supported; Slate types and sends the next step |
| Gemini CLI | Step by step only: rules can refuse a call but never ask; Slate types the next step and you press Enter |

## Finish a run

After shipping the run waits for its merge. Every two minutes Slate reads the pull request state with `gh` or `glab`; merged, or task done, ends the run. A project on GitHub Enterprise is read the same way, through `gh` signed in to that host.

- **Mark done**: finish by hand.
- Pull request closed unmerged blocks the run, even when its task is done: **Mark done** or **Watch for the merge again**.
- Task done while the pull request is still open or cannot be read: the run ends, and no decision or lesson is marked shipped.
- Reply or review you posted yourself: **I sent it myself**.

A finished run adds one session entry to its project (labelled with the branch), keeps a lesson if the agent reported one, and records session tokens and estimated cost (all but Cursor report usage). It also shows on its pull request's task under Reviews.

In a section, its runs sit at the top under **Agent runs**; **Needs you** shows runs awaiting an answer. **Agent runs** in the side list shows the last 14 days, newest first: status, steps, approvals, the session's [receipt](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/receipts.md); a line above sums runs started, done, pull requests and estimated cost.

**Remove folder** (done runs): the folder goes; the branch too when every commit is on another branch or a remote. A branch holding work stays, as does your own pull request's.

## Pause, reopen, cancel

- Typing in the run's session pauses it until **Resume**.
- **Reopen session**: reopens an ended session in the run's folder (a running background Claude Code job is reattached; else the conversation continues where the tool allows).
- A session that does not pick up the run within five minutes blocks it; **Resume** restarts.
- **Cancel agent run**: stops the session, removes the folder; the branch follows the **Remove folder** rule.

## The agent run rules

The agent keeps your tool's normal reach (shell, web, MCP servers) inside **agent run rules**:

| Area | Rule |
| --- | --- |
| **Git** | Only the run's branch. Push refused until you approve shipping. Force pushes, tags, branch removal always refused |
| **MCP** | A tool that writes elsewhere asks first. Merging and removing refused |
| **Shell** | A command that sends data out asks first |
| **Files** | Writes stay in the run's folder; none while reading and planning |

Rules read every tool call and shell command, including those wrapped in `env`, `$( )`, `sh -c` strings and heredocs. A guard, not a sandbox: an unknown program can still reach the network. The push rule has a second lock, a git hook in the run's folder.

### What the rules do not stop

The rules are a guard, not a sandbox. They read the text of each call. They cannot see what a program does after it starts. These limits are known, accepted and written in ADR 0055 (`docs/internals/decisions/0055-a-task-has-full-capability-inside-task-rules.md`). Plan with them in mind.

- **Scripts and configs in the run's folder.** The rules do not read them. This covers `npm run`, `make`, `rake`, `cargo run` and the scripts in `package.json`. It also covers a script the run writes and then runs (`echo … > x.sh && sh x.sh`). The first step is a write inside the folder, so it is allowed. The second runs a file the rules cannot read in full.
- **Plugins and modules named in a command.** A reporter, plugin or `-r` module comes from the project's installed packages. It is not checked (`pytest -p` still asks).
- **What is inside a `.tar` or `.zip` file or a patch.** `tar`, `unzip` and `patch` are judged by the folder they unpack into, not by the paths inside.
- **Reading your secrets.** Reading is not guarded. `cat ~/.ssh/id_rsa` is allowed.
- **Git changes that stay in the run's own folder.** `git reset --hard`, `git stash drop`, `git reflog expire` and `git gc --prune` are allowed. They can lose work that was never pushed.
- **Paths built while the program runs.** Inline code that builds a path at run time is caught only in some forms (`'/' + 'x'` is caught, most others are not).
- **A pattern that never ends.** A decision that takes longer than one second asks you. The rules cannot interrupt a regular expression that never returns.

What still holds when the text is misread: the git hook in the run's folder holds every push before you approve shipping, and after that any push to another branch. It does not stop a force push to the run's own branch. The shell rule refuses that one. After shipping, Slate reads the pull request back and says whether it matches.

To close one of these for a project, add a **Deny** rule for the command, for example `shell:git reset --hard`.

**A held call** is refused for now and shown in the run. Answer: **Allow for this step**, **Always allow in this project**, **Deny**. An allowance names that one call (MCP tool or exact command) and only passes what a rule would have asked about.

**Your own rules**: **agent run rules** in the start box lists built-in and project rules. Add **Allow**, **Ask first** or **Deny** naming a call as the held-call card does: an MCP tool (`mcp__jira__add_comment`, `mcp__jira__*`), `shell:` plus a command (`shell:npm publish`), or `file:` plus a path. **Allow** covers one exact call; **Ask first** and **Deny** also cover a command's first words and everything under a folder. **Deny** always wins.
