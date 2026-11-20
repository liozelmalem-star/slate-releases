# Cloud sessions and phone

A cloud session runs on your agent vendor's computers, so it keeps going while yours sleeps. A phone session runs here, and you continue it in your agent's phone app. Both start from **New session**.

## Cloud sessions

**Claude Code** and **Codex** can run cloud sessions. Gemini and OpenCode cannot ([Features by agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agents/features-by-agent.md)).

1. Open **New session** and set **Where it runs** to **Cloud**. The list then shows git projects only, because the cloud works on a copy.
2. Pick a project and write the **Task**.
3. Press **Start in cloud**.

What leaves your computer depends on the agent:

- **Claude** clones the project's GitHub remote at your current branch, so push first. With no GitHub remote it uploads the history and uncommitted changes to tracked files.
- **Codex** runs in an *environment* you set up for the project at chatgpt.com/codex, on its GitHub remote at your current branch. Type the environment's name; the last one used for the project is filled in.

The session runs under the project's account. Claude needs a claude.ai sign-in: an API key, token, Bedrock or Vertex account cannot start one, and the form says so. Codex needs a ChatGPT sign-in.

**Find it** in the list under its project, with a cloud where the status dot sits. A Codex row says **Working**, **Ready**, **Applied** or **Failed**. Claude keeps no list Slate can read, so its row says the status is on claude.ai.

**Open it** to see what you asked and every message since:

| Agent | Controls |
| --- | --- |
| Claude | **Send** a follow-up; Claude queues it and answers on claude.ai. **Bring back** opens the session in a new worktree with its whole conversation, as a normal session on this computer |
| Codex | **Show diff** (read-only). **Apply in a worktree** puts the changes, uncommitted, into a new worktree |
| Both | **Open on** the vendor's site; **Remove from Slate** (it stays on the site). Neither agent can stop a cloud session from Slate |

**Started somewhere else.** A Claude cloud session that another Claude Code session started, such as a scheduled task, appears within 15 seconds while the window is open. Its row says **started by a scheduled task** or **started from another session**. Cloud sessions started on the web or the phone are not listed.

A running cloud session cannot reach Slate's memory. A brought-back Claude session is recorded like any session once you send it a message.

## On my phone

A session can continue from your phone while it runs here. Slate has no phone app: you pick the session up in your agent's app. Today that is **Claude Code**, in the Claude app (**Code** tab) or at claude.ai/code.

- **Start on the phone**: tick **On my phone** in New session, above **Start**.
- **Move a running session to the phone**: press **On my phone** at the top of the session.

Either opens a card, **Ready on my phone**, with three steps and the session's link to copy or open. The same button, now blue, opens the card again; **Stop phone access** turns it off. A phone mark shows on the row, and the header counts the sessions **on my phone**. A session you put on the phone with `/remote-control` in your own terminal shows the mark too.

| Session | On my phone |
| --- | --- |
| Claude Code running in Slate | Works |
| Claude Code in your own terminal | Type `/remote-control` there |
| An account that cannot (API key, token, Bedrock, Vertex, or turned off by your organization) | Greyed out, with Claude's reason |
| Codex, Cursor, Gemini, OpenCode | Not available |

The session still runs on this computer, so Slate records it as usual. While it is on, Anthropic keeps the conversation.
