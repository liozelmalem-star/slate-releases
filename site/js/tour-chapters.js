// Placeholder while the screens are captured; replaced by the full chapter list.
export const CHAPTERS = [
  {
    id: "home", title: "Home", place: "Home",
    steps: [
      { screen: "home", spot: { text: "Set up Slate" , up: 3}, title: "Set up Slate", body: "<p>Three steps.</p>" },
      { screen: "home", spot: { text: "Search", clickable: true }, click: true, title: "Search everything", body: "<p>Press <kbd>⌘K</kbd>.</p>", try: "Click <strong>Search</strong>." },
      { screen: "home-palette", spot: { css: "input" }, title: "The palette", body: "<p>Type to search.</p>" },
    ],
  },
  { id: "memory", title: "Memory", place: "Memory", steps: [{ screen: "home-askai", title: "x", body: "y" }] },
];
