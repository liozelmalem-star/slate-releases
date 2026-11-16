// Artifacts: docs your agents publish for you to look at, with every version kept.
// Screens: artifacts-overview, artifacts, artifacts-code, artifacts-old, artifacts-menu, artifacts-deck, artifacts-live
// (each artifact's doc is captured into its iframe as srcdoc).

export const artifacts = {
  id: "artifacts",
  title: "Artifacts",
  place: "Artifacts",
  icon: '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  links: [],
  steps: [
    {
      screen: "artifacts-overview",
      spot: { css: "main" },
      spotOpts: { pad: 0 },
      title: "Every artifact at a glance",
      body: "<p>Artifacts opens on its <strong>Overview</strong>: <strong>Recent</strong>, the four newest as cards with a picture, then <strong>Earlier</strong>, the next ten as one line each.</p><p>The side panel sorts them by what they are: <strong>Pages</strong> and <strong>Slides</strong>, each with its count. Click a card to open it.</p>",
      click: { text: "Checkout funnel", exact: true, within: { css: "main" } },
      try: "Click the <strong>Checkout funnel</strong> card.",
    },
    {
      screen: "artifacts",
      spot: { css: "main" },
      spotOpts: { pad: 0 },
      title: "Docs your agents made for you",
      body: "<p>An <strong>artifact</strong> is something an agent made for you to look at: a dashboard, a chart, a report, or a deck of slides. It is kept in your workspace, on this computer, with every version.</p><p>You never edit one by hand. You ask, and the tool publishes it again. Open, it fills the whole space; the toolbar above keeps what you can do with it.</p>",
    },
    {
      screen: "artifacts",
      spot: { css: "aside" },
      title: "How one gets here",
      body: "<p>In any session, ask any connected agent to <strong>publish this as an artifact</strong>. It sends the doc through Slate's <code>publish_artifact</code> MCP tool, and it lands first on the Overview.</p><p>Tools also publish a chart, a table or a report this way on their own. The side panel shows one type at a time, and its search narrows the cards by title; <kbd>⌘K</kbd> finds one from anywhere.</p>",
    },
    {
      screen: "artifacts",
      spot: { text: "Code", exact: true },
      click: true,
      title: "Preview or Code",
      body: "<p><strong>Preview</strong> shows the doc. <strong>Code</strong> shows its source, read-only and laid out one block per line.</p>",
      try: "Click <strong>Code</strong>.",
    },
    {
      screen: "artifacts-code",
      spot: { css: "main .cm-editor" },
      spotOpts: { pad: 2 },
      title: "The source, as published",
      body: "<p>Only the spacing is changed to make it readable. <strong>Copy HTML</strong> in the <strong>⋯</strong> menu still copies the doc exactly as the tool sent it.</p>",
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
      body: "<p>An older version says so: <strong>You are looking at v2. The newest is v3.</strong></p><p><strong>Restore this version</strong> publishes that doc again as a new version, v4, so nothing in between is lost.</p>",
    },
    {
      screen: "artifacts",
      spot: { css: 'button[title^="Ask AI"]' },
      title: "Ask for a change",
      body: "<p>Open the <strong>AI helper</strong>, the lime circle at the bottom right (<kbd>⌘J</kbd>). Beside an open artifact it knows which one you mean. Say what you want in plain words; it runs in the project the artifact was made in, on that project's tool.</p><p>The tool reads the doc, sends only what changes, and a new version appears here.</p>",
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
      body: "<p><strong>Copy HTML</strong>, <strong>Open in browser</strong> and <strong>Rename</strong>.</p><p><strong>Delete forever</strong> asks once more, then removes every version.</p>",
    },
    {
      screen: "artifacts-deck",
      spot: { css: '[data-testid="deck"]' },
      title: "Decks of slides",
      body: "<p>A deck is shown the way slides are: one 16:9 slide at a time. <strong>‹ 1 / 4 ›</strong> or the arrow keys move, the strip under it shows every slide, and each slide's speaker notes sit below.</p><p><strong>Present</strong> fills the screen. Ask your agent for a deck, and it publishes one.</p>",
    },
    {
      screen: "artifacts-live",
      spot: { text: "Reads your workspace · no internet" },
      title: "Live artifacts stay current",
      body: "<p>A tool can publish an artifact <strong>live</strong>. It reads your workspace while you look at it, so this chart of sessions by tool stays true without being published again.</p><p>It can read the docs, memories and sessions of its project, and change nothing. It has no internet: <strong>Reads your workspace · no internet</strong>.</p>",
    },
    {
      screen: "artifacts",
      spot: { css: "aside" },
      title: "Try it",
      body: "<p>In a session with your data open, ask: <em>“Make a chart of checkout drop-off by step and publish it as an artifact.”</em> Open it here, then ask the AI helper for a change and watch <strong>v2 of 2</strong> appear.</p><p>A dashboard you want to stay current? Ask for it <em>live</em>.</p>",
    },
  ],
};
