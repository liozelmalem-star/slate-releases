# Agent runs: Workflow

Each kind of [agent run](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md) runs **one skill per project**. This guide lists the kinds, skill sources and how to change a rule.

## The six kinds

| Kind | How it is known | Steps |
| --- | --- | --- |
| **Bug** | Ticket type Bug or Defect (Jira), or GitHub issue with a bug label | Read it, Plan, you approve, Build, Check, Draft, you approve, Ship |
| **Feature** | Any other ticket | As bug |
| **Someone else's PR** | You were asked to review it | Read it, Review, you approve, Post |
| **My PR** | Yours; a reviewer asked for changes | Read the comments, Plan, you approve, Build, Check, Draft, you approve, Push and comment. Then done; the next review round is a new run |
| **My PR, checks failing** | Yours; checks fail | Read the checks, then as **My PR** |
| **My PR, ready to merge** | Approved, checks pass, no conflicts | Read it, then as **My PR**: updates the branch and pushes. The merge is yours; a run never merges |

Your pull request awaiting reviewers or running checks has no kind yet; you can pick one. A pull request you opened counts as yours even if assigned to yourself.

## Skills

A skill is one the project keeps (`fix-bug`, `dev-flow`, `code-review`) or **Slate's own steps**. Skills are read from `.claude/skills`, `.agents/skills`, `.cursor/skills`, `.gemini/skills`, `.opencode/skills`, also in sub-packages. A folder with no `SKILL.md` is not a skill.

Slate suggests by skill **name**, best first, never by description. No match: Slate's own steps run until you pick.

| Kind | Names looked for |
| --- | --- |
| Bugs | `fix-bug`, `bugfix`, `fix` |
| Features | `dev-flow`, `development` |
| Reviews | `code-review`, `review` |
| Your pull request | `address-review`, `fix-pr` |
| Failing checks | `fix-checks`, `fix-ci` |
| Ready to merge | `git-merge`, `merge`, `land` |

## Change a rule

1. Open **Workflow**, the folded box atop Issues and Reviews: that section's rules for one project (*Bugs → fix-bug*), with a project picker.
2. Pick a skill. The run button's menu and the start dialog change the same rule.
3. It saves at once for every task of that kind in that project. A changed rule says **Changed** and resets in one click.

If a picked skill leaves the project, the rule says so and Slate's own steps run. **Open** shows the skill in Toolkit; the rule shows its use in the last 30 days (**ran 4× · 1 stopped by you**).

A kind with no skill shows **Slate's own steps** and **New review skill** (or **New bug skill**). It opens [Toolkit](https://liozelmalem-star.github.io/slate-releases/docs/features/studio.md)'s New skill form on that project with name and description filled. **Create** writes the skill, makes it the rule and returns to Tasks; **Cancel** writes nothing. Offered for a project, not a group.

## Steps and approvals stay

A whole-process skill still runs inside Slate's steps: each step opens the skill's `SKILL.md` and follows it for that step only. The plan still waits for approval; nothing ships before it. The skill lives in the run's folder (a committed one already does; an uncommitted one is copied in with its files), so the agent does not ask permission per step. Skill text is never copied into a prompt. A run keeps its starting skill; a rule change affects the next run.
