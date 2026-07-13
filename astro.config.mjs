import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { accessibleEmojis } from "./src/lib/satteri-accessible-emojis.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://donebysimon.be",
  integrations: [sitemap()],
  // Astro 7's 'jsx' default strips the space between adjacent inline elements; the
  // templates rely on inline links inside prose, so keep the HTML-aware compression.
  compressHTML: true,
  // Generates srcset/sizes for <Image> and for markdown images alike.
  image: {
    layout: "constrained",
    responsiveStyles: true,
    // Nothing is ever displayed wider than the 75rem container, so the 2048/2560 candidates
    // Astro ships by default only bloat the build. 1600 covers the 45rem prose column at 2x.
    breakpoints: [480, 720, 960, 1280, 1600],
  },
  markdown: {
    processor: satteri({
      hastPlugins: [accessibleEmojis()],
    }),
  },
});
