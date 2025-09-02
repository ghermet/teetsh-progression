import { type Page } from '@playwright/test';
import { step } from '../decorators/step-decorator';
import type { Handler } from './types';

if (!process.env.VITE_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

const baseURL = `${process.env.VITE_API_BASE_URL}/programmations`;

export class ProgrammationsApiMocks {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  @step(`Mock ${baseURL}/:id`)
  async findOne(handler: Handler) {
    await this.page.route(`${baseURL}/*`, handler);
  }
}
