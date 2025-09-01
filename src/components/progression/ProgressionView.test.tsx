/** Generated with CLAUDE CODE */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressionView } from './ProgressionView';
import type { ProgressionData } from '../../types/progression.types';

describe('ProgressionView', () => {
  const mockProgressionData: ProgressionData = {
    id: 1,
    name: 'Test Progression',
    shortDescription: 'Test Description',
    date: '2024-01-15',
    niveau: 'CP',
    userId: 'user-1',
    nbOfUseLanding: 0,
    nbOfUseInApp: 0,
    schoolyearId: 'school-year-1',
    schoolId: 'school-1',
    programmationId: 'prog-1',
    columnWidth: 200,
    fontSize: '14px',
    view: 'timeline',
    invertedRowCol: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    publishedAt: '2024-01-01',
    onePageMatiere: null,
    slug: 'test-progression',
    documentId: 'doc-1',
    periodes: [
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
    ],
    matieres: [
      {
        id: 'matiere-1',
        name: 'Math',
        color: 'blue',
        position: 1,
        programmationId: 'prog-1',
        domaines: [
          {
            id: 'domaine-1',
            name: 'Numbers',
            color: 'blue',
            matiereId: 'matiere-1',
            items: [
              {
                id: 'item-1',
                value: 'Addition',
                y: 0,
                Sequence: null,
                domaineId: 'domaine-1',
                periodeId: '1',
                FicheDePrep: null,
                attachments: [],
              },
              {
                id: 'item-2',
                value: 'Subtraction',
                y: 1,
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
        name: 'French',
        color: 'green',
        position: 2,
        programmationId: 'prog-1',
        domaines: [
          {
            id: 'domaine-2',
            name: 'Reading',
            color: 'green',
            matiereId: 'matiere-2',
            items: [
              {
                id: 'item-3',
                value: 'Letters',
                y: 0,
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
    ],
  };

  it('renders all progression components', () => {
    render(<ProgressionView {...mockProgressionData} />);

    expect(
      screen.getByRole('heading', { name: /Test Progression/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('passes correct props to ProgressionHeader', () => {
    render(<ProgressionView {...mockProgressionData} />);

    expect(
      screen.getByRole('heading', { name: /Test Progression/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('CP')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('transforms matieres into topics correctly', () => {
    render(<ProgressionView {...mockProgressionData} />);

    // Should have 2 topics (2 domaines)
    const rows = screen.getAllByRole('row');
    // 1 header row + 2 body rows
    expect(rows).toHaveLength(3);
  });

  it('sorts matieres by position', () => {
    const dataWithUnsortedMatieres = {
      ...mockProgressionData,
      matieres: [
        {
          ...mockProgressionData.matieres[1], // French with position 2
          position: 2,
        },
        { ...mockProgressionData.matieres[0], position: 1 }, // Math with position 1
      ],
    };

    render(<ProgressionView {...dataWithUnsortedMatieres} />);

    const rows = screen.getAllByRole('rowheader');
    // First row should be Math, second should be French
    expect(rows[0]).toHaveTextContent('Math');
    expect(rows[1]).toHaveTextContent('French');
  });

  it('handles empty matieres', () => {
    const dataWithEmptyMatieres = {
      ...mockProgressionData,
      matieres: [],
    };

    render(<ProgressionView {...dataWithEmptyMatieres} />);

    const rows = screen.getAllByRole('row');
    // 1 header row
    expect(rows).toHaveLength(1);
  });

  it('handles matieres with no items', () => {
    const dataWithEmptyItems = {
      ...mockProgressionData,
      matieres: [
        {
          ...mockProgressionData.matieres[0],
          domaines: [
            {
              ...mockProgressionData.matieres[0].domaines[0],
              items: [],
            },
          ],
        },
      ],
    };

    render(<ProgressionView {...dataWithEmptyItems} />);

    const rows = screen.getAllByRole('row');
    // 1 header row + 1 body row
    expect(rows).toHaveLength(2);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('has correct CSS classes and structure', () => {
    const { container } = render(<ProgressionView {...mockProgressionData} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass(
      'bg-white',
      'rounded-lg',
      'overflow-hidden',
      'shadow-sm',
      'border',
      'border-slate-200'
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<ProgressionView {...mockProgressionData} />);
    expect(container).toMatchSnapshot();
  });
});
