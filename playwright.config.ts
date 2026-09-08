import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	// astro preview's server does not handle many concurrent connections well;
	// keep a single worker so navigations don't time out under load.
	workers: 1,
	reporter: "html",
	use: {
		baseURL: "http://localhost:4321",
		trace: "on-first-retry",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	// In CI, Playwright starts and tears down `astro preview` itself.
	// Locally, reuse the self-managed `astro dev --background` server (see CLAUDE.md)
	// instead of spawning a second one.
	webServer: {
		command: "npm run preview",
		url: "http://localhost:4321",
		reuseExistingServer: !process.env.CI,
	},
});
