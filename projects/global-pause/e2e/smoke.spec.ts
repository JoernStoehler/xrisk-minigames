import { test, expect } from "@playwright/test";

test("page loads with title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/The Pause/);
});

test("main menu shows difficulty options", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("THE PAUSE")).toBeVisible();
  await expect(page.getByText("Tutorial")).toBeVisible();
  await expect(page.getByText("Normal")).toBeVisible();
  await expect(page.getByText("Realistic")).toBeVisible();
});
