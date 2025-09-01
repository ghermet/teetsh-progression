/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, expect } from '@playwright/test';
import { ApiMocks } from '../mocks/ApiMocks';
import { PageObjectModels } from '../poms/PageObjectModels';

export const test = base.extend<{
  apiMocks: ApiMocks;
  poms: PageObjectModels;
}>({
  apiMocks: async ({ page }, use) => {
    await use(new ApiMocks(page));
  },
  poms: async ({ page }, use) => {
    await use(new PageObjectModels(page));
  },
});

export { expect };
