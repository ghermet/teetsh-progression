/** Generated with CLAUDE CODE */

import type { Page, Locator } from '@playwright/test';
import { step } from '../decorators/step-decorator';

export class ProgrammationPageModel {
  readonly page: Page;
  readonly table: Locator;
  readonly title: Locator;
  readonly scrollContainer: Locator;
  readonly tableCaption: Locator;
  readonly tableHead: Locator;
  readonly tableBody: Locator;
  readonly matiereHeader: Locator;
  readonly matiereText: Locator;
  readonly columnHeaders: Locator;
  readonly rowHeaders: Locator;
  readonly periodHeaders: Locator;
  readonly stickyColumnHeader: Locator;
  readonly stickyRowHeaders: Locator;
  readonly firstMatiereRow: Locator;
  readonly contentBlocks: Locator;
  readonly firstContentBlock: Locator;
  readonly domainTitle: Locator;
  readonly domainCount: Locator;
  readonly colorIndicator: Locator;
  readonly firstPeriodHeader: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = this.page.getByRole('table');
    this.title = this.page.getByRole('heading', { level: 1 });
    this.scrollContainer = this.page.locator('.overflow-x-auto').first();
    this.tableCaption = this.page.locator('caption.sr-only');
    this.tableHead = this.page.locator('thead');
    this.tableBody = this.page.locator('tbody');
    this.matiereHeader = this.page
      .getByRole('columnheader')
      .filter({ hasText: 'Matières' });
    this.matiereText = this.page.getByTestId('matieres-header');
    this.columnHeaders = this.page.getByRole('columnheader');
    this.rowHeaders = this.page.getByRole('rowheader');
    this.periodHeaders = this.page
      .getByRole('columnheader')
      .filter({ hasNot: this.page.getByText('Matières') });
    this.stickyColumnHeader = this.page.locator(
      'th[scope="col"].sticky.left-0.z-10'
    );
    this.stickyRowHeaders = this.page.locator(
      'th[scope="row"].sticky.left-0.z-10'
    );
    this.firstMatiereRow = this.page.getByRole('rowheader').first();
    this.contentBlocks = this.page.getByRole('listitem');
    this.firstContentBlock = this.contentBlocks.first();
    this.domainTitle = this.page.getByTestId('domaine-name').first();
    this.domainCount = this.page.getByTestId('domaine-count').first();
    this.colorIndicator = this.page.locator('.rounded-sm').first();
    this.firstPeriodHeader = this.periodHeaders.first();
    this.errorMessage = this.page.getByText('Erreur de chargement');
  }

  // Navigation methods
  @step('Go to /programmations/:id')
  async goto(id: string) {
    await this.page.goto(`/programmations/${id}`);
  }

  @step('Go to /')
  async gotoHome() {
    await this.page.goto('/');
  }

  // Period-related elements
  getPeriodByName(periodName: string): Locator {
    return this.page
      .getByTestId('periode-name')
      .filter({ hasText: periodName })
      .first();
  }

  getPeriodDateByText(dateText: string): Locator {
    return this.page.getByText(dateText);
  }

  // Scrolling methods
  async scrollHorizontally(scrollLeft: number): Promise<void> {
    await this.scrollContainer.evaluate((el, scroll) => {
      el.scrollLeft = scroll;
    }, scrollLeft);
  }

  async getScrollPosition(): Promise<number> {
    return await this.scrollContainer.evaluate((el) => el.scrollLeft);
  }

  // Viewport and responsive methods
  async setDesktopView(): Promise<void> {
    await this.page.setViewportSize({ width: 1200, height: 800 });
  }

  async setTabletView(): Promise<void> {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  async setMobileView(): Promise<void> {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  // Counting methods
  async getPeriodHeadersCount(): Promise<number> {
    return await this.periodHeaders.count();
  }

  async getContentBlocksCount(): Promise<number> {
    return await this.contentBlocks.count();
  }

  // Responsive utility methods
  async getCurrentViewportSize(): Promise<{ width: number; height: number }> {
    return this.page.viewportSize() || { width: 0, height: 0 };
  }

  async isDesktopView(): Promise<boolean> {
    const viewport = await this.getCurrentViewportSize();
    return viewport.width >= 1200;
  }

  async isTabletView(): Promise<boolean> {
    const viewport = await this.getCurrentViewportSize();
    return viewport.width >= 768 && viewport.width < 1200;
  }

  async isMobileView(): Promise<boolean> {
    const viewport = await this.getCurrentViewportSize();
    return viewport.width < 768;
  }
}
