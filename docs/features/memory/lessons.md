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

On a matching command or file, the lesson is added to what the agent sees for that call. So is a lesson or decision whose `source_ref` cites the file. At most **2** memories per call, each once per session. The call is never blocked or changed.

| Tool | Arrives |
| ---- | ------- |
| Claude Code | Before a shell, read or edit call. |
| Codex | Before a shell or patch call, once you trust the hook (Codex skips a new or changed hook until you approve it under `/hooks`). |
| Gemini CLI, Cursor | After a shell, read or edit call, in the tool's result. |
| OpenCode | After a shell, read, edit or patch call, in the tool's result. |

The hook runs on every watched call, so it first checks a small trigger list kept beside the store and opens the store only when something could match.
