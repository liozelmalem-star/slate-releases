# Ask from Home

The box at the foot of Home asks your own agent anything about the workspace: find a doc, sum up a day, write a plan, change a file. It runs on the agent and account the workspace assigns, and reaches every project in the workspace, its docs, memory and activity, and the MCP servers your agent connects.

## Ask

Type in **Ask, find, or make anything…** and press **Enter**. The chat opens over Home, and the reply streams as it is written.

- **Home**, at the top left of the chat, goes back to the cards and keeps the chat. **Back to the chat** returns to it. Sending a message also returns to it; a streaming reply does not pull you back.
- **New chat** starts over.
- Before the agent edits a file or runs a command, it asks: [Approvals, Stop and agent differences](https://liozelmalem-star.github.io/slate-releases/docs/features/home/approvals.md).

There is no project to pick: the agent's searches, the memories Slate gives it and the widgets on Home cover every project in the open workspace. The workspace switcher picks the workspace.

## Resume a past session

1. Open [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md) and choose **All past sessions**.
2. Press **Resume** on a row. A click on the row opens its record instead.
3. Home opens with that session's conversation loaded, and the agent continues it.

The chat starts with what you first asked and, under **Summary**, what Slate saved of the session. **Start fresh instead** opens an empty chat.

## Attach a file

Drop a file on the box, paste it, or use **Attach files**. An image shows as a thumbnail, and the agent gets its path; an attached image unused for 30 days is removed. A text or code file is put into the message under its name, cut at 20,000 characters.

An image can be up to 8 MB and a text file up to 1 MB. A larger file, a binary such as a PDF or a zip, or a file that is not UTF-8 text is not attached, and a message names it.

The same works in a session's **Conversation** box.

## Skills and mentions

**/** at the start of the box lists the skills your agent loads here: the project's own skills, its commands, and your personal and plugin skills. Matches by name come first. A pick waits as a chip; on send, the agent is told to read that skill and follow it. After Claude Code has answered once, its own commands are listed too.

**@** anywhere names something in the workspace. The menu shows up to five of each kind whose name holds what you typed. A pick is a chip; on send, its content goes before your message:

| Kind | Sent |
| --- | --- |
| Doc | Its text, cut at 8,000 characters |
| Session | Its agent, folder, branch and id |
| Memory | The claim, why it was written, and its source |
| Task | Its state and link |
| Automation | Its steps |
| Report | Its text |

If Slate cannot read one, the message is sent without it and says so. **/** and **@** work in a session's **Conversation** box too.
