import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// https://astro.build/config
export default defineConfig({
  site: "https://donebysimon.be",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeAccessibleEmojis],
  },
});
