# Start a session

Point at where the work is and press **+**. The session starts on the tool and account of that project or group and opens in Slate.

## From the list

**Where you look is where it starts.** Pointing at a group, project or branch (map node, heading or rail row) shows **+**, titled **New session**.

1. Click **+**. A session starts there at once on the group or project's default tool, under its account, and opens. No picker.
2. A project also has **New worktree**, which opens the [worktree form](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/worktrees.md) for it.
3. A group or project with nothing to run in shows no control. A refused launch shows on the tab in its own words.

The **+** in the side panel's title row starts a session elsewhere or on another tool, in a tree of **group → project → branch** (a workspace level above when several have work). Click a row to start there; a row with its own folder shows it. A git project ends with **New worktree…**; a plain folder has none.

**A session runs as the workspace its project or group belongs to**, whichever the window shows (a work project picked in Personal uses the work agent and account). A refused start shows at the picker's top; every start, refusal and failure goes to `slate.log`. Sessions started from Slate always start in a project.

**Runs on**, above the tree, lists the agents connected in Connect → Agents for the workspace in focus (named when several have work). It starts on that workspace's default; another pick applies to this session only. The worktree form has it too. Groups and projects with no linked folder are not offered.

## Open a folder

**Open folder…** starts a session in any folder. A folder another workspace holds opens there. Otherwise it becomes a project in the workspace on screen, by the same rules as New project, onboarding and **Make a project**:

| Folder | Becomes |
| --- | --- |
| Worktree or subfolder of a git repository | That git repository |
| Already known | Its doc opens; a doc in Trash comes back |
| Inside a group | A project in that group |
| Plain folder holding two or more git repositories | Asks first; each git repository becomes its own project. **Group them** puts them in one group (named after the folder unless you type another name there); **Keep them apart** leaves each alone. The folder itself never becomes the group |
| Anything else | A project on its own |

Your home folder and the disk root are refused, because every session would file under them.

### You choose your projects

Slate makes no project itself. Setup's last step lists git repositories, newest change first, nothing ticked; ticked ones become projects. It never lists your home folder, temporary folders, an agent's own folder, Slate's data folder or a removed folder. A removed project stays removed until you restore its doc or add the folder.

**A session in a folder no project holds is not recorded**: no session doc, nothing in Docs. Memories it writes with `remember` are still saved, as global memory. Adding the folder later (setup, **+** in Projects, or the session's row) records sessions there from then on and earlier ones whose transcripts remain on disk. Restoring a project from Trash does the same.

A row in **No project** offers **Make a project** under **⋯**. With several workspaces the menu names each (**Make a project in Work**), the session's own first. A folder no workspace claims goes to Personal, private by default.

## From a doc

A branch, project or group doc has **Start session** in its header. It runs the tool its group (or project) has connected, in the doc's folder, under the account its group or project assigns that tool, and opens it. A doc with a folder also has a plain terminal button.

A doc **Goal** is seeded into the CLI prompt with the next unchecked plan item (`Continue on feat/x: … — next: …`): typed, never sent, always one line (a newline would send). If a CLI's startup repaint swallows it, the terminal says so and offers **Insert it** or copy.

A refusal names the fix: *"Acme does not use gemini. Sessions under /code/acme use: claude. Add it in Connect → Agents to allow it here."* A doc with no folder is refused the same way.

**A doc shows what runs on it.** Sessions working towards it appear in its header as *needs you*, *working* or *idle*; click one to open it. This stops a second session starting on a branch that already has one working.

## A chat instead of a terminal

**Chat**, beside **+** on a group heading and map node and in a row's **⋯**, starts the group or project's tool but draws it as Home does: each turn, each tool step as it runs, an approval card where the tool needs your yes. A row's chat works in that row's checkout. It opens as a tab named for the group or project; its composer shows the folder.

Its tool is not Home's, so a chat never restarts Home's conversation. It lasts as long as its tab (**Close and end this chat** stops its tool, as does quitting) and is not recorded as a session. Use a terminal session for work to leave running.

## A plain shell

**⌃`** opens a plain login shell (your shell and environment) in the folder of the doc you are on, or your home directory when nothing names one. It is hosted like a session: it survives navigating away, opens in the Sessions tab, and the [terminal](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/terminal.md) features apply. It has no tool account and no hand-back.

## Taking over a session from your terminal

A session in your own terminal can be continued here. **Clicking its row only shows it**: its conversation, live, read from the transcript. Details and changes are in the window's panel. One button above it says what continuing would do; nothing on that screen types into your terminal.

| Session | Offer |
| --- | --- |
| Already a background job (Claude Code job, Cursor `persist`) | No button. The row opens it as itself with `claude attach` or `cursor-agent persist attach`; copies and interrupts nothing |
| Claude Code in a terminal, Codex, OpenCode | **Continue in a copy** (`--resume <id> --fork-session`, `codex fork <id>`, `opencode --session <id> --fork`): a second conversation with the whole history; the original keeps running |
| Cursor, Gemini | **Move here**. `cursor-agent --resume` appends to the original transcript, so two processes would write one file; the original is ended first, and the button asks twice because an in-flight turn is lost |

A copy has its own transcript, so the two never interleave. Its row says **Copy in Slate**. The original's tab keeps showing the original live, and its row offers **Open your copy** to read or stop the copy. Offers use the session's own account (another account would find nothing and quietly start a new conversation).

## Moving a session back to your terminal

**Hand back to my terminal**, in a row's **⋯** (*Keeps running; you get the command to resume it*), detaches a session Slate runs and leaves it running. Only Claude Code supports it, so the item shows only on a Claude Code session Slate runs.

1. Slate sends the tool's detach input (`/bg` for Claude Code), waits about 1.5 seconds and closes the session's terminal.
2. A message gives the resume command with **Copy resume command**: `claude attach <handle>`, prefixed with the account where there is one.
3. If Slate cannot name the command, the message says *It keeps running in the background*.
