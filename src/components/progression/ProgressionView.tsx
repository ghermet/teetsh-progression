import type { ProgressionData } from '../../types/progression.types';
import { ProgressionFooter } from './ProgressionFooter';
import { ProgressionHeader } from './ProgressionHeader';
import { ProgressionTable } from './ProgressionTable';

/**
 * Main progression visualization component that orchestrates the display of educational progression data.
 *
 * Transforms hierarchical progression data (Matière → Domaine → Items) into a timeline-based
 * table visualization showing educational content organized by subjects and time periods.
 *
 * @param props - The complete progression data including metadata and content
 * @param props.name - The name/title of the progression
 * @param props.shortDescription - Brief description of the progression
 * @param props.date - Date when the progression was created
 * @param props.niveau - Educational level (e.g., "CP", "CE1")
 * @param props.periodes - Array of time periods with dates and colors
 * @param props.matieres - Array of subjects containing domains and learning items
 * @returns The complete progression view with header, table, and footer
 */
export function ProgressionView({
  name,
  shortDescription,
  date,
  niveau,
  periodes,
  matieres,
}: ProgressionData) {
  return (
    <section className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm sm:shadow-md border border-slate-200">
      <ProgressionHeader
        name={name}
        shortDescription={shortDescription}
        niveau={niveau}
        date={date}
      />
      <ProgressionTable periodes={periodes} matieres={matieres} />
      <ProgressionFooter periodes={periodes} matieres={matieres} />
    </section>
  );
}
