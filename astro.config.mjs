// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sharpImageService } from "astro/config";

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
