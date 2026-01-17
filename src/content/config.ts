import { defineCollection, z } from "astro:content";

const showcase = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      image: image(),
      url: z.string().url(),
      featured: z.number().min(1).optional(),
    }),
});

export const collections = {
  showcase,
  blog: defineCollection({
    type: "content",
    schema: ({ image }) =>
      z.object({
        title: z.string().min(1),
        excerpt: z.string().min(1),
        publishDate: z.date().optional(),
        heroImage: image().optional(),
      }),
  }),
};
