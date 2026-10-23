// Sessions: every live AI session on this computer, the map, starting one (This computer, Cloud,
// a worktree), and a session opened: its conversation, its rail, and the branch review.
// Screens: sessions-*.
export const sessions = {
  id: "sessions",
  title: "Sessions",
  place: "Sessions",
  icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>',
  links: [
    { match: { text: "Add a dashboard" }, step: 9 },
  ],
  steps: [
    {
      screen: "sessions",
      spot: { text: "Every live AI session", up: 2 },
      title: "Every AI session on your Mac, live",
      body:
        "<p>Sessions lists every Claude Code, Codex, Gemini, Cursor and OpenCode session running on this computer, whether Slate started it or you did in your own terminal. Nothing to register.</p>" +
        "<p>The header counts them: <strong>1 need you</strong>, <strong>1 working</strong>, <strong>1 idle</strong>. <kbd>⌘⇧J</kbd> jumps to the one that has waited longest.</p>",
    },
    {
      screen: "sessions",
      spot: { css: "section[data-project-region]" },
      title: "Grouped by project, with a status dot",
      body:
        "<p>Each session sits under its group or project. Its dot says where it stands: amber <strong>Needs you</strong>, green <strong>Working</strong>, grey <strong>Idle</strong>.</p>" +
        "<p>The title is what it was asked to do. The line under it is what it is doing now: its question, its latest step, or the next item of its plan. Those waiting on you come first.</p>",
    },
    {
      screen: "sessions",
      spot: { text: "Acme", exact: true },
      title: "The map",
      body:
        "<p>With nothing open, the main area is a map: this machine at the centre, then group, project, branch and session. The halo on a node is its most urgent state.</p>" +
        "<p>Click a group or project to zoom into it; <kbd>Esc</kbd> comes back. Pointing at a row lights its node, and the other way round.</p>",
    },
    {
      screen: "sessions",
      spot: { text: "New session", exact: true },
      title: "Start a session",
      body:
        "<p>Point at any project, branch or row and a <strong>+</strong> starts a session right there. <strong>New session</strong> is for everything else, and for picking a different tool.</p>",
      try: "Click <strong>New session</strong>.",
      click: true,
    },
    {
      screen: "sessions-new",
      spot: { text: "Pick where it runs", up: 3 },
      title: "Pick where it runs",
      body:
        "<p><strong>This computer</strong> lists your groups, projects and branches. Click one and the session starts there at once. <strong>Runs on</strong> picks the AI tool for this session only.</p>" +
        "<p>Turn on <strong>On my phone</strong> first to keep going from the Claude app. <strong>Start without a project</strong> is for a quick question or script.</p>",
      try: "Click <strong>Cloud</strong>.",
      click: { text: "Cloud", exact: true },
    },
    {
      screen: "sessions-new-cloud",
      spot: { text: "What should the cloud session do?" },
      title: "Or run it in the cloud",
      body:
        "<p><strong>Cloud</strong> runs the session on your AI tool's computer, so it keeps going while your Mac sleeps. Claude Code and Codex have it.</p>" +
        "<p>Write the task, pick a git project, and press <strong>Start in cloud</strong>. The note says exactly what leaves your Mac.</p>",
    },
    {
      screen: "sessions-new-tree",
      spot: { text: "New worktree…", exact: true },
      title: "A new branch in its own folder",
      body:
        "<p>Open a project in the tree to see its branches. Its last row, <strong>New worktree…</strong>, makes a new branch in a sibling folder and starts the session there, so two agents never edit the same checkout.</p>",
      try: "Click <strong>New worktree…</strong>",
      click: true,
    },
    {
      screen: "sessions-worktree",
      spot: { text: "Carry over", exact: true, up: 1 },
      title: "The worktree form",
      body:
        "<p>Name the <strong>Branch</strong> and the branch it starts <strong>From</strong>. <strong>Carry over</strong> copies ignored files like <code class=\"inline\">node_modules</code> or <code class=\"inline\">.env</code> without using extra disk.</p>" +
        "<p><strong>Then run</strong> and <strong>On remove</strong> are commands for setup and cleanup. All of it is saved for the project. When the session ends, Slate removes the worktree and keeps unmerged commits.</p>",
    },
    {
      screen: "sessions",
      spot: { text: "Add a dashboard" },
      title: "Open a session",
      body:
        "<p>The acme-api session is waiting on you. Click its row to open it.</p>",
      try: "Click <strong>Add a dashboard query…</strong>",
      click: true,
    },
    {
      screen: "sessions-open",
      spot: { text: "Add a dashboard", up: 2 },
      title: "The row opens up",
      body:
        "<p>The selected row adds its branch line and its meta line: the tool, how long it has waited, an eye for a session running in your own terminal, how full its context is, and how far its plan has got.</p>" +
        "<p>Arrow keys or <kbd>j</kbd> and <kbd>k</kbd> move through the list, and <kbd>Enter</kbd> opens a row.</p>",
    },
    {
      screen: "sessions-open",
      spot: { text: "Continue in a copy", up: 1 },
      title: "Its conversation, live",
      body:
        "<p>A session from your own terminal shows its conversation as the tool writes it. <strong>Continue in a copy</strong> picks it up in Slate without touching your terminal. <strong>Its page</strong> opens what Slate recorded about it.</p>" +
        "<p>A session Slate started runs in a real terminal here, with a <strong>Terminal</strong> | <strong>Conversation</strong> switch above it.</p>",
    },
    {
      screen: "sessions-open",
      spot: { text: "See changes", up: 2 },
      title: "The Session panel",
      body:
        "<p>The rail on the right holds <strong>Session</strong>, <strong>Changes</strong>, <strong>Turns</strong> and <strong>About</strong>. Session answers what a glance needs: its state and since when, its whole latest message, the branch checklist, and how full the context is.</p>" +
        "<p>Its buttons keep their places: <strong>See changes</strong>, then <strong>Open PR</strong>, then <strong>⋯</strong> for the rest.</p>",
      try: "Click <strong>See changes</strong>.",
      click: { text: "See changes", exact: true },
    },
    {
      screen: "sessions-review",
      spot: { text: "Revert hunk", up: 1 },
      title: "Review what the branch changed",
      body:
        "<p>The whole branch against <strong>main</strong>, file by file. Tick <strong>Viewed</strong> as you go. <strong>Revert hunk</strong> and <strong>Revert file</strong> undo one piece without touching the rest.</p>" +
        "<p>When the agent is done, a finished worktree branch offers <strong>Merge into main</strong>, <strong>Keep</strong> or <strong>Discard</strong> here.</p>",
    },
    {
      screen: "sessions-rowmenu",
      spot: { text: "Open beside", up: 2 },
      title: "Everything a row can do",
      body:
        "<p>Point at a row for <strong>⋯</strong> and <strong>Stop</strong>. The menu opens it beside the one you are in, opens a pull request, starts a <strong>Chat</strong> or a <strong>Second session here</strong>, runs the dev server with <strong>Run preview</strong>, or copies the resume command.</p>" +
        "<p><strong>Stop</strong> asks for a second click before it ends a session.</p>",
    },
    {
      screen: "sessions-changes",
      spot: { css: '[data-session-pane="changes"]' },
      title: "Try it: check a working session",
      body:
        "<p><strong>Changes</strong> lists every file the branch touched, with <strong>Push</strong> and <strong>Open PR</strong>. <strong>Turns</strong> lets you rewind to before a prompt, and <strong>About</strong> shows the page it works on.</p>" +
        "<p>Each morning: open Sessions, answer the amber rows first, glance at the green ones' Changes, and review a branch before you merge it.</p>",
      try: "Next, <strong>Home</strong>: the same waiting sessions, one card at a time.",
    },
  ],
};
