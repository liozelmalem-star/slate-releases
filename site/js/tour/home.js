// Home: the deck of what needs you, the composer, the AI tool's chat, ⌘K and ⌘J.
// Screens: home-*.
const ASK = "Why is the cart total off by one cent?";

export const home = {
  id: "home",
  title: "Home",
  place: "Home",
  icon: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  steps: [
    {
      screen: "home",
      spot: { text: "things need you", up: 1 },
      title: "Home is what needs you, right now",
      body:
        "<p>Home counts what is waiting on you and shows it one card at a time. Below sits the box you start everything from.</p>" +
        "<p>Sessions that are working and need nothing show as small pills above the box. Click one to open it. When nothing waits, the headline says <strong>All clear.</strong></p>",
    },
    {
      screen: "home",
      spot: { text: "Should the dashboard group", up: 1 },
      title: "Answer the top card",
      body:
        "<p>A session that stopped to ask you something comes first. The card shows who asks, where it runs, how long it has waited, and its question.</p>" +
        "<p><strong>Open session</strong> takes you to it. <strong>Later</strong> sets the card aside until you restart Slate, and the next one comes up.</p>",
      try: "Click <strong>Later</strong>.",
      click: { text: "Later", exact: true },
    },
    {
      screen: "home-later",
      spot: { text: "Standup's rules held a call", up: 2 },
      title: "An agent asks first",
      body:
        "<p>The count went down by one and the next card came up. This one is from an agent: its rules held a call it wanted to make, here posting the standup to #acme-dev.</p>" +
        "<p><strong>Yes, do it</strong> runs exactly that call. <strong>No</strong> drops it, and <strong>Open the thread</strong> shows the agent's run.</p>",
    },
    {
      screen: "home",
      spot: { css: "textarea" },
      title: "Ask, find, or make anything",
      body:
        "<p>The box at the bottom talks to your AI tool, with your Slate memory and pages to work from. Ask a question, find something, or have it make a page or a change.</p>" +
        "<p><kbd>Enter</kbd> sends. Drop a file on the box to attach it.</p>",
      type: [{ css: "textarea" }, ASK],
    },
    {
      screen: "home-scope",
      spot: { text: "acme-web", exact: true },
      title: "Scope: what the AI thinks with",
      body:
        "<p><strong>Scope</strong> picks one project, or <strong>All projects</strong> in this workspace. The AI tool works in that project's folder and searches its memory first.</p>" +
        "<p>The scope is not saved, so last week's pick never hides an answer.</p>",
    },
    {
      screen: "home-typed",
      spot: { text: "Ask first", exact: true },
      title: "Which tool answers, and how freely",
      body:
        "<p>Beside the scope, the composer names the AI tool that will answer, here <strong>Claude Code</strong>. When the project has more than one tool, you can pick another for this message.</p>" +
        "<p>The pill decides how much it may do without asking. <strong>Ask first</strong> reads freely and asks before it edits a file or runs a command.</p>",
      try: "Click <strong>Ask first</strong>.",
      click: true,
    },
    {
      screen: "home-mode-edit",
      spot: { text: "Auto-edit", exact: true },
      title: "Auto-edit",
      body:
        "<p><strong>Auto-edit</strong> applies file edits inside the scoped project without asking. It still asks before a shell command.</p>" +
        "<p>The change applies to the conversation you are already having.</p>",
      try: "Click <strong>Auto-edit</strong>.",
      click: true,
    },
    {
      screen: "home-mode-armed",
      spot: { text: "Full auto? Click again", exact: true },
      title: "Full auto takes two clicks",
      body:
        "<p><strong>Full auto</strong> runs file edits and shell commands without asking, so stepping into it needs a second click within a few seconds.</p>" +
        "<p>One more click goes back to <strong>Ask first</strong>, and so does <strong>New chat</strong>. The same pill sits in the <kbd>⌘J</kbd> panel.</p>",
    },
    {
      screen: "home-slash",
      spot: { text: "/checkout-qa", up: 2 },
      title: "/ for skills",
      body:
        "<p>Type <kbd>/</kbd> at the start of the box to list the skills the AI tool loads in the scoped project, then the tool's own commands.</p>" +
        "<p>Pick one and it waits as a chip in front of your words. On send, the tool reads that skill and follows it.</p>",
    },
    {
      screen: "home-mention",
      spot: { text: "Checkout redesign", exact: true },
      title: "@ to mention anything",
      body:
        "<p>Type <kbd>@</kbd> anywhere to name a page, session, memory, task, agent or report. The menu groups matches by kind, most recent first.</p>" +
        "<p>Each pick becomes a chip, and its content is sent ahead of your message, so the AI tool reads exactly what you pointed at.</p>",
    },
    {
      screen: "home-palette-q",
      spot: { css: "input[placeholder]" },
      title: "⌘K searches everything",
      body:
        "<p><kbd>⌘K</kbd>, or the <strong>Search</strong> bar at the top, opens one search over sessions, pages, memories and tasks. A live session shows its status dot.</p>" +
        "<p>Arrow to a result and press <kbd>Enter</kbd> to open it. It works from every place in Slate.</p>",
    },
    {
      screen: "home-askai",
      spot: { text: "Ask AI", exact: true, up: 2 },
      title: "⌘J asks about the page you are on",
      body:
        "<p>On any page, <kbd>⌘J</kbd> opens the <strong>Ask AI</strong> panel beside it, with that page as its context. Ask about it, or tell the AI what to change.</p>" +
        "<p>It opens only on a page. Anywhere else, <kbd>⌘J</kbd> says to open a page first.</p>",
    },
    {
      screen: "home-chat",
      spot: { text: "slate: recall", up: 1 },
      title: "Watch it work",
      body:
        "<p>A question opens a chat over Home. Each step the AI tool takes shows as it runs: here it recalled your Oct 8 decision from Slate's memory, then read the file. Click a step to see its result.</p>" +
        "<p><strong>Home</strong>, top left, brings Home back and keeps the chat. <strong>New chat</strong> starts over.</p>",
    },
    {
      screen: "home-chat",
      spot: { text: "Approve", up: 3 },
      title: "Try it: ask, then approve the fix",
      body:
        "<p>In <strong>Ask first</strong>, an edit or a command waits on a card that shows exactly what will change. <strong>Approve</strong> runs that one call. <strong>Skip</strong> refuses it and tells the AI tool why.</p>" +
        "<p>Set the scope to a project, ask why something is broken, read what it found, and approve the fix.</p>",
      try: `Pick a project in <strong>Scope</strong> and ask: <em>${ASK}</em>`,
    },
  ],
};
