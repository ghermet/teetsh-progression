import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { ProgressionView } from '../components/progression/ProgressionView';
import { ProgressionError } from '../components/progression/ProgressionError';

/**
 * Dynamic route for displaying individual progressions by ID.
 *
 * This route:
 * - Fetches progression data using the ID from URL parameters
 * - Sets the document title to the progression name
 * - Renders the progression using ProgressionView component
 * - Handles errors with ProgressionError component
 */
export const Route = createFileRoute('/progressions/$id')({
  component: ProgressionPage,
  errorComponent: ProgressionError,
  /**
   * Loader function that fetches progression data before rendering.
   *
   * @param context - Router context containing API client
   * @param params - URL parameters including the progression ID
   * @returns Promise resolving to the progression response
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
 * Main page component for displaying a progression.
 *
 * Retrieves the loaded progression data and renders it using the
 * ProgressionView component within a responsive layout.
 */
function ProgressionPage() {
  const { data } = useLoaderData({
    from: '/progressions/$id',
  });

  return (
    <main className="w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 min-h-screen">
      <ProgressionView {...data} />
    </main>
  );
}
