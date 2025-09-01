/** Generated with CLAUDE CODE */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressionHeader } from './ProgressionHeader';

describe('ProgressionHeader', () => {
  const defaultProps = {
    name: 'Test Timeline',
    shortDescription: 'A test timeline description',
    niveau: 'CP',
    date: '2024-01-15',
  };

  it('renders the timeline name', () => {
    render(<ProgressionHeader {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Test Timeline'
    );
  });

  it('renders the short description when provided', () => {
    render(<ProgressionHeader {...defaultProps} />);
    expect(screen.getByText('A test timeline description')).toBeInTheDocument();
  });

  it('does not render short description when not provided', () => {
    const propsWithoutDescription = {
      name: 'Test Timeline',
      niveau: 'CP',
      date: '2024-01-15',
    };
    render(<ProgressionHeader {...propsWithoutDescription} />);
    expect(
      screen.queryByText('A test timeline description')
    ).not.toBeInTheDocument();
  });

  it('renders the niveau', () => {
    render(<ProgressionHeader {...defaultProps} />);
    expect(screen.getByText('CP')).toBeInTheDocument();
  });

  it('renders the year from date when provided', () => {
    render(<ProgressionHeader {...defaultProps} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('does not render year when date is not provided', () => {
    const propsWithoutDate = {
      name: 'Test Timeline',
      niveau: 'CP',
      shortDescription: 'A test timeline description',
    };
    render(<ProgressionHeader {...propsWithoutDate} />);
    expect(screen.queryByText('2024')).not.toBeInTheDocument();
    expect(screen.queryByText('•')).not.toBeInTheDocument();
  });

  it('renders separator bullet when both niveau and date are provided', () => {
    render(<ProgressionHeader {...defaultProps} />);
    expect(screen.getByText('•')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    const { container } = render(<ProgressionHeader {...defaultProps} />);
    const header = container.querySelector('header');
    expect(header).toHaveClass(
      'bg-slate-100',
      'px-4',
      'sm:px-6',
      'py-6',
      'sm:py-8',
      'border-b',
      'border-slate-200'
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<ProgressionHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
