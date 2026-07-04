# AGENTS.md

## Cursor Cloud specific instructions

This repository hosts Markdown-based slide decks. The active presentation is a
[Slidev](https://sli.dev/) project at `presentations/ai-slop-design-strategy/`.

### Running the presentation

- Standard commands live in `presentations/ai-slop-design-strategy/package.json`
  (`dev` / `build` / `export`). Run them from that directory.
- Dev server: `npm run dev` (or `npx slidev`) serves on `http://localhost:3030/`.
  It is a long-running Vite process — start it in a background/tmux session, not a
  blocking foreground call. Presenter mode is `/presenter/`, slide grid is `/overview/`.
- Node.js >= 20.12 is required (the VM's Node satisfies this).

### Non-obvious caveats

- Fonts (Instrument Serif / IBM Plex Sans JP / IBM Plex Mono) are loaded from
  Google Fonts via `index.html`. Rendering needs outbound network on first load;
  without it, text falls back to system fonts but still renders (no crash).
- Global CSS in `styles/index.css` is intentionally scoped under `.slidev-layout`.
  Slidev injects `styles/index.*` globally (it also affects the presenter UI), so
  keep new rules scoped to `.slidev-layout` to avoid leaking into presenter mode.
- Slide-level look is driven by the `class:` frontmatter (`lead` / `invert` /
  `accent`) plus `layout: center` for title/closing slides.
- `canvasWidth: 1280` in the headmatter matches the original Marp 16:9 sizing;
  changing it rescales every slide's relative font sizes.
- `npm run export` (PDF/PNG/PPTX) additionally needs `playwright-chromium`
  (`npm install -D playwright-chromium`); it is not part of the default install.
- `slidev build` may print harmless `[INVALID_ANNOTATION]` warnings from a
  dependency (`@vueuse/core`); the build still succeeds.
