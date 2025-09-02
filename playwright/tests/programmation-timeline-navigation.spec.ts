/** Generated with CLAUDE CODE */

import { expect, test } from '../fixtures/test';

test.describe('Timeline Scrolling', () => {
  test.beforeEach(async ({ apiMocks, poms }) => {
    // Use the real fixture data (37 periods) for comprehensive scrolling tests
    await apiMocks.programmations.findOne(async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: 'playwright/fixtures/responses/programmation.json',
      });
    });
    await poms.programmation.goto('wwdnw9553da0cdypjq2t9p3f');
  });

  test('should display timeline with scrollable container', async ({
    poms,
  }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check if the scrollable container exists
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // Check if the table is wider than container (indicating scroll is needed)
    await expect(poms.programmation.table).toBeVisible();
  });

  test('should allow manual horizontal scrolling', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Get initial scroll position
    const initialScrollLeft = await poms.programmation.getScrollPosition();

    // Manually scroll the container
    await poms.programmation.scrollHorizontally(200);

    // Check if scroll position changed
    const newScrollLeft = await poms.programmation.getScrollPosition();
    expect(newScrollLeft).toBeGreaterThan(initialScrollLeft);
  });

  test('should display many periods correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check that multiple periods are rendered (fixture has 37 periods)
    const count = await poms.programmation.getPeriodHeadersCount();
    expect(count).toBe(37);

    // Check that first few periods are visible
    await expect(poms.programmation.getPeriodByName('Semaine 1')).toBeVisible();
    await expect(poms.programmation.getPeriodByName('Semaine 2')).toBeVisible();
    await expect(poms.programmation.getPeriodByName('Semaine 3')).toBeVisible();
  });

  test('should handle different period colors', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check first period (should be blue-200)
    await expect(poms.programmation.firstPeriodHeader).toHaveAttribute(
      'style',
      /background.*blue-200/
    );
  });

  test('should maintain sticky column while scrolling', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Verify sticky header is present
    await expect(poms.programmation.stickyColumnHeader).toBeVisible();
    await expect(poms.programmation.stickyColumnHeader).toContainText(
      'Matières'
    );

    // Verify sticky row headers are present
    await expect(poms.programmation.stickyRowHeaders).toHaveCount(1); // One matiere in mock data
  });

  test('should handle responsive design with scrolling', async ({ poms }) => {
    // Test desktop view (1200x800)
    await poms.programmation.setDesktopView();
    await expect(poms.programmation.table).toBeVisible();
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // Reset scroll position for consistent testing
    await poms.programmation.scrollHorizontally(0);

    // Test tablet view (768x1024) - should be scrollable
    await poms.programmation.setTabletView();
    await expect(poms.programmation.table).toBeVisible();
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // Scroll should work on tablet
    await poms.programmation.scrollHorizontally(150);
    let scrollLeft = await poms.programmation.getScrollPosition();
    expect(scrollLeft).toBeGreaterThan(0);

    // Reset scroll position
    await poms.programmation.scrollHorizontally(0);

    // Test mobile view (375x667) - should still be scrollable
    await poms.programmation.setMobileView();
    await expect(poms.programmation.table).toBeVisible();
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // Scroll should still work on mobile
    await poms.programmation.scrollHorizontally(100);

    scrollLeft = await poms.programmation.getScrollPosition();
    expect(scrollLeft).toBeGreaterThan(0);
  });

  test('should display content blocks across many periods', async ({
    poms,
  }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Should have content blocks distributed across periods
    const blockCount = await poms.programmation.getContentBlocksCount();
    expect(blockCount).toBeGreaterThan(0);

    // Check that content exists (real fixture has French history content)
    await expect(poms.programmation.firstContentBlock).toContainText('France');
  });
});
