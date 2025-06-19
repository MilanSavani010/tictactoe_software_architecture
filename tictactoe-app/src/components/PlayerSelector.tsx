import type { Player } from '../types/types';

interface PlayerSelectorProps {
  onSelect: (player: Player) => void;
  selected: Player | null;
  assigned: { X: boolean; O: boolean };
}

export function PlayerSelector({ onSelect, selected, assigned }: PlayerSelectorProps) {
  return (
    <div className="player-selector">
      <span>Select your player: </span>
      <button
        onClick={() => onSelect('X')}
        disabled={assigned.X}
        data-testid="select-x"
      >X</button>
      <button
        onClick={() => onSelect('O')}
        disabled={assigned.O}
        data-testid="select-o"
      >O</button>
      {selected && <div className="selected-player">You are: <b>{selected}</b></div>}
    </div>
  );
}