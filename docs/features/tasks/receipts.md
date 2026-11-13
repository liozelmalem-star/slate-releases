# Receipts

A receipt is what an AI session ran, checked against what it said. Slate writes one from the transcript when a turn ends, in any captured agent, with no model and nothing leaving this computer.

A session that only talked (no check, no changed file, no commit) gets none. The **Agent runs** count is flagged receipts not yet reviewed.

## What it shows

- **It said**: first paragraph of the last reply.
- **Checked against the transcript**: where said and ran disagree, with evidence; *What it said matches what it ran* otherwise.
- **What it ran**: every test, gate, lint, typecheck and build, in order, with passed and failed counts or exit code.
  A run fails when its summary counts a failure or an error (vitest's `Errors  1 error`, pytest's `2 errors`), or when the command exited with an error even though every test passed. A filter such as `| tail` owns the exit code, so then the counts decide.
- **What changed**: files edited.
- **Outcome**: commits its own `git commit` reported, and whether they are on the default branch or were reverted there within 30 days. Checked when you open agent runs, at most every 10 minutes per receipt.

## Flags

| Flag | Condition |
| --- | --- |
| Red **Flagged** | **A test failed, then passed on a re-run with no change in between.** |
| Red **Flagged** | **The last run failed, and nothing passed after it.** |
| Red **Flagged** | **It said the checks pass, but no test or gate run passed**: the last reply says tests, a gate or a build passed, and no such run did |
| Amber **Worth a look** | **A run ended without a result**: killed or stopped before saying how it went |
| Amber **Worth a look** | **It edited a file outside the project** (temporary and agents' own folders do not count) |
| Amber **Worth a look** | **A test's expected value was changed**: an edit to a test file changed what an assertion expects |

Checks are read from `package.json` scripts, `make` and `just` targets, and the pre-push hook (always a gate). A script running a file in a `gate`, `ci`, `check` or `verify` folder is a gate whatever its name. Cursor records commands but not their output: **not recorded**.

## Actions

- **Mark reviewed**: clears it from the count; new runs, edits or commits in that session ask again.
- **Open session**: opens its tab.
- **Copy as Markdown**: whole receipt, for a pull request.
- **Share as artifact**: publishes the same text as an [artifact](https://liozelmalem-star.github.io/slate-releases/docs/features/artifacts.md).

Both come from the stored receipt. Widgets can read receipts, and a Home widget can show the last day's ([Widget API](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets-api.md)).

## What is stored

Per session that ran a check, changed a file or made a commit, one receipt in the workspace holding the project's folder: session id and tool, title and branch, first paragraph of the last reply, each run's command and result, edited paths, flags, commit ids and subjects, and when you marked it reviewed. Never a run's output beyond counts, nor edit text. Local, never shared.
