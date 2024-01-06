import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  type: "content", 
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
  type: "content", 
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
