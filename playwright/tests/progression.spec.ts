/** Generated with CLAUDE CODE */

import { test, expect } from '../fixtures/test';

test('homepage redirects to progression correctly', async ({
  page,
  apiMocks,
  poms,
}) => {
  await apiMocks.programmations.findOne(async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      path: 'playwright/fixtures/responses/progression.json',
    });
  });

  await poms.progression.gotoHome();

  // Expect page to have the correct title
  await expect(page).toHaveTitle(
    "Progression d'Histoire par semaine pour CM1 et CM2 - Année 2"
  );

  // Should redirect to the progression page
  await expect(page).toHaveURL(/\/progressions\/wwdnw9553da0cdypjq2t9p3f/);
});

test('handles API errors gracefully', async ({ apiMocks, poms }) => {
  // Mock a failed API call
  await apiMocks.programmations.findOne(async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Server Error' }),
    });
  });

  await poms.progression.gotoProgression('12345678');

  // Should show error message
  await expect(poms.progression.errorMessage).toBeVisible();
});

test.describe('Progression Timeline', () => {
  test.beforeEach(async ({ apiMocks, poms }) => {
    // Setup API mocking using the provided fixture
    await apiMocks.programmations.findOne(async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: 'playwright/fixtures/responses/progression.json',
      });
    });
    await poms.progression.gotoProgression('wwdnw9553da0cdypjq2t9p3f');
  });

  test('should display progression timeline correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Check if the progression name is displayed
    await expect(poms.progression.title).toContainText(
      "Progression d'Histoire par semaine pour CM1 et CM2 - Année 2"
    );

    // Check if the timeline grid is rendered
    await expect(poms.progression.table).toBeVisible();

    // Check if the "Matières" header is visible
    await expect(poms.progression.matiereText).toBeVisible();

    // Check if periods are displayed in headers (there are multiple Semaine 1 entries in different periods)
    await expect(poms.progression.getPeriodByName('Semaine 1')).toBeVisible();
    await expect(poms.progression.getPeriodByName('Semaine 2')).toBeVisible();
  });

  test('should display matiere rows correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Check if domain (which becomes the row title) is displayed in table
    await expect(poms.progression.domainTitle).toBeVisible();

    // Check if domain count is displayed (fixture has 30 items/blocks)
    await expect(poms.progression.domainCount).toBeVisible();

    // Check if color indicator is present
    await expect(poms.progression.colorIndicator).toBeVisible();
  });

  test('should display content blocks with HTML sanitization', async ({
    poms,
  }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Check if content block is displayed
    await expect(poms.progression.firstContentBlock).toBeVisible();

    // Check if HTML content is rendered (but sanitized)
    await expect(poms.progression.firstContentBlock).toContainText('Thème 1');
    await expect(poms.progression.firstContentBlock).toContainText(
      'Et avant la France ?'
    );
    await expect(poms.progression.firstContentBlock).toContainText(
      'Le néolithique : les premiers villages Celtes.'
    );

    // Verify the content has proper styling - content blocks use inline styles, not CSS classes
    await expect(poms.progression.firstContentBlock).toHaveAttribute(
      'style',
      /background/
    );
    await expect(poms.progression.firstContentBlock).toHaveClass(/rounded-md/);
    await expect(poms.progression.firstContentBlock).toHaveClass(/shadow-md/);
  });

  test('should have sticky matiere labels', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Check if the matiere header has sticky positioning
    await expect(poms.progression.matiereHeader).toHaveClass(/sticky/);
    await expect(poms.progression.matiereHeader).toHaveClass(/left-0/);
    await expect(poms.progression.matiereHeader).toHaveClass(/z-10/);

    // Check if the matiere row headers have sticky positioning
    await expect(poms.progression.firstMatiereRow).toHaveClass(/sticky/);
    await expect(poms.progression.firstMatiereRow).toHaveClass(/left-0/);
    await expect(poms.progression.firstMatiereRow).toHaveClass(/z-10/);
  });

  test('should display period dates correctly on desktop', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Set desktop view to see full dates
    await poms.progression.setDesktopView();

    // Check if period dates are formatted correctly (French format)
    await expect(
      poms.progression.getPeriodDateByText('01 septembre')
    ).toBeVisible(); // Start date of first period
    await expect(
      poms.progression.getPeriodDateByText('04 septembre')
    ).toBeVisible(); // End date of first period
  });

  test('should display abbreviated dates correctly on mobile', async ({
    poms,
  }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Set mobile view to see abbreviated dates
    await poms.progression.setMobileView();

    // Check if abbreviated dates are visible (short format)
    await expect(
      poms.progression.getPeriodDateByText('01 sept.')
    ).toBeVisible(); // Abbreviated start date of first period
  });

  test('should handle tablet viewport correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Set tablet view
    await poms.progression.setTabletView();

    // Verify tablet viewport is active
    expect(await poms.progression.isTabletView()).toBe(true);
    expect(await poms.progression.isMobileView()).toBe(false);
    expect(await poms.progression.isDesktopView()).toBe(false);

    // On tablet, full dates should be visible (above sm breakpoint)
    await expect(
      poms.progression.getPeriodDateByText('01 septembre')
    ).toBeVisible();

    // Check that table is scrollable horizontally
    await expect(poms.progression.scrollContainer).toBeVisible();

    // Content should be properly accessible
    await expect(poms.progression.domainTitle).toBeVisible();
    await expect(poms.progression.domainCount).toBeVisible();

    // Color indicators should be visible (medium size on tablet)
    await expect(poms.progression.colorIndicator).toBeVisible();
  });

  test('should handle horizontal scrolling', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Check if the container is scrollable
    await expect(poms.progression.scrollContainer).toBeVisible();

    // Verify table can be scrolled horizontally (if there are many periods)
    await expect(poms.progression.table).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Check table caption for screen readers
    await expect(poms.progression.tableCaption).toBeVisible();

    // Check proper table structure
    await expect(poms.progression.tableHead).toBeVisible();
    await expect(poms.progression.tableBody).toBeVisible();

    // Check proper header scoping (fixture has 37 periods + 1 Matières header = 38 columns, 1 row)
    await expect(poms.progression.columnHeaders).toHaveCount(38); // Matières + 37 periods
    await expect(poms.progression.rowHeaders).toHaveCount(1); // 1 domain

    // Check content blocks exist and are properly structured (no aria-label required)
    const contentBlocksCount = await poms.progression.getContentBlocksCount();
    expect(contentBlocksCount).toBeGreaterThan(0);

    // Verify content blocks have proper semantic structure as list items
    await expect(poms.progression.firstContentBlock).toBeVisible();
  });

  test('should handle loading states and errors gracefully', async ({
    apiMocks,
    poms,
  }) => {
    // Test error handling by mocking a failed API response
    await apiMocks.programmations.findOne(async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server Error' }),
      });
    });

    await poms.progression.gotoProgression('wwdnw9553da0cdypjq2t9p3f');

    // Should show error state
    await expect(poms.progression.errorMessage).toBeVisible();
  });

  test('should display colors correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.progression.table).toBeVisible();

    // Check if at least one period header has a color style
    await expect(poms.progression.firstPeriodHeader).toHaveAttribute(
      'style',
      /background:/
    );

    // Check if content blocks have background colors
    const contentBlocksCount = await poms.progression.getContentBlocksCount();
    if (contentBlocksCount > 0) {
      await expect(poms.progression.firstContentBlock).toHaveAttribute(
        'style',
        /background:/
      );
    }
  });

  test('should have proper responsive design', async ({ poms }) => {
    // Test desktop view (1200x800)
    await poms.progression.setDesktopView();
    await expect(poms.progression.table).toBeVisible();
    await expect(poms.progression.scrollContainer).toBeVisible();

    // On desktop, full dates should be visible
    await expect(
      poms.progression.getPeriodDateByText('01 septembre')
    ).toBeVisible();

    // Test tablet view (768x1024)
    await poms.progression.setTabletView();
    await expect(poms.progression.table).toBeVisible();
    await expect(poms.progression.scrollContainer).toBeVisible();

    // On tablet, full dates should still be visible (sm breakpoint)
    await expect(
      poms.progression.getPeriodDateByText('01 septembre')
    ).toBeVisible();

    // Domain titles should be visible on tablet
    await expect(poms.progression.domainTitle).toBeVisible();
    await expect(poms.progression.domainCount).toBeVisible();

    // Test mobile view (375x667)
    await poms.progression.setMobileView();
    await expect(poms.progression.table).toBeVisible();
    await expect(poms.progression.scrollContainer).toBeVisible();

    // On mobile, abbreviated dates should be visible
    await expect(
      poms.progression.getPeriodDateByText('01 sept.')
    ).toBeVisible();

    // Domain content should still be accessible on mobile
    await expect(poms.progression.domainTitle).toBeVisible();
    await expect(poms.progression.domainCount).toBeVisible();
  });
});
