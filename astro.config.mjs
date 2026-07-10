import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// https://astro.build/config
export default defineConfig({
  site: "https://donebysimon.be",
  integrations: [sitemap()],
  // Generates srcset/sizes for <Image> and for markdown images alike.
  image: {
    layout: "constrained",
    responsiveStyles: true,
    // Nothing is ever displayed wider than the 75rem container, so the 2048/2560 candidates
    // Astro ships by default only bloat the build. 1600 covers the 45rem prose column at 2x.
    breakpoints: [480, 720, 960, 1280, 1600],
  },
  markdown: {
    rehypePlugins: [rehypeAccessibleEmojis],
  },
});
