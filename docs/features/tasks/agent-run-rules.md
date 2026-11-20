# Agent run rules

An agent run keeps your agent's normal reach (shell, web, MCP servers) inside the
**agent run rules**. They make sure nothing leaves your computer before you approve it,
and that a run never merges or closes anything.

## The built-in rules

| Area | Rule |
| --- | --- |
| **Git** | Git stays on the run's branch, and nothing is pushed before you approve shipping. Force pushes, tags and removing branches are always refused |
| **MCP** | MCP tools that write somewhere else ask first; reading is allowed |
| **Shell** | Shell commands that send data out, publish or deploy ask first |
| **Files** | Files are written only inside the run's folder, and nothing changes while it plans |

**Writes to the code host, a tracker or a chat** (a pull request, a review, a comment, a
push, a ticket update, a message):

- Before **Approve to ship**, every write asks.
- After it, the writes you approved for the run's own item pass once. A review passes only
  with the verdict you chose.
- Anything else, such as another pull request or another project, still asks.
- Merging, closing and removing are always refused: `gh pr merge`, `gh pr close`,
  `gh issue close`, `glab mr merge`, `glab mr close`, and the same calls through the API.
- Autopilot changes none of this.

## A held call

A call a rule asks about is held, and the run shows it under
**Agent run rules held a call:**. Answer with **Allow for this step**,
**Always allow in this project** or **Deny**. An allowance names that one call: one MCP
tool, or one exact command.

## Your own rules

Open the project's **Settings…** and find **Rules** under **Done means**. It lists the
built-in rules and your own. Add **Allow**, **Ask first** or **Deny** for a call:

- an MCP tool: `mcp__jira__add_comment`, or `mcp__jira__*` for all of them;
- a command: `shell:npm publish`;
- a path: `file:` and the path.

**Allow** covers one exact call. **Ask first** and **Deny** also cover a command's first
words and everything under a folder. **Deny** always wins.

## What the rules cannot see

The rules are a guard, not a sandbox. They read the text of each call, including calls
wrapped in `env`, `$( )`, `sh -c` and heredocs. They cannot see what a program does after it
starts. So they do not stop:

- **scripts in the run's folder**, such as `npm run`, `make` or a script the run writes and
  then runs;
- **plugins and modules** a command loads from the project's packages;
- **what is inside** a `.tar` or `.zip` file or a patch;
- **reading your secrets**: reading is not guarded, so `cat ~/.ssh/id_rsa` is allowed;
- **git changes inside the run's folder** that can lose unpushed work, such as
  `git reset --hard`;
- **paths built while a program runs**, in most forms;
- **a `GH_REPO` or `GH_HOST`** set before the session started.

Two locks hold even when the text is misread. A git hook in the run's folder holds every
push before you approve shipping, and every push to another branch after. After shipping,
Slate reads the pull request back and says whether it matches what you approved.

To close one of these gaps for a project, add a **Deny** rule, such as
`shell:git reset --hard`.
