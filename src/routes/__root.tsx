import { TanStackDevtools } from '@tanstack/react-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import type { RouterContext } from '../router';

function App() {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </>
  );
}

/**
 * Root route configuration with context type.
 *
 * Sets up the root route that provides router context (including API client)
 * to all child routes throughout the application.
 */
export const Route = createRootRouteWithContext<RouterContext>()({
  component: App,
});
