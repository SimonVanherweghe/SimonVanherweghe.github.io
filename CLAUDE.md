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
- **Visual register**: modern, fresh, subtle, confident. Clean and quiet with one bold moment.
  NOT warm-toned, NOT retro, NOT craft-textured, NOT loud.

### Aesthetic (shipped)
- **Type**: Bricolage Grotesque (display — wordmark/hero/titles, heavy ~800), Hanken Grotesk
  (body), Fragment Mono (small metadata only: dates, tags, counts, `Nº`). Self-hosted via
  `@fontsource`. No fantasy/antiqued serifs.
- **Palette** (OKLCH, `src/css/tokens.css`): cool near-white paper (NOT warm cream), cool
  blue-black ink, a single **blue** accent (riso-ish). Neutrals tinted toward blue. No orange.
  Full light + dark (cool dark).
- **Signature**: one bold solid-blue hero block with a big cream Bricolage headline (no
  tagline); blue as a quiet accent everywhere else (links, hover underlines, wordmark dot).
  Full-colour project photos lead. Whitespace + thin hairline rules. Kept spare: no section
  labels, no post numbering, no colophon line.
- **Interaction**: quiet — hover/focus = a blue title underline. No image hover-zoom.

### Principles
1. One bold moment (the blue hero), quiet everywhere else.
2. Blue is the only accent — used sparingly.
3. Cool, modern, fresh — never warm.
4. Legible first (measure ~65–75ch, contrast, rhythm).
5. No AI tells — no hover-zoom, gradient text, glassmorphism, or side-stripe borders.
6. Both themes as equals; accessibility in the DNA (alt text, visible focus, reduced-motion,
   WCAG-AA verified in both themes).
