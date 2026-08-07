import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const toursCollection = defineCollection({
    // Use the glob loader to target files in src/content/tours/
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours" }),
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        image: z.string(),
        href: z.string(),
        featured: z.boolean().default(false),
    }),
});

export const collections = {
    tours: toursCollection,
};