# Approvals, Stop and Agent Differences

Home's agent runs on a real CLI and asks before it edits a file or runs a command. This guide covers the approval card, autonomy, plans, questions, Stop, and what differs by agent.

## Contents

- [The approval card](#the-approval-card)
- [Autonomy](#autonomy)
- [A plan or a question](#a-plan-or-a-question)
- [Stop](#stop)
- [What Home shows about the agent](#what-home-shows-about-the-agent)
- [What differs by agent](#what-differs-by-agent)

## The approval card

The agent can read files, edit files and run shell commands in the project you scoped the turn to. It **asks first**, in the amber card used for workspace writes. The card shows the tool's call and the full argument (the whole shell command), with three answers:

| Answer | Effect |
| --- | --- |
| **Approve** | Runs this one call; nothing is remembered |
| **Always allow** | Runs it and keeps a rule so the next identical call is not asked. Claude Code: saved to the project's `.claude/settings.local.json` (the card prints the exact rule first). Codex: remembered for the session. Cursor, OpenCode: kept in their own allowlist |
| **Skip** | Refuses and tells the agent why, so the reply says the call was declined |

- A box beside **Skip** takes an optional reason, which can become a memory proposal.
- **Always allow** appears only when the CLI offered a rule. A question card has no **Approve**: each answer is a button.
- Several calls at once queue and show one at a time. An answer belongs to its own card, so a double click cannot approve the next one unseen.
- Slate's own tools (reading docs, writing memory) skip the card. Everything else asks, including MCP servers you connected.
- Background work (an automation's run) shows no card while running. Its rules decide, and a call that changes something is held and appears on Home as an **Automation asks** card after the run ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#when-it-asks-first)).

## Autonomy

The autonomy pill sets how much skips the card. The ⌘J panel and Home's composer share it.

| Setting | Effect |
| --- | --- |
| **Ask first** | Asks before every file edit and command |
| **Auto-edit** | Applies file edits; asks before a shell command |
| **Full auto** | Asks about nothing |

A click moves one step; entering Full auto needs a second click. **New chat** resets to Ask first. A change applies to the current conversation with no restart, so no tool signs in again. **Create an automation** and **Run an automation** ignore the pill and always ask, because they spend money. Other Slate writes (a new doc) run without asking under Auto-edit and Full auto.

## A plan or a question

- **Plan.** The tool writes the whole plan and shows it before touching anything. Approve starts it; Skip keeps planning.
- **Question.** When the tool needs a decision, each offered answer is a button; picking one answers.

The CLI hides its plan and question tools from hosts that cannot answer them; Slate can.

## Stop

**Stop** ends the turn and keeps the agent running with its connections, so your next message needs no new sign-ins. A message sent right after waits up to 10 seconds for the stopped turn to let go, then starts a fresh one. A tool that runs one process per message has it ended ([fallback](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md#transport)). Stop also declines every waiting card; an interrupted step reads **Stopped.**

Home has one warm agent. A chat started with **Chat** in Sessions has its own, in its own folder; Stop, mode and model there reach only that tool, and closing its tab ends it ([A chat instead of a terminal](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md#a-chat-instead-of-a-terminal)).

## What Home shows about the agent

- The reply streams as written.
- A **context meter** by the token count shows how full the tool's window is (share and bar), using the CLI's numbers (matches `/context`). It refreshes each turn, darkens from 75%, and shows tokens only if the size is unknown.
- The top bar's **tools** chip shows *connecting agents…* with a spinner during the first turn, then how many MCP servers the tool reported (names on hover, *· 1 failed* in amber for any that did not connect).
- A **hook that blocks a turn** is reported in the chat with its name and reason. Only failing hooks are reported.
- **`/`** lists skills and commands ([Skills and mentions](https://liozelmalem-star.github.io/slate-releases/docs/features/agent.md#skills-and-mentions)).

## What differs by agent

**Claude Code and Codex** speak their own protocols. **Cursor, OpenCode, Gemini, GitHub Copilot and the ten newest** (Antigravity, Cline, Grok Build, Kiro, Qwen Code, Droid, Hermes Agent, Goose, Kilo Code, Auggie) speak the Agent Client Protocol. Approval cards work on Claude Code, Codex, Cursor and OpenCode. **For the ten newest, Home, Stop, the model picker and the approval card are unverified**: only their ACP handshake was checked. Full table: [Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md).

| | Claude Code | Codex |
| --- | --- | --- |
| Asks before a command, file change or tool | yes | yes |
| Question with options as buttons | yes | yes |
| Plan to approve | yes | — |
| Always allow | saves a project rule | remembers for the session |
| Stop ends the turn, not the tool | yes | yes |
| Context meter, model picker, streaming | yes | yes |
| Own slash commands in `/` after the first reply | yes | — (in its terminal UI, not the protocol) |

Codex also asks before **escalating out of its sandbox** and passes on questions from **its own connected MCP servers**. Claude has neither.

**Cursor and OpenCode** show the card (**Approve**, **Always allow**, **Skip**) but no plan or question card. Always allow goes in the tool's own allowlist. Slate answers by the pill:

| Pill | Cursor (asks for anything outside your Cursor allowlist) | OpenCode (Slate starts it with shell and edits set to ask) |
| --- | --- | --- |
| Ask first | Card for each call | Card for each call |
| Auto-edit | Allows edits, reads, searches; card for the rest | Same |
| Full auto | Allows all | Same |

If OpenCode does not answer the protocol, Slate runs one process per message with no card, so an ask is a refusal: Ask first refuses shell commands and edits, Auto-edit refuses shell commands, Full auto leaves OpenCode's default.

**Gemini** is *unverified* for asking, because Gemini CLI stops before any turn on a consumer Google account ([Features by Agent](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/tool-features.md)). Its autonomy pill is disabled, with the tooltip *Slate cannot yet ask Gemini for permission, so it runs pre-approved whatever this says*.

The 10-minute limit on a quiet agent gets one more window while an approval waits on you. An unanswered card still ends; Stop always works.
