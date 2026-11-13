# Cloud sessions and phone

A cloud session runs on your agent's computer. A phone session runs here and you continue it in your tool's app. Both start from **New session**.

## Cloud sessions

**Claude Code** and **Codex** have them. Gemini and OpenCode have none; Cursor's cloud agents have a web API only ([agent features](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md)).

1. Open **New session → Cloud**.
2. Write the task, pick a project (git repositories only: the cloud works on a copy).
3. Press **Start in cloud**.

The form says what leaves your computer:

- **Claude** clones the project's GitHub remote at its current branch, so push first. With no GitHub remote it uploads the history and uncommitted changes to tracked files (not untracked).
- **Codex** runs in an *environment* you set up for the git repository at chatgpt.com/codex, on its GitHub remote at your current branch. Type its name; earlier names are offered and the last one used per project is prefilled.

It runs under the project's profile. Slate asks that account's CLI whether it can start one before Start enables. Claude needs a claude.ai sign-in (API key, token, Bedrock or Vertex accounts cannot; the form says so). Codex needs a ChatGPT sign-in; an expired one is told to run `codex login`.

**Find it** in the list under its project, with a cloud where the status dot sits. A Codex row says working, ready, applied or failed (Codex's list is asked once a minute while Sessions is open). Claude keeps no list; its row says the status is on claude.ai.

**Its doc** shows what you asked and every message sent, with the tool's controls:

| Tool | Controls |
| --- | --- |
| Claude | **Send** a follow-up (Enter sends, Shift+Enter adds a line; queued, answered on claude.ai). **Bring back** opens it in a new worktree with the whole conversation, as a normal session |
| Codex | No Send. **Show diff** (read-only). **Apply in a worktree** lands the changes, uncommitted, in a new worktree and opens its changes |
| Both | **Open on** the tool's site; **Remove from Slate** (it stays on the site). Neither tool offers Stop, and the doc says so |

**Removed on the tool's site.** Codex says so when asked, and the session leaves the list. Claude says so only on the next Send: the first Send to a session removed on claude.ai drops it, with a sentence why.

**Started somewhere else.** Claude has no command that lists cloud sessions, so Slate keeps its own record: sessions it started, and ones another Claude Code session started while Slate's hooks were connected (a scheduled task run with the RemoteTrigger tool, or `claude --cloud "<task>"`). The row appears within 15 seconds while the window is open, under the project holding the calling session's folder, labelled **started by a scheduled task** or **started from another session**. Codex lists only sessions Slate started. Not recorded: cloud sessions started on the web or phone, and scheduled tasks firing on their own schedule.

**Memory.** A brought-back Claude session writes a normal transcript once you send a message. A Codex session brings back changes only; applying it notes them on the project's doc. A running cloud session has no Slate hooks and cannot reach memory, so its decisions arrive as a record (ADR 0071).

## On my phone

A session can continue from your phone while it runs here. Slate has no phone app: you pick it up in your tool's app. Today that is **Claude Code**, in the Claude app (**Code** tab) or at claude.ai/code.

- **Start on the phone**: turn on **On my phone** in **New session**, above the options beside **Runs on**.
- **Move a running session to the phone**: **On my phone** at the top of its doc.

Either opens a card, **Ready on my phone**, with three steps and the session's claude.ai link (**Copy**, **Open**). The same button, now blue, reopens it; **Stop phone access** turns it off. A phone mark shows in the list and the header counts them. Slate reads this from the transcript, so it also shows a session you put on the phone with `/remote-control` in your own terminal.

The control is on every session, greyed out with a reason where it cannot work:

| Case | State |
| --- | --- |
| Claude Code running in Slate | Works |
| Claude Code in your own terminal | Shown, not switched from Slate: type `/remote-control` there |
| Account that cannot (API key, token, Bedrock, Vertex, or off by your organization) | Greyed, with Claude's reason. Slate asks Claude (`claude doctor`) once per account |
| Codex | Not supported yet: it pairs your whole computer with the ChatGPT app, not one session |
| Cursor, Gemini, OpenCode | Cursor's phone control is in its app; Gemini and OpenCode have none |

**It still runs here**, so hooks, memory and capture work as always. While on, the conversation also goes through Anthropic (ADR 0072).
