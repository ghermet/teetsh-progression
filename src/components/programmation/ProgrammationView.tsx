import type { ProgressionData } from '../../types/programmation.types';
import { ProgrammationFooter } from './ProgrammationFooter';
import { ProgrammationHeader } from './ProgrammationHeader';
import { ProgrammationTable } from './ProgrammationTable';

/**
 * Main programmation visualization component that orchestrates the display of educational programmation data.
 *
 * Transforms hierarchical programmation data (Matière → Domaine → Items) into a timeline-based
 * table visualization showing educational content organized by subjects and time periods.
 *
 * @param props - The complete programmation data including metadata and content
 * @param props.name - The name/title of the programmation
 * @param props.shortDescription - Brief description of the programmation
 * @param props.date - Date when the programmation was created
 * @param props.niveau - Educational level (e.g., "CP", "CE1")
 * @param props.periodes - Array of time periods with dates and colors
 * @param props.matieres - Array of subjects containing domains and learning items
 * @returns The complete programmation view with header, table, and footer
 */
export function ProgrammationView({
  name,
  shortDescription,
  date,
  niveau,
  periodes,
  matieres,
}: ProgressionData) {
  return (
    <section className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm sm:shadow-md border border-slate-200">
      <ProgrammationHeader
        name={name}
        shortDescription={shortDescription}
        niveau={niveau}
        date={date}
      />
      <ProgrammationTable periodes={periodes} matieres={matieres} />
      <ProgrammationFooter periodes={periodes} matieres={matieres} />
    </section>
  );
}
