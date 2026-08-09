// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { sharpImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
	image: {
		service: sharpImageService(),
		domains: [],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
