/** Generated with CLAUDE CODE */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProgrammationTable } from './ProgrammationTable';
import type { Matiere, Periode } from '../../types/programmation.types';

// Mock DOMPurify
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((input: string) => input),
  },
}));

describe('ProgrammationTable', () => {
  const mockPeriodes: Periode[] = [
    {
      id: '1',
      name: 'Période 1',
      color: 'blue',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      position: 1,
      programmationId: 'prog-1',
    },
    {
      id: '2',
      name: 'Période 2',
      color: 'green',
      startDate: '2024-01-08',
      endDate: '2024-01-14',
      position: 2,
      programmationId: 'prog-1',
    },
  ];

  const mockMatieres: Matiere[] = [
    {
      id: 'matiere-1',
      name: 'Mathématiques',
      color: 'blue',
      position: 1,
      programmationId: 'prog-1',
      domaines: [
        {
          id: 'domaine-1',
          name: 'Math',
          color: 'blue',
          matiereId: 'matiere-1',
          items: [
            {
              y: 0,
              id: 'item-1',
              value: 'Addition',
              Sequence: null,
              domaineId: 'domaine-1',
              periodeId: '1',
              FicheDePrep: null,
              attachments: [],
            },
            {
              y: 0,
              id: 'item-2',
              value: 'Subtraction',
              Sequence: null,
              domaineId: 'domaine-1',
              periodeId: '2',
              FicheDePrep: null,
              attachments: [],
            },
          ],
        },
      ],
    },
    {
      id: 'matiere-2',
      name: 'Français',
      color: 'green',
      position: 2,
      programmationId: 'prog-1',
      domaines: [
        {
          id: 'domaine-2',
          name: 'French',
          color: 'green',
          matiereId: 'matiere-2',
          items: [
            {
              y: 0,
              id: 'item-3',
              value: 'Reading',
              Sequence: null,
              domaineId: 'domaine-2',
              periodeId: '1',
              FicheDePrep: null,
              attachments: [],
            },
          ],
        },
      ],
    },
  ];

  it('renders table with correct structure', () => {
    render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('renders table with proper accessibility structure', () => {
    render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check that we have proper table headers
    expect(screen.getByText('Matières')).toBeInTheDocument();
  });

  it('renders period headers with dates', () => {
    render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );

    expect(screen.getByText('Période 1')).toBeInTheDocument();
    expect(screen.getByText('Période 2')).toBeInTheDocument();
    expect(screen.getByText('01 janvier - 07 janvier')).toBeInTheDocument();
    expect(screen.getByText('08 janvier - 14 janvier')).toBeInTheDocument();
  });

  it('renders topic titles and block counts', () => {
    render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );

    expect(screen.getByText('Mathématiques')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(screen.getByText('2 semaines')).toBeInTheDocument();
    expect(screen.getByText('1 semaines')).toBeInTheDocument();
  });

  it('renders timeline blocks with correct content', () => {
    render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );

    expect(screen.getByText('Addition')).toBeInTheDocument();
    expect(screen.getByText('Subtraction')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  it('applies alternating row colors for better readability', () => {
    render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );

    const table = screen.getByRole('table');
    const cells = table.querySelectorAll('td');

    // Check that cells have alternating background colors
    expect(cells[0]).toHaveClass('bg-slate-50');
    expect(cells[1]).toHaveClass('bg-white');
  });

  it('renders blocks with proper content and structure', () => {
    render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );

    // Check that the blocks have proper role attributes and content
    const blocks = screen.getAllByRole('listitem');
    expect(blocks.length).toBeGreaterThan(0);

    // Check that specific content is rendered
    expect(screen.getByText('Addition')).toBeInTheDocument();
    expect(screen.getByText('Subtraction')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  it('handles empty blocks correctly', () => {
    const matieresWithEmptyDomaines: Matiere[] = [
      {
        id: 'matiere-empty',
        name: 'Empty Subject',
        color: 'blue',
        position: 1,
        programmationId: 'prog-1',
        domaines: [
          {
            id: 'domaine-empty',
            name: 'Empty Domain',
            color: 'blue',
            matiereId: 'matiere-empty',
            items: [], // No items
          },
        ],
      },
    ];

    render(
      <ProgrammationTable
        periodes={mockPeriodes}
        matieres={matieresWithEmptyDomaines}
      />
    );

    expect(screen.getByText('Empty Subject')).toBeInTheDocument();
    expect(screen.getByText('0 semaines')).toBeInTheDocument();
  });

  it('renders with no periods', () => {
    render(<ProgrammationTable periodes={[]} matieres={mockMatieres} />);

    // Table should still render with topics but no period columns
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Matières')).toBeInTheDocument();
    expect(screen.getByText('Mathématiques')).toBeInTheDocument();
  });

  it('renders with no topics', () => {
    render(<ProgrammationTable periodes={mockPeriodes} matieres={[]} />);

    // Table should still render with period headers but no topic rows
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Matières')).toBeInTheDocument();
    expect(screen.getByText('Période 1')).toBeInTheDocument();
    expect(screen.getByText('Période 2')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ProgrammationTable periodes={mockPeriodes} matieres={mockMatieres} />
    );
    expect(container).toMatchSnapshot();
  });
});
