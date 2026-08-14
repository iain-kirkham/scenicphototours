import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
	test("shows validation errors for invalid input", async ({ page }) => {
		await page.goto("/contact/");

		await page.getByRole("button", { name: "Send Message" }).click();

		await expect(page.locator("#name-error")).toBeVisible();
		await expect(page.locator("#email-error")).toBeVisible();
		await expect(page.locator("#message-error")).toBeVisible();
	});

	test("clears field error once corrected", async ({ page }) => {
		await page.goto("/contact/");

		const emailInput = page.locator("#email");
		await emailInput.fill("not-an-email");
		await emailInput.blur();
		await expect(page.locator("#email-error")).toBeVisible();

		await emailInput.fill("visitor@example.com");
		await expect(page.locator("#email-error")).toBeHidden();
	});

	test("pre-fills tour from query param", async ({ page }) => {
		await page.goto("/contact/");
		const tourSelect = page.locator("#tour");
		const firstTourOption = await tourSelect
			.locator("option")
			.nth(1)
			.getAttribute("value");
		test.skip(!firstTourOption, "No tours available to test pre-fill against");

		await page.goto(
			`/contact/?tour=${encodeURIComponent(firstTourOption as string)}`,
		);
		await expect(tourSelect).toHaveValue(firstTourOption as string);
	});

	test("shows success banner when arriving with success=true", async ({
		page,
	}) => {
		await page.goto("/contact/?success=true");
		await expect(page.locator("#form-success")).toBeVisible();
	});

	test("submit button disables while sending on valid submission", async ({
		page,
	}) => {
		await page.goto("/contact/");

		await page.locator("#name").fill("Jane Doe");
		await page.locator("#email").fill("jane@example.com");
		await page
			.locator("#message")
			.fill("I would love to join a photography tour!");

		const submitButton = page.getByRole("button", {
			name: /Send Message|Sending/,
		});
		await submitButton.click();
		await expect(submitButton).toBeDisabled();
	});
});
