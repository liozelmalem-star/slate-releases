# Home

**Home** is where Slate opens. It shows what needs you, one card at a time, so you answer the most urgent thing first. Under the cards is a box where you ask your own agent to find or do anything in the workspace ([Ask from Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home/ask.md)).

## The cards

The headline counts the cards: *Three things need you.* When finished sessions are among them, the line under it splits the count: *Two to answer, one finished — look when you can.* Cards are ordered by kind, the ones that block you first. An amber dot means the card blocks on you now; grey means it can wait.

| Card | What it is | Buttons |
| --- | --- | --- |
| **Needs permission** | An agent waits for your yes on a tool call. The card shows the command | **Open to allow**, **Later** |
| **Asks you** | A session's last turn ends on a question | A reply box with **Send** and **Open**, and **Later**. For a session in a terminal Slate does not own: **Open session** and **Later**, and you answer there |
| **Automation asks** | An automation's rules held a call ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md)) | **Yes, do it**, **No** with an optional reason, **Open the thread**, **Later** |
| **Review asked** or **Task** | A task in Tasks needs you | **Open in Tasks**, **Open in** its app (such as GitHub), **Later** |
| **Reminder** | A reminder you set on a task is due | **Open in Tasks**, **Done**, **Later** |
| **Finished** | A session's turn ended with a report; nothing blocks | **Open session**, **Mark seen**, **Later** |

The card's title is the question the reply ends on, or its first sentence. A card that waits on you says how long: *waiting 2 min*, *waiting 3 hours*. A worker's card says **Worker of** the session that started it.

- **Send** answers the session and removes the card; you stay on Home. For an agent Slate cannot send to, the answer is typed but not sent: *Typed — press Enter in the session to send it.*
- **Later** sets a card aside until you restart Slate. A session set aside comes back when it says something new. **Mark seen** does the same for a finished session.
- Move between cards with the arrows, the dots, **←** and **→**, or a sideways swipe. The line under the dots says where you are: *4 of 7 · Automation asks*.

With nothing waiting, the headline says **All clear.**, the line under it says what is still running, and the box moves to the middle. If you set cards aside, **Bring them back** returns them.

If Home could not read everything that waits, it says so under the headline, with **Try again**, and never says **All clear.**

Sessions that are working and need nothing are not on Home: see [Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md).

## Widgets on Home

Your [widgets](https://liozelmalem-star.github.io/slate-releases/docs/features/widgets.md) for Home sit between Home's parts, each at the size chosen for it in Widgets. They read what Home shows: today's sessions in every project of the workspace. To add or move one, open it in Widgets.

## Set up Slate

**In a workspace with no agent**, Home reads *\<workspace> is ready for an agent.* One card shows the 16 agents and what connecting one unlocks, with **Open Connect**. Beside it, what works now without AI: Tasks, Projects and Artifacts.

**Once an agent is set**, Home starts with a **Set up Slate** card of three steps:

| Step | Button | Done when |
| --- | --- | --- |
| **Connect an agent** | **Connect an agent** | This workspace has an agent |
| **Start a session** | **New session** | A session has been recorded |
| **See your first memory** | **Open Memory** | A memory is saved |

A step done elsewhere ticks itself. The header counts progress (*1 of 3 done*). The card goes when all three are done, or on **Skip setup**, and does not come back in that workspace.

## More about Home

- [Ask from Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home/ask.md): the box, a past session, files, skills and mentions.
- [Approvals, Stop and agent differences](https://liozelmalem-star.github.io/slate-releases/docs/features/home/approvals.md): how Home's agent asks before it acts.
