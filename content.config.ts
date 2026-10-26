import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        // Plain text or simple inline HTML
        summary: z.string(),
        banner: z.string(),
        author: z.string(),
        topics: z.array(z.string()).default([]),
        publishedAt: z.string(),
        updatedAt: z.string().nullable().optional(),
        isHighlight: z.boolean().default(false),
        draft: z.boolean().default(false),
        // Filled at build time by the content:file:afterParse hook
        readingSeconds: z.number().default(0),
      }),
    }),
    project: defineCollection({
      type: "page",
      source: "project/*.md",
      schema: z.object({
        summary: z.string(),
        image: z.string(),
        repositoryUrl: z.string().nullable().optional(),
        websiteUrl: z.string().nullable().optional(),
        technologies: z.array(z.string()).default([]),
        publishedAt: z.string(),
        updatedAt: z.string().nullable().optional(),
        isHighlight: z.boolean().default(false),
        draft: z.boolean().default(false),
        sortOrder: z.number().default(999),
      }),
    }),
  },
});
