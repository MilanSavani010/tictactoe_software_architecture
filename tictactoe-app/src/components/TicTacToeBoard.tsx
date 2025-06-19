import type { Board, Player } from '../types/types';

interface Props {
  board: Board;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

export function TicTacToeBoard({ board, onCellClick, disabled }: Props) {
  return (
    <div className="ttt-board">
      {board.map((cell, i) => (
        <button
          key={i}
          className="ttt-cell"
          onClick={() => onCellClick(i)}
          disabled={!!cell || disabled}
          data-testid={`cell-${i}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}