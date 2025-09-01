import type { Page } from '@playwright/test';
import { ProgressionPageModel } from './ProgressionPageModel';

export class PageObjectModels {
  readonly progression: ProgressionPageModel;

  constructor(page: Page) {
    this.progression = new ProgressionPageModel(page);
  }
}
