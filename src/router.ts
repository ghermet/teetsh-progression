import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { Api } from './lib/api';
import { routeTree } from './routeTree.gen';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export interface RouterContext {
  queryClient: QueryClient;
  api: Api;
}

export const routerContext: RouterContext = {
  queryClient: new QueryClient(),
  api: new Api(import.meta.env.VITE_AUTH_TOKEN),
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: routerContext,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});
