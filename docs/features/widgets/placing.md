# Place and size a widget

You place a [widget](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) on its **Preview** in Widgets. The tab itself has no menu and nothing that moves a widget. Each change saves at once.

The Preview is the real tab, laid out at the width it has in your window now, then drawn small enough to show all of it. Nothing of the tab can be clicked there. Your widget shows live, outlined in blue. A line above says "Point at the widget to size or move it".

## Where it can go

A widget sits in a gap between the tab's own parts, never on one. On Home the parts are the greeting, the resume notice, what needs you, **Back to chat** and the box. On Activity they are the cards of the side column. Each gap is rows of 12 columns, and a widget takes a run of them anywhere in a row. Widgets in one row never overlap.

A new widget sits in a row of its own: under the box on Home, half the column wide; at the top of Activity's side column, the whole column wide.

## Move it

- **Drag it.** While you drag, every row shows its columns faintly, and a blue outline shows where it would land. Let go to put it there. **Esc** cancels.
- **Move here.** A dashed band sits in every gap it can move to. Click one to move it there.

## Size it

- **Width**: drag the right edge. It snaps 2 columns at a time.
- **Height**: drag the bottom edge. Until you set a height, the card is as tall as what the widget draws.
- **Both**: drag the corner. A label shows the new size, such as "8 cols × 200 px". **Esc** keeps the old size.

## The bar

Point at the widget, or focus it, and a small bar shows on it:

| Control | What it does |
| --- | --- |
| **⅓**, **½**, **Full** | Sets the width |
| The size ("6 cols × 144 px") | Its button lets the height follow the widget again ("6 cols × auto") |
| **To the left**, **To the middle**, **To the right** | Moves it within its row |
| **Move to the spot above** / **below** | Moves it to the next gap |

## Keyboard

Press Tab to focus the widget. ← and → move it one column; ↑ and ↓ move it to the gap above or below. With Shift, ← and → make it 2 columns narrower or wider, and ↑ and ↓ make it 8 px shorter or taller.

## Size limits

| Limit | Value |
| --- | --- |
| Narrowest | 160 px: a third of Home's column, half of Activity's side column |
| Widest | The whole row |
| Height | 96 to 480 px |
| Narrow column | Under 352 px, every widget takes the whole width, one under the other |

A new size is checked before it shows. Slate runs the widget once, unseen, at that size. Until it fits, the tab keeps the last size that fitted. If it does not fit, its Preview says "Doesn't fit at this size." with **Fix with AI**.
