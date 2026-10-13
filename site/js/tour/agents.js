// Agents: work that runs for you on a trigger, inside rules you set. Screens: agents,
// agents-new, agents-standup, agents-ask, agents-setup, agents-steps, agents-knows,
// agents-edit, agents-debrief.

const ASK_CARD = { css: 'section[aria-label="Ask first"]' };
const side = (name) => ({ text: name, exact: true, within: { css: "aside" } });

/** "Yes, do it": the card folds to its result, as AskCard draws a call that was made. */
function answered(root) {
  const card = root.querySelector('section[aria-label="Ask first"]');
  if (!card || card.dataset.tour) return;
  card.dataset.tour = "done";
  card.classList.remove("border-leaf-amber-500/40", "bg-leaf-amber-500/[0.06]");
  card.classList.add("border-slate-900/[0.08]", "dark:border-white/[0.07]");
  const buttons = card.querySelector("div.flex.flex-wrap");
  if (buttons) buttons.outerHTML = '<p class="text-xs text-slate-500 dark:text-slate-400">Done: Posted to #acme-dev.</p>';
  const used = [...root.querySelectorAll("p")].find((p) => p.textContent.startsWith("Used github"));
  if (used) used.textContent = "Used github, slack";
}

export const agents = {
  id: "agents",
  title: "Agents",
  place: "Agents",
  icon: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  links: [
    { match: side("Standup"), step: 5 },
    { match: side("Dev session debrief"), step: 12 },
  ],
  steps: [
    {
      screen: "agents",
      spot: { text: "Latest", up: 2 },
      title: "Work that runs without you",
      body: "<p>An <strong>agent</strong> does a job for you on a trigger: a standup at 7:00, a debrief when a coding session ends, a review every Friday. Everything it writes lands here.</p><p>The Overview shows the <strong>Latest</strong> report from each agent, then <strong>History</strong>: every report, grouped by agent. Find one by agent, word or date.</p>",
    },
    {
      screen: "agents",
      spot: { css: "aside nav, aside" },
      title: "Your agents, by what starts them",
      body: "<p>Below <strong>Overview</strong>, your agents are grouped by trigger: <strong>On a schedule</strong>, <strong>When a session ends</strong>, <strong>When a task arrives</strong> and <strong>By hand</strong>. A scheduled one shows its time, like <strong>Weekdays 7 AM</strong>.</p><p>Slate comes with six ceremonies (Standup, Shutdown, Planning, Weekly review, Retro, Monthly review), switched off until you turn them on.</p>",
    },
    {
      screen: "agents",
      spot: { text: "New agent", exact: true, within: { css: "aside" } },
      click: true,
      title: "Make a new agent",
      body: "<p><strong>New agent</strong> opens a gallery of templates. The sparkle button beside it, <strong>Generate an agent</strong>, goes straight to describing one.</p>",
      try: "Click <strong>New agent</strong>.",
    },
    {
      screen: "agents-new",
      spot: { text: "Describe it", exact: true, up: 2 },
      title: "Start from a template, or describe it",
      body: "<p><strong>Describe it</strong>: say what it should do, like <em>“Every Friday at 4 PM, draft a status update from my week”</em>, and the editor opens with a draft.</p><p>Or pick a template: <strong>Dev session debrief</strong>, <strong>Feature brief</strong>, <strong>PR review prep</strong>, <strong>Memory pass</strong>. Ones you already have say <strong>Set up</strong>. Nothing is saved until you save it.</p>",
    },
    {
      screen: "agents",
      spot: side("Standup"),
      click: true,
      title: "Open an agent",
      body: "<p><strong>Standup</strong> is switched on: every weekday at 7:00 it reads your recent sessions and memories, checks your live tools, and writes where each project stands.</p>",
      try: "Click <strong>Standup</strong> in the list.",
    },
    {
      screen: "agents-standup",
      spot: { text: "Run now", exact: true, up: 1 },
      title: "Run it, edit it, switch it off",
      body: "<p><strong>Run now</strong> runs its steps right away, whatever its trigger. <strong>Edit</strong> opens the editor. <strong>Turn off</strong> stops it running on its own; you can still run it by hand.</p><p>Below, the <strong>Thread</strong> holds every run, oldest first, like a conversation. The box at the bottom replies to the last run: it runs again with your words.</p>",
    },
    {
      screen: "agents-ask",
      spot: ASK_CARD,
      click: { text: "Yes, do it", exact: true },
      after: answered,
      title: "It asks before it changes anything",
      body: "<p>Reading goes on without asking. A call that changes something asks first: here Standup wanted to post today's standup to Slack. The run carried on without it, and the call waits on an <strong>Ask first</strong> card, here and on Home.</p><p><strong>Yes, do it</strong> makes exactly that call. <strong>No</strong> closes it.</p>",
      try: "Click <strong>Yes, do it</strong>.",
    },
    {
      screen: "agents-ask",
      spot: ASK_CARD,
      title: "The card says how it went",
      body: "<p>A short run made the one call, and the card now reads <strong>Done: Posted to #acme-dev.</strong> If it fails, it says <strong>Not made</strong> and why.</p><p>Each held call is answered once.</p>",
    },
    {
      screen: "agents-standup",
      spot: { text: "Setup", exact: true, within: { css: "main" } },
      click: true,
      title: "Setup: what it does",
      body: "<p><strong>Setup</strong> shows the whole agent at a glance: its job, what starts it, where it works, what it may do, and its steps.</p>",
      try: "Click <strong>Setup</strong>.",
    },
    {
      screen: "agents-setup",
      spot: { text: "Runs", exact: true, up: 1 },
      title: "Job and runs",
      body: "<p><strong>Job</strong> is what it is for, in your words. Every step reads it first.</p><p><strong>Runs</strong> says what starts it (<strong>Weekdays · 7:00 AM</strong>), when it runs next, the project it <strong>Works in</strong>, and the <strong>AI tool</strong> it runs on. An agent runs in that project's folder, so the project's MCP servers load.</p>",
    },
    {
      screen: "agents-steps",
      spot: { text: "May do", up: 1 },
      title: "What it may do, and its steps",
      body: "<p><strong>May do</strong> holds three lists: <strong>Allowed</strong> runs without asking, <strong>Asks first</strong> waits for you, <strong>Denied</strong> is refused. One call per line; <code>mcp__slack__*</code> covers a whole server.</p><p><strong>Steps</strong> run in order. A first <strong>Recent work</strong> step gathers your sessions, memories and pages, and checks them against your live tools.</p>",
    },
    {
      screen: "agents-knows",
      spot: { text: "What each run reads", up: 1 },
      title: "What it knows",
      body: "<p><strong>What it knows</strong> lists the memories the agent wrote and what every run reads: recent sessions, the project's memories, its own last three reports, and your replies.</p><p>An agent writes memories only when its first step has <strong>Write decisions back to memory</strong> on.</p>",
    },
    {
      screen: "agents-debrief",
      spot: { text: "Session ended:", up: 1 },
      title: "Triggered by your work",
      body: "<p><strong>Dev session debrief</strong> runs when a session ends: after Slate captures an AI coding session, it writes what shipped, the decisions made and what is next.</p><p>Its three steps each read the one before (<code>@prev</code>). An agent can also start <strong>When a task arrives</strong>, from a new ticket in Tasks.</p>",
    },
    {
      screen: "agents-edit",
      spot: { text: "When a task arrives", exact: true, up: 2 },
      title: "Try it: change when it runs",
      body: "<p>Press <strong>Edit</strong> on any agent. Under <strong>Starts</strong>, pick <strong>By hand</strong>, <strong>On a schedule</strong>, <strong>When a session ends</strong> or <strong>When a task arrives</strong>, and set <strong>Runs on its own</strong>.</p><p>Try it now: open <strong>Weekly review</strong>, set it to Fridays at 4 PM, save, and press <strong>Run now</strong> to read this week's report right away.</p>",
    },
  ],
};
