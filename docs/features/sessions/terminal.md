# The terminal and Conversation

A session Slate runs lives in a real terminal, so the agent's CLI looks and behaves as it does in Terminal.app. **Conversation** reads the same session back as messages and steps, for when you want to read rather than watch.

## The terminal

The agent runs with its full screen: colours, spinners, menus. Slate supplies the folder, account and context and stays out of the conversation. Claude Code sessions start as background jobs, so they keep running after you quit Slate and any terminal can attach to them. Leaving the tab or reloading the window never ends a session; coming back replays what it printed.

Above the terminal, one line shows where the session stands, such as **Working · Check**, and its plan progress. Click it to open Details in the [side panel](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/side-panel.md). Beside it are **On my phone** ([Cloud sessions and phone](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/cloud.md#on-my-phone)) and the **Terminal | Conversation** switch. Every session opens on **Terminal**; picking Conversation holds for that session only.

**Focus mode**, **⌘⇧M**, hides the top bar, the list and the panels, leaving only the session. The same keys bring them back.

### What the terminal does

| Feature | Behaviour |
| --- | --- |
| Keys | ⌘F finds in the scrollback. ⌘C copies, ⌘V pastes, ⌘+ ⌘− ⌘0 zoom (remembered). Shift+Enter adds a line. Option is Meta: ⌥← and ⌥→ jump a word. App keys such as ⌘K, ⌘P and ⌘W reach Slate. All keys: [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md#terminal) |
| Ctrl+C | In an agent's session it asks first, as closing the tab does ([Close a session's tab](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/tabs.md#close-a-sessions-tab)). In a Terminal it interrupts at once |
| Mouse | Selecting copies; the middle button pastes. Right-click: **Copy**, **Paste**, **Select all**, **Clear** (⌥⌘K), **Remember on** the session's doc |
| A selection | A bar offers **Copy** or **Remember**, which saves the selection as a memory under the session's doc |
| Scrolling up | Output keeps arriving; **Newest output** takes you back down |
| Links | A local address (`http://localhost:5173`) opens in a tab beside the session; other web links open in your browser. A printed path such as `src/x.ts:42` opens that file at that line. A `slate://` link opens that doc beside the session |
| Pictures | A picture the CLI draws (sixel, or the `imgcat` protocol) shows in place, up to 32 MB per terminal; past that the oldest become placeholders |
| Scrollback | 5,000 lines. A terminal you cannot see keeps 1,000, and its full scrollback returns when you look again |

## Conversation

**Conversation** shows the session in order: each prompt, what the agent said, and every tool step on one line with its target (a file, a command, a search).

- Click a step for its output. An edit opens on the lines it changed. A failed step says *failed*.
- The agent's plan sits on top, with done items ticked.
- The last 60 turns show. A step's output over 4,000 characters keeps its first and last 2,000.
- A picture a tool returned, such as a screenshot, shows under its step; click it for full size. A turn keeps about 4.4 MB of pictures; past that the step says how many were not kept.
- An image the agent saved and named in its reply shows from disk, up to 8 MB. An image on the web shows as a card you click to open.
- A ```` ```mermaid ```` block is drawn as a diagram. Links open as in the terminal.

Type at the foot to message the session. **Enter** sends it to the terminal's prompt; **Shift+Enter** adds a line. **/** lists the skills the agent loads in this folder and **@** names a doc, session, memory, task, automation or report, as on [Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home/ask.md#skills-and-mentions). A file dropped on the box is attached the same way.

Menus and permission questions the agent draws itself show only in **Terminal**. When the session waits on one, a bar above the box says so; **Open Terminal** switches.

Claude Code, Codex, Gemini and OpenCode record each step with its output. Cursor records the steps only, and the view says so.
