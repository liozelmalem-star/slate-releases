// Widgets: small cards your agent builds inside Slate and shows on Home or Activity. Screens:
// widgets, widgets-picker, widgets-builder, widgets-files, widgets-menu (widget previews are
// captured into their iframes as srcdoc). The old #apps address still opens here (OLD_IDS
// in tour.js).

const DESCRIBE = { css: 'textarea[placeholder^="Describe a widget for"]' };

export const widgets = {
  id: "widgets",
  title: "Widgets",
  place: "Widgets",
  icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  links: [{ match: { text: "PR review queue", exact: true, within: { css: "aside" } }, step: 4 }],
  steps: [
    {
      screen: "widgets",
      spot: DESCRIBE,
      type: [DESCRIBE, "Tokens per project this week, as bars"],
      title: "Small cards, built by asking",
      body: "<p>A <strong>widget</strong> is a small card Slate runs for you: tokens per project, a review queue, a form that files tasks. You describe it, your agent writes it, and it shows on a tab.</p><p>It reads only what its tab shows, acts only through permissions you allow, and never reaches the internet.</p>",
    },
    {
      screen: "widgets",
      spot: { text: "Show it on", up: 1 },
      title: "Pick the tab it lives on",
      body: "<p><strong>Show it on</strong> picks the tab: <strong>Home</strong> or <strong>Activity</strong>. Its code reads that tab's data, so a widget for Activity follows the range and project picked there.</p><p>Home shows at most 3 widgets and Activity 2, so the tab stays about what needs you.</p>",
    },
    {
      screen: "widgets-picker",
      spot: { css: ".menu-pop" },
      title: "Pick the agent that builds it",
      body: "<p>The box names your workspace's agent (set in <strong>Connect</strong>). Click it to pick another. The work runs in a session Slate keeps in the background, under your own agent and account.</p>",
    },
    {
      screen: "widgets",
      spot: { text: "Your widgets", up: 1 },
      click: { text: "PR review queue", exact: true, within: { css: "aside" } },
      title: "Your widgets",
      body: "<p>Each card shows the widget itself, and the tab it is on. <strong>PR review queue</strong> counts the pull requests waiting on you, on Home; <strong>Sessions by tool</strong> counts each agent's sessions, on Activity.</p>",
      try: "Click <strong>PR review queue</strong> in the list to open it.",
    },
    {
      screen: "widgets-builder",
      spot: { text: "Version 1", up: 2 },
      title: "The chat that built it",
      body: "<p>Each widget opens as a builder, with the chat on the left. While your agent works, every step shows as it happens. Each build leaves a <strong>Version</strong> row; an older one has <strong>Restore</strong>.</p><p>Slate checks every version: it must render, and fit its card at every width the tab allows, before it shows.</p>",
    },
    {
      screen: "widgets-builder",
      spot: { text: "Discuss", exact: true, up: 1 },
      title: "Build, or Discuss first",
      body: "<p>To change the widget, type in the box, for example <em>“make the buttons green”</em>. In <strong>Build</strong> the agent makes the change and a new version appears.</p><p><strong>Discuss</strong> talks a change through and changes nothing until you say <strong>Build it</strong>.</p>",
    },
    {
      screen: "widgets-builder",
      spot: { text: "Point at the widget to size or move it", up: 1 },
      title: "Preview: the real tab",
      body: "<p>Preview draws the whole tab, small, with your widget live in it. Drag it to move it, pull an edge to resize it, or click a <strong>Move here</strong> band. Where it sits is set only here, never on the tab.</p><p>The line underneath says what it can reach: <strong>Reads Personal. No internet.</strong></p>",
    },
    {
      screen: "widgets-builder",
      spot: { text: "Files", exact: true, within: { css: "main" } },
      click: true,
      title: "Preview and Files",
      body: "<p>The bar on top holds the widget's name, its two views, <strong>Hide chat</strong> and the <strong>⋯</strong> menu. <strong>Widgets</strong> goes back to the Overview.</p>",
      try: "Click <strong>Files</strong>.",
    },
    {
      screen: "widgets-files",
      spot: { css: "main .cm-editor" },
      spotOpts: { pad: 0 },
      title: "Edit the files yourself",
      body: "<p><strong>Files</strong> is the widget's folder: a file tree and an editor. Press <kbd>⌘S</kbd> to save; Slate type-checks and builds it, and saves nothing if that fails.</p><p><strong>Diff</strong> compares with the version before.</p>",
    },
    {
      screen: "widgets-menu",
      spot: { text: "Read your GitHub", up: 1 },
      title: "What it may do",
      body: "<p>The <strong>⋯</strong> menu has one switch for each permission the widget asked for. On means allowed; off takes it back. A widget that asks for nothing shows no switches.</p><p><strong>Move to Trash</strong> keeps every version; Trash can bring it back.</p>",
    },
    {
      screen: "widgets",
      spot: DESCRIBE,
      title: "Try it",
      body: "<p>Describe a card you would look at every day, for example: <em>“The memories each agent saved this week, as bars.”</em> Press <kbd>Enter</kbd> and open it to watch the chat.</p>",
    },
  ],
};
