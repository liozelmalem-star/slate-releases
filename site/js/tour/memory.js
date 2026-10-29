// Memory — what every connected AI tool saved, on one map, and the review queue for what
// they proposed to change. Screens: memory-m, memory-card, memory-country,
// memory-decisions, memory-search (captured from the seeded demo workspace).
export const memory = {
  id: "memory",
  title: "Memory",
  place: "Memory",
  icon: '<path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>',
  links: [{ match: { text: "decisions" }, step: 8 }],
  steps: [
    {
      screen: "memory-m",
      spot: { text: "What Slate remembers, learned from your sessions", up: 2 },
      title: "What every AI tool learned, in one place",
      body: "<p><strong>Memory</strong> is what your AI tools saved while they worked — decisions with their reasons, preferences, lessons, where things stand. One tool saves it; every tool gets it back.</p><p>Nothing here was typed by hand. It arrives as sessions end.</p>",
    },
    {
      screen: "memory-m",
      spot: { text: "50 active", up: 1 },
      title: "How much of it is earning its place",
      body: "<p>The chips along the top are the colour key and the filters: <strong>used this month</strong> in green, <strong>never used</strong> in amber, <strong>new this week</strong> in blue.</p><p>A memory nobody uses is a hint it can go. Click a chip to see only those.</p>",
    },
    {
      screen: "memory-m",
      spot: { text: "Click a folder to go into it", up: 1 },
      title: "A map of your code, not a list",
      body: "<p>Each memory sits on the folder it cites, so the map looks like your project: <strong>acme-api</strong>, <strong>Other</strong>, and <strong>General</strong> for memories that cite no file.</p><p>A green dot was used in the last 30 days, a blue one was written this week, and a grey one was used before that. A hollow ring was never used.</p>",
      try: "Click a folder to go into it.",
      click: { css: "main canvas" },
    },
    {
      screen: "memory-card",
      spot: { text: "Prefer aria attributes over custom data-* attributes", up: 2 },
      title: "One memory, in full",
      body: "<p>Click any dot to open its card: the sentence, how many sessions were <strong>given</strong> it and how many <strong>used</strong> it, what it is linked to, and the <strong>Session that wrote it</strong>.</p><p><strong>Pin</strong> keeps it in front, <strong>Hide from sessions</strong> stops handing it out, <strong>Protect</strong> keeps tidying away from it.</p>",
    },
    {
      screen: "memory-m",
      spot: { text: "Needs review", up: 3 },
      title: "Nothing changes behind your back",
      body: "<p>AI tools can propose to tidy memory — merge two that say the same thing, retire one that is wrong — but nothing changes until you accept it here, under <strong>Needs review</strong>.</p>",
    },
    {
      screen: "memory-m",
      spot: { text: "Claude Code proposes to merge 2 memories", up: 1 },
      title: "A merge, proposed by Claude Code",
      body: "<p>The two old sentences are struck through, the merged one is under <strong>Into</strong>, and <strong>Why</strong> says what made Claude Code propose it.</p>",
      try: "Click <strong>Merge</strong> to accept it.",
      click: { text: "Merge", exact: true },
      after: (root, find) => {
        const b = find({ text: "Merge", exact: true });
        const card = b?.closest("div")?.parentElement;
        if (card) card.style.opacity = ".35";
      },
    },
    {
      screen: "memory-m",
      spot: { text: "Gemini disagreed with a surer memory", up: 1 },
      title: "When two tools disagree",
      body: "<p>Gemini wrote that rate limits use a sliding window; Slate already holds, more surely, that they use a token bucket. A claim that contradicts a firmer memory is held, not saved.</p><p><strong>Keep existing</strong>, <strong>Replace it</strong> or <strong>Keep both</strong> — your call.</p>",
    },
    {
      screen: "memory-country",
      spot: { text: "Migrations are additive only", up: 2 },
      title: "Reading a memory",
      body: "<p>Each row shows its kind — <strong>decision</strong>, <strong>preference</strong>, <strong>fact</strong>, <strong>lesson</strong> or <strong>status note</strong> — the sentence, its ref (<code>m:…</code>, which sessions cite it by), the AI tool that wrote it, and how often it was used and by whom.</p><p>Wrong? Click <strong>edit</strong> and fix it; the next session reads the correction.</p>",
    },
    {
      screen: "memory-m",
      spot: { text: "decisions" },
      title: "Filter by kind",
      body: "<p>The counts under the search are filters too: <strong>facts</strong>, <strong>preferences</strong>, <strong>decisions</strong>, <strong>lessons</strong>, <strong>status notes</strong>.</p>",
      try: "Click <strong>decisions</strong>.",
      click: true,
    },
    {
      screen: "memory-decisions",
      spot: { text: "Filters:", up: 1 },
      title: "Every decision, with its reason",
      body: "<p>Only decisions now — each one saved with the reason it was made, so the next tool knows not just <em>what</em> was chosen but <em>why</em>. <strong>Clear all</strong> brings the rest back.</p>",
    },
    {
      screen: "memory-search",
      spot: { css: "input[value='pnpm']" },
      spotOpts: { pad: 8 },
      title: "Search memories, files and refs",
      body: "<p>Search finds memories by their words, by the file they cite, or by ref. The map dims everything that does not match.</p>",
    },
    {
      screen: "memory-m",
      spot: { text: "What Slate remembers, learned from your sessions", up: 2 },
      title: "Try it",
      body: "<p>In any connected tool — Claude Code, Codex, Cursor, Gemini or OpenCode — make a decision and say why. When the session ends it lands here.</p><p>Then open a <em>different</em> tool and ask what was decided. It recalls the same memory, without you pasting anything.</p>",
    },
  ],
};
