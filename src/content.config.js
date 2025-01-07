import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts/" }),
  schema: z.object({
    title: z.string(),
    permalink: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    preview: z.string(),
    date: z.date(),
  }),
});
const archiveCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/archive/" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    permalink: z.string(),
    description: z.string().optional(),
    preview: z.string().optional(),
  }),
});

export const collections = {
  posts: postCollection,
  archive: archiveCollection,
};
