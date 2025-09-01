import type { Matiere, Periode } from '../../types/progression.types';

/**
 * Props for the ProgressionFooter component
 */
interface ProgresionFooterProps {
  /** Array of time periods for counting */
  periodes: Periode[];
  /** Array of subjects for counting */
  matieres: Matiere[];
}

/**
 * Footer component that displays summary statistics about the progression.
 *
 * Shows the total number of periods (weeks) and subjects (matières) in the progression,
 * with proper French pluralization.
 *
 * @param props - Data for calculating statistics
 * @param props.periodes - Time periods to count
 * @param props.matieres - Subjects to count
 * @returns Footer with progression statistics
 */
export function ProgressionFooter({
  periodes,
  matieres,
}: ProgresionFooterProps) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 px-3 sm:px-4 py-2 sm:py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
          <span className="flex items-center gap-1">
            <span className="font-medium">{periodes.length}</span>
            <span>semaine{periodes.length > 1 ? 's' : ''}</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{matieres.length}</span>
            <span>matière{matieres.length > 1 ? 's' : ''}</span>
          </span>
        </div>
        <div
          role="alert"
          className="touch-only text-xs text-slate-500 bg-white/80 px-2 py-1 rounded-md shadow-sm pointer-events-none"
        >
          ← Glissez pour défiler →
        </div>
      </div>
    </footer>
  );
}
