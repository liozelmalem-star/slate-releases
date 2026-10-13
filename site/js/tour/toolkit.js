// Toolkit: everything a project's AI tools read, kept once and published to all of them.
export const toolkit = {
  id: "toolkit",
  title: "Toolkit",
  place: "Toolkit",
  icon: '<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/>',
  links: [
    { match: { text: "write-tests", exact: true }, step: 4 },
    { match: { text: "review-pr", exact: true }, step: 4 },
    { match: { text: "AI tools", exact: true }, step: 8 },
    { match: { text: "Changes", exact: true }, step: 9 },
  ],
  steps: [
    {
      screen: "toolkit",
      spot: { css: "main" },
      spotOpts: { dim: false, pad: -4 },
      title: "One setup for every AI tool",
      body:
        "<p>Claude Code, Codex, Cursor, Gemini and OpenCode each want their skills, rules and MCP servers in their own folder and their own format. Kept by hand, five copies drift apart.</p>" +
        "<p><strong>Toolkit</strong> keeps one copy and publishes it to all of them. You write it once, in the project's <code>.slate/</code> folder and its <code>AGENTS.md</code>, and Slate writes each tool's version for you.</p>",
    },
    {
      screen: "toolkit-picker",
      spot: { text: "Your AI tools", up: 2 },
      title: "Pick a project",
      body:
        "<p>Toolkit always shows one project. The picker lists every project with a folder, grouped the way your sidebar groups them. Here <strong>acme-web</strong> has 4 skills, <strong>acme-api</strong> 3 and <strong>blog</strong> 2.</p>" +
        "<p><strong>Your AI tools</strong> is the last kind of place: the skills and setup each tool keeps in your home folder, for every project.</p>",
    },
    {
      screen: "toolkit",
      spot: { text: "Config files", exact: true, up: 1 },
      spotOpts: { pad: 4 },
      title: "One tab per kind of thing",
      body:
        "<p><strong>Skills</strong>, <strong>Commands</strong>, <strong>Subagents</strong>, <strong>Rules</strong>, <strong>Instructions</strong>, <strong>MCP servers</strong>, <strong>Hooks</strong>, <strong>Plugins</strong>, <strong>Output styles</strong> and <strong>Config files</strong> — each with a count. A tab with nothing in it is still there, so you can add the first one.</p>" +
        "<p>Each tab's subtitle says when a tool loads it: a skill when the task matches it, a command when you type <kbd>/name</kbd>, instructions at the start of every session.</p>",
    },
    {
      screen: "toolkit",
      spot: { text: "review-pr", exact: true, up: 1 },
      click: true,
      title: "Your skills, grouped",
      body:
        "<p>Skills are listed by group, with a filter and group chips on top. The marks at the end of a row are the tools that read that skill — only the tools this workspace connects get one.</p>",
      try: "Open <strong>review-pr</strong>.",
    },
    {
      screen: "toolkit-skill",
      spot: { text: "Published to", up: 1 },
      title: "Published to every tool",
      body:
        "<p>A skill in <code>.slate/skills</code> opens in its editor. <strong>Published to 5 of 5</strong> means every tool gets it. Click a tool's chip to stop publishing there; click again to add it back.</p>" +
        "<p><strong>Rename</strong>, <strong>Duplicate</strong>, <strong>Copy to project</strong> and <strong>Remove</strong> sit under the chips.</p>",
    },
    {
      screen: "toolkit-skill",
      spot: { text: "Markdown", exact: true },
      click: true,
      title: "Read it, or edit the source",
      body:
        "<p><strong>Preview</strong> shows the skill drawn, its header fields on top. <strong>Markdown</strong> shows the file itself. Edits save on their own when you stop typing.</p>" +
        "<p>Editing a skill needs no sync: each tool reads it through a link to the one file.</p>",
      try: "Switch to <strong>Markdown</strong>.",
    },
    {
      screen: "toolkit-skill-md",
      spot: { text: "History", exact: true },
      click: true,
      title: "Every version, from git",
      body:
        "<p>This is <code>SKILL.md</code> as the tools read it: a name, a description that says when to use it, then the instructions.</p>" +
        "<p><strong>History</strong> lists the commits that changed it.</p>",
      try: "Open <strong>History</strong>.",
    },
    {
      screen: "toolkit-skill-history",
      spot: { text: "Restore", exact: true },
      title: "Restore an older version",
      body:
        "<p>Each commit that touched the skill is one row. <strong>Restore</strong> puts that version back in the file as an uncommitted edit, so it shows in <strong>Changes</strong> and nothing is lost; <strong>Back to the file</strong> returns to the editor.</p>",
    },
    {
      screen: "toolkit",
      spot: { text: "In sync", exact: true },
      click: true,
      title: "Is every tool up to date?",
      body:
        "<p>The pill in the header says whether every tool matches <code>.slate/</code>: <strong>In sync</strong>, or how many tools are behind. Slate watches <code>.slate/</code> and <code>AGENTS.md</code> and syncs a moment after either changes — whoever changed it.</p>",
      try: "Click <strong>In sync</strong>.",
    },
    {
      screen: "toolkit-aitools",
      spot: { text: "AI tool", exact: true, up: 3 },
      title: "What each tool reads",
      body:
        "<p><strong>AI tools</strong> is one row per tool: how many skills reach it, its rules, its MCP servers, and its state. <strong>Check again</strong> re-reads the folders; <strong>Sync now</strong> rewrites every tool's copy from <code>.slate/</code>.</p>" +
        "<p><code>AGENTS.md</code> is the rules file the tools read on their own, and <code>CLAUDE.md</code> is a link to it.</p>",
    },
    {
      screen: "toolkit-changes",
      spot: { text: "Changed files", up: 1 },
      title: "Commit what you changed",
      body:
        "<p><strong>Changes</strong> lists edits to skill files and the rules file that are not committed yet, each with its diff. Here one line was added to <strong>review-pr</strong>.</p>" +
        "<p>Tick the files, say what changed, then <strong>Commit</strong> or <strong>Commit and push</strong>. <strong>Discard ticked changes</strong> puts them back; <strong>Pull</strong> brings in your team's.</p>",
      type: [{ css: "textarea" }, "review-pr: flag float price math"],
    },
    {
      screen: "toolkit",
      spot: { text: "New skill", exact: true },
      click: true,
      title: "Add a skill",
      body:
        "<p>The header's <strong>New …</strong> button adds whatever kind is open — <strong>New skill</strong> here, <strong>New rule</strong> on Rules, <strong>New MCP server</strong> on MCP servers.</p>",
      try: "Click <strong>New skill</strong>.",
    },
    {
      screen: "toolkit-new",
      spot: { text: "Where it goes", up: 1 },
      title: "Write it once",
      body:
        "<p>Give it a folder name and say what it does and when a tool should use it — that sentence is how a tool decides to load it.</p>" +
        "<p><strong>.slate/skills</strong> publishes to all five tools, so the tool folders below are already covered. Pick a group, start from a blank <code>SKILL.md</code> or a copy, and <strong>Create skill</strong>.</p>",
    },
    {
      screen: "toolkit",
      spot: { css: "main" },
      spotOpts: { dim: false, pad: -4 },
      title: "Try it: one rule, every tool",
      body:
        "<p>Your team keeps forgetting to update the changelog. Open <strong>New skill</strong>, name it <code>changelog</code>, and write \"Add a line to CHANGELOG.md for every user-facing change.\"</p>" +
        "<p>Slate syncs it to all five tools within a moment. Check <strong>AI tools</strong> says <strong>In sync</strong>, then <strong>Commit and push</strong> from <strong>Changes</strong> so everyone on the project gets it too.</p>",
    },
  ],
};
