import { test, expect } from "@playwright/test";

// Helper: clear state and start fresh
async function freshStart(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(300);
}

// Helper: click the advance button
async function advance(page: import("@playwright/test").Page) {
  await page.click("[title^='Skip']");
  await page.waitForTimeout(300);
}

test("page loads with tutorial email", async ({ page }) => {
  await freshStart(page);
  await expect(page).toHaveTitle(/OpenAI/);
  await expect(page.locator("text=IT Support")).toBeVisible();
  await expect(page.locator("text=Welcome — your new email is set up")).toBeVisible();
});

test("advancing delivers new emails", async ({ page }) => {
  await freshStart(page);

  // Day 1: only tutorial
  await expect(page.locator("text=IT Support")).toBeVisible();
  expect(await page.locator("button:has-text('Richard Townsend')").count()).toBe(0);

  // Advance to Oct 15 -> board email
  await advance(page);
  await expect(page.locator("text=Richard Townsend")).toBeVisible();
  await expect(page.locator("text=Q3 Board Summary")).toBeVisible();
});

test("reading an email marks it as read", async ({ page }) => {
  await freshStart(page);

  // Tutorial has blue dot (unread)
  const unreadDot = page.locator(".bg-\\[\\#3b82f6\\]");
  expect(await unreadDot.count()).toBe(1);

  // Click to read
  await page.click("button:has-text('IT Support')");
  await page.waitForTimeout(200);

  // Go back
  await page.click("[aria-label='Back to inbox']");
  await page.waitForTimeout(200);

  // No more blue dots
  expect(await unreadDot.count()).toBe(0);
});

test("star toggle works from inbox list", async ({ page }) => {
  await freshStart(page);

  // Star the tutorial email from the list
  const starBtn = page.locator("[aria-label='Star']");
  await starBtn.click();
  await page.waitForTimeout(200);

  // Should now show filled star (aria-label changes to Unstar)
  await expect(page.locator("[aria-label='Unstar']")).toBeVisible();
});

test("star toggle works from email detail", async ({ page }) => {
  await freshStart(page);

  // Open tutorial
  await page.click("button:has-text('IT Support')");
  await page.waitForTimeout(200);

  // Star from detail view
  await page.click("[aria-label='Star']");
  await page.waitForTimeout(200);

  // Go back and verify star shows
  await page.click("[aria-label='Back to inbox']");
  await page.waitForTimeout(200);
  await expect(page.locator("[aria-label='Unstar']")).toBeVisible();
});

test("reply flow works and triggers modifier", async ({ page }) => {
  await freshStart(page);

  // Advance to safety anomaly email (Oct 22)
  for (let i = 0; i < 4; i++) await advance(page);

  // Open safety email
  await page.click("button:has-text('Flagging')");
  await page.waitForTimeout(200);

  // Scroll to reply options
  await page.evaluate(() => document.querySelector(".overflow-y-auto")?.scrollTo(0, 9999));
  await page.waitForTimeout(200);

  // Should see reply options
  await expect(page.locator("button:has-text('Good catch')")).toBeVisible();

  // Click reply
  await page.click("button:has-text('Good catch')");
  await page.waitForTimeout(300);

  // Should show "You replied" confirmation
  await expect(page.locator("text=YOU REPLIED")).toBeVisible();

  // Go back - should see "Replied" badge
  await page.click("[aria-label='Back to inbox']");
  await page.waitForTimeout(200);
  await expect(page.locator("text=Replied")).toBeVisible();

  // Advance past +21 days to get investigation result email
  for (let i = 0; i < 3; i++) await advance(page);
  await expect(page.locator("text=Investigation Results")).toBeVisible();
});

test("localStorage persistence across reload", async ({ page }) => {
  await freshStart(page);

  // Read and star the tutorial
  await page.click("button:has-text('IT Support')");
  await page.waitForTimeout(200);
  await page.click("[aria-label='Star']");
  await page.waitForTimeout(200);
  await page.click("[aria-label='Back to inbox']");
  await page.waitForTimeout(200);

  // Advance to get more emails
  await advance(page);

  // Reload page — state should persist
  await page.reload();
  await page.waitForTimeout(500);

  // Tutorial should still be read (no blue dot on it) and starred
  await expect(page.locator("[aria-label='Unstar']")).toBeVisible();
  // Board email should be visible
  await expect(page.locator("text=Richard Townsend")).toBeVisible();
});

test("new game resets everything", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await freshStart(page);

  // Advance to get emails
  await advance(page);
  await advance(page);

  // Open sidebar (mobile) and click new game
  await page.click("[aria-label='Toggle sidebar']");
  await page.waitForTimeout(200);
  await page.click("button:has-text('New game')");
  await page.waitForTimeout(300);

  // Should be back to day 1 with only tutorial
  await expect(page.locator("text=IT Support")).toBeVisible();
  expect(await page.locator("button:has-text('Richard Townsend')").count()).toBe(0);
});

test("game ends with recap screen", async ({ page }) => {
  await freshStart(page);

  // Fast-forward: advance many times until game ends
  // After the last email, advance should skip to extinction
  for (let i = 0; i < 20; i++) {
    const advanceBtn = page.locator("[title^='Skip']");
    if (await advanceBtn.count() === 0) break;
    await advanceBtn.click();
    await page.waitForTimeout(200);
  }

  // Should see recap/death screen
  await expect(page.locator("text=You are dead")).toBeVisible({ timeout: 5000 });
  await expect(page.locator("text=Try Again")).toBeVisible();
});
