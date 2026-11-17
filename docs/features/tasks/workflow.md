# Agent runs: which automation runs

A run on a task is a run of one of your [automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md). The automation holds the process. Tasks only picks the automation and the item.

## Which automation fits

The input the item has decides which automations the Run menu lists. With none of your own that take it, the menu lists the starters below that do; the first run adds one to Automations.

| The item is | Input | Starter that fits | Steps |
| --- | --- | --- | --- |
| An issue (a bug) | **An issue** | **Fix a bug** | Reproduce, find the cause, failing test and fix, pull request |
| A ticket | **A ticket** | **Implement** | Plan, build in small steps, test, pull request |
| A pull request asked of you | **A pull request** | **Code Review** | Read it, check the rules, run the checks, write the review |
| Your pull request | **A pull request** | **Answer review** | Read each comment and failing check, change the code or reply, run the checks, push |
| A question or an issue to look into | **A question** | **Research** | Look it up, write the finding, change nothing |
| A message | **A message** | **Draft a reply** | Look it up, draft, send only when you approve |

Your pull request awaiting reviewers or running checks has nothing to run yet. A pull request you opened counts as yours even if assigned to yourself. A run never merges.

You can change a starter or make your own: [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#make-an-automation).

## A project skill can replace the steps

If the project keeps a skill for the same work (`fix-bug`, `development`, `code-review`, `address-review`), the automation can follow it instead of its plain steps. Pick it in the automation, under **Do**. Slate looks for these names, best first, when it suggests one:

| Work | Names looked for |
| --- | --- |
| Fix a bug | `fix-bug`, `bugfix`, `fix`, `hotfix`, `debug` |
| Implement | `development`, `dev-flow`, `feature`, `implement` |
| Code Review | `code-review`, `review`, `pr-review`, `review-pr` |
| Answer review | `address-review`, `address-comments`, `pr-feedback`, `fix-pr`, `respond` |
| Research | `research`, `investigate` |

Skills are read from `.claude/skills`, `.agents/skills`, `.cursor/skills`, `.gemini/skills` and `.opencode/skills`, also in sub-packages. A folder with no `SKILL.md` is not a skill. If the skill leaves the project, the editor says so and the plain steps run until you pick another.

## Steps and approvals stay

A skill still runs inside Slate's steps: each step opens the skill's `SKILL.md` and follows it for that step only. The plan still waits for your approval; nothing ships before it. The skill lives in the run's folder, so the agent does not ask permission per step. Skill text is never copied into a prompt. A run keeps its starting skill; a change to the automation affects the next run.
