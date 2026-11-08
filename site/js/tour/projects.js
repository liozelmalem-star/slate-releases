// Projects: the workspace's docs. Groups, projects and branches come from your folders and
// sessions; plans, designs and notes are docs you write in a block editor.
export const projects = {
  id: "projects",
  title: "Projects",
  place: "Projects",
  icon: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',
  links: [
    { match: { text: "Checkout redesign", exact: true }, step: 5 },
  ],
  steps: [
    {
      screen: "projects",
      spot: { css: "main" },
      spotOpts: { pad: 0 },
      title: "Your work, as docs",
      body: "<p><strong>Projects</strong> holds everything you and your agents write about your work: plans, designs, bug reports, meeting notes, and what each branch is up to. It is one tree of docs, stored in a single file on your machine.</p><p>It opens on an <strong>Overview</strong>: a card for each project, under its group, with the branch it is on and when it was last active.</p>",
    },
    {
      screen: "projects",
      spot: { css: "aside" },
      title: "Groups, projects, branches",
      body: "<p>A <strong>project</strong> is a folder you open, usually a git repository: <strong>atlas</strong>. A <strong>group</strong> collects related projects: <strong>Acme</strong>. Under a project are its <strong>branches</strong>, and under a branch the docs written on it: a Plan, a Design, a Bug Report.</p><p>A branch doc appears once something lands on it, a session, a document or a decision. When git removes the branch, its doc moves to <strong>Past branches</strong>; nothing is lost.</p><p><strong>Docs</strong> | <strong>Code</strong>, above the tree, switches the side panel between these docs and the project's own files. You do not build the outline by hand: Slate makes it from your folders and the sessions it captures.</p>",
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
      body: "<p>Pick a project, or go back to <strong>All projects</strong>. At the foot of the list, <strong>New project…</strong> asks for a folder and takes its name from it. <strong>Manage projects…</strong> lists them by group, where you rename one, open its doc or move it to Trash.</p><p>The same two commands are in the workspace menu at the top of the rail, and in <kbd>⌘K</kbd>.</p>",
    },
    {
      screen: "projects-sessions",
      spot: { css: 'main select[aria-label="Show the sessions of one branch"]', up: 2 },
      title: "A project's doc",
      body: "<p>A project opens on a doc of its own: the name, one line of description, and tabs that each count what they hold: <strong>Docs</strong>, <strong>Sessions</strong> and <strong>Memory</strong>.</p><p><strong>Sessions</strong> lists every session in the project, newest first, each with its git branch. A branch is only a label: pick one in <strong>All branches</strong> to see its sessions. <strong>Start session</strong>, in the header, starts an agent in the project's folder.</p>",
    },
    {
      screen: "projects-plan",
      spot: { text: "Edited ", up: 2 },
      title: "The doc header",
      body: "<p>The breadcrumbs show where the doc lives: <strong>Acme / atlas / Checkout redesign</strong>.</p><p>On the right: when it was last edited, find in doc (<kbd>⌘F</kbd>), the star that adds it to <strong>Favorites</strong> at the top of the tree, and <strong>⋯</strong> for the rest, such as moving the doc or Move to Trash.</p>",
    },
    {
      screen: "projects-plan",
      spot: { text: "Change the doc type" },
      click: true,
      title: "Every doc has a type",
      body: "<p>The chip under the title is the doc's type, here <strong>Plan</strong>, next to its status. A type tells your agents what the doc is for, and gives it a template.</p>",
      try: "Click the <strong>Plan</strong> chip.",
    },
    {
      screen: "projects-type",
      spot: { text: "Change it any time", up: 2 },
      title: "Seven types, each with a template",
      body: "<p><strong>Doc</strong>, <strong>Plan</strong>, <strong>Design</strong>, <strong>Test Plan</strong>, <strong>Bug Report</strong>, <strong>Review</strong> and <strong>Meeting</strong>. A new doc starts as a Doc.</p><p>Changing the type adds the new template's headings after what is already there. Nothing you wrote is lost, and switching back and forth adds them only once.</p>",
    },
    {
      screen: "projects-plan",
      spot: { css: ".ProseMirror" },
      spotOpts: { pad: 4 },
      title: "A block editor",
      body: "<p>Docs are written in blocks: headings, lists, to-do lists, quotes, code, tables, images. Drag a block by its handle to move it. Paste Markdown and it becomes real blocks.</p><p>Your agents read and write the same docs through Slate. When one changes the doc you have open, you see it within seconds, and if you are typing at the time, your text is kept.</p>",
    },
    {
      screen: "projects-slash",
      spot: { text: "Write with AI", up: 1 },
      title: "Type / for any block",
      body: "<p>On an empty line, type <kbd>/</kbd> to open the slash menu and insert any block without leaving the keyboard.</p><p>The first item, <strong>Write with AI</strong>, asks an agent to draft text into the doc. If a draft fails, the prompt stays open with the reason and a <strong>Retry</strong>.</p>",
    },
    {
      screen: "projects-slash-doc",
      spot: { text: "Doc card", up: 1 },
      title: "Link docs together",
      body: "<p>Keep typing to filter: <kbd>/doc</kbd> finds <strong>Link to doc</strong>, which drops an inline link, and <strong>Doc card</strong>, which embeds another doc as a preview. <kbd>@</kbd> also links a doc inline.</p><p><strong>Callout</strong>, in Basic blocks, sets a note apart from the text.</p>",
    },
    {
      screen: "projects",
      spot: { css: 'aside button[aria-label^="New doc"]' },
      title: "Try this: write a plan for a branch",
      body: "<p>Pick a project in the picker, then press <strong>New doc</strong> (<kbd>⌘N</kbd>). The button names where it goes; on <strong>All projects</strong> it goes under <strong>Everything else</strong>. The colored button beside it, <strong>Generate a doc</strong> (<kbd>⌘⇧G</kbd>), asks an agent to draft one instead.</p><p>Give it a title, set the type to <strong>Plan</strong>, fill in the headings, and drag it under its branch. Every AI session on that branch can now read it.</p>",
    },
  ],
};
