# How status works

Slate reads a session's state from its transcript, who spoke last, and whether a running CLI process vouches for it. This guide gives the signals, the blind spots and how the list stays current.

## How a state is decided

- A quiet transcript with no live process is a closed conversation. It leaves the tab and is never shown as **Needs you**.
- A process vouches for a session of its tool in the folder it works in (for `codex --cd <folder>` or `cursor-agent --workspace <folder>`, that folder). A session that moved on is still found by the folder it began in. Two spellings of one folder (`/tmp`, `/private/tmp`) count as one.
- A tool that lists its own sessions decides: an unlisted session is gone, but a listing alone does not prove one alive. A job the tool reports as `done`, `stopped` or `failed` is finished. The one exception is a widget's chat: Claude Code reports its session `done` after each turn while the session waits for the next message, so there `done` ends it only once its process is gone.

A turn's last write is what touches the transcript, so a session that just asked you something reads as **Working** for a 45-second window. Three signals shorten that:

- **The window title of a session Slate hosts.** If it stops moving, the session becomes **Needs you** in about ten seconds. Only a title seen to move counts; of the first five CLIs only Codex animates its title.
- **The tool's own listing**, when it reports the session busy.
- **A sub-agent still writing.** This reaches a session in somebody else's terminal.

For Claude Code the transcript settles it: a record with a tool call is mid-turn, one with only text is finished. A call with no result is **Working**. Only a session Slate hosts, whose terminal has drawn nothing, reads a quiet open call as **Needs you** (asking you to allow it).

## Blind spots

- A permission prompt in a session Slate neither hosts nor can ask reads as **Working** for Claude Code and as idle for other tools.
- "Waiting for permission" and "answered, waiting for your next prompt" both show as **Needs you**.
- A tool whose title does not move and whose transcript Slate cannot read this way is judged on timing alone, so a turn's end can take up to the window plus a tick to show.

## How it stays current

The server pushes changes (`GET /sessions/live/stream`; `GET /sessions/live` is the one-shot); an idle machine sends nothing. A watch re-reads only the changed transcript (150 ms coalescing), plus `HEAD` of each live checkout and OpenCode's database. Timers run only while needed: 5 s time passing (flips a session to **Needs you**), 60 s full re-walk, 15 s process list. Your own acts (stop, closed terminal, hand-back) refresh at once (`POST /sessions/live/refresh`). Branch counts refresh at most every 30 s while sessions report, and on window focus (how an outside commit shows up).
