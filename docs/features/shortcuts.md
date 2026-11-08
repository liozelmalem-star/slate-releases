# Keyboard shortcuts

This guide lists every keyboard shortcut Slate has. Press **?** anywhere for the shortcuts of the current context, or open **Settings → Keyboard** to change one.

Keys are written for a Mac. On Windows and Linux, ⌘ is Ctrl. Shortcuts with ⌘ or ⌃ work while you type. A shortcut on a bare key, or on ⌥ alone, waits until you stop typing, because ⌥ plus a key types a character.

## Rebind a shortcut

**Settings → Keyboard** lists every command in the palette. Click a command's key to record a new one. A key another command held moves over, and a note ("⌘X moved from A to B.") offers **Undo**. Unbind takes a key away; Reset restores the default. One key per command, no multi-key sequences. The palette, the cheatsheet and tooltips read the same list, so they follow a key you rebind. The shortcuts in the tables below marked "fixed" are not in that list.

## Anywhere

These are the commands in Settings → Keyboard, grouped as the cheatsheet groups them.

### Navigate

| Keys | Command |
| --- | --- |
| ⌘K | **Command palette** |
| ⌘P | **Go to file or doc** |
| ⌘⇧F | **Search docs and files** |
| ⌘⇧K | **Go to Home** |
| ⌘⇧O | **Operations** |
| ⌘J | **Ask AI** |
| ⌘⇧J | The session that has waited on you longest; again for the next. After the sessions come tasks waiting on you, then back to the first session |
| ⌘[ and ⌘] | **Back** and **Forward** |
| ⌘\` and ⌘⇧\` | **Switch to next workspace** and **Switch to previous workspace** |
| ⌃⇥ and ⌃⇧⇥ | **Next tab** and **Previous tab**, by recency while ⌃ is held: once is the tab you were just on, twice the one before |
| ⌘1 to ⌘9 | **Go to tab 1‥9**; with fewer than n tabs open, the last one |
| ⌘W | **Close tab**. A pinned tab refuses: unpin it first. Every close spares pinned tabs |
| ⌘⇧T | **Reopen closed tab** |
| ⌥⌘← and ⌥⌘→ | **Move tab left** and **Move tab right** |
| ⌘⇧D | **Open tab beside**, such as a session beside its plan doc (⌘-click does the same; also on a doc in the tree, Favorites and Recents, a link in a doc, and **Open beside** in a doc's right-click menu) |
| ⇧⌘\\ | **Close split view** |

### Create

| Keys | Command |
| --- | --- |
| ⌘N | **New doc** |
| ⌘⇧G | **Generate a doc** |
| ⌘⇧N | **Quick capture** |
| ⌃\` | **Open a terminal here** |

### Doc, view and help

| Keys | Command |
| --- | --- |
| ⌘F | **Find in doc** |
| ⌘\\ | **Toggle sidebar** |
| ⌘⇧M | **Focus mode** (the same keys leave it) |
| ⌘⇧L | **Toggle light / dark theme** ([Themes](https://liozelmalem-star.github.io/slate-releases/docs/features/theming.md#light-and-dark-with-l)) |
| ⌘+ and ⌘− | **Increase app size** and **Decrease app size**, 80% to 140% in ten-percent steps ([Themes](https://liozelmalem-star.github.io/slate-releases/docs/features/theming.md#size)) |
| ? | **Keyboard shortcuts** |

## Tabs and the mouse

These gestures are fixed. See [Tabs](https://liozelmalem-star.github.io/slate-releases/docs/features/search.md#tabs) for the rules.

| Gesture | What it does |
| --- | --- |
| ⌘-click a tab, a doc or a link | Open it beside the current tab |
| Double-click a tab | Keep a temporary tab open |
| Middle-click a tab | Close it |
| Drag a tab | Reorder it; pinned tabs stay at the front |
| Right-click a tab | Keep open, pin, open beside, close, close others, close to the right, close all |
| Drag the line between two columns | Widen one column; double-click equalises all |
| Arrow keys on that line | Resize it in steps of 16 px; Shift makes the step 64 px |

## Command palette and lists

| Keys | What it does |
| --- | --- |
| ↑ and ↓ | Move through results |
| Enter | Open the selected row |
| Escape | Close the palette or cheatsheet |
| ⌘Enter | Add a line comment in a file or review, or commit from the Changes message box |
| ⌫ or Backspace | Move the selected docs in the Projects tree to Trash |

## Sessions

| Keys | What it does |
| --- | --- |
| ⌘⇧J | Go to the session that has waited longest ([Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md#what-you-see)) |
| ⌥⌘B | Show or hide the side panel (Details, Changes, Turns) |
| ⌥⌘I | Open the side panel on Details |
| ⌘K → **Focus the sessions list** | Move focus to the first row; listed only while a row is on screen |
| ⌃\` | Open a plain shell |
| ⌘⇧M | Focus mode |
| ⌘-click a row | **Open beside** |
| ⇧⌘\\ | **Unsplit** the columns |

On a focused row of the rail ([The keyboard](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md#the-keyboard)), with focus inside the rail and no text field active:

| Key | What it does |
| --- | --- |
| Tab, then Enter | Reach the rows and open one |
| ↑ / ↓ or **k** / **j** | Move between rows |
| Home and End | Jump to the first and last row |
| **f** | Start a second agent in the row's folder |
| **s** | Stop the session; press again within four seconds |
| Escape | Hand focus back to the terminal |

## Terminal

Over a focused terminal, every ⌘ chord belongs to the app except these. On Windows and Linux the app's chord is Ctrl+Shift, and plain Ctrl keys go to the CLI. See [The terminal](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/terminal.md#what-the-terminal-does).

| Keys | What it does |
| --- | --- |
| ⌘F | Search the session, scrollback included |
| ⌘C | Copy the selection; without one, the app's own meaning |
| ⌘V | Paste |
| ⌘+ / ⌘− / ⌘0 | Zoom the terminal font in, out, and reset it (remembered) |
| ⌥⌘K | Clear |
| Shift+Enter | New line in the prompt, without sending |
| ⌥← / ⌥→ / ⌥⌫ | Jump a word left, right; remove a word |
| Ctrl-C | Interrupt, sent to the CLI |

## Files and the editor

In a file ([Reading a file](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md#reading-a-file)):

| Keys | What it does |
| --- | --- |
| ⌘S | Save |
| ⌘F | Search the file |
| ⌥H | Open the file's history |
| [ and ] | Step through changes (not while typing) |
| ⌥1 and ⌥2 | Switch between Preview and Read, on a Markdown or SVG file (the code holds up to four forms; today only these two exist) |
| Escape | Leave Diff or a past commit |

The editor uses VS Code's keys ([Editing](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md#editing)):

| Keys | What it does |
| --- | --- |
| ⌘Z / ⌘⇧Z | Undo and redo (Ctrl+Z and Ctrl+Y on Windows and Linux) |
| ⌥-click | Add a cursor |
| ⌘D | Select the next match |
| ⌘⇧L | Select every match |
| ⌥⇧-drag | Column selection |
| ⌘F | Find and replace |
| Ctrl+G | Go to line |
| ⌘/ | Comment |
| ⌥↑ / ⌥↓ | Move a line |
| ⇧⌥↑ / ⇧⌥↓ | Copy a line |
| ⇧⌘K | Remove a line |
| Enter or Tab | Take an offered word |

## Home

Arrow keys turn the deck of cards on Home; left and right step back and forward.
