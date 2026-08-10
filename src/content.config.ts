import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const toursCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      image: image(),
      featured: z.boolean().default(false),
      date: z.string().optional(),
      time: z.string().optional(),
      duration: z.string().optional(),
      meetingPoint: z.string().optional(),
      whatToBring: z.array(z.string()).optional(),
    }),
});

const testimonialsCollection = defineCollection({
	loader: glob({
		pattern: "**/*.{md,json}",
		base: "./src/content/testimonials",
	}),
	schema: z.object({
		author: z.string(),
		quote: z.string(),
		location: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = {
	tours: toursCollection,
	testimonials: testimonialsCollection,
};
