import { expect, test } from "@playwright/test";

test.describe("tours", () => {
	test("tours listing shows at least one tour card linking to a detail page", async ({
		page,
	}) => {
		await page.goto("/tours/");
		await expect(
			page.getByRole("heading", { name: "Expeditions & Tours" }),
		).toBeVisible();

		const tourLinks = page.locator('a[href^="/tours/"]:not([href="/tours/"])');
		await expect(tourLinks.first()).toBeVisible();
	});

	test("clicking a tour card opens its detail page", async ({ page }) => {
		await page.goto("/tours/");
		const firstTourLink = page
			.locator('a[href^="/tours/"]:not([href="/tours/"])')
			.first();
		const href = await firstTourLink.getAttribute("href");
		await firstTourLink.click();
		await expect(page).toHaveURL(new RegExp(`${href}$`));
	});
});
