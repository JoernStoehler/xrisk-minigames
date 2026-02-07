import { test, expect } from "@playwright/test";

test("loads quiz and shows first question", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/X-Risk/);
  await expect(page.getByText("Question 1 of 5")).toBeVisible();
});

test("can answer a question and see explanation", async ({ page }) => {
  await page.goto("/");
  await page.getByText(/orthogonality thesis/i).waitFor();
  await page.getByRole("button").first().click();
  await expect(page.getByText(/correct|not quite/i)).toBeVisible();
});
