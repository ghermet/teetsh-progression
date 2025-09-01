import type { ProgressionData } from '../../types/progression.types';

/**
 * Props for the ProgressionHeader component
 */
type ProgressionHeaderProps = Pick<ProgressionData, 'name' | 'niveau'> & {
  /** Optional short description of the progression */
  shortDescription?: string;
  /** Optional date when the progression was created */
  date?: string;
};

/**
 * Header component that displays progression metadata including name, description, level, and year.
 *
 * Renders a styled header section with the progression title, description, educational level,
 * and the year extracted from the creation date.
 *
 * @param props - Header content and metadata
 * @param props.name - The progression title/name
 * @param props.shortDescription - Optional brief description
 * @param props.niveau - Educational level (e.g., "CP", "CE1")
 * @param props.date - Optional creation date (year will be extracted)
 * @returns Styled header section with progression metadata
 */
export function ProgressionHeader({
  name,
  shortDescription,
  niveau,
  date,
}: ProgressionHeaderProps) {
  return (
    <header className="bg-slate-100 px-4 sm:px-6 py-6 sm:py-8 border-b border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-slate-800 font-medium">
              {name}
            </h1>
            <div className="flex items-baseline gap-2 text-slate-600 text-sm sm:text-base flex-shrink-0">
              <strong className="text-slate-800">{niveau}</strong>
              {date && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-slate-700">
                    {new Date(date).getFullYear()}
                  </span>
                </>
              )}
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-slate-600 mt-1">
            {shortDescription}
          </p>
        </div>
      </div>
    </header>
  );
}
