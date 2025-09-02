import type { Page } from '@playwright/test';
import { ProgrammationPageModel } from './ProgrammationPageModel';

export class PageObjectModels {
  readonly programmation: ProgrammationPageModel;

  constructor(page: Page) {
    this.programmation = new ProgrammationPageModel(page);
  }
}
