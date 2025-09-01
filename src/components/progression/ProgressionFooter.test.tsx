/** Generated with CLAUDE CODE */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressionFooter } from './ProgressionFooter';
import type { Matiere, Periode } from '../../types/progression.types';

describe('ProgressionFooter', () => {
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

  it('displays the correct number of weeks', () => {
    render(
      <ProgressionFooter periodes={mockPeriodes} matieres={mockMatieres} />
    );
    expect(screen.getAllByText('2')).toHaveLength(2); // Both weeks and subjects show 2
    expect(screen.getByText('semaines')).toBeInTheDocument();
  });

  it('displays the correct number of unique domains', () => {
    render(
      <ProgressionFooter periodes={mockPeriodes} matieres={mockMatieres} />
    );
    expect(screen.getAllByText('2')).toHaveLength(2); // Both weeks and subjects show 2
    expect(screen.getByText('matières')).toBeInTheDocument();
  });

  it('counts matiere correctly', () => {
    const singleMatiere: Matiere[] = [
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
            ],
          },
        ],
      },
    ];

    render(
      <ProgressionFooter periodes={mockPeriodes} matieres={singleMatiere} />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('matière')).toBeInTheDocument();
  });

  it('renders with no periods', () => {
    render(<ProgressionFooter periodes={[]} matieres={mockMatieres} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('semaine')).toBeInTheDocument();
  });

  it('renders with no matiere', () => {
    render(<ProgressionFooter periodes={mockPeriodes} matieres={[]} />);
    expect(screen.getAllByText('0')).toHaveLength(1); // Only subjects show 0, periods show 2
    expect(screen.getByText('matière')).toBeInTheDocument();
  });

  it('renders separator bullet between stats', () => {
    render(
      <ProgressionFooter periodes={mockPeriodes} matieres={mockMatieres} />
    );
    expect(screen.getByText('•')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    const { container } = render(
      <ProgressionFooter periodes={mockPeriodes} matieres={mockMatieres} />
    );
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass(
      'bg-slate-50',
      'border-t',
      'border-slate-200',
      'px-3',
      'sm:px-4',
      'py-2',
      'sm:py-3'
    );
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ProgressionFooter periodes={mockPeriodes} matieres={mockMatieres} />
    );
    expect(container).toMatchSnapshot();
  });
});
