// @ts-check
import { test, expect } from "@playwright/test";

test("should submit form with new comic", async ({ page }) => {
  await page.goto("/");

  await page.locator('[placeholder="Aw yiss..."]').fill("e2e testing");

  await page.getByText("Make it so").click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/comic/);
});
