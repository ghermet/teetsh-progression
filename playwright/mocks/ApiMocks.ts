import type { Page } from '@playwright/test';
import { ProgrammationsApiMocks } from './ProgrammationsApiMocks';

export class ApiMocks {
  readonly programmations: ProgrammationsApiMocks;

  constructor(page: Page) {
    this.programmations = new ProgrammationsApiMocks(page);
  }
}
