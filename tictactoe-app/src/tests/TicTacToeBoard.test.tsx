import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TicTacToeBoard } from '../components/TicTacToeBoard';
import type { Board } from '../types/types';

describe('TicTacToeBoard', () => {
  it('renders 9 cells', () => {
    const board: Board = Array(9).fill(null);
    render(<TicTacToeBoard board={board} onCellClick={() => {}} disabled={false} />);
    const cells = screen.getAllByTestId(/cell-/);
    expect(cells).toHaveLength(9);
  });
});

  it('renders X and O in correct cells', () => {
    const board: Board = ['X', null, 'O', null, 'X', null, null, 'O', null];
    render(<TicTacToeBoard board={board} onCellClick={() => {}} disabled={false} />);
    expect(screen.getByTestId('cell-0')).toHaveTextContent('X');
    expect(screen.getByTestId('cell-2')).toHaveTextContent('O');
    expect(screen.getByTestId('cell-4')).toHaveTextContent('X');
    expect(screen.getByTestId('cell-7')).toHaveTextContent('O');
    expect(screen.getByTestId('cell-1')).toHaveTextContent('');
  });

  it('calls onCellClick with correct index when a cell is clicked', () => {
    const board = Array(9).fill(null);
    const onCellClick = vi.fn();
    render(<TicTacToeBoard board={board} onCellClick={onCellClick} disabled={false} />);
    fireEvent.click(screen.getByTestId('cell-3'));
    expect(onCellClick).toHaveBeenCalledWith(3);
  });

  it('disables all cells when disabled is true', () => {
    const board = Array(9).fill(null);
    render(<TicTacToeBoard board={board} onCellClick={() => {}} disabled={true} />);
    screen.getAllByTestId(/cell-/).forEach(cell => {
      expect(cell).toBeDisabled();
    });
  });

  it('disables cells that already have a value', () => {
    const board : Board= [null, 'X', null, 'O', null, null, null, null, null];
    render(<TicTacToeBoard board={board} onCellClick={() => {}} disabled={false} />);
    expect(screen.getByTestId('cell-1')).toBeDisabled();
    expect(screen.getByTestId('cell-3')).toBeDisabled();
    expect(screen.getByTestId('cell-0')).not.toBeDisabled();
  });