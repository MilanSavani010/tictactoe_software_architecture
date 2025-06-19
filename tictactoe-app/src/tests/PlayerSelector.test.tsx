import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PlayerSelector } from '../components/PlayerSelector';

describe('PlayerSelector', () => {
  it('calls onSelect with "X" when X button is clicked', () => {
    const onSelect = vi.fn();
    render(<PlayerSelector onSelect={onSelect} selected={null} />);
    fireEvent.click(screen.getByTestId('select-x'));
    expect(onSelect).toHaveBeenCalledWith('X');
  });

  it('calls onSelect with "O" when O button is clicked', () => {
    const onSelect = vi.fn();
    render(<PlayerSelector onSelect={onSelect} selected={null} />);
    fireEvent.click(screen.getByTestId('select-o'));
    expect(onSelect).toHaveBeenCalledWith('O');
  });

  it('disables X button when X is selected', () => {
    render(<PlayerSelector onSelect={() => {}} selected="X" />);
    expect(screen.getByTestId('select-x')).toBeDisabled();
    expect(screen.getByTestId('select-o')).not.toBeDisabled();
  });

  it('disables O button when O is selected', () => {
    render(<PlayerSelector onSelect={() => {}} selected="O" />);
    expect(screen.getByTestId('select-o')).toBeDisabled();
    expect(screen.getByTestId('select-x')).not.toBeDisabled();
  });
});