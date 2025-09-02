import type { ErrorComponentProps } from '@tanstack/react-router';

/**
 * Error boundary component for programmation loading failures.
 *
 * Displays a user-friendly error message when programmation data fails to load,
 * with an option to retry/refresh the page. Integrates with TanStack Router's
 * error handling system.
 *
 * @param props - Error component props from TanStack Router
 * @param props.error - The error object containing details about what went wrong
 * @param props.reset - Function to reset the error state and retry loading
 * @returns Error UI with retry functionality
 */
export function ProgrammationError({ error, reset }: ErrorComponentProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex items-start justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-6 sm:p-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-red-800 mb-3 sm:mb-4">
          Erreur de chargement
        </h1>
        <p className="text-red-600 mb-6 sm:mb-8 text-sm sm:text-base">
          {error.message}
        </p>
        <button
          className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors touch-manipulation"
          onClick={() => reset()}
        >
          Rafraîchir la page
        </button>
      </div>
    </div>
  );
}
