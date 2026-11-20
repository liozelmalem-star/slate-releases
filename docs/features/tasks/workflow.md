# Which automation runs

A run on a task is a run of one of your [automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md). The
automation holds the process; Tasks only picks the automation and the item.

## Which automation fits

Each automation takes one kind of input, and each task is one kind of input. The
**Run <automation>** menu lists the automations that take this item: yours first, then
each of Slate's starters below that none of yours came from.

| The task is | Starter | Its steps |
| --- | --- | --- |
| An issue (a bug) | **Fix a bug** | Reproduce, find the cause, a failing test and the fix, a pull request |
| A ticket | **Implement** | Plan, build in small steps, test, a pull request |
| A pull request asked of you | **Code Review** | Read it, check the rules, run the checks, write the review |
| Your own pull request | **Answer review** | Read each comment and failing check, change the code or reply, run the checks, push |
| A question, or an issue to look into | **Research** | Look it up, write the finding, change no file |
| A message | **Draft a reply** | Look it up, draft, send only when you approve |

The first run of a starter adds it to Automations, where it stays. You can change a
starter or make your own ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md)).

Your own pull request that waits for reviewers or checks has nothing to run yet. A run
never merges.

## How each kind runs

| Kind | What is different |
| --- | --- |
| **Code Review** | The pull request's head is fetched into a folder of its own. It never pushes. You approve the comments as **Post comments**, **Request changes** or **Approve**, and the run posts exactly that |
| **Answer review** | Your branch is fetched into a folder of its own, and it is the only branch the run may push. A pull request from someone else's copy of the project is refused |
| **Research** | Reports the cause and the options. Changes no file |
| **Draft a reply** | Reads the project you pick, then drafts. Slate sends it when it can, or hands it to you |

**The check.** A run checks its work with the project's **Check** command, set in its
**Settings…**. With none, it uses one found in the project's files (`package.json` scripts,
`Makefile` targets, `pyproject.toml`, `Cargo.toml`, `go.mod`), or else the agent finds the
tests.

## A project skill can replace the steps

When your project keeps a skill for the same work, the automation can follow it instead of
its plain steps. Pick it in the automation, under **Do**. Slate suggests one by its name,
best first:

| Work | Names Slate looks for |
| --- | --- |
| Fix a bug | `fix-bug`, `bugfix`, `fix`, `hotfix`, `debug` |
| Implement | `dev-flow`, `development`, `feature`, `implement` |
| Code Review | `code-review`, `review`, `pr-review`, `review-pr`, `review-architecture` |
| Answer review | `address-review`, `address-comments`, `pr-feedback`, `fix-pr`, `respond` |

Skills are read from every skill folder your agents read, such as `.claude/skills` and
`.agents/skills`, in sub-packages too. A folder with no `SKILL.md`
is not a skill. If the skill leaves the project, the automation says so and the plain steps
run until you pick another.

**The approvals stay.** A skill runs inside Slate's steps: each step opens the skill and
follows it for that step only. The plan still waits for your approval, and nothing ships
before it. A run keeps the skill it started with; a change to the automation applies to the
next run.
