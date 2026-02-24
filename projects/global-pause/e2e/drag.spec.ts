import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click("text=Take Office");
  await page.waitForTimeout(500);
});

async function getCardCenter(page: import("@playwright/test").Page) {
  // The card is the element with the animate-card-enter class
  const card = page.locator(".animate-card-enter").first();
  const box = await card.boundingBox();
  if (!box) throw new Error("Card not found");
  return { x: box.x + box.width / 2, y: box.y + box.height / 2, box };
}

test("dragging card shows option labels", async ({ page }) => {
  const { x, y } = await getCardCenter(page);

  // Get the card's text content before drag to verify it doesn't change
  const speakerBefore = await page
    .locator(".animate-card-enter .uppercase")
    .first()
    .textContent();

  // Start drag
  await page.mouse.move(x, y);
  await page.mouse.down();

  // Drag right 60px (past 30px tilt threshold)
  await page.mouse.move(x + 60, y, { steps: 10 });
  await page.waitForTimeout(100);

  // Right option label should be visible (opacity > 0)
  const rightLabel = page.locator(".text-success.font-bold").first();
  await expect(rightLabel).toBeVisible();

  // Drag back left past center to -60px (left tilt)
  await page.mouse.move(x - 60, y, { steps: 15 });
  await page.waitForTimeout(100);

  // Left option label should be visible
  const leftLabel = page.locator(".text-urgency-red.font-bold").first();
  await expect(leftLabel).toBeVisible();

  // Release without committing (within ±100px threshold)
  await page.mouse.move(x, y, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(400); // wait for spring-back animation

  // Card should still be showing — same speaker, no choice was made
  const speakerAfter = await page
    .locator(".animate-card-enter .uppercase")
    .first()
    .textContent();
  expect(speakerAfter).toBe(speakerBefore);
});

test("dragging card shows resource bar previews", async ({ page }) => {
  const { x, y } = await getCardCenter(page);

  // No preview arrows should be visible before drag
  await expect(page.locator(".animate-bar-pulse")).toHaveCount(0);

  // Start drag right past tilt threshold
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 60, y, { steps: 10 });
  await page.waitForTimeout(100);

  // At least one resource bar should show a preview arrow
  const previews = page.locator(".animate-bar-pulse");
  const count = await previews.count();
  expect(count).toBeGreaterThan(0);

  // Preview arrows should contain ▲ or ▼ text
  const firstPreviewText = await previews.first().textContent();
  expect(firstPreviewText).toMatch(/[▲▼]/);

  // Release without committing
  await page.mouse.move(x, y, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(400);

  // Previews should be gone after release
  await expect(page.locator(".animate-bar-pulse")).toHaveCount(0);
});

test("completing a swipe advances the game", async ({ page }) => {
  // Should be on Decision #1
  await expect(page.locator("text=Decision #1")).toBeVisible();

  const { x, y } = await getCardCenter(page);

  // Drag right past commit threshold (100px)
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 150, y, { steps: 15 });
  await page.mouse.up();

  // Wait for fly-off animation + new card draw
  await page.waitForTimeout(600);

  // Should now show Decision #2
  await expect(page.locator("text=Decision #2")).toBeVisible();
});
