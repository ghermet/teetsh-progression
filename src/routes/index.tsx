import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * Root index route that redirects to a default programmation.
 *
 * This route serves as the application entry point and immediately
 * redirects users to a specific programmation for demonstration purposes.
 */
export const Route = createFileRoute('/')({
  component: App,
  /**
   * Loader that performs immediate redirect to default programmation.
   *
   * @returns Redirect to the default programmation page
   */
  loader() {
    return redirect({
      to: '/programmations/$id',
      params: { id: 'wwdnw9553da0cdypjq2t9p3f' },
    });
  },
});

/**
 * Empty component for the index route.
 *
 * This component never renders since the loader always redirects.
 */
function App() {
  return null;
}
