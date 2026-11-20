// Tasks: everything waiting on you, from your own to-dos to the issues, reviews and messages
// your tools report, and the AI runs that carry a task through to a pull request.
export const tasks = {
  id: "tasks",
  title: "Tasks",
  place: "Tasks",
  icon: '<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>',
  links: [
    { match: { text: "To-dos", exact: true, within: "aside" }, step: 3 },
  ],
  steps: [
    {
      screen: "tasks",
      spot: { css: "main" },
      title: "Everything you owe, in one place",
      body: "<p><strong>Tasks</strong> collects what is waiting on you: issues assigned to you, pull requests someone asked you to review, messages to answer, and the to-dos you write yourself.</p>",
    },
    {
      screen: "tasks",
      spot: { text: "You wrote", up: 1 },
      spotOpts: { pad: 4 },
      title: "The Overview: your day as a picture",
      body: "<p>Read it left to right: where things come from, the section each one feeds, <strong>Slate</strong> in the centre, and the agents working for you. <strong>You wrote</strong> is the source of your own to-dos.</p><p>Under <strong>Slate</strong> is how many things need you. Click any logo, dot or name to open its list. <strong>Connect an integration</strong>, at the foot, adds Linear, Jira, Slack and others.</p>",
    },
    {
      screen: "tasks",
      spot: "aside",
      click: { text: "To-dos", exact: true, within: "aside" },
      title: "Five sections, named for what they hold",
      body: "<p><strong>To-dos</strong> is your own list. <strong>Issues</strong> holds work assigned to you, <strong>Reviews</strong> holds code waiting on you, and <strong>Messages</strong> holds chat and email. Each counts what waits in it.</p><p>GitHub is read through your own <kbd>gh</kbd> sign-in, once you connect it.</p>",
      try: "Click <strong>To-dos</strong>.",
    },
    {
      screen: "tasks-todos",
      spot: { text: "Overdue", up: 3 },
      title: "Grouped by when",
      body: "<p>To-dos are grouped by their time: <strong>Overdue</strong>, <strong>Today</strong>, <strong>Tomorrow</strong>, <strong>This week</strong>, <strong>Later</strong>, then the ones with <strong>No time</strong>. <strong>Done today</strong> stays at the bottom until tomorrow.</p><p>Tick the box to finish one, and tick it again to bring it back. No sync ever touches this list, and no tool can add to it.</p>",
      click: { css: 'button[aria-label="New to-do"]' },
      try: "Click <strong>+</strong> at the top of the side panel.",
    },
    {
      screen: "tasks-new-todo",
      spot: { text: "Add a to-do…", up: 1 },
      type: [{ css: "input[placeholder='Add a to-do…']" }, "Ask Sam for the 0.9 release notes"],
      click: { text: "Remind me", exact: true },
      title: "Type it, press Enter",
      body: "<p>Type the to-do and press <kbd>Enter</kbd>. The box stays open, so three things go in as three lines. <kbd>Esc</kbd> closes it.</p><p>Want it to find you later? Set a reminder before you press Enter.</p>",
      try: "Click <strong>Remind me</strong>.",
    },
    {
      screen: "tasks-new-todo-remind",
      spot: { text: "Pick a time…", up: 1 },
      title: "Reminders",
      body: "<p>Pick <strong>In an hour</strong>, <strong>This evening</strong>, <strong>Tomorrow morning</strong>, <strong>Next week</strong>, or <strong>Pick a time…</strong>. The menu only offers times that are still ahead.</p><p>When the time comes, Slate rings a notification. Slate has to be running to ring. Your agents can set one too: ask Claude Code to remind you after lunch and it lands here.</p>",
    },
    {
      screen: "tasks-bug",
      spot: { css: 'button[aria-label^="Run "]' },
      title: "Open a task, run it with AI",
      body: "<p>Click any row to open it beside the list. It says where it came from, and <strong>Slate remembers</strong> shows notes from your memory about it.</p><p>The big button says what would run: the flow (here <strong>Fix a bug</strong>) and the agent (<strong>Claude Code</strong>). Pressing it starts the run at once. Under <strong>…</strong> are <strong>Open in GitHub</strong>, <strong>Remind me…</strong> and <strong>Hide from Tasks</strong>, which takes it off this list only.</p>",
    },
    {
      screen: "tasks-bug",
      spot: { css: 'button[aria-label="Choose the automation and the agent"]' },
      click: true,
      title: "Pick the agent and the flow",
      body: "<p>The arrow beside it opens the two choices before anything runs.</p>",
      try: "Click the arrow.",
    },
    {
      screen: "tasks-bug-run",
      spot: { text: "Runs with", exact: true, clickable: false, up: 2 },
      title: "This run, and the flow behind it",
      body: "<p><strong>Runs with</strong> picks the agent for this run only. <strong>Automation</strong> lists the flows that take this item; a flow holds the steps, and <strong>Edit in Automations</strong> changes them for every run.</p><p>A run works on a branch and a folder of its own, and stops for you before anything is pushed, posted or sent.</p>",
    },
    {
      screen: "tasks-review",
      spot: { css: 'button[aria-label^="Run "]' },
      title: "Reviews and Messages work the same way",
      body: "<p>A pull request asked of you runs the project's own <strong>review-pr</strong> skill. The run drafts comments; you decide whether they are posted.</p><p>A message gets a drafted reply the same way.</p>",
    },
    {
      screen: "tasks",
      spot: { css: "main" },
      title: "Try this: a morning pass",
      body: "<p>Open Tasks and read the Overview. Answer what you can, and use the <strong>…</strong> menu: <strong>Remind me…</strong> on what has to wait, <strong>Hide from Tasks</strong> on what is not yours.</p><p>Pick one bug from <strong>Issues</strong> and press its run button. Come back when it stops for you.</p>",
    },
  ],
};
