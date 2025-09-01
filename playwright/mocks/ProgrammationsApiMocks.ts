import { type Page } from '@playwright/test';
import { step } from '../decorators/step-decorator';
import type { Handler } from './types';

const baseUrl = '**/programmations';

/**
 * Mock API responses for Strapi endpoints
 */
export class ProgrammationsApiMocks {
  readonly baseUrl = baseUrl;
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Mock the progression API endpoint with the provided fixture data
   */
  @step(`Mock ${baseUrl}/:id`)
  async findOne(handler: Handler) {
    await this.page.route(`${baseUrl}/*`, handler);
  }
}
