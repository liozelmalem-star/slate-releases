# Approvals, Stop and agent differences

Home's agent runs on your own agent's CLI, and it asks before it edits a file or runs a command. Below: the approval card, how much to let it do alone, and Stop.

## The approval card

Before a call that changes something, the agent shows an amber card with the call and its whole argument, such as the full shell command:

| Answer | Effect |
| --- | --- |
| **Approve** | Runs this one call |
| **Always allow** | Runs it and stops asking for the same call. Claude Code saves the rule to the project, and the card shows the rule first. Codex stops asking for the rest of the session. Cursor and OpenCode keep it in their own allowlist |
| **Skip** | Refuses, and tells the agent why. A box beside it takes an optional reason |

- **Always allow** appears only when the agent offers a rule.
- Several calls queue and show one at a time.
- Slate's own tools, such as reading docs or saving a memory, skip the card. Everything else asks, MCP servers you connected included.
- An automation's run shows no card. A call its rules hold waits on Home as an **Automation asks** card.

## Autonomy

The autonomy pill sets what skips the card. The ⌘J panel and Home share it.

| Setting | The agent |
| --- | --- |
| **Ask first** | Asks before every file edit and command |
| **Auto-edit** | Edits files in the project; asks before a shell command |
| **Full auto** | Asks about nothing |

A click moves one step. **Full auto** needs a second click. **New chat** goes back to **Ask first**. A change applies to the chat you are in, with no restart. **Create an automation** and **Run an automation** always ask, whatever the pill says.

## A plan or a question

- **A plan**: the agent shows its whole plan before touching anything. **Approve** starts it; **Skip** keeps it planning.
- **A question**: each answer the agent offers is a button.

## Stop

**Stop** ends the turn and keeps the agent running with its connections, so your next message needs no new sign-in. Stop also declines every waiting card, and an interrupted step reads **Stopped.**

## What Home shows about the agent

- The reply streams as it is written.
- **Context**: how full the agent's context window is, as a share and a bar, darker from 75%. With no known window size it shows tokens only.
- **The tools chip** in the top bar: *connecting MCP servers…* during the first turn, then how many MCP servers the agent connected, with their names on hover and *· 1 failed* in amber when one did not connect.
- A hook that blocks a turn is reported in the chat, with its name and reason.

## What differs by agent

| | Claude Code | Codex | Cursor, OpenCode |
| --- | --- | --- | --- |
| Approval card | Yes | Yes | Yes |
| **Always allow** | Saves a project rule | For the session | Their own allowlist |
| A question with buttons | Yes | Yes | No |
| A plan to approve | Yes | No | No |
| Its own commands in **/** | Yes, after the first reply | No | No |

Codex also asks before it leaves its sandbox, and passes on questions from its own MCP servers.

Cursor and OpenCode follow the pill: **Ask first** shows a card for each call, **Auto-edit** allows edits, reads and searches, and **Full auto** allows everything.

**Gemini**: Slate cannot yet ask Gemini for permission, so its pill is off and Gemini runs pre-approved.

**GitHub Copilot** runs in Home, but its approval card is not yet tested. **The ten agents marked Beta** (Antigravity, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code, Auggie): Home, Stop and the approval card are not yet tested with them. Full table: [Features by agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agents/features-by-agent.md).
