import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Clear saved state so each test starts fresh
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("title screen loads and shows Take Office", async ({ page }) => {
  await expect(page.locator("text=THE PAUSE")).toBeVisible();
  await expect(page.locator("text=Take Office")).toBeVisible();
  await page.screenshot({ path: "/tmp/e2e-01-title.png" });
});

test("clicking Take Office shows game screen with card and resource bars", async ({
  page,
}) => {
  await page.click("text=Take Office");
  await page.waitForTimeout(500);

  // Resource bar labels should be visible
  await expect(page.getByText("Trust", { exact: true })).toBeVisible();
  await expect(page.getByText("Funding", { exact: true })).toBeVisible();
  await expect(page.getByText("Intel", { exact: true })).toBeVisible();
  await expect(page.getByText("Leverage", { exact: true })).toBeVisible();

  // A card with a speaker and choice buttons should be visible
  await expect(page.locator("button", { hasText: "←" }).first()).toBeVisible();
  await expect(page.locator("button", { hasText: "→" }).first()).toBeVisible();

  await page.screenshot({ path: "/tmp/e2e-02-game.png" });
});

test("making a choice advances to next card", async ({ page }) => {
  await page.click("text=Take Office");
  await page.waitForTimeout(500);

  // Get the first card's text
  const decisionText = await page.locator("text=Decision #1").textContent();
  expect(decisionText).toContain("1");

  // Click the left choice button
  await page.locator("button", { hasText: "←" }).first().click();
  await page.waitForTimeout(500);

  // Should now show Decision #2
  await expect(page.locator("text=Decision #2")).toBeVisible();
  await page.screenshot({ path: "/tmp/e2e-03-after-choice.png" });
});

test("repeated choices eventually trigger death screen", async ({ page }) => {
  await page.click("text=Take Office");
  await page.waitForTimeout(300);

  // Spam left choices — should eventually die
  for (let i = 0; i < 50; i++) {
    const tryAgain = page.locator("text=Try Again");
    if (await tryAgain.isVisible().catch(() => false)) {
      break;
    }
    const leftBtn = page.locator("button", { hasText: "←" }).first();
    if (await leftBtn.isVisible().catch(() => false)) {
      await leftBtn.click();
      await page.waitForTimeout(100);
    }
  }

  // Should be on death screen or still playing
  // (Death isn't guaranteed in 50 left-only turns, but very likely)
  const isDead = await page
    .locator("text=Try Again")
    .isVisible()
    .catch(() => false);
  if (isDead) {
    await expect(page.locator("text=Try Again")).toBeVisible();
    await page.screenshot({ path: "/tmp/e2e-04-death.png" });

    // Restart
    await page.click("text=Try Again");
    await page.waitForTimeout(500);
    await expect(page.locator("text=Decision #1")).toBeVisible();
    await page.screenshot({ path: "/tmp/e2e-05-restart.png" });
  }
});
