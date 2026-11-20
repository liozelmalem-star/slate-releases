# Group and project settings

A group's or project's settings decide how agents work there: which agents, which commands
a new worktree runs, and when an agent run's work counts as done. Open **Settings…** on the
⋯ menu of a group, or of a project in no group. A project in a group uses its group's.

The settings are saved on this computer, because they name accounts and commands on it.
They never travel with a shared workspace. Only the **Memory** section is saved in the
workspace.

| Section | What it sets |
| --- | --- |
| **Folder** | Shows the folder on this computer. Change it with **Change folder** on the ⋯ menu |
| **Agents here** | Which agents this project uses. None ticked: the workspace's. **Save agents** saves. Accounts and models are set in Connect → **Agents** |
| **New worktrees** | **Set up**, **Preview**, **On remove** and **Carry over** commands ([Worktrees](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md)) |
| **Done means** | The **Check** command that decides an agent run's work is done, **Autopilot**, and the **Rules** agent runs follow here ([Agent runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md#autopilot), [Agent run rules](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-run-rules.md)) |
| **Work from** | The sources whose tasks start here ([The start dialog](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-runs.md#the-start-dialog)) |
| **Project hooks** | Shown when the project's own agent settings run commands at the start of a turn. Until you press **Allow this project's hooks**, turns below Full auto are refused here. A change to those settings asks again |
| **Memory** | What Slate keeps from this project ([What a project keeps](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#what-a-project-keeps)) |

Fields save when you leave them.
