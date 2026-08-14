import { expect, test } from "@playwright/test";

test.describe("footer", () => {
	test("shows current year copyright and social links", async ({ page }) => {
		await page.goto("/");

		const footer = page.locator("footer");
		const year = new Date().getFullYear().toString();
		await expect(footer).toContainText(year);

		await expect(
			footer.getByRole("link", { name: "Instagram" }),
		).toHaveAttribute("href", /instagram\.com/);
		await expect(
			footer.getByRole("link", { name: "LinkedIn" }),
		).toHaveAttribute("href", /linkedin\.com/);
	});

	test("mailto link points to contact email", async ({ page }) => {
		await page.goto("/");
		await expect(
			page
				.locator("footer")
				.getByRole("link", { name: "scenicphototours@gmail.com" }),
		).toHaveAttribute("href", "mailto:scenicphototours@gmail.com");
	});
});
