# Lessons: memory on the tool call it is about

A **lesson** says what to do in a situation ("before a push, run the full gate, because the hook is the only CI"). Give it a `when` and it is added to the matching tool call:

```
remember({
  text: "Before a push, run the full gate, because the hook is the only CI",
  when: { tool: "shell", match: "git push" }
})
```

| `when` | Fires on |
| ------ | -------- |
| `{ tool: "shell", match: "<regular expression>" }` | A command that matches. |
| `{ tool: "read", path: "<glob>" }` | Reading a matching file, such as `packages/db/**`. |
| `{ tool: "edit", path: "<glob>" }` | Editing or writing a matching file. |

A `when` makes the memory a lesson. A pattern matching every command or file is refused.

A `match` runs on every shell call, so Slate also refuses a pattern that can run for minutes on one command: a repeated group that holds its own repeat, like `(a+)+`, or holds alternatives, like `(\w|\d)+`. A glob holds at most one `**`. It reads `*`, `**`, `?`, `[a-z]` (one character from a set, or the text itself, so a route folder like `[slug]` matches) and `{ts,tsx}` (at most **32** choices), and ignores case. A glob with an unclosed `{` or `[`, more choices, or a backslash is refused, so a saved lesson can always fire. Only the first **512** characters of a command are tested; a path is tested whole.

On a matching command or file, the lesson is added to what the agent sees for that call. So is a lesson or decision whose `source_ref` cites the file. At most **2** memories per call, each once per session. The call is never blocked or changed.

| Tool | Arrives |
| ---- | ------- |
| Claude Code | Before a shell, read or edit call. |
| Codex | Before a shell or patch call, once you trust the hook (Codex skips a new or changed hook until you approve it under `/hooks`). |
| Gemini CLI, Cursor | After a shell, read or edit call, in the tool's result. |
| OpenCode | After a shell, read, edit or patch call, in the tool's result. |

The hook runs on every watched call, so it first checks a small trigger list kept beside the store and opens the store only when something could match.
