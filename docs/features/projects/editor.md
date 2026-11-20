# Write a doc

A doc is a piece of writing you and your agents keep: a plan, a design, a review, a bug or a
note. The editor is kept quiet. It offers the few blocks docs are written with, and the
keyboard does the rest. It has no AI of its own: ask your agent in a session to write or
change a doc.

## An open doc

An open doc shows its title once, then its body. Under the title is one line: what the doc
links to (a branch, a pull request, a ticket), the line its type keeps
([Doc types](https://liozelmalem-star.github.io/slate-releases/docs/features/projects/typed-docs.md#the-line-under-the-title)), and **Shared · <workspace>** in a
shared workspace.

An empty doc shows **Write here, or ask your agent to fill it.** That line is never stored.

## Blocks

Type **/** for the menu of 14 blocks: Text, Heading 1–3, Bullet, Numbered and Check list,
Quote, Code, Table, Image, **Callout**, **Check item** and **Link to doc**.

- **Selected text** gets four controls: Bold, Italic, Code and Link.
- **Tab** and **Shift-Tab** nest and unnest a block.
- **⌘⇧↑** and **⌘⇧↓** move a block. Select one and press Backspace to remove it.
- Markdown shortcuts work: `#`, `-`, `[]` and ```` ``` ```` turn a line into its block.
- Pasted Markdown becomes real blocks.
- **@**, or **Link to doc** in the **/** menu, links another doc. Type to filter; recent docs
  come first.
- A **Callout** is a plain note. Only the ⚠️ emoji draws it in the warning colour. Click
  the emoji to change it.

A doc that already holds an older block (a heading 4–6, a toggle, a divider, a video,
audio or file block) still opens and draws it. The menu no longer offers them.

## Check items

A **check item** is one line of a review or a test that carries a result: open (grey
circle), pass (green tick), fail (red cross) or blocked (amber sign). Click the mark to
step to the next result. Put a test's steps, expected result and evidence under the item
with **Tab**. In a doc you cannot edit, the mark only shows.

In Markdown a check item is a list line with its result in the box: `- [pass] Sign in`,
or `[fail]`, `[blocked]`, `[open]`. `- [ ]` and `- [x]` stay ordinary to-dos.

## Images

Paste or drop an image, or pick **Image** in the **/** menu. PNG, JPEG, GIF, WebP, AVIF
and BMP are kept, up to 8 MB. Any other file is refused with the reason. Slate saves each
image once, in the workspace's own folder on this computer; the same image placed twice
is one file. In a shared workspace, images travel with the docs that use them
([Working in a shared workspace](https://liozelmalem-star.github.io/slate-releases/docs/features/workspaces/sharing.md#images)).

## Figma links

A line that holds only a link to a Figma file draws as a card: Figma's mark, the file's
name and **Open in Figma**, which opens your browser. When the next block is an image,
such as a snapshot exported from Figma, it draws inside the card. Slate never calls
Figma, so the card works offline.

## Diagrams

A code block in the `mermaid` language draws as a diagram: a flowchart, a sequence, a
state chart and the other kinds [Mermaid](https://mermaid.js.org) knows. Type
```` ```mermaid ```` and a space to start one. The code button at its top right shows the
source to edit, and the drawing follows once you stop typing. A source Mermaid cannot read
stays as text under one line: **This diagram did not draw. Its source is below.**

## Right-to-left text

A doc in Hebrew, Arabic or another right-to-left script lays out right to left. The
direction is read from the text; there is nothing to set.

## Saving

Typing saves within half a second.

- **Not saved** replaces **Edited …** in the header when a save does not reach Slate.
  Slate tries again on your next edit, every 5 seconds, and at once when Slate answers
  again. Unsaved edits live only in the open window, so they do not survive quitting.
- **Slate isn't responding** shows in a red strip while Slate's server is down. After a
  minute it reads **Still trying. Restart Slate if this stays.**
- **Changed elsewhere.** When an agent writes to the doc you are typing in, your text is
  kept and a notice offers **Copy my text**, **Keep my version** (asks once, then
  overwrites the newer copy) and **Reload doc**. A retry never overwrites a newer copy.

When an agent changes a doc you are only reading, the screen updates within seconds.
