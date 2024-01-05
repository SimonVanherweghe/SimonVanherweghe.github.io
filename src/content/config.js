// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
// 2. Define your collection(s)
const postCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    permalink: z.string(),
    tags: z.array(z.string()),
    preview: z.string().optional(),
    date: z.date(),
  }),
});
const archiveCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    permalink: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  posts: postCollection,
  archive: archiveCollection,
};
