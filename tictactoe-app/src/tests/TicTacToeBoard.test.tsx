import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TicTacToeBoard } from '../components/TicTacToeBoard';

describe('TicTacToeBoard', () => {
  it('renders 9 empty cells', () => {
    render(<TicTacToeBoard />);
    const cells = screen.getAllByTestId(/cell-/);
    expect(cells).toHaveLength(9);
    cells.forEach(cell => {
      expect(cell).toBeEmptyDOMElement();
    });
  });
});