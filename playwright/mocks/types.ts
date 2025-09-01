import type { Request, Route } from '@playwright/test';

export type Handler = (route: Route, request: Request) => Promise<unknown>;
