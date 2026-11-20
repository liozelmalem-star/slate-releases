# Your terminal and Slate

A session can move between your own terminal and Slate. Continue a terminal session here when you want Slate's panel and tabs around it; hand one back when you want it in your terminal again.

## Continue a session from your terminal

Click the session's row. Slate shows its conversation, live, read from its transcript, with its details in the side panel. Nothing on that screen types into your terminal. One button above the conversation says what continuing it would do:

| Session | Button | What happens |
| --- | --- | --- |
| A Claude Code background job, or a Cursor `persist` session | **Open in Slate** | The session itself opens in Slate. Nothing is copied or interrupted |
| Claude Code in a terminal, Codex, OpenCode | **Continue in a copy** | Slate starts a second conversation with the whole history. The original keeps running where it is |
| Cursor, Gemini | **Move here** | The original ends first, then the session continues here. Click twice, because a turn in progress is lost |

A copy has its own transcript, so the two never mix. Its row says **Copy in Slate**. The original's row offers **Open your copy** to read or stop it. Slate uses the session's own account, so the copy finds the same conversation.

## Hand a session back to your terminal

**Hand back to my terminal**, in a row's **⋯** menu, detaches a Claude Code session that Slate runs and leaves it running. Only Claude Code can do this.

1. Slate sends Claude Code its detach input and closes the session's terminal in Slate.
2. A message, **Handed back to your terminal**, gives the command to attach to it again, such as `claude attach <handle>`, with **Copy resume command**.
3. If Slate cannot name the command, the message says *It keeps running in the background*.

Run the command in any terminal to pick the session up.
