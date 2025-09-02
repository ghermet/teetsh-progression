/** Generated with CLAUDE CODE */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProgrammationError } from './ProgrammationError';

describe('ProgrammationError', () => {
  const mockError = new Error('Test error message');
  const mockReset = vi.fn();

  it('renders the error message correctly', () => {
    render(<ProgrammationError error={mockError} reset={mockReset} />);

    expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('calls the reset function when the button is clicked', () => {
    render(<ProgrammationError error={mockError} reset={mockReset} />);

    const button = screen.getByRole('button', { name: /Rafraîchir la page/i });
    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ProgrammationError error={mockError} reset={mockReset} />
    );
    expect(container).toMatchSnapshot();
  });
});
