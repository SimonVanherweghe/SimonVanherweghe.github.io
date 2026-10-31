# Composition Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the look of donebysimon.be in the signed-off "Composition" direction, without changing content, URLs or IndieWeb behaviour.

**Architecture:** Tokens first, so every page restyles at once. Then a shared `.comp` plane grid in `main.css` used by header, footer, hero, post header and pagination. Components keep their scoped `<style>` blocks.

**Tech Stack:** Astro 7, plain CSS, `@fontsource-variable/jost`, `@fontsource-variable/albert-sans`, `node:test`.

**Spec:** `.impeccable.md`, section "Aesthetic Direction: Composition". The canvas boards D-Home, D-Post and their mobile and 1920 variants are the visual reference; the link is private, so ask for it rather than storing it here.

## Global Constraints

- Work on branch `redesign-composition`. Pushing to `main` deploys live: merge only after explicit approval.
- Public repo: no session links, artifact links or `Claude-Session:` trailers in commits.
- Do not commit `.playwright-mcp/` or canvas files.
- Breakpoints: mobile below `860px`, three-column gallery from `1600px`, composition capped at `120rem`, reading measure `45rem`.
- Keep unchanged: permalinks, RSS, `h-entry` microformats, `rel="me"` links, the webmention `<link>`s, skip link, theme toggle and its no-flash script.
- Grid rows stay flush with the container edges.
- No entrance animations, hover-zoom, or colour in the gallery.

## Where the build deliberately differs from the canvas

- Nav is the real Blog, About and ThemeToggle, not the canvas's placeholder links. Footer keeps its six real links.
- Every post has a required `preview`, so colour stand-in planes, `kind` and schema changes are not needed.
- Post details show real data (date, tags, author). The canvas's "made with / rule / copies" was invented for the mockup.
- In-body images come from Markdown and stay in the text column. The composed blue/grey figure row is dropped.
- Dark `--red` and `--focus` differ from the boards, to pass AA.

## Review Focus

1. A long single word such as "Waldschattenspiel" as a title at 390px: no horizontal scroll (Task 3 and 4 style, checked in Task 6).
2. First and last post, which have only one pagination link: the plane fills the row rather than leaving a gap (Task 4).
3. Focus ring on a blue or red plane: stays visible, because it uses `currentColor` there (Task 2, asserted in Task 6).
4. Manual theme toggle against system preference: `[data-theme]` overrides must carry every new token (Task 1 test).
5. Dutch archive posts with no `preview` on the post page: no empty photo plane (Task 4 test).

---

### Task 1: Tokens, fonts and test harness

**Files:**
- Create: `tests/contrast.test.mjs`, `tests/site.test.mjs`
- Modify: `package.json`, `src/css/tokens.css`, `src/css/typo.css`, `src/css/main.css`, `src/css/markdown.css`, `src/layouts/BaseLayout.astro`, `src/env.d.ts`

**Interfaces:**
- Produces: tokens `--bg --ink --soft --red --blue --grey --k --on-k --focus --line`, plus `--on-plane: #FFFFFF`; fonts `--font-display`, `--font-body`, `--font-mono`; `--max-width: 120rem`; `npm test`.

- [ ] **Step 1: Create the branch**

Run: `git switch -c redesign-composition`

- [ ] **Step 2: Add `"test": "node --test tests/"` to `package.json` and write the failing tests**

`tests/contrast.test.mjs` parses `src/css/tokens.css`, reading each token from the `:root`, `prefers-color-scheme: dark` and `[data-theme]` blocks, using a WCAG relative-luminance helper.

```js
test('light and dark token pairs pass AA', () => {
  for (const theme of ['light', 'dark']) {
    const t = tokens(theme);
    assert.ok(ratio(t['--ink'], t['--bg']) >= 4.5);
    assert.ok(ratio(t['--soft'], t['--bg']) >= 4.5);
    assert.ok(ratio('#FFFFFF', t['--red']) >= 4.5);
    assert.ok(ratio('#FFFFFF', t['--blue']) >= 4.5);
    assert.ok(ratio(t['--on-k'], t['--k']) >= 4.5);
    assert.ok(ratio(t['--focus'], t['--bg']) >= 3);
  }
});
test('every dark token is also in the [data-theme=dark] override', () => { /* same key set, same values */ });
```

`tests/site.test.mjs` reads `dist/` HTML and CSS after a build:

```js
test('old fonts are gone', ...);          // no "Bricolage", "Hanken", "Fragment Mono" in dist/**/*.css
test('theme-color matches the ground', ...); // index.html has #FFFFFF and #0F0F0F, not #faf7f0
test('IndieWeb markup survives', ...);    // a post page has h-entry, p-name, dt-published, e-content;
                                          // index.html has rel="me" links and rel="webmention"
```

- [ ] **Step 3: Run to verify failure**

Run: `npm run build && npm test`
Expected: FAIL on contrast (tokens missing) and old fonts.

- [ ] **Step 4: Swap the fonts**

Run: `npm i @fontsource-variable/jost @fontsource-variable/albert-sans && npm rm @fontsource-variable/bricolage-grotesque @fontsource-variable/hanken-grotesk @fontsource/fragment-mono`

Update the imports in `BaseLayout.astro` and the declarations in `env.d.ts`. Before removing, run `grep -rni "bricolage\|hanken\|fragment" src` to confirm that nothing else, including `src/pages/og/`, depends on them.

- [ ] **Step 5: Replace the palette in `tokens.css`**

Use the spec's table, in all of `:root`, the dark media query and both `[data-theme]` blocks. Re-point the semantic names so existing components restyle: `--color-bg: var(--bg)`, `--color-text: var(--ink)`, `--color-accent: var(--ink)`, `--color-spark: var(--red)`, `--ink-soft` and `--ink-faint: var(--soft)`, `--rule: var(--grey)`, `--rule-strong: var(--ink)`. Remove `--hero-blue` and `--on-hero`. Set `--paper-sunk` to `#F2F3F4` light and `#1A1A1A` dark. `--font-mono` becomes `ui-monospace, 'SFMono-Regular', Menlo, monospace`. Replace `var(--font-mono)` with `var(--font-body)` everywhere except code in `markdown.css`, and remove the uppercase letter-spacing on those metadata labels.

- [ ] **Step 6: Update base styles**

`typo.css`: headings use Jost 600, `text-transform: lowercase`, `line-height: 1.04`, and `overflow-wrap: break-word`; remove `font-variation-settings`. `main.css`: `main` loses its padding and max-width to `max-width: var(--max-width)` only; `.page` gains `padding-inline: 1.75rem` (`1.25rem` below 860px). Links in prose: ink, 2px underline, red on hover. `:focus-visible` uses `--focus`. `::selection` and `.skip-link` use `--blue` with white text. `BaseLayout.astro`: `theme-color` to `#FFFFFF` and `#0F0F0F`.

- [ ] **Step 7: Run to verify**

Run: `npm run build && npm test && npm run check`
Expected: all PASS, no new check errors.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tests src
git commit -m "feat: composition tokens and fonts"
```

### Task 2: Plane grid, header and footer

**Files:**
- Modify: `src/css/main.css`, `src/components/Header.astro`, `src/components/Footer.astro`, `tests/site.test.mjs`

**Interfaces:**
- Consumes: Task 1 tokens.
- Produces: global classes `.comp` (12-col grid, no gap, 4-col below 860px), `.plane` (sets `--focus` ring to `currentColor`), `.plane--red`, `.plane--blue`, `.plane--k`. Below 860px, children of `.comp` span 4 unless they use `.m1`, `.m2`, `.m3`.

- [ ] **Step 1: Add the failing test**

```js
test('header keeps nav and theme toggle', ...); // index.html: nav[aria-label="Main"] has /blog and /about, and a theme toggle button
```

- [ ] **Step 2: Run to verify failure, implement `.comp` and `.plane` in `main.css`**

Use `repeat(12, minmax(0,1fr))` on desktop, `repeat(4, minmax(0,1fr))` below 860px, with `!important` on the mobile span helpers only if scoped styles need overriding.

- [ ] **Step 3: Rebuild `Header.astro`**

Row height 72px, 2px bottom rule. Wordmark `donebysimon` in `.plane--k`, Jost 600 24px, columns 1–3 (`.m3`). Red plane column 4 (`.m1`, `aria-hidden`). Nav columns 5–12, right-aligned, 36px gap, Jost 500 18px lowercase, with `ThemeToggle` last; left-aligned on its own row on mobile, 24px gap. Remove the wordmark dot. Keep `aria-current`.

- [ ] **Step 4: Rebuild `Footer.astro`**

72px row, 2px top rule: `donebysimon.be` columns 1–6, blue plane column 7 (hidden on mobile), links columns 8–12. Keep the `links` array with its `rel` logic; let links wrap on mobile, as six do not fit in one row. Row height becomes a minimum.

- [ ] **Step 5: Verify and commit**

Run: `npm run build && npm test`
Expected: PASS.

```bash
git add src tests
git commit -m "feat: plane header and footer"
```

### Task 3: Home hero and post gallery

**Files:**
- Modify: `src/layouts/Home.astro`, `src/components/PostsList.astro`, `src/components/Post.astro`, `src/pages/index.md`, `tests/site.test.mjs`

**Interfaces:**
- Consumes: `.comp`, `.plane*`.
- Produces: `PostsList` stays `{ posts }`; `Post` becomes `{ post, priority?: boolean }` (drop `index`). The tag pages reuse this gallery unchanged.

- [ ] **Step 1: Add failing tests**

```js
test('home title splits on two lines', ...); // h1 has "things done" + <br> + "by simon"
test('newest post is in the hero, not repeated in the gallery', ...); // its permalink appears in the hero and not in .post-list
test('the gallery has no entry animation', ...); // no entry-in or hero-in keyframes in dist css
```

- [ ] **Step 2: Run to verify failure, then rebuild the hero in `Home.astro`**

Hardcode the h1 as `things done<br />by simon` and remove `heading` from `index.md`. Keep `allPosts[0]` as `latest`, pass `allPosts.slice(1)` to `PostsList`. Grid placement, on `.comp` with `grid-auto-rows: minmax(120px, auto)` and a 2px bottom rule:

| Element | Column | Row | Mobile |
| --- | --- | --- | --- |
| h1 (`clamp(3.25rem, 7.4vw, 8.75rem)`, end-aligned) | 1–7 | 1–2 | span 4 |
| Red plane | 8–9 | 1 | `.m2`, min-height 72px |
| Blue plane, centred white 64px SVG circle | 10–12 | 1 | `.m2`, 40px circle |
| Latest photo link, `priority` | 8–12 | 2–4 | span 4, min-height 300px |
| Black plane: "latest", date, tags | 1–2 | 3–4 | span 4 |
| Latest title (44px) and description | 3–7 | 3–4 | span 4 |

The photo fills its plane with `aspect-ratio: auto; height: 100%`, and needs no hover effect.

- [ ] **Step 3: Rebuild the gallery**

`PostsList`: heading row "all work" (`h2`, 34px, padding `96px 28px 40px`) with "N projects" on the right, hidden on mobile. Remove all `nth-child` rules. Spec's grid values with `1.75rem` side padding and `128px` bottom padding; `88px` bottom padding and `56px` row gap on mobile. Tag pages show the same heading row with the tag name instead, via an optional `heading` prop defaulting to "all work".

`Post`: photo `aspect-ratio: 3 / 2`, 20px gap, then date (14px, `--soft`), title (30px, 26px on mobile), description (17px, `--soft`), text `max-width: 46ch`. Whole card links; hover underlines the title. Remove tags and `entry-in`. `sizes`: `(min-width: 1600px) 33vw, (min-width: 860px) 50vw, 100vw`; width `960`.

- [ ] **Step 4: Verify and commit**

Run: `npm run build && npm test`
Expected: PASS.

```bash
git add src tests
git commit -m "feat: composed home hero and calm post gallery"
```

### Task 4: Post page

**Files:**
- Modify: `src/pages/[...slug].astro`, `tests/site.test.mjs`

**Interfaces:**
- Consumes: `.comp`, `.plane*`. Props `post`, `next`, `prev` are unchanged.

- [ ] **Step 1: Add failing tests**

```js
test('post has a details column and h-entry intact', ...);   // aside[aria-label="Project details"] with date, tags, p-author
test('archive post without preview has no photo plane', ...); // pick a dist page from src/content/archive with no preview: no .post-photo
test('first and last post have a full-width pagination plane', ...); // only one link has class pagination__link--solo
```

- [ ] **Step 2: Run to verify failure, then rebuild the header**

`.comp`, 2px bottom rule: title + description in columns 1–8, rows 1–3, end-aligned (h1 `clamp(2.5rem, 6.8vw, 8rem)`; description 22px, `--soft`, `max-width: 44ch`). Red plane columns 9–10, row 1; black plane columns 11–12, row 1, with centred red circle 56px; photo columns 9–12, rows 2–3, `priority`, min-height 280px. Without a preview, the title spans columns 1–12 and the planes stay in row 1 by moving the title below them. Mobile: title, `.m2` red, `.m2` black with 36px circle, photo, description; put the description after the photo with `order`. Keep `p-name`, `p-summary`, `u-url`, `dt-published`, `h-card`.

- [ ] **Step 3: Rebuild the body**

12-col grid, `padding-block: 64px 72px`. Details aside columns 1–3: `dl` with date, tags (as links from `TagsList`), author, 2px top rule and 1px row rules, Jost lowercase `dt`. Text columns 4–9 in `.markdown`, `max-width: var(--max-width-content)`, 19px / 1.65; below 860px one column, details first, 1.25rem side padding. Webmentions stay under the text in the same column. Remove the border-bottom.

- [ ] **Step 4: Rebuild pagination**

`.comp` with `grid-auto-rows: minmax(140px, auto)` and 2px top rule. Older: `.plane--blue`, columns 1–6, left-aligned. Black 28px circle centred in column 7 on `--bg`, hidden on mobile. Newer: `.plane--red`, columns 8–12, right-aligned. When only one exists, it spans 1–12 with class `pagination__link--solo` and no circle. Label 14px; title Jost 600 32px. Keep the "from the archive" suffix; labels "older" and "newer".

- [ ] **Step 5: Verify and commit**

Run: `npm run build && npm test`
Expected: PASS.

```bash
git add src tests
git commit -m "feat: composed post page"
```

### Task 5: Secondary pages

**Files:**
- Modify: `src/pages/blog.astro`, `src/pages/archive.astro`, `src/pages/tags/index.astro`, `src/pages/tags/[tag].astro`, `src/pages/404.astro`, `src/components/ArchiveList.astro`, `src/components/TagsList.astro`, `src/components/Webmentions.astro`, `src/css/markdown.css`

These inherit tokens from Task 1, so this is a sweep rather than a rebuild.

- [ ] **Step 1: Find leftovers**

Run: `grep -rnE "font-variation-settings|font-weight: 800|text-transform: uppercase|hero-blue|--blue-ink|--blue-soft" src`
Expected: a list to clear. Replace each with Jost 600 or a spec token.

- [ ] **Step 2: Make h1s match, in lowercase Jost**

Use `clamp(2.5rem, 5vw, 4.5rem)` and leading 1.04. Pages keep their `.page` measure. No planes are added here: the header and footer carry the composition.

- [ ] **Step 3: Pass the tag name to `PostsList` as `heading`**

- [ ] **Step 4: Verify and commit**

Run: `npm run build && npm test && grep -rnE "hero-blue|--blue-ink|--blue-soft" src`
Expected: tests PASS, grep finds nothing.

```bash
git add src
git commit -m "feat: align secondary pages with composition"
```

### Task 6: Verification and handover

**Files:**
- Modify: `CLAUDE.md` (remove "build in progress until merged"), any file a check below fails on.

- [ ] **Step 1: Screenshot and compare**

Run `npm run preview`. Use Playwright at 390, 1280 and 1920 wide, light and dark, on home, a post, an archive post, `/blog`, a tag page and `/404`. Compare home and post to the canvas boards.

- [ ] **Step 2: Check every post for overflow**

At 390px, evaluate `document.documentElement.scrollWidth <= innerWidth` on each page in `dist`.
Expected: true everywhere, including "Waldschattenspiel".

- [ ] **Step 3: Keyboard pass**

Tab through home and a post in both themes. Expected: skip link works, ring visible on white, black, red and blue planes, theme toggle works and survives reload without a flash, and reduced motion changes nothing.

- [ ] **Step 4: Run the `audit` and `polish` skills and fix P0 and P1 findings**

- [ ] **Step 5: Final check and commit**

Run: `npm run build && npm test && npm run check`
Expected: all PASS.

```bash
git add -A src tests CLAUDE.md
git commit -m "chore: composition redesign verification fixes"
```

- [ ] **Step 6: Stop and ask**

Share the branch for review. Do not merge to `main` without explicit approval.

Out of scope, for a follow-up: the OG image design in `src/pages/og/` still uses the old blue.
