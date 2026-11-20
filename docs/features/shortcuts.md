# Keyboard shortcuts

Every keyboard shortcut in Slate, grouped by where it works. Press **?** for a sheet of the shortcuts you can use, or open **Settings → Keyboard** to change one.

Shortcuts with ⌘ or ⌃ work while you type. A shortcut on a bare key, or on ⌥ alone, waits until you are not typing in a text field.

## Change a shortcut

**Settings → Keyboard** lists every command that has a shortcut. Click a command's key, then press the new one; Escape cancels. If another command held that key, it moves to this one and Slate says which command lost it, with **Undo**. **Unbind** removes a key, **Reset** restores one, and **Reset all** restores every key. A command has one key; there are no multi-key sequences. The palette, the **?** sheet and tooltips follow your changes at once.

The keys in the later sections (tabs and mouse, lists, the Sessions list, terminal, files) are fixed.

## Anywhere

### Navigate

| Keys | Command |
| --- | --- |
| ⌘K | **Command palette** |
| ⌘P | **Go to file or doc** |
| ⌘⇧F | **Search docs and files** |
| ⌘⇧K | **Go to Home** |
| ⌘J | **Ask AI** |
| ⌘⇧O | **Steps Ask AI ran** |
| ⌘⇧J | The session that has waited on you longest; press again for the next |
| ⌘[ and ⌘] | **Back** and **Forward** ([Back and Forward](https://liozelmalem-star.github.io/slate-releases/docs/features/search.md#back-and-forward)) |
| ⌘\` and ⌘⇧\` | **Switch to next workspace** and **Switch to previous workspace** |
| ⌃⇥ and ⌃⇧⇥ | **Next tab** and **Previous tab**, by how recently you used them |
| ⌘1 to ⌘9 | **Go to tab 1‥9**; with fewer tabs open, the last one |
| ⌘W | **Close tab**. A pinned tab stays open until you unpin it |
| ⌘⇧T | **Reopen closed tab** |
| ⌥⌘← and ⌥⌘→ | **Move tab left** and **Move tab right** |
| ⌘⇧D | **Open tab beside** the current one |
| ⇧⌘\\ | **Close split view** |

### Create

| Keys | Command |
| --- | --- |
| ⌘N | **New note** |
| ⌘⇧G | **Generate a doc** |
| ⌘⇧N | **Quick capture** |
| ⌃\` | **Open a Terminal here** |

### Doc, view and help

| Keys | Command |
| --- | --- |
| ⌘F | **Find in doc** |
| ⌘B | **Toggle sidebar** (in a doc's text, ⌘B makes bold) |
| ⌘⇧M | **Focus mode**; the same keys leave it |
| ⌘⇧L | **Toggle light / dark theme** |
| ⌘+ and ⌘− | **Increase app size** and **Decrease app size** ([Themes](https://liozelmalem-star.github.io/slate-releases/docs/features/theming.md#make-slate-bigger-or-smaller)) |
| ? | **Keyboard shortcuts** |

### In a session or a file

These are in Settings → Keyboard, and work while their panel is on screen.

| Keys | Command |
| --- | --- |
| ⌥⌘B | **Toggle session panel** |
| ⌥⌘I | **Show session details** |
| ⌥H | **Toggle file history** |
| ⌥1 and ⌥2 | **File view 1‥4**: switch a Markdown or SVG file between Preview and Read |

## Tabs and the mouse

| Gesture | What it does |
| --- | --- |
| ⌘-click a tab, a doc or a link | Open it beside the current tab |
| Double-click a tab | Keep a temporary tab open |
| Middle-click a tab | Close it |
| Drag a tab | Reorder it; pinned tabs stay at the front |
| Right-click a tab | Keep open, pin, open beside, close, close others, close to the right, close all |
| Drag the line between two columns | Resize them; double-click makes all columns equal |
| Arrow keys on that line | Resize by 16 px; with Shift, by 64 px |
| A mouse's back and forward buttons | **Back** and **Forward** |

## Lists and the palette

| Keys | What it does |
| --- | --- |
| ↑ and ↓ | Move through results |
| Enter | Open the selected row |
| Escape | Close the palette or the shortcut sheet |
| ⌘Enter | Add a line comment in a file or review, or commit from the Changes message box |
| ⌫ | Move the selected docs in the Projects tree to Trash |

## Sessions

The **Session list** keys work while focus is in the list of sessions and no text field is active.

| Key | What it does |
| --- | --- |
| ↑ / ↓ or **k** / **j** | Move between rows |
| Home and End | Jump to the first and last row |
| **f** | Start a second agent in the row's folder |
| **s** | Stop the session; press again within 4 seconds to confirm |
| Escape | Give focus back to the terminal |

## Terminal

Over a focused terminal, every ⌘ shortcut belongs to Slate except these. See [The terminal](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/terminal.md).

| Keys | What it does |
| --- | --- |
| ⌘F | Search the session, scrollback included |
| ⌘C | Copy the selection; with nothing selected, Slate's own ⌘C |
| ⌘V | Paste |
| ⌘+ / ⌘− / ⌘0 | Make the terminal font bigger, smaller, or reset it |
| ⌥⌘K | Clear |
| Shift+Enter | New line in the prompt, without sending |
| ⌥← / ⌥→ / ⌥⌫ | Jump a word left or right; remove a word |
| Ctrl-C | In an agent's session: asks whether to end it. In a Terminal: sent to the program |

## Files and the editor

| Keys | What it does |
| --- | --- |
| ⌘S | Save |
| ⌘F | Find and replace |
| [ and ] | Step through changes (not while typing) |
| Escape | Leave Diff or a past commit |
| ⌘Z / ⌘⇧Z | Undo and redo |
| ⌥-click | Add a cursor |
| ⌥⇧-drag | Select a column |
| ⌘D | Select the next match |
| ⌘⇧L | Select every match |
| Ctrl+G | Go to line |
| ⌘/ | Comment |
| ⌥↑ / ⌥↓ | Move a line |
| ⇧⌥↑ / ⇧⌥↓ | Copy a line |
| ⇧⌘K | Remove a line |
| Enter or Tab | Take an offered word |

See [Files, memories and editing](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md).

## Home and Ask AI

In the box on Home and in the ⌘J panel, **⇧⇥** moves the mode one step: **Ask first**, **Auto-edit**, **Full auto**, then **Ask first** again. On Home, the arrow keys turn the deck of cards.
