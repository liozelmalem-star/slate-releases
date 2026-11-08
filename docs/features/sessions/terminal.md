# The terminal and the side panel

A hosted session runs on a real pseudo-terminal, so the CLI behaves as in Terminal.app. A panel on the right shows what it did and changed.

## The terminal

The CLI runs on a pseudo-terminal the app owns (colours, spinners, the full TUI). Slate supplies folder, account and context and stays out of the conversation; the session is captured like any other. The CLI sees `TERM_PROGRAM=Slate`.

Claude sessions start as a **background job** (`claude --bg`, idle, no turn spent) with a view onto it, so any terminal can pick it up, even after Slate quits. Other tools start the ordinary way. Navigating away or reloading never ends a session; coming back replays what it said.

A session's tab has no doc chrome. One line above the terminal gives plan progress and the next item (`3 of 7 · Wire the totals`) and the **Terminal | Conversation** switch. A plain shell has neither.

**Conversation** is the transcript read back: each message formatted, each tool step as it runs, a prompt below.

- Enter sends at the terminal's prompt; Shift+Enter adds a line.
- `/` lists the skills the tool loads in its folder. `@` names a doc, session, memory, task, automation or report; its content goes before your words, as on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md#skills-and-mentions).
- Menus and permission dialogs the tool draws itself show only in **Terminal**. When the session waits on a call with no result yet, a bar above the prompt names it; **Open Terminal** switches.
- Every session opens on **Terminal**; picking Conversation holds for that session only.

**Focus mode, ⌘⇧M**, hides top bar, rail and sidebar, leaving one agent. The same chord, or *Exit focus*, restores them.

### What the terminal does

| Feature | Behaviour |
| --- | --- |
| Theme | Follows your theme, including a retint from Settings → Appearance, while running |
| Keys ([list](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#terminal)) | ⌘F searches scrollback too; ⌘C, ⌘V, ⌘+/−/0 zoom (remembered). `Ctrl-C` still interrupts: every other app chord (⌘K, ⌘P, ⌘W) reaches the app, not the CLI. Shift+Enter adds a line. Option is Meta: ⌥←/⌥→ jump a word, ⌥⌫ removes one |
| Mouse | Selecting copies (a switch in Settings → Terminal); middle button pastes; right-click: Copy, Paste, Select all, Clear (⌥⌘K), **Remember on *doc*** |
| Scrolling up | Output keeps arriving; a **Newest output** pill returns you. Past the scrollback limit: *earlier output is no longer kept* |
| Links | A local server address (`http://localhost:5173`) opens in Slate's browser as a tab beside the session; other URLs open in your browser. A printed `slate://page/<id>` opens that doc beside the session. A printed path like `src/x.ts:42` opens that file at that line, resolved against where the session runs |
| Settings → Terminal | Font, size, line height, cursor shape and blink (only the terminal you type in blinks), copy-on-select, scrollback (5,000 lines default). Changes reach sessions on screen |
| Hidden terminals | Behind another tab or a hidden window they keep the last 1,000 lines; on return, full scrollback again |
| Remember a selection | A bar appears over the foot: **Copy**, or **Remember**, which files the selection as a memory under the session's doc. Nothing is captured automatically |

## The side panel

One panel on the right shows what the session in your active column (blue line on top) did and changed. Open by default and shared by the window; off only while that column holds no session (map, doc, plain shell).

- **⌥⌘B** or the button at the strip's end hides it. Hidden, a button at the tab row's end brings it back, showing files waiting to commit. The choice is remembered.
- Drag its left edge to resize, 280 px to 640 px (never over 60% of the window); double-click for 320 px.
- The map icon at the end of the workspace picker's row returns to the map.

| Tab | Shows |
| --- | --- |
| **Details** (ⓘ) | **⌥⌘I** in a session's column, or a click on the state words in its header, opens it here |
| **Changes** (⇄) | Count of files waiting to commit on its icon. What the session's checkout changed ([Review the branch](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#what-the-branch-changed)); a session started in the main checkout that edits a worktree reads that worktree's changes. **All files** opens Projects › Code for the session's project |
| **Turns** | Every prompt, newest first, with when. A click scrolls the conversation to it, or finds it in terminal scrollback. A prompt that changed files shows how many; open it for the files, each opening its change. Undo: [Rewinding a turn](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/review.md#rewinding-a-turn) |

### Details

Four sections: **Environment** (tool, project, branch, folder, other agents there), **Progress** ([flow](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/flow.md) as one line such as "Check · 4 of 5", "27m in", and a bar), **Context** (fill; for a tool that states no window, past 200k tokens is read against a 1M window) and **Links**. The foot holds what the branch is for (doc, goal, documents under it), **Changed**, **Recorded** and **Given**. A session ends from its tab.

**Links** is what the branch is attached to. Shut: `PR #142 · #138`. Opened: a row per source mark (GitHub, Jira, Linear, Slate); click to open.

- **The pull request**: title, checks (passing, failing, running), reviewer count, open/merged/closed. The number comes from origin; the rest is read with `gh`. Without `gh`, the number alone.
- **The issue**: a branch named for a Jira or Linear key (`SLT-138-…`) shows that item from Tasks; otherwise the GitHub issue the pull request closes, or the one whose number starts the branch name (`fix/138-…`).
- **The branch's doc in Slate.**

Nothing attached: no card.

**Recorded** lists memories this session filed, and whether on its own or after Slate asked. No commits are listed (matching by time would count a concurrent agent's work). An unjudged session stays silent.

**Given** lists memories Slate gave the session, each once: **At start** (session brief) or **On your prompts**. Green dot: the session used it (replies repeated its rare words). Outline: not used. Dashed outline: not judged yet (after the session ends). Five rows per group, then a count; click one to open Memory. Nothing given: no **Given** section.

## The timeline

**Conversation** shows what the session did, in order: each prompt, what the agent said, every tool run with its target on one line (file, command, search).

- Click a step for its output. An edit opens onto the lines it changed, as in the branch review. A failed step says *failed*.
- The agent's plan (Claude Code's todo list, Codex's plan) sits on top with items done.
- Last 60 turns shown. Step output over 4,000 characters keeps its first and last 2,000.
- Claude Code, Codex, Gemini and OpenCode record each call with its output. Cursor records calls only; its timeline says so.

A [receipt](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md#receipts) is read from the same timeline.
