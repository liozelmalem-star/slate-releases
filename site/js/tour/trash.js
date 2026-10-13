// Trash: pages and apps you removed, until you restore them or delete them forever.
export const trash = {
  id: "trash",
  title: "Trash",
  place: "Trash",
  icon: '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  steps: [
    {
      screen: "trash",
      spot: { css: "main" },
      spotOpts: { dim: false, pad: -4 },
      title: "Nothing is gone until you say so",
      body:
        "<p>Pages and apps you move to Trash wait here until you restore them or delete them forever. It sits at the bottom of the rail, beside Connect.</p>" +
        "<p>A page goes with every page inside it: restoring it, or deleting it forever, affects them all.</p>",
    },
    {
      screen: "trash",
      spot: { text: "Scratch — endpoint naming", up: 1 },
      title: "What was trashed, when, and from where",
      body:
        "<p>Each row says when it was moved and which page it came from — this scratch page was in <strong>acme-api</strong> until yesterday. Click a row to open it and read it before you decide.</p>" +
        "<p>With a long Trash, <strong>Filter by title</strong> narrows the list.</p>",
    },
    {
      screen: "trash",
      spot: { text: "Restore", exact: true },
      title: "Restore",
      body:
        "<p><strong>Restore</strong> puts the page back, with everything that was inside it, and takes it off this list.</p>",
    },
    {
      screen: "trash",
      spot: { css: "input[type=checkbox]:not([title])" },
      spotOpts: { pad: 8 },
      click: true,
      title: "Act on several at once",
      body: "<p>Tick rows to restore or delete them together. The box in the header ticks them all.</p>",
      try: "Tick <strong>Scratch — endpoint naming</strong>.",
    },
    {
      screen: "trash-selected",
      spot: { text: "Restore (1)", up: 1 },
      title: "Restore or delete what you ticked",
      body:
        "<p>The header now counts what is ticked and offers <strong>Restore (1)</strong> and <strong>Delete forever (1)</strong> for just those rows.</p>",
    },
    {
      screen: "trash",
      spot: { css: 'button[title="Delete forever…"]' },
      spotOpts: { pad: 8 },
      click: true,
      title: "Delete one forever",
      body: "<p>The bin at the end of a row deletes that page forever. Slate asks first.</p>",
      try: "Click the bin on the first row.",
    },
    {
      screen: "trash-delete",
      spot: { css: "[role=dialog]" },
      title: "This one can't be undone",
      body:
        "<p>Deleting forever also deletes the pages nested inside. Past branches inside are kept, so a branch's history is never lost with a scratch page.</p>" +
        "<p>An app deleted forever takes every version of it and the data it kept.</p>",
    },
    {
      screen: "trash",
      spot: { text: "Empty Trash", exact: true },
      click: true,
      title: "Empty Trash",
      body: "<p><strong>Empty Trash</strong> deletes everything here forever, after one confirmation.</p>",
      try: "Click <strong>Empty Trash</strong>.",
    },
    {
      screen: "trash-empty",
      spot: { css: "[role=dialog]" },
      title: "One last check",
      body:
        "<p>The dialog says how many items go. <strong>Cancel</strong> keeps them all; nothing is deleted until you confirm.</p>",
    },
    {
      screen: "trash",
      spot: { text: "Checkout wireframes v1 (old)", up: 1 },
      title: "Try it: get an old page back",
      body:
        "<p>Someone asks what the first checkout wireframes looked like. Click <strong>Checkout wireframes v1 (old)</strong> to read it here, then <strong>Restore</strong> it.</p>" +
        "<p>It goes back into <strong>acme-web</strong>, where search and your AI tools can find it again.</p>",
    },
  ],
};
