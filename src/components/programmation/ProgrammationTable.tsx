/** Generated with CLAUDE CODE */

import DOMPurify from 'dompurify';
import { cn } from '../../lib/utils';
import type { Matiere, Periode } from '../../types/programmation.types';

/**
 * Props for the ProgrammationTable component
 */
interface ProgressionTableProps {
  /** Array of time periods that form the table columns */
  periodes: Periode[];
  /** Array of subjects containing domains and items that form the table rows */
  matieres: Matiere[];
}

/**
 * Timeline table component that renders educational programmation data in a grid format.
 *
 * Creates a table where:
 * - Columns represent time periods (periodes) with dates and colors
 * - Rows represent domains within subjects (matières)
 * - Cells contain learning items (HTML content) positioned by period
 *
 * Features:
 * - Sticky left column for domain/subject names
 * - Horizontally scrollable for many periods
 * - Color-coded periods and items
 * - Safe HTML rendering with DOMPurify
 * - Responsive design with proper accessibility
 *
 * @param props - Table data and configuration
 * @param props.periodes - Time periods for table columns
 * @param props.matieres - Subjects and domains for table rows
 * @returns Interactive timeline table with educational content
 */
export function ProgrammationTable({
  periodes,
  matieres,
}: ProgressionTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <div className="min-w-max">
        <table className="w-full border-collapse">
          <caption className="sr-only">
            Tableau de programmation des matières par périodes
          </caption>
          <ProgressionTableHead periodes={periodes} />
          <ProgressionTableBody matieres={matieres} periodes={periodes} />
        </table>
      </div>
    </div>
  );
}

/**
 * Table header component that renders period columns with dates and colors.
 *
 * @param props - Header configuration
 * @param props.periodes - Time periods to display as column headers
 * @returns Table header with period information and dates
 */
function ProgressionTableHead({ periodes }: { periodes: Periode[] }) {
  const sortedPeriodes = periodes.sort((a, b) => a.position - b.position);

  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="sticky left-0 z-10 w-48 sm:w-56 md:w-64 bg-slate-50 border-r border-slate-200 h-12 px-2 sm:px-3 text-center"
        >
          <span
            className="text-slate-700 text-xs sm:text-sm font-medium"
            data-testid="matieres-header"
          >
            <span className="hidden sm:inline">Matières</span>
            <span className="sm:hidden">Mat.</span>
          </span>
        </th>
        {sortedPeriodes.map((periode) => {
          const formattedStartDate = new Date(
            periode.startDate
          ).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
          });
          const formattedEndDate = new Date(periode.endDate).toLocaleDateString(
            'fr-FR',
            {
              day: '2-digit',
              month: 'long',
            }
          );
          return (
            <th
              key={periode.id}
              title={`${periode.name} du ${formattedStartDate} au ${formattedEndDate}`}
              scope="col"
              className="w-48 sm:w-56 md:w-64 border-r border-slate-200 text-center px-1 bg-slate-50 select-none"
              style={{ background: `var(--color-${periode.color})` }}
            >
              <div
                className="text-slate-700 text-xs sm:text-sm font-medium"
                data-testid="periode-name"
              >
                {periode.name}
              </div>
              <div className="text-slate-800 text-xs hidden sm:block">
                {formattedStartDate} - {formattedEndDate}
              </div>
              <div className="text-slate-800 text-xs sm:hidden">
                {new Date(periode.startDate).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'short',
                })}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

/**
 * Table body component that renders domain rows with learning items positioned by periods.
 *
 * Transforms the hierarchical data structure into table rows, where each domain becomes
 * a row and items are placed in the appropriate period columns based on their periodeId.
 *
 * @param props - Table body data
 * @param props.matieres - Subjects containing domains and items
 * @param props.periodes - Time periods for column positioning
 * @returns Table body with domain rows and positioned learning items
 */
function ProgressionTableBody({
  matieres,
  periodes,
}: {
  matieres: Matiere[];
  periodes: Periode[];
}) {
  const sortedPeriodes = periodes.sort((a, b) => a.position - b.position);
  const sortedMatieres = matieres.sort((a, b) => a.position - b.position);
  const domaineRows = sortedMatieres.flatMap((mat) =>
    mat.domaines.map((dom) => ({ mat, dom }))
  );

  return (
    <tbody>
      {domaineRows.map(({ mat, dom }) => (
        <tr key={dom.id}>
          <th
            scope="row"
            className="sticky left-0 z-10 flex flex-col w-48 sm:w-56 md:w-64 h-44 bg-slate-50 border-r border-t border-slate-200 px-2 sm:px-3 py-2 text-center select-none"
          >
            <div className="flex flex-col items-center gap-1 sm:gap-2 w-full min-h-0">
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm flex-shrink-0"
                style={{ background: `var(--color-${dom.color})` }}
              />
              <span
                className="text-slate-800 text-xs sm:text-sm font-medium text-center leading-tight overflow-hidden line-clamp-2"
                data-testid="domaine-name"
                title={dom.name}
              >
                {dom.name}
              </span>
              <span
                className="text-slate-500 text-xs font-light text-center leading-tight overflow-hidden line-clamp-2"
                data-testid="matiere-name"
                title={mat.name}
              >
                {mat.name}
              </span>
            </div>
            <div
              className="text-slate-500 text-xs mt-auto"
              data-testid="domaine-count"
            >
              <span className="hidden sm:inline">
                {dom.items.length} semaines
              </span>
              <span className="sm:hidden">{dom.items.length}</span>
            </div>
          </th>

          {sortedPeriodes.map((periode, periodeIndex) => {
            // Find all items for this domaine in this specific periode
            const itemsForPeriode = dom.items.filter(
              (item) => item.periodeId === periode.id
            );

            return (
              <td
                key={periode.id}
                className={cn(
                  'min-w-48 sm:min-w-56 md:min-w-64 border-r border-slate-200 align-top p-1 overflow-auto',
                  periodeIndex % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                )}
              >
                <ul className="flex flex-col gap-1">
                  {itemsForPeriode.map((item) => (
                    <li
                      key={item.id}
                      className={cn(
                        'px-1.5 sm:px-2 py-1 rounded-md shadow-md transition-all min-h-6 text-slate-800 text-xs font-medium leading-tight bg-white break-words w-full select-none touch-manipulation'
                      )}
                      style={{
                        border: `2px solid var(--color-${dom.color})`,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.value),
                      }}
                    />
                  ))}
                </ul>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
