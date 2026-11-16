// Projects: the workspace's docs. Groups and projects are folders made from your folders;
// plans, designs and notes are docs you write in a block editor, filed by type.
export const projects = {
  id: "projects",
  title: "Projects",
  place: "Projects",
  icon: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',
  links: [
    { match: { text: "Checkout redesign", exact: true }, step: 4 },
  ],
  steps: [
    {
      screen: "projects",
      spot: { css: "main" },
      spotOpts: { pad: 0 },
      title: "Your work, as docs",
      body: "<p><strong>Projects</strong> holds everything you and your agents write about your work: plans, designs, reviews, bug reports and notes. It is one tree of docs, stored in a single file on your machine.</p><p>The tree is on the left. Pick a doc and it opens here, in a tab.</p>",
    },
    {
      screen: "projects",
      spot: { css: "aside" },
      title: "Groups, projects and type folders",
      body: "<p>A <strong>project</strong> is a folder you open, usually a git repository: <strong>atlas</strong>. A <strong>group</strong> collects related projects: <strong>Acme</strong>. Both are folders in the tree, and their actions are in the folder's <strong>⋯</strong> menu. One project stays open at a time.</p><p>Inside a project, docs sit in a folder per type: <strong>Plans</strong>, <strong>Designs</strong>, <strong>Reviews</strong>, <strong>Bugs</strong> and <strong>Notes</strong>.</p><p><strong>Docs</strong> | <strong>Code</strong>, above the tree, switches the side panel between these docs and the project's own files.</p>",
    },
    {
      screen: "projects",
      spot: { text: "All projects", exact: true },
      click: true,
      title: "Narrow to one project",
      body: "<p>The project picker at the top of the side panel narrows the tree to one project. Projects keeps its own choice; Automations, Activity, Artifacts and Memory each have their own.</p>",
      try: "Open the picker: click <strong>All projects</strong>.",
    },
    {
      screen: "projects-picker",
      spot: { text: "Manage projects…", up: 2 },
      title: "Add and manage projects",
      body: "<p>Pick a project, or go back to <strong>All projects</strong>. At the foot of the list, <strong>New project…</strong> asks for a folder and takes its name from it. <strong>Manage projects…</strong> lists them by group, where you rename one or move it to Trash.</p><p>The <strong>+</strong> at the top of the side panel also makes a new project, and both commands are in <kbd>⌘K</kbd>.</p>",
    },
    {
      screen: "projects-plan",
      spot: { text: "Edited ", up: 2 },
      title: "The doc header",
      body: "<p>The breadcrumbs show where the doc lives: <strong>Acme / atlas / Plans / Checkout redesign</strong>. A click on <strong>Plans</strong> shows that folder in the tree.</p><p>On the right: when it was last edited, find in doc (<kbd>⌘F</kbd>), the star that adds it to <strong>Favorites</strong> at the top of the tree, and <strong>⋯</strong> for the rest, such as moving the doc or Move to Trash.</p>",
    },
    {
      screen: "projects-plan",
      spot: { text: "Plans", exact: true },
      title: "Every doc has a type",
      body: "<p>A doc's type is the folder it sits in, here <strong>Plans</strong>. Some types say under the title what the doc decided: a design's decision, a bug's severity, a review's verdict. Your agents write that line; to change it, ask the AI helper.</p><p>A type tells your agents what the doc is for. It is set when the doc is made and stays; for a different type, make another doc.</p>",
    },
    {
      screen: "projects-type",
      spot: { css: 'aside button[aria-label="New Plan in atlas"]' },
      spotOpts: { pad: 6 },
      title: "Make a doc where it goes",
      body: "<p>The <strong>+</strong> on a type folder makes an empty doc of that type in that project. <kbd>⌘N</kbd> makes a plain doc, and <kbd>⌘K</kbd> has <strong>New Plan</strong>, <strong>New Review</strong> and the rest.</p><p>A new doc starts empty: you write it, or ask your agent to.</p>",
    },
    {
      screen: "projects-plan",
      spot: { css: ".ProseMirror" },
      spotOpts: { pad: 4 },
      title: "A block editor",
      body: "<p>Docs are written in blocks: headings, lists, check items, quotes, code, tables, images. A <code>mermaid</code> code block draws as a diagram. Drag a block by its handle to move it. Paste Markdown and it becomes real blocks.</p><p>Your agents read and write the same docs through Slate. When one changes the doc you have open, you see it within seconds, and if you are typing at the time, your text is kept.</p>",
    },
    {
      screen: "projects-slash",
      spot: { text: "Heading 1", up: 1 },
      title: "Type / for any block",
      body: "<p>On an empty line, type <kbd>/</kbd> to open the slash menu and insert any block without leaving the keyboard: headings, lists, code, a table, an image or a callout.</p>",
    },
    {
      screen: "projects-slash-doc",
      spot: { text: "Link to doc", up: 1 },
      title: "Link docs together",
      body: "<p>Keep typing to filter: <kbd>/doc</kbd> finds <strong>Link to doc</strong>, which drops a link to another doc. <kbd>@</kbd> does the same inline, without leaving the sentence.</p>",
    },
    {
      screen: "projects-type",
      spot: { css: 'aside button[aria-label="New Plan in atlas"]' },
      spotOpts: { pad: 6 },
      title: "Try this: write a plan",
      body: "<p>Open your project and press <strong>+</strong> on its <strong>Plans</strong> folder. Give the plan a title and write the steps, or ask your agent to.</p><p>Every AI session on that project can now read it.</p>",
    },
  ],
};
