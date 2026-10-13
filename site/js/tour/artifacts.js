// Artifacts: pages your AI tools publish for you to look at, with every version kept.
// Screens: artifacts, artifacts-code, artifacts-old, artifacts-menu, artifacts-md, artifacts-live
// (each artifact's page is captured into its iframe as srcdoc).

const ASK = { css: 'input[placeholder^="Ask for a change"]' };

export const artifacts = {
  id: "artifacts",
  title: "Artifacts",
  place: "Artifacts",
  icon: '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  links: [
    { match: { text: "Release notes 0.9", exact: true }, step: 9 },
    { match: { text: "Acme sessions by tool", exact: true }, step: 10 },
  ],
  steps: [
    {
      screen: "artifacts",
      spot: { css: "main" },
      spotOpts: { pad: 0 },
      title: "Pages your AI tools made for you",
      body: "<p>An <strong>artifact</strong> is a page an AI tool made for you to look at: a dashboard, a chart, a report, or a note in Markdown. It is kept in your workspace, on this Mac, with every version.</p><p>You never edit one by hand. You ask, and the tool publishes it again. Above the page: who made it and when (<strong>Codex · 10 hours ago</strong>), its title, and what it is.</p>",
    },
    {
      screen: "artifacts",
      spot: { css: "aside" },
      title: "How one gets here",
      body: "<p>In any session, ask a connected tool (Claude Code, Codex, Cursor, Gemini, OpenCode) to <strong>publish this as an artifact</strong>. It sends the page through Slate's <code>publish_artifact</code> MCP tool, and it lands at the top of this list.</p><p>Tools also publish a chart, a table or a report this way on their own. The list is newest first. The <strong>project picker</strong> and <strong>Filter artifacts</strong> narrow it; <kbd>⌘K</kbd> finds one from anywhere.</p>",
    },
    {
      screen: "artifacts",
      spot: { text: "Code", exact: true },
      click: true,
      title: "Preview or Code",
      body: "<p><strong>Preview</strong> shows the page. <strong>Code</strong> shows its source, read-only and laid out one block per line.</p>",
      try: "Click <strong>Code</strong>.",
    },
    {
      screen: "artifacts-code",
      spot: { css: "main .cm-editor" },
      spotOpts: { pad: 2 },
      title: "The source, as published",
      body: "<p>Only the spacing is changed to make it readable. <strong>Copy HTML</strong> in the <strong>⋯</strong> menu still copies the page exactly as the tool sent it.</p>",
    },
    {
      screen: "artifacts",
      spot: { text: "v3 of 3", up: 1 },
      click: { css: 'button[aria-label="Older version"]' },
      title: "Every change is a version",
      body: "<p>Each change you ask for adds a version, and the older ones stay. <strong>v3 of 3</strong> says which one you are looking at; the arrows step through them.</p>",
      try: "Click the left arrow to go back to v2.",
    },
    {
      screen: "artifacts-old",
      spot: { text: "Restore this version", up: 1 },
      title: "Look back, or bring one back",
      body: "<p>An older version says so: <strong>You are looking at v2. The newest is v3.</strong></p><p><strong>Restore this version</strong> publishes that page again as a new version, v4, so nothing in between is lost. A change asked for here starts from v2, and the box says so.</p>",
    },
    {
      screen: "artifacts",
      spot: ASK,
      type: [ASK, "Make the bars blue and add the v2 funnel next to the old one"],
      title: "Ask for a change",
      body: "<p>Type what you want in plain words and press <strong>Change</strong>. Slate starts a session in the project the artifact was made in, on that project's tool (here <strong>Claude Code in acme-web</strong>), and opens it.</p><p>The tool reads the page, sends only what changes, and a new version appears here.</p>",
    },
    {
      screen: "artifacts",
      spot: { css: 'main button[aria-label="More"]' },
      click: true,
      title: "More actions",
      body: "<p>Copying, opening in your browser, renaming and deleting live in the <strong>⋯</strong> menu at the top right.</p>",
      try: "Click <strong>⋯</strong>.",
    },
    {
      screen: "artifacts-menu",
      spot: { css: '[role="menu"]' },
      title: "The ⋯ menu",
      body: "<p><strong>Copy HTML</strong> (or <strong>Copy Markdown</strong>), <strong>Open in browser</strong> for an HTML page, and <strong>Rename</strong>.</p><p><strong>Delete forever</strong> asks once more, then removes every version.</p>",
    },
    {
      screen: "artifacts-md",
      spot: { text: "Release notes 0.9", exact: true },
      title: "Markdown artifacts",
      body: "<p>Not every artifact is a web page. <strong>Release notes 0.9</strong> is Markdown, shown as formatted text. It has versions and <strong>Ask for a change</strong> like any other.</p><p>Search with <kbd>⌘K</kbd> finds a Markdown artifact by its text, too.</p>",
    },
    {
      screen: "artifacts-live",
      spot: { text: "Reads your workspace · no internet" },
      title: "Live artifacts stay current",
      body: "<p>A tool can publish an artifact <strong>live</strong>. It reads your workspace while you look at it, so this chart of sessions by tool stays true without being published again.</p><p>It can read the pages, memories and sessions of its project, and change nothing. It has no internet: <strong>Reads your workspace · no internet</strong>.</p>",
    },
    {
      screen: "artifacts",
      spot: { css: "aside" },
      title: "Try it",
      body: "<p>In a session with your data open, ask: <em>“Make a chart of checkout drop-off by step and publish it as an artifact.”</em> Open it here, then ask for a change in the box and watch <strong>v2 of 2</strong> appear.</p><p>A dashboard you want to stay current? Ask for it <em>live</em>.</p>",
    },
  ],
};
