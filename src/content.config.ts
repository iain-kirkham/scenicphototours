import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const toursCollection = defineCollection({
	// Use the glob loader to target files in src/content/tours/
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string(),
			image: image(),
			href: z.string(),
			featured: z.boolean().default(false),
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
