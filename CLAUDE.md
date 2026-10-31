# donebysimon.be

Simon Vanherweghe's personal maker's blog. Astro 5 static site deployed to GitHub Pages
(push to `main` → `gh-pages` → live at https://donebysimon.be). Posts are a first-person log
of creative-coding and craft projects (plotters, bots, cards, games). English posts, a Dutch
archive. Public repo — no session links or private trailers in commits.

Design work is governed by the Design Context below (fuller version in `.impeccable.md`).
Read it before building or changing any UI.

## Design Context

### Users
Casual visitors curious about what Simon makes — makers, developers, students (he lectures in
web dev / creative code), and people who received a physical project. Browsing casually to read
a story and enjoy, not task-driven.

### Voice vs. visual
- **Voice**: humble, playful, self-deprecating maker's log ("Mostly experiments, occasionally
  finished."). Shows the failures.
- **Visual register**: constructed, confident, calm. NOT beige, NOT retro, NOT craft-textured,
  NOT childish.

### Aesthetic: "Composition" (signed off 2026-10-31; build in progress until merged)
Structure inspired by Sophie Taeuber-Arp, with Molnar and Nees as influences on method only.
- **Structure**: header, hero, post header, pagination and footer are a 12-column grid of
  abutting planes with 2px rules. Photos are planes; circles are punctuation inside a plane.
- **Two speeds**: bold planes up top; the post gallery and reading text stay quiet (space only,
  no rules, dots, labels or colour).
- **Type**: Jost (display, weight 600, lowercase via CSS), Albert Sans (body and metadata),
  system monospace for code. Self-hosted via `@fontsource-variable`. Headline leading 1.04,
  never below 1.0.
- **Palette** (`src/css/tokens.css`): pure white ground, ink, red, blue, black planes, cool grey.
  Exact hex values per theme are in `.impeccable.md`.
- **Interaction**: quiet: hover/focus = a title underline. No image hover-zoom.

### Principles
1. The page is a composition: colour is structure, not decoration.
2. Bold planes, quiet content.
3. Influence through structure: never quote how an artwork looks.
4. Legible first (measure, contrast, rhythm).
5. No AI tells: no beige, hover-zoom, gradient text, glassmorphism, or side-stripe borders.
6. Both themes as equals; accessibility in the DNA (alt text, visible focus, reduced-motion,
   WCAG-AA verified in both themes).
