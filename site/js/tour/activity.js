// Activity: your AI sessions, time and tokens across every tool, read back as one board.
const byTool = { text: "By tool", exact: true, up: 2 };

export const activity = {
  id: "activity",
  title: "Activity",
  place: "Activity",
  icon: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  links: [
    { match: { text: "Last 13 weeks", exact: true }, step: 3 },
    { match: { text: "Codex", within: byTool }, step: 5 },
  ],
  steps: [
    {
      screen: "activity",
      spot: { css: "main" },
      spotOpts: { dim: false, pad: -4 },
      title: "What your AI work came to",
      body:
        "<p><strong>Activity</strong> reads the session files Claude Code, Codex, Gemini, Cursor and OpenCode already keep on your machine, and turns them into one board: what you did today, where the time went, and how your weeks are trending.</p>" +
        "<p>Nothing to set up. Everything here comes from data already on your computer.</p>",
    },
    {
      screen: "activity",
      spot: { text: "You ran", up: 1 },
      spotOpts: { pad: 8 },
      title: "The range, in one sentence",
      body:
        "<p>The top line says what the range you picked came to: sessions, time, the project most of it went to, and your busiest hour. When one comparison stands out, <strong>Look at</strong> under it names it.</p>" +
        "<p>The four cards compare the range with the same number of days just before it: <strong>sessions</strong>, <strong>session time</strong>, <strong>memories learned</strong> and <strong>active days</strong>. When your history does not reach back that far, they show no change.</p>",
    },
    {
      screen: "activity",
      spot: { text: "Timeline", exact: true, up: 1 },
      title: "The last 7 days, newest first",
      body:
        "<p><strong>Timeline</strong> shows each session as <strong>project · branch</strong> and the tool that ran it, with its tokens and time. Under the sessions are what got made that day — a <strong>Report</strong>, an <strong>AI run</strong> or an <strong>Artifact</strong> — each with <strong>Open</strong>.</p>" +
        "<p><strong>Learned 2 memories</strong> lists what Slate remembered from that day's work. Today and yesterday are open; older days are one line you can expand.</p>",
    },
    {
      screen: "activity",
      spot: { text: "Last 13 weeks", exact: true, up: 2 },
      title: "When you work",
      body:
        "<p><strong>Last 13 weeks</strong> is a calendar of how busy each day was. It always shows the last 13 weeks, whatever range you pick. Click a day to see it in the timeline.</p>" +
        "<p><strong>Time of day</strong> and <strong>Weekday</strong> below it show when you work; <strong>Peak</strong> names your busiest hour.</p>",
    },
    {
      screen: "activity-lower",
      spot: { text: "Codex", within: byTool },
      click: true,
      title: "By tool, project and branch",
      body:
        "<p><strong>By tool</strong>, <strong>By project</strong> and <strong>By branch</strong> rank your sessions by what ran them and where. Each row shows tokens and the session count.</p>" +
        "<p>Clicking any row filters the whole board to it.</p>",
      try: "Click <strong>Codex</strong>.",
    },
    {
      screen: "activity-tool",
      spot: { text: "Filtered to", up: 1 },
      spotOpts: { pad: 6 },
      title: "The board, for one tool",
      body:
        "<p>Now every widget counts only Codex sessions: 10 in the last 30 days, 3h 39m. <strong>Filtered to</strong> shows what is applied; the <strong>×</strong> on the chip clears it.</p>" +
        "<p>The same works for a project or a branch, so you can see where one feature's time went.</p>",
    },
    {
      screen: "activity-bottom",
      spot: { text: "Show records", exact: true },
      click: true,
      title: "The trend, and your records",
      body:
        "<p><strong>Sessions over time</strong> follows the range you picked. Switch between <strong>Day</strong> and <strong>Week</strong>, turn on <strong>compare</strong> to overlay the previous period, and drag across the chart to zoom into a narrower window.</p>" +
        "<p><strong>Show records</strong>, under the timeline, adds your best numbers.</p>",
      try: "Click <strong>Show records</strong>.",
    },
    {
      screen: "activity-records",
      spot: { text: "Records ·", up: 2 },
      spotOpts: { pad: 6 },
      title: "Your records",
      body:
        "<p><strong>Records</strong> picks out your <strong>busiest day</strong>, <strong>best week</strong>, <strong>longest focus</strong>, <strong>favorite tool</strong> and <strong>top model</strong> for the range. Scroll the row sideways to see them all.</p>" +
        "<p><strong>Hide records</strong> takes them away again.</p>",
    },
    {
      screen: "activity",
      spot: { text: "Edit", exact: true },
      click: true,
      title: "Make the board yours",
      body:
        "<p><strong>Edit</strong> lets you reorder the widgets, hide the ones you don't use, and add more.</p>",
      try: "Click <strong>Edit</strong>.",
    },
    {
      screen: "activity-edit",
      spot: { text: "Reset layout", exact: true, up: 1 },
      spotOpts: { pad: 4 },
      title: "Add, reorder, hide",
      body:
        "<p><strong>Add widget</strong>, beside <strong>Edit</strong>, puts a card back on the board: one you took off, or a built-in one that is not on it: Sessions, Momentum, By model, Memories, Quick stats and four readings of your memory, such as <strong>Is memory used?</strong></p>" +
        "<p>Drag a widget by its handle or use its arrows to move it; the eye hides it. <strong>Reset layout</strong> puts the default board back, and <strong>Done</strong> finishes.</p>",
    },
    {
      screen: "activity-7d",
      spot: { text: "Range", exact: true, up: 2 },
      spotOpts: { pad: 4 },
      title: "Range and saved views",
      body:
        "<p>The side panel holds what the board is about: the project picker (<strong>All projects</strong> or one), and <strong>Range</strong> — <strong>7d</strong>, <strong>30d</strong>, <strong>90d</strong>, <strong>1y</strong> or <strong>All</strong>.</p>" +
        "<p><strong>Saved views</strong> keeps the current range, filter and project under a name: type it in <strong>Name this view</strong> and <strong>Save</strong>. Click a view to come back to it.</p>",
    },
    {
      screen: "activity",
      spot: { css: "main" },
      spotOpts: { dim: false, pad: -4 },
      title: "Try it: where did a feature's time go?",
      body:
        "<p>Pick <strong>30d</strong>, then click <strong>feat/checkout-redesign</strong> in <strong>By branch</strong>. The cards, trend and tools now count only that branch's sessions.</p>" +
        "<p>Name the view \"Checkout\" and <strong>Save</strong>. Next week, one click shows how much more it took — and which tool did most of the work.</p>",
    },
  ],
};
