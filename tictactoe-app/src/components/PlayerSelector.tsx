type Player = 'X' | 'O';

interface PlayerSelectorProps {
  onSelect: (player: Player) => void;
  selected: Player | null;
}

export function PlayerSelector({ onSelect, selected }: PlayerSelectorProps) {
  return (
    <div className="player-selector">
      <span>Select your player: </span>
      <button
        onClick={() => onSelect('X')}
        disabled={selected === 'X'}
        data-testid="select-x"
      >X</button>
      <button
        onClick={() => onSelect('O')}
        disabled={selected === 'O'}
        data-testid="select-o"
      >O</button>
      {selected && <div className="selected-player">You are: <b>{selected}</b></div>}
    </div>
  );
}