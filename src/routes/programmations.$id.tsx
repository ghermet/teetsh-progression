import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { ProgrammationView } from '../components/programmation/ProgrammationView';
import { ProgrammationError } from '../components/programmation/ProgrammationError';

/**
 * Dynamic route for displaying individual progressions by ID.
 *
 * This route:
 * - Fetches programmation data using the ID from URL parameters
 * - Sets the document title to the programmation name
 * - Renders the programmation using ProgrammationView component
 * - Handles errors with ProgrammationError component
 */
export const Route = createFileRoute('/programmations/$id')({
  component: ProgrammationPage,
  errorComponent: ProgrammationError,
  /**
   * Loader function that fetches programmation data before rendering.
   *
   * @param context - Router context containing API client
   * @param params - URL parameters including the programmation ID
   * @returns Promise resolving to the programmation response
   */
  async loader({ context: { api, queryClient }, params }) {
    const response = await queryClient.fetchQuery({
      queryKey: [api.programmations.baseURL, params.id],
      queryFn: ({ signal }) =>
        api.programmations.findOne(params.id, { signal }),
    });
    document.title = response.data.name;
    return response;
  },
});

/**
 * Main page component for displaying a programmation.
 *
 * Retrieves the loaded programmation data and renders it using the
 * ProgrammationView component within a responsive layout.
 */
function ProgrammationPage() {
  const { data } = useLoaderData({
    from: '/programmations/$id',
  });

  return (
    <main className="w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 min-h-screen">
      <ProgrammationView {...data} />
    </main>
  );
}
