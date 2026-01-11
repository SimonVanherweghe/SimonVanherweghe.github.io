# Copilot instructions

## Build, lint, and test
- Install dependencies with `npm ci`.
- Build with `npm run build`.
- The OG image route (`src/pages/og/[...route].ts`) downloads fonts from `api.fontsource.org`; builds can fail offline—re-run with network access if you see `getaddrinfo ENOTFOUND`.
- No automated tests are defined at the moment.

## Development tips
- The site is an Astro project. Pages live in `src/pages`, components in `src/components`, and layouts in `src/layouts`.
- Content uses Astro content collections (see `src/content.config.js`).
- Keep required frontmatter fields intact when editing posts.
- Use `npm run dev` for local preview; avoid committing build outputs or editor artifacts.
