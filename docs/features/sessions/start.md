# Start a session

Start a session where the work is, and it opens in Slate on the agent and account of that project or group. On a git project every session starts in a new [worktree](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md) of its own, so sessions never share a checkout with each other or with you. A folder that is not a git repository runs in place.

## From the map or the list

Point at a group, project or branch, on the map or in the list, and click **+** (**New session**). The session starts at once on the project's default agent, under its account, and opens. Nothing asks: the worktree gets the default name and the project's saved **Carry over**.

If the session cannot start, or the worktree cannot be made, the reason shows on its tab. Nothing starts in the main folder instead.

## New session

The **+** at the top of the list opens **New session**: one screen to start anywhere, on any agent. Only the project has to be chosen; everything else opens on your last answer.

1. **Session | Terminal**, at the top left. Leave it on **Session** for an agent, or pick **Terminal** for your own shell ([below](#a-terminal)).
2. **The project.** Search, or pick from your projects as **group → project → branch**. A click selects a row; it starts nothing. The last row, **Open folder…**, starts in any folder you pick ([below](#open-a-folder)).
3. **The agent** and **Where it runs**: **This computer** or **Cloud** ([Cloud sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md)). The agent list holds the agents connected in Connect → Agents for the project's workspace.
4. **Name** and **Carry over**, on a git project: the new worktree's branch name and the ignored files to copy into it ([Worktrees](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md#start-in-a-new-worktree)).
5. **On my phone**, for an agent that can continue on the phone ([On my phone](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md#on-my-phone)).
6. **Start**, or **Create and start** on a git project. **Enter** starts too; **Escape** closes.

A session runs as the workspace its project belongs to, whichever workspace the window shows. A refused start says why at the top of New session.

## Open a folder

**Open folder…** starts a session in any folder. A folder another workspace holds opens there. Any other folder becomes a project in the workspace on screen first:

| Folder | Becomes |
| --- | --- |
| A worktree or subfolder of a git repository | That git repository's project |
| Already a project | That project; a project in Trash comes back |
| Inside a group | A project in that group |
| A plain folder that holds two or more git repositories | Each git repository becomes a project. Slate asks first: **Group them** puts them in one group, **Keep them apart** does not |
| Anything else | A project on its own |

Your home folder and the disk root are refused.

**A session in a folder no project holds is not recorded**: it shows while it runs, but gets no doc. Memories it saves still count, as global memory. A row under **No project** offers **Make a project** in its **⋯** menu; from then on its sessions are recorded, and so are earlier ones whose transcripts are still on disk.

## From a project

A group's or project's **⋯** menu in Projects has **Start session**. The session runs on the agent and account that group or project assigns, in a new worktree when the doc's folder is a git project.

The branch goal and the next unchecked plan item are typed into the agent's prompt (`Continue on feat/x: … — next: …`), never sent. Edit it and press Enter yourself. If the agent's startup screen swallows it, the terminal says so and offers **Insert it** or **Copy the goal**.

The doc's header lists the sessions working on it, marked *needs you*, *working* or *idle*. Click one to open it.

## A Terminal

A **Terminal** is your own login shell, with your shell and environment, hosted in Slate like a session. Open one from:

- **New session**, switched to **Terminal**. It opens in the project's own folder, with no worktree, because a worktree removed when the shell exits would take your work with it.
- **The Ask Slate box**, switched to **Terminal** ([Ask Slate](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/ask-slate.md#a-terminal-instead)).
- **⌃\`**, in the folder of the doc you are on, or your home folder. A folder's menu has **Open a Terminal here**.

A Terminal is a grey row in the list and a dot on the map. It has no status, account, side panel or hand-back, and no count includes it. **Ctrl+C** goes to the program running in it. Its row's **End** closes it.
