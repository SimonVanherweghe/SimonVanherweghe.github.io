import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts/" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      permalink: z.string(),
      tags: z.array(z.string()),
      description: z.string(),
      preview: image(),
      date: z.date(),
    }),
});
const archiveCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/archive/" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string()),
      date: z.date(),
      permalink: z.string(),
      description: z.string().optional(),
      preview: image().optional(),
    }),
});

export const collections = {
  posts: postCollection,
  archive: archiveCollection,
};
