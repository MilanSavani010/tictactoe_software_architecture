import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PlayerSelector } from '../components/PlayerSelector';

describe('PlayerSelector', () => {
  it('calls onSelect with "X" when X button is clicked', () => {
    const onSelect = vi.fn();
    render(<PlayerSelector onSelect={onSelect} selected={null} assigned={{ X: false, O: false }} />);
    fireEvent.click(screen.getByTestId('select-x'));
    expect(onSelect).toHaveBeenCalledWith('X');
  });

  it('calls onSelect with "O" when O button is clicked', () => {
    const onSelect = vi.fn();
    render(<PlayerSelector onSelect={onSelect} selected={null} assigned={{ X: false, O: false }} />);
    fireEvent.click(screen.getByTestId('select-o'));
    expect(onSelect).toHaveBeenCalledWith('O');
  });

  it('disables X button when assigned.X is true', () => {
    render(<PlayerSelector onSelect={() => {}} selected={null} assigned={{ X: true, O: false }} />);
    expect(screen.getByTestId('select-x')).toBeDisabled();
    expect(screen.getByTestId('select-o')).not.toBeDisabled();
  });

  it('disables O button when assigned.O is true', () => {
    render(<PlayerSelector onSelect={() => {}} selected={null} assigned={{ X: false, O: true }} />);
    expect(screen.getByTestId('select-o')).toBeDisabled();
    expect(screen.getByTestId('select-x')).not.toBeDisabled();
  });

  it('shows selected player label when selected is set', () => {
    render(<PlayerSelector onSelect={() => {}} selected="X" assigned={{ X: false, O: false }} />);
    expect(screen.getByText(/You are:/)).toBeInTheDocument();
  });
});