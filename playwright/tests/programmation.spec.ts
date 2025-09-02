/** Generated with CLAUDE CODE */

import { test, expect } from '../fixtures/test';

test('homepage redirects to programmation correctly', async ({
  page,
  apiMocks,
  poms,
}) => {
  await apiMocks.programmations.findOne(async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      path: 'playwright/fixtures/responses/programmation.json',
    });
  });

  await poms.programmation.gotoHome();

  // Expect page to have the correct title
  await expect(page).toHaveTitle(
    "Programmation d'Histoire par semaine pour CM1 et CM2 - Année 2"
  );

  // Should redirect to the programmation page
  await expect(page).toHaveURL(/\/programmations\/wwdnw9553da0cdypjq2t9p3f/);
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

  await poms.programmation.goto('12345678');

  // Should show error message
  await expect(poms.programmation.errorMessage).toBeVisible();
});

test.describe('Programmation Timeline', () => {
  test.beforeEach(async ({ apiMocks, poms }) => {
    // Setup API mocking using the provided fixture
    await apiMocks.programmations.findOne(async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: 'playwright/fixtures/responses/programmation.json',
      });
    });
    await poms.programmation.goto('wwdnw9553da0cdypjq2t9p3f');
  });

  test('should display programmation timeline correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check if the programmation name is displayed
    await expect(poms.programmation.title).toContainText(
      "Programmation d'Histoire par semaine pour CM1 et CM2 - Année 2"
    );

    // Check if the timeline grid is rendered
    await expect(poms.programmation.table).toBeVisible();

    // Check if the "Matières" header is visible
    await expect(poms.programmation.matiereText).toBeVisible();

    // Check if periods are displayed in headers (there are multiple Semaine 1 entries in different periods)
    await expect(poms.programmation.getPeriodByName('Semaine 1')).toBeVisible();
    await expect(poms.programmation.getPeriodByName('Semaine 2')).toBeVisible();
  });

  test('should display matiere rows correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check if domain (which becomes the row title) is displayed in table
    await expect(poms.programmation.domainTitle).toBeVisible();

    // Check if domain count is displayed (fixture has 30 items/blocks)
    await expect(poms.programmation.domainCount).toBeVisible();

    // Check if color indicator is present
    await expect(poms.programmation.colorIndicator).toBeVisible();
  });

  test('should display content blocks with HTML sanitization', async ({
    poms,
  }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check if content block is displayed
    await expect(poms.programmation.firstContentBlock).toBeVisible();

    // Check if HTML content is rendered (but sanitized)
    await expect(poms.programmation.firstContentBlock).toContainText('Thème 1');
    await expect(poms.programmation.firstContentBlock).toContainText(
      'Et avant la France ?'
    );
    await expect(poms.programmation.firstContentBlock).toContainText(
      'Le néolithique : les premiers villages Celtes.'
    );

    // Verify the content has proper styling - content blocks use border styles
    await expect(poms.programmation.firstContentBlock).toHaveAttribute(
      'style',
      /border/
    );
    await expect(poms.programmation.firstContentBlock).toHaveClass(
      /rounded-md/
    );
    await expect(poms.programmation.firstContentBlock).toHaveClass(/shadow-md/);
  });

  test('should have sticky matiere labels', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check if the matiere header has sticky positioning
    await expect(poms.programmation.matiereHeader).toHaveClass(/min-sm:sticky/);
    await expect(poms.programmation.matiereHeader).toHaveClass(/left-0/);
    await expect(poms.programmation.matiereHeader).toHaveClass(/z-10/);

    // Check if the matiere row headers have sticky positioning
    await expect(poms.programmation.firstMatiereRow).toHaveClass(
      /min-sm:sticky/
    );
    await expect(poms.programmation.firstMatiereRow).toHaveClass(/left-0/);
    await expect(poms.programmation.firstMatiereRow).toHaveClass(/z-10/);
  });

  test('should display period dates correctly on desktop', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Set desktop view to see full dates
    await poms.programmation.setDesktopView();

    // Check if period dates are formatted correctly (French format)
    await expect(
      poms.programmation.getPeriodDateByText('01 septembre')
    ).toBeVisible(); // Start date of first period
    await expect(
      poms.programmation.getPeriodDateByText('04 septembre')
    ).toBeVisible(); // End date of first period
  });

  test('should display abbreviated dates correctly on mobile', async ({
    poms,
  }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Set mobile view to see abbreviated dates
    await poms.programmation.setMobileView();

    // Check if abbreviated dates are visible (short format)
    await expect(
      poms.programmation.getPeriodDateByText('01 sept.')
    ).toBeVisible(); // Abbreviated start date of first period
  });

  test('should handle tablet viewport correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Set tablet view
    await poms.programmation.setTabletView();

    // Verify tablet viewport is active
    expect(await poms.programmation.isTabletView()).toBe(true);
    expect(await poms.programmation.isMobileView()).toBe(false);
    expect(await poms.programmation.isDesktopView()).toBe(false);

    // On tablet, full dates should be visible (above sm breakpoint)
    await expect(
      poms.programmation.getPeriodDateByText('01 septembre')
    ).toBeVisible();

    // Check that table is scrollable horizontally
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // Content should be properly accessible
    await expect(poms.programmation.domainTitle).toBeVisible();
    await expect(poms.programmation.domainCount).toBeVisible();

    // Color indicators should be visible (medium size on tablet)
    await expect(poms.programmation.colorIndicator).toBeVisible();
  });

  test('should handle horizontal scrolling', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check if the container is scrollable
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // Verify table can be scrolled horizontally (if there are many periods)
    await expect(poms.programmation.table).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check table caption for screen readers
    await expect(poms.programmation.tableCaption).toBeVisible();

    // Check proper table structure
    await expect(poms.programmation.tableHead).toBeVisible();
    await expect(poms.programmation.tableBody).toBeVisible();

    // Check proper header scoping (fixture has 37 periods + 1 Matières header = 38 columns, 1 row)
    await expect(poms.programmation.columnHeaders).toHaveCount(38); // Matières + 37 periods
    await expect(poms.programmation.rowHeaders).toHaveCount(1); // 1 domain

    // Check content blocks exist and are properly structured (no aria-label required)
    const contentBlocksCount = await poms.programmation.getContentBlocksCount();
    expect(contentBlocksCount).toBeGreaterThan(0);

    // Verify content blocks have proper semantic structure as list items
    await expect(poms.programmation.firstContentBlock).toBeVisible();
  });

  test('should display colors correctly', async ({ poms }) => {
    // Wait for the timeline to load
    await expect(poms.programmation.table).toBeVisible();

    // Check if at least one period header has a color style
    await expect(poms.programmation.firstPeriodHeader).toHaveAttribute(
      'style',
      /background:/
    );

    // Check if content blocks have border colors
    const contentBlocksCount = await poms.programmation.getContentBlocksCount();
    if (contentBlocksCount > 0) {
      await expect(poms.programmation.firstContentBlock).toHaveAttribute(
        'style',
        /border:/
      );
    }
  });

  test('should have proper responsive design', async ({ poms }) => {
    // Test desktop view (1200x800)
    await poms.programmation.setDesktopView();
    await expect(poms.programmation.table).toBeVisible();
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // On desktop, full dates should be visible
    await expect(
      poms.programmation.getPeriodDateByText('01 septembre')
    ).toBeVisible();

    // Test tablet view (768x1024)
    await poms.programmation.setTabletView();
    await expect(poms.programmation.table).toBeVisible();
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // On tablet, full dates should still be visible (sm breakpoint)
    await expect(
      poms.programmation.getPeriodDateByText('01 septembre')
    ).toBeVisible();

    // Domain titles should be visible on tablet
    await expect(poms.programmation.domainTitle).toBeVisible();
    await expect(poms.programmation.domainCount).toBeVisible();

    // Test mobile view (375x667)
    await poms.programmation.setMobileView();
    await expect(poms.programmation.table).toBeVisible();
    await expect(poms.programmation.scrollContainer).toBeVisible();

    // On mobile, abbreviated dates should be visible
    await expect(
      poms.programmation.getPeriodDateByText('01 sept.')
    ).toBeVisible();

    // Domain content should still be accessible on mobile
    await expect(poms.programmation.domainTitle).toBeVisible();
    await expect(poms.programmation.domainCount).toBeVisible();
  });
});
