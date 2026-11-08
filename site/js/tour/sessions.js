// Sessions: every live AI session on this computer, the map, starting one (This computer, Cloud,
// a worktree), and a session opened: its conversation, its rail, and the branch review.
// Screens: sessions-*.
export const sessions = {
  id: "sessions",
  title: "Sessions",
  place: "Sessions",
  icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>',
  links: [
    { match: { css: 'button[title="Watch this session live (acme-api)"]' }, step: 9 },
  ],
  steps: [
    {
      screen: "sessions",
      spot: { css: "aside" },
      title: "Every AI session on your Mac, live",
      body:
        "<p>Sessions lists every AI coding session running on this computer, from any of the 16 tools Slate supports, whether Slate started it or you did in your own terminal. Nothing to register.</p>" +
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
      spot: { css: 'button[aria-label^="Start a session"]' },
      title: "Start a session",
      body:
        "<p>Point at any project or branch and a <strong>+</strong> starts a session right there. The <strong>+</strong> at the top of the list is for everything else, and for picking a different tool.</p>",
      try: "Click <strong>+</strong> at the top of the list.",
      click: true,
    },
    {
      screen: "sessions-new",
      spot: { text: "Pick where it runs", up: 3 },
      title: "Pick where it runs",
      body:
        "<p><strong>This computer</strong> lists your groups, projects and branches. Click one and the session starts there at once. <strong>Runs on</strong> picks the agent for this session only.</p>" +
        "<p>Turn on <strong>On my phone</strong> first to keep going from the Claude app. <strong>Start without a project</strong> is for a quick question or script.</p>",
      try: "Click <strong>Cloud</strong>.",
      click: { text: "Cloud", exact: true },
    },
    {
      screen: "sessions-new-cloud",
      spot: { text: "What should the cloud session do?" },
      title: "Or run it in the cloud",
      body:
        "<p><strong>Cloud</strong> runs the session on your agent's computer, so it keeps going while your Mac sleeps. Claude Code and Codex have it.</p>" +
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
        "<p>Name the <strong>Branch</strong> and the branch it starts <strong>From</strong>. <strong>Carry over</strong> copies files that git ignores into the new folder, here <code class=\"inline\">.mcp.json</code> and <code class=\"inline\">CLAUDE.md</code>. They are cloned, so they use no extra disk.</p>" +
        "<p><strong>Then run</strong> and <strong>On remove</strong> are commands for setup and cleanup. All of it is saved for the project. When the session ends, Slate removes the worktree and keeps unmerged commits.</p>",
    },
    {
      screen: "sessions",
      spot: { css: 'button[title="Watch this session live (acme-api)"]' },
      title: "Open a session",
      body:
        "<p>Each row is named for its branch, with the latest line under it. The acme-api session on <strong>feat/rate-limits</strong> is waiting on you. Click its row to open it.</p>",
      try: "Click <strong>feat/rate-limits</strong>.",
      click: true,
    },
    {
      screen: "sessions-open",
      spot: { css: 'button[title="Watch this session live (acme-api)"]' },
      title: "The row, and its tab",
      body:
        "<p>The row's meta line shows the tool, how long it has waited, how much it changed, and how far its plan has got. The session opens as a tab above the stage, so several can stay open.</p>" +
        "<p>Arrow keys or <kbd>j</kbd> and <kbd>k</kbd> move through the list, and <kbd>Enter</kbd> opens a row.</p>",
    },
    {
      screen: "sessions-open",
      spot: { text: "Continue in a copy", up: 1 },
      title: "Its conversation, live",
      body:
        "<p>A session from your own terminal shows its conversation as the tool writes it. <strong>Continue in a copy</strong> picks it up in Slate without touching your terminal. <strong>Its doc</strong> opens what Slate recorded about it.</p>" +
        "<p>A session Slate started runs in a real terminal here.</p>",
    },
    {
      screen: "sessions-open",
      spot: { text: "Environment", exact: true, up: 2 },
      title: "Details, on the right",
      body:
        "<p>The details rail says where the session runs (tool, project, branch, folder), how full its context is, its pull request and its doc in Slate. <strong>Draft a skill</strong> turns the session's steps into a skill for the project.</p>" +
        "<p>The button with a number in the header counts the files the session changed.</p>",
      try: "Click the <strong>2</strong> in the header.",
      click: { css: 'button[aria-label^="Changes"]' },
    },
    {
      screen: "sessions-review",
      spot: { text: "This branch vs main", up: 3 },
      title: "What the branch changed",
      body:
        "<p><strong>Changes</strong> opens beside the conversation: what is committed on this branch, and what is not published yet. <strong>Publish branch</strong> pushes it.</p>",
    },
    {
      screen: "sessions-rowmenu",
      spot: { text: "Open beside", up: 2 },
      title: "Everything a row can do",
      body:
        "<p>Point at a row for <strong>⋯</strong> and <strong>Stop</strong>. The menu opens it beside the one you are in, opens a pull request, starts a <strong>Chat</strong>, a <strong>New worktree</strong> or a <strong>Second session here</strong>, runs the dev server with <strong>Run preview</strong>, or copies the resume command.</p>" +
        "<p><strong>Stop</strong> asks for a second click before it ends a session.</p>",
    },
    {
      screen: "sessions-changes",
      spot: { text: "Commit 2 files", up: 2 },
      title: "Try it: check a working session",
      body:
        "<p>A session still working has files not yet committed. Tick the ones to keep, write a message, then <strong>Commit</strong>, <strong>Commit & Push</strong> or <strong>Open PR</strong>.</p>" +
        "<p>Each morning: open Sessions, answer the amber rows first, glance at the green ones' Changes, and review a branch before you merge it.</p>",
      try: "Next, <strong>Home</strong>: the same waiting sessions, one card at a time.",
    },
  ],
};
