import { test, expect } from "@playwright/test";

test("page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/OpenAI/);
});

test("can advance and see emails", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  // Clear any saved state
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Tutorial email should be visible on day 1
  await expect(page.locator("text=IT Support")).toBeVisible();

  // Click the advance button (>> icon)
  await page.click("[title^='Skip to']");

  // Should see the board email
  await expect(page.locator("text=Richard Townsend")).toBeVisible();
  await page.screenshot({ path: "/tmp/inbox-with-emails.png" });

  // Click on it
  await page.click("button:has-text('Richard Townsend')");
  await expect(page.locator("text=Q3 Board Summary")).toBeVisible();
  await page.screenshot({ path: "/tmp/email-detail.png" });
});
