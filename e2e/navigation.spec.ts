import { expect, test } from "@playwright/test";

const navLinks = [
	{ href: "/", text: "Home" },
	{ href: "/tours/", text: "Tours" },
	{ href: "/gallery/", text: "Gallery" },
	{ href: "/about/", text: "About" },
	{ href: "/contact/", text: "Contact" },
];

test.describe("navigation", () => {
	test("home page loads", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/.+/);
	});

	for (const link of navLinks) {
		test(`nav link "${link.text}" navigates to ${link.href}`, async ({
			page,
		}) => {
			await page.goto("/");
			await page
				.locator("header")
				.getByRole("link", { name: link.text, exact: true })
				.click();
			await expect(page).toHaveURL(
				new RegExp(`${link.href.replace(/\//g, "\\/")}$`),
			);
		});
	}
});
